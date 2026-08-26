import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import GameCard from "../components/GameCard";
import { getGames } from "../services/gameApi";

type Game = {
  id: number;
  title: string;
  genre: string;
  thumbnail: string;
  platform: string;
};

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const genres = [
    "All",
    ...Array.from(
      new Set(
        games
          .map((game) => game.genre)
          .filter(Boolean)
      )
    ).sort(),
  ];

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
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      game.title.toLowerCase().includes(search) ||
      game.genre.toLowerCase().includes(search) ||
      game.platform.toLowerCase().includes(search);

    const matchesGenre =
      selectedGenre === "All" ||
      game.genre.toLowerCase() === selectedGenre.toLowerCase();

    return matchesSearch && matchesGenre;
  });

  return (
    <main className="games-page">
      <section className="games-header">
        <p className="section-label">GAME LIBRARY</p>

        <h1>Explore Games</h1>

        <p>
          Browse the GameVault collection and find your next
          favorite game.
        </p>

        <div className="games-filter-bar">
          <div className="games-search-input">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="genre-filter">
            <span>Genre</span>

            <select
              value={selectedGenre}
              onChange={(event) =>
                setSelectedGenre(event.target.value)
              }
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="games-content">
        {loading && (
          <p className="games-message">
            Loading games...
          </p>
        )}

        {error && (
          <p className="games-message">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="games-results-header">
              <p>
                {filteredGames.length}{" "}
                {filteredGames.length === 1
                  ? "game"
                  : "games"}{" "}
                found
              </p>
            </div>

            {filteredGames.length === 0 ? (
              <div className="empty-favorites">
                <h2>No games found</h2>

                <p>
                  Try a different search term or genre.
                </p>
              </div>
            ) : (
              <div className="game-grid">
                {filteredGames.map((game) => (
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
          </>
        )}
      </section>
    </main>
  );
}

export default Games;