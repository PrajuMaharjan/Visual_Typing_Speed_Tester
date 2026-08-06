import { useState,useEffect,useCallback } from "react";
import { useTypingEngine } from "./hooks/useTypingEngine";
import {useText} from"./hooks/useText";
import { useWords,generateWords } from "./hooks/useWords";
import Clock from "./components/Clock";
import { WORD_COUNT } from "./constants/words";
import WordDisplay from "./components/WordDisplay";
import WPMCounter from "./components/WPMCounter"
import TypingInput from "./components/TypingInput";
import RestartButton from "./components/RestartButton";
import MistakesCounter from "./components/MistakesCounter";
import AccuracyCounter from "./components/AccuracyCounter";
import ModeToggle, {type Mode} from "./components/ModeToggle";

import cat from "../assets/images/cat.gif";

export default function App() {
  const [mode,setMode]=useState<Mode>("words");
  
  const {text}=useText();
  const {wordBank}=useWords();

  const getText=useCallback(() : string => {
    if(mode==="words"){
      if (wordBank.length===0){
        return "No words found.";
      }
      return generateWords(wordBank,WORD_COUNT).join(" ");
    }

    if(text.length === 0){
      return "No text found";
    }
    
    const randomIndex=Math.floor(Math.random() * text.length);
    return text[randomIndex];
  },[mode,wordBank,text]);

  const {target,typed,cursor,accuracy,elapsed,wpm,finished,mistakes,typeCharacter,backspace,moveCursorLeft,moveCursorRight,reset}=useTypingEngine(getText);

  // Generates either words from either words.ts or text from text.txt
  useEffect(()=>{
    reset();
    
  },[reset]);

  return (
    <div style= {{
                  maxWidth:"700px",
                  margin:"0 auto",
                  padding:"2rem 1rem 4rem",
                  textAlign:"center",
                  fontFamily:"sans-serif"
                }}
    >
      <h1>Visual Typing Speed Tester</h1>

      {/* Humor */}
      <img  src={cat}
            alt="Tys=ping speed tester"
            style={{
                    maxWidth:"280px",
                    width:"100%",
                    margin:"1rem auto",
                    borderRadius:"8px",
                    display:"block"
                  }}
      />

      <ModeToggle mode={mode} onChange={setMode} />

      <div style={{display:"flex",justifyContent:"center",margin:"1rem 0"}}>

        {/* Le clock */}
        <Clock elapsed={elapsed} />

        {/* Words per minute counter */}
        <WPMCounter wpm={wpm} />

        {/* Mistake counter */}
        <MistakesCounter mistakes={mistakes} />

        {/* Accuracy counter */}
        <AccuracyCounter accuracy={accuracy} />

      </div>

      {/* the field where the words appear */}
      <WordDisplay target={target} typed={typed} cursor={cursor} />

      {/* The field where the user types */}
      <TypingInput  typed={typed}
                    target={target}
                    cursor={cursor}
                    onType={typeCharacter}
                    onBackspace={backspace}
                    onMoveLeft={moveCursorLeft}
                    onMoveRight={moveCursorRight}
                    disabled={finished}
      />

      <div style={{marginTop:"2.5rem"}}>
        {/* Restart Button */}
        <RestartButton onClick={reset} />
      </div>

    </div>
  );
}