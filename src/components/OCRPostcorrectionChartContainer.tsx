import Paper from '@material-ui/core/Paper';
import React from 'react';
import { drawChart } from './Charts/OCRPostCorrection/OCRPostCorrectionChart';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

interface IProps {
    wordform: string
}
interface IState {
    
}
export default class OCRPostCorrectionChartContainer extends React.Component<IProps> {
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
            fetch(`${backendURL}/corrections/${wordform}`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ info: data }, () => {
                        document.getElementById('OCRPostCorrectionChart')!.innerHTML = '';
                        drawChart(data);
                    })
                })
        }

    }

    render() {
        const wordform = this.props.wordform || 'wordform';
        return (
            <>
                <div style={{display: 'flex', flexDirection: 'horizontal'}}>
                    <Paper style={{maxWidth: '200px', padding: '1em', marginRight: '1em'}}>
                        <Typography id="label-frequency-filter" gutterBottom>
                            Filter all words below this frequency
                        </Typography>
                        <Slider
                          defaultValue={10}
                          aria-labelledby="label-frequency-filter"
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                    </Paper>
                    <Paper style={{maxWidth: '200px', padding: '1em'}}>
                        <Typography id="label-words-filter" gutterBottom>
                            Maximum # of words to display
                        </Typography>
                        <Slider
                          defaultValue={150}
                          aria-labelledby="label-words-filter"
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={100}
                          max={1500}
                        />
                    </Paper>
                </div>
                <div id="OCRPostCorrectionChart" />
            </>
        );
    }
}
