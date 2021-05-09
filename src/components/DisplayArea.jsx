import { useEffect, useState } from "react"
import Confetti from 'react-dom-confetti'
import GameGrid from "./GameGrid"

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "20px",
    height: "20px",
    perspective: "300px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

export default function DisplayArea(props) {
    let [gameOver, setGameOver] = useState(false)
    let updateMoves = (moves) => {
        props.updateMoves(moves)
    }
    let updateScore = (score) => {
        props.updateScore(score)
    }
    useEffect(() => {
        if (props.finalScore.score === 8) {
            setGameOver(true)
        }
    }, [props.finalScore.score])

    useEffect(() => {
        if(props.gameStart){
            setGameOver(false)
        }
    }, [props.gameStart])
    return (
        <div className="display-area">
            {gameOver && <h1 className='win-message'>Congratulations! You Won in {props.finalScore.time} seconds! You took {props.finalScore.moves} moves!</h1>}
            {!gameOver && <GameGrid updateMoves={updateMoves} updateScore={updateScore} startGame = {props.startGame} firstClick = {props.firstClick}/>}
            <Confetti active = {gameOver} config = {config}/>
        </div>
    )
}