import { useState,useEffect,useCallback } from "react";
import {useSearchParams,useNavigate} from "react-router-dom";
import { useTypingEngine } from "../hooks/useTypingEngine";
import {useText,getRandomLines} from"../hooks/useText";
import { useWords,generateWords } from "../hooks/useWords";
import Clock from "../components/Clock";
import { WORD_COUNT } from "../constants/words";
import WordDisplay from "../components/WordDisplay";
import WPMCounter from "../components/WPMCounter"
import TypingInput from "../components/TypingInput";
import RestartButton from "../components/RestartButton";
import BackButton from "../components/BackButton";
import MistakesCounter from "../components/MistakesCounter";
import RemainingMistakesCounter from "../components/RemainingMistakesCounter";
import WordsStatCounter from "../components/WordStatsCounter";
import AccuracyCounter from "../components/AccuracyCounter";
import ResultsModal from "../components/ResultsModal";

type Mode = "words" | "text";

interface TestPageProps{
    playKeySound:(isMistake?:boolean)=>void;
}

export default function TestPage({playKeySound} : TestPageProps) {
    const [searchParams]=useSearchParams();
    const navigate=useNavigate();

    const type=searchParams.get("type");
    const duration=searchParams.get("duration");
    const length=searchParams.get("length");
    const content=searchParams.get("content");

    const mode:Mode=content==="text" ? "text" : "words";
    const isTimed=type=="timed";
    const lengthMultiplier=length ? parseInt(length,10) : 1;
    const durationSeconds=isTimed && duration ? parseInt(duration,10)*60 : undefined;
    
    const numberValue=isTimed ? duration : length;
    const unitLabel=isTimed ? "min" : (lengthMultiplier===1 ? "line" : "lines");
    const modeLabel=isTimed ? "Timed" : "Completion";
    const contenLabelt=content==="text" ? "Text Excerpt" : "Random Words";
    const wordsStatLabel=isTimed ? "Words Written" : "Words Remaining";

    const {text}=useText();
    const {wordBank}=useWords();

    const getText=useCallback(() : string => {
        if(mode==="words"){
            if (wordBank.length===0){
                return "No words found.";
            }
                // Different ways to retrieve data depending on test mode
                const count=isTimed ? WORD_COUNT : WORD_COUNT*lengthMultiplier;
                return generateWords(wordBank,count).join(" ");
        }

        if(text.length === 0){
            return "No text found";
        }
    
        const lineCount=isTimed ? 1 : lengthMultiplier;
        return getRandomLines(text,lineCount);
    },[mode,wordBank,text,isTimed,lengthMultiplier]);

    // For Timed Mode : Pulls text once running low
    const extendText=useCallback(():string=>{
        if(mode==="words"){
            if(wordBank.length===0) return "";
            return " "+generateWords(wordBank,WORD_COUNT).join(" ");
        }
        if(text.length===0) return "";
        return " "+getRandomLines(text,1);
    },[mode,wordBank,text]);

    const {target,leftMistakes,rightMistakes,typed,cursor,accuracy,elapsed,timeRemaining,wpm,finished,mistakes,totalWordsWritten,wordsRemaining,typeCharacter,backspace,moveCursorLeft,moveCursorRight,reset}=useTypingEngine(getText,isTimed ? {durationSeconds,extendText}:undefined);

    const wordsStatValue=isTimed ? totalWordsWritten : wordsRemaining;

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
                        backgroundColor:'var(--color-bg)',
                        color:"var(--color-text)"
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
                <h1>{numberValue} {unitLabel} {modeLabel} Test - {contenLabelt}</h1>

                <div style={{position:"sticky",top:0,zIndex:10,backgroundColor:'var(--color-bg)',paddingBottom:'0.5rem'}}>

                    <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:"0.5rem",margin:"1rem 0"}}>

                        {/* Le clock */}
                        <Clock elapsed={elapsed} timeRemaining={timeRemaining} />

                        {/* Words per minute counter */}
                        <WPMCounter wpm={wpm} />

                        {/* Mistake counter */}
                        <MistakesCounter mistakes={mistakes} />

                        {/* Accuracy counter */}
                        <AccuracyCounter accuracy={accuracy} />
                    
                    </div>

                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"0.5rem",margin:"1rem 0"}}>
                        
                        {/* Remaining Mistakes counter */}
                        <RemainingMistakesCounter leftMistakes={leftMistakes} rightMistakes={rightMistakes} />

                        {/* Words written/remaining counter */}
                        <WordsStatCounter label={wordsStatLabel} value={wordsStatValue} />

                    </div>

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
                                playKeySound={playKeySound}
                />

                <div style={{marginTop:"2.5rem",display:"flex",justifyContent:'center',gap:'0.75rem'}}>

                    {/* Restart Button */}
                    <RestartButton onClick={handleRestart} />
                    
                    {/* Button that navigates back to home */}
                    <BackButton onClick={handleBackToHome} />
                    
                </div>

                {/* ResultsModal */}
                {showModal && (
                    <ResultsModal   wpm={wpm}
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