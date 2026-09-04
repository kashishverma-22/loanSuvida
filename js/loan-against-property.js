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
       NAVBAR DROPDOWNS
    ========================================================= */

  const dropdownLinks = document.querySelectorAll(".nav-menu > .dropdown > a");

  dropdownLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();

        const parent = link.parentElement;

        document
          .querySelectorAll(".nav-menu > .dropdown")
          .forEach(function (item) {
            if (item !== parent) {
              item.classList.remove("open");
            }
          });

        parent.classList.toggle("open");
      }
    });
  });

  /* =========================================================
       NESTED DROPDOWN
    ========================================================= */

  const subDropdownLinks = document.querySelectorAll(".sub-dropdown > a");

  subDropdownLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();

        const parent = link.parentElement;

        document.querySelectorAll(".sub-dropdown").forEach(function (item) {
          if (item !== parent) {
            item.classList.remove("open");
          }
        });

        parent.classList.toggle("open");
      }
    });
  });

  /* =========================================================
       CLOSE MOBILE MENU AFTER NORMAL LINK CLICK
    ========================================================= */

  if (navMenu) {
    const normalLinks = navMenu.querySelectorAll(
      "a:not(.dropdown > a):not(.sub-dropdown > a)",
    );

    normalLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 991) {
          navMenu.classList.remove("active");

          const icon = mobileToggle?.querySelector("i");

          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }
        }
      });
    });
  }

  /* =========================================================
       LAP FORM VALIDATION
    ========================================================= */

  const lapForm = document.getElementById("lapLoanForm");

  if (lapForm) {
    const nameInput = document.getElementById("lapName");
    const mobileInput = document.getElementById("lapMobile");
    const loanTypeInput = document.getElementById("lapLoanType");
    const amountInput = document.getElementById("lapAmount");

    const nameError = document.getElementById("lapNameError");
    const mobileError = document.getElementById("lapMobileError");
    const loanTypeError = document.getElementById("lapLoanTypeError");
    const amountError = document.getElementById("lapAmountError");

    const successBox = document.getElementById("lapFormSuccess");

    /* -------------------------
           ERROR FUNCTIONS
        ------------------------- */

    function showError(input, errorBox, message) {
      if (input) {
        input.classList.add("input-error");
      }

      if (errorBox) {
        errorBox.textContent = message;
        errorBox.classList.add("show");
      }
    }

    function removeError(input, errorBox) {
      if (input) {
        input.classList.remove("input-error");
      }

      if (errorBox) {
        errorBox.textContent = "";
        errorBox.classList.remove("show");
      }
    }

    /* -------------------------
           ONLY NUMBERS - MOBILE
        ------------------------- */

    if (mobileInput) {
      mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);

        removeError(this, mobileError);
      });
    }

    /* -------------------------
           ONLY NUMBERS - AMOUNT
        ------------------------- */

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");

        removeError(this, amountError);
      });
    }

    /* -------------------------
           NAME LIVE ERROR REMOVE
        ------------------------- */

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        removeError(this, nameError);
      });
    }

    /* -------------------------
           LOAN TYPE ERROR REMOVE
        ------------------------- */

    if (loanTypeInput) {
      loanTypeInput.addEventListener("change", function () {
        removeError(this, loanTypeError);
      });
    }

    /* -------------------------
           FORM SUBMIT
        ------------------------- */

    lapForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      /* NAME */

      const name = nameInput ? nameInput.value.trim() : "";

      if (name.length < 3) {
        showError(nameInput, nameError, "Please enter your full name.");

        isValid = false;
      } else {
        removeError(nameInput, nameError);
      }

      /* MOBILE */

      const mobile = mobileInput ? mobileInput.value.trim() : "";

      if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        showError(
          mobileInput,
          mobileError,
          "Please enter a valid 10-digit mobile number.",
        );

        isValid = false;
      } else {
        removeError(mobileInput, mobileError);
      }

      /* LOAN TYPE */

      if (!loanTypeInput || loanTypeInput.value === "") {
        showError(loanTypeInput, loanTypeError, "Please select a loan type.");

        isValid = false;
      } else {
        removeError(loanTypeInput, loanTypeError);
      }

      /* AMOUNT */

      const amount = amountInput ? Number(amountInput.value) : 0;

      if (!amount || amount < 10000) {
        showError(
          amountInput,
          amountError,
          "Please enter a valid loan amount.",
        );

        isValid = false;
      } else {
        removeError(amountInput, amountError);
      }

      /* -------------------------
               IF INVALID
            ------------------------- */

      if (!isValid) {
        const firstError = lapForm.querySelector(".input-error");

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      /* -------------------------
               SUCCESS
            ------------------------- */

      if (successBox) {
        successBox.classList.add("show");

        successBox.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      /* FORM DATA */

      const formData = {
        name: name,
        mobile: mobile,
        loanType: loanTypeInput.value,
        amount: amount,
      };

      console.log("LAP Enquiry:", formData);

      /* RESET FORM */

      lapForm.reset();

      /* HIDE SUCCESS AFTER 6 SEC */

      setTimeout(function () {
        if (successBox) {
          successBox.classList.remove("show");
        }
      }, 6000);
    });
  }

  /* =========================================================
       EMI CALCULATOR
    ========================================================= */

  const loanAmount = document.getElementById("lapLoanAmount");
  const interestRate = document.getElementById("lapInterestRate");
  const tenure = document.getElementById("lapTenure");

  const loanAmountValue = document.getElementById("lapLoanAmountValue");
  const interestValue = document.getElementById("lapInterestValue");
  const tenureValue = document.getElementById("lapTenureValue");

  const monthlyEmi = document.getElementById("lapMonthlyEmi");
  const totalInterest = document.getElementById("lapTotalInterest");
  const totalAmount = document.getElementById("lapTotalAmount");

  /* =========================================================
       INDIAN CURRENCY FORMAT
    ========================================================= */

  function formatIndianNumber(number) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(number));
  }

  function formatCurrency(number) {
    return "₹" + formatIndianNumber(number);
  }

  /* =========================================================
       CALCULATE EMI
    ========================================================= */

  function calculateLAPEMI() {
    if (!loanAmount || !interestRate || !tenure) {
      return;
    }

    const principal = Number(loanAmount.value);
    const annualRate = Number(interestRate.value);
    const years = Number(tenure.value);

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    let emi = 0;

    /* ZERO INTEREST */

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      emi = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalPayable = emi * months;
    const interestPayable = totalPayable - principal;

    /* DISPLAY INPUT VALUES */

    if (loanAmountValue) {
      loanAmountValue.textContent = formatCurrency(principal);
    }

    if (interestValue) {
      interestValue.textContent = annualRate.toFixed(1) + "%";
    }

    if (tenureValue) {
      tenureValue.textContent = years + (years === 1 ? " Year" : " Years");
    }

    /* DISPLAY RESULTS */

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

  /* =========================================================
       EMI RANGE EVENTS
    ========================================================= */

  if (loanAmount) {
    loanAmount.addEventListener("input", calculateLAPEMI);
  }

  if (interestRate) {
    interestRate.addEventListener("input", calculateLAPEMI);
  }

  if (tenure) {
    tenure.addEventListener("input", calculateLAPEMI);
  }

  /* INITIAL CALCULATION */

  calculateLAPEMI();

  /* =========================================================
       FAQ ACCORDION
    ========================================================= */

  const faqItems = document.querySelectorAll(".lap-faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".lap-faq-question");

    const answer = item.querySelector(".lap-faq-answer");

    const icon = question ? question.querySelector("i") : null;

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      /* CLOSE ALL */

      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove("active");

        const otherAnswer = otherItem.querySelector(".lap-faq-answer");

        const otherIcon = otherItem.querySelector(".lap-faq-question i");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherIcon) {
          otherIcon.classList.remove("fa-minus");

          otherIcon.classList.add("fa-plus");
        }
      });

      /* OPEN CURRENT */

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
       SMOOTH SCROLL FOR INTERNAL LINKS
    ========================================================= */

  const smoothLinks = document.querySelectorAll('.lap-page a[href^="#"]');

  smoothLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =========================================================
       WINDOW RESIZE
    ========================================================= */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      if (navMenu) {
        navMenu.classList.remove("active");
      }

      document.querySelectorAll(".dropdown.open").forEach(function (item) {
        item.classList.remove("open");
      });

      document.querySelectorAll(".sub-dropdown.open").forEach(function (item) {
        item.classList.remove("open");
      });

      const icon = mobileToggle?.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
});
