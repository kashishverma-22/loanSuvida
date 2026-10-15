document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
       MOBILE MENU
    ========================================= */

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();

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
    }, true);
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
        e.stopImmediatePropagation();

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
    }, true);
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
        e.stopImmediatePropagation();

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
    }, true);
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

  if (
    !loanAmount ||
    !interestRate ||
    !loanTenure ||
    !loanAmountValue ||
    !interestRateValue ||
    !loanTenureValue ||
    !emiResult
  ) {
    return;
  }

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




/* =========================================================
   MAIL  (send-mail.php)  +  POPUP
========================================================= */

window.showMailPopup = function (isSuccess, title, text) {
  const old = document.getElementById("mailPopup");
  if (old) old.remove();

  const color = isSuccess ? "#1faa59" : "#e5484d";
  const icon = isSuccess ? "&#10003;" : "!";

  const overlay = document.createElement("div");
  overlay.id = "mailPopup";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;" +
    "justify-content:center;padding:16px;background:rgba(0,20,45,.6);" +
    "font-family:'Poppins',sans-serif;";

  overlay.innerHTML =
    '<div style="background:#fff;border-radius:20px;max-width:420px;width:100%;' +
    'padding:34px 28px 28px;text-align:center;box-shadow:0 25px 60px rgba(0,0,0,.25);">' +
    '<div style="width:70px;height:70px;margin:0 auto 18px;border-radius:50%;' +
    "background:" + color + ";color:#fff;font-size:38px;line-height:70px;font-weight:700;\">" +
    icon + "</div>" +
    '<h3 style="margin:0 0 10px;font-size:22px;color:#172033;">' + title + "</h3>" +
    '<p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#526071;">' +
    text + "</p>" +
    '<button type="button" id="mailPopupClose" style="border:0;cursor:pointer;' +
    "background:#005baa;color:#fff;font-size:15px;font-weight:600;padding:12px 38px;" +
    'border-radius:50px;">OK</button></div>';

  document.body.appendChild(overlay);

  function close() {
    overlay.remove();
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  document.addEventListener("keydown", onKey);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  overlay.querySelector("#mailPopupClose").addEventListener("click", close);
  overlay.querySelector("#mailPopupClose").focus();
};

window.sendLoanMail = function (formName, data) {
  const body = new FormData();

  body.append("form_name", formName);

  Object.keys(data || {}).forEach(function (key) {
    body.append(key, data[key]);
  });

  body.append("page_url", window.location.href);

  return fetch("send-mail.php", { method: "POST", body: body })
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      if (!result.success) {
        throw new Error(result.message || "Mail failed");
      }

      window.showMailPopup(
        true,
        "Thank You!",
        "Your enquiry has been submitted successfully. Our team will contact you shortly.",
      );

      return true;
    })
    .catch(function (error) {
      console.error("MAIL ERROR:", error);

      window.showMailPopup(
        false,
        "Oops!",
        "Sorry, your enquiry could not be sent. Please try again.",
      );

      return false;
    });
};

/* =========================================================
   HOME PAGE - HERO QUICK FORM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const heroForm = document.getElementById("heroLoanForm");

  if (!heroForm) return;

  heroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = heroForm.querySelector('input[type="text"]').value.trim();
    const mobile = heroForm.querySelector('input[type="tel"]').value.trim();
    const loanType = heroForm.querySelector("select").value;
    const amount = heroForm.querySelector('input[type="number"]').value.trim();

    if (!name) {
      window.showMailPopup(false, "Please Check", "Please enter your name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      window.showMailPopup(
        false,
        "Please Check",
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    if (!loanType) {
      window.showMailPopup(false, "Please Check", "Please select a loan type.");
      return;
    }

    const btn = heroForm.querySelector('button[type="submit"]');

    if (btn) btn.disabled = true;

    window
      .sendLoanMail("Home Page Quick Enquiry", {
        name: name,
        mobile: mobile,
        loanType: loanType,
        amount: amount,
      })
      .then(function (ok) {
        if (ok) heroForm.reset();

        if (btn) btn.disabled = false;
      });
  });
});