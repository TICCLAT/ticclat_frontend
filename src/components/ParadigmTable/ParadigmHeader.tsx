import * as React from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Checkbox
} from '@material-ui/core';

// Props for ParadigmHeader
interface IProps {
    order: any;  // 'asc'  or 'dsc'
    orderBy: string; // e.g. Year , Corpora, etc
    rowCount: number;
    numSelected: number; // selected wordforms for adding into cart
    onRequestSort: (event: any, property: any) => void; // Function to call onSort 
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void; // Function to call on SelectAll checkbox checked
    isBagEmpty: boolean;
}

class ParadigmHeader extends React.Component<IProps, {}> {
    createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    }
    render() {
        // Declare title for each column 
        const rows = [
            { id: 'wordform', label: 'Wordform' },
            { id: 'frequency', label: 'Frequency' },
            { id: 'V', label: 'Word Label(V)' },
            { id: 'word_type_code', label: 'Code' },
            { id: 'min_year', label: 'Min Year' },
            { id: 'max_year', label: 'Max Year' },
            { id: 'num_corpora', label: '#Corpora' },
            { id: 'num_lexica', label: '#Lexica' },
            { id: 'num_paradigms', label: '#Paradigms' }
        ];

        // Destructuring Props
        const { order, orderBy, onSelectAllClick, numSelected, rowCount, isBagEmpty } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={(numSelected === rowCount) && (!isBagEmpty)}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all wordforms' }}
                            color="primary"
                        />
                    </TableCell>
                    {
                        // Iterate through each column name
                        rows.map((row) => {
                            return (
                                <TableCell
                                    key={row.id}
                                    align={row.id === 'V' ? 'center' : 'left'}
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
