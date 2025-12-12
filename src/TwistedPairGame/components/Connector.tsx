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
            <svg width="287" height="536" viewBox="0 0 287 536" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 6.5H69.8306V45.5522H229.413V6.5H280.5V293.5H17.5V6.5Z" stroke="black" stroke-width="13"/>
                <rect x="17.5" y="293.5" width="263" height="221" stroke="black" stroke-width="13"/>
                <rect x="53.5" y="370.5" width="192.96" height="67" stroke="black" stroke-width="7"/>
                <rect x="79.3242" y="396.568" width="141.553" height="26.3127" stroke="black" stroke-width="6"/>
                <g opacity="0.13">
                    <path d="M6.5 21.5H58.8306V60.5522H218.413V21.5H269.5V308.5H6.5V21.5Z" stroke="black" stroke-width="13"/>
                    <rect x="6.5" y="308.5" width="263" height="221" stroke="black" stroke-width="13"/>
                </g>
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
