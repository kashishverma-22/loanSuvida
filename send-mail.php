<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond($ok, $message, $code = 200)
{
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Invalid request.', 405);
}

$config = require __DIR__ . '/mail-config.php';

if (strpos($config['password'], 'PASTE_') === 0 || $config['password'] === '') {
    error_log('send-mail.php: Gmail App Password mail-config.php mein set nahi hai.');
    respond(false, 'Mail is not configured yet.', 500);
}

function clean_line($v, $max = 200)
{
    $v = trim((string) $v);
    $v = preg_replace('/[\r\n\t]+/', ' ', $v);
    return mb_substr($v, 0, $max);
}

function clean_text($v, $max = 5000)
{
    $v = trim((string) $v);
    $v = str_replace("\0", '', $v);
    return mb_substr($v, 0, $max);
}

function h($v)
{
    return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

function label_of($key)
{
    $key = preg_replace('/([a-z])([A-Z])/', '$1 $2', $key);
    $key = str_replace(['_', '-'], ' ', $key);
    return ucwords(trim($key));
}

/* rate limit: 1 IP = 5 mail / 10 min */
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/lsuvidha_mail_' . md5($ip) . '.json';
$now  = time();
$hits = [];
if (is_file($file)) {
    $hits = json_decode((string) @file_get_contents($file), true) ?: [];
    $hits = array_values(array_filter($hits, function ($t) use ($now) {
        return $t > $now - 600;
    }));
}
if (count($hits) >= 5) {
    respond(false, 'Too many requests. Please try again after some time.', 429);
}

$p = $_POST;

$formName = clean_line($p['form_name'] ?? 'Website Enquiry');
unset($p['form_name']);

function first_of($p, $keys, $max = 200)
{
    foreach ($keys as $k) {
        if (isset($p[$k]) && trim((string) $p[$k]) !== '') {
            return clean_line($p[$k], $max);
        }
    }
    return '';
}

$name   = first_of($p, ['name', 'fullName', 'full_name']);
$mobile = first_of($p, ['mobile', 'mobileNumber', 'phone'], 30);
$email  = first_of($p, ['email'], 150);

if ($name === '') {
    respond(false, 'Please enter your name.', 422);
}
if ($mobile === '' || !preg_match('/^[0-9+\-\s()]{7,20}$/', $mobile)) {
    respond(false, 'Please enter a valid mobile number.', 422);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

/* mail body: jo bhi fields aaye sab dikhenge */
$rows = ['Form' => $formName];
foreach ($p as $key => $value) {
    if (is_array($value)) {
        continue;
    }
    $key = preg_replace('/[^A-Za-z0-9_\-]/', '', (string) $key);
    if ($key === '') {
        continue;
    }
    $v = ($key === 'message') ? clean_text($value) : clean_text($value, 1000);
    if ($v === '' || $v === 'false') {
        continue;
    }
    if ($v === 'true') {
        $v = 'Yes';
    }
    $rows[label_of($key)] = $v;
}
$rows['Date'] = date('d M Y, h:i A') . ' (IST)';

$text = '';
$html = '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">'
      . '<h2 style="margin:0 0 12px">New ' . h($formName) . '</h2>'
      . '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #ddd">';
foreach ($rows as $label => $value) {
    $text .= $label . ': ' . $value . "\r\n";
    $html .= '<tr><td style="border:1px solid #ddd;background:#f7f7f7"><b>' . h($label) . '</b></td>'
           . '<td style="border:1px solid #ddd">' . nl2br(h($value)) . '</td></tr>';
}
$html .= '</table></div>';

$subject = 'New ' . $formName . ' - ' . $name;

/* ---------- SMTP ---------- */

function smtp_expect($fp, $codes)
{
    $resp = '';
    while (($line = fgets($fp, 515)) !== false) {
        $resp .= $line;
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }
    $code = (int) substr($resp, 0, 3);
    if (!in_array($code, (array) $codes, true)) {
        throw new Exception('SMTP error: ' . trim($resp));
    }
    return $resp;
}

function smtp_cmd($fp, $cmd, $codes)
{
    fwrite($fp, $cmd . "\r\n");
    return smtp_expect($fp, $codes);
}

function b64($s)
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

function smtp_send($c, $replyEmail, $replyName, $subject, $text, $html)
{
    $secure = $c['secure'];
    $host   = ($secure === 'ssl' ? 'ssl://' : '') . $c['host'];
    $fp = @stream_socket_client($host . ':' . $c['port'], $errno, $errstr, 20);
    if (!$fp) {
        throw new Exception("SMTP connect failed: $errstr ($errno)");
    }
    stream_set_timeout($fp, 20);

    try {
        smtp_expect($fp, 220);
        $ehlo = $_SERVER['SERVER_NAME'] ?? 'localhost';
        smtp_cmd($fp, 'EHLO ' . $ehlo, 250);

        if ($secure === 'tls') {
            smtp_cmd($fp, 'STARTTLS', 220);
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new Exception('STARTTLS failed');
            }
            smtp_cmd($fp, 'EHLO ' . $ehlo, 250);
        }

        if ($c['username'] !== '') {
            smtp_cmd($fp, 'AUTH LOGIN', 334);
            smtp_cmd($fp, base64_encode($c['username']), 334);
            smtp_cmd($fp, base64_encode(str_replace(' ', '', $c['password'])), 235);
        }

        smtp_cmd($fp, 'MAIL FROM:<' . $c['from_email'] . '>', 250);
        smtp_cmd($fp, 'RCPT TO:<' . $c['to_email'] . '>', [250, 251]);
        smtp_cmd($fp, 'DATA', 354);

        $boundary = 'b_' . bin2hex(random_bytes(8));
        $headers  = [
            'Date: ' . date('r'),
            'From: ' . b64($c['from_name']) . ' <' . $c['from_email'] . '>',
            'To: ' . b64($c['to_name']) . ' <' . $c['to_email'] . '>',
            ($replyEmail !== '' ? 'Reply-To: ' . b64($replyName) . ' <' . $replyEmail . '>' : null),
            'Subject: ' . b64($subject),
            'Message-ID: <' . bin2hex(random_bytes(10)) . '@' . ($_SERVER['SERVER_NAME'] ?? 'localhost') . '>',
            'MIME-Version: 1.0',
            'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        ];

        $body  = '--' . $boundary . "\r\n"
               . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
               . chunk_split(base64_encode($text)) . "\r\n"
               . '--' . $boundary . "\r\n"
               . "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
               . chunk_split(base64_encode($html)) . "\r\n"
               . '--' . $boundary . '--';

        $headers = array_values(array_filter($headers));
        $data = implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $data = preg_replace('/^\./m', '..', $data);

        fwrite($fp, $data . "\r\n.\r\n");
        smtp_expect($fp, 250);
        @smtp_cmd($fp, 'QUIT', 221);
    } finally {
        fclose($fp);
    }
}

try {
    smtp_send($config, $email, $name, $subject, $text, $html);
} catch (Throwable $e) {
    error_log('send-mail.php: ' . $e->getMessage());
    respond(false, 'Sorry! Your enquiry could not be sent. Please try again.', 500);
}

$hits[] = $now;
@file_put_contents($file, json_encode($hits));

respond(true, 'Your enquiry has been sent successfully.');