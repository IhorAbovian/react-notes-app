import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import { AddPage } from "./pages/AddPage.tsx";
import { MainPage } from "./pages/MainPage.tsx";
import { EditPage } from "./pages/EditePage.tsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:noteId" element={<MainPage />} />
        <Route path="add" element={<AddPage />} />
        <Route path="edit/:noteId" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
