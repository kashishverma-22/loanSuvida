document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     HOME LOAN PAGE JAVASCRIPT
     ========================================================= */

  /* =========================================================
     1. MOBILE NAVBAR
     ========================================================= */

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

    /* =====================================================
       MOBILE DROPDOWN
       ===================================================== */

    const dropdownLinks = navMenu.querySelectorAll(".dropdown > a");

    dropdownLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          e.stopPropagation();

          const parent = this.parentElement;

          /* Close other dropdowns */

          navMenu.querySelectorAll(".dropdown.open").forEach(function (item) {
            if (item !== parent) {
              item.classList.remove("open");
            }
          });

          parent.classList.toggle("open");
        }
      });
    });

    /* =====================================================
       NESTED DROPDOWN
       ===================================================== */

    const subDropdownLinks = navMenu.querySelectorAll(".sub-dropdown > a");

    subDropdownLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          e.stopPropagation();

          const parent = this.parentElement;

          parent.classList.toggle("open");
        }
      });
    });

    /* =====================================================
       CLOSE MENU AFTER NORMAL LINK CLICK
       ===================================================== */

    const normalLinks = navMenu.querySelectorAll(
      "a:not(.dropdown > a):not(.sub-dropdown > a)",
    );

    normalLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 991) {
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

  /* =========================================================
     2. HOME LOAN FORM
     ========================================================= */

  const homeLoanForm = document.getElementById("homeLoanForm");

  const homeName = document.getElementById("homeName");

  const homeMobile = document.getElementById("homeMobile");

  const homeLoanType = document.getElementById("homeLoanType");

  const homeAmount = document.getElementById("homeAmount");

  const homeNameError = document.getElementById("homeNameError");

  const homeMobileError = document.getElementById("homeMobileError");

  const homeLoanTypeError = document.getElementById("homeLoanTypeError");

  const homeAmountError = document.getElementById("homeAmountError");

  const homeFormSuccess = document.getElementById("homeFormSuccess");

  /* =========================================================
     ERROR FUNCTIONS
     ========================================================= */

  function showError(input, errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
    }

    if (input) {
      input.classList.add("input-error");
    }
  }

  function removeError(input, errorElement) {
    if (errorElement) {
      errorElement.textContent = "";
    }

    if (input) {
      input.classList.remove("input-error");
    }
  }

  /* =========================================================
     REMOVE ERROR WHILE USER TYPES
     ========================================================= */

  if (homeName) {
    homeName.addEventListener("input", function () {
      if (this.value.trim().length >= 3) {
        removeError(this, homeNameError);
      }
    });
  }

  if (homeMobile) {
    homeMobile.addEventListener("input", function () {
      /* Only numbers */

      this.value = this.value.replace(/\D/g, "");

      /* Maximum 10 digits */

      this.value = this.value.substring(0, 10);

      if (/^[6-9][0-9]{9}$/.test(this.value)) {
        removeError(this, homeMobileError);
      }
    });
  }

  if (homeLoanType) {
    homeLoanType.addEventListener("change", function () {
      if (this.value !== "") {
        removeError(this, homeLoanTypeError);
      }
    });
  }

  if (homeAmount) {
    homeAmount.addEventListener("input", function () {
      /* Only numbers */

      this.value = this.value.replace(/\D/g, "");

      if (Number(this.value) >= 100000) {
        removeError(this, homeAmountError);
      }
    });
  }

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  if (homeLoanForm) {
    homeLoanForm.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Remove old errors */

      removeError(homeName, homeNameError);
      removeError(homeMobile, homeMobileError);
      removeError(homeLoanType, homeLoanTypeError);
      removeError(homeAmount, homeAmountError);

      let isValid = true;

      /* =====================================================
         NAME VALIDATION
         ===================================================== */

      const nameValue = homeName ? homeName.value.trim() : "";

      if (nameValue === "") {
        showError(homeName, homeNameError, "Please enter your full name.");

        isValid = false;
      } else if (nameValue.length < 3) {
        showError(
          homeName,
          homeNameError,
          "Name must be at least 3 characters.",
        );

        isValid = false;
      } else if (!/^[A-Za-z ]+$/.test(nameValue)) {
        showError(homeName, homeNameError, "Please enter a valid name.");

        isValid = false;
      }

      /* =====================================================
         MOBILE VALIDATION
         ===================================================== */

      const mobileValue = homeMobile ? homeMobile.value.trim() : "";

      if (mobileValue === "") {
        showError(
          homeMobile,
          homeMobileError,
          "Please enter your mobile number.",
        );

        isValid = false;
      } else if (!/^[6-9][0-9]{9}$/.test(mobileValue)) {
        showError(
          homeMobile,
          homeMobileError,
          "Please enter a valid 10-digit mobile number.",
        );

        isValid = false;
      }

      /* =====================================================
         LOAN TYPE VALIDATION
         ===================================================== */

      if (!homeLoanType || homeLoanType.value === "") {
        showError(
          homeLoanType,
          homeLoanTypeError,
          "Please select a home loan type.",
        );

        isValid = false;
      }

      /* =====================================================
         LOAN AMOUNT VALIDATION
         ===================================================== */

      const amountValue = homeAmount ? homeAmount.value.replace(/\D/g, "") : "";

      const amountNumber = Number(amountValue);

      if (amountValue === "") {
        showError(
          homeAmount,
          homeAmountError,
          "Please enter the required loan amount.",
        );

        isValid = false;
      } else if (amountNumber < 100000) {
        showError(
          homeAmount,
          homeAmountError,
          "Loan amount should be at least ₹1,00,000.",
        );

        isValid = false;
      }

      /* =====================================================
         STOP IF INVALID
         ===================================================== */

      if (!isValid) {
        const firstError = homeLoanForm.querySelector(".input-error");

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      /* =====================================================
         FORM DATA
         ===================================================== */

      const formData = {
        name: nameValue,

        mobile: mobileValue,

        loanType: homeLoanType.value,

        amount: amountNumber,
      };

      console.log("Home Loan Enquiry:", formData);

      /* =====================================================
         SUCCESS MESSAGE
         ===================================================== */

      if (homeFormSuccess) {
        homeFormSuccess.classList.add("show");
      }

      /* =====================================================
         RESET FORM
         ===================================================== */

      homeLoanForm.reset();

      /* Remove error classes */

      homeLoanForm.querySelectorAll(".input-error").forEach(function (input) {
        input.classList.remove("input-error");
      });

      /* =====================================================
         HIDE SUCCESS AFTER 6 SECONDS
         ===================================================== */

      setTimeout(function () {
        if (homeFormSuccess) {
          homeFormSuccess.classList.remove("show");
        }
      }, 6000);
    });
  }

  /* =========================================================
     3. HOME LOAN EMI CALCULATOR
     ========================================================= */

  const homeLoanAmount = document.getElementById("homeLoanAmount");

  const homeInterestRate = document.getElementById("homeInterestRate");

  const homeTenure = document.getElementById("homeTenure");

  const homeLoanAmountValue = document.getElementById("homeLoanAmountValue");

  const homeInterestValue = document.getElementById("homeInterestValue");

  const homeTenureValue = document.getElementById("homeTenureValue");

  const homeMonthlyEmi = document.getElementById("homeMonthlyEmi");

  const homeTotalInterest = document.getElementById("homeTotalInterest");

  const homeTotalAmount = document.getElementById("homeTotalAmount");

  /* =========================================================
     INDIAN CURRENCY FORMAT
     ========================================================= */

  function formatIndianCurrency(number) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(number));
  }

  /* =========================================================
     CALCULATE EMI
     ========================================================= */

  function calculateHomeLoanEMI() {
    if (!homeLoanAmount || !homeInterestRate || !homeTenure) {
      return;
    }

    const principal = Number(homeLoanAmount.value);

    const annualInterest = Number(homeInterestRate.value);

    const years = Number(homeTenure.value);

    const months = years * 12;

    /* Monthly interest */

    const monthlyInterest = annualInterest / 12 / 100;

    let emi;

    /* =====================================================
       EMI FORMULA
       ===================================================== */

    if (monthlyInterest === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
        (Math.pow(1 + monthlyInterest, months) - 1);
    }

    /* =====================================================
       TOTAL AMOUNT
       ===================================================== */

    const totalAmount = emi * months;

    const totalInterest = totalAmount - principal;

    /* =====================================================
       UPDATE UI
       ===================================================== */

    if (homeLoanAmountValue) {
      homeLoanAmountValue.textContent = formatIndianCurrency(principal);
    }

    if (homeInterestValue) {
      homeInterestValue.textContent = annualInterest.toFixed(1);
    }

    if (homeTenureValue) {
      homeTenureValue.textContent = years;
    }

    if (homeMonthlyEmi) {
      homeMonthlyEmi.textContent = "₹" + formatIndianCurrency(emi);
    }

    if (homeTotalInterest) {
      homeTotalInterest.textContent = "₹" + formatIndianCurrency(totalInterest);
    }

    if (homeTotalAmount) {
      homeTotalAmount.textContent = "₹" + formatIndianCurrency(totalAmount);
    }
  }

  /* =========================================================
     CALCULATOR EVENTS
     ========================================================= */

  if (homeLoanAmount) {
    homeLoanAmount.addEventListener("input", calculateHomeLoanEMI);
  }

  if (homeInterestRate) {
    homeInterestRate.addEventListener("input", calculateHomeLoanEMI);
  }

  if (homeTenure) {
    homeTenure.addEventListener("input", calculateHomeLoanEMI);
  }

  /* =========================================================
     INITIAL CALCULATION
     ========================================================= */

  calculateHomeLoanEMI();

  /* =========================================================
     4. FAQ ACCORDION
     ========================================================= */

  const faqItems = document.querySelectorAll(".home-faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".home-faq-question");

    const answer = item.querySelector(".home-faq-answer");

    const icon = question ? question.querySelector("i") : null;

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      /* Close all other FAQs */

      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove("active");

          const otherAnswer = otherItem.querySelector(".home-faq-answer");

          const otherIcon = otherItem.querySelector(".home-faq-question i");

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }

          if (otherIcon) {
            otherIcon.classList.remove("fa-minus");

            otherIcon.classList.add("fa-plus");
          }
        }
      });

      /* =====================================================
         OPEN FAQ
         ===================================================== */

      if (!isOpen) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";

        if (icon) {
          icon.classList.remove("fa-plus");

          icon.classList.add("fa-minus");
        }
      } else {
        item.classList.remove("active");

        answer.style.maxHeight = null;

        if (icon) {
          icon.classList.remove("fa-minus");

          icon.classList.add("fa-plus");
        }
      }
    });
  });

  /* =========================================================
     5. SMOOTH SCROLL
     ========================================================= */

  const smoothLinks = document.querySelectorAll('.home-loan-page a[href^="#"]');

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
     6. WINDOW RESIZE
     ========================================================= */

  window.addEventListener("resize", function () {
    /* Desktop par mobile menu reset */

    if (window.innerWidth > 991 && navMenu) {
      navMenu.classList.remove("active");

      navMenu.querySelectorAll(".dropdown.open").forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });

      const icon = mobileToggle ? mobileToggle.querySelector("i") : null;

      if (icon) {
        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");
      }
    }

    /* Recalculate open FAQ height */

    faqItems.forEach(function (item) {
      if (item.classList.contains("active")) {
        const answer = item.querySelector(".home-faq-answer");

        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      }
    });
  });

  /* =========================================================
     7. PREVENT NON-NUMERIC LOAN AMOUNT
     ========================================================= */

  if (homeAmount) {
    homeAmount.addEventListener("keypress", function (e) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  /* =========================================================
     8. PREVENT NON-NUMERIC MOBILE
     ========================================================= */

  if (homeMobile) {
    homeMobile.addEventListener("keypress", function (e) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  /* =========================================================
     PAGE READY
     ========================================================= */

  console.log("Home Loan page JavaScript loaded successfully.");
});
