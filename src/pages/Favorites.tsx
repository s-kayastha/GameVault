import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../services/favorites";
import GameCard from "../components/GameCard";

type Game = {
  id: number;
  title: string;
  genre: string;
  platform: string;
  thumbnail: string;
};

function Favorites() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favoriteIds = getFavorites();

        if (favoriteIds.length === 0) {
          setGames([]);
          return;
        }

        const response = await fetch(
          "https://www.freetogame.com/api/games"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const allGames: Game[] = await response.json();

        const favoriteGames = allGames.filter((game) =>
          favoriteIds.includes(game.id)
        );

        setGames(favoriteGames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <main className="favorites-page">
        <h1>Favorites</h1>
        <p>Loading your favorite games...</p>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <div>
          <p className="section-label">YOUR COLLECTION</p>
          <h1>Favorites</h1>
          <p>Games you've saved to your GameVault.</p>
        </div>

        <Link to="/" className="back-button">
          Browse Games
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="empty-favorites">
          <h2>No favorites yet ❤️</h2>
          <p>
            Find a game you like and click the heart to add it
            to your collection.
          </p>

          <Link to="/" className="play-button">
            Browse Games
          </Link>
        </div>
      ) : (
        <div className="game-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              genre={game.genre}
              platform={game.platform}
              image={game.thumbnail}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;