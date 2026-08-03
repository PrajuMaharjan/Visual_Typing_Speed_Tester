interface MistakesCounterProps{
    mistakes:number;
}

export function MistakesCounter({mistakes} : MistakesCounterProps){
    return(
        <p>Mistakes : {mistakes}</p>
    );
}