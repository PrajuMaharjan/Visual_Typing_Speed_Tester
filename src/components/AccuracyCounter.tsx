interface AccuracyCounterProps{
    accuracy:number;
}

export default function AccuracyCounter({accuracy} : AccuracyCounterProps){
    const clampedAccuracy=Math.min(100,Math.max(0,accuracy));
    const hue=(clampedAccuracy/100)*120;
    const color=`hsl(${hue},70%,45%)`;

    return(
        <div style= {{
                        display:"inline-flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"0.5rem 1.25rem",
                        border:"1px solid #ccc",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        color
                    }}
        >
            Accuracy : {accuracy}
        </div>
    );
}