const API_KEY = "BfbjC0eIr6dgAlZ3vosbddKrZEqT5vLLkYkLV3n3";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

export async function fetchAPOD(date = "") {
  try {
    let url = `${BASE_URL}?api_key=${API_KEY}`;
    if (date && date !== "") {
      url += `&date=${date}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Bad request");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    return {
      title: "Invalid date or API issue",
      date: date || "2024-01-01",
      explanation: "Try another valid past date",
      url: "https://picsum.photos/800/500",
      media_type: "image",
    };
  }
}