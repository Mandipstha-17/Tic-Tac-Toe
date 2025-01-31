import React, { useState } from 'react';
import s1 from "../assets/cross.jpg"; 
import s2 from "../assets/golo.jpg";

let data = ["", "", "", "", "", "", "", "", ""];

const Tictac = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [message, setMessage] = useState("Player X's Turn");

    const toggle = (e, index) => {
        if (lock || data[index]) return;

        const img = document.createElement("img");
        img.src = count % 2 === 0 ? s1 : s2;
        img.classList.add("symbol");

        e.target.innerHTML = "";
        e.target.appendChild(img);

        data[index] = count % 2 === 0 ? "x" : "o";
        setCount(count + 1);

        checkWin();
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setLock(true);
                setMessage(`Player ${data[a].toUpperCase()} Wins!`);
                setTimeout(() => alert(`Player ${data[a].toUpperCase()} Wins! 🎉`), 300);  // Delay alert after win
                return;
            }
        }

        if (!data.includes("")) {
            setLock(true);
            setMessage("It's a Draw!");
            setTimeout(() => alert("It's a Draw! 🤝"), 300);  // Delay alert after draw
            return;
        }

        setMessage(`Player ${count % 2 === 0 ? "O" : "X"}'s Turn`);
    };

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        setMessage("Player X's Turn");
        document.querySelectorAll(".box").forEach(box => box.innerHTML = "");
    };

    return (
        <div className="container">
            <h1 className="Tic">Tic Tac Toe</h1>
            <h2 className="message">{message}</h2>
            <div className="board">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="box" onClick={(e) => toggle(e, index)}></div>
                ))}
            </div>
            <div className="reset-container">
                <button className="reset" onClick={resetGame}>Reset Game</button>
            </div>
        </div>
    );
};

export default Tictac;
