import { useState } from 'react'
import Icon from '../Icons'
export default function Cell(props) {
    let [disableClick, setDisableClick] = useState(props.disableClick)
    let [opacity, setOpacity] = useState(props.opacity)
    let [bgColor, setBgColor] = useState(props.backgroundColor)

    let changeDisplay = () => {
        if (disableClick) {
            return
        }
        setOpacity(1)
        props.method(props.value, setCellState, toggleClick)
    }
    function setCellState(paired, clickSequence) {
        if (paired) {
            setOpacity(1)
            setBgColor('rgba(24,138,141,1)')
        }
        else {
            if (clickSequence === 1) {
                setOpacity(0)
            }
        }
    }

    function toggleClick(bool) {
        setDisableClick(bool)
    }

    return (
        <div className="cell" onClick={changeDisplay} >
            <div className="hidden" style={{ opacity: opacity, backgroundColor: bgColor }}>
                <Icon svgNo={props.value + 1} />
            </div>
        </div>
    )
}