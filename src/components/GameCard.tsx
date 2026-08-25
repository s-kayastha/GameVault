import { Heart, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../services/favorites";

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
  const [favorite, setFavorite] = useState(() => isFavorite(id));

  function handleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const newFavoriteState = toggleFavorite(id);

    setFavorite(newFavoriteState);
  }

  return (
    <Link to={`/game/${id}`} className="game-card">
      <div className="game-image">
        <img src={image} alt={title} />

        <button
          className={`favorite-button ${favorite ? "active" : ""}`}
          aria-label={
            favorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          onClick={handleFavorite}
        >
          <Heart
            size={18}
            fill={favorite ? "currentColor" : "none"}
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