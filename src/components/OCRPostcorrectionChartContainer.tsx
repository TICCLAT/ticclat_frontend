import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import React from 'react';
import { drawChart } from './Charts/OCRPostCorrectionChart';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';

interface IState {
    info: any,
    isLoading: boolean;
    frequencyFilter: number;
    nWordsFilter: number;
}
interface IProps {
    wordform: string
}

const makeFilter = (min: number, max: number, defaultValue: number, nMarks: number) => ({
    min,
    max,
    defaultValue,
    marks: Array(nMarks + 1).fill(null).map((_, i) => {
        const value = min + i * (max - min) / nMarks;
        return {value, label: Math.floor(value)};
    }),
    step: (max - min) / 100,
});
const FREQUENCY_FILTER = makeFilter(0, 100, 0, 5);
const N_WORDS_FILTER = makeFilter(0, 500, 100, 5);

export default class OCRPostCorrectionChartContainer extends React.Component<IProps, IState> {
    state: IState = {
        info: null,
        isLoading: true,
        frequencyFilter: FREQUENCY_FILTER.defaultValue,
        nWordsFilter: N_WORDS_FILTER.defaultValue,
    }
    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.wordform !== this.props.wordform) {
            this.fetchData();
        }
    }
    public componentDidMount() {
        this.fetchData()
    }

    public update() {
        const info = this.state.info;
        if (!this.state.isLoading && info && info.corrections.length > 0 && info.paradigms.length > 0) {
            document.getElementById('OCRPostCorrectionChart')!.innerHTML = '';
            drawChart(info, this.state.frequencyFilter, this.state.nWordsFilter);
        }
    }

    public async fetchData() {
        const { wordform } = this.props;
        if (wordform) {
            const response = await fetch(`${backendURL}/corrections/${wordform}`);
            const responseData = await response.json();
            this.setState({ info: responseData, isLoading: false }, () => {
                this.update();
            })
        }
    }

    render() {
        const wordform = this.props.wordform || 'wordform';
        const { info, isLoading } = this.state;
        let content = null;
        if (isLoading) {
            content = <LoadingIndicator />
        }
        else if (info !== null) {
            content = ((info.corrections.length > 0) && (info.paradigms.length > 0)) ?
                (
                    <>
                        <div style={{display: 'flex', flexDirection: 'horizontal'}}>
                            <Paper style={{maxWidth: '200px', padding: '1em', marginRight: '1em'}}>
                                <Typography id="label-frequency-filter" gutterBottom>
                                    Filter all words below this frequency
                                </Typography>
                                <Slider
                                  defaultValue={FREQUENCY_FILTER.defaultValue}
                                  aria-labelledby="label-frequency-filter"
                                  valueLabelDisplay="on"
                                  step={1}
                                  marks={FREQUENCY_FILTER.marks}
                                  min={FREQUENCY_FILTER.min}
                                  max={FREQUENCY_FILTER.max}
                                  onChange={(e, val) => {
                                      this.setState({frequencyFilter: val as number});
                                      this.update();
                                  }}
                                />
                            </Paper>
                            <Paper style={{maxWidth: '200px', padding: '1em'}}>
                                <Typography id="label-words-filter" gutterBottom>
                                    Maximum # of words to display
                                </Typography>
                                <Slider
                                  defaultValue={N_WORDS_FILTER.defaultValue}
                                  aria-labelledby="label-words-filter"
                                  valueLabelDisplay="on"
                                  step={N_WORDS_FILTER.step}
                                  marks={N_WORDS_FILTER.marks}
                                  min={N_WORDS_FILTER.min}
                                  max={N_WORDS_FILTER.max}
                                  onChange={(e, val) => {
                                      this.setState({nWordsFilter: val as number});
                                      this.update();
                                  }}
                                />
                            </Paper>
                        </div>
                        <div id="OCRPostCorrectionChart" />
                    </>
                ) : <Typography variant="subtitle2" align='center' style={{ padding: 10 }}>No corrections found for <em><strong>{wordform} </strong></em></Typography>


        }
        return content
    }
}
