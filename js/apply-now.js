/* =========================================================
   LOANSUVIDA
   APPLY NOW PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const form = document.getElementById("loanApplicationForm");

  const mobileInput = document.getElementById("mobileNumber");

  const amountInput = document.getElementById("loanAmount");

  const currentYear = document.getElementById("currentYear");

  const amountButtons = document.querySelectorAll(".amount-suggestions button");

  const backToTop = document.querySelector(".back-to-top");

  const progressSteps = document.querySelectorAll(".progress-step");
  const applicationStep = document.querySelector(".application-step strong");

  /* =====================================================
       CURRENT YEAR
    ===================================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       MOBILE NUMBER
    ===================================================== */

  if (mobileInput) {
    mobileInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  /* =====================================================
       LOAN AMOUNT QUICK BUTTONS
    ===================================================== */

  amountButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const amount = this.getAttribute("data-amount");

      if (amountInput) {
        amountInput.value = amount;

        amountInput.focus();
      }

      amountButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });

      this.classList.add("selected");
    });
  });

  /* =====================================================
       AMOUNT INPUT
    ===================================================== */

  if (amountInput) {
    amountInput.addEventListener("input", function () {
      amountButtons.forEach(function (button) {
        button.classList.remove("selected");
      });
    });
  }

  /* =====================================================
       FORM GROUP ERROR CLEAR
    ===================================================== */

  const inputs = form
    ? form.querySelectorAll(
        "input[type='text'], input[type='tel'], input[type='email'], input[type='number']",
      )
    : [];

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      const group = this.closest(".form-group");

      if (group) {
        group.classList.remove("error");

        const error = group.querySelector(".form-error");

        if (error) {
          error.textContent = "";
        }
      }
    });
  });

  function setProgress(step) {
    progressSteps.forEach(function (item) {
      const itemStep = Number(item.dataset.step);
      item.classList.toggle("active", itemStep <= step);
      item.classList.toggle("current", itemStep === step);
    });
    if (applicationStep) applicationStep.textContent = `0${step}`;
  }

  function showFieldError(name, message) {
    const error = form.querySelector(`[data-error-for="${name}"]`);
    const field = form.querySelector(`[name="${name}"]`);
    const container = field && field.closest(".loan-type-grid, .loan-amount-group, .employment-group, .consent-box");
    if (error) error.textContent = message;
    if (container) container.classList.add("error");
  }

  form.querySelectorAll("input[name='loan_type']").forEach(function (input) {
    input.addEventListener("change", function () {
      setProgress(2);
      form.querySelector(".loan-type-grid").classList.remove("error");
      form.querySelector('[data-error-for="loan_type"]').textContent = "";
    });
  });

  form.querySelectorAll("#fullName, #mobileNumber, #emailAddress, #city").forEach(function (input) {
    input.addEventListener("focus", function () { setProgress(2); });
  });

  form.querySelectorAll("#loanAmount, input[name='employment'], #consent").forEach(function (input) {
    input.addEventListener("focus", function () { setProgress(3); });
    input.addEventListener("change", function () {
      setProgress(3);
      const section = this.closest(".loan-amount-group, .employment-group, .consent-box");
      if (!section) return;
      section.classList.remove("error");
      const error = section.querySelector(".field-error");
      if (error) error.textContent = "";
    });
  });

  if (amountInput) {
    amountInput.addEventListener("input", function () {
      this.closest(".loan-amount-group").classList.remove("error");
      form.querySelector('[data-error-for="loan_amount"]').textContent = "";
    });
  }

  /* =====================================================
       VALIDATION HELPER
    ===================================================== */

  function showError(input, message) {
    const group = input.closest(".form-group");

    if (!group) return;

    group.classList.add("error");

    const error = group.querySelector(".form-error");

    if (error) {
      error.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll(".form-group.error").forEach(function (group) {
      group.classList.remove("error");
    });

    document.querySelectorAll(".form-error").forEach(function (error) {
      error.textContent = "";
    });

    form.querySelectorAll(".field-error").forEach(function (error) {
      error.textContent = "";
    });

    form.querySelectorAll(".loan-type-grid.error, .loan-amount-group.error, .employment-group.error, .consent-box.error").forEach(function (section) {
      section.classList.remove("error");
    });
  }

  /* =====================================================
       FORM SUBMIT
    ===================================================== */

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      clearErrors();

      let isValid = true;

      /* =============================================
               LOAN TYPE
            ============================================= */

      const loanType = form.querySelector("input[name='loan_type']:checked");

      if (!loanType) {
        isValid = false;

        showFieldError("loan_type", "Please select a loan type.");

      }

      /* =============================================
               NAME
            ============================================= */

      const nameInput = document.getElementById("fullName");

      if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your full name.");

        isValid = false;
      } else if (nameInput.value.trim().length < 3) {
        showError(nameInput, "Name must contain at least 3 characters.");

        isValid = false;
      }

      /* =============================================
               MOBILE
            ============================================= */

      const mobile = mobileInput.value.trim();

      if (!mobile) {
        showError(mobileInput, "Please enter your mobile number.");

        isValid = false;
      } else if (!/^[6-9]\d{9}$/.test(mobile)) {
        showError(mobileInput, "Please enter a valid 10-digit mobile number.");

        isValid = false;
      }

      /* =============================================
               EMAIL
            ============================================= */

      const emailInput = document.getElementById("emailAddress");

      const email = emailInput.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        showError(emailInput, "Please enter your email address.");

        isValid = false;
      } else if (!emailPattern.test(email)) {
        showError(emailInput, "Please enter a valid email address.");

        isValid = false;
      }

      /* =============================================
               CITY
            ============================================= */

      const cityInput = document.getElementById("city");

      if (!cityInput.value.trim()) {
        showError(cityInput, "Please enter your city.");

        isValid = false;
      }

      /* =============================================
               LOAN AMOUNT
            ============================================= */

      const loanAmount = Number(amountInput.value);

      if (!amountInput.value.trim()) {

        isValid = false;

        showFieldError("loan_amount", "Please enter your required loan amount.");
      } else if (loanAmount < 10000) {
        isValid = false;

        showFieldError("loan_amount", "Minimum loan amount should be at least 10,000.");
      }

      /* =============================================
               EMPLOYMENT
            ============================================= */

      const employment = form.querySelector("input[name='employment']:checked");

      if (!employment) {

        isValid = false;

        showFieldError("employment", "Please select your employment type.");
      }

      /* =============================================
               CONSENT
            ============================================= */

      const consent = document.getElementById("consent");

      if (!consent.checked) {

        isValid = false;

        showFieldError("consent", "Please accept the consent before submitting.");
      }

      /* =============================================
               STOP IF INVALID
            ============================================= */

      if (!isValid) {
        const firstError = form.querySelector(".form-group.error input, .loan-type-grid.error input, .loan-amount-group.error input, .employment-group.error input, .consent-box.error input");

        if (firstError) {
          firstError.focus();

          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        return;
      }

      /* =============================================
               SUBMIT BUTTON
            ============================================= */

      const submitButton = form.querySelector(".application-submit");

      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;

      submitButton.style.opacity = "0.7";

      submitButton.style.cursor = "not-allowed";

      submitButton.innerHTML = `
                <span>Submitting...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;

      /* =============================================
               APPLICATION DATA
            ============================================= */

      const formData = {
        loan_type: loanType.value,

        full_name: nameInput.value.trim(),

        mobile: mobileInput.value.trim(),

        email: emailInput.value.trim(),

        city: cityInput.value.trim(),

        loan_amount: loanAmount,

        employment: employment.value,
      };

      console.log("Loan Application:", formData);

      /* =============================================
               DEMO SUBMISSION
               
               Replace this section later with
               EmailJS / PHP / API integration.
            ============================================= */

      setTimeout(function () {
        submitButton.disabled = false;

        submitButton.style.opacity = "1";

        submitButton.style.cursor = "pointer";

        submitButton.innerHTML = originalText;

        /* =========================================
                   SUCCESS MESSAGE
                ========================================== */

        showSuccessMessage();

        /* =========================================
                   RESET FORM
                ========================================== */

        form.reset();

        amountButtons.forEach(function (button) {
          button.classList.remove("selected");
        });
      }, 1500);
    });
  }

  /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

  function showSuccessMessage() {
    const oldMessage = document.querySelector(".application-success");

    if (oldMessage) {
      oldMessage.remove();
    }

    const success = document.createElement("div");

    success.className = "application-success";

    success.innerHTML = `

            <div class="success-icon">

                <i class="fa-solid fa-check"></i>

            </div>

            <div class="success-content">

                <strong>
                    Application Submitted Successfully!
                </strong>

                <span>
                    Thank you for your enquiry.
                    Our team will contact you shortly.
                </span>

            </div>

            <button
                type="button"
                class="success-close"
                aria-label="Close">

                <i class="fa-solid fa-xmark"></i>

            </button>

        `;

    form.parentElement.insertBefore(success, form);

    success.scrollIntoView({ behavior: "smooth", block: "center" });

    success
      .querySelector(".success-close")
      .addEventListener("click", function () {
        success.remove();
      });

    setTimeout(function () {
      if (success) {
        success.remove();
      }
    }, 7000);
  }

  /* =====================================================
       BACK TO TOP
    ===================================================== */

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    });
  }

  /* =====================================================
       MOBILE NAVIGATION
       
       This is kept here so Apply Now page also works
       if these elements are not handled by main script.
    ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");

  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    const closeButton = mobileMenu.querySelector(".mobile-menu-header button");

    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      document.body.classList.toggle("menu-open");

      const isOpen = mobileMenu.classList.contains("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    if (closeButton) {
      closeButton.addEventListener("click", function () {
        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    }

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =====================================================
       MOBILE LOAN DROPDOWN
    ===================================================== */

  const mobileDropdownButton = document.querySelector(".mobile-dropdown-btn");

  if (mobileDropdownButton) {
    mobileDropdownButton.addEventListener("click", function () {
      const dropdown = this.nextElementSibling;

      this.classList.toggle("active");

      if (dropdown) {
        dropdown.classList.toggle("active");
      }
    });
  }

  /* =====================================================
       PREVENT NON-NUMERIC LOAN AMOUNT
    ===================================================== */

  if (amountInput) {
    amountInput.addEventListener("keydown", function (event) {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Home",
        "End",
      ];

      if (allowedKeys.includes(event.key)) {
        return;
      }

      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
      }
    });
  }
});
