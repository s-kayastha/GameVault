import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Calendar,
  Monitor,
  Building2,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getGameDetails } from "../services/gameApi";

type GameDetailsData = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  description: string;
  genre: string;
  platform: string;
  developer: string;
  publisher: string;
  release_date: string;
  game_url: string;
};

function GameDetails() {
  const { id } = useParams();

  const [game, setGame] = useState<GameDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadGame() {
      try {
        if (!id) {
          throw new Error("Game ID is missing");
        }

        const data = await getGameDetails(Number(id));

        setGame(data);

        const savedFavorites = localStorage.getItem(
          "gamevault-favorites"
        );

        const favorites = savedFavorites
          ? JSON.parse(savedFavorites)
          : [];

        setIsFavorite(
          favorites.some(
            (favorite: { id: number }) =>
              favorite.id === data.id
          )
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  const handleFavorite = () => {
    if (!game) return;

    const savedFavorites = localStorage.getItem(
      "gamevault-favorites"
    );

    const favorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite: { id: number }) =>
          favorite.id !== game.id
      );

      localStorage.setItem(
        "gamevault-favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      const favoriteGame = {
        id: game.id,
        title: game.title,
        genre: game.genre,
        platform: game.platform,
        image: game.thumbnail,
      };

      favorites.push(favoriteGame);

      localStorage.setItem(
        "gamevault-favorites",
        JSON.stringify(favorites)
      );

      setIsFavorite(true);
    }

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  if (loading) {
    return (
      <main className="details-page">
        <p>Loading game...</p>
      </main>
    );
  }

  if (error || !game) {
    return (
      <main className="details-page">
        <p>{error || "Game not found."}</p>

        <Link to="/" className="back-button">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </main>
    );
  }

  const formattedDate = new Date(
    game.release_date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="details-page">
      <Link to="/" className="back-button">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <section className="game-details">
        <div className="details-image">
          <img src={game.thumbnail} alt={game.title} />

          <button
            className={`details-favorite-button ${
              isFavorite ? "active" : ""
            }`}
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Heart
              size={22}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="details-content">
          <div className="details-title-row">
            <div>
              <p className="section-label">
                {game.genre}
              </p>

              <h1>{game.title}</h1>
            </div>

            <span className="platform-badge">
              <Monitor size={16} />
              {game.platform}
            </span>
          </div>

          <p className="details-short-description">
            {game.short_description}
          </p>

          <p className="details-description">
            {game.description}
          </p>

          <div className="game-meta">
            <div>
              <UserRound size={18} />

              <div>
                <span>Developer</span>
                <strong>{game.developer}</strong>
              </div>
            </div>

            <div>
              <Building2 size={18} />

              <div>
                <span>Publisher</span>
                <strong>{game.publisher}</strong>
              </div>
            </div>

            <div>
              <Calendar size={18} />

              <div>
                <span>Release Date</span>
                <strong>{formattedDate}</strong>
              </div>
            </div>
          </div>

          <a
            href={game.game_url}
            target="_blank"
            rel="noreferrer"
            className="play-button"
          >
            Play Game
            <ExternalLink size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default GameDetails;