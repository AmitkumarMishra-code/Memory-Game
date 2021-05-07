import { useState } from "react";
import DisplayArea from "./DisplayArea";
import ScoreBar from "./ScoreBar";

export default function App(props) {
    let [totalMoves, setTotalMoves] = useState(0)
    let [totalScore, setTotalScore] = useState(0)
    let [finalScore, setFinalScore] = useState({time: 0, moves:0, score:0})
    let [gameStart, setGameStart] = useState(false)
    let [firstClick, setFirstClick] = useState(true)


    let updateMoves = (increaseMoves) => {
        console.log(increaseMoves, totalMoves)
        if (increaseMoves) {
            setTotalMoves(totalMoves + 1)
        }
    }

    let updateScore = (score) => {
        setTotalScore(score)
    }

    let getFinalScore = (finalScore) =>{
        setFinalScore({time:finalScore.time, moves:finalScore.moves, score:finalScore.score})
    }

    let reset = () =>{
        setFinalScore({time: 0, moves:0, score:0})
        setTotalScore(0)
        setTotalMoves(0)
        setFirstClick(true)
    }

    return (
        <div className="container">
            <div className="header"><h1>Memory Game</h1></div>
            <ScoreBar moves={totalMoves} score={totalScore} getFinalScore={getFinalScore} gameStart = {setGameStart} reset = {reset} firstClick={firstClick}/>
            <DisplayArea updateMoves={updateMoves} updateScore = {updateScore} finalScore = {finalScore} gameStart = {gameStart} startGame = {setFirstClick} firstClick = {firstClick}/>
        </div>
    )
}