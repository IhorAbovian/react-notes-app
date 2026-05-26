import { useRef, useState } from "react";

type HeaderProps = {
  addNote: () => void;
};

const Header = ({ addNote }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleAddNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActive(true);
    addNote();

    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  };

  return (
    <header className="header border-b-1 border-gray-300  p-2 flex items-center sticky top-0 bg-white z-10">
      <form className="w-full flex items-center justify-between">
        <div className="relative inline-block ml-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            type="text"
            placeholder="Search"
            className="border rounded border-gray-100 bg-gray-100 py-2 pl-9 pr-4 placeholder:text-gray-400 w-72 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleAddNote}
          disabled={isActive}
          className={`px-4 py-2 rounded mr-70 cursor-pointer transition-colors ${
            isActive
              ? "bg-blue-300 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          New Note
        </button>
      </form>
    </header>
  );
};

export default Header;
