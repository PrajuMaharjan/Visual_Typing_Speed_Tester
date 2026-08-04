import { useState,useEffect } from "react";


export function generateWords(wordBank:string[],count : number) : string[]{
    const words:string[]=[];

    for(let i=0;i<count;i++){
        const randomIndex=Math.floor(Math.random()*wordBank.length);
        words.push(wordBank[randomIndex]);
    }
    return words;
}

export function useWords(){
    const [wordBank,setWordBank]=useState<string[]>([]);
    const [loaded,setLoaded]=useState(false);

    useEffect(()=>{
        fetch('/words.txt')
            .then((res)=>res.text())
            .then((text)=>{
                const words=text.split(/\s+/).map((word)=>word.trim()).filter((word)=>word.length>0);
                setWordBank(words);
            })
            .catch(()=>{
                setWordBank([]);
            })
            .finally(()=>{
                setLoaded(true);
            });
    },[]);

    return {wordBank,loaded};
}