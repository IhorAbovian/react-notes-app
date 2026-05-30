import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import { AddPage } from "./pages/AddPage.tsx";
import { MainPage } from "./pages/MainPage.tsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<MainPage />} />
        <Route path="add" element={<AddPage />} />
      </Routes>
    </>
  );
}

export default App;
