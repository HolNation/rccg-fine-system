const form = document.getElementById("fineForm");
const tableBody = document.querySelector("#recordTable tbody");
const reasonSelect = document.getElementById("reason");
const amountInput = document.getElementById("amount");

let records = [];

// Auto-set amount based on reason
reasonSelect.addEventListener("change", function () {
  if (this.value === "No Manual") {
    amountInput.value = 1000;
  } else if (this.value === "No Assignment") {
    amountInput.value = 500;
  } else {
    amountInput.value = "";
  }
});

// Add record
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const reason = reasonSelect.value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  const amount = amountInput.value;

  const record = { name, reason, paymentMethod, amount };
  records.push(record);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${reason}</td>
    <td>${paymentMethod}</td>
    <td>${amount}</td>
  `;
  tableBody.appendChild(row);

  form.reset();
  amountInput.value = "";
});

// Download CSV report
function downloadCSV() {
  let csv = "Name,Reason,Payment Method,Amount\n";

  records.forEach(r => {
    csv += `${r.name},${r.reason},${r.paymentMethod},${r.amount}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Sunday_School_Fines_Report.csv";
  a.click();

  URL.revokeObjectURL(url);
}
