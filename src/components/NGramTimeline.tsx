import React from 'react';
import { Typography } from '@material-ui/core';
import { backendURL } from '../settings';
import { IData } from '../../types';
import LoadingIndicator from '../components/LoadingIndiacator';
import { NGramChart } from './Charts/NGram';

interface IProps {
    wordform: string;

}

interface IState {
    info: IData | null,
    isLoading: boolean,
    chart: NGramChart | null,
}
const tooltip: React.CSSProperties = {
    display: 'none',
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
const frequencyContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
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
            content = <LoadingIndicator />
        }
        else if (info !== null) {
            content = info.corpora.length > 0 ?
                (
                    <>
                        <Typography variant="subtitle2" align='center' style={{ padding: 10 }}> {wordform}</Typography>
                        <div id="frequency" style={frequencyContainer}>
                            <input type="radio" value="term_freq" name="frequency" className="frequency" />
                            <label style={{ marginRight: 20, fontSize: 14 }}>Absolute Corpus Frequency</label>
                            <input type="radio" value="corpus_freq" name="frequency" className="frequency" />
                            <label style={{ marginRight: 20, fontSize: 14 }}>Relative Corpus Frequency</label>
                            <input type="radio" value="freq" name="frequency" className="frequency" checked readOnly />
                            <label style={{ marginRight: 20, fontSize: 14 }}>Relative Year Frequency </label>
                        </div>
                        <div id="chart" />
                        <div style={tooltip} className="tooltip" />
                    </>
                ) : <Typography variant="subtitle2" align='center' style={{ padding: 10 }}><em><strong>{wordform} </strong></em>does not exist in any corpora</Typography>
        }
        return content
    }
}