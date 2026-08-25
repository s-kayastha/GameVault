import { useEffect, useState } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
  Gamepad2,
} from "lucide-react";
import GameCard from "../components/GameCard";
import GenreButton from "../components/GenreButton";
import { getGames } from "../services/gameApi";

type Game = {
  id: number;
  title: string;
  genre: string;
  thumbnail: string;
  platform: string;
};

const genres = [
  "All",
  "Action",
  "RPG",
  "Adventure",
  "Strategy",
  "Sports",
  "Racing",
  "Horror",
];

function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getGames();
        setGames(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load games.");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      game.genre.toLowerCase() === selectedGenre.toLowerCase();

    return matchesSearch && matchesGenre;
  });

  const featuredGame = games[0];

  return (
    <main className="home-page">

      {/* =========================
          HERO
      ========================= */}

      <section
        className="hero"
        style={
          featuredGame
            ? {
                backgroundImage: `url(${featuredGame.thumbnail})`,
              }
            : undefined
        }
      >
        <div className="hero-overlay" />

        <div className="hero-content">

          <div className="hero-badge">
            <Sparkles size={15} />
            <span>GAMEVAULT DISCOVERY</span>
          </div>

          <p className="eyebrow">
            YOUR NEXT ADVENTURE STARTS HERE
          </p>

          <h1>
            Discover your
            <span> next favorite game.</span>
          </h1>

          <p className="hero-description">
            Explore free-to-play games, discover hidden gems,
            and build your personal gaming collection.
          </p>

          <div className="search-box">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <span className="search-hint">
              SEARCH
            </span>
          </div>

          <div className="hero-stats">
            <div>
              <Gamepad2 size={18} />
              <span>
                {games.length > 0 ? games.length : "100+"} Games
              </span>
            </div>

            <div>
              <span className="stat-dot" />
              <span>Free to Play</span>
            </div>
          </div>

        </div>

        {featuredGame && (
          <div className="featured-game">

            <p className="featured-label">
              FEATURED GAME
            </p>

            <h2>{featuredGame.title}</h2>

            <p>
              {featuredGame.genre} · {featuredGame.platform}
            </p>

            <button
              className="featured-button"
              onClick={() => {
                window.location.href = `/game/${featuredGame.id}`;
              }}
            >
              Explore Game
              <ArrowRight size={17} />
            </button>

          </div>
        )}
      </section>


      {/* =========================
          TRENDING
      ========================= */}

      <section className="section">

        <div className="section-header">

          <div>
            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Trending Games
            </h2>

            <p className="section-description">
              Discover what players are playing right now.
            </p>
          </div>

          <button className="view-all">
            View all
            <ArrowRight size={16} />
          </button>

        </div>

        {loading && (
          <div className="loading-state">
            Loading games...
          </div>
        )}

        {error && (
          <div className="error-state">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredGames.length === 0 ? (
              <div className="empty-state">
                <Search size={28} />
                <h3>No games found</h3>
                <p>
                  Try searching for another game or
                  changing the genre.
                </p>
              </div>
            ) : (
              <div className="game-grid">
                {filteredGames.slice(0, 8).map((game) => (
                  <GameCard
                    id={game.id}
                    key={game.id}
                    title={game.title}
                    genre={game.genre}
                    platform={game.platform}
                    image={game.thumbnail}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </section>


      {/* =========================
          GENRES
      ========================= */}

      <section className="section genres-section">

        <div className="section-header">

          <div>
            <p className="section-label">
              BROWSE
            </p>

            <h2>
              Explore by Genre
            </h2>

            <p className="section-description">
              Find your next adventure by choosing a genre.
            </p>
          </div>

        </div>

        <div className="genres">

          {genres.map((genre) => (
            <GenreButton
              key={genre}
              name={genre}
              active={selectedGenre === genre}
              onClick={() => setSelectedGenre(genre)}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;