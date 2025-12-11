import React, { useRef, useState, useEffect } from "react";
import Pin from "./Pin";
import "./game.scss";

interface ConnectorProps {
    wires: { image: string; color: string; targetPin: number }[];
    connections: { [wireIndex: number]: number };
    onWireConnect: (wireIndex: number, pinIndex: number) => void;
}

export default function Connector({ wires, connections, onWireConnect }: ConnectorProps) {
    useRef<(HTMLDivElement | null)[]>([]);
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

                <div className="pins-layer">
                    {wires.map((_, i) => (
                        <Pin
                            key={i}
                            pinIndex={i}
                            isOccupied={Object.values(connections).includes(i)}
                            onWireDrop={(wireIndex, pinIndex) => onWireConnect(wireIndex, pinIndex)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}