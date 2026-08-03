interface ClockProps{
    elapsed:number;
}

export default function Clock({elapsed} : ClockProps){
    return(
        <p>
            Time Remaining : {Math.floor(elapsed)}s
        </p>
    );
}