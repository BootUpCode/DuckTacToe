
import { useState } from 'react';
import duck from './assets/Duck.png';
import empty from './assets/Empty.png';
import x from './assets/X.png';
import o from './assets/O.png';
var xWins = 0;
var oWins = 0;
var turnCount = 0;
var infoText = ["Welcome to DuckTacToe by BootUpCode", "For the rules and more, visit"];

function Square({ value, onSquareClick }) {
    var chooseImage = () => {
        if (value === "Duck") {
            return duck
        } else if (value === "X") {
            return x
        } else if (value === "O") {
            return o
        } else {
            return empty
        }
    }
    return <button
        className="{styles.square}"
        onClick={onSquareClick}
    >
        <img src={chooseImage()}
            width={140}
            height={140}
            alt="square"
        />
    </button>;
}

function Reset({ value, onResetClick }) {
    return <button
        className="{styles.reset}"
        onClick={onResetClick}
    >
        {value}
    </button>;
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [duckIsNext, setDuckIsNext] = useState(false);
    const [squares, setSquares] = useState(Array(16).fill(null));
    const winner = calculateWinner(squares);
    const [gameEnded, setGameEnded] = useState(false);

    let status;
    if (winner) {
        status = "Winner: " + winner;
        if (!gameEnded) {
            if (winner === "X") {
                xWins++;
            } else if (winner === "O") {
                oWins++;
            }
            setGameEnded(true)
        }
    } else if (turnCount > 28) {
        status = "Draw";
        if (!gameEnded) {
            setGameEnded(true);
        }
    } else {
        status = "Player  " + (xIsNext ? "X" : "O") + ": Place " + (duckIsNext ? "the duck" : "your mark");
    }

    function handleClick(i) {
        if ((!duckIsNext && squares[i]) || (duckIsNext && (squares[i] === "X" || squares[i] === "O")) || calculateWinner(squares) || gameEnded) {
            return;
        }

        const nextSquares = squares.slice();

        if (duckIsNext) {
            //remove duck from previous square
            for (let i = 0; i < squares.length; i++) {
                if (squares[i] === "Duck") {
                    nextSquares[i] = null;
                }
            }
            nextSquares[i] = "Duck"
            setDuckIsNext(!duckIsNext);
            setXIsNext(!xIsNext);
        }
        else {
            if (xIsNext) {
                nextSquares[i] = "X";
            } else {
                nextSquares[i] = "O";
            }
            setDuckIsNext(!duckIsNext);
        }
        setSquares(nextSquares);
        turnCount++;
    }

    function resetClick() {
        setXIsNext(true);
        setDuckIsNext(false);
        setSquares(Array(16).fill(null));
        setGameEnded(false);
        turnCount = 0;
    }

    return (
        <>
            <div className="status">
                {status}
            </div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            </div>
            <div className="board-row">
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            </div>
            <div className="board-row">
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
                <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
                <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
            </div>
            <div className="board-row">
                <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
                <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
                <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
                <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
            </div>

            <div className="reset">
                <div className="xscore">{xWins}</div>
                <Reset value="Reset board" onResetClick={() => resetClick()} />
                <div className="yscore">{oWins}</div>
            </div>
            <div className="info">
            </div>
            <div className="info">{infoText[0]}
            </div>
            <div className="info">{infoText[1]}
                <a href="https://github.com/BootUpCode/DuckTacToe" rel="noreferrer">{"https://github.com/BootUpCode/DuckTacToe"}
                </a>
            </div>
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [1, 2, 3],
        [4, 5, 6],
        [5, 6, 7],
        [8, 9, 10],
        [9, 10, 11],
        [12, 13, 14],
        [13, 14, 15],
        [0, 4, 8],
        [4, 8, 12],
        [1, 5, 9],
        [5, 9, 13],
        [2, 6, 10],
        [6, 10, 14],
        [3, 7, 11],
        [7, 11, 15],
        [1, 6, 11],
        [0, 5, 10],
        [5, 10, 15],
        [4, 9, 14],
        [2, 5, 8],
        [3, 6, 9],
        [6, 9, 12],
        [7, 10, 13]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}