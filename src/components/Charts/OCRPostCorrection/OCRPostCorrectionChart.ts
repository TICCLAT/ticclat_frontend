import * as d3 from 'd3';
import * as d3Legend from 'd3-svg-legend';
// import { Guid } from "guid-typescript";

import { ILemma, ICorrections, ICorrectionsQueryData } from '../../../../types';

interface IIntegratedData extends ILemma {
    wordform: string,
    corrections: ICorrectionsExt[]
}

interface ICorrectionsExt extends ICorrections {
    wordform: string,
    children?: ICorrectionsExt[],
    wordlengthdiff?: number,
    found?: boolean
}

function integrateData(correctionsData: ICorrectionsQueryData): IIntegratedData {
    const paradigm = correctionsData.paradigms[0];
    const result: IIntegratedData = {
        lemma: paradigm.lemma,
        paradigm_code: paradigm.paradigm_code,
        variants: paradigm.variants,
        wordform: correctionsData.wordform,
        corrections: correctionsData.corrections
    };

    result.corrections.map((d: ICorrectionsExt) => {
        d.wordlengthdiff = d.wordform.length - result.wordform.length;
        return d;
    });

    return result;
}

function filterData(data: IIntegratedData, freqFilter: number): ICorrectionsExt[] {
    const result = data.corrections.filter((d: ICorrections) => d.frequency > freqFilter);
    result.sort((a: ICorrections, b: ICorrections) => b.frequency - a.frequency);
    return result;
}

function getRandomSubarray(arr: ICorrectionsExt[], size: number): ICorrectionsExt[] {
    const shuffled = arr.slice(0);
    let i = arr.length;
    const min = i - size;

    while (i-- > min) {
        const index = Math.floor((i + 1) * Math.random());
        const temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    const sliced = shuffled.slice(min);
    return sliced.sort((a, b) => b.frequency - a.frequency);
}

function levenshteinDistance(a: string, b: string) {
    // Create empty edit distance matrix for all possible modifications of
    // substrings of a to substrings of b.
    const distanceMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    // Fill the first row of the matrix.
    // If this is first row then we're transforming empty string to a.
    // In this case the number of transformations equals to size of a substring.
    for (let i = 0; i <= a.length; i += 1) {
        distanceMatrix[0][i] = i;
    }

    // Fill the first column of the matrix.
    // If this is first column then we're transforming empty string to b.
    // In this case the number of transformations equals to size of b substring.
    for (let j = 0; j <= b.length; j += 1) {
        distanceMatrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            distanceMatrix[j][i] = Math.min(
                distanceMatrix[j][i - 1] + 1, // deletion
                distanceMatrix[j - 1][i] + 1, // insertion
                distanceMatrix[j - 1][i - 1] + indicator, // substitution
            );
        }
    }

    return distanceMatrix[b.length][a.length];
}

function getTierMembers(tier: number, data: ICorrectionsExt[]) {
    const result: any[] = [];

    data.forEach((d: ICorrectionsExt) => {
        if (d.levenshtein_distance === tier) {
            result.push(d);
        }
    })
    return result;
}

function makeTree(data: ICorrectionsExt[], tier: number, sourceArray: ICorrectionsExt[]): ICorrectionsExt[] {
    const targetArray = getTierMembers(tier, data);
    const result: ICorrectionsExt[] = [];

    targetArray.forEach((da: ICorrectionsExt) => {
        const children: ICorrectionsExt[] = [];
        sourceArray.forEach((db: ICorrectionsExt) => {
            if (levenshteinDistance(da.wordform, db.wordform) === 1) {
                children.push(db);
                db.found = true;
            }
        });
        if (children.length > 0) {
            da.children = children;
        }
        result.push(da);
    });

    sourceArray.forEach((db: ICorrectionsExt) => {
        if (!db.found) {
            result.push(db);
        }
    })
    return result;
}

function transformChildren(data: Array<d3.HierarchyPointNode<ICorrectionsExt>>) {
    // const result = Object.assign({}, ...data);
    // if (result) {
        data.forEach((d: any) => {
            d.depth = d.data.levenshtein_distance;
            d.y = d.depth * 150;
            if (d.children) {
                transformChildren(d.children);
            }
        })
    // }
    // return result;
}

function tree(data: any, radius: number): d3.HierarchyPointNode<ICorrectionsExt> {
    return d3.tree<ICorrectionsExt>()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent === b.parent ? 1 : 3) / a.depth)
        (d3.hierarchy<any>(data));
}

