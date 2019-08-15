import * as d3 from 'd3';
import { IData } from '../../../types';

export const drawChart = (info: IData) => {
    // Set Margins and Diemnsions of graph
    const margin = { top: 10, right: 10, bottom: 100, left: 30 }
    const width = 1000 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    // set Color Scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // Function to parse date
    const parseDate = d3.timeParse("%Y");
    // Create data array
    const corpora = info.corpora
    const data = corpora.map(corpora => {
        return {
            name: corpora.name,
            frequencies: corpora.frequencies.map(d => {
                return {
                    year: parseDate(d.year),
                    frequency: +d.freq
                }
            })
        }
    });
    // define x and y axis scale
    const XScale = d3.scaleTime().range([0, width])
    const YScale = d3.scaleLinear().range([height, 0])
    // set domain for x and y scales
    XScale.domain(
        [
            parseDate(info.metadata.min_year),
            parseDate(info.metadata.max_year)
        ]
    );
    YScale.domain(
        [
            info.metadata.min_freq,
            info.metadata.max_freq
        ]
    );
    // set Axis X and Y
    const XAxis = d3.axisBottom(XScale)
    const YAxis = d3.axisLeft(YScale);
    d3.select("#chart").selectAll("svg").remove()
    // Append svg object to the body of page
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);
    //Set line
    const Line = d3.line()
        .x((d) => XScale(d.year))
        .y((d) => YScale(d.frequency));



    // create Line Group to contain all lines and axis
    const ScatterPlotChart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('class', 'lines');


    // Craete Line Groups
    const LineGroups = ScatterPlotChart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr('class', 'line-group')
    // Draw Lines
    LineGroups.append("path")
        .style('fill', 'none')
        .style('stroke-width', 2)
        .attr("class", "line")
        .attr("d", (d) => Line(d.frequencies))
        .style("stroke", (d, i) => color(d.name))
        .attr("clip-path", "url(#clip)")
    // Add the data points
    ScatterPlotChart.selectAll("data-points")
        .data(data)
        .enter()
        .append("g")
        .style("stroke", (d) => color(d.name))
        .style("fill", "none")
        // enter in frequencies
        .selectAll("points")
        .data((d) => d.frequencies)
        .enter()
        .append("circle")
        .attr("cx", (d) => XScale(d.year))
        .attr("cy", (d) => YScale(d.frequency))
        .attr("r", 5)

    // draw X axis and Y axis on ScatterPlotChart
    ScatterPlotChart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(XAxis)
        .append('text')
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "#000")
        .text("Year");;

    ScatterPlotChart.append("g")
        .attr("class", "y axis")
        .call(YAxis)
        .append('text')
        .attr("x", -(height / 2))
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Frequency");


}