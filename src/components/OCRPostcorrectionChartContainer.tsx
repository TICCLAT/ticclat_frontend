import React from 'react';
import { drawChart } from './Charts/OCRPostCorrection/OCRPostCorrectionChart';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';

interface IProps {
    wordform: string
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
            fetch(`${backendURL}/variants/${wordform}`)
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
                <Typography variant="h5" align='center' style={{ margin: 10 }}> {wordform}</Typography>
                <div id="OCRPostCorrectionChart" />
            </>
        );
    }
}
