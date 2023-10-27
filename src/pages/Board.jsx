import { React, useState } from 'react'

const Board = () => {
    const [turn, changeTurn] = useState(0)
    const [whiteCount, decWhiteCount] = useState(9)
    const [blackCount, decBlackCount] = useState(9)

    const placePiece = (event) => {
        if((turn & 1) == 0 && whiteCount == 0)
            return

        if((turn & 1) == 1 && blackCount == 0)
            return

        const id = event.currentTarget.id
        
        // send api call to place
        console.log(turn, turn % 2 == 0 ? "white" : "black", id)

        console.log(document.getElementById(id).className)

        if((turn & 1) == 0) {
            if(document.getElementById(id).className != 'board-slot-default')
                return

            document.getElementById(id).className = "board-slot-white"
            decWhiteCount(whiteCount - 1)
        }
        else {
            if(document.getElementById(id).className != 'board-slot-default')
                return

            document.getElementById(id).className = "board-slot-black"
            decBlackCount(blackCount - 1)
        }

        changeTurn(turn + 1)
    }

    return (
        <div className='board-container'>
            <div className='board'>
                <button className='board-slot-default' id='slot-1' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-2' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-3' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-4' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-5' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-6' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-7' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-8' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-9' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-10' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-11' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-12' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-13' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-14' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-15' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-16' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-17' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-18' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-19' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-20' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-21' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-22' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-23' onClick={placePiece}></button>
                <button className='board-slot-default' id='slot-24' onClick={placePiece}></button>
                
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