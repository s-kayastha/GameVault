import { useEffect, useState } from "react";
import { Search } from "lucide-react";
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

function Games() {
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

  return (
    <main className="games-page">
      <section className="games-header">
        <p className="section-label">GAME LIBRARY</p>

        <h1>Explore Games</h1>

        <p>
          Browse the GameVault collection and find your next
          favorite game.
        </p>

        <div className="search-box games-search">
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
      </section>

      <section className="games-content">
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