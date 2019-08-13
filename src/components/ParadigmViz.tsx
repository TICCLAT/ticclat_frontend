import * as React from 'react';
import { backendURL } from '../settings';
import { CircularProgress, makeStyles } from '@material-ui/core';

import * as d3 from 'd3';
import pdata from './pdata';

interface IData {
  self: {
    X: number;
    Y: number;
    Z: number;
  };
  X_list: Array<{
    X: number;
    W_list: Array<{
      W: number;
      frequency: number;
      wordform: string;
      wordform_id: number;
    }>
  }>;
}

const useStyles = makeStyles({
  root: {
    '& svg circle:hover': {
      fill: 'green',
    }
  },
});

const ParadigmViz = React.memo((props: { wordform: string }) => {
  const selfRef = React.createRef<HTMLDivElement>();
  const classes = useStyles();

  React.useEffect(() => {
    // fetch(`${backendURL}/network/${props.wordform}`).then(r=>r.json()).then((data: IData) => {
    //   const container = selfRef.current;
    //   while (container && container.firstChild) {
    //     container.removeChild(container.firstChild);
    //     d3Force(props.wordform, data, container);
    //   }
    // });
    const container = selfRef.current;
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      d3Force(props.wordform, pdata, container);
    }
  }, [props.wordform]);

  return (
    <div className={classes.root} ref={selfRef}>
      <CircularProgress />
    </div>
  );
});

const d3Force = (wordform: string, data: IData, ref: HTMLDivElement) => {
  const svg = d3.select(ref).append('svg');

  svg.attr('width', 1000)
  svg.attr('height', 1000)

  const width = +svg.attr("width");
  const height = +svg.attr("height");

  interface INode {
    id: string;
    x: number;
    w: number;
    wordform: string;
    frequency: number;
    mainNode: boolean;
  }

  const nestedNodes: INode[][] = data.X_list.map(x => x.W_list.map((w, i) => ({
    id: `X${x.X}W${w.W}`,
    x: x.X,
    w: w.W,
    wordform: w.wordform,
    frequency: w.frequency,
    mainNode: i===0,
  })));

  const nodes: INode[] = [].concat(...nestedNodes as any);

  const selfNode = nodes.find(node => node.x === data.self.X) as INode;

  const nestedLinks = data.X_list.map(x => {
    const xLinks: any[] = [];
    const mainNode = nodes.find(node => node.x === x.X && node.w === x.W_list[0].W);
    xLinks.push({
      source: selfNode,
      target: mainNode,
      type: 'X-X',
      strength: 1
    });
    x.W_list.forEach(w => {
      const targetNode = nodes.find(node => node.x === x.X && node.w === w.W)
      xLinks.push({
        source: mainNode,
        target: targetNode,
        type: 'X-W'
      });
    })
    return xLinks;
  });

  const links: any[] = [].concat(...nestedLinks as any);

  const simulation = d3.forceSimulation()
    .force("link", d3.forceLink()
      .id(d => d.id)
      .strength((d: any) => d.type === 'X-W' ? 0.2 : 0.1)
    )
    .force("charge", d3.forceManyBody().strength(-5))
    .force("center", d3.forceCenter(width / 2, height / 2));


  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 1)
    .attr("stroke", 'black');

  const d3nodes = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .attr('data-wordform', d => d.wordform)

  const circles = d3nodes.append("circle")
    .attr("r", 5)
    .attr("fill", d => d.mainNode ? 'red' : 'black')
    // .call(d3.drag()
    //   .on("start", dragstarted as any)
    //   .on("drag", dragged)
    //   .on("end", dragended));

  // const lables = d3nodes.append("text")
  //   .text(d => d.wordform)
  //   .attr('x', 6)
  //   .attr('y', 3);

  // d3nodes.append("title")
  //   .text(d=>d.wordform);

  simulation
    .nodes(nodes)
    .on("tick", ticked);

  simulation.force("link")!
    .links(links);

  function ticked() {
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    d3nodes
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
  }
  //
  // function dragstarted(d) {
  //   if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
  //   d.fx = d.x;
  //   d.fy = d.y;
  // }
  //
  // function dragged(d) {
  //   d.fx = d3.event.x;
  //   d.fy = d3.event.y;
  // }
  //
  // function dragended(d) {
  //   if (!d3.event.active) { simulation.alphaTarget(0); }
  //   d.fx = null;
  //   d.fy = null;
  // }
}

export default ParadigmViz;