export const drawChart = (correctionsData: ICorrectionsQueryData) => {
    const chartMargins = ({ top: 30, right: 200, bottom: 10, left: 10 });
    const chartWidth = 900;
    const chartHeight = 700;
    const chartRadius = 466;

    const minFreqFilter = 1;
    const maxFreqFilter = 100;
    const stepFreqFilter = 1;
    let freqFilter = 10

    const minDisplayNumber = 100;
    const maxDisplayNumber = 1500;
    const stepDisplayNumber = 10;
    let displayNumber = 150;

    const colorScale = d3.scaleSequential((t) => {
        const color = d3.rgb();
        color.r = 255 * Math.min(1, t);
        color.g = 0;
        color.b = 255 - 255 * Math.min(1, t);
        return '' + color;
    }).domain([0, displayNumber]);

    // Data transformations
    const integratedData = integrateData(correctionsData);
    const filteredData = filterData(integratedData, freqFilter);

    const treeData = (filteredData.length > displayNumber) ? getRandomSubarray(filteredData, displayNumber) : filteredData;
    const protoRoot = {
        wordform: correctionsData.wordform,
        children: makeTree(treeData, 1,
                    makeTree(treeData, 2,
                        makeTree(treeData, 3,
                            makeTree(treeData, 4,
                                makeTree(treeData, 5,
                                    makeTree(treeData, 6,
                                        makeTree(treeData, 7,
                                            makeTree(treeData, 8,
                                                []))))))))
    }

    const root = tree(protoRoot, chartRadius);
    if (root.children) {
        transformChildren(root.children);
    }

    // Drawing

    const squareShape = d3.symbol().type(d3.symbolSquare).size(150)();
    if (squareShape == null) {
        return
    };

    const legend = d3Legend.legendColor()
        .shape("path", squareShape)
        .shapePadding(25)
        .labelOffset(20)
        .scale(colorScale);


    if (root) {
        const svg = d3.select("#OCRPostCorrectionChart").append("svg")
            .attr("width", chartWidth + chartMargins.left + chartMargins.right)
            .attr("height", chartHeight + chartMargins.top + chartMargins.bottom)
            .style("padding", "10px")
            .style("font", "12px sans-serif");

        const g = svg.append("g");

        const legendGroup = g.append("g")
            .attr("class", "legend legend--ordinal")
            .attr("transform", `translate(${chartWidth - 600},${-chartHeight + 200})`)
            .append("text")
            .attr("transform", `translate(-10,-20)`)
            .attr("dy", "0.31em")
            .text("Word frequency")
            .attr("fill", "black");

        svg.select(".legend")
            .call(legend as any);

        const linkgroup = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5);

        const nodegroup = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3);

        const radialFunc = d3.linkRadial()
            .radius((d:any) => d.y)
            .angle((d: any) => d.x);

        function newdata(animate = true) {
            const linksData = root.links();
            const links = linkgroup
                .selectAll("path")
                .data(linksData, (d:any) => d.source.data.wordform+"_"+ d.target.data.wordform);

            links.exit().remove();
            
            const newlinks = links
                .enter()
                .append("path")
                .attr("d", d => radialFunc(d as any));

            let alllinks = linkgroup.selectAll("path");
            alllinks
                .transition()
                .duration(animate ? 400 : 0)
                .ease(d3.easeLinear)
                .on("end", () => {
                    const node = g.node();
                    if (node) {
                        const box = node.getBBox();
                        svg.transition().duration(1000).attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
                    }
                })
                .attr("d", d => radialFunc(d as any));

            const nodesData = root.descendants().reverse();
            const nodes = nodegroup
                .selectAll("g")
                .data(nodesData, (d: any) => {
                    if (d.parent) {
                        return d.parent.data.wordform + d.data.wordform;
                    }
                    return d.data.wordform
                });

            nodes.exit().remove();

            const newnodes = nodes
                .enter().append("g");

            const allnodes = animate ? nodegroup.selectAll("g")
            .transition()
            .duration(animate ? 400 : 0)
                .ease(d3.easeLinear)
                .on("end", () => {
                    const node = g.node();
                    if (node) {
                        const box = node.getBBox();
                        svg.transition().duration(1000).attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
                    }
                }) : nodegroup.selectAll("g");

            allnodes
                .attr("transform", (d:any) => `
                  rotate(${d.x * 180 / Math.PI - 90})
                  translate(${d.y},0)
                `);

            newnodes.append("circle")
                .attr("r", 4.5)
                .on("click", (d:any) => {
                    const altChildren = d.data.altChildren || [];
                    const children = d.data.children;
                    d.data.children = altChildren;
                    d.data.altChildren = children;
                    newdata();
                });

            nodegroup.selectAll("g circle").attr("fill", (d:any) => {
                const altChildren = d.data.altChildren || [];
                const children = d.data.children;
                return d.children || (children && (children.length > 0 || altChildren.length > 0)) ? "#555" : "#999"
            });

            newnodes.append("text")
                .attr("dy", "0.31em")
                .text(d => d.data.wordform)
                .attr("fill", d => colorScale(d.data.frequency))
                .clone(true).lower()
                .attr("stroke", "white");

            nodegroup.selectAll("g text")
                .attr("x", (d:any) => d.x < Math.PI === !d.children ? 6 : -6 )
                .attr("text-anchor", (d:any) => d.x < Math.PI === !d.children ? "start" : "end")
                .attr("transform", (d:any) => d.x >= Math.PI ? "rotate(180)" : null);

        }

        newdata(false);

        // const node = g.node();
        // if (node) {
        //     const box = node.getBBox();
        //     svg.remove()
        //         .attr("width", box.width)
        //         .attr("height", box.height)
        //         .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
        // }
    }
}
