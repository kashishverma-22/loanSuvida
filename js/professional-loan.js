document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       MOBILE NAVBAR
    ===================================================== */

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function (e) {
      e.preventDefault();

      navMenu.classList.toggle("show");

      const icon = mobileToggle.querySelector("i");

      if (icon) {
        if (navMenu.classList.contains("show")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* =====================================================
       DROPDOWN MENU
    ===================================================== */

  const dropdownParents = document.querySelectorAll(
    ".professional-loan-page .dropdown > a, " + ".main-navbar .dropdown > a",
  );

  dropdownParents.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const parent = this.parentElement;
      const dropdown = parent.querySelector(":scope > .dropdown-menu");

      if (!dropdown) return;

      /*
             Desktop par normal dropdown behavior
             Mobile par click se open hoga
            */

      if (window.innerWidth <= 991) {
        e.preventDefault();

        // Close other dropdowns
        document.querySelectorAll(".dropdown.open").forEach(function (item) {
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

  const subDropdownParents = document.querySelectorAll(
    ".main-navbar .sub-dropdown > a",
  );

  subDropdownParents.forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();

        const parent = this.parentElement;

        document
          .querySelectorAll(".sub-dropdown.open")
          .forEach(function (item) {
            if (item !== parent) {
              item.classList.remove("open");
            }
          });

        parent.classList.toggle("open");
      }
    });
  });

  /* =====================================================
       CLOSE NAVBAR AFTER CLICK
    ===================================================== */

  const navLinks = document.querySelectorAll(
    "#navMenu > li > a:not(.dropdown > a)",
  );

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991 && navMenu) {
        navMenu.classList.remove("show");

        const icon = mobileToggle?.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  /* =====================================================
       PROFESSIONAL LOAN FORM
    ===================================================== */

  const professionalForm = document.getElementById("professionalLoanForm");

  if (professionalForm) {
    const nameInput = document.getElementById("professionalName");
    const mobileInput = document.getElementById("professionalMobile");
    const loanTypeInput = document.getElementById("professionalLoanType");
    const amountInput = document.getElementById("professionalAmount");

    const nameError = document.getElementById("professionalNameError");
    const mobileError = document.getElementById("professionalMobileError");
    const loanTypeError = document.getElementById("professionalLoanTypeError");
    const amountError = document.getElementById("professionalAmountError");

    const formSuccess = document.getElementById("professionalFormSuccess");

    /* -----------------------------
           ERROR FUNCTIONS
        ----------------------------- */

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

    /* -----------------------------
           NAME
        ----------------------------- */

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

        if (this.value.trim().length >= 3) {
          removeError(this, nameError);
        }
      });
    }

    /* -----------------------------
           MOBILE
        ----------------------------- */

    if (mobileInput) {
      mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);

        if (/^[6-9][0-9]{9}$/.test(this.value)) {
          removeError(this, mobileError);
        }
      });
    }

    /* -----------------------------
           AMOUNT
        ----------------------------- */

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");

        if (this.value !== "") {
          removeError(this, amountError);
        }
      });
    }

    /* -----------------------------
           LOAN TYPE
        ----------------------------- */

    if (loanTypeInput) {
      loanTypeInput.addEventListener("change", function () {
        if (this.value !== "") {
          removeError(this, loanTypeError);
        }
      });
    }

    /* -----------------------------
           FORM SUBMIT
        ----------------------------- */

    professionalForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      const name = nameInput ? nameInput.value.trim() : "";

      const mobile = mobileInput ? mobileInput.value.trim() : "";

      const loanType = loanTypeInput ? loanTypeInput.value : "";

      const amount = amountInput ? Number(amountInput.value) : 0;

      /* NAME VALIDATION */

      if (name === "") {
        showError(nameInput, nameError, "Please enter your full name.");

        isValid = false;
      } else if (name.length < 3) {
        showError(
          nameInput,
          nameError,
          "Name must contain at least 3 characters.",
        );

        isValid = false;
      } else {
        removeError(nameInput, nameError);
      }

      /* MOBILE VALIDATION */

      if (mobile === "") {
        showError(mobileInput, mobileError, "Please enter your mobile number.");

        isValid = false;
      } else if (!/^[6-9][0-9]{9}$/.test(mobile)) {
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

      if (loanType === "") {
        showError(
          loanTypeInput,
          loanTypeError,
          "Please select your profession / loan type.",
        );

        isValid = false;
      } else {
        removeError(loanTypeInput, loanTypeError);
      }

      /* AMOUNT */

      if (!amountInput || amountInput.value.trim() === "") {
        showError(
          amountInput,
          amountError,
          "Please enter required loan amount.",
        );

        isValid = false;
      } else if (amount < 10000) {
        showError(
          amountInput,
          amountError,
          "Loan amount should be at least ₹10,000.",
        );

        isValid = false;
      } else {
        removeError(amountInput, amountError);
      }

      /* STOP IF INVALID */

      if (!isValid) {
        const firstError = professionalForm.querySelector(".input-error");

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      /* -----------------------------
               SUCCESS
            ----------------------------- */

      if (formSuccess) {
        formSuccess.classList.add("show");

        formSuccess.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    <span>
                        Thank you! Your request has been submitted.
                        Our team will contact you shortly.
                    </span>
                `;
      }

      /* FORM DATA */

      const formData = {
        name: name,
        mobile: mobile,
        loanType: loanType,
        amount: amount,
      };

      console.log("Professional Loan Form:", formData);

      /* RESET */

      professionalForm.reset();

      removeError(nameInput, nameError);
      removeError(mobileInput, mobileError);
      removeError(loanTypeInput, loanTypeError);
      removeError(amountInput, amountError);

      /* HIDE SUCCESS */

      setTimeout(function () {
        if (formSuccess) {
          formSuccess.classList.remove("show");
        }
      }, 6000);
    });
  }

  /* =====================================================
       EMI CALCULATOR
    ===================================================== */

  const loanAmount = document.getElementById("professionalLoanAmount");
  const interestRate = document.getElementById("professionalInterestRate");
  const loanTenure = document.getElementById("professionalTenure");

  const loanAmountValue = document.getElementById(
    "professionalLoanAmountValue",
  );

  const interestValue = document.getElementById("professionalInterestValue");

  const tenureValue = document.getElementById("professionalTenureValue");

  const monthlyEmi = document.getElementById("professionalMonthlyEmi");

  const totalInterest = document.getElementById("professionalTotalInterest");

  const totalAmount = document.getElementById("professionalTotalAmount");

  /* -----------------------------
       INDIAN CURRENCY FORMAT
    ----------------------------- */

  function formatIndianCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  /* -----------------------------
       EMI CALCULATION
    ----------------------------- */

  function calculateProfessionalEMI() {
    if (!loanAmount || !interestRate || !loanTenure) {
      return;
    }

    const principal = Number(loanAmount.value);
    const annualRate = Number(interestRate.value);
    const years = Number(loanTenure.value);

    const months = years * 12;

    const monthlyRate = annualRate / 12 / 100;

    let emi = 0;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayable = emi * months;

    const interest = totalPayable - principal;

    /* DISPLAY VALUES */

    if (loanAmountValue) {
      loanAmountValue.textContent = formatIndianCurrency(principal);
    }

    if (interestValue) {
      interestValue.textContent = annualRate.toFixed(1) + "%";
    }

    if (tenureValue) {
      tenureValue.textContent = years + " Years";
    }

    if (monthlyEmi) {
      monthlyEmi.textContent = formatIndianCurrency(emi);
    }

    if (totalInterest) {
      totalInterest.textContent = formatIndianCurrency(interest);
    }

    if (totalAmount) {
      totalAmount.textContent = formatIndianCurrency(totalPayable);
    }
  }

  /* -----------------------------
       RANGE EVENTS
    ----------------------------- */

  if (loanAmount) {
    loanAmount.addEventListener("input", calculateProfessionalEMI);
  }

  if (interestRate) {
    interestRate.addEventListener("input", calculateProfessionalEMI);
  }

  if (loanTenure) {
    loanTenure.addEventListener("input", calculateProfessionalEMI);
  }

  /* INITIAL CALCULATION */

  calculateProfessionalEMI();

  /* =====================================================
       FAQ ACCORDION
    ===================================================== */

  const faqItems = document.querySelectorAll(
    ".professional-loan-page .professional-faq-item",
  );

  faqItems.forEach(function (item) {
    const question = item.querySelector(".professional-faq-question");

    const answer = item.querySelector(".professional-faq-answer");

    const icon = question ? question.querySelector("i") : null;

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      /* CLOSE ALL */

      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove("active");

        const otherAnswer = otherItem.querySelector(".professional-faq-answer");

        const otherIcon = otherItem.querySelector(
          ".professional-faq-question i",
        );

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherIcon) {
          otherIcon.classList.remove("fa-minus");

          otherIcon.classList.add("fa-plus");
        }
      });

      /* OPEN CLICKED */

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
       HASH / SECTION SCROLL
       
       Example:
       professional-loan.html#overview
       professional-loan.html#eligibility
       professional-loan.html#interest-rates
       professional-loan.html#emi-calculator
       professional-loan.html#faqs
       professional-loan.html#apply
    ===================================================== */

  function scrollToHash() {
    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    const target = document.querySelector(hash);

    if (!target) {
      return;
    }

    setTimeout(function () {
      const header = document.querySelector(".main-navbar");

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }, 300);
  }

  /* PAGE LOAD */

  scrollToHash();

  /* HASH CHANGE */

  window.addEventListener("hashchange", scrollToHash);

  /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

  document
    .querySelectorAll('.professional-loan-page a[href^="#"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        const id = this.getAttribute("href");

        if (!id || id === "#") {
          return;
        }

        const target = document.querySelector(id);

        if (!target) {
          return;
        }

        e.preventDefault();

        const header = document.querySelector(".main-navbar");

        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          15;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        /*
             URL me hash bhi update hoga
            */

        history.pushState(null, "", id);
      });
    });

  /* =====================================================
       RESIZE FIX
    ===================================================== */

  window.addEventListener("resize", function () {
   
    const activeFaq = document.querySelector(
      ".professional-loan-page .professional-faq-item.active",
    );

    if (activeFaq) {
      const answer = activeFaq.querySelector(".professional-faq-answer");

      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    }
  });
});
