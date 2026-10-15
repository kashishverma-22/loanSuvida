document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (!form) return;

  const nameInput = document.getElementById("contactName");
  const mobileInput = document.getElementById("contactMobile");
  const emailInput = document.getElementById("contactEmail");
  const loanTypeInput = document.getElementById("contactLoanType");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");
  const consentInput = document.getElementById("contactConsent");
  const successBox = document.getElementById("contactSuccess");
  const submitBtn = form.querySelector('button[type="submit"]');

  function setError(input, errorId, message) {
    const error = document.getElementById(errorId);

    if (error) error.textContent = message;

    const box = input.closest(".contact-input-box");

    if (box) box.classList.add("input-error");
  }

  function clearErrors() {
    form.querySelectorAll(".contact-error").forEach(function (item) {
      item.textContent = "";
    });

    form.querySelectorAll(".input-error").forEach(function (item) {
      item.classList.remove("input-error");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    let valid = true;

    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "") {
      setError(nameInput, "contactNameError", "Please enter your full name.");
      valid = false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError(
        mobileInput,
        "contactMobileError",
        "Please enter a valid 10-digit mobile number.",
      );
      valid = false;
    }

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(
        emailInput,
        "contactEmailError",
        "Please enter a valid email address.",
      );
      valid = false;
    }

    if (loanTypeInput.value === "") {
      setError(
        loanTypeInput,
        "contactLoanTypeError",
        "Please select a loan type.",
      );
      valid = false;
    }

    if (message === "") {
      setError(
        messageInput,
        "contactMessageError",
        "Please enter your message.",
      );
      valid = false;
    }

    if (!consentInput.checked) {
      const consentError = document.getElementById("contactConsentError");

      if (consentError) {
        consentError.textContent = "Please accept the consent to continue.";
      }

      valid = false;
    }

    if (!valid) {
      const firstError = form.querySelector(
        ".input-error input, .input-error select, .input-error textarea",
      );

      if (firstError) firstError.focus();

      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    window
      .sendLoanMail("Contact Us Enquiry", {
        name: name,
        mobile: mobile,
        email: email,
        loanType: loanTypeInput.value,
        subject: subjectInput ? subjectInput.value.trim() : "",
        message: message,
      })
      .then(function (ok) {
        if (ok) {
          form.reset();

          if (successBox) {
            successBox.classList.add("show");

            setTimeout(function () {
              successBox.classList.remove("show");
            }, 6000);
          }
        }

        if (submitBtn) submitBtn.disabled = false;
      });
  });
});