import { useEffect, useState } from "react";
import { Gamepad2, Heart, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const loadFavoriteCount = () => {
      const savedFavorites = localStorage.getItem(
        "gamevault-favorites"
      );

      const favorites = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

      setFavoriteCount(favorites.length);
    };

    loadFavoriteCount();

    window.addEventListener(
      "favoritesUpdated",
      loadFavoriteCount
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        loadFavoriteCount
      );
    };
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <Gamepad2 size={28} />
        <span>GameVault</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">
          <Home size={17} />
          Discover
        </NavLink>

        <NavLink to="/">
          Games
        </NavLink>

        <NavLink to="/favorites">
          <Heart size={17} />
          Favorites

          {favoriteCount > 0 && (
            <span className="favorite-count">
              {favoriteCount}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;