import { Typography } from '@material-ui/core';
import React from 'react';
import { backendURL } from '../settings';
import ParadigmTable from './ParadigmTable/ParadigmTable';

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


  const lemma = variants.filter(v => v.word_type_code === 'HCL')[0]
  const title = lemma ? lemma.wordform : id;

  const content = variants.length > 0 ? <ParadigmTable variants={variants} /> : <p>No paradigm</p>
  return (
    <>
      <Typography variant="h6" id="tableTitle" align='center'>
        {title}
      </Typography>
      {content}
    </>
  )

}

export default Paradigm;
