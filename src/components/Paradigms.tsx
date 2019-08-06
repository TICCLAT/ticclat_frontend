import React from 'react';
import { backendURL } from '../settings';

import { Card, Grid } from '@material-ui/core';
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
  const [lemmas, setLemmas] = React.useState<ILemma[]>([]);

  React.useEffect(() => {
    fetch(`${backendURL}/lemmas_for_wordform/${wordform}`)
      .then(result => result.json())
      .then(setLemmas);
  }, [wordform]);

  const Cards = lemmas.map(lemma => (
    <Grid item={true} xs={3} md={3} lg={3} key={lemma.paradigm_id}>
      <Card style={{ height: 400, overflowY: 'scroll' }}>
        <Paradigm id={lemma.paradigm_id} />
      </Card>
    </Grid>
  ));

  return (
    <>
      {Cards}
    </>
  );
}

export default Paradigms;
