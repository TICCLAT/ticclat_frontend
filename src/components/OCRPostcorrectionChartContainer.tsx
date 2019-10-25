import React from 'react';
import { drawChart } from './Charts/OCRPostCorrection/OCRPostCorrectionChart';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';
import LoadingIndicator from './LoadingIndiacator';
interface IState {
    info: any,
    isLoading: boolean;
}
interface IProps {
    wordform: string
}
export default class OCRPostCorrectionChartContainer extends React.Component<IProps, IState> {
    state = {
        info: null,
        isLoading: true

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
            fetch(`${backendURL}/corrections/${wordform}`)
                .then(results => {
                    return results.json();
                })
                .then(data => {

                    this.setState({ info: data, isLoading: false }, () => {
                        if ((data.corrections.length > 0) && (data.paradigms.length > 0)) {
                            document.getElementById('OCRPostCorrectionChart')!.innerHTML = '';
                            drawChart(data);
                        }
                    })
                }

                )
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

                        <div id="OCRPostCorrectionChart" />
                    </>
                ) : <Typography variant="subtitle2" align='center' style={{ padding: 10 }}>No corrections found for <em><strong>{wordform} </strong></em></Typography>


        }
        return content
    }
}
