import React from 'react';
import PropTypes from 'prop-types';
import {
    Droppable,
    Draggable
} from 'react-beautiful-dnd';

import Task from './Task';

export default function Column({
    tasks,
    column,
    index,
    children,
    taskChildren
}) {
    return (
        <Draggable
            draggableId={column.id}
            index={index}
        >
            {
                provided => {
                    return (
                        <div
                            className="c-board__column-draggable"
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                        >
                            <h1 {...provided.dragHandleProps}>{ column.title }</h1>
                            <Droppable
                                droppableId={column.id}
                                type="task"
                            >
                                {
                                    provided => {
                                        return (
                                            <div
                                                className="c-board__column"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {
                                                    tasks.map((task, index) => {
                                                        return (
                                                            <Task
                                                                key={task.id}
                                                                task={task}
                                                                index={index}
                                                            >
                                                                { taskChildren }
                                                            </Task>
                                                        );
                                                    })
                                                }
                                                { provided.placeholder }
                                            </div>
                                        );
                                    }
                                }
                            </Droppable>
                            {
                                typeof children === 'function'
                                    ? children({
                                        column,
                                        tasks
                                    })
                                    : children
                            }
                        </div>
                    );
                }
            }
        </Draggable>
    );
}

Column.propTypes = {
    tasks: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    taskChildren: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ])
};
