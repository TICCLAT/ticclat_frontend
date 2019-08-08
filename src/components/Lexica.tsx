import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

import TableHead from '@material-ui/core/TableHead';
import React from 'react';
import { backendURL } from '../settings';
export interface IProps {
    wordform: string;
}
export interface ILexica {
    correct: boolean;
    lexicon_name: string;
}

const Lexica = ({ wordform }: IProps) => {
    const [lexica, setLexica] = React.useState<ILexica[]>([]);
    React.useEffect(() => {
        fetch(`${backendURL}/lexica/${wordform}`)
            .then(result => result.json())
            .then(setLexica);
    }, [wordform]);


    const Rows = lexica.map(lexicon => (

        <TableRow key={lexicon.lexicon_name}>
            <TableCell style={{ width: 400 }}>{lexicon.lexicon_name.split('.').join(' ')}</TableCell>
            <TableCell>{lexicon.correct ? <Check color='secondary' /> : <Close style={{ color: 'FC100D' }} />}</TableCell>
        </TableRow>
    ));

    const content = lexica.length > 0 ? (
        <Table >
            <TableHead>
                <TableRow>
                    <TableCell>Lexicon</TableCell>
                    <TableCell>Correct</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Rows}
            </TableBody>
        </Table>
    ) : <p>No Lexica found for the word <strong>{wordform}</strong></p>
    return content
}

export default Lexica;
