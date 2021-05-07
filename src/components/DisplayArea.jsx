import { useEffect, useState } from "react"
import GameGrid from "./GameGrid"

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
            {gameOver && <h1>Congratulations! You Won in {props.finalScore.time} seconds! You took {props.finalScore.moves} moves!</h1>}
            {!gameOver && <GameGrid updateMoves={updateMoves} updateScore={updateScore} startGame = {props.startGame} firstClick = {props.firstClick}/>}
        </div>
    )
}