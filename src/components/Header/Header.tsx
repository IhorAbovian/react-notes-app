import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header border-b border-gray-300  p-2 flex items-center sticky top-0 bg-white z-10">
      <div className="container mx-auto flex justify-between gap-4 items-center">
        <Link to="/" className="font-bold text-lg">
          NotesApp
        </Link>

        <form className="flex flex-1 items-center justify-center">
          <input
            type="search"
            placeholder="Search"
            className="border rounded border-gray-100 bg-gray-100 py-2 pl-9 pr-4 placeholder:text-gray-400 w-full focus:outline-none"
          />
        </form>

        <Link to="/add" className="p-1 bg-blue-300">
          New Note
        </Link>
      </div>
    </header>
  );
};

export default Header;
