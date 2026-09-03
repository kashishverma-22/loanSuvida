/* =========================================================
   LOAN SUVIDA - APPLY NOW PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loanApplyForm");

  if (!form) return;

  /* =====================================================
       GET FORM ELEMENTS
    ===================================================== */

  const fullName = document.getElementById("fullName");
  const mobileNumber = document.getElementById("mobileNumber");
  const email = document.getElementById("email");
  const loanType = document.getElementById("loanType");
  const loanAmount = document.getElementById("loanAmount");
  const employmentType = document.getElementById("employmentType");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");

  const fullNameError = document.getElementById("fullNameError");
  const mobileError = document.getElementById("mobileError");
  const emailError = document.getElementById("emailError");
  const loanTypeError = document.getElementById("loanTypeError");
  const loanAmountError = document.getElementById("loanAmountError");
  const consentError = document.getElementById("consentError");

  const formSuccess = document.getElementById("formSuccess");

  /* =====================================================
       ONLY NUMBERS - MOBILE
    ===================================================== */

  mobileNumber.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");

    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
    }
  });

  /* =====================================================
       ONLY NUMBERS - LOAN AMOUNT
    ===================================================== */

  loanAmount.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  /* =====================================================
       ERROR FUNCTIONS
    ===================================================== */

  function setError(input, errorElement, message) {
    if (input) {
      input.classList.add("input-error");
    }

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function removeError(input, errorElement) {
    if (input) {
      input.classList.remove("input-error");
    }

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  /* =====================================================
       CLEAR ERROR ON INPUT
    ===================================================== */

  fullName.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      removeError(this, fullNameError);
    }
  });

  mobileNumber.addEventListener("input", function () {
    if (/^[6-9][0-9]{9}$/.test(this.value)) {
      removeError(this, mobileError);
    }
  });

  email.addEventListener("input", function () {
    if (this.value.trim() === "") {
      removeError(this, emailError);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(this.value.trim())) {
      removeError(this, emailError);
    }
  });

  loanType.addEventListener("change", function () {
    if (this.value !== "") {
      removeError(this, loanTypeError);
    }
  });

  loanAmount.addEventListener("input", function () {
    const amount = Number(this.value);

    if (amount >= 10000) {
      removeError(this, loanAmountError);
    }
  });

  consent.addEventListener("change", function () {
    if (this.checked) {
      removeError(null, consentError);
    }
  });

  /* =====================================================
       FORM SUBMIT
    ===================================================== */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Clear previous errors */

    removeError(fullName, fullNameError);
    removeError(mobileNumber, mobileError);
    removeError(email, emailError);
    removeError(loanType, loanTypeError);
    removeError(loanAmount, loanAmountError);
    removeError(null, consentError);

    let isValid = true;

    /* =================================================
           FULL NAME
        ================================================= */

    const nameValue = fullName.value.trim();

    if (nameValue === "") {
      setError(fullName, fullNameError, "Please enter your full name.");

      isValid = false;
    } else if (nameValue.length < 3) {
      setError(
        fullName,
        fullNameError,
        "Name must contain at least 3 characters.",
      );

      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
      setError(fullName, fullNameError, "Please enter a valid name.");

      isValid = false;
    }

    /* =================================================
           MOBILE NUMBER
        ================================================= */

    const mobileValue = mobileNumber.value.trim();

    if (mobileValue === "") {
      setError(mobileNumber, mobileError, "Please enter your mobile number.");

      isValid = false;
    } else if (!/^[6-9][0-9]{9}$/.test(mobileValue)) {
      setError(
        mobileNumber,
        mobileError,
        "Enter a valid 10-digit mobile number.",
      );

      isValid = false;
    }

    /* =================================================
           EMAIL - OPTIONAL
        ================================================= */

    const emailValue = email.value.trim();

    if (emailValue !== "") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {
        setError(email, emailError, "Please enter a valid email address.");

        isValid = false;
      }
    }

    /* =================================================
           LOAN TYPE
        ================================================= */

    if (loanType.value === "") {
      setError(loanType, loanTypeError, "Please select a loan type.");

      isValid = false;
    }

    /* =================================================
           LOAN AMOUNT
        ================================================= */

    const amountValue = Number(loanAmount.value);

    if (loanAmount.value.trim() === "") {
      setError(
        loanAmount,
        loanAmountError,
        "Please enter the required loan amount.",
      );

      isValid = false;
    } else if (amountValue < 10000) {
      setError(
        loanAmount,
        loanAmountError,
        "Minimum loan amount should be ₹10,000.",
      );

      isValid = false;
    }

    /* =================================================
           CONSENT
        ================================================= */

    if (!consent.checked) {
      setError(
        null,
        consentError,
        "Please agree to be contacted regarding your application.",
      );

      isValid = false;
    }

    /* =================================================
           STOP IF INVALID
        ================================================= */

    if (!isValid) {
      const firstError = form.querySelector(".input-error");

      if (firstError) {
        firstError.focus();
      }

      return;
    }

    /* =================================================
           SUCCESS
        ================================================= */

    if (formSuccess) {
      formSuccess.classList.add("show");
    }

    /* =================================================
           GET FORM DATA
        ================================================= */

    const formData = {
      fullName: fullName.value.trim(),

      mobileNumber: mobileNumber.value.trim(),

      email: email.value.trim(),

      loanType: loanType.value,

      loanAmount: loanAmount.value,

      employmentType: employmentType.value,

      message: message.value.trim(),

      consent: consent.checked,
    };

    console.log("Loan Application:", formData);

    /* =================================================
           RESET FORM
        ================================================= */

    form.reset();

    /* Remove error classes */

    document.querySelectorAll(".input-error").forEach(function (input) {
      input.classList.remove("input-error");
    });

    /* =================================================
           HIDE SUCCESS MESSAGE
           AFTER 6 SECONDS
        ================================================= */

    setTimeout(function () {
      if (formSuccess) {
        formSuccess.classList.remove("show");
      }
    }, 6000);
  });

  /* =====================================================
       FINAL CTA - SMOOTH SCROLL
    ===================================================== */

  const applyButtons = document.querySelectorAll('a[href="#loanApplyForm"]');

  applyButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.getElementById("loanApplyForm");

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(function () {
          fullName.focus();
        }, 700);
      }
    });
  });
});
