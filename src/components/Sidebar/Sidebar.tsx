const Sidebar = () => {
  const notes = [
    {
      id: 1,
      title: "Daily Plan",
      body: "Finish the header, build the sidebar, and check the layout.",
    },
    {
      id: 2,
      title: "App Idea",
      body: "A notes app with search, filtering, and sorting.",
    },
    {
      id: 3,
      title: "Shopping List",
      body: "Milk, bread, coffee, cheese, eggs.",
    },
    {
      id: 4,
      title: "Project Tasks",
      body: "Create the two-column layout and connect note data.",
    },
    {
      id: 5,
      title: "Important",
      body: "Check responsiveness and make the active note look better.",
    },
  ];

  return (
    <aside className="sidebar flex h-full w-72 flex-col border-r border-gray-300 cursor-pointer">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">My Notes</h2>

        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded border border-gray-200 p-3">
              <h3 className="font-medium">{note.title}</h3>
              <p className="text-sm text-gray-500">{note.body}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
