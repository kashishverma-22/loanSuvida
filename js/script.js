/* =========================================================
   LOAN SUVIDHA
   MAIN JAVASCRIPT (FIXED)
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =====================================================
       ELEMENTS
    ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-header button");
  const mobileDropdownButtons = document.querySelectorAll(
    ".mobile-dropdown-btn",
  );
  const mobileLinks = document.querySelectorAll(
    ".mobile-link, .mobile-dropdown-menu a",
  );
  const backToTop = document.querySelector(".back-to-top");
  const mainHeader = document.querySelector(".main-header");
  const loanForm = document.querySelector("#loanForm, .hero-form-card form");

  /* =====================================================
       MOBILE MENU - OPEN / CLOSE
    ===================================================== */

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  // ✅ Toggle button click
  if (menuToggle) {
    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // ✅ Close button click
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", function () {
      closeMobileMenu();
    });
  }

  /* =====================================================
       MOBILE DROPDOWN - FIXED ✅
    ===================================================== */

  mobileDropdownButtons.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const parent = this.closest(".mobile-dropdown");
      if (!parent) return;

      const menu = parent.querySelector(".mobile-dropdown-menu");
      if (!menu) return;

      // Toggle current dropdown
      menu.classList.toggle("active");

      // Rotate icon
      const icon = this.querySelector("i");
      if (icon) {
        icon.style.transition = "transform 0.3s ease";
        if (menu.classList.contains("active")) {
          icon.style.transform = "rotate(180deg)";
        } else {
          icon.style.transform = "rotate(0deg)";
        }
      }

      // Close other dropdowns (optional)
      mobileDropdownButtons.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          const otherParent = otherBtn.closest(".mobile-dropdown");
          if (otherParent) {
            const otherMenu = otherParent.querySelector(
              ".mobile-dropdown-menu",
            );
            if (otherMenu) {
              otherMenu.classList.remove("active");
              const otherIcon = otherBtn.querySelector("i");
              if (otherIcon) {
                otherIcon.style.transform = "rotate(0deg)";
              }
            }
          }
        }
      });
    });
  });

  /* =====================================================
       MOBILE NAV LINK CLICK → Close menu
    ===================================================== */

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  /* =====================================================
       ESCAPE KEY → Close menu
    ===================================================== */

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  /* =====================================================
       OUTSIDE CLICK → Close menu
    ===================================================== */

  document.addEventListener("click", function (event) {
    if (!mobileMenu || !mobileMenu.classList.contains("active")) {
      return;
    }

    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedToggle = menuToggle && menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#" || targetId.length < 2) {
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        10;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();
    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();
      link.classList.remove("active");
      if (
        (currentPage === "" &&
          (linkPage === "" || linkPage === "index.html")) ||
        (currentPage !== "" && linkPage === currentPage)
      ) {
        link.classList.add("active");
      }
    });
  }

  setActiveNav();

  /* =====================================================
       SCROLL ACTIVE SECTION
    ===================================================== */

  const sections = document.querySelectorAll("section[id]");

  function updateSectionNavigation() {
    if (!sections.length) return;
    const scrollPosition = window.scrollY + 150;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          const href = link.getAttribute("href");
          if (href && href.includes("#" + sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateSectionNavigation);

  /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

  function navbarScrollEffect() {
    if (!mainHeader) return;
    if (window.scrollY > 30) {
      mainHeader.style.boxShadow = "0 8px 30px rgba(0, 59, 120, 0.10)";
    } else {
      mainHeader.style.boxShadow = "0 3px 20px rgba(0, 59, 120, 0.04)";
    }
  }

  window.addEventListener("scroll", navbarScrollEffect);
  navbarScrollEffect();

  /* =====================================================
       BACK TO TOP
    ===================================================== */

  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  }

  window.addEventListener("scroll", handleBackToTop);
  handleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =====================================================
       PHONE INPUT - Only digits
    ===================================================== */

  const phoneInputs = document.querySelectorAll(
    'input[type="tel"], input[name="phone"], #phone',
  );

  phoneInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  });

  /* =====================================================
       NAME INPUT - Only letters
    ===================================================== */

  const nameInputs = document.querySelectorAll(
    'input[name="name"], #name, #userName',
  );

  nameInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    });
  });

  /* =====================================================
       FORM VALIDATION
    ===================================================== */

  function showInputError(input, message) {
    removeInputError(input);
    input.style.borderColor = "#dc2626";
    const error = document.createElement("small");
    error.className = "form-error-message";
    error.textContent = message;
    error.style.display = "block";
    error.style.marginTop = "5px";
    error.style.color = "#dc2626";
    error.style.fontSize = "10px";
    input.parentElement.appendChild(error);
  }

  function removeInputError(input) {
    input.style.borderColor = "";
    const parent = input.parentElement;
    const oldError = parent.querySelector(".form-error-message");
    if (oldError) {
      oldError.remove();
    }
  }

  function validateField(input) {
    if (!input) return true;
    const value = input.value.trim();
    removeInputError(input);

    if (input.hasAttribute("required") && value === "") {
      showInputError(input, "This field is required.");
      return false;
    }

    if (
      input.name === "name" ||
      input.id === "name" ||
      input.id === "userName"
    ) {
      if (value.length > 0 && value.length < 3) {
        showInputError(input, "Please enter a valid name.");
        return false;
      }
    }

    if (
      input.type === "tel" ||
      input.name === "phone" ||
      input.id === "phone"
    ) {
      if (value.length > 0 && !/^[6-9]\d{9}$/.test(value)) {
        showInputError(input, "Enter a valid 10-digit mobile number.");
        return false;
      }
    }

    if (input.type === "email" || input.name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length > 0 && !emailPattern.test(value)) {
        showInputError(input, "Enter a valid email address.");
        return false;
      }
    }

    return true;
  }

  /* =====================================================
       REAL-TIME VALIDATION
    ===================================================== */

  if (loanForm) {
    const formInputs = loanForm.querySelectorAll("input, select, textarea");
    formInputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        validateField(input);
      });
      input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
          removeInputError(input);
        }
      });
    });
  }

  /* =====================================================
       FORM SUBMIT
    ===================================================== */

  if (loanForm) {
    loanForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const inputs = loanForm.querySelectorAll("input, select, textarea");
      let isValid = true;

      inputs.forEach(function (input) {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        const firstError = loanForm.querySelector(".form-error-message");
        if (firstError) {
          firstError.parentElement
            .querySelector("input, select, textarea")
            ?.focus();
        }
        return;
      }

      const submitButton = loanForm.querySelector(
        'button[type="submit"], input[type="submit"]',
      );
      const originalText = submitButton ? submitButton.innerHTML : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Processing...';
      }

      setTimeout(function () {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }
        alert(
          "Thank you! Your loan enquiry has been submitted successfully. Our team will contact you shortly.",
        );
        loanForm.reset();
      }, 1000);
    });
  }

  /* =====================================================
       SELECT PLACEHOLDER
    ===================================================== */

  const selectInputs = document.querySelectorAll("select");
  selectInputs.forEach(function (select) {
    function updateSelectColor() {
      if (select.value === "") {
        select.style.color = "#9ca3af";
      } else {
        select.style.color = "#14213d";
      }
    }
    updateSelectColor();
    select.addEventListener("change", updateSelectColor);
  });

  /* =====================================================
       RESIZE HANDLING - Close mobile menu on desktop
    ===================================================== */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      closeMobileMenu();
    }
  });

  /* =====================================================
       FOOTER YEAR
    ===================================================== */

  const yearElements = document.querySelectorAll("#currentYear, .current-year");
  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  /* =====================================================
       ANIMATION ON SCROLL
    ===================================================== */

  const animatedElements = document.querySelectorAll(
    ".loan-card, .why-card, .process-step",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-animation");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    animatedElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /* =====================================================
       PREVENT MULTIPLE FORM SUBMISSIONS
    ===================================================== */

  document.querySelectorAll("form").forEach(function (form) {
    let submitting = false;
    form.addEventListener("submit", function () {
      if (submitting) {
        return;
      }
      submitting = true;
      setTimeout(function () {
        submitting = false;
      }, 3000);
    });
  });

  /* =====================================================
       CONSOLE
    ===================================================== */

  console.log(
    "%c LoanSuvidha Website Loaded Successfully ✅ ",
    "background:#0754a5;color:#fff;padding:8px 15px;border-radius:5px;font-weight:bold;",
  );
});
