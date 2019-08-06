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
    </TableRow>
  ));

  const lemma = variants.filter(v => v.word_type_code === 'HCL')[0]
  const title = lemma ? lemma.wordform : id;

  return (
    <div>
      <Typography variant="h6" id="tableTitle">
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Wordform</TableCell>
            <TableCell>V</TableCell>
            <TableCell>Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Rows}
        </TableBody>
      </Table>
    </div>
  );
}

export default Paradigm;
