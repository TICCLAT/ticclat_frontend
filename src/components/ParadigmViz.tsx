import { makeStyles } from '@material-ui/core';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import * as React from 'react';
import { ShoppingBagContext } from '../context/ShoppingBag';
import { backendURL } from '../settings';

import AddButton from '../components/ShoppingBag/AddButton';

// import BokehPlot from '../components/BokehPlot';
interface INode extends d3.SimulationNodeDatum {
  id: string;
  frequency: number;
  tc_w: number;
  tc_x: number;
  tc_y: number;
  tc_z: number;
  type: string;
  wordform: string;
}

interface IDBLink {
  id: string;
  source: string;
  target: string;
  type: 'XW' | 'XX' | string;
}

interface ILink extends d3.SimulationLinkDatum<INode> {
  id: string;
  source: INode;
  target: INode;
  type: 'XW' | 'XX' | string;
}

interface IData {
  nodes: INode[];
  links: IDBLink[];
}

const useStyles = makeStyles({
  root: {
    '& svg circle:hover': {
      fill: 'green'
    },
    '& #word-popup': {
      backgroundColor: 'white',
      border: '1px solid black',
      padding: '10px',
      color: 'black',
      position: 'fixed'
    }
  },
});


interface IVariantsProps {
  w: number;
  x: number;
  y: number;
  z: number;
  shoppingBag: any;
}

interface IVariant {
  frequency: number;
  wordform: string;
}

interface WXYZ {
  w: number;
  x: number;
  y: number;
  z: number;
}

class VariantsList extends React.Component<{}, {
  variants: IVariant[],
  wxyz: WXYZ
}> {
  state = {
    wxyz: { w: 0, x: 0, y: 0, z: 0 },
    variants: [] as IVariant[]
  }

  loadWXYZ(wxyz: WXYZ) {
    const { w, x, y, z } = wxyz;
    fetch(`${backendURL}/variants_by_wxyz?w=${w}&x=${x}&y=${y}&z=${z}`)
      .then(r => r.json())
      .then(result => this.setState({
        wxyz, variants: result
      }));
  }

  render() {
    const { w, x, y, z } = this.state.wxyz;
    const variants = this.state.variants;
    return (
      <div>
        <div>W: {w}</div>
        <div>X: {x}</div>
        <div>Y: {y}</div>
        <div>Z: {z}</div>
        {variants.map(r => (
          <div key={r.wordform} style={{ margin: 5 }}><AddButton word={r.wordform} index={r.wordform as any} />: {r.frequency}</div>
        ))}
      </div>
    )
  }
}

const portalContainer = document.createElement('div');
portalContainer.id = 'word-popup';

const ParadigmViz = React.memo((props: { wordform: string }) => {
  const selfRef = React.createRef<HTMLDivElement>();
  const classes = useStyles();

  const shoppingBag = React.useContext(ShoppingBagContext);

  const variantsListRef = React.createRef<VariantsList>();

  React.useEffect(() => {
    const container = selfRef.current;
    if (shoppingBag.words.length === 0) {
      if (container) {
        container.innerHTML = '<strong>Shopping bag empty...Please add some words</strong>';
      }
      return;
    }
    const q = (wordform: string) => fetch(`${backendURL}/network/${wordform}`).then(r => r.json());
    Promise.all(
      shoppingBag.words.slice(0, 5).map(word => q(word))
    ).then((queryResults: IData[]) => {
      const allNodes: INode[] = [].concat(...queryResults.map(data => data.nodes) as any);
      const allLinks: IDBLink[] = [].concat(...queryResults.map(data => data.links) as any);
      const uniqueNodes = allNodes.filter(node => allNodes.find(n => n.id === node.id) === node);
      const uniqueLinks = allLinks.filter(link => allLinks.find(n => n.id === link.id) === link);


      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        d3Force(props.wordform, {
          nodes: uniqueNodes,
          links: uniqueLinks,

        }, container, variantsListRef);
      }
    });
  }, [shoppingBag]);


  return (
    <div className={classes.root} ref={selfRef}>
      {shoppingBag.words.length === 0
        ? <strong>Shopping bag empty...Please add some words</strong>
        : <div>Loading...</div>
      }
      {ReactDOM.createPortal(
        <VariantsList ref={variantsListRef} />,
        portalContainer
      )}
    </div>
  );
});

const d3Force = (wordform: string, data: IData, ref: HTMLDivElement, variantsListRef: React.RefObject<VariantsList>) => {
  const svg = d3.select(ref).append('svg');
  ref.appendChild(portalContainer);
  const rootG = svg.append('g');
  portalContainer.style.display = 'none'
  svg.call(
    (d3.zoom() as any)
      .extent([[0, 0], [1000, 1000]])
      .scaleExtent([-1, 8])
      .on("zoom", zoomed)
  );

  function zoomed() {
    rootG.attr("transform", d3.event.transform);
  }

  svg.attr('width', 1000);
  svg.attr('height', 1000);

  const width = +rootG.attr('width');
  const height = +rootG.attr('height');

  const nodes = data.nodes;
  const links: ILink[] = data.links.map(dbLink => ({
    ...dbLink,
    source: nodes.find(node => node.id === dbLink.source)!,
    target: nodes.find(node => node.id === dbLink.target)!,
  }));

  // const links: any[] = [].concat(...nestedLinks as any);

  const simulation = d3.forceSimulation<INode, ILink>(nodes)
    .force('link', d3.forceLink<INode, ILink>(links)
      .id(d => d.id)
      .distance(d => {
        if (d.type === 'XW') {
          return 60;
        }
        else {
          return 5 * Math.abs(d.source.tc_x - d.target.tc_x)
        }
      })
      .strength(3)
    )
    // .force('charge', d3.forceManyBody<INode>().strength(-10))
    .force('charge', d3.forceManyBody().strength(-400))
    // .force('charge', d3.forceRadial<INode>(100, width / 2, height/2).strength(0.01))
    .force('x', d3.forceX(width / 2).strength(0.2))
    .force('y', d3.forceY(height / 2).strength(0.2))

  const linkGs = rootG.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke-width', 1)
    .attr('stroke', 'black');


  function dragstarted(d) {
    d3.select(this).raise();
    if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) { simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

  const d3nodes = rootG.append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(nodes)
    .enter().append('g')
    .attr('data-wordform', d => d.wordform)
    .call(
      (d3.drag() as any)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )
    .on('mouseover', function (d, i) {
      const rect = this.getBoundingClientRect();
      portalContainer.style.display = 'block'
      variantsListRef.current!.loadWXYZ({
        w: d.tc_w,
        x: d.tc_x,
        y: d.tc_y,
        z: d.tc_z
      });

      portalContainer.style.left = `${rect.left + 10}px`;
      portalContainer.style.top = `${rect.top + 10}px`;
    })
    .on('mouseout', () => {
      portalContainer.style.display = 'none'
    });

  const frequencyToRadius = d3.scaleLog().domain([1, 1e8]).range([0.1, 10]);

  const circles = d3nodes.append('circle')
    .attr('r', d => frequencyToRadius(d.frequency))
    .attr('fill', d => d.type === 'x' ? 'red' : 'black')

  simulation
    .on('tick', ticked);

  function ticked() {
    linkGs
      .attr('x1', d => d.source.x!)
      .attr('y1', d => d.source.y!)
      .attr('x2', d => d.target.x!)
      .attr('y2', d => d.target.y!)

    d3nodes
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  }



};

export default ParadigmViz;
