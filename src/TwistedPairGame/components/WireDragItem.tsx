import { useDrag } from "react-dnd";
import "./game.scss";

interface Props {
    wireIndex: number;
    image: string;
    isDisabled?: boolean;
}

export default function WireDragItem({ wireIndex, image, isDisabled }: Props) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "WIRE",
        item: { wireIndex },
        canDrag: !isDisabled,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={dragRef}
            src={image}
            alt="wire"
            className="wire-item"
            style={{
                opacity: isDisabled ? 0.3 : isDragging ? 0.5 : 1,
                cursor: isDisabled ? "not-allowed" : "grab",
            }}
        />
    );
}
