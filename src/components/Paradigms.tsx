import React from 'react';
import { backendURL } from '../settings';
import Paradigm from './Paradigm';
import LoadingIndicator from './LoadingIndicator';

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
  const [isLoading, setIsLoading] = React.useState(true);
  let content = null;

  React.useEffect(() => {
    fetch(`${backendURL}/lemmas_for_wordform/${wordform}`)
      .then(result => result.json())
      .then((res) => {
        setLemmas(res)
        setIsLoading(false);
      });
  }, [wordform]);

  const Cards = lemmas.length > 0 ? lemmas.map(lemma => (
    <Paradigm id={lemma.paradigm_id} key={lemma.paradigm_id} />
  ))
    : <p>No Paradigms found for the word <strong>{wordform}</strong> </p>;

  content = isLoading ? <LoadingIndicator /> : Cards

  return content
}

export default Paradigms;
