import React from 'react'
import classes from './App.module.css'
import Board from './components/Board'

const initialTileData = () => Array(9).fill(0)

const lineGroups = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const getWinner = (squares) => {

    for(let i = 0; i < lineGroups.length; i++) {
        const [a, b, c] = lineGroups[i]
        if(squares[a] > 0 && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

const checkTiles = (squares) => {
    return squares.some(item => item === 0)
}

const getBlankTiles = (squares) => {
    return squares.map((item, index) => {
        return {
            value: item,
            index
        }
    }).filter((item) => item.value === 0).map(item => item.index)
}

const shuffleTiles = (array) => {

    let currentIndex = array.length, randomIndex

    while(currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]

    }

    return array

}

const setPlayerName = (t) => {
    return t > 0 ? <span className={classes.text}>{`Player ${t}`}</span> : 
    <span className={classes.textBlink}>Press Start</span>
}

function App() {

    const [gameStart, setGameStart] = React.useState(0)
    const [gameWinner, setGameWinner] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(0)
    const [turn, setTurn] = React.useState(0)
    const [tiles, setTiles] = React.useState(initialTileData)

    React.useEffect(() => {

        const winner = getWinner(tiles)

        if(!winner) {
            if(!checkTiles(tiles)) {
                setTimeout(setGameOver, 300, 1)
            } else {
                if(turn === 2) {
                    const moves = shuffleTiles(getBlankTiles(tiles))
                    if(moves.length > 0) {
                        let sindex = moves[0]
                        setTimeout(handleTileClick, 500, sindex)
                    }
                }
            }
        } else {
            setTimeout(setGameWinner, 300, winner)
        }

    }, [tiles])

    const handleStart = () => {
        setTiles(initialTileData)
        setTurn(1)
        setGameOver(0)
        setGameWinner(0)
        setGameStart(1)
    }

    const handleClick = (tindex) => {

        if(turn === 2) {
            return
        }

        handleTileClick(tindex)
    }

    const handleTileClick = (tindex) => {

        let _tiles = tiles.slice(0).map((item, index) => {
            return index === tindex ? turn : item
        })

        setTiles(_tiles)

        setTurn(t => t === 1 ? 2 : 1)

    }

    const displayPlayer = setPlayerName(turn)

    return (
        <div className={classes.container}>
            <div className={classes.board}>
                <Board turn={turn} tiles={tiles} onClick={handleClick} />
            </div>
            <div className={classes.turn}>
            { displayPlayer }
            </div>
            <div className={classes.header}>
                <h1 className={classes.title}>TicTacThree</h1>
            </div>
            {
                gameStart === 0 &&
                <div className={classes.overlay}>
                    <button onClick={handleStart} className={classes.start}>Start</button>
                </div>
            }
            {
                gameOver > 0 &&
                <div className={classes.overlay}>
                    <div className={classes.inner}>
                        <h4 className={classes.subtitle}>Draw</h4>
                        <div className={classes.action}>
                            <button onClick={handleStart} className={classes.again}>Play Again</button>
                        </div>
                    </div>
                </div>
            }
            {
                gameWinner > 0 &&
                <div className={classes.overlay}>
                    <div className={classes.inner}>
                        <h4 className={classes.subtitle}>{`Player ${gameWinner} Wins!`}</h4>
                        <div className={classes.action}>
                            <button onClick={handleStart} className={classes.again}>Play Again</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default App