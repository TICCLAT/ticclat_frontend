import React from 'react';
import { drawChart } from './Charts/HorizonChart';
import { backendURL } from '../settings';
import LoadingIndicator from './LoadingIndiacator';

interface IProps {
    wordform: string
}
export default class HorizonChartContainer extends React.Component<IProps> {
    state = {
        info: null,
        isLoading: true,
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
            fetch(`${backendURL}/variants/${wordform}`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ info: data, isLoading: false }, () => {
                        document.getElementById('horizonchart')!.innerHTML = '';
                        drawChart(data);
                    })
                })
        }

    }

    render() {
        const { isLoading } = this.state;
        let content = null;
        content = isLoading ? <LoadingIndicator /> : <div id="horizonchart" />
        return content
    }
}
