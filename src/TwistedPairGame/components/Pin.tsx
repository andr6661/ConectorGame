import React from "react";
import { useDrop } from "react-dnd";
import type { WireDragItem } from "./DndTypes";
import "./connector.scss";

interface PinProps {
    pinIndex: number;
    wireImage?: string;
    isOccupied: boolean;
    onWireDrop: (wireIndex: number, pinIndex: number) => void;
}

export default function Pin({ pinIndex, wireImage, isOccupied, onWireDrop }: PinProps) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "WIRE",
        drop: (item: WireDragItem) => onWireDrop(item.wireIndex, pinIndex),
        canDrop: () => !isOccupied,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // Динамическое распределение пинов
    const pinCount = 8;
    const startLeft = 55;
    const gap = 22;
    const topPosition = 55;

    const positions = Array.from({ length: pinCount }, (_, i) => ({
        top: topPosition,
        left: startLeft + i * gap,
    }));

    const pos = positions[pinIndex];

    return (
        <div
            ref={dropRef}
            className="pin"
            style={{
                top: pos.top,
                left: pos.left,
                border: isOver ? "2px solid red" : "none",
            }}
        >
            {wireImage && (
                <div className="pin-wire-container">
                    <img src={wireImage} alt="wire" className="pin-wire" />
                </div>
            )}
        </div>
    );
}
