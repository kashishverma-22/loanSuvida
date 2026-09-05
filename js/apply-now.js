/* =========================================================
   LOAN SUIDA - APPLY NOW
   3 STEP FORM JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =======================================================
     MOBILE NAVBAR
  ======================================================= */

  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();

      navMenu.classList.toggle("active");

      const icon = mobileToggle.querySelector("i");

      if (icon) {
        if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    /* Close mobile menu when normal link clicked */

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (
          !this.parentElement.classList.contains("dropdown") &&
          !this.parentElement.classList.contains("sub-dropdown")
        ) {
          navMenu.classList.remove("active");

          const icon = mobileToggle.querySelector("i");

          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }
        }
      });
    });
  }

  /* =======================================================
     MOBILE DROPDOWN
  ======================================================= */

  const dropdowns = document.querySelectorAll(".nav-menu .dropdown");

  dropdowns.forEach(function (dropdown) {
    const dropdownLink = dropdown.querySelector(":scope > a");

    if (!dropdownLink) return;

    dropdownLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();

        dropdowns.forEach(function (item) {
          if (item !== dropdown) {
            item.classList.remove("open");
          }
        });

        dropdown.classList.toggle("open");
      }
    });
  });

  /* =======================================================
     SUB DROPDOWN
  ======================================================= */

  const subDropdowns = document.querySelectorAll(".nav-menu .sub-dropdown");

  subDropdowns.forEach(function (subDropdown) {
    const subLink = subDropdown.querySelector(":scope > a");

    if (!subLink) return;

    subLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();

        subDropdown.classList.toggle("open");
      }
    });
  });

  /* =======================================================
     CLOSE DROPDOWN OUTSIDE
  ======================================================= */

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-menu")) {
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });

      subDropdowns.forEach(function (subDropdown) {
        subDropdown.classList.remove("open");
      });
    }
  });

  /* =======================================================
     APPLY FORM
  ======================================================= */

  const form = document.getElementById("loanApplyForm");

  if (!form) return;

  /* =======================================================
     FORM ELEMENTS
  ======================================================= */

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

  /* =======================================================
     STEPS
  ======================================================= */

  const steps = form.querySelectorAll(".form-step");
  const stepIndicators = document.querySelectorAll(".step-item");
  const stepLines = document.querySelectorAll(".step-line");

  const nextButtons = form.querySelectorAll(".next-step");
  const prevButtons = form.querySelectorAll(".prev-step");

  let currentStep = 0;

  /* =======================================================
     SHOW STEP
  ======================================================= */

  function showStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= steps.length) {
      return;
    }

    currentStep = stepIndex;

    /* Form steps */

    steps.forEach(function (step, index) {
      step.classList.toggle("active", index === currentStep);
    });

    /* Step indicators */

    stepIndicators.forEach(function (indicator, index) {
      indicator.classList.remove("active");
      indicator.classList.remove("completed");

      if (index < currentStep) {
        indicator.classList.add("completed");

        const number = indicator.querySelector(".step-number");

        if (number) {
          number.innerHTML = "✓";
        }
      } else if (index === currentStep) {
        indicator.classList.add("active");

        const number = indicator.querySelector(".step-number");

        if (number) {
          number.innerHTML = index + 1;
        }
      } else {
        const number = indicator.querySelector(".step-number");

        if (number) {
          number.innerHTML = index + 1;
        }
      }
    });

    /* Step lines */

    stepLines.forEach(function (line, index) {
      if (index < currentStep) {
        line.classList.add("completed");
      } else {
        line.classList.remove("completed");
      }
    });
  }

  /* =======================================================
     CLEAR ERROR
  ======================================================= */

  function clearErrors() {
    if (fullNameError) fullNameError.textContent = "";
    if (mobileError) mobileError.textContent = "";
    if (emailError) emailError.textContent = "";

    if (loanTypeError) loanTypeError.textContent = "";
    if (loanAmountError) loanAmountError.textContent = "";

    if (consentError) consentError.textContent = "";
  }

  /* =======================================================
     VALIDATE STEP 1
  ======================================================= */

  function validateStep1() {
    let valid = true;

    clearErrors();

    /* Full Name */

    if (!fullName.value.trim()) {
      fullNameError.textContent = "Please enter your full name.";

      valid = false;
    } else if (fullName.value.trim().length < 3) {
      fullNameError.textContent = "Name must contain at least 3 characters.";

      valid = false;
    }

    /* Mobile */

    const mobileValue = mobileNumber.value.trim();

    if (!mobileValue) {
      mobileError.textContent = "Please enter your mobile number.";

      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(mobileValue)) {
      mobileError.textContent = "Please enter a valid 10 digit mobile number.";

      valid = false;
    }

    /* Email - Optional */

    const emailValue = email.value.trim();

    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";

      valid = false;
    }

    return valid;
  }

  /* =======================================================
     VALIDATE STEP 2
  ======================================================= */

  function validateStep2() {
    let valid = true;

    clearErrors();

    /* Loan Type */

    if (!loanType.value) {
      loanTypeError.textContent = "Please select a loan type.";

      valid = false;
    }

    /* Loan Amount */

    const amount = Number(loanAmount.value);

    if (!loanAmount.value) {
      loanAmountError.textContent = "Please enter the required loan amount.";

      valid = false;
    } else if (amount < 10000) {
      loanAmountError.textContent = "Minimum loan amount should be ₹10,000.";

      valid = false;
    }

    return valid;
  }

  /* =======================================================
     VALIDATE STEP 3
  ======================================================= */

  function validateStep3() {
    let valid = true;

    clearErrors();

    if (!consent.checked) {
      consentError.textContent = "Please accept the consent before submitting.";

      valid = false;
    }

    return valid;
  }

  /* =======================================================
     NEXT BUTTON
  ======================================================= */

  nextButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let valid = false;

      if (currentStep === 0) {
        valid = validateStep1();
      } else if (currentStep === 1) {
        valid = validateStep2();
      }

      if (!valid) {
        const firstError = form.querySelector(".form-error:not(:empty)");

        if (firstError) {
          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        return;
      }

      /* Move next */

      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);

        form.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =======================================================
     BACK BUTTON
  ======================================================= */

  prevButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (currentStep > 0) {
        showStep(currentStep - 1);

        form.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =======================================================
     MOBILE NUMBER ONLY DIGITS
  ======================================================= */

  if (mobileNumber) {
    mobileNumber.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  /* =======================================================
     LOAN AMOUNT FORMATTING
  ======================================================= */

  if (loanAmount) {
    loanAmount.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });
  }

  /* =======================================================
     LIVE VALIDATION - NAME
  ======================================================= */

  if (fullName) {
    fullName.addEventListener("input", function () {
      if (fullNameError) {
        fullNameError.textContent = "";
      }
    });
  }

  /* =======================================================
     LIVE VALIDATION - MOBILE
  ======================================================= */

  if (mobileNumber) {
    mobileNumber.addEventListener("input", function () {
      if (mobileError) {
        mobileError.textContent = "";
      }
    });
  }

  /* =======================================================
     LIVE VALIDATION - EMAIL
  ======================================================= */

  if (email) {
    email.addEventListener("input", function () {
      if (emailError) {
        emailError.textContent = "";
      }
    });
  }

  /* =======================================================
     LIVE VALIDATION - LOAN TYPE
  ======================================================= */

  if (loanType) {
    loanType.addEventListener("change", function () {
      if (loanTypeError) {
        loanTypeError.textContent = "";
      }
    });
  }

  /* =======================================================
     LIVE VALIDATION - LOAN AMOUNT
  ======================================================= */

  if (loanAmount) {
    loanAmount.addEventListener("input", function () {
      if (loanAmountError) {
        loanAmountError.textContent = "";
      }
    });
  }

  /* =======================================================
     CONSENT VALIDATION
  ======================================================= */

  if (consent) {
    consent.addEventListener("change", function () {
      if (consent.checked && consentError) {
        consentError.textContent = "";
      }
    });
  }

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Make sure user is on Step 3 */

    if (currentStep !== 2) {
      return;
    }

    /* Validate final step */

    if (!validateStep3()) {
      if (consentError) {
        consentError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    /* =====================================================
       FORM DATA
    ===================================================== */

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

    /* =====================================================
       SUCCESS
    ===================================================== */

    if (formSuccess) {
      formSuccess.style.display = "block";
    }

    /* Hide navigation */

    const navigation = form.querySelector(".form-step.active .form-navigation");

    if (navigation) {
      navigation.style.display = "none";
    }

    /* =====================================================
       RESET AFTER SUCCESS
    ===================================================== */

    setTimeout(function () {
      form.reset();

      if (formSuccess) {
        formSuccess.style.display = "none";
      }

      if (navigation) {
        navigation.style.display = "";
      }

      clearErrors();

      showStep(0);
    }, 6000);
  });

  /* =======================================================
     FINAL CTA SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href="#loanApplyForm"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.getElementById("loanApplyForm");

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    });

  /* =======================================================
     INITIAL STEP
  ======================================================= */

  showStep(0);
});
