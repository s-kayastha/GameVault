const API_URL = "https://www.freetogame.com/api/games";

export async function getGames() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}