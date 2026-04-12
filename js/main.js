import { fetchImages } from "./api.js";
import { searchImages, filterByType, sortImages, filterFavorites } from "./utils.js";
import { showLoading, hideLoading, renderCards } from "./ui.js";

let allImages = [];    
let favMode = false;     // favorites mode on/off


// API se images load 
async function loadImages() {
  showLoading();

  try {
    let data = await fetchImages("2026-04-01", "2026-04-10");
    allImages = data;
    renderCards(allImages);
  } catch (err) {
    console.log("Error:", err);
    document.getElementById("cards-container").innerHTML =
      "<p style='text-align:center; color:red; padding:40px;'>Data load nahi hua. Refresh karo.</p>";
  }

  hideLoading();
}


// search/filter/sort apply karo jab bhi kuch change ho
function applyFilters() {
  let query = document.getElementById("search-input").value;
  let type  = document.getElementById("type-filter").value;
  let sort  = document.getElementById("sort-select").value;

  let result = allImages;

  // agar favorites mode on hai toh pehle filter karo
  if (favMode) {
    result = filterFavorites(result);
  }

  result = searchImages(result, query);
  result = filterByType(result, type);
  result = sortImages(result, sort);

  renderCards(result);
}


// dark/light mode
function setupTheme() {
  let btn = document.getElementById("theme-toggle");

  // pehli baar page khule toh saved theme lagao
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.textContent = "☀️ Light";
  }

  btn.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    let dark = document.body.classList.contains("dark");
    btn.textContent = dark ? "☀️ Light" : "🌙 Dark";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
}


// favorites button
function setupFavButton() {
  let btn = document.getElementById("fav-toggle-btn");

  btn.addEventListener("click", function() {
    favMode = !favMode;
    btn.textContent = favMode ? "📋 Show All" : "⭐ Favorites";
    applyFilters();
  });
}


// mobile hamburger menu
function setupHamburger() {
  let ham = document.getElementById("hamburger");
  let menu = document.getElementById("mobile-menu");

  ham.addEventListener("click", function() {
    menu.classList.toggle("open");
  });

  let links = menu.querySelectorAll("a");
  links.forEach(function(link) {
    link.addEventListener("click", function() {
      menu.classList.remove("open");
    });
  });
}


// search, filter, sort inputs pe listeners
function setupControls() {
  document.getElementById("search-input").addEventListener("input", applyFilters);
  document.getElementById("type-filter").addEventListener("change", applyFilters);
  document.getElementById("sort-select").addEventListener("change", applyFilters);
}

setupTheme();
setupFavButton();
setupHamburger();
setupControls();
loadImages();