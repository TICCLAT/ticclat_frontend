import * as d3 from 'd3';
import { IData } from '../../../types';

export const drawChart = (info: IData) => {

    // Set Margins, width and Height for NGram
    const nGramMargin = { top: 10, right: 10, bottom: 100, left: 70 }
    const nGramWidth = 1000 - nGramMargin.left - nGramMargin.right
    const nGramHeight = 500 - nGramMargin.top - nGramMargin.bottom

    // Set Margins, width and Height for Brush
    const brushMargin = { top: 430, right: 10, bottom: 20, left: 70 }
    const brushHeight = 500 - brushMargin.top - brushMargin.bottom;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set Scales for NGram
    const nGramXScale = d3.scaleTime().range([0, nGramWidth])
    const nGramYScale = d3.scaleLinear().range([nGramHeight, 0])

    // Set Scales for brush
    const brushXScale = d3.scaleTime().range([0, nGramWidth])
    const brushYScale = d3.scaleLinear().range([brushHeight, 0])

    // Set X and Y axis for NGram
    const nGramXAxis = d3.axisBottom(nGramXScale)
    const nGramYAxis = d3.axisLeft(nGramYScale);

    // set X axis for brush
    const brushXAxis = d3.axisBottom(brushXScale)


    const brush = d3.brushX(brushXScale)
        .extent([[0, 0], [nGramWidth, brushHeight]])
        .on("brush", brushed);

    // set line for NGram
    const nGramLine = d3.line()
        .x(function (d) { return nGramXScale(d.year); })
        .y(function (d) { return nGramYScale(d.freq); });

    // set line for brush
    const brushLine = d3.line()
        .x((d) => { return brushXScale(d.year); })
        .y((d) => { return brushYScale(d.freq); });

    d3.select("#chart").selectAll("svg").remove()

    const svg = d3.select("#chart").append("svg")
        .attr("width", '100%')
        .attr("height", nGramHeight + nGramMargin.top + nGramMargin.bottom);

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", nGramWidth)
        .attr("height", nGramHeight);

    // set NGram
    const NGram = svg.append("g")
        .attr("transform", "translate(" + nGramMargin.left + "," + nGramMargin.top + ")")
        .attr('class', 'lines');

    // set brush chart
    const brushChart = svg.append("g")
        .attr("transform", "translate(" + brushMargin.left + "," + brushMargin.top + ")");

    const parseDate = d3.timeParse("%Y");

    if (info) {
        info.corpora.forEach((d) => {
            d.frequencies.forEach((d) => {
                d.year = parseDate(d.year!.toString());
                d.freq = +d.freq;
            });
        });

        const nGramXDomain = nGramXScale.domain(
            [
                parseDate(info.metadata.min_year),
                parseDate(info.metadata.max_year)
            ]
        );
        const nGramYDomain = nGramYScale.domain(
            [
                info.metadata.min_freq,
                info.metadata.max_freq
            ]
        );

        // set brush scale domain
        brushXScale.domain(nGramXScale.domain());
        brushYScale.domain(nGramYScale.domain());

        const nGramLineGroups = NGram.selectAll("g")
            .data(info.corpora)
            .enter().append("g")
            .attr('class', 'line-group')
            .on("mouseover", (d, i) => {
                svg.append("text")
                    .attr("class", "title-text")
                    .style("fill", color(i))
                    .text(d.name)
                    .attr("text-anchor", "middle")
                    .attr("x", (nGramWidth) / 2)
                    .attr("y", 15);
            })
            .on("mouseout", (d) => {
                svg.select(".title-text").remove();
            });

        const nGramlines = nGramLineGroups.append("path")
            .style('fill', 'none')
            .style('stroke-width', 2)
            .attr("class", "line")
            .attr("d", (d) => { return nGramLine(d.frequencies); })
            .style("stroke", (d, i) => { return color(i); })
            .attr("clip-path", "url(#clip)")

        NGram.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + nGramHeight + ")")
            .call(nGramXAxis)
            .append('text')
            .attr("x", nGramWidth / 2)
            .attr("y", 40)
            .attr("fill", "#000")
            .text("Year");;

        NGram.append("g")
            .attr("class", "y axis")
            .call(nGramYAxis)
            .append('text')
            .attr("x", -(nGramHeight / 2))
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text("Frequency");

        // set brush lines
        const brushLineGroups = brushChart.selectAll("g")
            .data(info.corpora)
            .enter().append("g");

        const brushLines = brushLineGroups.append("path")
            .style('fill', 'none')
            .attr("class", "contextline")
            .attr("d", (d) => { return brushLine(d.frequencies); })
            .style("stroke", (d) => { return color(d.name); })
            .attr("clip-path", "url(#clip)");


        // draw brush X axis

        brushChart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + brushHeight + ")")
            .call(brushXAxis);
        // set brush


        brushChart.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", brushHeight + 7);

    }


    function brushed() {
        nGramXScale.domain(d3.event.selection === null ? brushXScale.domain() : d3.event.selection.map(brushXScale.invert, brushXScale));
        NGram.selectAll("path.line").attr("d", function (d) {
            return nGramLine(d.frequencies)
        });
        NGram.select(".x.axis").call(nGramXAxis);
        NGram.select(".y.axis").call(nGramYAxis);
    }


}