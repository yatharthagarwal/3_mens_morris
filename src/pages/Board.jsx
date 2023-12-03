import { React, useState } from 'react'

// remove piece highlight

const Board = ({ changeTurn, turn, setWhiteCount, whiteCount, setBlackCount, blackCount, setWin, pausePlayerOne, pausePlayerTwo }) => {
    const [currWhitePosition, setcurrWhitePosition] = useState([])
    const [currBlackPosition, setcurrBlackPosition] = useState([])
    const [isRemoveBlack, setRemoveBlack] = useState(false)
    const [isRemoveWhite, setRemoveWhite] = useState(false)
    const [selectMoveBlack, setMoveBlack] = useState(-1)
    const [selectMoveWhite, setMoveWhite] = useState(-1)
    const [validBlackMoves, setValidBlackMoves] = useState([])
    const [validWhiteMoves, setValidWhiteMoves] = useState([])

    const orchestrator = (event) => {
        const id = event.currentTarget.id

        const position = parseInt(id.split("-")[1])

        if(pausePlayerOne || pausePlayerTwo)
            return

        // check whether game finished
        isGameOver()

        // move piece to desired slot
        if(movePiece(id))
            return

        // remove enemy piece
        if(removePiece(id))
            return

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
            moveSelector(position)
        }
    }

    const getRing = (position) => {
        if(position > 0 && position <= 8)
            return 1

        else if(position > 8 && position <= 16)
            return 2

        else if(position > 16 && position <= 24)
            return 3

        else
            return -1
    }

    const getPrevchip = (position) => {
        if((position-1) % 8 === 0)
            return position+7

        return position-1
    }

    const getNextchip = (position) => {
        if(position % 8 === 0)
            return position-7

        return position+1
    }

    const getUpchip = (position) => {
        if(position < 17)
            return position+8

        return -1
    }

    const getDownchip = (position) => {
        if(position > 8)
            return position-8

        return -1
    }

    const changeCSS = (modify) => {
        modify.forEach(element => {
            document.getElementById(element.id).className = element.property
        });
    }

    const clearChipDecoration = () => {
        for(let i=1; i<=24; i++)
            document.getElementById(`slot-${i}`).className = document.getElementById(`slot-${i}`).className.split(' ')[0]
    }

    const isGameOver = () => {
        if(whiteCount === 0 && currWhitePosition.length < 3)
            setWin(1)

        if(blackCount === 0 && currBlackPosition.length < 3)
            setWin(0)
    }

    // place pieces turn by turn
    const placePiece = (color, id) => {
        const position = parseInt(id.split("-")[1])

        if(color === "white") {
            if(!(currBlackPosition.includes(position)) && !(currWhitePosition.includes(position))) {
                changeCSS([ {id, property: "board-slot-white"} ])
                currWhitePosition.push(position)
                setWhiteCount(whiteCount - 1)

                return true
            }
        }
        else {
            if(!(currWhitePosition.includes(position)) && !(currBlackPosition.includes(position))) {
                changeCSS([ {id, property: "board-slot-black"} ])
                currBlackPosition.push(position)
                setBlackCount(blackCount - 1)

                return true
            }
        }

        return false
    }

    // check if line of 3 is formed
    const check3 = (color, id) => {
        const position = parseInt(id.split("-")[1])
        let ret = false

        let changeList = []

        if(color === "white") {
            if((position&1) === 0) {
                if(currWhitePosition.includes(getNextchip(position)) && currWhitePosition.includes(getNextchip(getNextchip(position)))) {
                    // front
                    changeList.push({id: `line-${position}-${(getNextchip(position))}`, property: "line-green"})
                    changeList.push({id: `line-${getNextchip(position)}-${getNextchip(getNextchip(position))}`, property: "line-green"})
                    setRemoveBlack(true)
                    ret = true
                }
                if(currWhitePosition.includes(getPrevchip(position)) && currWhitePosition.includes(getPrevchip(getPrevchip(position)))) {
                    // back
                    changeList.push({id: `line-${getPrevchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${getPrevchip(getPrevchip(position))}-${getPrevchip(position)}`, property: "line-green"})
                    setRemoveBlack(true)
                    ret = true
                }
            }
            else if(getRing(position) === 2) {
                if(currWhitePosition.includes(getPrevchip(position)) && currWhitePosition.includes(getNextchip(position))) {
                    // left right
                    changeList.push({id: `line-${getPrevchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${position}-${getNextchip(position)}`, property: "line-green"})
                    setRemoveBlack(true)
                    ret = true
                }
                if(currWhitePosition.includes(getDownchip(position)) && currWhitePosition.includes(getUpchip(position))) {
                    // bottom top
                    changeList.push({id: `line-${getDownchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${position}-${getUpchip(position)}`, property: "line-green"})
                    setRemoveBlack(true)
                    ret = true
                }
            }
            else {
                if(getRing(position) === 1) {
                    if(currWhitePosition.includes(getUpchip(position)) && currWhitePosition.includes(getUpchip(getUpchip(position)))) {
                        changeList.push({id: `line-${position}-${getUpchip(position)}`, property: "line-green"})
                        changeList.push({id: `line-${getUpchip(position)}-${getUpchip(getUpchip(position))}`, property: "line-green"})
                        setRemoveBlack(true)
                        ret = true
                    }
                }
                else if(getRing(position) === 3){
                    if(currWhitePosition.includes(getDownchip(position)) && currWhitePosition.includes(getDownchip(getDownchip(position)))) {
                        changeList.push({id: `line-${getDownchip(position)}-${position}`, property: "line-green"})
                        changeList.push({id: `line-${getDownchip(getDownchip(position))}-${getDownchip(position)}`, property: "line-green"})
                        setRemoveBlack(true)
                        ret = true
                    }
                }
                if(currWhitePosition.includes(getPrevchip(position)) && currWhitePosition.includes(getNextchip(position))) {
                    changeList.push({id: `line-${getPrevchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${position}-${getNextchip(position)}`, property: "line-green"})
                    setRemoveBlack(true)
                   ret = true
                }
            }
        }
        else {
            if((position&1) === 0) {
                if(currBlackPosition.includes(getNextchip(position)) && currBlackPosition.includes(getNextchip(getNextchip(position)))) {
                    // front
                    changeList.push({id: `line-${position}-${getNextchip(position)}`, property: "line-green"})
                    changeList.push({id: `line-${getNextchip(position)}-${getNextchip(getNextchip(position))}`, property: "line-green"})
                    setRemoveWhite(true)
                    ret = true
                }
                if(currBlackPosition.includes(getPrevchip(position)) && currBlackPosition.includes(getPrevchip(getPrevchip(position)))) {
                    // back
                    changeList.push({id: `line-${getPrevchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${getPrevchip(getPrevchip(position))}-${getPrevchip(position)}`, property: "line-green"})
                    setRemoveWhite(true)
                    ret = true
                }
            }
            else if(getRing(position) === 2) {
                if(currBlackPosition.includes(getPrevchip(position)) && currBlackPosition.includes(getNextchip(position))) {
                    // left right
                    changeList.push({id: `line-${getPrevchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${position}-${getNextchip(position)}`, property: "line-green"})
                    setRemoveWhite(true)
                    ret = true
                }
                if(currBlackPosition.includes(getDownchip(position)) && currBlackPosition.includes(getUpchip(position))) {
                    // bottom top
                    changeList.push({id: `line-${getDownchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${position}-${getUpchip(position)}`, property: "line-green"})
                    setRemoveWhite(true)
                    ret = true
                }
            }
            else {
                if(getRing(position) === 1) {
                    if(currBlackPosition.includes(getUpchip(position)) && currBlackPosition.includes(getUpchip(getUpchip(position)))) {
                        changeList.push({id: `line-${position}-${getUpchip(position)}`, property: "line-green"})
                        changeList.push({id: `line-${getUpchip(position)}-${getUpchip(getUpchip(position))}`, property: "line-green"})
                        setRemoveWhite(true)
                        ret = true
                    }
                }
                else if(getRing(position) === 3) {
                    if(currBlackPosition.includes(getDownchip(position)) && currBlackPosition.includes(getDownchip(getDownchip(position)))) {
                        changeList.push({id: `line-${getDownchip(position)}-${position}`, property: "line-green"})
                        changeList.push({id: `line-${getDownchip(getDownchip(position))}-${getDownchip(position)}`, property: "line-green"})
                        setRemoveWhite(true)
                        ret = true
                    }
                }
                if(currBlackPosition.includes(getPrevchip(position)) && currBlackPosition.includes(getNextchip(position))) {
                    changeList.push({id: `line-${getPrevchip(position)}-${position}`, property: "line-green"})
                    changeList.push({id: `line-${position}-${getNextchip(position)}`, property: "line-green"})
                    setRemoveWhite(true)
                   ret = true
                }
            }
        }

        changeCSS(changeList)

        return ret
    }

    const moveSelector = (position) => {
        let changeList = []

        if((position&1) === 0) {
            if((turn&1) === 0) {
                if(currWhitePosition.includes(position)) {
                    setValidWhiteMoves([getPrevchip(position), getNextchip(position)])
    
                    clearChipDecoration()

                    if(!currBlackPosition.includes(getPrevchip(position)) && !currWhitePosition.includes(getPrevchip(position))) {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getNextchip(position)) && !currWhitePosition.includes(getNextchip(position))) {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-red-shadow' })
                    }

                    setMoveWhite(position)
                    setMoveBlack(-1)
                }
            }
            else {
                if(currBlackPosition.includes(position)) {
                    setValidBlackMoves([getPrevchip(position), getNextchip(position)])

                    clearChipDecoration()

                    if(!currBlackPosition.includes(getPrevchip(position)) && !currWhitePosition.includes(getPrevchip(position))) {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getNextchip(position)) && !currWhitePosition.includes(getNextchip(position))) {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-red-shadow' })
                    }

                    setMoveWhite(-1)
                    setMoveBlack(position)
                }
            }
        }
        else if(getRing(position) === 2) {
            if((turn&1) === 0) {
                if(currWhitePosition.includes(position)) {
                    setValidWhiteMoves([getPrevchip(position), getNextchip(position), getDownchip(position), getUpchip(position)])

                    clearChipDecoration()

                    if(!currBlackPosition.includes(getPrevchip(position)) && !currWhitePosition.includes(getPrevchip(position))) {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getNextchip(position)) && !currWhitePosition.includes(getNextchip(position))) {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getDownchip(position)) && !currWhitePosition.includes(getDownchip(position))) {
                        changeList.push({ id: `slot-${getDownchip(position)}`, property: document.getElementById(`slot-${getDownchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getDownchip(position)}`, property: document.getElementById(`slot-${getDownchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getUpchip(position)) && !currWhitePosition.includes(getUpchip(position))) {
                        changeList.push({ id: `slot-${getUpchip(position)}`, property: document.getElementById(`slot-${getUpchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getUpchip(position)}`, property: document.getElementById(`slot-${getUpchip(position)}`).className+' board-slot-red-shadow' })
                    }

                    setMoveWhite(position)
                    setMoveBlack(-1)
                }
            }
            else {
                if(currBlackPosition.includes(position)) {
                    setValidBlackMoves([getPrevchip(position), getNextchip(position), getDownchip(position), getUpchip(position)])

                    clearChipDecoration()

                    if(!currBlackPosition.includes(getPrevchip(position)) && !currWhitePosition.includes(getPrevchip(position))) {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getNextchip(position)) && !currWhitePosition.includes(getNextchip(position))) {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getDownchip(position)) && !currWhitePosition.includes(getDownchip(position))) {
                        changeList.push({ id: `slot-${getDownchip(position)}`, property: document.getElementById(`slot-${getDownchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getDownchip(position)}`, property: document.getElementById(`slot-${getDownchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getUpchip(position)) && !currWhitePosition.includes(getUpchip(position))) {
                        changeList.push({ id: `slot-${getUpchip(position)}`, property: document.getElementById(`slot-${getUpchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getUpchip(position)}`, property: document.getElementById(`slot-${getUpchip(position)}`).className+' board-slot-red-shadow' })
                    }

                    setMoveWhite(-1)
                    setMoveBlack(position)
                }
            }
        }
        else {
            if((turn&1) === 0) {
                if(currWhitePosition.includes(position)) {
                    setValidWhiteMoves([(position < 8 ? getUpchip(position) : getDownchip(position)), getNextchip(position), getPrevchip(position)])

                    clearChipDecoration()

                    if(!currBlackPosition.includes(position < 8 ? getUpchip(position) : getDownchip(position)) && !currWhitePosition.includes(position < 8 ? getUpchip(position) : getDownchip(position))) {
                        changeList.push({ id: `slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`, property: document.getElementById(`slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`, property: document.getElementById(`slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getNextchip(position)) && !currWhitePosition.includes(getNextchip(position))) {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getPrevchip(position)) && !currWhitePosition.includes(getPrevchip(position))) {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-red-shadow' })
                    }

                    setMoveWhite(position)
                    setMoveBlack(-1)
                }
            }
            else {
                if(currBlackPosition.includes(position)) {
                    setValidBlackMoves([(position < 8 ? getUpchip(position) : getDownchip(position)), getNextchip(position), getPrevchip(position)])

                    clearChipDecoration()

                    if(!currBlackPosition.includes(position < 8 ? getUpchip(position) : getDownchip(position)) && !currWhitePosition.includes(position < 8 ? getUpchip(position) : getDownchip(position))) {
                        changeList.push({ id: `slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`, property: document.getElementById(`slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`, property: document.getElementById(`slot-${(position < 8 ? getUpchip(position) : getDownchip(position))}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getNextchip(position)) && !currWhitePosition.includes(getNextchip(position))) {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getNextchip(position)}`, property: document.getElementById(`slot-${getNextchip(position)}`).className+' board-slot-red-shadow' })
                    }
                    if(!currBlackPosition.includes(getPrevchip(position)) && !currWhitePosition.includes(getPrevchip(position))) {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-green-shadow' })
                    }
                    else {
                        changeList.push({ id: `slot-${getPrevchip(position)}`, property: document.getElementById(`slot-${getPrevchip(position)}`).className+' board-slot-red-shadow' })
                    }

                    setMoveWhite(-1)
                    setMoveBlack(position)
                }
            }
        }

        changeCSS(changeList)
    }

    const movePiece = (id) => {
        const position = parseInt(id.split('-')[1])
        let changeList = []

        // move piece logic
        if(selectMoveBlack !== -1 && validBlackMoves.includes(position) && document.getElementById(`slot-${position}`).className.split(' ')[0] === "board-slot-default") {
            if(!placePiece("black", id))
                return false

            changeList.push({ id: `slot-${selectMoveBlack}`, property: "board-slot-default" })
            currBlackPosition.splice(currBlackPosition.indexOf(selectMoveBlack), 1)
            setBlackCount(0)

            if((selectMoveBlack&1) === 0) {
                // front
                changeList.push({ id: `line-${selectMoveBlack}-${getNextchip(selectMoveBlack)}`, property: "line-default" })
                changeList.push({ id: `line-${getNextchip(selectMoveBlack)}-${getNextchip(getNextchip(selectMoveBlack))}`, property: "line-default" })

                // back
                changeList.push({ id: `line-${getPrevchip(selectMoveBlack)}-${selectMoveBlack}`, property: "line-default" })
                changeList.push({ id: `line-${getPrevchip(getPrevchip(selectMoveBlack))}-${getPrevchip(selectMoveBlack)}`, property: "line-default" })
            }
            else if(getRing(selectMoveBlack) === 2) {
                // left
                changeList.push({ id: `line-${getPrevchip(selectMoveBlack)}-${selectMoveBlack}`, property: "line-default" })

                // right
                changeList.push({ id: `line-${selectMoveBlack}-${getNextchip(selectMoveBlack)}`, property: "line-default" })
                
                // bottom
                changeList.push({ id: `line-${getDownchip(selectMoveBlack)}-${selectMoveBlack}`, property: "line-default" })
                
                // top
                changeList.push({ id: `line-${selectMoveBlack}-${getUpchip(selectMoveBlack)}`, property: "line-default" })
            }
            else {
                if(getRing(selectMoveBlack) === 1) {
                    // 2 top
                    changeList.push({ id: `line-${selectMoveBlack}-${getUpchip(selectMoveBlack)}`, property: "line-default" })
                    changeList.push({ id: `line-${getUpchip(selectMoveBlack)}-${getUpchip(getUpchip(selectMoveBlack))}`, property: "line-default" })
                }
                else if(getRing(selectMoveBlack) === 3) {
                    // 2 bottom
                    changeList.push({ id: `line-${getDownchip(selectMoveBlack)}-${selectMoveBlack}`, property: "line-default" })
                    changeList.push({ id: `line-${getDownchip(getDownchip(selectMoveBlack))}-${getDownchip(selectMoveBlack)}`, property: "line-default" })
                }

                // left
                changeList.push({ id: `line-${getPrevchip(selectMoveBlack)}-${selectMoveBlack}`, property: "line-default" })
                
                // right
                changeList.push({ id: `line-${selectMoveBlack}-${getNextchip(selectMoveBlack)}`, property: "line-default" })
            }

            changeCSS(changeList)

            if(!check3("black", id))
                changeTurn(turn+1)

            clearChipDecoration()

            setMoveBlack(-1)
            return true
        }
        else if(selectMoveWhite !== -1 && validWhiteMoves.includes(position) && document.getElementById(`slot-${position}`).className.split(' ')[0] === "board-slot-default") {
            if(!placePiece("white", id))
                return false

            changeList.push({ id: `slot-${selectMoveWhite}`, property: "board-slot-default" })
            currWhitePosition.splice(currWhitePosition.indexOf(selectMoveWhite), 1)
            setWhiteCount(0)

            if((selectMoveWhite&1) === 0) {
                // front
                changeList.push({ id: `line-${selectMoveWhite}-${getNextchip(selectMoveWhite)}`, property: "line-default" })
                changeList.push({ id: `line-${getNextchip(selectMoveWhite)}-${getNextchip(getNextchip(selectMoveWhite))}`, property: "line-default" })

                // back
                changeList.push({ id: `line-${getPrevchip(selectMoveWhite)}-${selectMoveWhite}`, property: "line-default" })
                changeList.push({ id: `line-${getPrevchip(getPrevchip(selectMoveWhite))}-${getPrevchip(selectMoveWhite)}`, property: "line-default" })
            }
            else if(getRing(selectMoveWhite) === 2) {
                // left
                changeList.push({ id: `line-${getPrevchip(selectMoveWhite)}-${selectMoveWhite}`, property: "line-default" })

                // right
                changeList.push({ id: `line-${selectMoveWhite}-${getNextchip(selectMoveWhite)}`, property: "line-default" })
                
                // bottom
                changeList.push({ id: `line-${getDownchip(selectMoveWhite)}-${selectMoveWhite}`, property: "line-default" })
                
                // top
                changeList.push({ id: `line-${selectMoveWhite}-${getUpchip(selectMoveWhite)}`, property: "line-default" })
            }
            else {
                if(getRing(selectMoveWhite) === 1) {
                    // 2 top
                    changeList.push({ id: `line-${selectMoveWhite}-${getUpchip(selectMoveWhite)}`, property: "line-default" })
                    changeList.push({ id: `line-${getUpchip(selectMoveWhite)}-${getUpchip(getUpchip(selectMoveWhite))}`, property: "line-default" })
                }
                else if(getRing(selectMoveWhite) === 3) {
                    // 2 bottom
                    changeList.push({ id: `line-${getDownchip(selectMoveWhite)}-${selectMoveWhite}`, property: "line-default" })
                    changeList.push({ id: `line-${getDownchip(getDownchip(selectMoveWhite))}-${getDownchip(selectMoveWhite)}`, property: "line-default" })
                }

                // left
                changeList.push({ id: `line-${getPrevchip(selectMoveWhite)}-${selectMoveWhite}`, property: "line-default" })
                
                // right
                changeList.push({ id: `line-${selectMoveWhite}-${getNextchip(selectMoveWhite)}`, property: "line-default" })
            }

            changeCSS(changeList)

            if(!check3("white", id))
                changeTurn(turn+1)

            clearChipDecoration()

            setMoveWhite(-1)
            return true
        }
    }

    const checkPieces = () => {
        let removablePieces = new Set()
        let millPieces = new Set()

        if(isRemoveBlack) {
            for(let i=1; i<=24; i++) {
                if((i&1) === 1 && currBlackPosition.includes(i) && currBlackPosition.includes(getPrevchip(i)) && currBlackPosition.includes(getNextchip(i))) {
                    millPieces.add(i)
                    millPieces.add(getPrevchip(i))
                    millPieces.add(getNextchip(i))
                }
                if(i === 1 || i === 3 || i === 5 || i === 7) {
                    if(currBlackPosition.includes(i) && currBlackPosition.includes(getUpchip(i)) && currBlackPosition.includes(getUpchip(getUpchip(i)))) {
                        millPieces.add(i)
                        millPieces.add(getUpchip(i))
                        millPieces.add(getUpchip(getUpchip(i)))
                    }
                }
            }

            return [ [...currBlackPosition].filter(x => !millPieces.has(x)), [...millPieces] ]
        }
        else if(isRemoveWhite) {
            for(let i=1; i<=24; i++) {
                if((i&1) === 1 && currWhitePosition.includes(i) && currWhitePosition.includes(getPrevchip(i)) && currWhitePosition.includes(getNextchip(i))) {
                    millPieces.add(i)
                    millPieces.add(getPrevchip(i))
                    millPieces.add(getNextchip(i))
                }
                if(i === 1 || i === 3 || i === 5 || i === 7) {
                    if(currWhitePosition.includes(i) && currWhitePosition.includes(getUpchip(i)) && currWhitePosition.includes(getUpchip(getUpchip(i)))) {
                        millPieces.add(i)
                        millPieces.add(getUpchip(i))
                        millPieces.add(getUpchip(getUpchip(i)))
                    }
                }
            }

            return [ [...currWhitePosition].filter(x => !millPieces.has(x)), [...millPieces] ]
        }

        return [null, null]
    }

    const removePiece = (id) => {
        const position = parseInt(id.split('-')[1])
        let changeList = []

        // check for remove enemy condition and remove piece
        if(isRemoveWhite) {
            let [removablePieces, millPieces] = checkPieces()
    
            if(removablePieces === null && millPieces === null)
                return

            if(removablePieces === null || removablePieces.length === 0)
                removablePieces = millPieces
    
            if(currWhitePosition.includes(position) && removablePieces.includes(position)) {
                changeList.push({ id , property: "board-slot-default" })
                currWhitePosition.splice(currWhitePosition.indexOf(position), 1)

                if((position&1) === 0) {
                    // front
                    changeList.push({ id: `line-${position}-${getNextchip(position)}`, property: "line-default" })
                    changeList.push({ id: `line-${getNextchip(position)}-${getNextchip(getNextchip(position))}`, property: "line-default" })

                    // back
                    changeList.push({ id: `line-${getPrevchip(position)}-${position}`, property: "line-default" })
                    changeList.push({ id: `line-${getPrevchip(getPrevchip(position))}-${getPrevchip(position)}`, property: "line-default" })
                }
                else if(getRing(position) === 2) {
                    // left
                    changeList.push({ id: `line-${getPrevchip(position)}-${position}`, property: "line-default" })
                    
                    // right
                    changeList.push({ id: `line-${position}-${getNextchip(position)}`, property: "line-default" })
                    
                    // bottom
                    changeList.push({ id: `line-${getDownchip(position)}-${position}`, property: "line-default" })

                    // top
                    changeList.push({ id: `line-${position}-${getUpchip(position)}`, property: "line-default" })
                }
                else {
                    if(getRing(position) === 1) {
                        // 2 top
                        changeList.push({ id: `line-${position}-${getUpchip(position)}`, property: "line-default" })
                        changeList.push({ id: `line-${getUpchip(position)}-${getUpchip(getUpchip(position))}`, property: "line-default" })
                    }
                    else if(getRing(position) === 3) {
                        // 2 bottom
                        changeList.push({ id: `line-${getDownchip(position)}-${position}`, property: "line-default" })
                        changeList.push({ id: `line-${getDownchip(getDownchip(position))}-${getDownchip(position)}`, property: "line-default" })
                    }

                    // left
                    changeList.push({ id: `line-${getPrevchip(position)}-${position}`, property: "line-default" })
                    
                    // right
                    changeList.push({ id: `line-${position}-${getNextchip(position)}`, property: "line-default" })
                }

                setRemoveWhite(false)
                changeTurn(turn + 1)
            }

            changeCSS(changeList)

            return true
        }

        if(isRemoveBlack) {
            let [removablePieces, millPieces] = checkPieces()
    
            if(removablePieces === null && millPieces === null)
                return

            if(removablePieces === null || removablePieces.length === 0)
                removablePieces = millPieces
    
            if(currBlackPosition.includes(position) && removablePieces.includes(position)) {
                changeList.push({ id , property: "board-slot-default" })
                currBlackPosition.splice(currBlackPosition.indexOf(position), 1)

                if((position&1) === 0) {
                    // front
                    changeList.push({ id: `line-${position}-${getNextchip(position)}`, property: "line-default" })
                    changeList.push({ id: `line-${getNextchip(position)}-${getNextchip(getNextchip(position))}`, property: "line-default" })

                    // back
                    changeList.push({ id: `line-${getPrevchip(position)}-${position}`, property: "line-default" })
                    changeList.push({ id: `line-${getPrevchip(getPrevchip(position))}-${getPrevchip(position)}`, property: "line-default" })
                }
                else if(getRing(position) === 2) {
                    // left
                    changeList.push({ id: `line-${getPrevchip(position)}-${position}`, property: "line-default" })
                    
                    // right
                    changeList.push({ id: `line-${position}-${getNextchip(position)}`, property: "line-default" })
                    
                    // bottom
                    changeList.push({ id: `line-${getDownchip(position)}-${position}`, property: "line-default" })

                    // top
                    changeList.push({ id: `line-${position}-${getUpchip(position)}`, property: "line-default" })
                }
                else {
                    if(getRing(position) === 1) {
                        // 2 top
                        changeList.push({ id: `line-${position}-${getUpchip(position)}`, property: "line-default" })
                        changeList.push({ id: `line-${getUpchip(position)}-${getUpchip(getUpchip(position))}`, property: "line-default" })
                    }
                    else if(getRing(position) === 3) {
                        // 2 bottom
                        changeList.push({ id: `line-${getDownchip(position)}-${position}`, property: "line-default" })
                        changeList.push({ id: `line-${getDownchip(getDownchip(position))}-${getDownchip(position)}`, property: "line-default" })
                    }

                    // left
                    changeList.push({ id: `line-${getPrevchip(position)}-${position}`, property: "line-default" })
                    
                    // right
                    changeList.push({ id: `line-${position}-${getNextchip(position)}`, property: "line-default" })
                }

                setRemoveBlack(false)
                changeTurn(turn + 1)
            }

            changeCSS(changeList)

            return true
        }

        return false
    }

    return (
        <div className='board-container grid'>
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

                <hr className='line-default' id='line-1-2' />
                <hr className='line-default' id='line-2-3' />
                <hr className='line-default' id='line-3-4' />
                <hr className='line-default' id='line-4-5' />
                <hr className='line-default' id='line-5-6' />
                <hr className='line-default' id='line-6-7' />
                <hr className='line-default' id='line-7-8' />
                <hr className='line-default' id='line-8-1' />

                <hr className='line-default' id='line-1-9' />
                <hr className='line-default' id='line-3-11' />
                <hr className='line-default' id='line-5-13' />
                <hr className='line-default' id='line-7-15' />

                <hr className='line-default' id='line-9-10' />
                <hr className='line-default' id='line-10-11' />
                <hr className='line-default' id='line-11-12' />
                <hr className='line-default' id='line-12-13' />
                <hr className='line-default' id='line-13-14' />
                <hr className='line-default' id='line-14-15' />
                <hr className='line-default' id='line-15-16' />
                <hr className='line-default' id='line-16-9' />

                <hr className='line-default' id='line-9-17' />
                <hr className='line-default' id='line-11-19' />
                <hr className='line-default' id='line-13-21' />
                <hr className='line-default' id='line-15-23' />

                <hr className='line-default' id='line-17-18' />
                <hr className='line-default' id='line-18-19' />
                <hr className='line-default' id='line-19-20' />
                <hr className='line-default' id='line-20-21' />
                <hr className='line-default' id='line-21-22' />
                <hr className='line-default' id='line-22-23' />
                <hr className='line-default' id='line-23-24' />
                <hr className='line-default' id='line-24-17' />
            </div>
        </div>
    )
}

export default Board
