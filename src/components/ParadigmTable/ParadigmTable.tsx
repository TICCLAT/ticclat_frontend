import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';
import { ShoppingBagContext } from '../../context/ShoppingBag';
import ParadigmHeader from './ParadigmHeader';
import AddButton from '../ShoppingBag/AddButton';
export function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

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

export type Order = 'asc' | 'desc';

export function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface IProps {
    variants: any
}
interface IState {
    order: Order;
    orderBy: string;
}

const Row = ({ variant }: {variant: any}) => {
    const shoppingBag = React.useContext(ShoppingBagContext);
    return (
      <TableRow>
          <TableCell>
              <AddButton
                index={variant.wordform}
                shoppingBag={shoppingBag}
                word={variant.wordform as string}
              />
          </TableCell>
          <TableCell>{variant.V}</TableCell>
          <TableCell>{variant.word_type_code}</TableCell>
          <TableCell>{variant.min_year || '?'}</TableCell>
          <TableCell>{variant.max_year || '?'}</TableCell>
          <TableCell>{variant.num_corpora}</TableCell>
          <TableCell>{variant.num_lexica}</TableCell>
          <TableCell>{variant.num_paradigms}</TableCell>
      </TableRow>
    )
}

class ParadigmTable extends React.Component<IProps, IState> {
    state = {
        order: 'asc' as Order,
        orderBy: 'num_corpora',
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
        const { order, orderBy } = this.state;
        const { variants } = this.props;

        const sortedData = stableSort(variants, getSorting(order, orderBy));
        return (
            <Table aria-labelledby="tableTitle">
                <ParadigmHeader
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={this.handleRequestSort}
                    rowCount={variants.length}
                />
                <TableBody>
                    {sortedData.map((variant, index) => (<Row key={index} variant={variant} />))}
                </TableBody>
            </Table>
        );
    }
}

export default ParadigmTable;
