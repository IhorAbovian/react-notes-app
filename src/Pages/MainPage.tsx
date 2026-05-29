import MainContent from "../components/MainContent/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";

export type Note = {
  id: string;
  title: string;
  body: string;
};

export const MainPage = () => {
  return (
    <div className="container mx-auto flex">
      <Sidebar />

      <MainContent />
    </div>
  );
};
