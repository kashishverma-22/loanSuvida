<?php
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(403);
    exit('Forbidden');
}

return [
    'host'     => 'smtp.gmail.com',
    'port'     => 465,
    'secure'   => 'ssl',                      // 'ssl' (465) | 'tls' (587) | 'none'

    // SENDER (login yahi)
    'username' => 'rahulverma8th@gmail.com',
    'password' => 'khvgpbxrhpaseipy',   // <- yahan apna app password
    'from_email' => 'rahulverma8th@gmail.com',
    'from_name'  => 'Loan Suvidha Website',

    // RECEIVER
    'to_email' => 'info@loansuvidha.com',
    'to_name'  => 'Loan Suvidha',
];