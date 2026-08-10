import { Route,Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";
import ThemeToggle from "./components/ThemeToggle";
import SoundToggle from "./components/SoundToggle";
import { useTheme } from "./hooks/useTheme";
import { useSound } from "./hooks/useSound";

export default function App(){
  const {theme,toggleTheme}=useTheme();
  const {soundEnabled,toggleSound,playKeySound}=useSound();

  return(
    <>
      <SoundToggle soundEnabled={soundEnabled} onToggle={toggleSound} />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage playKeySound={playKeySound} />} />
      </Routes>

    </>

  )
}