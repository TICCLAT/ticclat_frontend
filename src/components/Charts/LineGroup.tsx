import React from 'react';
import * as d3 from "d3";
import Line from './Line';

interface IProps {
    frequencies: any,
    xScale: any,
    yScale: any;
}

class LineGroup extends React.Component<IProps> {

    render() {
        const { frequencies, xScale, yScale } = this.props;
        const path = d3.line().x((d) => xScale(d.year)).y((d) => yScale(d.freq))
        return (<Line path={path(frequencies)} color="#000" />)
    }
}

export default LineGroup;