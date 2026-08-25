import { Heart, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type GameCardProps = {
  id: number;
  title: string;
  genre: string;
  platform: string;
  image: string;
};

function GameCard({
  id,
  title,
  genre,
  platform,
  image,
}: GameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("gamevault-favorites");

    const favorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    setIsFavorite(
      favorites.some(
        (favorite: GameCardProps) => favorite.id === id
      )
    );
  }, [id]);

  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const savedFavorites = localStorage.getItem(
      "gamevault-favorites"
    );

    const favorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    const game = {
      id,
      title,
      genre,
      platform,
      image,
    };

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite: GameCardProps) => favorite.id !== id
      );

      localStorage.setItem(
        "gamevault-favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      favorites.push(game);

      localStorage.setItem(
        "gamevault-favorites",
        JSON.stringify(favorites)
      );

      setIsFavorite(true);
    }

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <Link to={`/game/${id}`} className="game-card">
      <div className="game-image">
        <img src={image} alt={title} />

        <button
          className={`favorite-button ${
            isFavorite ? "active" : ""
          }`}
          aria-label={
            isFavorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          onClick={handleFavorite}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="image-overlay" />
      </div>

      <div className="game-info">
        <p className="game-genre">{genre}</p>

        <h3>{title}</h3>

        <div className="game-platform">
          <Monitor size={14} />
          <span>{platform}</span>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;