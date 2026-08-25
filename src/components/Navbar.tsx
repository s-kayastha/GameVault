import { Gamepad2, Heart } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Gamepad2 size={28} />
        <span>GameVault</span>
      </div>

      <div className="nav-links">
        <a href="#">Discover</a>
        <a href="#">Games</a>

        <a href="#">
          <Heart size={17} />
          Favorites
        </a>
      </div>
    </nav>
  );
}

export default Navbar;