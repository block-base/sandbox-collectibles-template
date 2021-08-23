import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className={`flex justify-between w-full h-14 px-8 bg-gradient-to-r from-yellow-400 to-red-300`}>
      <div className="flex items-center text-white">
        <Link to="/">Kanji Flowers</Link>
      </div>
    </header>
  );
};
