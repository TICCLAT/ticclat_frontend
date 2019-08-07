import React from 'react';
import * as d3 from "d3";
import LineGroup from './LineGroup';
import { IData } from '../../../types';

interface IProps {
    data: IData
}

const width = '100%';
const height = 500;

class BrushChart extends React.Component<IProps, IState> {

    public render() {

        const { data } = this.props;
        const metaData = data.metadata;
        const xDomain = [metaData.min_year, metaData.max_year] // will have min-year and max-year [metaData.min_year, metaDta.max_year]
        const xScale = d3.scaleTime().domain(xDomain).range([0, 500])
        const xAxis = d3.axisBottom(xScale);

        const yDomain = [metaData.min_freq, metaData.max_freq]  // will be min-freq and max-freq
        const yScale = d3.scaleTime().domain(xDomain).range([height, 0])
        // const { xScale, yScale } = this.state;
        const content = data.corpora.map(corpora => {
            return <LineGroup key={corpora.name} frequencies={corpora.frequencies} xScale={xScale} yScale={yScale} />
        })
        d3.select('.xAxis').call(xAxis);
        return (
            <div>
                <svg width={width} height={height}>
                    <g transform={'translate(70, 430)'}>
                        {content}
                    </g>
                    <g className='xAxis' transform={`translate(0, ${height})`}></g>
                </svg>
            </div>
        )
    }
}

export default BrushChart;