import React, { useState, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";

const Board = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [Xisturn, setXisturn] = useState(true);
  const [playerX, setplayerX] = useState("");
  const [playerO, setplayerO] = useState("");
  const [saved, setsaved] = useState(false);
  const [winner, setwinner] = useState(null);
  const [showmodal, setshowmodal] = useState(false);

  const clicksoundRef = useRef(null);
  const drawSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  const handleclick = (index) => {
    if (cells[index] || !saved) return;
    const newcells = [...cells];
    newcells[index] = Xisturn ? "X" : "O";
    setCells(newcells);
    setXisturn(!Xisturn);

    if (clicksoundRef.current) {
      clicksoundRef.current.play();
    }

    const Winner = checkwinner(newcells);
    if (Winner) {
      setwinner(Winner);
      setshowmodal(true);
      if (winSoundRef.current) {
        winSoundRef.current.play();
      }
    } else if (!newcells.includes(null)) {
      setwinner("draw");
      setshowmodal(true);
      if (drawSoundRef.current) {
        drawSoundRef.current.play();
      }
    }
  };
  const checkwinner = (square) => {
    const winningcombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningcombos) {
      const [a, b, c] = combo;
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  };
  const handlesave = () => {
    if (playerX.trim() && playerO.trim()) {
      setsaved(true);
    } else {
      alert("Please enter the names of your choice to start the game");
    }
  };

  const handleEdit = () => {
    setsaved(false);
  };

  const handlereset = () => {
    setCells(Array(9).fill(null));
    setXisturn(true);
    setwinner(null);
    setshowmodal(false);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-amber-950 min-h-screen p-5">
      <h1 className="text-center font-bold text-white text-2xl">TIC-TAC-TOE</h1>
      {!saved ? (
        <div className="flex flex-col py-4">
          <input
            type="text"
            placeholder="Enter name"
            className="rounded-md border-amber-400 mb-4 border-2 text-amber-700 px-2 py-1 bg-white focus:outline-none focus:ring-amber-500"
            value={playerX}
            onChange={(e) => setplayerX(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter name"
            className="rounded-md border-amber-400 border-2 text-amber-700 px-2 py-1 bg-white focus:outline-none focus:ring-amber-500"
            value={playerO}
            onChange={(e) => setplayerO(e.target.value)}
          />
          <div className="justify-center items-center flex mt-5">
            <button
              className="px-2 py-1 hover:scale-105 rounded-md border border-amber-400 bg-amber-600 text-white text-shadow-white cursor-pointer"
              onClick={handlesave}
            >
              Start Game!...
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-2xl text-amber-400">
              Turn :{" "}
              <span>
                {Xisturn ? playerX : playerO} ({Xisturn ? "X" : "O"})
              </span>
            </p>
            <button
              onClick={handleEdit}
              className="text-sm text-white hover:text-amber-500 flex gap-1 cursor-pointer"
            >
              <FaPencilAlt /> Edit player names
            </button>
          </div>
        </>
      )}
      <div className="grid grid-cols-3 gap-4 py-3">
        {cells.map((value, index) => (
          <div
            key={index}
            onClick={() => handleclick(index)}
            className="border-2 hover:border-amber-700 cursor-pointer border-white flex flex-col h-24 w-24 text-2xl justify-center items-center font-bold text-amber-300 transition-all"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          className="bg-amber-700 hover:scale-110 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-amber-800"
          onClick={handlereset}
        >
          Reset
        </button>
      </div>
      {showmodal && (
        <div
          className="flex backdrop-blur-xs justify-center items-center fixed inset-0 z-10"
          data-aos="fade-up"
        >
          <div className="text-center bg-amber-600 text-white rounded-xl md:px-4 md:py-4 h-36 w-60 md:w-[30%] md:h-[30%] flex flex-col justify-center items-center">
            {winner === "draw" ? (
              <h1 className="text-2xl font-bold mb-4">It's a Draw 🤝</h1>
            ) : (
              <h1 className="text-2xl font-bold mb-4">
                {winner === "X" ? playerX : playerO} Wins! 🏆
              </h1>
            )}
            <button
              className="px-3 py-2 hover:scale-105 bg-amber-800 text-white rounded-md hover:bg-amber-800 cursor-pointer"
              onClick={handlereset}
            >
              Play again
            </button>
          </div>
        </div>
      )}
      <audio ref={clicksoundRef}>
        <source
          src="/mixkit-modern-technology-select-3124.wav"
          type="audio/mpeg"
        />
      </audio>
      <audio ref={drawSoundRef}>
        <source src="/mixkit-click-error-1110.wav" type="audio/mpeg" />
      </audio>
      <audio ref={winSoundRef}>
        <source src="/mixkit-achievement-bell-600.wav" type="audio/mpeg" />
      </audio>

      <h1 className="text-white text-[10px] mt-14">Creator: harinigr</h1>
    </div>
  );
};

export default Board;
