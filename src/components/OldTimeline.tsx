import * as d3 from 'd3';
import React from 'react';
import { IData } from '../../types/';
import { backendURL } from '../settings';
import { Typography } from '@material-ui/core';
interface IState {
    info: IData

}
interface IProps {
    wordform: string
}

class Timeline extends React.Component<IProps, IState> {

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
        fetch(`${backendURL}/word_frequency_per_corpus_per_year/${wordform}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ info: data }, () => this.setScales())
            })

    }
    public render() {

        return (
            <>
                <div id="chart" />
                <Typography variant="h5" align='center' style={{ margin: 10 }}> {this.props.wordform}</Typography>
            </>
        )

    }
    public setScales() {
        var focusMargin = { top: 10, right: 10, bottom: 100, left: 70 },
            contextMargin = { top: 430, right: 10, bottom: 20, left: 70 },
            focusWidth = 1000 - focusMargin.left - focusMargin.right,
            focusHeight = 500 - focusMargin.top - focusMargin.bottom,
            contextHeight = 500 - contextMargin.top - contextMargin.bottom;


        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var focusX = d3.scaleTime().range([0, focusWidth]),
            contextX = d3.scaleTime().range([0, focusWidth]),
            focusY = d3.scaleLinear().range([focusHeight, 0]),
            contextY = d3.scaleLinear().range([contextHeight, 0]);

        var focusXAxis = d3.axisBottom(focusX),
            contextXAxis = d3.axisBottom(contextX),
            focusYAxis = d3.axisLeft(focusY);


        var focusLine = d3.line()
            .x(function (d) { return focusX(d.year); })
            .y(function (d) { return focusY(d.freq); });

        var contextLine = d3.line()
            .x(function (d) { return contextX(d.year); })
            .y(function (d) { return contextY(d.freq); });
        var existingSvg = d3.select("#chart").selectAll("svg").remove()
        var svg = d3.select("#chart").append("svg")
            .attr("width", '100%')
            .attr("height", focusHeight + focusMargin.top + focusMargin.bottom);

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", focusWidth)
            .attr("height", focusHeight);

        var focus = svg.append("g")
            .attr("transform", "translate(" + focusMargin.left + "," + focusMargin.top + ")")
            .attr('class', 'lines');
        // focus.exit().remove()
        var context = svg.append("g")
            .attr("transform", "translate(" + contextMargin.left + "," + contextMargin.top + ")");
        // context.exit().remove()
        const parseDate = d3.timeParse("%Y");
        const info = this.state.info;
        const brush = () => {
            debugger;
            focusX.domain(d3.event.selection === null ? contextX.domain() : d3.event.selection.map(contextX.invert, contextX));
            focus.selectAll("path.line").attr("d", function (d) {
                return focusLine(d.frequencies)
            });
            focus.select(".x.axis").call(focusXAxis);
            focus.select(".y.axis").call(focusYAxis);
        }
        const brushed = d3.brushX(contextX)
            .on("brush", brush);

        if (info) {
            info.corpora.forEach((d) => {
                d.frequencies.forEach((d) => {
                    d.year = parseDate(d.year!.toString());
                    d.freq = +d.freq;
                });
            });
            debugger;
            var intialXDomain = focusX.domain([parseDate(info.metadata.min_year),
            parseDate(info.metadata.max_year)]);
            var initiaYDomain = focusY.domain([
                info.metadata.min_freq,
                info.metadata.max_freq
            ]);
            contextX.domain(focusX.domain());
            contextY.domain(focusY.domain());

            var focuslineGroups = focus.selectAll("g")
                .data(info.corpora)
                .enter().append("g")
                .attr('class', 'line-group')
                .on("mouseover", function (d, i) {

                    svg.append("text")
                        .attr("class", "title-text")
                        .style("fill", color(i))
                        .text(d.name)
                        .attr("text-anchor", "middle")
                        .attr("x", (focusWidth) / 2)
                        .attr("y", 15);
                })
                .on("mouseout", function (d) {
                    svg.select(".title-text").remove();
                });
            // focuslineGroups.exit().remove()

            var focuslines = focuslineGroups.append("path")
                .style('fill', 'none')
                .style('stroke-width', 2)
                .attr("class", "line")
                .attr("d", function (d) { return focusLine(d.frequencies); })
                .style("stroke", function (d, i) { return color(i); })
                .attr("clip-path", "url(#clip)")

            focus.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + focusHeight + ")")
                .call(focusXAxis)
                .append('text')
                .attr("x", focusWidth / 2)
                .attr("y", 40)
                .attr("fill", "#000")
                .text("Year");;

            focus.append("g")
                .attr("class", "y axis")
                .call(focusYAxis)
                .append('text')
                .attr("x", -(focusHeight / 2))
                .attr("y", -50)
                .attr("transform", "rotate(-90)")
                .attr("fill", "#000")
                .text("Frequency");;

            var contextlineGroups = context.selectAll("g")
                .data(info.corpora)
                .enter().append("g");
            // contextlineGroups.exit().remove()

            var contextLines = contextlineGroups.append("path")
                .style('fill', 'none')
                .attr("class", "contextline")
                .attr("d", function (d) { return contextLine(d.frequencies); })
                .style("stroke", function (d) { return color(d.name); })
                .attr("clip-path", "url(#clip)");

            context.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + contextHeight + ")")
                .call(contextXAxis);

            context.append("g")
                .attr("class", "x brush")
                .call(brushed)
                .selectAll("rect")
                .enter()
                .attr("y", -6)
                .attr("height", contextHeight + 7);
        }

    }

}

export default Timeline;