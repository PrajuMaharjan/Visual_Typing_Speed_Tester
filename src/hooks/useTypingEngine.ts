import { useState ,useEffect} from "react";
import { generateWords } from "../constants/words";

const WORD_COUNT=20;

export function useTypingEngine(){
    const [words,setWords]=useState<string[]>(()=>generateWords(WORD_COUNT));
    const [typed,setTyped]=useState("");
    const [startTime,setStartTime]=useState<number | null>(null);
    const [elapsed,setElapsed]=useState(0);
    const [mistakes,setMistakes]=useState(0);

    const target=words.join(" ");
    const finished=typed === target;  

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

        // Cheking if entered character is correct aand incrementing mistakes counter if wrong
        if(value.length > typed.length){
            const newCharIndex=value.length-1;
            if(value[newCharIndex] !== target[newCharIndex]){
                setMistakes((m) => m+1);
            }
        }
        setTyped(value);
    }

    function reset(){
        setWords(generateWords(WORD_COUNT));
        setTyped("");
        setStartTime(null);
        setElapsed(0);
        setMistakes(0);
    }

    return{
        target,typed,elapsed,mistakes,finished,handleInputChange,reset
    };
}