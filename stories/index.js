import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Input, Select } from './../index';
import AntSelect from './AntSelect';

const rows = [];
const positions = [];

for (let i = 0; i < 100; i++) {
    rows.push({
        id: i,
        firstName: 'First name ' + i,
        secondName: 'Second name ' + i,
        positionId: 3,
        age: i
    });
}

for (let i = 0; i < 10; i++) {
    positions.push({
        value: i,
        label: 'Long Position Name ' + i
    });
}

function DataTable(props) {
    const [rows, setRows] = useState(props.rows);

    const onFieldChange = (rowId, field) => (value) => {
        rows[rowId][field] = value;
        setRows([].concat(rows))
    }

    const initColumns = () => {
        return [
            {
                title: 'First name',
                value: (row, {focus}) => {
                    return (
                        <Input
                            value={row.firstName}
                            focus={focus}
                            onChange={onFieldChange(row.id, 'firstName')}
                        />
                    );
                },
                id: 'firstName'
            },
            {
                title: 'Second name',
                value: (row, {focus, index}) => {
                    return (
                        <Input
                            value={row.secondName}
                            focus={focus}
                            onChange={onFieldChange(row.id, 'secondName')}
                        />
                    );
                },
                id: 'secondName'
            },
            {
                title: '多选',
                value: (row, {focus, index}) => {
                    const options = [{'label': '苹果', value: 'appple'}, {'label': '橘子', value: 'orgin'}]
                    if (focus) {
                        return (
                            <AntSelect
                                autoFocus
                                open
                                mode="multiple"
                                style={{width: '100%'}}
                                value={row.mulSelect}
                                onChange={onFieldChange(row.id, 'mulSelect')}
                                options={options}
                            />
                        );
                    } else {
                        return <span>{row.mulSelect ? row.mulSelect.join('、') : '请选择'}</span>
                    }
                },
                id: 'mulSelect'
            },
            {
                title: 'Position',
                value: (row, {focus}) => {
                    return (
                        <Select
                            value={row.positionId}
                            isOpen={focus}
                            options={positions}
                            onChange={onFieldChange(row.id, 'positionId')}
                        />
                    );
                },
                id: 'position'
            },
            {
                title: 'Age',
                value: (row, {focus}) => {
                    return (
                        <Input
                            value={row.age}
                            focus={focus}
                            onChange={onFieldChange(row.id, 'age')}
                        />
                    );
                },
                id: 'age',
                width: 10
            }
        ];
    }

    const [columns, setColumns] = useState(initColumns());

    const onColumnResize = (widthValues) => {
        const newColumns = [].concat(columns)
        Object.keys(widthValues).forEach((columnId) => {
            const column = columns.find(({ id }) => id === columnId);
            column.width = widthValues[columnId]
        })
        setColumns(newColumns)
    }

    return (
        <div className="DataTable">
            <Grid
                columns={columns}
                rows={rows}
                getRowKey={row => row.id}
                rowHeight={50}
                isColumnsResizable
                onColumnResize={onColumnResize}
                focusOnSingleClick={props.focusOnSingleClick}
                disabledCellChecker={(row, columnId) => {
                    return columnId === 'age';
                }}
                isScrollable={props.isScrollable}
            />
        </div>
    )
}

DataTable.defaultProps = {
    isScrollable: false,
    focusedOnClick: false
};

storiesOf('Examples', module)
    .add('Scrollable grid', () => <DataTable rows={rows} isScrollable />)
    .add('Empty scrollable grid', () => <DataTable rows={[]} isScrollable />)
    .add('Focus on single click', () => <DataTable rows={rows} focusOnSingleClick={true} isScrollable />);
