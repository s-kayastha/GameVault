import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
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

  useEffect(() => {
    async function loadGame() {
      try {
        if (!id) {
          throw new Error("Game ID is missing");
        }

        const data = await getGameDetails(Number(id));

        setGame(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

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

        <Link to="/">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link to="/" className="back-button">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <section className="game-details">
        <div className="details-image">
          <img src={game.thumbnail} alt={game.title} />
        </div>

        <div className="details-content">
          <p className="section-label">{game.genre}</p>

          <h1>{game.title}</h1>

          <p className="details-description">
            {game.description}
          </p>

          <div className="game-meta">
            <div>
              <span>Platform</span>
              <strong>{game.platform}</strong>
            </div>

            <div>
              <span>Developer</span>
              <strong>{game.developer}</strong>
            </div>

            <div>
              <span>Publisher</span>
              <strong>{game.publisher}</strong>
            </div>

            <div>
              <span>Release Date</span>
              <strong>{game.release_date}</strong>
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