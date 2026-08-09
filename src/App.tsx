import { Route,Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

export default function App(){
  const {theme,toggleTheme}=useTheme();

  return(
    <>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>

    </>

  )
}