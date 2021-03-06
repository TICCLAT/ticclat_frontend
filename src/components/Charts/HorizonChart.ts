import * as d3 from 'd3';
import { IVariantsQueryData, ILemma, IVariant, ICorpus, ICorpusFrequencyEntry } from '../../../types/'

interface IHorizonchartFrequencyEntry {
    name: string,
    date: Date,
    value: any
}

interface IHorizonchartData {
    key: string,
    values: IHorizonchartFrequencyEntry[],
    sum: number,
    startTime: Date,
    medianTime: Date,
    clip: any,
    path: any
}

let clips = 0;

function clipuid() {
    const clipid = clips++;
    const id = 'O-clip-' + clipid;

    return { id, href: window.location + "#" + id, s: "url(" + window.location + "#" + id + ")" }
}

let paths = 0;

function pathuid() {
    const pathid = paths++;
    const id = 'O-path-' + pathid;

    return { id, href: window.location + "#" + id, s: "url(" + window.location + "#" + id + ")" }
}

export const drawChart = (variantsData: IVariantsQueryData, sortingmethod: string) => {
    const horizonchartMargin = ({ top: 30, right: 10, bottom: 0, left: 10 });
    const horizonchartWidth = parseInt(d3.select('#horizonchart').style('width'), 10);

    const parseDate = d3.timeParse("%Y");

    const horizonchartStep = 50;
    const horizonchartOverlap = 7;

    const horizonchartScheme = "schemeReds";
    const horizonchartColor = (i: any) => d3[horizonchartScheme][Math.max(3, horizonchartOverlap)][i + Math.max(0, 3 - horizonchartOverlap)];

    const getParadigms = (wordformData: IVariantsQueryData): IHorizonchartData[] => {
        const wordforms = wordformData.paradigms.map((d: ILemma) => d.lemma);
        const result: IHorizonchartData[] = [];

        wordforms.forEach((wordform) => {
            const paradigm = wordformData.paradigms[wordforms.indexOf(wordform)];
            const variants = paradigm.variants;

            variants.forEach((variant: IVariant) => {
                const allFrequencies = {};
                let sum = 0;
                variant.corpora.forEach((corpus: ICorpus) => {
                    corpus.frequencies.forEach((entry: ICorpusFrequencyEntry) => {
                        const date = parseDate(entry.year);
                        if (date !== null) {
                            if (allFrequencies[date.toISOString()]) {
                                allFrequencies[date.toISOString()] += entry.freq;
                            } else {
                                allFrequencies[date.toISOString()] = entry.freq;
                            }
                            sum += entry.freq;
                        }
                    });
                });
                const listedFrequencies: IHorizonchartFrequencyEntry[] = [];
                for (const [key, value] of Object.entries(allFrequencies)) {
                    listedFrequencies.push({ name: variant.wordform, date: new Date(key), value });
                }
                
                listedFrequencies.sort((a, b) => a.date.getTime() - b.date.getTime());                
                if (listedFrequencies.length > 0) {
                    result.push({ key: variant.wordform, values: listedFrequencies, sum, startTime: listedFrequencies[0].date, medianTime: listedFrequencies[Math.floor(listedFrequencies.length/2)].date ,clip: {}, path: {} });
                }
            });
        });
        const keys = result.map(r => r.key);
        const deduplicatedResult = result.filter((value, index, self) => keys.indexOf(value.key) === index)

        if (sortingmethod === 'frequency') {
            deduplicatedResult.sort((a, b) => b.sum - a.sum);
        } else if (sortingmethod === 'start-of-use-time') { 
            deduplicatedResult.sort((a, b) => a.startTime.getUTCFullYear() - b.startTime.getUTCFullYear());
        } else if (sortingmethod === 'median-of-use-time') { 
            deduplicatedResult.sort((a, b) => a.medianTime.getUTCFullYear() - b.medianTime.getUTCFullYear());
        } else {
            deduplicatedResult.sort((a, b) => b.sum - a.sum);
        }         

        return deduplicatedResult;
    }

    if (variantsData) {
        const horizonchartData = getParadigms(variantsData);

        const horizonchartHeight = horizonchartStep * (horizonchartData.length + 1);

        const svg = d3.select("#horizonchart").append("svg")
            .attr("width", horizonchartWidth + horizonchartMargin.left + horizonchartMargin.right)
            .attr("height", horizonchartHeight + horizonchartMargin.top + horizonchartMargin.bottom)
            .style("font", "10px sans-serif");

        const minDate = parseDate(variantsData.metadata.min_year.toString());
        const maxDate = parseDate(variantsData.metadata.max_year.toString());
        if (minDate !== null && maxDate !== null) {
            const horizonchartX = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, horizonchartWidth])
                .nice();

            const horizonchartY = d3.scaleLinear()
                .domain([0, d3.max(horizonchartData, d => d3.max(d.values, d => d.value))])
                .range([0, -horizonchartOverlap * horizonchartStep]);

            const horizonchartXAxis = (g: any) => g
                .attr("transform", `translate(0,${horizonchartMargin.top})`)
                .call(d3.axisTop(horizonchartX).ticks(horizonchartWidth / 80).tickSizeOuter(0))
                .call((g: any) => g.selectAll(".tick").filter((d: any) => horizonchartX(d) < horizonchartMargin.left || horizonchartX(d) >= horizonchartWidth - horizonchartMargin.right).remove())
                .call((g: any) => g.select(".domain").remove());

            const horizonchartArea = d3.area()
                .curve(d3.curveBasis)
                .defined((d: any) => !isNaN(d.value))
                .x((d: any) => horizonchartX(d.date))
                .y0(0)
                .y1((d: any) => horizonchartY(d.value));

            const g = svg.append("g")
                .selectAll("g")
                .data(horizonchartData)
                .join("g")
                .attr("transform", (d: any, i: number) => `translate(0,${i * (horizonchartStep + 1) + horizonchartMargin.top})`);

            g.append("clipPath")
                .attr("id", (d: any) => (d.clip = clipuid()).id)
                .append("rect")
                .attr("width", horizonchartWidth)
                .attr("height", horizonchartStep);

            g.append("defs").append("path")
                .attr("id", (d: any) => (d.path = pathuid()).id)
                .attr("d", (d: any) => horizonchartArea(d.values));

            g.append("g")
                .attr("clip-path", (d: any) => d.clip.s)
                .selectAll("use")
                .data((d: any) => new Array(horizonchartOverlap).fill(d))
                .join("use")
                .attr("fill", (d: any, i: number) => horizonchartColor(i))
                .attr("transform", (d: any, i: number) => `translate(0,${(i + 1) * horizonchartStep})`)
                .attr("xlink:href", (d: any) => d.path.href);

            g.append("text")
                .attr("x", 4)
                .attr("y", horizonchartStep / 2)
                .attr("dy", "0.35em")
                .text((d: any) => d.key);

            svg.append("g")
                .call(horizonchartXAxis);
        }
    }
}
