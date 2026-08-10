import { useState,useEffect,useCallback } from "react";

const STORAGE_KEY="soundEnabled";

function getStoredSoundEnabled():boolean{
    const stored=localStorage.getItem(STORAGE_KEY);
    return stored===null ? true : stored==="true";
}

let audioContext:AudioContext | null = null;

function getAudioContext():AudioContext{
    if(!audioContext){
        audioContext=new AudioContext();
    }
    return audioContext;
}

// Different sound for correct keystrokes vs mistakes
function typingAudio(isMistake:boolean):void{
    const context=getAudioContext();
    const oscillator=context.createOscillator();
    const gainNode=context.createGain();

    oscillator.type=isMistake ? "sawtooth" : "square";
    oscillator.frequency.setValueAtTime(isMistake ? 180 : 700,context.currentTime);

    const duration=isMistake ? 0.12 : 0.05;
    gainNode.gain.setValueAtTime(0.15,context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001,context.currentTime+duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime+duration);
}

export function useSound(){
    const [soundEnabled,setSoundEnabled]=useState<boolean>(getStoredSoundEnabled);

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY,String(soundEnabled));
    },[soundEnabled]);

    const toggleSound=useCallback(()=>{
        setSoundEnabled(prevEnabled=>!prevEnabled);
    },[]);

    const playKeySound=useCallback((isMistake:boolean=false)=>{
        if(!soundEnabled) return;
        typingAudio(isMistake);
    },[soundEnabled]);

    return {soundEnabled,toggleSound,playKeySound};
}