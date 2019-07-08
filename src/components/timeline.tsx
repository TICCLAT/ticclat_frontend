import React from 'react';
import * as d3 from 'd3';
import { IData } from '../../types'
import { Typography } from '@material-ui/core';
interface IState {
    data: IData | null
}
class Timeline extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        fetch('http://145.100.59.165:8000/word_frequency_per_corpus_per_year/regering')
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ data })
                this.drawChart()
            })
    }

    render() {
        const { data } = this.state;
        if (data) {
            let title = data.wordform
            title = title.charAt(0).toUpperCase() + title.slice(1);
            return (
                <>
                    <div id="chart" ></div>
                    <Typography variant="h5" align='center' style={{ margin: 10 }}> {title}</Typography>
                </>
            )
        }
        return null
    }
    drawChart() {
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

        var brush = d3.brushX(contextX)
            .on("brush", brush);

        var focusLine = d3.line()
            .x(function (d) { return focusX(d.year); })
            .y(function (d) { return focusY(d.freq); });

        var contextLine = d3.line()
            .x(function (d) { return contextX(d.year); })
            .y(function (d) { return contextY(d.freq); });

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

        var context = svg.append("g")
            .attr("transform", "translate(" + contextMargin.left + "," + contextMargin.top + ")");

        d3.json('http://145.100.59.165:8000/word_frequency_per_corpus_per_year/regering').then(function (info) {
            var parseDate = d3.timeParse("%Y");
            info.corpora.forEach(function (d) {
                d.frequencies.forEach(function (d) {
                    d.year = parseDate(d.year);
                    d.freq = +d.freq;
                });
            });


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
                .call(brush)
                .selectAll("rect")
                .attr("y", -6)
                .attr("height", contextHeight + 7);


        });

        function brush() {
            focusX.domain(d3.event.selection === null ? contextX.domain() : d3.event.selection.map(contextX.invert, contextX));
            focus.selectAll("path.line").attr("d", function (d) {
                return focusLine(d.frequencies)
            });
            focus.select(".x.axis").call(focusXAxis);
            focus.select(".y.axis").call(focusYAxis);
        }


    }
}

export default Timeline;