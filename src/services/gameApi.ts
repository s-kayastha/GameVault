const API_URL = "https://www.freetogame.com/api/games";

export async function getGames() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
const GAME_API_URL = "https://www.freetogame.com/api/game";

export async function getGameDetails(id: number) {
  const response = await fetch(`${GAME_API_URL}?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }

  return response.json();
}