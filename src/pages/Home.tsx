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

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>

          <h1>
            Discover your
            <span> next favorite game.</span>
          </h1>

          <p className="hero-description">
            Explore free-to-play games, discover hidden gems, and build your
            personal gaming collection.
          </p>

          <div className="search-box">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Trending Games */}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="section-label">EXPLORE</p>
            <h2>Trending Games</h2>
          </div>

          <button className="view-all">
            View all →
          </button>
        </div>

        {loading && <p>Loading games...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
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
      </section>

      {/* Genres */}
      <section className="section genres-section">
        <div className="section-header">
          <div>
            <p className="section-label">BROWSE</p>
            <h2>Explore by Genre</h2>
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