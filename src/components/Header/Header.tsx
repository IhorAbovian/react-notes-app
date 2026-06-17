import { Link, useSearchParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-3">
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
            <form onSubmit={handleSearch}>
              <Input
                name="search"
                type="search"
                placeholder="Search notes..."
                defaultValue={query}
              ></Input>
            </form>
          </div>
        </div>

        <Link to="/add">
          <Button size="lg" className="cursor-pointer ">
            <FontAwesomeIcon icon={faPlus} />
            New Note
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
