interface WordDisplayProps{
    target:string;
    typed:string;
    cursor:number;
}

export default function WordDisplay({target,typed,cursor} : WordDisplayProps){
    const lengthMatch=typed.length===target.length;
  
    return(
      <div style= {{
                      position:"relative",
                      width:"100%",
                      maxWidth:"600px",
                      height:"2.5rem",
                      margin:"2rem auto",
                      overflow:"hidden",
                      fontFamily:"monospace",
                      fontSize:"1.5rem"
                    }}
      >
          {/* Scrolling text display */}
          <div style= {{
                        position:"absolute",
                        left:"50%",
                        whiteSpace:"nowrap",
                        transform:`translateX(-${cursor}ch)`,
                        transition:"transform 0.1s linear",
                      }}
          >
            {[...target].map((char,i)=>{
              let color="var(--color-pending)";
              let textDecoration="none";

              if(i<typed.length){
                const isPending=!lengthMatch && i>=cursor;
                if(isPending){
                  color="var(--color-pending)";
                }else if(typed[i] === char){
                  color="var(--color-correct)";
                  textDecoration="line-through";
                } else{
                  color="var(--color-mistake)";
              }
            }
              
              return(
                <span key={i} style={{color,textDecoration}}>
                  {char}
                </span>
              );
            })}
          </div>

            {/* CURSOR SHOWING CURRENT PROGRESS */}
            <div style= {{
                          position:"absolute",
                          left:"50%",
                          top:0,
                          bottom:0,
                          width:"2px",
                          backgroundColor:"var(--color-text)"
                        }}
            />
      
      </div>
    );
}