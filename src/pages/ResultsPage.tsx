import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MistakesLog from "../components/MistakesLog";
import type { ResultsData } from "../hooks/useTypingEngine";

interface ResultsPageProps{
    results:ResultsData | null;
}

export default function ResultsPage({results} : ResultsPageProps){
    const navigate=useNavigate();

    // Navigates to gome page if someone directly enters this page without any results data
    useEffect(()=>{
        if(!results){
            navigate("/");
        }
    },[results,navigate]);

    if(!results){
        return null;
    }

    const {wpm,elapsedSeconds,accuracy,mistakes,mistakeLog,testSearch}=results;

    function handleRestart(){
        navigate(`/test${testSearch}`);
    }

    function handleBackToHome(){
        navigate("/");
    }

    return(
        <div style= {{
                        minHeight:"100vh",
                        backgroundColor:"var(--color-bg)",
                        color:"var(--color-text)"
                    }}
        >
            <div style={{
                            padding:"3rem 1rem 4rem",
                            maxWidth:"400px",
                            margin:"0 auto",
                            textAlign:"center",
                            fontFamily:"monospace",
                        }}
            >

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
                                color:"var(--color-text)"
                            }}
                >
                    <div style={{textAlign:"center",minWidth:"70px"}}>Time : <br/><strong>{Math.floor(elapsedSeconds)}s</strong></div>
                    <div style={{textAlign:"center",minWidth:"70px"}}>Mistakes : <br/><strong>{mistakes}</strong></div>
                    <div style={{textAlign:"center",minWidth:"70px"}}>Accuracy : <br/><strong>{accuracy}</strong></div>
                </div>

                {/* Button container */}
                <div style={{display:"flex",justifyContent:"center",gap:"1rem",marginTop:"1.5rem"}}>
                    
                    {/* Restart button */}
                    <button onClick={handleRestart}
                            style={{
                                        padding:"0.6rem 1.25rem",
                                        borderRadius:"8px",
                                        border:"none",
                                        backgroundColor:"var(--color-button-primary-bg)",
                                        color:"var(--color-button-primary-text)",
                                        fontFamily:"monospace",
                                        fontSize:"1rem",
                                        cursor:"pointer",
                            }}
                    >
                        Restart
                    </button>

                    {/* Back to Home button */}
                    <button onClick={handleBackToHome}
                            style={{
                                        padding:"0.6rem 1.25rem",
                                        borderRadius:"8px",
                                        border:"1px solid var(--color-button-secondary-border)",
                                        backgroundColor:"var(--color-button-secondary-bg)",
                                        color:"var(--color-button-secondary-text)",
                                        fontFamily:"monospace",
                                        fontSize:"1rem",
                                        cursor:"pointer",
                            }}
                    >
                        Back To Home
                    </button>

                </div>

                {/* Mistakes log */}
                <MistakesLog mistakeLog={mistakeLog} elapsedSeconds={elapsedSeconds} />
            </div>
        </div>
    );
}