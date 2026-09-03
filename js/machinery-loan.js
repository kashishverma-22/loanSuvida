/* =========================================================
   MACHINERY LOAN PAGE JS
   Loan Suvida
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     HERO FORM
     ========================================================= */

  const machineryForm = document.getElementById("machineryLoanForm");

  const machineryName = document.getElementById("machineryName");
  const machineryMobile = document.getElementById("machineryMobile");
  const machineryType = document.getElementById("machineryType");
  const machineryAmount = document.getElementById("machineryAmount");

  const machineryNameError = document.getElementById("machineryNameError");

  const machineryMobileError = document.getElementById("machineryMobileError");

  const machineryFormSuccess = document.getElementById("machineryFormSuccess");

  /* =========================================================
     ERROR HELPER
     ========================================================= */

  function setMachineryError(element, message) {
    if (element) {
      element.textContent = message;
    }
  }

  function clearMachineryErrors() {
    if (machineryNameError) machineryNameError.textContent = "";
    if (machineryMobileError) machineryMobileError.textContent = "";
  }

  /* =========================================================
     MOBILE - ONLY NUMBERS
     ========================================================= */

  if (machineryMobile) {
    machineryMobile.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  /* =========================================================
     AMOUNT - ONLY NUMBERS
     ========================================================= */

  if (machineryAmount) {
    machineryAmount.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });
  }

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  if (machineryForm) {
    machineryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      clearMachineryErrors();

      if (machineryFormSuccess) {
        machineryFormSuccess.classList.remove("show");
      }

      let isValid = true;

      /* ---------------- NAME ---------------- */

      const nameValue = machineryName ? machineryName.value.trim() : "";

      if (nameValue === "") {
        setMachineryError(machineryNameError, "Please enter your full name.");

        isValid = false;
      } else if (nameValue.length < 3) {
        setMachineryError(
          machineryNameError,
          "Name must contain at least 3 characters.",
        );

        isValid = false;
      } else if (!/^[A-Za-z\s.]+$/.test(nameValue)) {
        setMachineryError(machineryNameError, "Please enter a valid name.");

        isValid = false;
      }

      /* ---------------- MOBILE ---------------- */

      const mobileValue = machineryMobile ? machineryMobile.value.trim() : "";

      if (mobileValue === "") {
        setMachineryError(
          machineryMobileError,
          "Please enter your mobile number.",
        );

        isValid = false;
      } else if (!/^[6-9][0-9]{9}$/.test(mobileValue)) {
        setMachineryError(
          machineryMobileError,
          "Please enter a valid 10 digit mobile number.",
        );

        isValid = false;
      }

      /* ---------------- MACHINERY TYPE ---------------- */

      if (machineryType && machineryType.value === "") {
        machineryType.style.borderColor = "#dc3545";

        isValid = false;
      } else if (machineryType) {
        machineryType.style.borderColor = "";
      }

      /* ---------------- AMOUNT ---------------- */

      const amountValue = machineryAmount ? machineryAmount.value.trim() : "";

      if (machineryAmount && amountValue !== "") {
        const amountNumber = Number(amountValue);

        if (amountNumber < 10000) {
          machineryAmount.style.borderColor = "#dc3545";

          isValid = false;
        } else {
          machineryAmount.style.borderColor = "";
        }
      }

      /* =====================================================
         STOP IF INVALID
         ===================================================== */

      if (!isValid) {
        const firstError = machineryForm.querySelector(
          ".machinery-error:not(:empty)",
        );

        if (firstError) {
          const inputGroup = firstError.closest(".machinery-input-group");

          if (inputGroup) {
            const input = inputGroup.querySelector("input, select");

            if (input) {
              input.focus();
            }
          }
        }

        return;
      }

      /* =====================================================
         FORM DATA
         ===================================================== */

      const machineryFormData = {
        name: nameValue,

        mobile: mobileValue,

        machineryType: machineryType ? machineryType.value : "",

        amount: amountValue ? Number(amountValue) : 0,
      };

      console.log("Machinery Loan Enquiry:", machineryFormData);

      /* =====================================================
         SUCCESS
         ===================================================== */

      if (machineryFormSuccess) {
        machineryFormSuccess.classList.add("show");
      }

      /* =====================================================
         RESET
         ===================================================== */

      machineryForm.reset();

      if (machineryAmount) {
        machineryAmount.style.borderColor = "";
      }

      if (machineryType) {
        machineryType.style.borderColor = "";
      }

      /* Hide success after 6 seconds */

      setTimeout(function () {
        if (machineryFormSuccess) {
          machineryFormSuccess.classList.remove("show");
        }
      }, 6000);
    });
  }

  /* =========================================================
     CLEAR ERROR WHILE TYPING
     ========================================================= */

  if (machineryName) {
    machineryName.addEventListener("input", function () {
      if (machineryNameError) {
        machineryNameError.textContent = "";
      }
    });
  }

  if (machineryMobile) {
    machineryMobile.addEventListener("input", function () {
      if (machineryMobileError) {
        machineryMobileError.textContent = "";
      }
    });
  }

  if (machineryType) {
    machineryType.addEventListener("change", function () {
      this.style.borderColor = "";
    });
  }

  if (machineryAmount) {
    machineryAmount.addEventListener("input", function () {
      this.style.borderColor = "";
    });
  }

  /* =========================================================
     EMI CALCULATOR
     ========================================================= */

  const machineryLoanAmount = document.getElementById("machineryLoanAmount");

  const machineryInterestRate = document.getElementById(
    "machineryInterestRate",
  );

  const machineryTenure = document.getElementById("machineryTenure");

  const machineryLoanAmountValue = document.getElementById(
    "machineryLoanAmountValue",
  );

  const machineryInterestValue = document.getElementById(
    "machineryInterestValue",
  );

  const machineryTenureValue = document.getElementById("machineryTenureValue");

  const machineryMonthlyEmi = document.getElementById("machineryMonthlyEmi");

  const machineryTotalInterest = document.getElementById(
    "machineryTotalInterest",
  );

  const machineryTotalAmount = document.getElementById("machineryTotalAmount");

  /* =========================================================
     FORMAT RUPEES
     ========================================================= */

  function formatMachineryRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  }

  /* =========================================================
     EMI CALCULATION
     ========================================================= */

  function calculateMachineryEMI() {
    if (!machineryLoanAmount || !machineryInterestRate || !machineryTenure) {
      return;
    }

    const principal = Number(machineryLoanAmount.value);

    const annualRate = Number(machineryInterestRate.value);

    const years = Number(machineryTenure.value);

    const monthlyRate = annualRate / 12 / 100;

    const months = years * 12;

    let emi = 0;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalAmount = emi * months;

    const totalInterest = totalAmount - principal;

    /* Update values */

    if (machineryLoanAmountValue) {
      machineryLoanAmountValue.textContent = formatMachineryRupees(principal);
    }

    if (machineryInterestValue) {
      machineryInterestValue.textContent = annualRate;
    }

    if (machineryTenureValue) {
      machineryTenureValue.textContent = years;
    }

    if (machineryMonthlyEmi) {
      machineryMonthlyEmi.textContent = "₹" + formatMachineryRupees(emi);
    }

    if (machineryTotalInterest) {
      machineryTotalInterest.textContent =
        "₹" + formatMachineryRupees(totalInterest);
    }

    if (machineryTotalAmount) {
      machineryTotalAmount.textContent =
        "₹" + formatMachineryRupees(totalAmount);
    }
  }

  /* =========================================================
     EMI EVENTS
     ========================================================= */

  if (machineryLoanAmount) {
    machineryLoanAmount.addEventListener("input", calculateMachineryEMI);
  }

  if (machineryInterestRate) {
    machineryInterestRate.addEventListener("input", calculateMachineryEMI);
  }

  if (machineryTenure) {
    machineryTenure.addEventListener("input", calculateMachineryEMI);
  }

  /* Initial calculation */

  calculateMachineryEMI();

  /* =========================================================
     FAQ ACCORDION
     ========================================================= */

  const machineryFaqItems = document.querySelectorAll(".machinery-faq-item");

  machineryFaqItems.forEach(function (item) {
    const question = item.querySelector(".machinery-faq-question");

    if (!question) return;

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      /* Close all other FAQs */

      machineryFaqItems.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });

      /* Open clicked FAQ */

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  /* =========================================================
     SMOOTH SCROLL FOR APPLY BUTTONS
     ========================================================= */

  const machineryApplyButtons = document.querySelectorAll(
    '.machinery-loan-page a[href="apply-now.html"]',
  );

  machineryApplyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
     
    });
  });
});
