import { useState,useEffect,useCallback } from "react";
import { useTypingEngine } from "./hooks/useTypingEngine";
import {useText} from"./hooks/useText";
import { useWords,generateWords } from "./hooks/useWords";
import Clock from "./components/Clock";
import { WORD_COUNT } from "./constants/words";
import WordDisplay from "./components/WordDisplay";
import TypingInput from "./components/TypingInput";
import RestartButton from "./components/RestartButton";
import {MistakesCounter} from "./components/MistakesCounter";
import ModeToggle, {type Mode} from "./components/ModeToggle";

export default function App() {
  const [mode,setMode]=useState<Mode>("words");
  
  const {text}=useText();
  const {wordBank}=useWords();

  const getText=useCallback(() : string => {
    if(mode==="words"){
      if (wordBank.length===0){
        return "No word found.";
      }
      return generateWords(wordBank,WORD_COUNT).join(" ");
    }

    if(text.length === 0){
      return "No text found";
    }
    
    const randomIndex=Math.floor(Math.random() * text.length);
    return text[randomIndex];
  },[mode,wordBank,text]);

  const {target,typed,elapsed,finished,mistakes,handleInputChange,reset}=useTypingEngine(getText);

  // Generates either words from either words.ts or text from text.txt
  useEffect(()=>{
    reset();
    
  },[reset]);

  return (
    <div>
      <h1>Visual Typing Speed Tester</h1>

      <ModeToggle mode={mode} onChange={setMode} />

      {/* Le clock */}
      <Clock elapsed={elapsed} />

      {/* Mistake counter */}
      <MistakesCounter mistakes={mistakes} />

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