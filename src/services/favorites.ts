const FAVORITES_KEY = "gamevault-favorites";

export function getFavorites(): number[] {
  const saved = localStorage.getItem(FAVORITES_KEY);

  if (!saved) {
    return [];
  }

  return JSON.parse(saved);
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: number): boolean {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    return false;
  }

  const updatedFavorites = [...favorites, id];

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );

  return true;
}