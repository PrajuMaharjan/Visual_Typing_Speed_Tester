import { useState ,useEffect} from "react";
import { generateWords } from "../constants/words";

const WORD_COUNT=20;

export function useTypingEngine(){
    const [words,setWords]=useState<string[]>(()=>generateWords(WORD_COUNT));
    const [typed,setTyped]=useState("");
    const [startTime,setStartTime]=useState<number | null>(null);
    const [elapsed,setElapsed]=useState(0);

    const target=words.join(" ");
    const finished=typed.length === target.length;  

    // Clock stopwatch
    useEffect(()=>{
        if(startTime === null || finished) return;

        const interval=setInterval(()=>{
            setElapsed((Date.now() - startTime) / 1000);
        },100);

        return ()=>clearInterval(interval);
    },[startTime,finished]);

    function handleInputChange(value : string){
        // Stop taking input once all the words have been typed
        if(value.length>target.length) return;

        // Start the clock once the first letter is typed
        if(startTime === null && value.length>0){
            setStartTime(Date.now());
        }
        setTyped(value);
    }

    function reset(){
        setWords(generateWords(WORD_COUNT));
        setTyped("");
        setStartTime(null);
        setElapsed(0);
    }

    return{
        target,typed,elapsed,finished,handleInputChange,reset
    };
}