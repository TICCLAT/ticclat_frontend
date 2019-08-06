import * as d3 from 'd3';
import * as React from 'react';
import { backendURL } from '../settings';

export interface IProps {
    word_forms: string[];
}

export interface IWordformFrequencyPerCorpus {
    wordform: string;
    metadata: {
        min_freq: number;
        max_freq: number;
        min_year: number;
        max_year: number;
    }
    corpora: Array<{
        name: string;
        frequencies: Array<{
            freq: number;
            year: number;
        }>
    }>,
}

type IState = IWordformFrequencyPerCorpus[];

const StackedNGram = (props: IProps) => {
    const selfRef = React.createRef<HTMLDivElement>();
    const [ state, setState ] = React.useState<IState>([]);
    React.useEffect(() => {
        Promise.all(
          props.word_forms.map(wordForm =>
            fetch(`${backendURL}/word_frequency_per_corpus_per_year/${wordForm}`)
              .then(r => r.json()),
          )
        ).then(setState)
      },
      [ props.word_forms ]
    );
    React.useEffect(() => {
        if (state && state.length>0 && selfRef.current) {
            d3init(selfRef.current, props, state);
        }
    }, [ state ]);

    return (
      <div ref={selfRef}>
          {(!state || state.length === 0) ? 'Loading...' : ''}
      </div>
    )
}

const d3init = (elm: HTMLDivElement, props: IProps, state: IState) => {
    const boxWidth = 500;
    const boxHeight = 500;

    const maxY = 50;

    const svg = d3.select(elm)
        .append("svg")
        .attr('style', 'font-size: 20px; max-height: 100%; max-width: 100%')
        .attr('viewBox', `0 0 ${boxWidth} ${boxHeight}`)

    const xScale = d3.scaleLinear().domain([1000, 2020]).range([0, boxWidth])
    const yScale = d3.scaleLinear().domain([0, 0.0001]).range([0, maxY])

    svg.append("svg")
        .attr("y", boxHeight - 30)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("i")));

    const subgraphs = svg.selectAll('svg.subgraph')
      .data(state)
      .enter()
      .append('svg')
      .attr('class', 'subgraph')

    subgraphs
      .attr('data-word_form', d => d.wordform)
      .attr('y', (d, i) => i*30)
      .attr('x', 0)
      .append('text')
      .attr('dominant-baseline', 'hanging')
      .text(d => d.wordform)

    const corpora = subgraphs.selectAll('.corpus')
      .data(d => d.corpora)
      .enter()
      .append('svg')
      .attr('x', 100)
      .attr('class', 'corpus')
      .attr('data-corpus', d => d.name)

    corpora.selectAll('.bar')
      .data(d => d.frequencies)
      .enter()
      .append('rect')
      .attr('data-year', d => d.year)
      .attr('fill', 'blue')
      .attr('x', d => xScale(d.year))
      .attr('width', 5)
      .attr('y', d => maxY - yScale(d.freq))
      .attr('height', d => yScale(d.freq))
}

export default StackedNGram;
