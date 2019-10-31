import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { drawChart } from './Charts/HorizonChart';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';

interface IState {
    info: any,
    sortingmethod: SortMethod,
    isLoading: boolean;
}

interface IProps {
    wordform: string
}

interface SortMethod {
    key: string,
    displayname: string
}

const SORTING_METHODS = [
    {key: 'frequency', displayname: 'Frequency'},
    {key: 'start-of-use-time', displayname: 'Start time'},
    {key: 'median-of-use-time', displayname: 'Median time'}
] as SortMethod[]

const DEFAULT_SORT_METHOD = SORTING_METHODS[0];

export default class HorizonChartContainer extends React.Component<IProps> {
    state: IState = {
        info: null,
        sortingmethod: DEFAULT_SORT_METHOD,
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

    public update() {
        const info = this.state.info;
        if (!this.state.isLoading && info && info.paradigms.length > 0) {
            document.getElementById('horizonchart')!.innerHTML = '';
            drawChart(info, this.state.sortingmethod.key);
        }
    }

    public async fetchData() {
        const { wordform } = this.props;
        if (wordform) {
            const response = await fetch(`${backendURL}/variants/${wordform}`);
            const responseData = await response.json();
            this.setState({ info: responseData, isLoading: false }, () => {
                this.update();
            })
        }
    }

    render() {
        const wordform = this.props.wordform || 'wordform';
        const { info, sortingmethod, isLoading } = this.state;
        let content = null;
        if (isLoading) {
            content = <LoadingIndicator />
        }
        else if (info !== null) {
            content = (info.paradigms.length > 0) ?
                (
                    <>
                        <div style={{display: 'flex', flexDirection: 'horizontal'}}>
                            <Paper style={{maxWidth: '400px', padding: '1em', marginRight: '1em'}}>
                                <Typography id="label-frequency-filter" gutterBottom>
                                    Sort the chart by:
                                </Typography>
                                <Select                                
                                    id="sorting-method"
                                    value={sortingmethod.key}
                                    onChange={(e, val) => {
                                        this.setState({sortingmethod: val as string}, this.update);                                        
                                    }}
                                >
                                {SORTING_METHODS.map((method, i) => {
                                    return (<MenuItem key={method.key} value={method.key}>{method.displayname}</MenuItem>) 
                                })}
                                </Select>
                                
                            </Paper>
                        </div>
                        <div id="horizonchart" />
                    </>
                ) : <Typography variant="subtitle2" align='center' style={{ padding: 10 }}>No corrections found for <em><strong>{wordform} </strong></em></Typography>


        }
        return content
    }
}
