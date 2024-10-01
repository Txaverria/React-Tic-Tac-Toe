import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [clickedSquares, setClickedSquares] = useState([]); // New state for clicked squares

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = "X";
      return updatedBoard;
    });

    // Update the clicked squares
    setClickedSquares((prevClickedSquares) => [
      ...prevClickedSquares,
      { row: rowIndex, col: colIndex },
    ]);
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
              // Check if the current square has been clicked
              const isClicked = clickedSquares.some(
                (square) => square.row === rowIndex && square.col === colIndex
              );

              return (
                <li key={colIndex}>
                  <button
                    onClick={() => handleSelectSquare(rowIndex, colIndex)}
                    className={`board-button ${isClicked ? "shown" : ""}`}
                  >
                    {playerSymbol}
                  </button>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}
