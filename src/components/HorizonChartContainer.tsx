import React from 'react';
import { drawChart } from './Charts/HorizonChart';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';

interface IProps {
    wordform: string
}
export default class HorizonChartContainer extends React.Component<IProps> {
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
        fetch(`${backendURL}/variants/${wordform}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ info: data }, () => drawChart(data))
            })

    }

    render() {
        const { wordform } = this.props;
        return (
            <>
                <div id="horizonchart"></div>
                <Typography variant="h5" align='center' style={{ margin: 10 }}> {wordform.charAt(0).toUpperCase() + wordform.slice(1)}</Typography>
            </>
        );
    }
}