document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     LOANSUVIDA
     LOANS PAGE JAVASCRIPT
     SINGLE PAGE - ALL LOANS
  ========================================================= */

  /* =========================================================
     LOAN DATA
  ========================================================= */

  const loanData = {
    personal: {
      title: "Personal Loan",
      subtitle: "PERSONAL LOAN",

      desc: "Meet your personal financial needs with flexible repayment options. Whether it's a wedding, travel, medical emergency, education, or home renovation — we've got you covered.",

      features: [
        "Up to ₹50 Lakh*",
        "Tenure up to 7 Years*",
        "Quick Disbursal",
        "Minimal Documentation",
      ],

      amount: "₹50 Lakh",
      rate: "10.50%",
      tenure: "7",

      purpose:
        "Personal loans can help you manage planned and unexpected expenses without pledging an asset as security.",

      eligibility: [
        "Indian resident",
        "Age generally between 21 and 60 years",
        "Regular source of income",
        "Stable employment or business profile",
        "Credit profile as per lender policy",
      ],

      documents: [
        "PAN Card",
        "Aadhaar / Address Proof",
        "Income Proof",
        "Bank Statement",
        "Employment / Business Proof",
      ],

      process: [
        "Submit your application",
        "Share basic personal and financial details",
        "Complete verification",
        "Receive suitable loan options",
        "Proceed with the selected lender",
      ],

      faqs: [
        {
          q: "What is a Personal Loan?",
          a: "A Personal Loan is an unsecured loan that can be used for various personal financial requirements such as travel, wedding, medical expenses, education or home renovation.",
        },
        {
          q: "How much Personal Loan can I get?",
          a: "The eligible loan amount depends on factors such as income, credit profile, repayment capacity and lender eligibility criteria.",
        },
        {
          q: "What documents are required?",
          a: "Typically, identity proof, address proof, income proof and recent bank statements may be required. Exact requirements can vary by lender.",
        },
        {
          q: "How long is the repayment tenure?",
          a: "Personal Loan repayment tenure can generally extend up to 7 years, subject to lender policy and your eligibility.",
        },
      ],
    },

    /* =====================================================
       BUSINESS LOAN
    ===================================================== */

    business: {
      title: "Business Loan",
      subtitle: "BUSINESS LOAN",

      desc: "Get financial support to expand and grow your business. Whether you need working capital, equipment, inventory, or expansion funds — we help you explore suitable financing options.",

      features: [
        "Up to ₹1 Crore*",
        "Tenure up to 7 Years*",
        "No Collateral Options*",
        "Quick Processing",
      ],

      amount: "₹1 Crore",
      rate: "12.50%",
      tenure: "7",

      purpose:
        "Business financing can help entrepreneurs manage working capital, expand operations, purchase equipment and support business growth.",

      eligibility: [
        "Business should have an established operating history",
        "Business owner should meet applicable age criteria",
        "Stable business turnover",
        "Required financial documents",
        "Credit profile as per lender policy",
      ],

      documents: [
        "PAN Card",
        "Aadhaar / Address Proof",
        "Business Registration Proof",
        "Bank Statements",
        "Income Tax / Financial Documents",
      ],

      process: [
        "Submit business loan enquiry",
        "Share business and financial information",
        "Application verification",
        "Review available loan options",
        "Proceed with suitable lender",
      ],

      faqs: [
        {
          q: "What can a Business Loan be used for?",
          a: "Business financing may be used for working capital, expansion, inventory, equipment, marketing and other eligible business requirements.",
        },
        {
          q: "Do I need collateral for a Business Loan?",
          a: "Certain business loan products may be available without collateral, while others may require security depending on the lender and loan product.",
        },
        {
          q: "How much Business Loan can I get?",
          a: "The eligible amount depends on your business turnover, profitability, credit profile, repayment capacity and lender policies.",
        },
        {
          q: "What documents are required?",
          a: "Business registration documents, KYC, bank statements and financial documents may be required depending on the lender.",
        },
      ],
    },

    /* =====================================================
       HOME LOAN
    ===================================================== */

    home: {
      title: "Home Loan",
      subtitle: "HOME LOAN",

      desc: "Turn your dream of owning a home into reality with suitable financing. Explore competitive rates and flexible repayment options based on your eligibility.",

      features: [
        "Up to ₹5 Crore*",
        "Tenure up to 30 Years*",
        "Competitive Rates",
        "Tax Benefits*",
      ],

      amount: "₹5 Crore",
      rate: "8.50%",
      tenure: "30",

      purpose:
        "Home financing can be used for eligible property purchase, construction, extension or other approved housing requirements.",

      eligibility: [
        "Indian resident / eligible applicant",
        "Age as specified by lender",
        "Stable income source",
        "Suitable credit profile",
        "Property meeting lender requirements",
      ],

      documents: [
        "PAN Card",
        "Aadhaar / Address Proof",
        "Income Documents",
        "Bank Statements",
        "Property Documents",
      ],

      process: [
        "Submit home loan enquiry",
        "Share applicant and property details",
        "Document verification",
        "Property and eligibility assessment",
        "Proceed with suitable lender",
      ],

      faqs: [
        {
          q: "What is a Home Loan?",
          a: "A Home Loan is financing provided for eligible housing requirements such as purchasing or constructing a residential property.",
        },
        {
          q: "What is the maximum Home Loan tenure?",
          a: "Depending on the lender and applicant profile, home loan tenure can extend up to 30 years.",
        },
        {
          q: "What documents are needed?",
          a: "KYC, income documents, bank statements and relevant property documents are commonly required.",
        },
        {
          q: "Can I check my Home Loan eligibility?",
          a: "Yes. Your eligibility can be assessed based on income, age, existing obligations, credit profile and property-related factors.",
        },
      ],
    },

    /* =====================================================
       CAR LOAN
    ===================================================== */

    car: {
      title: "Car Loan",
      subtitle: "CAR LOAN",

      desc: "Finance your dream car with convenient repayment options. Explore financing solutions for eligible new and used vehicles.",

      features: [
        "Flexible Financing*",
        "Tenure up to 7 Years*",
        "Quick Approval",
        "Competitive Rates",
      ],

      amount: "Flexible",
      rate: "9.50%",
      tenure: "7",

      purpose:
        "Car financing can help you purchase an eligible new or used vehicle while spreading the repayment over a convenient tenure.",

      eligibility: [
        "Applicant must meet lender age criteria",
        "Stable income",
        "Valid KYC documents",
        "Suitable credit profile",
        "Vehicle must meet lender requirements",
      ],

      documents: [
        "PAN Card",
        "Aadhaar / Address Proof",
        "Income Proof",
        "Bank Statement",
        "Vehicle Related Documents",
      ],

      process: [
        "Submit car loan enquiry",
        "Share personal and vehicle details",
        "Eligibility verification",
        "Loan offer assessment",
        "Proceed with selected lender",
      ],

      faqs: [
        {
          q: "Can I get financing for a used car?",
          a: "Certain lenders provide financing for eligible used vehicles, subject to vehicle age, condition and lender policy.",
        },
        {
          q: "How long can I take to repay a Car Loan?",
          a: "Car Loan tenure can generally extend up to 7 years depending on the lender and applicant eligibility.",
        },
        {
          q: "What documents are required?",
          a: "KYC, income proof, bank statements and vehicle-related documents may be required.",
        },
        {
          q: "How is my Car Loan eligibility decided?",
          a: "Eligibility may depend on income, existing obligations, credit profile, vehicle value and lender criteria.",
        },
      ],
    },

    /* =====================================================
       LOAN AGAINST PROPERTY
    ===================================================== */

    property: {
      title: "Loan Against Property",
      subtitle: "LOAN AGAINST PROPERTY",

      desc: "Unlock the value of your eligible property for personal or business requirements. Explore high-value financing with flexible repayment options.",

      features: [
        "High Value*",
        "Flexible Tenure*",
        "Competitive Interest Rates",
        "Multipurpose Use*",
      ],

      amount: "High Value",
      rate: "10.00%",
      tenure: "15",

      purpose:
        "Loan Against Property allows eligible property owners to explore secured financing against the value of their property.",

      eligibility: [
        "Eligible property ownership",
        "Applicant meeting lender age criteria",
        "Stable income source",
        "Suitable repayment capacity",
        "Property acceptable to lender",
      ],

      documents: [
        "PAN Card",
        "Aadhaar / Address Proof",
        "Income Proof",
        "Bank Statements",
        "Property Ownership Documents",
      ],

      process: [
        "Submit LAP enquiry",
        "Share property and applicant details",
        "Document verification",
        "Property assessment",
        "Proceed with suitable lender",
      ],

      faqs: [
        {
          q: "What is a Loan Against Property?",
          a: "It is a secured loan where an eligible property is offered as security to the lender against the sanctioned financing.",
        },
        {
          q: "What can the loan be used for?",
          a: "Depending on the product, funds may be used for eligible personal or business requirements.",
        },
        {
          q: "What property can be used?",
          a: "The property must meet the lender's ownership, legal, valuation and property-type requirements.",
        },
        {
          q: "What is the repayment tenure?",
          a: "The tenure depends on the lender and applicant profile and may extend to several years.",
        },
      ],
    },

    /* =====================================================
       MACHINERY LOAN
    ===================================================== */

    machinery: {
      title: "Machinery Loan",
      subtitle: "MACHINERY LOAN",

      desc: "Finance new machinery and equipment to improve your business operations. Upgrade production capacity and support your business growth.",

      features: [
        "Flexible Financing*",
        "Easy Process",
        "Tax Benefits*",
        "Quick Approval",
      ],

      amount: "Flexible",
      rate: "11.50%",
      tenure: "5",

      purpose:
        "Machinery financing can help eligible businesses purchase or upgrade equipment required for operations and expansion.",

      eligibility: [
        "Established business profile",
        "Suitable business turnover",
        "Required financial records",
        "Eligible machinery / equipment",
        "Credit profile as per lender policy",
      ],

      documents: [
        "PAN Card",
        "Business KYC",
        "Business Registration Proof",
        "Bank Statements",
        "Machinery Quotation / Invoice",
      ],

      process: [
        "Submit machinery loan enquiry",
        "Share business and machinery details",
        "Document verification",
        "Loan assessment",
        "Proceed with suitable lender",
      ],

      faqs: [
        {
          q: "What is a Machinery Loan?",
          a: "A Machinery Loan is financing that can help eligible businesses purchase or upgrade machinery and equipment.",
        },
        {
          q: "Who can apply?",
          a: "Eligible businesses and entrepreneurs meeting the lender's business, income and credit requirements may apply.",
        },
        {
          q: "What documents are required?",
          a: "Business KYC, registration documents, bank statements and machinery quotations may be required.",
        },
        {
          q: "Can machinery financing support business expansion?",
          a: "Yes, eligible machinery financing can help businesses upgrade equipment and increase operational capacity.",
        },
      ],
    },
  };

  /* =========================================================
     ALL LOANS LIST
  ========================================================= */

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

    {
      type: "car",
      label: "Car Loan",
      icon: "fa-car",
      tag: "Drive Now",
    },

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

  /* =========================================================
     DOM REFERENCES
  ========================================================= */

  const tabs = document.querySelectorAll(".loan-filter-tab");

  const loanDetailSection = document.getElementById("loanDetailSection");

  const allLoansSection = document.querySelector(".all-loans-grid-section");

  /* =========================================================
     CREATE EXTRA SECTIONS
  ========================================================= */

  function createExtraSections() {
    if (document.getElementById("loanExtraSections")) {
      return;
    }

    const wrapper = document.createElement("div");

    wrapper.id = "loanExtraSections";

    wrapper.innerHTML = `

      <!-- ==================================================
           LOAN KEY INFORMATION / COMPARISON
      ================================================== -->

      <section class="loan-key-info-section">

        <div class="container">

          <div class="section-heading">

            <span class="section-label">
              LOAN INFORMATION
            </span>

            <h2>
              Key <span>Loan Details</span>
            </h2>

            <p>
              Understand the important features of your selected
              loan before applying.
            </p>

          </div>


          <div class="loan-key-info-grid" id="loanKeyInfoGrid">

          </div>

        </div>

      </section>


      <!-- ==================================================
           WHY CHOOSE LOANSUVIDA
      ================================================== -->

      <section class="loan-trust-section">

        <div class="container">

          <div class="section-heading">

            <span class="section-label">
              WHY LOANSUVIDA
            </span>

            <h2>
              A Simpler Way to Explore
              <span>Loan Options</span>
            </h2>

            <p>
              Get guidance through the loan journey with a simple,
              transparent and customer-focused process.
            </p>

          </div>


          <div class="loan-trust-grid">

            <div class="loan-trust-card">

              <div class="trust-icon">
                <i class="fa-solid fa-list-check"></i>
              </div>

              <h3>
                Multiple Loan Options
              </h3>

              <p>
                Explore different loan categories and choose an
                option based on your financial requirement.
              </p>

            </div>


            <div class="loan-trust-card">

              <div class="trust-icon">
                <i class="fa-solid fa-user-shield"></i>
              </div>

              <h3>
                Customer First
              </h3>

              <p>
                Our process is designed to make loan exploration
                simple and easy to understand.
              </p>

            </div>


            <div class="loan-trust-card">

              <div class="trust-icon">
                <i class="fa-solid fa-file-circle-check"></i>
              </div>

              <h3>
                Simple Process
              </h3>

              <p>
                Share your basic details and explore suitable
                financing options through a streamlined process.
              </p>

            </div>


            <div class="loan-trust-card">

              <div class="trust-icon">
                <i class="fa-solid fa-headset"></i>
              </div>

              <h3>
                Assistance
              </h3>

              <p>
                Get assistance during your loan exploration and
                application journey.
              </p>

            </div>

          </div>

        </div>

      </section>


      <!-- ==================================================
           ELIGIBILITY + DOCUMENTS
      ================================================== -->

      <section class="loan-requirements-section">

        <div class="container">

          <div class="loan-requirements-grid">


            <div class="loan-requirement-card">

              <div class="requirement-heading">

                <div class="requirement-icon">
                  <i class="fa-solid fa-user-check"></i>
                </div>

                <div>

                  <span>
                    CHECK BEFORE APPLYING
                  </span>

                  <h3>
                    Eligibility Criteria
                  </h3>

                </div>

              </div>


              <ul
                class="dynamic-list"
                id="loanEligibilityList">
              </ul>

            </div>


            <div class="loan-requirement-card">

              <div class="requirement-heading">

                <div class="requirement-icon">
                  <i class="fa-solid fa-file-lines"></i>
                </div>

                <div>

                  <span>
                    KEEP THESE READY
                  </span>

                  <h3>
                    Documents Required
                  </h3>

                </div>

              </div>


              <ul
                class="dynamic-list"
                id="loanDocumentsList">
              </ul>

            </div>


          </div>

        </div>

      </section>


      <!-- ==================================================
           HOW TO APPLY
      ================================================== -->

      <section class="loan-process-section">

        <div class="container">

          <div class="section-heading">

            <span class="section-label">
              SIMPLE PROCESS
            </span>

            <h2>
              How to <span>Apply</span>
            </h2>

            <p>
              Follow a simple journey to explore your selected
              loan option.
            </p>

          </div>


          <div
            class="loan-process-grid"
            id="loanProcessGrid">
          </div>

        </div>

      </section>


      <!-- ==================================================
           FAQ
      ================================================== -->

      <section class="loan-faq-section">

        <div class="container">

          <div class="section-heading">

            <span class="section-label">
              HAVE QUESTIONS?
            </span>

            <h2>
              Frequently Asked <span>Questions</span>
            </h2>

            <p>
              Find answers to common questions about this loan.
            </p>

          </div>


          <div
            class="loan-faq-list"
            id="loanFaqList">
          </div>

        </div>

      </section>


      <!-- ==================================================
           FINAL CTA
      ================================================== -->

      <section class="loan-final-cta">

        <div class="container">

          <div class="loan-final-cta-inner">

            <div>

              <span>
                READY TO TAKE THE NEXT STEP?
              </span>

              <h2>
                Explore Your
                <strong id="ctaLoanName">
                  Loan Options
                </strong>
              </h2>

              <p>
                Submit your details and explore suitable
                financing options for your requirements.
              </p>

            </div>


            <a
              href="apply-now.html"
              class="loan-final-apply-btn">

              Apply Now

              <i class="fa-solid fa-arrow-right"></i>

            </a>

          </div>

        </div>

      </section>

    `;

    if (allLoansSection) {
      allLoansSection.parentNode.insertBefore(wrapper, allLoansSection);
    }
  }

  /* =========================================================
     RENDER EXTRA LOAN INFORMATION
  ========================================================= */

  function renderExtraLoanData(type) {
    const data = loanData[type];

    if (!data) return;

    /* =====================================================
       KEY INFORMATION
    ===================================================== */

    const keyGrid = document.getElementById("loanKeyInfoGrid");

    if (keyGrid) {
      keyGrid.innerHTML = `

        <div class="key-info-item">

          <span>Loan Type</span>

          <strong>
            ${data.title}
          </strong>

        </div>


        <div class="key-info-item">

          <span>Maximum Amount</span>

          <strong>
            ${data.amount}
          </strong>

        </div>


        <div class="key-info-item">

          <span>Starting Interest Rate</span>

          <strong>
            ${data.rate}
            <small> p.a.*</small>
          </strong>

        </div>


        <div class="key-info-item">

          <span>Maximum Tenure</span>

          <strong>
            ${data.tenure}
            <small> Years*</small>
          </strong>

        </div>

      `;
    }

    /* =====================================================
       ELIGIBILITY
    ===================================================== */

    const eligibilityList = document.getElementById("loanEligibilityList");

    if (eligibilityList) {
      eligibilityList.innerHTML = data.eligibility
        .map(function (item) {
          return `

              <li>

                <i class="fa-solid fa-circle-check"></i>

                <span>
                  ${item}
                </span>

              </li>

            `;
        })
        .join("");
    }

    /* =====================================================
       DOCUMENTS
    ===================================================== */

    const documentsList = document.getElementById("loanDocumentsList");

    if (documentsList) {
      documentsList.innerHTML = data.documents
        .map(function (item) {
          return `

              <li>

                <i class="fa-solid fa-file-circle-check"></i>

                <span>
                  ${item}
                </span>

              </li>

            `;
        })
        .join("");
    }

    /* =====================================================
       PROCESS
    ===================================================== */

    const processGrid = document.getElementById("loanProcessGrid");

    if (processGrid) {
      processGrid.innerHTML = data.process
        .map(function (item, index) {
          return `

              <div class="loan-process-step">

                <div class="process-number">
                  ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="process-line"></div>

                <h3>
                  ${item}
                </h3>

              </div>

            `;
        })
        .join("");
    }

    /* =====================================================
       FAQ
    ===================================================== */

    const faqList = document.getElementById("loanFaqList");

    if (faqList) {
      faqList.innerHTML = data.faqs
        .map(function (faq, index) {
          return `

              <div class="loan-faq-item">

                <button
                  type="button"
                  class="loan-faq-question"
                  aria-expanded="false">

                  <span>
                    ${faq.q}
                  </span>

                  <i class="fa-solid fa-plus"></i>

                </button>


                <div class="loan-faq-answer">

                  <p>
                    ${faq.a}
                  </p>

                </div>

              </div>

            `;
        })
        .join("");

      initFaq();
    }

    /* =====================================================
       FINAL CTA
    ===================================================== */

    const ctaLoanName = document.getElementById("ctaLoanName");

    if (ctaLoanName) {
      ctaLoanName.textContent = data.title;
    }
  }

  /* =========================================================
     FAQ FUNCTIONALITY
  ========================================================= */

  function initFaq() {
    const questions = document.querySelectorAll(".loan-faq-question");

    questions.forEach(function (question) {
      question.addEventListener("click", function () {
        const item = this.closest(".loan-faq-item");

        const isActive = item.classList.contains("active");

        /* Close all */

        document.querySelectorAll(".loan-faq-item").forEach(function (faqItem) {
          faqItem.classList.remove("active");

          const faqButton = faqItem.querySelector(".loan-faq-question");

          if (faqButton) {
            faqButton.setAttribute("aria-expanded", "false");
          }
        });

        /* Open clicked */

        if (!isActive) {
          item.classList.add("active");

          this.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* =========================================================
     RENDER LOAN DETAIL
  ========================================================= */

  function renderLoan(type) {
    const data = loanData[type];

    if (!data) return;

    /* =====================================================
       LEFT SIDE
    ===================================================== */

    const subtitle = document.getElementById("loanSubtitle");

    const title = document.getElementById("loanTitle");

    const desc = document.getElementById("loanDesc");

    if (subtitle) {
      subtitle.textContent = data.subtitle;
    }

    if (title) {
      const titleWords = data.title.split(" ");

      if (titleWords.length > 1) {
        const firstWord = titleWords.shift();

        title.innerHTML = `${firstWord} <span>${titleWords.join(" ")}</span>`;
      } else {
        title.innerHTML = `<span>${data.title}</span>`;
      }
    }

    if (desc) {
      desc.textContent = data.desc;
    }

    /* =====================================================
       FEATURES
    ===================================================== */

    const featuresList = document.getElementById("loanFeatures");

    if (featuresList) {
      featuresList.innerHTML = data.features
        .map(function (feature) {
          return `

              <li>

                <i class="fa-solid fa-check-circle"></i>

                ${feature}

              </li>

            `;
        })
        .join("");
    }

    /* =====================================================
       RIGHT SIDE
    ===================================================== */

    const infoAmount = document.getElementById("infoAmount");

    const infoRate = document.getElementById("infoRate");

    const infoTenure = document.getElementById("infoTenure");

    if (infoAmount) {
      infoAmount.innerHTML = `${data.amount} <small>max</small>`;
    }

    if (infoRate) {
      infoRate.innerHTML = `${data.rate} <small>p.a.</small>`;
    }

    if (infoTenure) {
      infoTenure.innerHTML = `Up to ${data.tenure} <small>Years</small>`;
    }

    /* =====================================================
       EXTRA SECTIONS
    ===================================================== */

    renderExtraLoanData(type);
  }

  /* =========================================================
     RENDER ALL LOANS GRID
  ========================================================= */

  function renderAllLoans() {
    const grid = document.getElementById("allLoansGrid");

    if (!grid) return;

    grid.innerHTML = allLoansList
      .map(function (loan) {
        const shortDescription =
          loanData[loan.type]?.desc?.substring(0, 85) ||
          "Explore a suitable loan solution for your financial needs.";

        return `

            <div
              class="all-loan-card"
              data-type="${loan.type}">

              <div class="card-icon">

                <i class="fa-solid ${loan.icon}"></i>

              </div>


              <h4>
                ${loan.label}
              </h4>


              <p>
                ${shortDescription}...
              </p>


              <span class="card-tag">
                ${loan.tag}
              </span>


              <span class="card-arrow">

                Explore

                <i class="fa-solid fa-arrow-right"></i>

              </span>

            </div>

          `;
      })
      .join("");

    /* =====================================================
       GRID CARD CLICK
    ===================================================== */

    document.querySelectorAll(".all-loan-card").forEach(function (card) {
      card.addEventListener("click", function () {
        const type = this.dataset.type;

        switchTab(type);
      });
    });
  }

  /* =========================================================
     SWITCH TAB
  ========================================================= */

  function switchTab(type, updateURL = true) {
    if (!loanData[type]) {
      type = "personal";
    }

    /* =====================================================
       UPDATE ACTIVE TABS
    ===================================================== */

    tabs.forEach(function (tab) {
      tab.classList.toggle("active", tab.dataset.type === type);
    });

    /* =====================================================
       RENDER
    ===================================================== */

    renderLoan(type);

    /* =====================================================
       UPDATE URL
    ===================================================== */

    if (updateURL) {
      const newURL = `${window.location.pathname}?type=${type}`;

      history.pushState(
        {
          loanType: type,
        },
        "",
        newURL,
      );
    }

    /* =====================================================
       MOBILE SCROLL
    ===================================================== */

    if (window.innerWidth < 768 && loanDetailSection) {
      loanDetailSection.scrollIntoView({
        behavior: "smooth",

        block: "start",
      });
    }
  }

  /* =========================================================
     TAB CLICK EVENTS
  ========================================================= */

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      switchTab(this.dataset.type);
    });
  });

  /* =========================================================
     GET LOAN TYPE FROM URL
  ========================================================= */

  function getLoanTypeFromURL() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");

    return loanData[type] ? type : "personal";
  }

  /* =========================================================
     DESKTOP LOAN DROPDOWN
  ========================================================= */

  document.querySelectorAll(".loan-type-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const url = new URL(this.href, window.location.origin);

      const type = url.searchParams.get("type");

      if (type) {
        switchTab(type);

        const dropdown = this.closest(".dropdown-menu");

        if (dropdown) {
          dropdown.style.opacity = "0";

          dropdown.style.visibility = "hidden";

          setTimeout(function () {
            dropdown.removeAttribute("style");
          }, 250);
        }
      }
    });
  });

  /* =========================================================
     MOBILE DROPDOWN LINKS
  ========================================================= */

  document.querySelectorAll(".mobile-dropdown-menu a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const url = new URL(this.href, window.location.origin);

      const type = url.searchParams.get("type");

      if (type) {
        switchTab(type);

        const menu = document.getElementById("mobileMenu");

        if (menu) {
          menu.classList.remove("active");
        }

        document.body.style.overflow = "";
      }
    });
  });

  /* =========================================================
     BROWSER BACK / FORWARD
  ========================================================= */

  window.addEventListener("popstate", function () {
    const type = getLoanTypeFromURL();

    switchTab(type, false);
  });

  /* =========================================================
     INITIALIZE
  ========================================================= */

  createExtraSections();

  renderAllLoans();

  const initialType = getLoanTypeFromURL();

  switchTab(initialType, false);
});
