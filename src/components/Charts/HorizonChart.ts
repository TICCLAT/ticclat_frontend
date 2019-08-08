import * as d3 from 'd3';
import { Guid } from "guid-typescript";

import { IVariantsQueryData, ILemma, IVariant, ICorpus, ICorpusFrequencyEntry } from '../../../types/'

interface IHorizonchartFrequencyEntry {
    name: string,
    date: Date,
    value: any
}

interface IHorizonchartData {
    key: string,
    values: Array<IHorizonchartFrequencyEntry>,
    sum: number,
    clip: any,
    path: any
}

var clips = 0;

function clipuid () {
    const clipid = clips++;
    const id = 'O-clip-'+clipid;

    return {id, href: window.location +"#" + id , s: "url(" + window.location +"#" + id +")"}
}

var paths = 0;

function pathuid () {
    const pathid = paths++;
    const id = 'O-path-'+pathid;

    return {id, href: window.location +"#" + id , s: "url(" + window.location +"#" + id +")"}
}

export const drawChart = (variants_data: IVariantsQueryData, chart: HTMLDivElement) => {
    const horizonchart_margin = ({ top: 30, right: 10, bottom: 0, left: 10 });
    const horizonchart_width = 800;

    var parseDate = d3.timeParse("%Y");

    var horizonchart_step = 50;
    var horizonchart_overlap = 7;

    var horizonchart_scheme = "schemeReds";
    var horizonchart_color = (i: any) => d3[horizonchart_scheme][Math.max(3, horizonchart_overlap)][i + Math.max(0, 3 - horizonchart_overlap)];

    var getParadigms = function (wordform_data: IVariantsQueryData): Array<IHorizonchartData> {
        const wordforms = wordform_data.paradigms.map((d: ILemma) => d.lemma);
        const result: Array<IHorizonchartData> = [];

        wordforms.forEach(function (wordform) {
            const paradigm = wordform_data.paradigms[wordforms.indexOf(wordform)];
            const variants = paradigm.variants;

            variants.forEach(function (variant: IVariant) {
                const all_frequencies = {};
                var sum = 0;
                variant.corpora.forEach(function (corpus: ICorpus) {
                    corpus.frequencies.forEach(function (entry: ICorpusFrequencyEntry) {
                        const date = parseDate(entry.year);
                        if (date !== null) {
                            if (all_frequencies[date.toISOString()]) {
                                all_frequencies[date.toISOString()] += entry.freq;
                            } else {
                                all_frequencies[date.toISOString()] = entry.freq;
                            }
                            sum += entry.freq;
                        }
                    });
                });
                const listed_frequencies: Array<IHorizonchartFrequencyEntry> = [];
                for (let [key, value] of Object.entries(all_frequencies)) {
                    listed_frequencies.push({ name: variant.wordform, date: new Date(key), value });
                }
                listed_frequencies.sort((a, b) => a.date.getTime() - b.date.getTime());
                if (listed_frequencies.length > 0) {
                    result.push({ key: variant.wordform, values: listed_frequencies, sum, clip: {}, path: {} });
                }
            });
        });
        result.sort((a, b) => b.sum - a.sum);
        return result;
    }

    if (variants_data) {
        const horizonchart_data = getParadigms(variants_data);

        var horizonchart_height = horizonchart_step * (horizonchart_data.length + 1);

        var svg = d3.select("#horizonchart").append("svg")
            .attr("width", horizonchart_width + horizonchart_margin.left + horizonchart_margin.right)
            .attr("height", horizonchart_height + horizonchart_margin.top + horizonchart_margin.bottom)
            .style("font", "10px sans-serif");

        const minDate = parseDate(variants_data.metadata.min_year.toString());
        const maxDate = parseDate(variants_data.metadata.max_year.toString());
        if (minDate !== null && maxDate !== null) {
            var horizonchart_x = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, horizonchart_width])
                .nice();

            var horizonchart_y = d3.scaleLinear()
                .domain([0, d3.max(horizonchart_data, d => d3.max(d.values, d => d.value))])
                .range([0, -horizonchart_overlap * horizonchart_step]);

            var horizonchart_xAxis = (g: any) => g
                .attr("transform", `translate(0,${horizonchart_margin.top})`)
                .call(d3.axisTop(horizonchart_x).ticks(horizonchart_width / 80).tickSizeOuter(0))
                .call((g: any) => g.selectAll(".tick").filter((d: any) => horizonchart_x(d) < horizonchart_margin.left || horizonchart_x(d) >= horizonchart_width - horizonchart_margin.right).remove())
                .call((g: any) => g.select(".domain").remove());

            var horizonchart_area = d3.area()
                .curve(d3.curveBasis)
                .defined((d: any) => !isNaN(d.value))
                .x((d: any) => horizonchart_x(d.date))
                .y0(0)
                .y1((d: any) => horizonchart_y(d.value));

            const g = svg.append("g")
                .selectAll("g")
                .data(horizonchart_data)
                .join("g")
                .attr("transform", (d: any, i: number) => `translate(0,${i * (horizonchart_step + 1) + horizonchart_margin.top})`);

            g.append("clipPath")
                .attr("id", (d: any) => (d.clip = clipuid()).id)
                .append("rect")
                .attr("width", horizonchart_width)
                .attr("height", horizonchart_step);

            g.append("defs").append("path")
                .attr("id", (d: any) => (d.path = pathuid()).id)
                .attr("d", (d: any) => horizonchart_area(d.values));

            g.append("g")
                .attr("clip-path", (d: any) => d.clip.s)
                .selectAll("use")
                .data((d: any) => new Array(horizonchart_overlap).fill(d))
                .join("use")
                .attr("fill", (d: any, i: number) => horizonchart_color(i))
                .attr("transform", (d: any, i: number) => `translate(0,${(i + 1) * horizonchart_step})`)
                .attr("xlink:href", (d: any) => d.path.href);

            g.append("text")
                .attr("x", 4)
                .attr("y", horizonchart_step / 2)
                .attr("dy", "0.35em")
                .text((d: any) => d.key);

            svg.append("g")
                .call(horizonchart_xAxis);
        }
    }
}
