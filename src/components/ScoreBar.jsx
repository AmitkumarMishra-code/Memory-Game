import { useEffect, useState } from "react"
let intervalId
export default function ScoreBar(props) {
    let [time, setTime] = useState(0)
    let [moves, setMoves] = useState(0)
    let [score, setScore] = useState(0)
    let [buttonDisabled, setButtonDisabled] = useState(false)

    useEffect(() => {
        if (!props.firstClick) {
            startTimer()
            setButtonDisabled(true)
        }
    }, [props.firstClick])

    useEffect(() => {
        if (score === 8) {
            props.getFinalScore({ time: time, moves: moves, score: score })
            clearInterval(intervalId)
            props.gameStart(false)
            setButtonDisabled(false)
        }
        // eslint-disable-next-line
    }, [score])

    useEffect(() => { setMoves(props.moves) }, [props.moves])
    useEffect(() => { setScore(props.score) }, [props.score])

    function startTimer() {
        intervalId = setInterval(() => {
            setTime((prev) => prev + 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }
    let restartGame = () => {
        props.reset()
        setScore(0)
        setTime(0)
        clearInterval(intervalId)
        setMoves(0)
        props.gameStart(true)
    }
    return (
        <div className='score-bar'>
            <div className="time"><p>Time :</p><p className = 'dynamic'>{time}s</p></div>
            <div className="moves"><p>Moves:</p><p className = 'dynamic'>{moves}</p></div>
            <div className="score"><p>Score:</p><p className = 'dynamic'>{score}</p></div>
            <button className='restart' onClick={restartGame} disabled={buttonDisabled}>Restart</button>
        </div>
    )
}