import { useState ,useEffect, useCallback} from "react";

export function useTypingEngine(getText:()=>string){
    const [typed,setTyped]=useState("");
    const [target,setTarget]=useState<string>(getText);
    const [cursor,setCursor]=useState(0);
    const [startTime,setStartTime]=useState<number | null>(null);
    const [elapsed,setElapsed]=useState(0);
    const [mistakes,setMistakes]=useState(0);

    const finished=typed === target;  

    // WPM calculation logic
    const correctChars=[...typed].filter((char,i)=>char===target[i]).length;
    const minutesElapsed=elapsed/60;
    const wpm = minutesElapsed>0 ? Math.round(correctChars / 5 / minutesElapsed) : 0;

    // Accuracy calculation logic
    const tnLength=typed.length === target.length ? typed.length : cursor;
    const correctCharsForAccuracy=[...typed.slice(0,tnLength)].filter((char,i)=>char===target[i]).length;
    const accuracy=(correctCharsForAccuracy+mistakes)>0 
                    ? Math.round((correctCharsForAccuracy)/(correctCharsForAccuracy+mistakes)*1000)/10 
                    : 100;
    
    // Remaining mistakes calculation logic
    const leftMistakes=[...typed.slice(0,cursor)].filter((char,i)=>char !== target[i]).length;
    const rightMistakes=[...typed.slice(cursor)].filter((char,i)=>char !== target[cursor+i]).length;

    // Clock stopwatch
    useEffect(()=>{
        if(startTime === null || finished) return;

        const interval=setInterval(()=>{
            setElapsed((Date.now() - startTime) / 1000);
        },100);

        return ()=>clearInterval(interval);
    },[startTime,finished]);

    // This function ensures that the mistakes dont count towards words/letters typed
    // When you delete a character, it reduces letter count by 1
    function typeCharacter(char:string){
        if(finished) return;

        // Shift characters one step right when amending mistake
        if (typed.length>=target.length) return;

        if(startTime === null){
            setStartTime(Date.now());
        }

        if(char !== target[cursor]){
            setMistakes((m) => m+1);
        }

        const newTyped=typed.slice(0,cursor) + char + typed.slice(cursor);
        setTyped(newTyped);

        // Jump the cursor to the end if all mistakes are amended
        const remainingMistakes=[...newTyped].filter((c,i)=>c!==target[i]).length;
        setCursor(remainingMistakes===0 ? newTyped.length : cursor+1);
    }

    function backspace(){
        if(cursor===0) return;

        const typedSoFar=typed.slice(0,cursor);
        const targetSoFar=target.slice(0,cursor);
        if(typedSoFar === targetSoFar) return;

        // Delete only the one character to the left
        const newTyped=typed.slice(0,cursor-1)+typed.slice(cursor);
        setTyped(newTyped);
        setCursor(cursor-1);
    }

    function moveCursorLeft(){
        const typedSoFar=typed.slice(0,cursor);
        const targetSoFar=target.slice(0,cursor);
        if(typedSoFar === targetSoFar) return;
        
        setCursor((c)=>Math.max(0,c-1));
    }

    function moveCursorRight(){
        setCursor((c)=>Math.min(typed.length,c+1));
    }

    const reset = useCallback(()=>{
        setTarget(getText());
        setTyped("");
        setCursor(0);
        setStartTime(null);
        setElapsed(0);
        setMistakes(0);
    },[getText]);

    return{
        target,typed,cursor,elapsed,mistakes,wpm,accuracy,leftMistakes,rightMistakes,finished,typeCharacter,reset,backspace,moveCursorLeft,moveCursorRight
    };
}