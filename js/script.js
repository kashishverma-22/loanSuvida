document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
       MOBILE MENU
    ========================================= */

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();

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

  /* =========================================
       MAIN DROPDOWNS
    ========================================= */

  const dropdowns = document.querySelectorAll(".nav-menu > li.dropdown");

  dropdowns.forEach(function (dropdown) {
    const link = dropdown.querySelector(":scope > a");

    if (!link) return;

    link.addEventListener("click", function (e) {
      /* Mobile only */
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();

        /* Close other dropdowns */
        dropdowns.forEach(function (otherDropdown) {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("open");

            const nestedMenus =
              otherDropdown.querySelectorAll(".sub-dropdown.open");

            nestedMenus.forEach(function (item) {
              item.classList.remove("open");
            });
          }
        });

        dropdown.classList.toggle("open");

        /* Rotate arrow */
        const icon = link.querySelector("i");

        if (icon) {
          icon.style.transform = dropdown.classList.contains("open")
            ? "rotate(180deg)"
            : "rotate(0deg)";
        }
      }
    });
  });

  /* =========================================
       NESTED DROPDOWNS
    ========================================= */

  const subDropdowns = document.querySelectorAll(".sub-dropdown");

  subDropdowns.forEach(function (subDropdown) {
    const subLink = subDropdown.querySelector(":scope > a");

    if (!subLink) return;

    subLink.addEventListener("click", function (e) {
      /* Mobile */
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();

        const parentDropdown = subDropdown.closest(".dropdown");

        if (parentDropdown) {
          const siblings = parentDropdown.querySelectorAll(
            ":scope > .dropdown-menu > .sub-dropdown",
          );

          siblings.forEach(function (item) {
            if (item !== subDropdown) {
              item.classList.remove("open");
            }
          });
        }

        subDropdown.classList.toggle("open");

        const icon = subLink.querySelector("i");

        if (icon) {
          icon.style.transform = subDropdown.classList.contains("open")
            ? "rotate(90deg)"
            : "rotate(0deg)";
        }
      }
    });
  });

  /* =========================================
       CLOSE MENU WHEN CLICK OUTSIDE
    ========================================= */

  document.addEventListener("click", function (e) {
    if (
      navMenu &&
      mobileToggle &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      navMenu.classList.remove("show");

      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");

        const icon = dropdown.querySelector(":scope > a i");

        if (icon) {
          icon.style.transform = "rotate(0deg)";
        }
      });

      subDropdowns.forEach(function (subDropdown) {
        subDropdown.classList.remove("open");

        const icon = subDropdown.querySelector(":scope > a i");

        if (icon) {
          icon.style.transform = "rotate(0deg)";
        }
      });

      const mobileIcon = mobileToggle.querySelector("i");

      if (mobileIcon) {
        mobileIcon.classList.remove("fa-xmark");
        mobileIcon.classList.add("fa-bars");
      }
    }
  });

  /* =========================================
       CLOSE MOBILE MENU AFTER NORMAL LINK
    ========================================= */

  const normalLinks = document.querySelectorAll(
    ".nav-menu a:not(.dropdown > a):not(.sub-dropdown > a)",
  );

  normalLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        navMenu.classList.remove("show");

        dropdowns.forEach(function (dropdown) {
          dropdown.classList.remove("open");
        });

        subDropdowns.forEach(function (subDropdown) {
          subDropdown.classList.remove("open");
        });
      }
    });
  });

  /* =========================================
       RESET ON DESKTOP
    ========================================= */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      navMenu.classList.remove("show");

      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });

      subDropdowns.forEach(function (subDropdown) {
        subDropdown.classList.remove("open");
      });
    }
  });
});

// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  // ================================
  // GET ELEMENTS
  // ================================

  const loanAmount = document.getElementById("loanAmount");
  const interestRate = document.getElementById("interestRate");
  const loanTenure = document.getElementById("loanTenure");

  const loanAmountValue = document.getElementById("loanAmountValue");
  const interestRateValue = document.getElementById("interestRateValue");
  const loanTenureValue = document.getElementById("loanTenureValue");

  const emiResult = document.getElementById("emiResult");

  // ================================
  // FORMAT INDIAN CURRENCY
  // ================================

  function formatIndianCurrency(amount) {
    return "₹" + Math.round(amount).toLocaleString("en-IN");
  }

  // ================================
  // CALCULATE EMI
  // ================================

  function calculateEMI() {
    const principal = Number(loanAmount.value);

    const annualRate = Number(interestRate.value);

    const months = Number(loanTenure.value);

    // Monthly interest rate
    const monthlyRate = annualRate / 12 / 100;

    let emi;

    // If interest rate is 0
    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    // ================================
    // UPDATE VALUES
    // ================================

    loanAmountValue.textContent = formatIndianCurrency(principal);

    interestRateValue.textContent = annualRate.toFixed(1) + "%";

    loanTenureValue.textContent = months + " Months";

    emiResult.textContent = formatIndianCurrency(emi);
  }

  // ================================
  // SLIDER EVENTS
  // ================================

  loanAmount.addEventListener("input", calculateEMI);

  interestRate.addEventListener("input", calculateEMI);

  loanTenure.addEventListener("input", calculateEMI);

  // ================================
  // INITIAL CALCULATION
  // ================================

  calculateEMI();
});
