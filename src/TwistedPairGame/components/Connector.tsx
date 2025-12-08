import React, { useRef, useState, useEffect } from "react";
import WireDragItem from "./WireDragItem";
import "./game.scss";

interface ConnectorProps {
    wires: { image: string; color: string; targetPin: number }[];
    solved: boolean[];
    modalOpen: boolean;
}

export default function Connector({ wires, solved, modalOpen }: ConnectorProps) {
    const pinsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [connections, setConnections] = useState<{ [wireIndex: number]: number }>({});
    const [wirePositions, setWirePositions] = useState<{ [wireIndex: number]: { x: number; y: number } }>({});
    const [displayOrder, setDisplayOrder] = useState<number[]>([]);
    const [result, setResult] = useState<null | boolean>(null);

    useEffect(() => {
        const order = wires.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setDisplayOrder(order);
    }, [wires]);

    const handleDrag = (color: string, pos: { x: number; y: number }, wireIndex: number) => {
        let closestPinIndex = -1;
        let minDist = Infinity;

        pinsRef.current.forEach((pin, index) => {
            if (!pin) return;
            const rect = pin.getBoundingClientRect();
            const pinX = rect.left + rect.width / 2;
            const pinY = rect.top + rect.height / 2;
            const dist = Math.hypot(pos.x - pinX, pos.y - pinY);

            if (dist < 30 && dist < minDist) {
                minDist = dist;
                closestPinIndex = index;
            }
        });

        if (closestPinIndex === -1) return;
        if (Object.values(connections).includes(closestPinIndex)) return;

        const rect = pinsRef.current[closestPinIndex]!.getBoundingClientRect();
        const pinX = rect.left + rect.width / 2;
        const pinY = rect.top;

        // Верх провода на пине
        setConnections(prev => ({ ...prev, [wireIndex]: closestPinIndex }));
        setWirePositions(prev => ({
            ...prev,
            [wireIndex]: { x: pinX, y: pinY } // верхушка провода совпадает с верхом пина
        }));
        setResult(null);
    };

    const checkConnections = () => {
        let allCorrect = true;
        wires.forEach((wire, wireIndex) => {
            const pinIndex = connections[wireIndex];
            if (pinIndex === undefined || pinIndex !== wire.targetPin) allCorrect = false;
        });
        setResult(allCorrect);
    };

    const resetWires = () => {
        setConnections({});
        setWirePositions({});
        setResult(null);
    };

    return (
        <div className="connector">
            <div className="svg-wrapper">
                <svg
                    className="connector-svg"
                    width="276"
                    height="521"
                    viewBox="0 0 276 521"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6.5 6.5H58.8306V45.5522H218.413V6.5H269.5V293.5H6.5V6.5Z" stroke="black" strokeWidth="13"/>
                    <rect x="6.5" y="293.5" width="263" height="221" stroke="black" strokeWidth="13"/>
                    <rect x="42.5" y="370.5" width="192.96" height="67" stroke="black" strokeWidth="7"/>
                    <rect x="68.3242" y="396.568" width="141.553" height="26.3127" stroke="black" strokeWidth="6"/>
                </svg>

                {/* Пины */}
                <div className="pins-layer">
                    {wires.map((_, i) => (
                        <div
                            key={i}
                            ref={el => (pinsRef.current[i] = el)}
                            className="pin"
                            style={{
                                left: 0 + i * 25 + "px",  // подгоняем по горизонтали
                                top: "60px"                 // верх пина на этой высоте
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Провода */}
            <div className="wires-row">
                {displayOrder.map(displayIndex => (
                    <WireDragItem
                        key={displayIndex}
                        image={wires[displayIndex].image}
                        color={wires[displayIndex].color}
                        fixedPos={connections[displayIndex] !== undefined ? wirePositions[displayIndex] : undefined}
                        onDrag={(color, pos) => handleDrag(color, pos, displayIndex)}
                        isPlaced={connections[displayIndex] !== undefined}
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
    );
}
