import React from 'react';
import * as d3 from 'd3';

class Timeline extends React.Component {
    componentDidMount() {
        this.drawChart();
    }
    render() {
        return <div id="chart"></div>
    }
    drawChart() {

        var width = 1000;
        var height = 400;
        var margin = 70;
        var duration = 50;

        var lineOpacity = "0.25";
        var lineOpacityHover = "0.85";
        var otherLinesOpacityHover = "0.1";
        var lineStroke = "1.5px";
        var lineStrokeHover = "2.5px";

        var circleOpacity = '0.85';
        var circleOpacityOnLineHover = "0.25"
        var circleRadius = 3;
        var circleRadiusHover = 6;


        d3.json('src/data/data.json').then(function (info) {
            var parseDate = d3.timeParse("%Y");
            info.data.forEach(function (d) {
                d.data.forEach(function (d) {
                    d.year = parseDate(d.year);
                    d.freq = d.freq;
                });
            });

            var xScale = d3.scaleTime()
                .domain([
                    parseDate(info.metadata.min_year),
                    parseDate(info.metadata.max_year)
                ])
                .range([0, width - margin]);

            var yScale = d3.scaleLinear()
                .domain([
                    info.metadata.min_freq,
                    info.metadata.max_freq
                ])
                .range([height - margin, 0]);

            var color = d3.scaleOrdinal(d3.schemeCategory10);
            //var zoom = d3.zoom().scaleExtent([1, 1]).on("zoom", zoomed);

            var svg = d3.select("#chart").append("svg").attr("width", 1000)
                .attr("height", 500)
                .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
                }))
                .append('g')
                .attr("transform", `translate(${margin}, ${margin - 30})`);



            var line = d3.line()
                .x(d => xScale(d.year))
                .y(d => yScale(d.freq));

            let lines = svg.append('g')
                .attr('class', 'lines');

            lines.selectAll('.line-group')
                .data(info.data).enter()
                .append('g')
                .attr('class', 'line-group')
                .on("mouseover", function (d, i) {

                    svg.append("text")
                        .attr("class", "title-text")
                        .style("fill", color(i))
                        .text(d.name)
                        .attr("text-anchor", "middle")
                        .attr("x", (width - margin) / 2)
                        .attr("y", 5);
                })
                .on("mouseout", function (d) {
                    svg.select(".title-text").remove();
                })
                .append('path')
                .style('fill', 'none')
                .attr('class', 'line')
                .attr('d', d => line(d.data))
                .style('stroke', (d, i) => color(i))
                .style('opacity', lineOpacity)
                .on("mouseover", function (d) {
                    d3.selectAll('.line')
                        .style('opacity', otherLinesOpacityHover);
                    d3.selectAll('.circle')
                        .style('opacity', circleOpacityOnLineHover);
                    d3.select(this)
                        .style('opacity', lineOpacityHover)
                        .style("stroke-width", lineStrokeHover)
                        .style("cursor", "pointer");
                })
                .on("mouseout", function (d) {
                    d3.selectAll(".line")
                        .style('opacity', lineOpacity);
                    d3.selectAll('.circle')
                        .style('opacity', circleOpacity);
                    d3.select(this)
                        .style("stroke-width", lineStroke)
                        .style("cursor", "none");
                });



            lines.selectAll("circle-group")
                .data(info.data).enter()
                .append("g")
                .style("fill", (d, i) => color(i))
                .selectAll("circle")
                .data(d => d.data).enter()
                .append("g")
                .attr("class", "circle")
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .append("text")
                        .attr("class", "text")
                        .text(`${d.freq}`)
                        .attr("x", d => xScale(d.year) + 5)
                        .attr("y", d => yScale(d.freq) - 10);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .transition()
                        .duration(duration)
                        .selectAll(".text").remove();
                })
                .append("circle")
                .attr("cx", d => xScale(d.year))
                .attr("cy", d => yScale(d.freq))
                .attr("r", circleRadius)
                .style('opacity', circleOpacity)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr("r", circleRadiusHover);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr("r", circleRadius);
                });



            var xAxis = d3.axisBottom(xScale).ticks(20);
            var yAxis = d3.axisLeft(yScale).ticks(20);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0, ${height - margin})`)
                .call(xAxis)
                .append('text')
                .attr("x", 700)
                .attr("y", 40)
                .attr("fill", "#000")
                .text("Year");
            ;

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append('text')
                .attr("x", -120)
                .attr("y", -50)
                .attr("transform", "rotate(-90)")
                .attr("fill", "#000")
                .text("Frequency");

        })
    }
}

export default Timeline;