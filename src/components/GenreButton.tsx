type GenreButtonProps = {
  name: string;
  active: boolean;
  onClick: () => void;
};

function GenreButton({
  name,
  active,
  onClick,
}: GenreButtonProps) {
  return (
    <button
      className={`genre-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default GenreButton;