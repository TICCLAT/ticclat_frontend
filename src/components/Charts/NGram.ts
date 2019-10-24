import * as d3 from 'd3';
import { IData, ICorpus } from '../../../types';

export class NGramChart {
    domainXMin = 0;
    domainXMax = 0;
    initialized = false;

    // Set Margins, width and Height for NGram
    currentWidth = parseInt(d3.select('#chart').style('width'), 10);

    nGramMargin = { top: 20, right: 20, bottom: 150, left: 70 }
    nGramWidth = this.currentWidth - this.nGramMargin.left - this.nGramMargin.right
    nGramHeight = 600 - this.nGramMargin.top - this.nGramMargin.bottom

    // Set Margins, width and Height for Brush
    brushMargin = { top: 530, right: 20, bottom: 30, left: 70 }
    brushHeight = 600 - this.brushMargin.top - this.brushMargin.bottom;

    color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set Scales for NGram
    nGramXScale = d3.scaleTime().range([0, this.nGramWidth])
    nGramYScale = d3.scaleLinear().range([this.nGramHeight, 0])

    // Set Scales for brush
    brushXScale = d3.scaleTime().range([0, this.nGramWidth])
    brushYScale = d3.scaleLinear().range([this.brushHeight, 0])

    // Set X and Y axis for NGram
    nGramXAxis = d3.axisBottom(this.nGramXScale)
    nGramYAxis = d3.axisLeft(this.nGramYScale);

    // set X axis for brush
    brushXAxis = d3.axisBottom(this.brushXScale);

    // time parsing function
    parseDate = d3.timeParse("%Y");

    // Object to hold data
    chartData: IData = { corpora: [], metadata: { max_freq: 0, max_year: 0, min_freq: 0, min_year: 0 }, wordform: "" };

    // chart bases
    svg = d3.select("#chart").append("svg");
    nGram = this.svg.append("g");
    brushChart = this.svg.append("g");

    init(info: IData) {
        // Save the initial state of the domain fro the n-gram chart so we can reset
        this.domainXMin = info.metadata.min_year;
        this.domainXMax = info.metadata.max_year;

        info.corpora.forEach((d: ICorpus) => {
            d.frequencies.forEach((item: any) => {
                const newDate = this.parseDate(item.year!.toString());
                item.year = newDate !== null ? newDate : new Date();
                item.freq = +item.freq;
            });
        });

        this.chartData = info;

        this.initialized = true;
    }

    brush = d3.brushX()
        .extent([[0, 0], [this.nGramWidth, this.brushHeight]])
        .on("end", this.brushed.bind(this))


    clear() {
        d3.select("#chart").selectAll("svg").remove();
        this.setupChart();
    }

    draw() {
        if (this.initialized) {
            this.clear();
            this.setupNGram();
            this.setupBrushChart();
            this.ngramUpdate();
            this.drawBrushChartContents();
        }
    }

    setupChart() {
        this.svg = d3.select("#chart").append("svg");

        this.svg
            .attr("width", this.currentWidth)
            .attr("height", this.nGramHeight + this.nGramMargin.top + this.nGramMargin.bottom)

        this.svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", this.nGramWidth)
            .attr("height", this.nGramHeight);
    }

    setupNGram() {
        this.nGram = this.svg.append("g")
            .attr("transform", "translate(" + this.nGramMargin.left + "," + this.nGramMargin.top + ")")
            .attr('class', 'ngramChart');

        const minDate = this.parseDate('' + this.chartData.metadata.min_year);
        const maxDate = this.parseDate('' + this.chartData.metadata.max_year);

        if (minDate && maxDate) {
            this.nGramXScale.domain([minDate, maxDate]);
        }

        this.nGramYScale.domain([this.chartData.metadata.min_freq, this.chartData.metadata.max_freq]);

        this.nGram.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.nGramHeight + ")")
            .call(this.nGramXAxis)
            .append('text')
            .attr("x", this.nGramWidth / 2)
            .attr("y", 40)
            .attr("fill", "#000")
            .text("Year");

        this.nGram.append("g")
            .attr("class", "y axis")
            .call(this.nGramYAxis)
            .append('text')
            .attr("x", -(this.nGramHeight / 2))
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text("Relative Frequency");

        // Legends for NGram
        const legends = this.nGram.selectAll(".legends")
            .data(this.chartData.corpora)
            .enter().append("g")
            .attr("transform", (d, i) => "translate(" + (this.nGramMargin.left + this.nGramMargin.right + 60) + "," + (this.nGramMargin.top - 40) + ")")

        legends.append('rect')
            .attr('fill', (d, i) => this.color(d.name))     //   const color = d3.scaleOrdinal(d3.schemeCategory10);
            .attr('height', 15)
            .attr('width', 15);

