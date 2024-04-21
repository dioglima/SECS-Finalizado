// Modal income
const incomeModal = document.getElementById("income-modal");
const openIncomeModalBtn = document.getElementById("show-income-modal");

openIncomeModalBtn.addEventListener("click", () => {
  incomeModal.showModal();
});

incomeModal.addEventListener("mousedown", (event) => {
  if (event.target === incomeModal) {
    incomeModal.close();
  }
});

// Modal outcome
const outcomeModal = document.getElementById("expense-modal");
const openBtn = document.getElementById("show-expense-modal");

openBtn.addEventListener("click", () => {
  outcomeModal.showModal();
});

outcomeModal.addEventListener("mousedown", (event) => {
  if (event.target === outcomeModal) {
    outcomeModal.close();
  }
});

const settingsModal = document.getElementById("settings-modal");
const openSettingsModalBtn = document.getElementById("show-settings-modal");

openSettingsModalBtn.addEventListener("click", () => {
  settingsModal.showModal();
});

settingsModal.addEventListener("mousedown", () => {
  if (event.target === settingsModal) {
    settingsModal.close();
  }
});

const graphModal = document.getElementById("chart-modal");
const openGraphsModalBtn = document.getElementById("show-chart-modal");

openGraphsModalBtn.addEventListener("click", () => {
  graphModal.showModal();
});

graphModal.addEventListener("mousedown", () => {
  if (event.target === graphModal) {
    graphModal.close();
  }
});
