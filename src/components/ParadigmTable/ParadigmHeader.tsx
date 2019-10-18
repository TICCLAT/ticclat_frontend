import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Checkbox
} from '@material-ui/core';
import * as React from 'react';
interface IProps {
    onRequestSort: (event: any, property: any) => void;
    order: any;
    orderBy: string;
    rowCount: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    numSelected: number;
}

class ParadigmHeader extends React.Component<IProps, {}> {
    createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    }
    render() {
        const rows = [
            { id: 'wordform', label: 'Wordform' },
            { id: 'V', label: 'V' },
            { id: 'word_type_code', label: 'Code' },
            { id: 'min_year', label: 'Min Year' },
            { id: 'max_year', label: 'Max Year' },
            { id: 'num_corpora', label: '#Corpora' },
            { id: 'num_lexica', label: '#Lexica' },
            { id: 'num_paradigms', label: '#Paradigms' }
        ];

        const { order, orderBy, onSelectAllClick, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                    {rows.map((row) => {
                        return (
                            <TableCell
                                key={row.id}
                                align={'left'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default ParadigmHeader;
