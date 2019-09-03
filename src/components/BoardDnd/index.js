import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    DragDropContext,
    Droppable
} from 'react-beautiful-dnd';

import Column from './Column';

import './style.css';

export default function BoardDnd({
    tasks,
    columns,
    columnsOrder,
    setColumns,
    setColumnsOrder,
    columnChildren,
    taskChildren
}) {
    const handleDragEnd = useCallback(result => {
        const {
            destination,
            source,
            draggableId,
            type
        } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(columnsOrder);

            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            setColumnsOrder(() => newColumnOrder);

            return;
        }

        const startColumn = columns[source.droppableId];
        const finishColumn = columns[destination.droppableId];

        if (startColumn === finishColumn) {
            const column = columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds,
            };

            setColumns(cols => ({
                ...cols,
                [newColumn.id]: newColumn
            }));

            return;
        }

        //Move task form one column to another
        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...startColumn,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finishColumn.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finishColumn,
            taskIds: finishTaskIds,
        };

        setColumns(cols => ({
            ...cols,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        }));
    }, [
        columns,
        columnsOrder,
        setColumns,
        setColumnsOrder
    ]);

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
            >
                {
                    provided => {
                        return (
                            <div
                                className="c-board"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {
                                    columnsOrder.map((columnId, index) => {
                                        const column = columns[columnId];
                                        const tasksForColumn = column.taskIds.map(taskId => tasks[taskId]);

                                        return (
                                            <Column
                                                key={column.id}
                                                column={column}
                                                tasks={tasksForColumn}
                                                index={index}
                                                taskChildren={taskChildren}
                                            >
                                                { columnChildren }
                                            </Column>
                                        );
                                    })
                                }
                                { provided.placeholder }
                            </div>
                        );
                    }
                }
            </Droppable>
        </DragDropContext>
    );
}

BoardDnd.propTypes = {
    tasks: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    columnsOrder: PropTypes.array.isRequired,
    setColumns: PropTypes.func.isRequired,
    setColumnsOrder: PropTypes.func.isRequired,
    columnChildren: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    taskChildren: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ])
};
