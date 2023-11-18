import Board from "./Board";
import CountdownTimer from "./CountdownTimer/CountdownTimer"

const Arena = () => {
    return (
        <div className="arena">
            <div className="player">
                Player 1
                <CountdownTimer className='timer'
                CountdownTimestampMs={1709999999999}/>
            </div>
            <div className="board-area">
                <Board />
            </div>
            <div className="player">
                Player 2
                <CountdownTimer className='timer'
                CountdownTimestampMs={1709999999999}/>
            </div>
        </div>
    )
}

export default Arena;