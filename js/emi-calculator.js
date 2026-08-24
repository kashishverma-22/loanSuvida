document.addEventListener("DOMContentLoaded", function () {
  const amount = document.getElementById("loanAmount");
  const rate = document.getElementById("interestRate");
  const tenure = document.getElementById("loanTenure");
  const unitButtons = document.querySelectorAll(".tenure-switch button");
  const format = (value) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
      Math.round(value),
    );
  let tenureUnit = "years";

  function calculate() {
    const principal = Number(amount.value);
    const annualRate = Number(rate.value);
    const months =
      tenureUnit === "years" ? Number(tenure.value) * 12 : Number(tenure.value);
    const monthlyRate = annualRate / 1200;
    const emi = monthlyRate
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : principal / months;
    const total = emi * months;
    const interest = total - principal;
    const pct = Math.round((principal / total) * 100);
    document.getElementById("amountOutput").textContent =
      `₹ ${format(principal)}`;
    document.getElementById("rateOutput").textContent =
      `${annualRate.toFixed(2)}%`;
    document.getElementById("tenureOutput").textContent =
      tenureUnit === "years"
        ? `${tenure.value} ${Number(tenure.value) === 1 ? "Year" : "Years"}`
        : `${tenure.value} Months`;
    ["monthlyEmi", "heroEmi"].forEach(
      (id) => (document.getElementById(id).textContent = `₹ ${format(emi)}`),
    );
    document.getElementById("principalValue").textContent =
      `₹ ${format(principal)}`;
    document.getElementById("interestValue").textContent =
      `₹ ${format(interest)}`;
    document.getElementById("totalValue").textContent = `₹ ${format(total)}`;
    document.getElementById("principalPercent").textContent = `${pct}%`;
    document.getElementById("donutChart").style.background =
      `conic-gradient(#0754a5 0 ${pct}%, #f7941d ${pct}% 100%)`;
    document.querySelector(".emi-highlight small").textContent =
      `for ${months} monthly payments`;
    renderSchedule(principal, monthlyRate, months, emi);
  }
  function renderSchedule(principal, monthlyRate, months, emi) {
    let balance = principal;
    const rows = [];
    for (let month = 1; month <= Math.min(months, 12); month++) {
      const interest = balance * monthlyRate;
      const paid = Math.min(emi - interest, balance);
      balance = Math.max(0, balance - paid);
      rows.push(
        `<tr><td>${month}</td><td>₹ ${format(emi)}</td><td>₹ ${format(paid)}</td><td>₹ ${format(interest)}</td><td>₹ ${format(balance)}</td></tr>`,
      );
    }
    document.getElementById("scheduleBody").innerHTML = rows.join("");
  }
  [amount, rate, tenure].forEach((input) =>
    input.addEventListener("input", calculate),
  );
  document.querySelectorAll(".quick-amounts button").forEach((button) =>
    button.addEventListener("click", function () {
      amount.value = this.dataset.amount;
      document
        .querySelectorAll(".quick-amounts button")
        .forEach((item) => item.classList.remove("selected"));
      this.classList.add("selected");
      calculate();
    }),
  );
  document.querySelectorAll(".loan-tab").forEach((button) =>
    button.addEventListener("click", function () {
      amount.value = this.dataset.principal;
      rate.value = this.dataset.rate;
      tenureUnit = "years";
      tenure.min = 1;
      tenure.max = 30;
      tenure.value = this.dataset.tenure;
      unitButtons.forEach((item) =>
        item.classList.toggle("active", item.dataset.unit === "years"),
      );
      document
        .querySelectorAll(".loan-tab")
        .forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      calculate();
    }),
  );
  unitButtons.forEach((button) =>
    button.addEventListener("click", function () {
      tenureUnit = this.dataset.unit;
      tenure.min = tenureUnit === "years" ? 1 : 12;
      tenure.max = tenureUnit === "years" ? 30 : 360;
      tenure.value =
        tenureUnit === "years"
          ? Math.max(1, Math.round(Number(tenure.value) / 12))
          : Number(tenure.value) * 12;
      unitButtons.forEach((item) =>
        item.classList.toggle("active", item === this),
      );
      calculate();
    }),
  );
  document
    .getElementById("resetCalculator")
    .addEventListener("click", function () {
      amount.value = 500000;
      rate.value = 11.5;
      tenure.value = 5;
      tenure.min = 1;
      tenure.max = 30;
      tenureUnit = "years";
      unitButtons.forEach((item) =>
        item.classList.toggle("active", item.dataset.unit === "years"),
      );
      calculate();
    });
  document
    .getElementById("toggleSchedule")
    .addEventListener("click", function () {
      const wrap = document.getElementById("scheduleWrap");
      wrap.classList.toggle("open");
      this.classList.toggle("open");
      this.firstChild.textContent = wrap.classList.contains("open")
        ? "Hide schedule "
        : "View full schedule ";
    });
  calculate();
});
