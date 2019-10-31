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

const DEFAULT_FREQUENCY_FILTER = 10;
const DEFAULT_N_WORDS_FILTER = 150;

export default class OCRPostCorrectionChartContainer extends React.Component<IProps, IState> {
    state: IState = {
        info: null,
        isLoading: true,
        frequencyFilter: DEFAULT_FREQUENCY_FILTER,
        nWordsFilter: DEFAULT_N_WORDS_FILTER,
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
                                  defaultValue={DEFAULT_FREQUENCY_FILTER}
                                  aria-labelledby="label-frequency-filter"
                                  valueLabelDisplay="auto"
                                  step={1}
                                  marks
                                  min={0}
                                  max={100}
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
                                  defaultValue={DEFAULT_N_WORDS_FILTER}
                                  aria-labelledby="label-words-filter"
                                  valueLabelDisplay="auto"
                                  step={10}
                                  marks
                                  min={100}
                                  max={1500}
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
