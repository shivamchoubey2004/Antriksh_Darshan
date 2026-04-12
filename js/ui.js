import { getFavorites, toggleFavorite } from "./utils.js";
export function showLoading() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("cards-container").style.display = "none";
  document.getElementById("no-results").style.display = "none";
}
export function hideLoading() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("cards-container").style.display = "grid";
}

//card for imgs/vdos
function makeCard(item) {
  let favs = getFavorites();
  let alreadySaved = favs.includes(item.date);
  let card = document.createElement("div");
  card.className = "card";

  let media = "";
  if (item.media_type === "image") {
    media = '<img src="' + item.url + '" alt="' + item.title + '" class="card-img" loading="lazy" />';
  } else {
    //uTube url ko embed url me convert 
    let videoUrl = item.url;

    // youtube.com/watch?v=ID  →  youtube.com/embed/ID
    if (videoUrl.includes("youtube.com/watch")) {
      let videoId = new URL(videoUrl).searchParams.get("v");
      videoUrl = "https://www.youtube.com/embed/" + videoId;
    }
    if (videoUrl.includes("youtu.be/")) {
      let videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
      videoUrl = "https://www.youtube.com/embed/" + videoId;
    }

    if (videoUrl.includes("youtube.com/embed")) {
      media = '<div class="video-wrapper"><iframe src="' + videoUrl + '" frameborder="0" allowfullscreen></iframe></div>';
    } else {
      media = '<div class="video-placeholder"><p>🎬 Video</p><a href="' + item.url + '" target="_blank" class="watch-btn">Watch Video ↗</a></div>';
    }
  }

  let desc = item.explanation.substring(0, 150) + "...";
  let badgeColor = item.media_type === "image" ? "badge-image" : "badge-video";
  let favText = alreadySaved ? "★ Saved" : "☆ Favorite";
  let favClass = alreadySaved ? "fav-btn fav-active" : "fav-btn";

  card.innerHTML =
    media +
    '<div class="card-body">' +
      '<span class="badge ' + badgeColor + '">' + item.media_type + '</span>' +
      '<h3 class="card-title">' + item.title + '</h3>' +
      '<p class="card-date">📅 ' + item.date + '</p>' +
      '<p class="card-desc">' + desc + '</p>' +
      '<button class="' + favClass + '" data-date="' + item.date + '">' + favText + '</button>' +
    '</div>';

  // favorite button click fn
  let btn = card.querySelector(".fav-btn");
  btn.addEventListener("click", function() {
    toggleFavorite(item.date);

    let nowSaved = getFavorites().includes(item.date);
    btn.textContent = nowSaved ? "★ Saved" : "☆ Favorite";

    if (nowSaved) {
      btn.classList.add("fav-active");
    } else {
      btn.classList.remove("fav-active");
    }
  });
  return card;
}

// sare cards page pe lgao
export function renderCards(images) {
  let container = document.getElementById("cards-container");
  container.innerHTML = "";

  if (images.length === 0) {
    document.getElementById("no-results").style.display = "block";
    return;
  }
  document.getElementById("no-results").style.display = "none";

  images.forEach(function(item) {
    let card = makeCard(item);
    container.appendChild(card);
  });
}