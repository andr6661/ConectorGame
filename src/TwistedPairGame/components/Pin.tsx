import React from "react";
import { useDrop } from "react-dnd";

interface PinProps {
    pinIndex: number;
    onWireDrop: (wireIndex: number, pinIndex: number) => void;
    isOccupied: boolean;
}

export default function Pin({ pinIndex, onWireDrop, isOccupied }: PinProps) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "WIRE",
        drop: (item: { wireIndex: number }) => {
            onWireDrop(item.wireIndex, pinIndex);
        },
        canDrop: () => !isOccupied,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={dropRef}
            className="pin"
            style={{
                background: isOccupied ? "#c5a800" : "#FFD000",
                border: isOver ? "2px solid red" : "none",
                width: 12,
                height: 56,
                position: "absolute",
                top: 60,
                left: 45 + pinIndex * 25,
                borderRadius: 6,
                zIndex: 10,
            }}
        />
    );
}
