// ================= LOGIN DETAILS =================
const USER = "coordinator";
const PASS = "rccg123";

// ================= LOGIN FUNCTION =================
function login(e) {
  e.preventDefault();

  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u === USER && p === PASS) {
    // Save login status
    localStorage.setItem("loggedIn", "true");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login details");
  }
}

// ================= PROTECT DASHBOARD =================
if (window.location.pathname.includes("dashboard.html")) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    window.location.href = "index.html";
  }
}

// ================= DASHBOARD LOGIC =================
let records = [];
let total = 0;

const reason = document.getElementById("reason");
const amountInput = document.getElementById("amount");
const form = document.getElementById("fineForm");
const table = document.querySelector("#recordTable tbody");
const totalSpan = document.getElementById("total");

if (reason) {
  reason.addEventListener("change", () => {
    amountInput.value =
      reason.value === "No Manual" ? 1000 :
      reason.value === "No Assignment" ? 500 : "";
  });
}

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const record = {
      Name: name.value,
      Reason: reason.value,
      Payment: paymentMethod.value,
      Amount: Number(amount.value)
    };

    records.push(record);
    total += record.Amount;
    totalSpan.textContent = total;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.Name}</td>
      <td>${record.Reason}</td>
      <td>${record.Payment}</td>
      <td>${record.Amount}</td>
    `;
    table.appendChild(row);

    form.reset();
    amountInput.value = "";
  });
}
