import { Gamepad2, Heart, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
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
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;