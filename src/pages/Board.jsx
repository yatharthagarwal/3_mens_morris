import { React, useState } from 'react'

// remove piece highlight

const Board = () => {
    const [turn, changeTurn] = useState(0)
    const [whiteCount, decWhiteCount] = useState(9)
    const [blackCount, decBlackCount] = useState(9)
    const [whitePosition, setWhitePosition] = useState([])
    const [blackPosition, setBlackPosition] = useState([])
    const [removeBlack, setRemoveBlack] = useState(false)
    const [removeWhite, setRemoveWhite] = useState(false)
    const [moveBlack, setMoveBlack] = useState(-1)
    const [moveWhite, setMoveWhite] = useState(-1)
    const [blackMoves, setBlackMoves] = useState([])
    const [whiteMoves, setWhiteMoves] = useState([])

    const orchestrator = (event) => {
        const id = event.currentTarget.id

        const position = parseInt(id.split("-")[1])

        // move piece logic
        if(moveBlack !== -1 && blackMoves.includes(position)) {
            if(!placePiece("black", id))
                return

            document.getElementById(`slot-${moveBlack}`).className = "board-slot-default"
            blackPosition.splice(blackPosition.indexOf(moveBlack), 1)
            decBlackCount(0)

            if((moveBlack&1) === 0) {
                // front
                document.getElementById(`line-${moveBlack}-${(moveBlack % 8 === 0 ? moveBlack-7 : moveBlack+1)}`).className = "line-default"
                document.getElementById(`line-${(moveBlack % 8 === 0 ? moveBlack-7 : moveBlack+1)}-${(moveBlack % 8 === 0 ? moveBlack-6 : moveBlack+2)}`).className = "line-default"

                // back
                document.getElementById(`line-${(moveBlack-1)}-${moveBlack}`).className = "line-default"
                document.getElementById(`line-${((moveBlack-2) % 8 === 0 ? moveBlack+6 : moveBlack-2)}-${moveBlack-1}`).className = "line-default"
            }
            else if((moveBlack-1) / 8 >= 1 && (moveBlack-1) / 8 < 2) {
                // left
                document.getElementById(`line-${((moveBlack-1) % 8 === 0 ? moveBlack+7 : moveBlack-1)}-${moveBlack}`).className = "line-default"
                
                // right
                document.getElementById(`line-${moveBlack}-${moveBlack+1}`).className = "line-default"
                
                // bottom
                document.getElementById(`line-${moveBlack-8}-${moveBlack}`).className = "line-default"
                
                // top
                document.getElementById(`line-${moveBlack}-${moveBlack+8}`).className = "line-default"
            }
            else {
                if(moveBlack < 8) {
                    // 2 top
                    document.getElementById(`line-${moveBlack}-${moveBlack+8}`).className = "line-default"
                    document.getElementById(`line-${moveBlack+8}-${moveBlack+16}`).className = "line-default"
                }
                else {
                    // 2 bottom
                    document.getElementById(`line-${moveBlack-8}-${moveBlack}`).className = "line-default"
                    document.getElementById(`line-${moveBlack-16}-${moveBlack-8}`).className = "line-default"
                }

                // left
                document.getElementById(`line-${((moveBlack-1) % 8 === 0 ? moveBlack+7 : moveBlack-1)}-${moveBlack}`).className = "line-default"
                
                // right
                document.getElementById(`line-${moveBlack}-${moveBlack+1}`).className = "line-default"
            }

            if(!check3("black", id))
                changeTurn(turn+1)

            setMoveBlack(-1)
            return
        }
        else if(moveWhite !== -1 && whiteMoves.includes(position)) {
            if(!placePiece("white", id))
                return

            document.getElementById(`slot-${moveWhite}`).className = "board-slot-default"
            whitePosition.splice(whitePosition.indexOf(moveWhite), 1)
            decWhiteCount(0)

            if((moveWhite&1) === 0) {
                // front
                document.getElementById(`line-${moveWhite}-${(moveWhite % 8 === 0 ? moveWhite-7 : moveWhite+1)}`).className = "line-default"
                document.getElementById(`line-${(moveWhite % 8 === 0 ? moveWhite-7 : moveWhite+1)}-${(moveWhite % 8 === 0 ? moveWhite-6 : moveWhite+2)}`).className = "line-default"

                // back
                document.getElementById(`line-${(moveWhite-1)}-${moveWhite}`).className = "line-default"
                document.getElementById(`line-${((moveWhite-2) % 8 === 0 ? moveWhite+6 : moveWhite-2)}-${moveWhite-1}`).className = "line-default"
            }
            else if((moveWhite-1) / 8 >= 1 && (moveWhite-1) / 8 < 2) {
                // left
                document.getElementById(`line-${((moveWhite-1) % 8 === 0 ? moveWhite+7 : moveWhite-1)}-${moveWhite}`).className = "line-default"
                
                // right
                document.getElementById(`line-${moveWhite}-${moveWhite+1}`).className = "line-default"
                
                // bottom
                document.getElementById(`line-${moveWhite-8}-${moveWhite}`).className = "line-default"
                
                // top
                document.getElementById(`line-${moveWhite}-${moveWhite+8}`).className = "line-default"
            }
            else {
                if(moveWhite < 8) {
                    // 2 top
                    document.getElementById(`line-${moveWhite}-${moveWhite+8}`).className = "line-default"
                    document.getElementById(`line-${moveWhite+8}-${moveWhite+16}`).className = "line-default"
                }
                else {
                    // 2 bottom
                    document.getElementById(`line-${moveWhite-8}-${moveWhite}`).className = "line-default"
                    document.getElementById(`line-${moveWhite-16}-${moveWhite-8}`).className = "line-default"
                }

                // left
                document.getElementById(`line-${((moveWhite-1) % 8 === 0 ? moveWhite+7 : moveWhite-1)}-${moveWhite}`).className = "line-default"
                
                // right
                document.getElementById(`line-${moveWhite}-${moveWhite+1}`).className = "line-default"
            }

            if(!check3("white", id))
                changeTurn(turn+1)

            setMoveWhite(-1)
            return
        }

        // check for remove enemy condition and remove piece
        if(removeWhite) {
            console.log("white remove")
            if(whitePosition.includes(position)) {
                document.getElementById(id).className = "board-slot-default"
                whitePosition.splice(whitePosition.indexOf(position), 1)

                if((position&1) === 0) {
                    // front
                    document.getElementById(`line-${position}-${(position % 8 === 0 ? position-7 : position+1)}`).className = "line-default"
                    document.getElementById(`line-${(position % 8 === 0 ? position-7 : position+1)}-${(position % 8 === 0 ? position-6 : position+2)}`).className = "line-default"
    
                    // back
                    document.getElementById(`line-${(position-1)}-${position}`).className = "line-default"
                    document.getElementById(`line-${((position-2) % 8 === 0 ? position+6 : position-2)}-${position-1}`).className = "line-default"
                }
                else if((position-1) / 8 >= 1 && (position-1) / 8 < 2) {
                    // left
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-default"
                    
                    // right
                    document.getElementById(`line-${position}-${position+1}`).className = "line-default"
                    
                    // bottom
                    document.getElementById(`line-${position-8}-${position}`).className = "line-default"
                    
                    // top
                    document.getElementById(`line-${position}-${position+8}`).className = "line-default"
                }
                else {
                    if(position < 8) {
                        // 2 top
                        document.getElementById(`line-${position}-${position+8}`).className = "line-default"
                        document.getElementById(`line-${position+8}-${position+16}`).className = "line-default"
                    }
                    else {
                        // 2 bottom
                        document.getElementById(`line-${position-8}-${position}`).className = "line-default"
                        document.getElementById(`line-${position-16}-${position-8}`).className = "line-default"
                    }
    
                    // left
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-default"
                    
                    // right
                    document.getElementById(`line-${position}-${position+1}`).className = "line-default"
                }

                setRemoveWhite(false)
                changeTurn(turn + 1)
            }
            return
        }

        if(removeBlack) {
            console.log("black remove", position)
            if(blackPosition.includes(position)) {
                document.getElementById(id).className = "board-slot-default"
                blackPosition.splice(blackPosition.indexOf(position), 1)

                if((position&1) === 0) {
                    // front
                    document.getElementById(`line-${position}-${(position % 8 === 0 ? position-7 : position+1)}`).className = "line-default"
                    document.getElementById(`line-${(position % 8 === 0 ? position-7 : position+1)}-${(position % 8 === 0 ? position-6 : position+2)}`).className = "line-default"
    
                    // back
                    document.getElementById(`line-${(position-1)}-${position}`).className = "line-default"
                    document.getElementById(`line-${((position-2) % 8 === 0 ? position+6 : position-2)}-${position-1}`).className = "line-default"
                }
                else if((position-1)/8 >= 1 && (position-1)/8 < 2) {
                    console.log("hi")
                    // left
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-default"
                    
                    // right
                    document.getElementById(`line-${position}-${position+1}`).className = "line-default"
                    
                    // // bottom
                    document.getElementById(`line-${position-8}-${position}`).className = "line-default"
                    
                    // // top
                    document.getElementById(`line-${position}-${position+8}`).className = "line-default"
                }
                else {
                    if(position < 8) {
                        // 2 top
                        console.log("wow")
                        document.getElementById(`line-${position}-${position+8}`).className = "line-default"
                        document.getElementById(`line-${position+8}-${position+16}`).className = "line-default"
                    }
                    else {
                        // 2 bottom
                        document.getElementById(`line-${position-8}-${position}`).className = "line-default"
                        document.getElementById(`line-${position-16}-${position-8}`).className = "line-default"
                    }
    
                    // left
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-default"
                    
                    // right
                    document.getElementById(`line-${position}-${position+1}`).className = "line-default"
                }

               setRemoveBlack(false)
               changeTurn(turn + 1)
            }
            return
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
            if((position&1) === 0) {
                if((turn&1) === 0) {
                    if(whitePosition.includes(position)) {
                        setWhiteMoves([((position-1) % 8 === 0 ? position+7 : position-1), (position % 8 === 0 ? position-7 : position+1)])
                        setMoveWhite(position)
                        setMoveBlack(-1)
                    }
                }
                else {
                    if(blackPosition.includes(position)) {
                        setBlackMoves([((position-1) % 8 === 0 ? position+7 : position-1), (position % 8 === 0 ? position-7 : position+1)])
                        setMoveWhite(-1)
                        setMoveBlack(position)
                    }
                }
            }
            else if((position-1) / 8 >= 1 && (position-1) / 8 < 2) {
                if((turn&1) === 0) {
                    if(whitePosition.includes(position)) {
                        setWhiteMoves([((position-1) % 8 === 0 ? position+7 : position-1), position+1, position-8, position+8])
                        setMoveWhite(position)
                        setMoveBlack(-1)
                    }
                }
                else {
                    if(blackPosition.includes(position)) {
                        setBlackMoves([((position-1) % 8 === 0 ? position+7 : position-1), position+1, position-8, position+8])
                        setMoveWhite(-1)
                        setMoveBlack(position)
                    }
                }
            }
            else {
                if((turn&1) === 0) {
                    if(whitePosition.includes(position)) {
                        setWhiteMoves([(position < 8 ? position+8 : position-8), position+1, position-1])
                        setMoveWhite(position)
                        setMoveBlack(-1)
                    }
                }
                else {
                    if(blackPosition.includes(position)) {
                        setBlackMoves([(position < 8 ? position+8 : position-8), position+1, position-1])
                        setMoveWhite(-1)
                        setMoveBlack(position)
                    }
                }
            }
        }
        console.log("white", whitePosition, whiteCount, whiteMoves)
        console.log("black", blackPosition, blackCount, blackMoves)
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
        // if(color === "white") {
        //     if(position === 9 || position === 11 || position === 13 || position === 15) {
        //         // if(whitePosition.includes(position) &&
        //         //     ((whitePosition.includes((position-1) % 8 === 0 ? (position-1)+ 8 : position-1) && whitePosition.includes(position+1))
        //         //     || (whitePosition.includes(position+8) && whitePosition.includes(position-8)))) {
        //         //         setRemoveBlack(true)
        //         //         return true
        //         // }
        //         if(whitePosition.includes((position-1) % 8 === 0 ? (position-1)+ 8 : position-1) && whitePosition.includes(position+1)) {
        //             document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
        //             document.getElementById(`line-${position}-${position+1}`).className = "line-green"
        //             setRemoveBlack(true)
        //             return true
        //         }
        //         else if(whitePosition.includes(position+8) && whitePosition.includes(position-8)) {
        //             document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
        //             document.getElementById(`line-${position}-${position+1}`).className = "line-green"
        //             setRemoveBlack(true)
        //             return true
        //         }
        //     }
        //     else if(position === 1 || position === 3 || position === 5 || position === 7) {
        //         // if(whitePosition.includes(position) &&
        //         //     ((whitePosition.includes(position+1) && whitePosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
        //         //     || (whitePosition.includes(position+8) && whitePosition.includes(position+16)))) {
        //         //         setRemoveBlack(true)
        //         //         return true
        //         // }
        //         if(whitePosition.includes(position+1) && whitePosition.includes((position-1) % 8 === 0 ? position+7 : position-1)) {
        //             document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
        //             document.getElementById(`line-${position}-${position+1}`).className = "line-green"
        //             setRemoveBlack(true)
        //             return true
        //         }
        //         else if(whitePosition.includes(position+8) && whitePosition.includes(position+16)) {
        //             document.getElementById(`line-${position}-${position+8}`).className = "line-green"
        //             document.getElementById(`line-${position+8}-${position+16}`).className = "line-green"
        //             setRemoveBlack(true)
        //             return true
        //         }
        //     }
        //     else if(position === 17 || position === 19 || position === 21 || position === 23) {
        //         if(whitePosition.includes(position) &&
        //             ((whitePosition.includes(position+1) && whitePosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
        //             || (whitePosition.includes(position-8) && whitePosition.includes(position-16)))) {
        //                 setRemoveBlack(true)
        //                 return true
        //         }
        //     }
        //     else {
        //         if((whitePosition.includes(position) && whitePosition.includes(position+1 > (Math.floor((position+1)/9 + 1) * 8) ? position-7 : position+1) && whitePosition.includes(position+2 > (Math.floor((position+2)/9 + 1) * 8) ? position-6 : position+2))
        //             || (whitePosition.includes(position) && whitePosition.includes(position-1) && whitePosition.includes((position-2) % 8 === 0 ? (position-2) + 8 : position-2))) {
        //                 setRemoveBlack(true)
        //                 return true
        //         }
        //     }
        // }
        // else {
        //     if(position === 9 || position === 11 || position === 13 || position === 15) {
        //         if(blackPosition.includes(position) &&
        //             ((blackPosition.includes((position-1) % 8 === 0 ? (position-1)+ 8 : position-1) && blackPosition.includes(position+1))
        //             || (blackPosition.includes(position+8) && blackPosition.includes(position-8)))) {
        //                 setRemoveWhite(true)
        //                 return true
        //         }
        //     }
        //     else if(position === 1 || position === 3 || position === 5 || position === 7) {
        //         if(blackPosition.includes(position) &&
        //             ((blackPosition.includes(position+1) && blackPosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
        //             || (blackPosition.includes(position+8) && blackPosition.includes(position+16)))) {
        //                 setRemoveWhite(true)
        //                 return true
        //         }
        //     }
        //     else if(position === 17 || position === 19 || position === 21 || position === 23) {
        //         if(blackPosition.includes(position) &&
        //             ((blackPosition.includes(position+1) && blackPosition.includes((position-1) % 8 === 0 ? position+7 : position-1))
        //             || (blackPosition.includes(position-8) && blackPosition.includes(position-16)))) {
        //                 setRemoveWhite(true)
        //                 return true
        //         }
        //     }
        //     else {
        //         if((blackPosition.includes(position) && blackPosition.includes(position+1 > (Math.floor((position+1)/9 + 1) * 8) ? position-7 : position+1) && blackPosition.includes(position+2 > (Math.floor((position+2)/9 + 1) * 8) ? position-6 : position+2))
        //             || (blackPosition.includes(position) && blackPosition.includes(position-1) && blackPosition.includes((position-2) % 8 === 0 ? (position-2) + 8 : position-2))) {
        //                 setRemoveWhite(true)
        //                 return true
        //         }
        //     }
        // }
        let ret = false
        if(color === "white") {
            if((position&1) === 0) {
                if(whitePosition.includes(position % 8 === 0 ? position-7 : position+1) && whitePosition.includes((position % 8 === 0 ? position-6 : position+2))) {
                    // front
                    document.getElementById(`line-${position}-${(position % 8 === 0 ? position-7 : position+1)}`).className = "line-green"
                    document.getElementById(`line-${(position % 8 === 0 ? position-7 : position+1)}-${(position % 8 === 0 ? position-6 : position+2)}`).className = "line-green"
                    setRemoveBlack(true)
                    ret = true
                }
                if(whitePosition.includes((position-2) % 8 === 0 ? position+6 : position-2) && whitePosition.includes(position-1)) {
                    // back
                    document.getElementById(`line-${position-1}-${position}`).className = "line-green"
                    document.getElementById(`line-${((position-2) % 8 === 0 ? position+6 : position-2)}-${position-1}`).className = "line-green"
                    setRemoveBlack(true)
                    ret = true
                }
            }
            else if((position-1) / 8 >= 1 && (position-1) / 8 < 2) {
                ret = false
                if(whitePosition.includes(position-1) && whitePosition.includes(position+1)) {
                    // left right
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
                    document.getElementById(`line-${position}-${position+1}`).className = "line-green"
                    setRemoveBlack(true)
                    ret = true
                }
                if(whitePosition.includes(position-8) && whitePosition.includes(position+8)) {
                    // bottom top
                    document.getElementById(`line-${position-8}-${position}`).className = "line-green"
                    document.getElementById(`line-${position}-${position+8}`).className = "line-green"
                    setRemoveBlack(true)
                    ret = true
                }
            }
            else {
                if(position < 8) {
                    if(whitePosition.includes(position+8) && whitePosition.includes(position+16)) {
                        document.getElementById(`line-${position}-${position+8}`).className = "line-green"
                        document.getElementById(`line-${position+8}-${position+16}`).className = "line-green"
                        setRemoveBlack(true)
                        ret = true
                    }
                }
                else {
                    if(whitePosition.includes(position-8) && whitePosition.includes(position-16)) {
                        document.getElementById(`line-${position-8}-${position}`).className = "line-green"
                        document.getElementById(`line-${position-16}-${position-8}`).className = "line-green"
                        setRemoveBlack(true)
                        ret = true
                    }
                }
                if(whitePosition.includes((position-1) % 8 === 0 ? position+7 : position-1) && whitePosition.includes(position+1)) {
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
                    document.getElementById(`line-${position}-${position+1}`).className = "line-green"
                    setRemoveBlack(true)
                   ret = true
                }
            }
        }
        else {
            if((position&1) === 0) {
                if(blackPosition.includes(position % 8 === 0 ? position-7 : position+1) && blackPosition.includes((position % 8 === 0 ? position-6 : position+2))) {
                    // front
                    document.getElementById(`line-${position}-${(position % 8 === 0 ? position-7 : position+1)}`).className = "line-green"
                    document.getElementById(`line-${(position % 8 === 0 ? position-7 : position+1)}-${(position % 8 === 0 ? position-6 : position+2)}`).className = "line-green"
                    setRemoveWhite(true)
                    ret = true
                }
                if(blackPosition.includes((position-2) % 8 === 0 ? position+6 : position-2) && blackPosition.includes(position-1)) {
                    // back
                    document.getElementById(`line-${position-1}-${position}`).className = "line-green"
                    document.getElementById(`line-${((position-2) % 8 === 0 ? position+6 : position-2)}-${position-1}`).className = "line-green"
                    setRemoveWhite(true)
                    ret = true
                }
            }
            else if((position-1) / 8 >= 1 && (position-1) / 8 < 2) {
                if(blackPosition.includes(position-1) && blackPosition.includes(position+1)) {
                    // left right
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
                    document.getElementById(`line-${position}-${position+1}`).className = "line-green"
                    setRemoveWhite(true)
                    ret = true
                }
                if(blackPosition.includes(position-8) && blackPosition.includes(position+8)) {
                    // bottom top
                    document.getElementById(`line-${position-8}-${position}`).className = "line-green"
                    document.getElementById(`line-${position}-${position+8}`).className = "line-green"
                    setRemoveWhite(true)
                    ret = true
                }
            }
            else {
                if(position < 8) {
                    if(blackPosition.includes(position+8) && blackPosition.includes(position+16)) {
                        document.getElementById(`line-${position}-${position+8}`).className = "line-green"
                        document.getElementById(`line-${position+8}-${position+16}`).className = "line-green"
                        setRemoveWhite(true)
                        ret = true
                    }
                }
                else {
                    if(blackPosition.includes(position-8) && blackPosition.includes(position-16)) {
                        document.getElementById(`line-${position-8}-${position}`).className = "line-green"
                        document.getElementById(`line-${position-16}-${position-8}`).className = "line-green"
                        setRemoveWhite(true)
                        ret = true
                    }
                }
                if(blackPosition.includes((position-1) % 8 === 0 ? position+7 : position-1) && blackPosition.includes(position+1)) {
                    document.getElementById(`line-${((position-1) % 8 === 0 ? position+7 : position-1)}-${position}`).className = "line-green"
                    document.getElementById(`line-${position}-${position+1}`).className = "line-green"
                    setRemoveWhite(true)
                   ret = true
                }
            }
        }

        return ret
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