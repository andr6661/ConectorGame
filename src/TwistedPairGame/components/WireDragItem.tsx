// WireDragItem остается почти без изменений
export default function WireDragItem({ wireIndex, image, isConnected }: Props) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "WIRE",
        item: { wireIndex, image },
        canDrag: !isConnected,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    if (isConnected) return null; // ✅ Провод исчезает из списка

    return (
        <img
            ref={dragRef}
            src={image}
            alt="wire"
            style={{
                width: 50,
                height: 300,
                opacity: isDragging ? 0.5 : 1,
                cursor: "grab",
                marginRight: 10,
            }}
        />
    );
}
