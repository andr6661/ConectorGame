import React, { useState, useEffect } from "react";
import Connector from "./Connector";
import RebusPanel from "./RebusPanel";
import WireDragItem from "./WireDragItem";

import blue from "../../assets/wires/blue.svg";
import blueWhite from "../../assets/wires/blue-white.svg";
import brown from "../../assets/wires/brown.svg";
import brownWhite from "../../assets/wires/brown-white.svg";
import green from "../../assets/wires/green.svg";
import greenWhite from "../../assets/wires/green-white.svg";
import orange from "../../assets/wires/orange.svg";
import orangeWhite from "../../assets/wires/orange-white.svg";

const WIRES = [
    { image: orangeWhite, color: "orangeWhite", targetPin: 0 },
    { image: orange, color: "orange", targetPin: 1 },
    { image: greenWhite, color: "greenWhite", targetPin: 2 },
    { image: blue, color: "blue", targetPin: 3 },
    { image: blueWhite, color: "blueWhite", targetPin: 4 },
    { image: green, color: "green", targetPin: 5 },
    { image: brownWhite, color: "brownWhite", targetPin: 6 },
    { image: brown, color: "brown", targetPin: 7 },
];

const Game: React.FC = () => {
    const [solved, setSolved] = useState(Array(WIRES.length).fill(false));
    const [modalOpen, setModalOpen] = useState(false);

    // Провода
    const [connections, setConnections] = useState<{ [wireIndex: number]: { x: number; y: number } }>({});
    const [displayOrder, setDisplayOrder] = useState<number[]>([]);
    const [result, setResult] = useState<null | boolean>(null);

    useEffect(() => {
        const order = WIRES.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setDisplayOrder(order);
    }, []);

    const solve = (index: number) => {
        setSolved(prev => {
            const newArr = [...prev];
            newArr[index] = true;
            return newArr;
        });
    };

    const handleDrag = (color: string, pos: { x: number; y: number }, wireIndex: number) => {
        setConnections(prev => ({ ...prev, [wireIndex]: pos }));
    };

    const checkConnections = () => {
        // Здесь можно добавить проверку совпадений с targetPin
        setResult(true);
    };

    const resetWires = () => {
        setConnections({});
        setResult(null);
    };

    return (
        <div className="game-wrapper">
            <div className="game-row">
                {/* Коннектор */}
                <div className="left-column">
                    <Connector wires={WIRES} />
                </div>

                {/* Провода и кнопки */}
                <div className="middle-column">
                    <div className="wires-row">
                        {displayOrder.map(i => (
                            <WireDragItem
                                key={i}
                                image={WIRES[i].image}
                                color={WIRES[i].color}
                                fixedPos={connections[i]}
                                onDrag={(color, pos) => handleDrag(color, pos, i)}
                                isPlaced={!!connections[i]}
                                modalOpen={modalOpen}
                            />
                        ))}
                    </div>

                    <div className="buttons-row">
                        <button onClick={checkConnections} className="check-btn">Проверить проводки</button>
                        <button onClick={resetWires} className="reset-btn">Сбросить провода</button>
                        <button className={`result-btn ${result === null ? "hidden" : result ? "correct" : "wrong"}`} disabled>
                            {result === null ? "" : result ? "Правильно!" : "Неправильно!"}
                        </button>
                    </div>
                </div>

                {/* Ребусы */}
                <div className="right-column">
                    <RebusPanel solved={solved} onSolve={solve} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                </div>
            </div>
        </div>
    );
};

export default Game;
