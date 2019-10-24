import { Typography } from '@material-ui/core';
import React from 'react';
import { backendURL } from '../settings';
import ParadigmTable from './ParadigmTable/ParadigmTable';
import LoadingIndicator from './LoadingIndiacator';

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
  const [isLoading, setIsLoading] = React.useState(true);
  let content = null;
  React.useEffect(() => {
    fetch(`${backendURL}/morphological_variants_for_lemma/${id}`)
      .then(result => result.json())
      .then((res) => {
        setVariants(res)
        setIsLoading(false);
      });
  }, [id]);

  const variant = variants.length > 0 ? <ParadigmTable variants={variants} /> : <p>No Variants</p>
  content = isLoading ? <LoadingIndicator /> : variant

  return content

}

export default Paradigm;
