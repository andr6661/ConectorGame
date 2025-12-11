
import { useDragLayer } from 'react-dnd';
import classes from './custom.module.scss';

export default function Custom()  {
    const { item, currentOffset, isDragging } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !currentOffset) {
        return null;
    }
    const style = {
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    };

    return (
        <div className={classes.dragLayer}>
            <div style={style} className={classes.draggingEl}>
                <img src={item.src} alt=""/>
            </div>
        </div>
    );
};


