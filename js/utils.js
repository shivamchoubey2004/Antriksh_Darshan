// search function — .filter() HOF use kiya hai
export function searchImages(list, word) {
  if (word.trim() === "") return list;
  let w = word.toLowerCase();
  return list.filter(function(item) {
    return item.title.toLowerCase().includes(w) || item.explanation.toLowerCase().includes(w);
  });
}

// type filter — image ya video dikhana
export function filterByType(list, type) {
  if (type === "all") return list;

  return list.filter(function(item) {
    return item.media_type === type;
  });
}

export function sortImages(list, order) {
  let copy = [...list]; // original arr ko no change

  copy.sort(function(a, b) {
    if (order === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return copy;
}

// localStorage se favorites lao
export function getFavorites() {
  let saved = localStorage.getItem("my-favorites");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

// favorite add ya remove
export function toggleFavorite(date) {
  let favs = getFavorites();

  if (favs.includes(date)) {
    // agar pehle se hai toh hata do — filter HOF
    favs = favs.filter(function(d) {
      return d !== date;
    });
  } else {
    favs.push(date);
  }

  localStorage.setItem("my-favorites", JSON.stringify(favs));
}

//only favorites images return 
export function filterFavorites(list) {
  let favs = getFavorites();

  return list.filter(function(item) {
    return favs.includes(item.date);
  });
}