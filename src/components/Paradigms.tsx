import React from 'react';
import { backendURL } from '../settings';

import { Card } from '@material-ui/core';
import Paradigm from './Paradigm';

export interface IProps {
  wordform: string;
}

export interface ILemma {
  W: number,
  X: number,
  Y: number,
  Z: number,
  paradigm_id: number,
  wordform: string,
}

const Paradigms = ({ wordform }: IProps) => {
  const [ lemmas, setLemmas ] = React.useState<ILemma[]>([]);
  React.useEffect(() => {
    fetch(`${backendURL}/lemmas_for_wordform/${wordform}`)
      .then(result => result.json())
      .then(setLemmas);
  }, [wordform]);

  const Cards = lemmas.map(lemma => (
    <Card key={lemma.paradigm_id}>
      <Paradigm id={lemma.paradigm_id} />
    </Card>
  ));

  return (
    <>
      {Cards}
    </>
  );
}

export default Paradigms;
