import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";

type Game = {
  id: number;
  title: string;
  genre: string;
  platform: string;
  image: string;
};

function Favorites() {
  const [games, setGames] = useState<Game[]>([]);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem(
      "gamevault-favorites"
    );

    const favorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    setGames(favorites);
  };

  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdated = () => {
      loadFavorites();
    };

    window.addEventListener(
      "favoritesUpdated",
      handleFavoritesUpdated
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        handleFavoritesUpdated
      );
    };
  }, []);

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <div>
          <p className="section-label">YOUR COLLECTION</p>

          <h1>Favorites</h1>

          <p>
            Games you've saved to your GameVault.
          </p>
        </div>

        <Link to="/" className="back-button">
          Browse Games
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="empty-favorites">
          <h2>No favorites yet ❤️</h2>

          <p>
            Find a game you like and click the heart to add
            it to your collection.
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
              image={game.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;