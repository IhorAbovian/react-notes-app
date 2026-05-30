import MainContent from "../components/MainContent/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";

export type Note = {
  id: string;
  title: string;
  body: string;
};

export const MainPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container mx-auto flex">
      <Sidebar refreshKey={refreshKey} />

      <MainContent onNoteDeleted={() => setRefreshKey((k) => k + 1)} />
    </div>
  );
};
