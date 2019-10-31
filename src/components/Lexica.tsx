import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { backendURL } from '../settings';
import LoadingIndicator from './LoadingIndicator';
// Declare Prop Type
export interface IProps {
    wordform: string;
}
// Declare custom Lexica Type
export interface ILexica {
    correct: boolean;
    lexicon_name: string;
}

const Lexica = ({ wordform }: IProps) => {
    const [lexica, setLexica] = React.useState<ILexica[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    // Fetch Lexica from an API
    React.useEffect(() => {
        fetch(`${backendURL}/lexica/${wordform}`)
            .then(result => result.json())
            .then((res) => {
                setLexica(res)
                setIsLoading(false)
            }
            );
    }, [wordform]);

    // Iterate through all lexica and create cell for each lexica
    const Rows = lexica.map(lexicon => (
        <TableRow key={lexicon.lexicon_name}>
            <TableCell style={{ width: 400 }}>{lexicon.lexicon_name.split('.').join(' ')}</TableCell>
            <TableCell>{lexicon.correct ? <Check style={{ color: '4BB543' }} /> : <Close style={{ color: 'FC100D' }} />}</TableCell>
        </TableRow>
    ));

    let content = null;
    const lexiconContent = lexica.length > 0 ? (
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

    content = isLoading ? <LoadingIndicator /> : lexiconContent
    return content
}

export default Lexica;
