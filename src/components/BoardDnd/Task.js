import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

export default function Task({
    task,
    index,
    children
}) {
    return (
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {
                provided => {
                    return (
                        <div
                            className="c-board__task"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {
                                typeof children === 'function'
                                    ? children({ task })
                                    : children
                            }
                        </div>
                    );
                }
            }
        </Draggable>
    );
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ])
};
