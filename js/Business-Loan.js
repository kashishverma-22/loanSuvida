/* =========================================================
   BUSINESS LOAN PAGE JS
   Loan Suvida
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       MOBILE NAVBAR
       ===================================================== */

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

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

    /* Close menu when clicking outside */
    document.addEventListener("click", function (e) {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        navMenu.classList.remove("active");

        const icon = mobileToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* =====================================================
       DROPDOWN MENU
       ===================================================== */

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    const dropdownLink = dropdown.querySelector(":scope > a");

    if (!dropdownLink) return;

    dropdownLink.addEventListener("click", function (e) {
      /* Mobile only */
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();

        /* Close other dropdowns */
        dropdowns.forEach(function (otherDropdown) {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("open");
          }
        });

        dropdown.classList.toggle("open");
      }
    });
  });

  /* =====================================================
       NESTED / SUB DROPDOWN
       ===================================================== */

  const subDropdowns = document.querySelectorAll(".sub-dropdown");

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

  /* =====================================================
       CLOSE MOBILE MENU AFTER NORMAL LINK CLICK
       ===================================================== */

  const normalLinks = document.querySelectorAll(
    "#navMenu a:not(.dropdown > a):not(.sub-dropdown > a)",
  );

  normalLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991 && navMenu) {
        navMenu.classList.remove("active");

        const icon = mobileToggle ? mobileToggle.querySelector("i") : null;

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  /* =====================================================
       BUSINESS LOAN FORM
       ===================================================== */

  const businessForm = document.getElementById("businessLoanForm");

  if (businessForm) {
    const nameInput = document.getElementById("businessName");
    const mobileInput = document.getElementById("businessMobile");
    const loanTypeInput = document.getElementById("businessLoanType");
    const amountInput = document.getElementById("businessAmount");

    const nameError = document.getElementById("businessNameError");
    const mobileError = document.getElementById("businessMobileError");
    const loanTypeError = document.getElementById("businessLoanTypeError");
    const amountError = document.getElementById("businessAmountError");

    const successBox = document.getElementById("businessFormSuccess");

    /* =================================================
           ERROR FUNCTIONS
           ================================================= */

    function showError(input, errorElement, message) {
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

    /* =================================================
           NAME VALIDATION
           ================================================= */

    function validateName() {
      if (!nameInput) return true;

      const name = nameInput.value.trim();

      if (name === "") {
        showError(nameInput, nameError, "Please enter your name.");

        return false;
      }

      if (name.length < 3) {
        showError(
          nameInput,
          nameError,
          "Name must contain at least 3 characters.",
        );

        return false;
      }

      if (!/^[A-Za-z ]+$/.test(name)) {
        showError(nameInput, nameError, "Please enter a valid name.");

        return false;
      }

      removeError(nameInput, nameError);

      return true;
    }

    /* =================================================
           MOBILE VALIDATION
           ================================================= */

    function validateMobile() {
      if (!mobileInput) return true;

      const mobile = mobileInput.value.trim();

      if (mobile === "") {
        showError(mobileInput, mobileError, "Please enter your mobile number.");

        return false;
      }

      if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        showError(
          mobileInput,
          mobileError,
          "Enter a valid 10-digit mobile number.",
        );

        return false;
      }

      removeError(mobileInput, mobileError);

      return true;
    }

    /* =================================================
           LOAN TYPE VALIDATION
           ================================================= */

    function validateLoanType() {
      if (!loanTypeInput) return true;

      if (loanTypeInput.value === "") {
        showError(
          loanTypeInput,
          loanTypeError,
          "Please select your loan type.",
        );

        return false;
      }

      removeError(loanTypeInput, loanTypeError);

      return true;
    }

    /* =================================================
           LOAN AMOUNT VALIDATION
           ================================================= */

    function validateAmount() {
      if (!amountInput) return true;

      const amount = amountInput.value.trim();

      if (amount === "") {
        showError(
          amountInput,
          amountError,
          "Please enter the required loan amount.",
        );

        return false;
      }

      const numericAmount = Number(amount.replace(/,/g, ""));

      if (isNaN(numericAmount)) {
        showError(amountInput, amountError, "Please enter a valid amount.");

        return false;
      }

      if (numericAmount < 10000) {
        showError(
          amountInput,
          amountError,
          "Loan amount should be at least ₹10,000.",
        );

        return false;
      }

      removeError(amountInput, amountError);

      return true;
    }

    /* =================================================
           ONLY NUMBERS IN MOBILE
           ================================================= */

    if (mobileInput) {
      mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);

        if (this.value.length === 10) {
          validateMobile();
        }
      });
    }

    /* =================================================
           ONLY NUMBERS IN AMOUNT
           ================================================= */

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\d]/g, "");

        if (this.value !== "") {
          validateAmount();
        }
      });
    }

    /* =================================================
           LIVE ERROR CLEAR
           ================================================= */

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        validateName();
      });
    }

    if (mobileInput) {
      mobileInput.addEventListener("blur", function () {
        validateMobile();
      });
    }

    if (loanTypeInput) {
      loanTypeInput.addEventListener("change", function () {
        validateLoanType();
      });
    }

    if (amountInput) {
      amountInput.addEventListener("blur", function () {
        validateAmount();
      });
    }

    /* =================================================
           FORM SUBMIT
           ================================================= */

    businessForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const validName = validateName();
      const validMobile = validateMobile();
      const validLoanType = validateLoanType();
      const validAmount = validateAmount();

      if (!validName || !validMobile || !validLoanType || !validAmount) {
        const firstError = businessForm.querySelector(".input-error");

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      /* =================================================
               FORM DATA
               ================================================= */

      const formData = {
        name: nameInput ? nameInput.value.trim() : "",

        mobile: mobileInput ? mobileInput.value.trim() : "",

        loanType: loanTypeInput ? loanTypeInput.value : "",

        amount: amountInput ? amountInput.value.trim() : "",
      };

      console.log("Business Loan Application:", formData);

      /* =================================================
               BUTTON LOADING
               ================================================= */

      const submitButton = businessForm.querySelector(".business-submit-btn");

      const originalButtonText = submitButton ? submitButton.innerHTML : "";

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
      }

      /* =================================================
               SUCCESS
               ================================================= */

      setTimeout(function () {
        if (successBox) {
          successBox.classList.add("show");
        }

        businessForm.reset();

        removeError(nameInput, nameError);
        removeError(mobileInput, mobileError);
        removeError(loanTypeInput, loanTypeError);
        removeError(amountInput, amountError);

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML =
            originalButtonText ||
            'Submit Requirement <i class="fa-solid fa-arrow-right"></i>';
        }

        /* Hide success after 6 seconds */

        setTimeout(function () {
          if (successBox) {
            successBox.classList.remove("show");
          }
        }, 6000);
      }, 900);
    });
  }

  /* =====================================================
       EMI CALCULATOR
       ===================================================== */

  const loanAmountSlider = document.getElementById("businessLoanAmount");

  const interestRateSlider = document.getElementById("businessInterestRate");

  const tenureSlider = document.getElementById("businessTenure");

  const loanAmountValue = document.getElementById("businessLoanAmountValue");

  const interestValue = document.getElementById("businessInterestValue");

  const tenureValue = document.getElementById("businessTenureValue");

  const monthlyEmi = document.getElementById("businessMonthlyEmi");

  const totalInterest = document.getElementById("businessTotalInterest");

  const totalAmount = document.getElementById("businessTotalAmount");

  /* =====================================================
       INDIAN NUMBER FORMAT
       ===================================================== */

  function formatIndianNumber(number) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(number));
  }

  function formatRupee(number) {
    return "₹" + formatIndianNumber(number);
  }

  /* =====================================================
       CALCULATE EMI
       ===================================================== */

  function calculateBusinessEMI() {
    if (!loanAmountSlider || !interestRateSlider || !tenureSlider) {
      return;
    }

    const principal = Number(loanAmountSlider.value);

    const annualRate = Number(interestRateSlider.value);

    const years = Number(tenureSlider.value);

    const monthlyRate = annualRate / 12 / 100;

    const totalMonths = years * 12;

    let emi = 0;

    /* Zero interest case */

    if (monthlyRate === 0) {
      emi = principal / totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);

      emi = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalPayment = emi * totalMonths;

    const interest = totalPayment - principal;

    /* Update values */

    if (loanAmountValue) {
      loanAmountValue.textContent = formatRupee(principal);
    }

    if (interestValue) {
      interestValue.textContent = annualRate + "%";
    }

    if (tenureValue) {
      tenureValue.textContent = years + (years === 1 ? " Year" : " Years");
    }

    if (monthlyEmi) {
      monthlyEmi.textContent = formatRupee(emi);
    }

    if (totalInterest) {
      totalInterest.textContent = formatRupee(interest);
    }

    if (totalAmount) {
      totalAmount.textContent = formatRupee(totalPayment);
    }
  }

  /* =====================================================
       RANGE EVENTS
       ===================================================== */

  if (loanAmountSlider) {
    loanAmountSlider.addEventListener("input", calculateBusinessEMI);
  }

  if (interestRateSlider) {
    interestRateSlider.addEventListener("input", calculateBusinessEMI);
  }

  if (tenureSlider) {
    tenureSlider.addEventListener("input", calculateBusinessEMI);
  }

  /* Initial calculation */

  calculateBusinessEMI();

  /* =====================================================
       FAQ ACCORDION
       ===================================================== */

  const faqItems = document.querySelectorAll(".business-faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".business-faq-question");

    const answer = item.querySelector(".business-faq-answer");

    const icon = question ? question.querySelector("i") : null;

    if (!question || !answer) return;

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      /* Close all FAQ */

      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove("active");

        const otherAnswer = otherItem.querySelector(".business-faq-answer");

        const otherIcon = otherItem.querySelector(".business-faq-question i");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherIcon) {
          otherIcon.classList.remove("fa-minus");

          otherIcon.classList.add("fa-plus");
        }
      });

      /* Open clicked FAQ */

      if (!isActive) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";

        if (icon) {
          icon.classList.remove("fa-plus");

          icon.classList.add("fa-minus");
        }
      }
    });
  });

  /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

  const applyLinks = document.querySelectorAll('a[href="#businessLoanForm"]');

  applyLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const form = document.getElementById("businessLoanForm");

      if (!form) return;

      e.preventDefault();

      form.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(function () {
        const nameField = document.getElementById("businessName");

        if (nameField) {
          nameField.focus();
        }
      }, 600);
    });
  });

  /* =====================================================
       RESIZE HANDLER
       ===================================================== */

  window.addEventListener("resize", function () {
    /* Close mobile nav when switching desktop */

    if (window.innerWidth > 991 && navMenu) {
      navMenu.classList.remove("active");

      const icon = mobileToggle ? mobileToggle.querySelector("i") : null;

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }

    /* Recalculate open FAQ height */

    const activeFaq = document.querySelector(
      ".business-faq-item.active .business-faq-answer",
    );

    if (activeFaq) {
      activeFaq.style.maxHeight = activeFaq.scrollHeight + "px";
    }
  });
});
