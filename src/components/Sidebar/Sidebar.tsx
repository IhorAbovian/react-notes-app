import type { Note } from "../../App";

type SidebarProps = {
  notes: Note[];
};

const Sidebar = ({ notes }: SidebarProps) => {
  return (
    <aside className="sidebar flex h-full w-72 flex-col border-r border-gray-300 bg-gray-50">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">My Notes</h2>

        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded border border-gray-200 bg-white p-3 hover:border-blue-400 cursor-pointer"
            >
              <h3 className="font-medium">{note.title}</h3>
              <p className="text-sm text-gray-400">Empty note...</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
