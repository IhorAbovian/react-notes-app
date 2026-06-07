import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";

// import { useFilters } from "../../state/notes";

const Header = () => {
  // const { setQuery } = useFilters();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = (formData.get("search") as string) || "";

    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete("query");
      setSearchParams(params);
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <FontAwesomeIcon icon={faClipboardList} />
          </span>
          NotesApp
        </Link>

        <div className="flex flex-1 max-w-md items-center">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <form onSubmit={handleSearch}>
              <input
                name="search"
                type="search"
                placeholder="Search notes..."
                defaultValue={query}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-800 placeholder:text-gray-400"
              />
            </form>
          </div>
        </div>

        <Link
          to="/add"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          New Note
        </Link>
      </div>
    </header>
  );
};

export default Header;
