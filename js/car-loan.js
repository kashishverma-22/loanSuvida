document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       CAR LOAN EMI CALCULATOR
    ====================================================== */

  const amountInput = document.getElementById("carLoanAmount");
  const rateInput = document.getElementById("carInterestRate");
  const tenureInput = document.getElementById("carLoanTenure");

  const calculateBtn = document.getElementById("calculateCarEmi");

  const emiResult = document.getElementById("carEmiResult");
  const principalResult = document.getElementById("carPrincipalResult");
  const interestResult = document.getElementById("carInterestResult");

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function calculateEMI() {
    const principal = Number(amountInput.value);
    const annualRate = Number(rateInput.value);
    const years = Number(tenureInput.value);

    if (
      !principal ||
      !annualRate ||
      !years ||
      principal <= 0 ||
      annualRate <= 0 ||
      years <= 0
    ) {
      return;
    }

    const monthlyRate = annualRate / 12 / 100;

    const months = years * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;

    const totalInterest = totalPayment - principal;

    emiResult.textContent = formatCurrency(emi);

    principalResult.textContent = formatCurrency(principal);

    interestResult.textContent = formatCurrency(totalInterest);
  }

  calculateBtn.addEventListener("click", calculateEMI);

  amountInput.addEventListener("input", calculateEMI);

  rateInput.addEventListener("input", calculateEMI);

  tenureInput.addEventListener("input", calculateEMI);

  calculateEMI();

  /* =====================================================
       FAQ ACCORDION
    ====================================================== */

  const faqItems = document.querySelectorAll(".car-faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".car-faq-question");

    question.addEventListener("click", function () {
      const alreadyActive = item.classList.contains("active");

      faqItems.forEach(function (faq) {
        faq.classList.remove("active");
      });

      if (!alreadyActive) {
        item.classList.add("active");
      }
    });
  });

  /* =====================================================
       NUMBER INPUT CLEANUP
    ====================================================== */

  [amountInput, rateInput, tenureInput].forEach(function (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "-" || event.key === "e") {
        event.preventDefault();
      }
    });
  });
});
