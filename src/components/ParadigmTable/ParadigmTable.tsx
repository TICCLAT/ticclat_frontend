import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Checkbox
} from '@material-ui/core';

import ParadigmHeader from './ParadigmHeader';
import AddButton from '../ShoppingBag/AddButton';
import { ShoppingBagContext } from '../../context/ShoppingBag';

// Sorting Data in Table
export type Order = 'asc' | 'desc';
export function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
export function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
export function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
// ----------Sorting Data in Table End Here------------




interface IProps {
    variants: any
}
interface IState {
    order: Order;  // state to save order to sort by (e.g 'asc' or 'dsc')
    orderBy: string; // state to save orderBy (e.g. frequency, year, corpora, etc)
    selected: string[]; // state to save selected word forms to add into bag of words
}
// Table Row Component
const Row = (
    { variant, isItemSelected, onClick }:
        { variant: any, isItemSelected: boolean, onClick: (event: React.ChangeEvent<unknown>, checked: boolean, wordform: string) => void }
) => {
    return (
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={(event, checked) => onClick(event, checked, variant.wordform.toString())}
                />
            </TableCell>
            <TableCell>
                <AddButton
                    index={variant.wordform}
                    word={variant.wordform as string}
                />
            </TableCell>
            <TableCell>{"Z" + variant.Z + "Y" + variant.Y + "X" + variant.X + "W" + variant.W + "V" + variant.V}</TableCell>
            <TableCell>{variant.word_type_code}</TableCell>
            <TableCell>{variant.min_year || '?'}</TableCell>
            <TableCell>{variant.max_year || '?'}</TableCell>
            <TableCell>{variant.num_corpora}</TableCell>
            <TableCell>{variant.num_lexica}</TableCell>
            <TableCell>{variant.num_paradigms}</TableCell>
        </TableRow>
    )
}
// Paradigm Table Component
class ParadigmTable extends React.Component<IProps, IState> {
    static contextType = ShoppingBagContext;
    state = {
        order: 'asc' as Order,
        orderBy: 'num_corpora',
        selected: [],
    };

    handleRequestSort = (event: any, property: any) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order: order as Order, orderBy });
    }
    render() {
        const { order, orderBy, selected } = this.state;
        const { variants } = this.props;


        const isSelected = (wordform: any) => selected.indexOf(wordform.toString()) !== -1;
        const sortedData = stableSort(variants, getSorting(order, orderBy));

        const handleClick = (event: React.ChangeEvent<unknown>, checked: boolean, wordform: string) => {
            const selectedIndex = selected.indexOf(wordform);
            let newSelected: string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, wordform);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            this.setState({
                selected: newSelected,
            }, () => this.context.addImportedWords(newSelected));
        };
        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelecteds = sortedData.map((n) => n.wordform.toString());
                this.setState({ selected: newSelecteds }, () => this.context.addImportedWords(newSelecteds));
                return;
            }

            this.setState({ selected: [] }, () => this.context.removeAllWords());
        };

        return (
            <div style={{ overflowX: 'auto' }}>
                <Table aria-labelledby="tableTitle">
                    <ParadigmHeader
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={variants.length}
                        onSelectAllClick={handleSelectAllClick}
                        numSelected={selected.length}
                        isBagEmpty={this.context.words.length <= 0}
                    />
                    <TableBody>
                        {sortedData.map((variant, index) => {
                            const isItemSelected = this.context.words.includes(variant.wordform);
                            // const isItemSelected = isSelected(variant.wordform);
                            return <Row key={index} variant={variant} isItemSelected={isItemSelected} onClick={handleClick} />
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ParadigmTable;
