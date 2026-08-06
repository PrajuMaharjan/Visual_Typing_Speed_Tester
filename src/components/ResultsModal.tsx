interface ResultsModalProps{
    wpm:number;
    elapsedSeconds:number;
    accuracy:number;
    mistakes:number;
    onRestart:()=>void;
    onClose:()=>void;
    onBackToHome:()=>void;
}

export default function ResultsModal({wpm,elapsedSeconds,accuracy,mistakes,onRestart,onClose,onBackToHome} : ResultsModalProps){
    return(
        <div style= {{
                        position:"fixed",
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        backgroundColor:"rgba(0,0,0,0.5)",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        zIndex:1000,
                    }}
        >
            <div style={{
                            position:"relative",
                            backgroundColor:"#fff",
                            borderRadius:"12px",
                            padding:"2rem",
                            width:"90%",
                            maxWidth:"400px",
                            textAlign:"center",
                            fontFamily:"monospace",
                            boxShadow:"0 4px 20px rgba(0,0,0,0.2)"
                        }}
            >
                <button onClick={onClose}
                        aria-label="Close"
                        style={{
                                    position:"absolute",
                                    top:"0.75rem",
                                    right:"0.75rem",
                                    background:"none",
                                    border:"none",
                                    fontSize:"1.25rem",
                                    cursor:"pointer",
                                    lineHeight:1,
                                    color:"#555",
                        }}
                >
                    ✕
                </button>

                {/* Main stat : WPM */}
                <div style={{fontSize:"3rem",fontWeight:"bold",margin:"0.5rem 0"}}>
                    {wpm} Words Per Minute
                </div>

                {/* Not Main Stats : Time, Mistakes, Accuracy */}
                <div style={{
                                display:"flex",
                                justifyContent:"center",
                                gap:"1.5rem",
                                margin:"1.5rem 0",
                                fontSize:"1rem",
                                color:"#333"
                            }}
                >
                    <div style={{textAlign:"center",minWidth:"70px"}}>Time : <br/><strong>{Math.floor(elapsedSeconds)}s</strong></div>
                    <div style={{textAlign:"center",minWidth:"70px"}}>Mistakes : <br/><strong>{mistakes}</strong></div>
                    <div style={{textAlign:"center",minWidth:"70px"}}>Accuracy : <br/><strong>{accuracy}</strong></div>
                </div>

                {/* Button container */}
                <div style={{display:"flex",justifyContent:"center",gap:"1rem",marginTop:"1.5rem"}}>
                    
                    {/* Restart button */}
                    <button onClick={onRestart}
                            style={{
                                        padding:"0.6rem 1.25rem",
                                        borderRadius:"8px",
                                        border:"none",
                                        backgroundColor:"#333",
                                        color:"#fff",
                                        fontFamily:"monospace",
                                        fontSize:"1rem",
                                        cursor:"pointer",
                            }}
                    >
                        Restart
                    </button>

                    {/* Back to Home button */}
                    <button onClick={onBackToHome}
                            style={{
                                        padding:"0.6rem 1.25rem",
                                        borderRadius:"8px",
                                        border:"1px solid #ccc",
                                        backgroundColor:"#fff",
                                        color:"#333",
                                        fontFamily:"monospace",
                                        fontSize:"1rem",
                                        cursor:"pointer",
                            }}
                    >
                        Back To Home
                    </button>

                </div>
            </div>
        </div>
    );
}