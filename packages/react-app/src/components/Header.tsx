import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header
      className={`flex justify-between w-full h-14 px-8 bg-gradient-to-r from-red-300 via-purple-400 to-blue-500`}
    >
      <div className="flex items-center">
        <Link to="/">あああ</Link>
      </div>
    </header>
  );
};
