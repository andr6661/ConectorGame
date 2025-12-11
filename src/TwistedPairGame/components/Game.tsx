import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import Connector from "./Connector";
import WireDragItem from "./WireDragItem";
import RebusPanel from "./RebusPanel";

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

export default function Game() {
    const [connections, setConnections] = useState<{ [pinIndex: number]: number }>({});
    const [solved, setSolved] = useState(Array(WIRES.length).fill(false));

    const handleWireConnect = (wireIndex: number, pinIndex: number) => {
        setConnections(prev => {
            // Удаляем провод с предыдущего пина, если он был где-то
            const newConnections = Object.fromEntries(
                Object.entries(prev).filter(([p, w]) => w !== wireIndex)
            );
            // Добавляем провод на новый пин
            newConnections[pinIndex] = wireIndex;
            return newConnections;
        });
    };

    const checkConnections = () => {
        const correct = WIRES.every((w, i) => connections[i] === w.targetPin);
        alert(correct ? "Правильно!" : "Ошибка!");
    };

    const handleSolve = (i: number) => {
        setSolved(prev => {
            const arr = [...prev];
            arr[i] = true;
            return arr;
        });
    };

    return (
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
            <div className="game-wrapper">
                <div className="left-column">
                    <Connector
                        wires={WIRES}
                        connections={connections}
                        onWireConnect={handleWireConnect}
                    />
                </div>

                <div className="middle-column">
                    <div className="wires-list">
                        {WIRES.map((wire, i) => {
                            const isUsed = Object.values(connections).includes(i);
                            return (
                                <WireDragItem
                                    key={i}
                                    wireIndex={i}
                                    image={wire.image}
                                    isDisabled={isUsed}
                                />
                            );
                        })}
                    </div>

                    <button className="check-btn" onClick={checkConnections}>
                        Проверить
                    </button>
                </div>

                <div className="right-column">
                    <RebusPanel solved={solved} onSolve={handleSolve} />
                </div>
            </div>
        </DndProvider>
    );
}
