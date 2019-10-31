import React from 'react';
import { Typography } from '@material-ui/core';
import { backendURL } from '../settings';
import { IData } from '../../types';
import LoadingIndicator from './LoadingIndicator';
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


                        <div id="chart" />
                        <div style={tooltip} className="tooltip" />
                    </>
                ) : <Typography variant="subtitle2" align='center' style={{ padding: 10 }}><em><strong>{wordform} </strong></em>does not exist in any corpora</Typography>
        }
        return content
    }
}