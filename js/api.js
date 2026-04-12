const myKey = "2Hb7ZQh2wIlog3987OVLPAM2veuK8qEzgKB71Ca3";
const apiUrl = "https://api.nasa.gov/planetary/apod";
export async function fetchImages(from, to) {
  const fullUrl = apiUrl + "?start_date=" + from + "&end_date=" + to + "&api_key=" + myKey;
  const res = await fetch(fullUrl);
  if (!res.ok) {
    throw new Error("API se data nahi aaya");
  }
  const data = await res.json();
  return data;
}