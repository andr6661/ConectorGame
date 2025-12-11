import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import Connector from "./Connector";
import RebusPanel from "./RebusPanel";
import WireDragItem from "./WireDragItem";
import CustomDragLayer from "./Custom"; // Импортируем компонент

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
    const [connections, setConnections] = useState<{ [wireIndex: number]: number }>({});
    const [solved, setSolved] = useState(Array(WIRES.length).fill(false));
    const [openModal, setOpenModal] = useState(false);

    const handleWireConnect = (wireIndex: number, pinIndex: number) => {
        setConnections(prev => ({ ...prev, [wireIndex]: pinIndex }));
    };

    const checkConnections = () => {
        const correct = WIRES.every((w, i) => connections[i] === w.targetPin);
        alert(correct ? "Правильно!" : "Ошибка!");
    };
    const isWireConnected = (wireIndex: number) => {
        return connections.hasOwnProperty(wireIndex);
    };


    return (
        <DndProvider backend={TouchBackend} options={{
            enableMouseEvents: true,
            enableTouchEvents: true,
            enableKeyboardEvents: false // если не нужна поддержка клавиатуры
        }}>
            {/* Добавляем Drag Layer - он будет рендериться поверх всего */}
            <CustomDragLayer />

            <div className="game-wrapper">
                <div className="left-column">
                    <Connector
                        wires={WIRES}
                        connections={connections}
                        onWireConnect={handleWireConnect}
                    />
                </div>

                <div className="middle-column">
                    <div className="wires-list" style={{ display: "flex", flexDirection: "row" }}>
                        {WIRES.map((wire, i) => (
                            <WireDragItem
                                key={i}
                                wireIndex={i}
                                image={wire.image}
                                color={wire.color}
                                isConnected={isWireConnected(i)} // Вот это важно!
                            />
                        ))}
                    </div>

                    <button onClick={checkConnections} className="check-btn" style={{ marginTop: 20 }}>
                        Проверить
                    </button>
                </div>

                <div className="right-column">
                    <RebusPanel
                        solved={solved}
                        onSolve={(i) =>
                            setSolved(prev => {
                                const arr = [...prev];
                                arr[i] = true;
                                return arr;
                            })
                        }
                        modalOpen={openModal}
                        setModalOpen={setOpenModal}
                    />
                </div>
            </div>
        </DndProvider>
    );
}