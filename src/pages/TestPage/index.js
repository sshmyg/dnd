import React, {
    useState,
    useCallback
} from 'react';

import BoardDnd from 'app/components/BoardDnd';

import './style.css';

function ColumnChildren({
    column,
    tasks,
    setTasks,
    setColumns
}) {
    const handleClick = useCallback(() => {
        setTasks(t => {
            const id = Date.now();

            const newTask = {
                ...t,
                [id]: { id }
            };

            setColumns(c => {
                const newColumns = {
                    ...c
                };

                newColumns[column.id].taskIds = [
                    ...newColumns[column.id].taskIds,
                    id
                ];

                return newColumns;
            });

            return newTask;
        });
    });

    return <button onClick={handleClick}>Add task</button>;
}

function TaskChildren({
    task
}) {
    return <p>{ task.id }</p>
}

export default function TestPageRender() {
    const [ tasks, setTasks ] = useState({
        'task-1': { id: 'task-1' },
        'task-2': { id: 'task-2' },
        'task-3': { id: 'task-3' },
        'task-4': { id: 'task-4' },
        'task-5': { id: 'task-5' },
        'task-6': { id: 'task-6' },
        'task-7': { id: 'task-7' },
        'task-8': { id: 'task-8' },
        'task-9': { id: 'task-9' }
    });
    const [ columns, setColumns ] = useState({
        'column-1': {
            id: 'column-1',
            title: 'Col-1',
            taskIds: ['task-1', 'task-2', 'task-3'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Col-2',
            taskIds: ['task-4', 'task-5', 'task-6'],
        }
    });
    const [ columnsOrder, setColumnsOrder ] = useState([
        'column-1',
        'column-2'
    ]);
    const handleAddColumn = useCallback(() => {
        setColumns(cols => ({
            ...cols,
            [`column-${Object.keys(cols).length + 1}`]: {
                id: `column-${Object.keys(cols).length + 1}`,
                title: `Col-${Object.keys(cols).length + 1}`,
                taskIds: []
            }
        }));
        setColumnsOrder(order => ([
            ...order,
            `column-${Object.keys(columns).length + 1}`
        ]));
    }, [ columns, setColumns, setColumnsOrder ]);
    const withMethods = useCallback(() => {
        return props => ColumnChildren({
            ...props,
            setTasks,
            setColumns
        });
    }, [ setTasks, setColumns ]);
    const ColumnChildrenEnhanced = withMethods(ColumnChildren);

    return (
        <div className="l-container">
            <div className="l-container__main">
                <BoardDnd
                    columns={columns}
                    tasks={tasks}
                    columnsOrder={columnsOrder}
                    setColumns={setColumns}
                    setColumnsOrder={setColumnsOrder}
                    columnChildren={ColumnChildrenEnhanced}
                    taskChildren={TaskChildren}
                />
            </div>
            <div className="l-container__aside">
                <button onClick={handleAddColumn}>Add column</button>
            </div>
        </div>
    );
}
