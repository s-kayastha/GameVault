import { Heart, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <Link to={`/game/${id}`} className="game-card">
      <div className="game-image">
        <img src={image} alt={title} />

        <button
          className="favorite-button"
          aria-label={`Add ${title} to favorites`}
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="game-info">
        <h3>{title}</h3>

        <p>{genre}</p>

        <div className="game-platform">
          <Monitor size={14} />
          <span>{platform}</span>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;