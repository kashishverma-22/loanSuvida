/* =========================================================
   PERSONAL LOAN PAGE JS
   Loan Suvida
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       MOBILE NAVBAR
       ===================================================== */

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");

      const icon = mobileToggle.querySelector("i");

      if (navMenu.classList.contains("open")) {
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

  /* =====================================================
       DROPDOWN
       ===================================================== */

  const dropdowns = document.querySelectorAll(".dropdown");
  const subDropdowns = document.querySelectorAll(".sub-dropdown");

  /*
       Main dropdown
       Mobile = click
       Desktop = CSS hover
    */

  dropdowns.forEach(function (dropdown) {
    const mainLink = dropdown.querySelector(":scope > a");

    if (!mainLink) return;

    mainLink.addEventListener("click", function (e) {
      const isMobile = window.innerWidth <= 991;

      if (isMobile) {
        e.preventDefault();

        dropdowns.forEach(function (item) {
          if (item !== dropdown) {
            item.classList.remove("open");
          }
        });

        dropdown.classList.toggle("open");
      }
    });
  });

  /* =====================================================
       NESTED DROPDOWN
       ===================================================== */

  subDropdowns.forEach(function (subDropdown) {
    const subLink = subDropdown.querySelector(":scope > a");

    if (!subLink) return;

    subLink.addEventListener("click", function (e) {
      const isMobile = window.innerWidth <= 991;

      if (isMobile) {
        e.preventDefault();
        e.stopPropagation();

        subDropdown.classList.toggle("open");
      } else {
        /*
                   Desktop par # ko navigate hone se rokna
                */

        if (subLink.getAttribute("href") === "#") {
          e.preventDefault();
        }
      }
    });
  });

  /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
       ===================================================== */

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });

      subDropdowns.forEach(function (subDropdown) {
        subDropdown.classList.remove("open");
      });
    }
  });

  /* =====================================================
       CLOSE MOBILE MENU AFTER NORMAL LINK CLICK
       ===================================================== */

  if (navMenu) {
    const navLinks = navMenu.querySelectorAll("a[href]:not([href='#'])");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 991) {
          /*
                       Agar dropdown parent hai to menu immediately
                       close nahi hoga
                    */

          if (
            link.closest(".dropdown") &&
            link.closest(".dropdown") === link.parentElement
          ) {
            return;
          }

          navMenu.classList.remove("open");

          const icon = mobileToggle?.querySelector("i");

          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }
        }
      });
    });
  }

  /* =====================================================
       SMOOTH SCROLL FOR PERSONAL LOAN SECTION LINKS
       ===================================================== */

  document
    .querySelectorAll('a[href*="personal-loan.html#"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");

        if (!href) return;

        const hashIndex = href.indexOf("#");

        if (hashIndex === -1) return;

        const hash = href.substring(hashIndex);

        const target = document.querySelector(hash);

        /*
               Sirf current page par smooth scroll
            */

        const currentPage = window.location.pathname.split("/").pop();

        if (currentPage === "personal-loan.html" || currentPage === "") {
          if (target) {
            e.preventDefault();

            const header = document.querySelector(".main-navbar");

            const headerHeight = header ? header.offsetHeight : 80;

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
                       Mobile menu close
                    */

            if (navMenu) {
              navMenu.classList.remove("open");
            }

            if (mobileToggle) {
              const icon = mobileToggle.querySelector("i");

              if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
              }
            }
          }
        }
      });
    });

  /* =====================================================
       PERSONAL LOAN FORM
       ===================================================== */

  const personalLoanForm = document.getElementById("personalLoanForm");

  if (personalLoanForm) {
    const nameInput = document.getElementById("personalName");

    const mobileInput = document.getElementById("personalMobile");

    const loanTypeInput = document.getElementById("personalLoanType");

    const amountInput = document.getElementById("personalAmount");

    const consentInput = document.getElementById("personalConsent");

    const successBox = document.getElementById("personalFormSuccess");

    /* -----------------------------------------------
           ERROR ELEMENTS
        ------------------------------------------------ */

    const nameError = document.getElementById("personalNameError");

    const mobileError = document.getElementById("personalMobileError");

    const loanTypeError = document.getElementById("personalLoanTypeError");

    const amountError = document.getElementById("personalAmountError");

    const consentError = document.getElementById("personalConsentError");

    /* -----------------------------------------------
           ERROR FUNCTIONS
        ------------------------------------------------ */

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

    /* -----------------------------------------------
           NAME
        ------------------------------------------------ */

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

        if (this.value.trim().length >= 3) {
          removeError(this, nameError);
        }
      });
    }

    /* -----------------------------------------------
           MOBILE
        ------------------------------------------------ */

    if (mobileInput) {
      mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);

        if (/^[6-9][0-9]{9}$/.test(this.value)) {
          removeError(this, mobileError);
        }
      });
    }

    /* -----------------------------------------------
           LOAN AMOUNT
        ------------------------------------------------ */

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");

        const amount = Number(this.value);

        if (amount >= 10000) {
          removeError(this, amountError);
        }
      });
    }

    /* -----------------------------------------------
           SELECT
        ------------------------------------------------ */

    if (loanTypeInput) {
      loanTypeInput.addEventListener("change", function () {
        if (this.value.trim() !== "") {
          removeError(this, loanTypeError);
        }
      });
    }

    /* -----------------------------------------------
           CONSENT
        ------------------------------------------------ */

    if (consentInput) {
      consentInput.addEventListener("change", function () {
        if (this.checked) {
          removeError(this, consentError);
        }
      });
    }

    /* -----------------------------------------------
           FORM SUBMIT
        ------------------------------------------------ */

    personalLoanForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      /* NAME */

      const name = nameInput?.value.trim() || "";

      if (name.length < 3) {
        showError(nameInput, nameError, "Please enter your full name.");

        isValid = false;
      } else {
        removeError(nameInput, nameError);
      }

      /* MOBILE */

      const mobile = mobileInput?.value.trim() || "";

      if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        showError(
          mobileInput,
          mobileError,
          "Enter a valid 10-digit mobile number.",
        );

        isValid = false;
      } else {
        removeError(mobileInput, mobileError);
      }

      /* LOAN TYPE */

      const loanType = loanTypeInput?.value.trim() || "";

      if (!loanType) {
        showError(loanTypeInput, loanTypeError, "Please select a loan type.");

        isValid = false;
      } else {
        removeError(loanTypeInput, loanTypeError);
      }

      /* AMOUNT */

      const amount = Number(amountInput?.value || 0);

      if (amount < 10000) {
        showError(
          amountInput,
          amountError,
          "Please enter a loan amount of at least ₹10,000.",
        );

        isValid = false;
      } else {
        removeError(amountInput, amountError);
      }

      /* CONSENT */

      if (consentInput && !consentInput.checked) {
        showError(consentInput, consentError, "Please accept the consent.");

        isValid = false;
      } else {
        removeError(consentInput, consentError);
      }

      /* ---------------------------------------
                   INVALID
                --------------------------------------- */

      if (!isValid) {
        const firstError = personalLoanForm.querySelector(".input-error");

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      /* ---------------------------------------
                   FORM DATA
                --------------------------------------- */

      const formData = {
        name: name,

        mobile: mobile,

        loanType: loanType,

        amount: amount,
      };

      console.log("Personal Loan Enquiry:", formData);

      /* ---------------------------------------
                   SUCCESS
                --------------------------------------- */

      if (successBox) {
        successBox.classList.add("show");

        successBox.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i>
                        <span>
                            Thank you! Your enquiry has been submitted.
                            Our team will contact you shortly.
                        </span>
                    `;
      }

      /* RESET */

      personalLoanForm.reset();

      personalLoanForm
        .querySelectorAll(".input-error")
        .forEach(function (element) {
          element.classList.remove("input-error");
        });

      personalLoanForm
        .querySelectorAll(".personal-form-error")
        .forEach(function (element) {
          element.textContent = "";
        });

      /* Hide success after 6 sec */

      setTimeout(function () {
        if (successBox) {
          successBox.classList.remove("show");
        }
      }, 6000);
    });
  }

  /* =====================================================
       EMI CALCULATOR
       ===================================================== */

  const loanAmount = document.getElementById("personalLoanAmount");

  const interestRate = document.getElementById("personalInterestRate");

  const tenure = document.getElementById("personalTenure");

  const loanAmountValue = document.getElementById("personalLoanAmountValue");

  const interestValue = document.getElementById("personalInterestValue");

  const tenureValue = document.getElementById("personalTenureValue");

  const monthlyEmi = document.getElementById("personalMonthlyEmi");

  const totalInterest = document.getElementById("personalTotalInterest");

  const totalAmount = document.getElementById("personalTotalAmount");

  /* =====================================================
       INR FORMAT
       ===================================================== */

  function formatINR(number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  /* =====================================================
       CALCULATE EMI
       ===================================================== */

  function calculatePersonalEMI() {
    if (!loanAmount || !interestRate || !tenure) {
      return;
    }

    const principal = Number(loanAmount.value);

    const annualRate = Number(interestRate.value);

    const years = Number(tenure.value);

    const monthlyRate = annualRate / 12 / 100;

    const numberOfMonths = years * 12;

    let emi = 0;

    /* Zero interest */

    if (monthlyRate === 0) {
      emi = principal / numberOfMonths;
    } else {
      const power = Math.pow(1 + monthlyRate, numberOfMonths);

      emi = (principal * monthlyRate * power) / (power - 1);
    }

    const totalPayable = emi * numberOfMonths;

    const interest = totalPayable - principal;

    /* DISPLAY */

    if (loanAmountValue) {
      loanAmountValue.textContent = formatINR(principal);
    }

    if (interestValue) {
      interestValue.textContent = annualRate.toFixed(1) + "%";
    }

    if (tenureValue) {
      tenureValue.textContent = years + " Years";
    }

    if (monthlyEmi) {
      monthlyEmi.textContent = formatINR(emi);
    }

    if (totalInterest) {
      totalInterest.textContent = formatINR(interest);
    }

    if (totalAmount) {
      totalAmount.textContent = formatINR(totalPayable);
    }
  }

  /* =====================================================
       EMI EVENTS
       ===================================================== */

  if (loanAmount) {
    loanAmount.addEventListener("input", calculatePersonalEMI);
  }

  if (interestRate) {
    interestRate.addEventListener("input", calculatePersonalEMI);
  }

  if (tenure) {
    tenure.addEventListener("input", calculatePersonalEMI);
  }

  /* Initial calculation */

  calculatePersonalEMI();

  /* =====================================================
       FAQ ACCORDION
       ===================================================== */

  const faqItems = document.querySelectorAll(".personal-faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".personal-faq-question");

    const answer = item.querySelector(".personal-faq-answer");

    const icon = question?.querySelector("i");

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      /* Close all */

      faqItems.forEach(function (otherItem) {
        const otherAnswer = otherItem.querySelector(".personal-faq-answer");

        const otherIcon = otherItem.querySelector(".personal-faq-question i");

        otherItem.classList.remove("active");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherIcon) {
          otherIcon.classList.remove("fa-minus");

          otherIcon.classList.add("fa-plus");
        }
      });

      /* Open clicked item */

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
       OPEN FAQ FROM URL HASH
       ===================================================== */

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);

    if (target) {
      setTimeout(function () {
        const header = document.querySelector(".main-navbar");

        const headerHeight = header ? header.offsetHeight : 80;

        window.scrollTo({
          top:
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            15,

          behavior: "smooth",
        });
      }, 300);
    }
  }

  /* =====================================================
       RESIZE
       ===================================================== */

  window.addEventListener("resize", function () {
    /*
               Mobile menu reset
            */

    if (window.innerWidth > 991) {
      if (navMenu) {
        navMenu.classList.remove("open");
      }

      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });

      subDropdowns.forEach(function (item) {
        item.classList.remove("open");
      });
    }

    const activeFaq = document.querySelector(
      ".personal-faq-item.active .personal-faq-answer",
    );

    if (activeFaq) {
      activeFaq.style.maxHeight = activeFaq.scrollHeight + "px";
    }
  });
});
