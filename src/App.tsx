import { useTypingEngine } from "./hooks/useTypingEngine";
import Clock from "./components/Clock";
import WordDisplay from "./components/WordDisplay";
import TypingInput from "./components/Typinginput";
import RestartButton from "./components/RestartButton";

export default function App() {
  const {target,typed,elapsed,finished,handleInputChange,reset}=useTypingEngine();

  return (
    <div>
      <h1>Visual Typing Speed Tester</h1>

      {/* Le clock */}
      <Clock elapsed={elapsed} />

      {/* the field where the words appear */}
      <WordDisplay target={target} typed={typed} />

      {/* The field where the user types */}
      <TypingInput  typed={typed}
                    onChange={handleInputChange}
                    disabled={finished}
      />

      {/* Restart Button */}
      <RestartButton onClick={reset} />
    
    </div>
  );
}