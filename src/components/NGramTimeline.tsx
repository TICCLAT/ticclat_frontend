import React from 'react';
import { drawChart } from './Charts/NGram';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';
import { IData } from 'types';
interface IProps {
    wordform: string
}
interface IState {
    info: IData | null
}
export default class NGramTimeline extends React.Component<IProps, IState> {
    state = {
        info: null
    }
    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.wordform !== this.props.wordform) {
            this.fetchData();
        }
    }
    public componentDidMount() {
        this.fetchData()
    }
    public fetchData() {
        const { wordform } = this.props;
        fetch(`${backendURL}/word_frequency_per_corpus_per_year/${wordform}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ info: data }, () => {
                    if (data.corpora.length > 0) {
                        drawChart(data)
                    }
                })
            })

    }

    render() {
        const { wordform } = this.props;
        const { info } = this.state;
        let content = null;
        if (info !== null) {
            content = info.corpora.length > 0 ?
                (
                    <>
                        <div id="chart" />
                        <Typography variant="h5" align='center' style={{ margin: 10 }}> {wordform.charAt(0).toUpperCase() + wordform.slice(1)}</Typography>
                    </>
                ) : <Typography variant="h5" align='center' style={{ margin: 10 }}>Word does not exist in any corpora</Typography>
        }

        return content;

    }
}