import { useState } from "react";
import { generateWords } from "../constants/words";

const WORD_COUNT=20;

export function useTypingEngine(){
    const [words,setWords]=useState<string[]>(()=>generateWords(WORD_COUNT));
    const [typed,setTyped]=useState("");

    const target=words.join(" ");

    function handleInputChange(value : string){
        if(value.length>target.length) return;
        setTyped(value);
    }

    function reset(){
        setWords(generateWords(WORD_COUNT));
        setTyped("");
    }

    return{
        target,typed,handleInputChange,reset
    };
}