        legends.append('text')
            .attr('x', 18)
            .attr('y', 10)
            .attr('dy', '.15em')
            .text((d, i) => d.name)
            .style('text-anchor', 'start')
            .style('font-size', 14)
            .style("fill", (d: any) => this.color(d.name));

        // Calculate dynamic x position for legends
        const padding = 10;
        const data = this.chartData.corpora
        legends.attr('transform', (d, i) => {
            return 'translate(' + (d3.sum(data, (e, j) => {
                if (j < i) { return legends.nodes()[j].getBBox().width; } else { return 0; }
            }) + padding * i) + ',-20)';
        });

    }

    setupBrushChart() {
        this.brushChart = this.svg.append("g")
            .attr("class", "brush")
            .attr("transform", "translate(" + this.brushMargin.left + "," + this.brushMargin.top + ")");

        this.brushXScale.domain(this.nGramXScale.domain());
        this.brushYScale.domain(this.nGramYScale.domain());

        this.brushChart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.brushHeight + ")")
            .call(this.brushXAxis);


        this.brushChart.append("g")
            .attr("class", "x brush")
            .call(this.brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", this.brushHeight + 7);
    }

    nGramLine = d3.line()
        .x((d: any) => {
            return this.nGramXScale(d.year)
        })
        .y((d: any) => this.nGramYScale(d.freq));

    ngramUpdate() {
        const existingLineGroups = this.nGram.selectAll('g.ngramCorpus')
        existingLineGroups.remove()
        const nGramLineGroups = this.nGram.append("g")
            .attr('class', 'ngramCorpus')
            .selectAll("g")
            .data(this.chartData.corpora)
            .enter().append("g")
            .attr('class', 'line-group');

        nGramLineGroups.append("path")
            .style('fill', 'none')
            .style('stroke-width', 2)
            .style("stroke-dasharray", ("3, 3"))
            .attr("class", "line")
            .attr("d", (d: any) => this.nGramLine(d.frequencies))
            .attr("data-legend", (d) => d.name)
            .style("stroke", (d: any, i: number) => this.color(d.name))
            .attr("clip-path", "url(#clip)");

        // Add the data points

        const pointGroup = nGramLineGroups.append("g")
            .attr('class', 'pointGroup')
        pointGroup
            .append("g")
            .style("stroke", (d: any) => this.color(d.name))
            .style("fill", (d: any) => this.color(d.name))
            .selectAll("circle")
            .data((d: any) => d.frequencies)
            .enter()
            .filter(d => (this.nGramXScale(d.year) >= 0 && this.nGramXScale(d.year) <= this.nGramWidth))
            .append("circle")
            .attr("class", "circle")
            .attr("cx", (d: any) => {
                return this.nGramXScale(d.year)
            })
            .attr("cy", (d: any) => this.nGramYScale(d.freq))
            .attr("r", 3)
            .on("mouseover", (d: any, i: number) => {
                nGramLineGroups.append("text")
                    .attr("class", "frequency-text")
                    .attr("pointer-events", "none")
                    .text(d.freq.toPrecision(3))
                    .attr("text-anchor", "middle")
                    .attr("x", this.nGramXScale(d.year))
                    .attr("y", (this.nGramYScale(d.freq) - 10));
            })
            .on("mouseout", (d: any) => {
                nGramLineGroups.select(".frequency-text").remove();
            });


    }

    drawBrushChartContents() {
        const brushLineGroups = this.brushChart.append("g")
            .attr("class", "brushLinegroups")
            .selectAll("g")
            .data(this.chartData.corpora)
            .enter().append("g");

        const brushLine = d3.line()
            .x((d: any) => this.brushXScale(d.year))
            .y((d: any) => this.brushYScale(d.freq));

        brushLineGroups.append("path")
            .style('fill', 'none')
            .attr("class", "contextline")
            .attr("d", (d: any) => brushLine(d.frequencies))
            .style("stroke", (d: any) => this.color(d.name))
            .attr("clip-path", "url(#clip)");

    }

    brushed() {
        const selection = d3.event.selection;

        if (selection) {
            this.nGramXScale.domain(selection.map(this.brushXScale.invert, this.brushXScale));
        } else {
            const minDate = this.parseDate('' + this.chartData.metadata.min_year);
            const maxDate = this.parseDate('' + this.chartData.metadata.max_year);

            if (minDate && maxDate) {
                this.nGramXScale.domain([minDate, maxDate]);
            }
        }
        this.nGram.select(".x.axis").call(this.nGramXAxis as any);
        this.nGram.select(".y.axis").call(this.nGramYAxis as any);
        this.ngramUpdate();
    }
}