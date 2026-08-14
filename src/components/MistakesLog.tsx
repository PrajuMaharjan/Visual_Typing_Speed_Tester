import type { MistakeEntry } from "../hooks/useTypingEngine";

interface MistakesLogProps{
    mistakeLog:MistakeEntry[];
    elapsedSeconds:number;
}

export default function MistakesLog({mistakeLog,elapsedSeconds} : MistakesLogProps){
    if(mistakeLog.length===0){
        return(
            <div style={{
                            margin:"1.5rem 0",
                            fontSize:"0.9rem",
                            color:"var(--color-text-muted)"
                        }}
            >
                No mistakes - clean run!
            </div>
        );
    }

    const width=280;
    const height=100;
    const padding=20;
    const maxTime=Math.max(elapsedSeconds,1);
    const maxCount=mistakeLog.length;

    const sortedByTime=[...mistakeLog].sort((a,b)=>a.time-b.time);

    // Draw the mistakes line
    let pathData=`M ${padding} ${height-padding}`;
    sortedByTime.forEach((entry,i)=>{
        const x=padding+(entry.time/maxTime)*(width-2*padding);
        const yBefore=height-padding-(i/maxCount)*(height-2*padding);
        const yAfter=height-padding-((i+1)/maxCount)*(height-2*padding);
        pathData += ` L ${x} ${yBefore} L ${x} ${yAfter}`;
    });
    pathData += ` L ${width-padding} ${padding}`;

    // Most mistyped characters
    const countsByChar=new Map<string,number>();
    mistakeLog.forEach((entry)=>{
        const key=entry.expected===" " ? "_" : entry.expected;
        countsByChar.set(key,(countsByChar.get(key) ?? 0)+1);
    });
    const topChars=[...countsByChar.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5);
    const maxCharCount=topChars[0]?.[1] ?? 1;

    return(
        <div style={{margin:"1.5rem 0",textAlign:"left"}}>
            <div style={{fontSize:"0.9rem",fontWeight:600,marginBottom:"0.5rem",color:"var(--color-text)"}}>
                Mistakes Over Time
            </div>

        <svg viewBox={`0 0 ${width} ${height}`} style={{width:"100%",height:"auto"}}>
            <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="var(--color-border)" strokeWidth={1} />
            <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="var(--color-border)" strokeWidth={1} />
            <path d={pathData} fill="none" stroke="var(--color-mistake)" strokeWidth={2} />
        </svg> 

        <div style={{fontSize:"0.9rem",fontWeight:600,margin:"1rem 0 0.5rem",color:"var(--color-text)"}}>
            Most Mistyped Characters
        </div>

        {topChars.map(([char,count])=>(
            <div key={char} style={{display:"flex",alignItems:"center",gap:"0.5rem",margin:"0.3rem 0"}}>
                <div style={{width:"1.5rem",textAlign:"center",fontFamily:"monospace",color:"var(--color-text)"}}>
                    {char}
                </div>

                <div style={{flex:1,backgroundColor:"var(--color-border)",borderRadius:"4px",overflow:"hidden",height:"1rem"}}>
                    <div style={{width:`${(count/maxCharCount)*100}%`,backgroundColor:"var(--color-mistake)",height:"100%"}} />
                </div>

                <div style={{width:"1.5rem",textAlign:'right',fontSize:"0.85rem",color:"var(--color-text-muted)"}}>
                    {count}
                </div>
            </div>
        ))}
    </div> 
    );
}