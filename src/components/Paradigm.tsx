import { Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import React from 'react';
import { backendURL } from '../settings';

export interface IProps {
  id: number;
}

export interface IVariant {
  V: number,
  word_type_code: string,
  wordform: string,
  min_year: number | null,
  max_year: number | null,
  num_corpora: number,
  num_lexica: number,
  num_paradigms: number,
}

const Paradigm = ({ id }: IProps) => {
  const [variants, setVariants] = React.useState<IVariant[]>([]);
  React.useEffect(() => {
    fetch(`${backendURL}/morphological_variants_for_lemma/${id}`)
      .then(result => result.json())
      .then(setVariants);
  }, [id]);

  const Rows = variants.map(variant => (
    <TableRow key={variant.wordform}>
      <TableCell>{variant.wordform}</TableCell>
      <TableCell>{variant.V}</TableCell>
      <TableCell>{variant.word_type_code}</TableCell>
      <TableCell>{variant.min_year || '?'}</TableCell>
      <TableCell>{variant.max_year || '?'}</TableCell>
      <TableCell>{variant.num_corpora}</TableCell>
      <TableCell>{variant.num_lexica}</TableCell>
      <TableCell>{variant.num_paradigms}</TableCell>
    </TableRow>
  ));

  const lemma = variants.filter(v => v.word_type_code === 'HCL')[0]
  const title = lemma ? lemma.wordform : id;

  return (
    <>
      <Typography variant="h6" id="tableTitle" align='center'>
        {title}
      </Typography>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Wordform</TableCell>
            <TableCell>V</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Min year</TableCell>
            <TableCell>Max year</TableCell>
            <TableCell># Corpora</TableCell>
            <TableCell># Lexica</TableCell>
            <TableCell># Paradigms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Rows}
        </TableBody>
      </Table>
    </>
  );
}

export default Paradigm;
