/* eslint-disable react/prop-types */
import { useState } from "react";
import cn from "./lib/lib";

const App = () => {
  return (
    <div className="bg-black">
      <Board />
    </div>
  );
};

const Square = ({ value, onSquareClick, className }) => {
  return (
    <button onClick={onSquareClick} className={className}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;

  // const getSquareClassName = (index) => {
  //   return cn(
  //     "w-16 h-16 border border-gray-400 text-white text-3xl font-bold",
  //     winningLine?.includes(index) && "bg-green-200 text-green-800"
  //   );
  // };
  const getSquareClassName = (index) => {
    return cn(
      "w-16 h-16 border border-gray-400 text-white text-3xl font-bold",
      index === 0 && "rounded-tl-lg",
      index === 2 && "rounded-tr-lg",
      index === 6 && "rounded-bl-lg",
      index === 8 && "rounded-br-lg",
      winningLine?.includes(index) && "bg-green-200 text-green-800"
    );
  };

  const status = winner ? (
    <div className="text-3xl text-white font-bold mb-4">
      🎉 Winner: {winner} 🎉
    </div>
  ) : (
    <div className="text-xl text-white mb-4">
      Next player: {xIsNext ? "X" : "O"}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-2xl font-bold">{status}</div>
      <div className="flex flex-wrap w-48">
        {squares.map((square, index) => {
          return (
            <Square
              key={index}
              value={square}
              onSquareClick={() => {
                handleClick(index);
              }}
              className={getSquareClassName(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

export default App;
