import React from "react";
import Pin from "./Pin";
import "./connector.scss";

interface ConnectorProps {
    wires: { image: string; color: string; targetPin: number }[];
    connections: { [pinIndex: number]: number };
    onWireConnect: (wireIndex: number, pinIndex: number) => void;
}

export default function Connector({ wires, connections, onWireConnect }: ConnectorProps) {
    return (
        <div className="connector">
            <svg width="276" height="521" viewBox="0 0 276 521" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 6.5H58.8306V45.5522H218.413V6.5H269.5V293.5H6.5V6.5Z" stroke="black" stroke-width="13"/>
                <rect x="6.5" y="293.5" width="263" height="221" stroke="black" stroke-width="13"/>
                <rect x="42.5" y="370.5" width="192.96" height="67" stroke="black" stroke-width="7"/>
                <rect x="68.3242" y="396.568" width="141.553" height="26.3127" stroke="black" stroke-width="6"/>
            </svg>


            {wires.map((_, pinIndex) => {
                const wireIndex = connections[pinIndex];
                const wireImage = wireIndex !== undefined ? wires[wireIndex].image : undefined;

                return (
                    <Pin
                        key={pinIndex}
                        pinIndex={pinIndex}
                        isOccupied={wireIndex !== undefined}
                        wireImage={wireImage}
                        onWireDrop={onWireConnect}
                    />
                );
            })}
        </div>
    );
}
