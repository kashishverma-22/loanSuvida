document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
       MOBILE NAVBAR
    ========================================================= */

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      const icon = mobileToggle.querySelector("i");

      if (navMenu.classList.contains("active")) {
        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }
      } else {
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* =========================================================
       DROPDOWN MENU
    ========================================================= */

  const dropdownLinks = document.querySelectorAll(
    ".nav-menu .dropdown > a, .nav-menu .has-dropdown > a",
  );

  dropdownLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        const parent = this.parentElement;
        const dropdown = parent.querySelector(
          ":scope > .dropdown-menu, :scope > .dropdown-menu-custom",
        );

        if (dropdown) {
          e.preventDefault();

          parent.classList.toggle("open");

          // Close other dropdowns
          document
            .querySelectorAll(
              ".nav-menu .dropdown.open, .nav-menu .has-dropdown.open",
            )
            .forEach(function (item) {
              if (item !== parent) {
                item.classList.remove("open");
              }
            });
        }
      }
    });
  });

  /* =========================================================
       CLOSE MOBILE MENU AFTER CLICK
    ========================================================= */

  const navLinks = document.querySelectorAll(
    ".nav-menu > li > a:not(.dropdown > a)",
  );

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        if (
          !this.parentElement.classList.contains("dropdown") &&
          !this.parentElement.classList.contains("has-dropdown")
        ) {
          navMenu.classList.remove("active");

          const icon = mobileToggle ? mobileToggle.querySelector("i") : null;

          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }
        }
      }
    });
  });

  /* =========================================================
       EDUCATION LOAN FORM
    ========================================================= */

  const educationForm = document.getElementById("educationLoanForm");

  if (educationForm) {
    const nameInput = document.getElementById("educationName");
    const mobileInput = document.getElementById("educationMobile");
    const loanTypeInput = document.getElementById("educationLoanType");
    const amountInput = document.getElementById("educationAmount");

    const nameError = document.getElementById("educationNameError");
    const mobileError = document.getElementById("educationMobileError");
    const loanTypeError = document.getElementById("educationLoanTypeError");
    const amountError = document.getElementById("educationAmountError");

    const successMessage = document.getElementById("educationFormSuccess");

    /* ---------------------------------------------------------
           HELPER FUNCTIONS
        --------------------------------------------------------- */

    function showError(input, errorElement, message) {
      if (input) {
        input.classList.add("input-error");
      }

      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add("show");
      }
    }

    function removeError(input, errorElement) {
      if (input) {
        input.classList.remove("input-error");
      }

      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("show");
      }
    }

    /* ---------------------------------------------------------
           MOBILE NUMBER
        --------------------------------------------------------- */

    if (mobileInput) {
      mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);

        removeError(this, mobileError);
      });
    }

    /* ---------------------------------------------------------
           LOAN AMOUNT
        --------------------------------------------------------- */

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");

        removeError(this, amountError);
      });
    }

    /* ---------------------------------------------------------
           NAME LIVE VALIDATION
        --------------------------------------------------------- */

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

        removeError(this, nameError);
      });
    }

    /* ---------------------------------------------------------
           LOAN TYPE
        --------------------------------------------------------- */

    if (loanTypeInput) {
      loanTypeInput.addEventListener("change", function () {
        removeError(this, loanTypeError);
      });
    }

    /* ---------------------------------------------------------
           FORM SUBMIT
        --------------------------------------------------------- */

    educationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      let firstInvalidField = null;

      /* NAME */

      if (!nameInput || nameInput.value.trim().length < 3) {
        showError(nameInput, nameError, "Please enter your full name.");

        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = nameInput;
        }
      } else {
        removeError(nameInput, nameError);
      }

      /* MOBILE */

      const mobileValue = mobileInput ? mobileInput.value.trim() : "";

      const mobilePattern = /^[6-9][0-9]{9}$/;

      if (!mobilePattern.test(mobileValue)) {
        showError(
          mobileInput,
          mobileError,
          "Please enter a valid 10-digit mobile number.",
        );

        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = mobileInput;
        }
      } else {
        removeError(mobileInput, mobileError);
      }

      /* LOAN TYPE */

      if (!loanTypeInput || loanTypeInput.value.trim() === "") {
        showError(
          loanTypeInput,
          loanTypeError,
          "Please select an education loan type.",
        );

        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = loanTypeInput;
        }
      } else {
        removeError(loanTypeInput, loanTypeError);
      }

      /* AMOUNT */

      const amountValue = amountInput ? Number(amountInput.value) : 0;

      if (!amountInput || amountValue < 10000) {
        showError(
          amountInput,
          amountError,
          "Please enter a valid loan amount.",
        );

        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = amountInput;
        }
      } else {
        removeError(amountInput, amountError);
      }

      /* INVALID */

      if (!isValid) {
        if (firstInvalidField) {
          firstInvalidField.focus();

          firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        return;
      }

      /* SUCCESS */

      if (successMessage) {
        successMessage.textContent =
          "Thank you! Your education loan enquiry has been submitted successfully. Our team will contact you shortly.";

        successMessage.classList.add("show");
      }

      /* FORM DATA */

      const formData = {
        name: nameInput ? nameInput.value.trim() : "",
        mobile: mobileInput ? mobileInput.value.trim() : "",
        loanType: loanTypeInput ? loanTypeInput.value : "",
        amount: amountInput ? amountInput.value : "",
      };

      console.log("Education Loan Enquiry:", formData);

      /* RESET */

      educationForm.reset();

      /* REMOVE ERRORS */

      removeError(nameInput, nameError);
      removeError(mobileInput, mobileError);
      removeError(loanTypeInput, loanTypeError);
      removeError(amountInput, amountError);

      /* HIDE SUCCESS */

      setTimeout(function () {
        if (successMessage) {
          successMessage.classList.remove("show");
        }
      }, 6000);
    });
  }

  /* =========================================================
       EDUCATION LOAN EMI CALCULATOR
    ========================================================= */

  const loanAmount = document.getElementById("educationLoanAmount");
  const interestRate = document.getElementById("educationInterestRate");
  const tenure = document.getElementById("educationTenure");

  const loanAmountValue = document.getElementById("educationLoanAmountValue");

  const interestValue = document.getElementById("educationInterestValue");

  const tenureValue = document.getElementById("educationTenureValue");

  const monthlyEmi = document.getElementById("educationMonthlyEmi");

  const totalInterest = document.getElementById("educationTotalInterest");

  const totalAmount = document.getElementById("educationTotalAmount");

  /* ---------------------------------------------------------
       FORMAT INDIAN CURRENCY
    --------------------------------------------------------- */

  function formatIndianNumber(number) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(number);
  }

  function formatCurrency(number) {
    return "₹" + formatIndianNumber(number);
  }

  /* ---------------------------------------------------------
       CALCULATE EMI
    --------------------------------------------------------- */

  function calculateEducationEMI() {
    if (!loanAmount || !interestRate || !tenure) {
      return;
    }

    const principal = Number(loanAmount.value);

    const annualInterest = Number(interestRate.value);

    const years = Number(tenure.value);

    /* Update displayed values */

    if (loanAmountValue) {
      loanAmountValue.textContent = formatCurrency(principal);
    }

    if (interestValue) {
      interestValue.textContent = annualInterest.toFixed(1) + "%";
    }

    if (tenureValue) {
      tenureValue.textContent = years + (years === 1 ? " Year" : " Years");
    }

    /* Months */

    const months = years * 12;

    /* Monthly interest */

    const monthlyRate = annualInterest / 12 / 100;

    let emi;

    /* Zero interest */

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      emi = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalPayable = emi * months;

    const interestPayable = totalPayable - principal;

    /* Display */

    if (monthlyEmi) {
      monthlyEmi.textContent = formatCurrency(emi);
    }

    if (totalInterest) {
      totalInterest.textContent = formatCurrency(interestPayable);
    }

    if (totalAmount) {
      totalAmount.textContent = formatCurrency(totalPayable);
    }
  }

  /* ---------------------------------------------------------
       CALCULATOR EVENTS
    --------------------------------------------------------- */

  if (loanAmount) {
    loanAmount.addEventListener("input", calculateEducationEMI);
  }

  if (interestRate) {
    interestRate.addEventListener("input", calculateEducationEMI);
  }

  if (tenure) {
    tenure.addEventListener("input", calculateEducationEMI);
  }

  /* Initial calculation */

  calculateEducationEMI();

  /* =========================================================
       FAQ ACCORDION
    ========================================================= */

  const faqItems = document.querySelectorAll(
    ".education-loan-page .education-faq-item",
  );

  faqItems.forEach(function (item) {
    const question = item.querySelector(".education-faq-question");

    const answer = item.querySelector(".education-faq-answer");

    const icon = question ? question.querySelector("i") : null;

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      /* Close all FAQs */

      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove("active");

        const otherAnswer = otherItem.querySelector(".education-faq-answer");

        const otherIcon = otherItem.querySelector(".education-faq-question i");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherIcon) {
          otherIcon.classList.remove("fa-minus");

          otherIcon.classList.add("fa-plus");
        }
      });

      /* Open clicked FAQ */

      if (!isOpen) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";

        if (icon) {
          icon.classList.remove("fa-plus");

          icon.classList.add("fa-minus");
        }
      }
    });
  });

  /* =========================================================
       SMOOTH SCROLL FOR CTA
    ========================================================= */

  const applyButtons = document.querySelectorAll(
    '.education-loan-page a[href="#educationLoanForm"]',
  );

  applyButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const form = document.getElementById("educationLoanForm");

      if (form) {
        e.preventDefault();

        form.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(function () {
          const firstInput = document.getElementById("educationName");

          if (firstInput) {
            firstInput.focus();
          }
        }, 700);
      }
    });
  });

  /* =========================================================
       PHONE INPUT - PREVENT NON NUMERIC KEYS
    ========================================================= */

  const phoneInput = document.getElementById("educationMobile");

  if (phoneInput) {
    phoneInput.addEventListener("keypress", function (e) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  /* =========================================================
       LOAN AMOUNT COMMA DISPLAY
       Only if input is text type
    ========================================================= */

  const amountField = document.getElementById("educationAmount");

  if (amountField) {
    amountField.addEventListener("blur", function () {
      if (this.value) {
        const value = Number(this.value.replace(/,/g, ""));

        if (!isNaN(value)) {
          this.value = value;
        }
      }
    });
  }
});
