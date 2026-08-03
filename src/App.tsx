import { useState } from "react";
import { generateWords } from "./constants/words";

function App() {
  const [words,setWords]=useState<string[]>(()=>generateWords(20));

  return (
    <div>
      <h1>Visual Typing Speed Tester</h1>

      <p>{words.join(' ')}</p>
    </div>
  );
}

export default App;