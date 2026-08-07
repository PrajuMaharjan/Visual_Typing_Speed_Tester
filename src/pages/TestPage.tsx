import { useState,useEffect,useCallback } from "react";
import {useSearchParams,useNavigate} from "react-router-dom";
import { useTypingEngine } from "../hooks/useTypingEngine";
import {useText} from"../hooks/useText";
import { useWords,generateWords } from "../hooks/useWords";
import Clock from "../components/Clock";
import { WORD_COUNT } from "../constants/words";
import WordDisplay from "../components/WordDisplay";
import WPMCounter from "../components/WPMCounter"
import TypingInput from "../components/TypingInput";
import RestartButton from "../components/RestartButton";
import MistakesCounter from "../components/MistakesCounter";
import RemainingMistakesCounter from "../components/RemainingMistakesCounter";
import AccuracyCounter from "../components/AccuracyCounter";
import type {Mode} from "../components/ModeToggle";
import ResultsModal from "../components/ResultsModal";

export default function TestPage() {
    const [searchParams]=useSearchParams();
    const navigate=useNavigate();

    const type=searchParams.get("type");
    const duration=searchParams.get("duration");
    const length=searchParams.get("length");
    const content=searchParams.get("content");

    const mode:Mode=content==="text" ? "text" : "words";
    
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

    const {target,leftMistakes,rightMistakes,typed,cursor,accuracy,elapsed,wpm,finished,mistakes,typeCharacter,backspace,moveCursorLeft,moveCursorRight,reset}=useTypingEngine(getText);

    const [prevFinished,setPrevFinished]=useState(finished);
    const [showModal,setShowModal]=useState(false);

    // Show the ResultsModal once the user has written all text correctly
    if(finished !== prevFinished){
        setPrevFinished(finished);
        
        if(finished){
            setShowModal(true);
        }
    }

    // Generates either words from either words.ts or text from text.txt on the first render or when mode is changed
    useEffect(()=>{
        reset();
        
    },[reset]);


    function handleRestart(){
        reset();
        setShowModal(false);
    }

    function handleCloseModal(){
        setShowModal(false);
    }

    function handleBackToHome(){
        navigate("/");
    }

    return (
        <div style={{
                        minHeight:"100vh",
                        backgroundColor:'#eaf7ec'
                    }}
        > 
            <div style= {{
                        maxWidth:"700px",
                        margin:"0 auto",
                        padding:"2rem 1rem 4rem",
                        textAlign:"center",
                        fontFamily:"sans-serif"
                        }}
            >
                <h1>Visual Typing Speed Tester</h1>

                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"0.5rem",margin:"1rem 0"}}>

                    {/* Le clock */}
                    <Clock elapsed={elapsed} />

                    {/* Words per minute counter */}
                    <WPMCounter wpm={wpm} />

                    {/* Mistake counter */}
                    <MistakesCounter mistakes={mistakes} />

                    {/* Accuracy counter */}
                    <AccuracyCounter accuracy={accuracy} />

                    {/* Remaining Mistakes counter */}
                    <RemainingMistakesCounter leftMistakes={leftMistakes} rightMistakes={rightMistakes} />

                </div>

                {/* The field where the words appear */}
                <WordDisplay target={target} typed={typed} cursor={cursor} />

                {/* The field where the user types */}
                <TypingInput    typed={typed}
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
                    <RestartButton onClick={handleRestart} />
                </div>

                {/* ResultsModal */}
                {showModal && (
                    <ResultsModal wpm={wpm}
                                elapsedSeconds={elapsed}
                                mistakes={mistakes}
                                accuracy={accuracy}
                                onRestart={handleRestart}
                                onClose={handleCloseModal}
                                onBackToHome={handleBackToHome}
                    />
                )}
            </div>
        </div>
    );
}