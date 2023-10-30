import { React, useState } from 'react'

const Board = () => {
    const [turn, changeTurn] = useState(0)
    const [whiteCount, decWhiteCount] = useState(9)
    const [blackCount, decBlackCount] = useState(9)
    const [whitePosition, setWhitePosition] = useState([])
    const [blackPosition, setBlackPosition] = useState([])
    const [removeBlack, setRemoveBlack] = useState(false)
    const [removeWhite, setRemoveWhite] = useState(false)

    const orchestrator = (event) => {
        const id = event.currentTarget.id

        const position = parseInt(id.split("-")[1])

        // check for remove enemy condition and remove piece
        if(removeWhite) {
            console.log("white remove")
            if(whitePosition.includes(position)) {
                document.getElementById(id).className = "board-slot-default"
                whitePosition.splice(whitePosition.indexOf(position), 1)
                setRemoveWhite(false)
                changeTurn(turn + 1)
                return
            } else {
                return
            }
        }

        if(removeBlack) {
            console.log("black remove")
            if(blackPosition.includes(position)) {
                document.getElementById(id).className = "board-slot-default"
                blackPosition.splice(blackPosition.indexOf(position), 1)
               setRemoveBlack(false)
               changeTurn(turn + 1)
               return
            } else {
                return
            }
        }

        if((turn&1) === 0 && whiteCount > 0) {
            if(!placePiece("white", id))
                return

            if(!check3("white", id))
                changeTurn(turn + 1)
        }
        else if((turn&1) === 1 && blackCount > 0) {
            if(!placePiece("black", id))
                return
            
            if(!check3("black", id))
                changeTurn(turn + 1)
        }
        else {
            // move chip logic

        }
    }

    // place pieces turn by turn
    const placePiece = (color, elementId) => {
        const position = parseInt(elementId.split("-")[1])

        if(color === "white") {
            if(!(blackPosition.includes(position)) && !(whitePosition.includes(position))) {
                document.getElementById(elementId).className = "board-slot-white"
                // addWhitePosition([...whitePosition, position])
                whitePosition.push(position)
                decWhiteCount(whiteCount - 1)

                return true
            }
            else {
                return false
            }
        }
        else {
            if(!(whitePosition.includes(position)) && !(blackPosition.includes(position))) {
                document.getElementById(elementId).className = "board-slot-black"
                // addBlackPosition(blackPosition => [...blackPosition, position])
                blackPosition.push(position)
                decBlackCount(blackCount - 1)

                return true
            }
            else {
                return false
            }
        }
    }

    // check if line of 3 is formed
    const check3 = (color, elementId) => {
        const position = parseInt(elementId.split("-")[1])
        if(color === "white") {
            if(position === 9 || position === 11 || position === 13 || position === 15) {
                if(whitePosition.includes(position) &&
                    ((whitePosition.includes((position-1) % 8 === 0 ? (position-1)+ 8 : position-1) && whitePosition.includes(position+1))
                    || (whitePosition.includes(position+8) && whitePosition.includes(position-8)))) {
                        setRemoveBlack(true)
                        return true
                }
            }
            else if(position === 1 || position === 3 || position === 5 || position === 7) {
                if(whitePosition.includes(position) &&
                    ((whitePosition.includes(position+1) && whitePosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
                    || (whitePosition.includes(position+8) && whitePosition.includes(position+16)))) {
                        setRemoveBlack(true)
                        return true
                }
            }
            else if(position === 17 || position === 19 || position === 21 || position === 23) {
                if(whitePosition.includes(position) &&
                    ((whitePosition.includes(position+1) && whitePosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
                    || (whitePosition.includes(position-8) && whitePosition.includes(position-16)))) {
                        setRemoveBlack(true)
                        return true
                }
            }
            else {
                if((whitePosition.includes(position) && whitePosition.includes(position+1 > (Math.floor((position+1)/9 + 1) * 8) ? position-7 : position+1) && whitePosition.includes(position+2 > (Math.floor((position+2)/9 + 1) * 8) ? position-6 : position+2))
                    || (whitePosition.includes(position) && whitePosition.includes(position-1) && whitePosition.includes((position-2) % 8 === 0 ? (position-2) + 8 : position-2))) {
                        setRemoveBlack(true)
                        return true
                }
            }
        }
        else {
            if(position === 9 || position === 11 || position === 13 || position === 15) {
                if(blackPosition.includes(position) &&
                    ((blackPosition.includes((position-1) % 8 === 0 ? (position-1)+ 8 : position-1) && blackPosition.includes(position+1))
                    || (blackPosition.includes(position+8) && blackPosition.includes(position-8)))) {
                        setRemoveWhite(true)
                        return true
                }
            }
            else if(position === 1 || position === 3 || position === 5 || position === 7) {
                if(blackPosition.includes(position) &&
                    ((blackPosition.includes(position+1) && blackPosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
                    || (blackPosition.includes(position+8) && blackPosition.includes(position+16)))) {
                        setRemoveWhite(true)
                        return true
                }
            }
            else if(position === 17 || position === 19 || position === 21 || position === 23) {
                if(blackPosition.includes(position) &&
                    ((blackPosition.includes(position+1) && blackPosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
                    || (blackPosition.includes(position-8) && blackPosition.includes(position-16)))) {
                        setRemoveWhite(true)
                        return true
                }
            }
            else {
                if((blackPosition.includes(position) && blackPosition.includes(position+1 > (Math.floor((position+1)/9 + 1) * 8) ? position-7 : position+1) && blackPosition.includes(position+2 > (Math.floor((position+2)/9 + 1) * 8) ? position-6 : position+2))
                    || (blackPosition.includes(position) && blackPosition.includes(position-1) && blackPosition.includes((position-2) % 8 === 0 ? (position-2) + 8 : position-2))) {
                        setRemoveWhite(true)
                        return true
                }
            }
        }

        return false
    }

    return (
        <div className='board-container'>
            <div className='board'>
                <button className='board-slot-default' id='slot-1' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-2' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-3' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-4' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-5' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-6' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-7' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-8' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-9' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-10' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-11' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-12' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-13' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-14' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-15' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-16' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-17' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-18' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-19' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-20' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-21' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-22' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-23' onClick={orchestrator}></button>
                <button className='board-slot-default' id='slot-24' onClick={orchestrator}></button>
                
                <hr className='lines' id='line-1-2' />
                <hr className='lines' id='line-2-3' />
                <hr className='lines' id='line-3-4' />
                <hr className='lines' id='line-4-5' />
                <hr className='lines' id='line-5-6' />
                <hr className='lines' id='line-6-7' />
                <hr className='lines' id='line-7-8' />
                <hr className='lines' id='line-8-1' />

                <hr className='lines' id='line-1-9' />
                <hr className='lines' id='line-3-11' />
                <hr className='lines' id='line-5-13' />
                <hr className='lines' id='line-7-15' />

                <hr className='lines' id='line-9-10' />
                <hr className='lines' id='line-10-11' />
                <hr className='lines' id='line-11-12' />
                <hr className='lines' id='line-12-13' />
                <hr className='lines' id='line-13-14' />
                <hr className='lines' id='line-14-15' />
                <hr className='lines' id='line-15-16' />
                <hr className='lines' id='line-16-9' />

                <hr className='lines' id='line-9-17' />
                <hr className='lines' id='line-11-19' />
                <hr className='lines' id='line-13-21' />
                <hr className='lines' id='line-15-23' />

                <hr className='lines' id='line-17-18' />
                <hr className='lines' id='line-18-19' />
                <hr className='lines' id='line-19-20' />
                <hr className='lines' id='line-20-21' />
                <hr className='lines' id='line-21-22' />
                <hr className='lines' id='line-22-23' />
                <hr className='lines' id='line-23-24' />
                <hr className='lines' id='line-24-17' />
            </div>
        </div>
    )
}

export default Board