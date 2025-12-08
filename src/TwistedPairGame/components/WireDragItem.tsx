import React, { useState } from "react";

interface Props {
    image: string;
    color: string;
    fixedPos?: { x: number; y: number };
    onDrop?: (color: string, pos: { x: number; y: number }) => void;
    onDrag?: (color: string, pos: { x: number; y: number }) => void;
    isPlaced?: boolean;
    modalOpen?: boolean;
}

const WIRE_WIDTH = 50;
const WIRE_HEIGHT = 300;

export default function WireDragItem({ image, color, fixedPos, onDrop, onDrag, isPlaced, modalOpen }: Props) {
    const [dragging, setDragging] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setPos({ x: touch.clientX, y: touch.clientY });
        setDragging(true);

        const handleTouchMove = (ev: TouchEvent) => {
            ev.preventDefault();
            const t = ev.touches[0];
            setPos({ x: t.clientX, y: t.clientY });
            if (onDrag) onDrag(color, { x: t.clientX, y: t.clientY });
        };

        const handleTouchEnd = () => {
            setDragging(false);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
            if (onDrop) onDrop(color, pos);
        };

        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
        setDragging(true);

        const handleMouseMove = (ev: MouseEvent) => {
            setPos({ x: ev.clientX, y: ev.clientY });
            if (onDrag) onDrag(color, { x: ev.clientX, y: ev.clientY });
        };

        const handleMouseUp = () => {
            setDragging(false);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            if (onDrop) onDrop(color, pos);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const displayPos = fixedPos ? { x: fixedPos.x, y: fixedPos.y - WIRE_HEIGHT / 2 } : pos;

    return (
        <>
            <img
                src={image}
                className="wire"
                draggable={false}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{
                    opacity: dragging || fixedPos ? 0 : 1,
                    width: WIRE_WIDTH,
                    height: WIRE_HEIGHT,
                    display: "inline-block",
                    zIndex: modalOpen ? 0 : isPlaced ? 1 : 2,
                    pointerEvents: modalOpen ? "none" : "auto",
                    transition: dragging ? "none" : "transform 0.3s ease",
                }}
            />
            <img
                src={image}
                className="wire dragging"
                style={{
                    position: "fixed",
                    left: displayPos.x - WIRE_WIDTH / 2,
                    top: displayPos.y,
                    width: WIRE_WIDTH,
                    height: WIRE_HEIGHT,
                    pointerEvents: "none",
                    visibility: dragging || fixedPos ? "visible" : "hidden",
                    zIndex: dragging ? 9999 : fixedPos ? modalOpen ? 0 : 9999 : 2,
                    transition: dragging ? "none" : "top 0.2s ease",
                }}
                draggable={false}
            />
        </>
    );
}
