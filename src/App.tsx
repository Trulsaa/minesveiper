import React, { useState } from "react";

const App: React.FC = () => {
  const size = 5;
  const board = createBoard(size);

  return <Board initialBoard={board} />;
};

const Board: React.FC<{ initialBoard: number[][] }> = ({ initialBoard }) => {
  const [board, setBoard] = useState(initialBoard);

  const handleCheck = (y: number) => (x: number) => ({
    target: { checked }
  }: {
    target: { checked: boolean };
  }) => {
    let boardWitchChangedCell;
    let newBoard;
    if (checked) {
      boardWitchChangedCell = changeCell(board, x, y, -1);
    } else {
      boardWitchChangedCell = changeCell(board, x, y, 1);
    }
    newBoard = calculateBoard(boardWitchChangedCell);
    setBoard(newBoard);
  };

  return (
    <>
      {board.map((row, i) => (
        <Row key={i} row={row} checkHandler={handleCheck(i)} />
      ))}
    </>
  );
};

const Row: React.FC<{
  row: number[];
  checkHandler: (
    x: number
  ) => (event: { target: { checked: boolean } }) => void;
}> = ({ row, checkHandler }) => {
  return (
    <>
      {row.map((n, i) => (
        <span key={i}>
          <input onChange={checkHandler(i)} type="checkbox" />
          {n}
        </span>
      ))}
      <br />
    </>
  );
};

function createBoard(size: number): number[][] {
  const row = Array.apply(null, Array(size)).map(() => 0);
  const board = Array.apply(null, Array(size)).map(() => row);

  return board;
}

function calculateBoard(board: number[][]): number[][] {
  for (let j = 0; j <= board.length - 1; j++) {
    for (let i = 0; i <= board.length - 1; i++) {
      if (board[j][i] !== -1) {
        board = changeCell(board, i, j, 0);
      }
    }
  }
  for (let j = 0; j <= board.length - 1; j++) {
    for (let i = 0; i <= board.length - 1; i++) {
      if (board[j][i] === -1) {
        board = addAround(board, i, j, 1);
      }
    }
  }
  return board;
}

function addAround(
  board: number[][],
  x: number,
  y: number,
  value: number
): number[][] {
  for (
    let j = Math.max(y - 1, 0);
    j <= Math.min(y + 1, board.length - 1);
    j++
  ) {
    for (
      let i = Math.max(x - 1, 0);
      i <= Math.min(x + 1, board.length - 1);
      i++
    ) {
      if (board[j][i] !== -1) {
        board = changeCell(board, i, j, board[j][i] + value);
      }
    }
  }
  return board;
}

function changeCell(
  board: number[][],
  x: number,
  y: number,
  value: number
): number[][] {
  const newBoard = [...board];
  const newRow = [...board[y]];
  newRow[x] = value;
  newBoard[y] = newRow;
  return newBoard;
}

export default App;
