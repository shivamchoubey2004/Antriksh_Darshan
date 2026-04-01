import { fetchAPOD } from "./api.js";
import { renderAPOD, showLoader, hideLoader } from "./ui.js";
import { getTodayDate } from "./utils.js";

const searchBtn = document.getElementById("searchBtn");
const dateInput = document.getElementById("dateInput");
const logo = document.getElementById("logoHome");

window.addEventListener("DOMContentLoaded", () => {
  const today = getTodayDate();
  dateInput.value = today;
  loadData(today);
});

async function loadData(date) {
  showLoader();
  const data = await fetchAPOD(date);
  renderAPOD(data);
  hideLoader();
}


searchBtn.addEventListener("click", handleSearch);
dateInput.addEventListener("change", handleSearch);

function handleSearch() {
  const selectedDate = dateInput.value;
  if (!selectedDate) return;
  loadData(selectedDate);
}

logo.addEventListener("click", (e) => {
  e.preventDefault();
  const today = getTodayDate();
  dateInput.value = today;
  loadData(today);
});