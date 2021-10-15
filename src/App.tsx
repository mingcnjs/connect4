import "./App.css";
import { useState, FC } from "react";

interface BoardProps {
  state: string[][];
  onCellClick: (row: number, col: number) => void;
}

const Board: FC<BoardProps> = ({ state, onCellClick }) => {
  return (
    <div className="Board">
      {state.map((rowState, i) => (
        <div key={i}>
          <Row
            num={i}
            state={rowState}
            onCellClick={(col: number) => onCellClick(i, col)}
          />
        </div>
      ))}
    </div>
  );
};

interface RowProps {
  num: number;
  state: string[];
  onCellClick: (col: number) => void;
}

const Row: FC<RowProps> = ({ num, state, onCellClick }) => {
  return (
    <div className="Row">
      <span>{num}</span>{" "}
      {state.map((character, i) => (
        <span key={i} onClick={() => onCellClick(i)}>
          {character}
        </span>
      ))}
    </div>
  );
};

const initialBoard = [
  ["O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O"],
];

const findRowIndex = (board: string[][], col: number) => {
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][col] === "O") {
      return i;
    }
  }
  return -1;
};

const checkWinConditionRow = (board: string[][], row: number, col: number) => {
  const start = Math.max(0, col - 3);
  const end = Math.min(5, col + 3);

  let count = 0;
  let prevVal = "";

  for (let i = start; i <= end; i++) {
    if (!prevVal || board[row][i] === prevVal) {
      count++;

      if (count >= 4) {
        return true;
      }
    } else {
      count = 1;
    }

    prevVal = board[row][i];
  }

  return count >= 4;
};

const checkWinConditionCol = (board: string[][], row: number, col: number) => {
  const start = Math.max(0, row - 3);
  const end = Math.min(6, row + 3);

  let count = 0;
  let prevVal = "";

  for (let i = start; i <= end; i++) {
    if (!prevVal || board[i][col] === prevVal) {
      count++;

      if (count >= 4) {
        return true;
      }
    } else {
      count = 1;
    }

    prevVal = board[i][col];
  }

  return count >= 4;
};

const checkWinConditionDiagonal1 = (
  board: string[][],
  row: number,
  col: number
) => {
  const offset = Math.min(row, col);
  let i = row - offset;
  let j = col - offset;
  let count = 0;
  let prevVal = "";

  while (board[i] && board[i][j]) {
    if (prevVal !== "O" && (!prevVal || board[i][j] === prevVal)) {
      count++;

      if (count >= 4) {
        return true;
      }
    } else {
      count = 1;
    }

    prevVal = board[i][j];
    i++;
    j++;
  }

  return count >= 4;
};

const checkWinConditionDiagonal2 = (
  board: string[][],
  row: number,
  col: number
) => {
  const offset = Math.min(6 - row, col);
  let i = row + offset;
  let j = col - offset;

  let count = 0;
  let prevVal = "";

  while (board[i] && board[i][j]) {
    if (prevVal !== "O" && (!prevVal || board[i][j] === prevVal)) {
      count++;

      if (count >= 4) {
        return true;
      }
    } else {
      count = 1;
    }

    prevVal = board[i][j];
    i--;
    j++;
  }

  return count >= 4;
};

const checkWinCondition = (board: string[][], row: number, col: number) => {
  return (
    checkWinConditionRow(board, row, col) ||
    checkWinConditionCol(board, row, col) ||
    checkWinConditionDiagonal1(board, row, col) ||
    checkWinConditionDiagonal2(board, row, col)
  );
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");

  const handleCellClick = (row: number, col: number) => {
    const rowIndex = findRowIndex(board, col);
    if (rowIndex >= 0) {
      board[rowIndex][col] = turn;
      setBoard(board.slice());
      setTurn(turn === "X" ? "Y" : "X");

      if (checkWinCondition(board, rowIndex, col)) {
        setTimeout(() => {
          alert(`${turn} wins`);
        }, 100);
      }
    }
  };

  return (
    <div className="app">
      <span>Turn: {turn}</span>
      <Board state={board} onCellClick={handleCellClick} />
    </div>
  );
};

export default App;
