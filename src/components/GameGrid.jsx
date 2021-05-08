import { useEffect, useState } from "react"
import Cell from "./Cell";
let score = 0

export default function GameGrid(props) {
    let [gridArray, setGridArray] = useState([])
    let [selected, setSelected] = useState([])
    let [pointerEvents, setPointerEvents] = useState('auto')

    function getRandomArray() {
        let newArray = []
        while (true) {
            if (newArray.length === 16) {
                break;
            }
            let randomNumber = getRandomNumber(16)
            if (!newArray.includes(randomNumber)) {
                newArray.push(randomNumber)
            }
        }
        newArray = newArray.map(value => value > 7 ? value - 8 : value)
        // console.log(newArray)
        return newArray
    }
    useEffect(() => {
        setGridArray(getRandomArray())
        score = 0
        // eslint-disable-next-line
    }, [])


    let clickHandler = (selectedCell, setState, disableClick) => {
        if (props.firstClick) {
            props.startGame(false)
        }
        if (!selected.length) {
            setState(false, 0)
            disableClick(true)
            setSelected([[selectedCell, setState, disableClick]])
            props.updateMoves(false)
        }
        else {
            setPointerEvents('none')
            props.updateMoves(true)
            setTimeout(() => {
                validateClick(selectedCell, setState, disableClick)
            }, 700);
        }
    }

    function validateClick(selectedCell, setState, disableClick) {

        if (selectedCell === selected[0][0]) {
            // console.log('paired')
            setState(true, 1)
            selected[0][1](true, 1)
            disableClick(true)
            selected[0][2](true)
            setSelected([])
            score++;
            props.updateScore(score)
        }
        else {
            setState(false, 1)
            selected[0][1](false, 1)
            disableClick(false)
            selected[0][2](false)
            setSelected([])
        }
        setPointerEvents('auto')
    }

    function getRandomNumber(range) {
        return Math.floor(Math.random() * range)
    }
    return (
        <div className="grid" style={{ pointerEvents: pointerEvents }}>
            {gridArray.map((cell, idx) => <Cell key={idx} value={cell} method={clickHandler} disableClick={false} opacity={0} backgroundColor={'rgba(96, 221, 142, 1)'} />)}
        </div>
    )
}