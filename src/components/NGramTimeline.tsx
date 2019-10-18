import React from 'react';
import { NGramChart } from './Charts/NGram';
import { Typography, CircularProgress } from '@material-ui/core';
import { backendURL } from '../settings';
import { IData } from '../../types';

interface IProps {
    wordform: string;

}

interface IState {
    info: IData | null,
    isLoading: boolean,
    chart: NGramChart | null,
}
const tooltip: React.CSSProperties = {
    alignItems: 'start',
    flexDirection: 'column',
    position: 'absolute',
    textAlign: 'center',
    width: 'auto',
    height: 'auto',
    padding: '5px',
    backgroundColor: '#fff',
    border: '1px solid',
    borderRadius: '5px',
    pointerEvents: 'none'
}

export default class NGramTimeline extends React.Component<IProps, IState> {
    state = {
        info: null,
        isLoading: true,
        chart: null,
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
        if (wordform) {
            fetch(`${backendURL}/word_frequency_per_corpus_per_year/${wordform}`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ info: data, isLoading: false }, () => {

                        if (data.corpora.length > 0) {
                            const chart = new NGramChart();
                            chart.init(data);
                            chart.draw();
                        }

                    });

                })
        }

    }

    render() {
        const { wordform } = this.props;
        const { info, isLoading } = this.state;

        let content = null;
        if (isLoading) {
            content = <CircularProgress />
        }
        else if (info !== null) {
            content = info.corpora.length > 0 ?
                (
                    <>
                        <Typography variant="h5" align='center' style={{ padding: 10 }}> {wordform}</Typography>
                        <div id="chart" />
                        <div style={tooltip} className="tooltip" />
                    </>
                ) : <Typography variant="h5" align='center' style={{ padding: 10 }}>Word does not exist in any corpora</Typography>
        }
        return (
            <div>

                {content}
            </div>
        );
    }
}