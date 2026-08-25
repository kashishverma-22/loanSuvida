document.addEventListener("DOMContentLoaded", function () {
  // ===== LOAN DATA =====
  const loanData = {
    personal: {
      title: "Personal Loan",
      subtitle: "PERSONAL LOAN",
      desc: "Meet your personal financial needs with flexible repayment options. Whether it's a wedding, travel, medical emergency, or home renovation — we've got you covered.",
      features: [
        "Up to ₹50 Lakh*",
        "Tenure up to 7 Years*",
        "Quick Disbursal",
        "Minimal Documentation",
      ],
      amount: "₹50 Lakh",
      rate: "10.50%",
      tenure: "7 Years",
    },
    business: {
      title: "Business Loan",
      subtitle: "BUSINESS LOAN",
      desc: "Get financial support to expand and grow your business. Whether you need working capital, equipment, or expansion funds — we help you grow.",
      features: [
        "Up to ₹1 Crore*",
        "Tenure up to 7 Years*",
        "No Collateral Required",
        "Quick Processing",
      ],
      amount: "₹1 Crore",
      rate: "12.50%",
      tenure: "7 Years",
    },
    home: {
      title: "Home Loan",
      subtitle: "HOME LOAN",
      desc: "Turn your dream of owning a home into reality with suitable financing. Competitive rates and flexible tenures make homeownership achievable.",
      features: [
        "Up to ₹5 Crore*",
        "Tenure up to 30 Years*",
        "Competitive Rates",
        "Tax Benefits",
      ],
      amount: "₹5 Crore",
      rate: "8.50%",
      tenure: "30 Years",
    },
    car: {
      title: "Car Loan",
      subtitle: "CAR LOAN",
      desc: "Finance your dream car with convenient repayment options. From new cars to used ones, we help you drive home your dream vehicle.",
      features: [
        "Flexible Financing*",
        "Tenure up to 7 Years*",
        "Quick Approval",
        "Competitive Rates",
      ],
      amount: "Flexible",
      rate: "9.50%",
      tenure: "7 Years",
    },
    property: {
      title: "Loan Against Property",
      subtitle: "LOAN AGAINST PROPERTY",
      desc: "Unlock the value of your property for personal or business requirements. Get high-value loans with flexible repayment terms.",
      features: [
        "High Value*",
        "Flexible Tenure*",
        "Low Interest Rates",
        "Multipurpose Use",
      ],
      amount: "High Value",
      rate: "10.00%",
      tenure: "15 Years",
    },
    machinery: {
      title: "Machinery Loan",
      subtitle: "MACHINERY LOAN",
      desc: "Finance new machinery and equipment to improve your business operations. Upgrade your production capacity with our support.",
      features: [
        "Flexible Financing*",
        "Easy Process",
        "Tax Benefits",
        "Quick Approval",
      ],
      amount: "Flexible",
      rate: "11.50%",
      tenure: "5 Years",
    },
  };

  // ===== ALL LOANS LIST FOR GRID =====
  const allLoansList = [
    {
      type: "personal",
      label: "Personal Loan",
      icon: "fa-user",
      tag: "Popular",
    },
    {
      type: "business",
      label: "Business Loan",
      icon: "fa-briefcase",
      tag: "Best for Growth",
    },
    {
      type: "home",
      label: "Home Loan",
      icon: "fa-house",
      tag: "Dream Home",
    },
    { type: "car", label: "Car Loan", icon: "fa-car", tag: "Drive Now" },
    {
      type: "property",
      label: "Loan Against Property",
      icon: "fa-building",
      tag: "High Value",
    },
    {
      type: "machinery",
      label: "Machinery Loan",
      icon: "fa-gears",
      tag: "Business Boost",
    },
  ];

  // ===== DOM REFERENCES =====
  const tabs = document.querySelectorAll(".loan-filter-tab");
  const left = document.getElementById("loanDetailLeft");
  const right = document.getElementById("loanDetailRight");

  // ===== RENDER LOAN DETAIL =====
  function renderLoan(type) {
    const data = loanData[type];
    if (!data) return;

    // Left side
    document.getElementById("loanSubtitle").textContent = data.subtitle;
    document.getElementById("loanTitle").innerHTML = data.title.replace(
      /(\w+)/,
      "$1 <span>$1</span>",
    );
    document.getElementById("loanDesc").textContent = data.desc;

    // Features
    const featuresList = document.getElementById("loanFeatures");
    featuresList.innerHTML = data.features
      .map((f) => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`)
      .join("");

    // Right side
    document.getElementById("infoAmount").innerHTML =
      `${data.amount} <small>max</small>`;
    document.getElementById("infoRate").innerHTML =
      `${data.rate} <small>p.a.</small>`;
    document.getElementById("infoTenure").innerHTML =
      `Up to ${data.tenure} <small>Years</small>`;
  }

  // ===== RENDER ALL LOANS GRID =====
  function renderAllLoans() {
    const grid = document.getElementById("allLoansGrid");
    grid.innerHTML = allLoansList
      .map(
        (loan) =>
          `<div class="all-loan-card" data-type="${loan.type}">
            <div class="card-icon"><i class="fa-solid ${loan.icon}"></i></div>
            <h4>${loan.label}</h4>
            <p>${loanData[loan.type]?.desc?.substring(0, 60) || "Get the best loan solution for your needs."}...</p>
            <span class="card-tag">${loan.tag}</span>
          </div>`,
      )
      .join("");

    // Click on grid card → switch tab
    document.querySelectorAll(".all-loan-card").forEach((card) => {
      card.addEventListener("click", function () {
        const type = this.dataset.type;
        switchTab(type);
      });
    });
  }

  // ===== SWITCH TAB =====
  function switchTab(type) {
    // Update tabs
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.type === type);
    });

    // Render loan details
    renderLoan(type);

    // Update URL hash (optional)
    history.pushState(null, "", `?type=${type}`);

    // Scroll to detail section on mobile
    if (window.innerWidth < 768) {
      document
        .getElementById("loanDetailSection")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // ===== TAB CLICK EVENTS =====
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      switchTab(this.dataset.type);
    });
  });

  // ===== HANDLE URL PARAM =====
  function getLoanTypeFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("type") || "personal";
  }

  // ===== INIT =====
  const initialType = getLoanTypeFromURL();
  renderAllLoans();
  switchTab(initialType);

  // ===== DROPDOWN LINKS (Desktop) =====
  document.querySelectorAll(".loan-type-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = new URL(this.href);
      const type = url.searchParams.get("type");
      if (type) {
        switchTab(type);
        // Close dropdown (optional)
        const dropdown = this.closest(".dropdown-menu");
        if (dropdown) {
          dropdown.style.opacity = "0";
          dropdown.style.visibility = "hidden";
        }
      }
    });
  });

  // ===== MOBILE DROPDOWN LINKS =====
  document.querySelectorAll(".mobile-dropdown-menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = new URL(this.href);
      const type = url.searchParams.get("type");
      if (type) {
        switchTab(type);
        // Close mobile menu
        const menu = document.getElementById("mobileMenu");
        if (menu) {
          menu.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // ===== POPSTATE (browser back/forward) =====
  window.addEventListener("popstate", function () {
    const type = getLoanTypeFromURL();
    switchTab(type);
  });
});
