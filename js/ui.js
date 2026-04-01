export function showLoader() {
  document.getElementById("loader").style.display = "block";
}
export function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

export function renderAPOD(data) {
  const content = document.getElementById("content");
  if (!data || !data.url) {
    content.innerHTML = "<p>Data not available</p>";
    return;
  }
  let media = "";
  if (data.media_type === "image") {
    media = `<img src="${data.url}" alt="${data.title}" />`;
  } else {
    media = `<iframe src="${data.url}" frameborder="0"></iframe>`;
  }
  content.innerHTML = `
    <div class="card">
      <h3>${data.title}</h3>
      ${media}
      <p class="date">${data.date}</p>
      <p class="desc">${data.explanation}</p>
    </div>
  `;
}