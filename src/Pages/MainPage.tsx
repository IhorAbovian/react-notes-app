import MainContent from "../components/MainContent/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";

export const MainPage = () => {
  return (
    <div className="flex bg-slate-950">
      <Sidebar />
      <MainContent />
    </div>
  );
};
