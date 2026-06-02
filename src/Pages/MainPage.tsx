import MainContent from "../components/MainContent/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";

export const MainPage = () => {
  return (
    <div className="flex bg-white">
      <Sidebar />
      <MainContent />
    </div>
  );
};
