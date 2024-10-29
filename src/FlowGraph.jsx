import React from 'react';
import {  MarkerType, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const activeStyle = {stroke: 'blue', 'stroke-width': 3}

const TOOLS_NODES = [
    { id: 'explorer', data: { label: 'Data explorer' } },
        { id: 'exporter', data: { label: 'Data exporter' } },
        { id: 'views', data: { label: 'Views' } },
        { id: 'api-wizard', data: { label: 'API Wizard' } },
]

const DEFAULT_EDGE_CONF = {
    markerEnd: {type: MarkerType.Arrow},
    animated: true,
}

const IN_FUNNEL_EDGE_CONF = {
    ...DEFAULT_EDGE_CONF,
    markerEnd: {
        ...DEFAULT_EDGE_CONF.markerEnd,
        width: 10,
        height: 10,
        color: 'blue'
    }
}

const FlowGraph = ({ firstStep, secondStep }) => {
  // Define nodes and edges
  const nodes = [
    // Static funnel part
    { id: 'catalog', type: 'input', data: { label: 'Catalog' }, position: {x: 0, y: 0} },
    { id: 'product', data: { label: 'Product Page' }, position: {x: 0, y: 100} },
    // First and second steps
    ...TOOLS_NODES
      .filter(node =>  [firstStep, secondStep].includes(node.id))
      .map(node => ({...node, position : {x: 0, y: node.id === firstStep ? 200 : 300}})),
    // Secondary tools (not in the funnel)
    ...TOOLS_NODES
      .filter(node =>  ![firstStep, secondStep].includes(node.id))
      .map((node, index) => ({...node, position : {x: 175 * (index +1), y: secondStep ? 400 : 300}})),
    { id: 'secondary-cta', data: { label: 'Secondary actions' }, position: {x: 200, y: secondStep ? 300 : 200} },
  ];

  const edges = [
      { id: 'catalog_product', source: 'catalog', target: 'product', ...IN_FUNNEL_EDGE_CONF, style: activeStyle },
      { id: 'first_step', source: 'product', target: firstStep, ...IN_FUNNEL_EDGE_CONF, style: activeStyle },
      ...(!!secondStep ? [
            { id: 'second_step', source: firstStep, target: secondStep, ...IN_FUNNEL_EDGE_CONF, style: activeStyle },         
            // second step for secondary actions
            { id: 'second-step_secondary', source: secondStep, target: 'secondary-cta',  ...DEFAULT_EDGE_CONF },]
        : []),
        
        // Product and first step for secondary actions
        { id: 'product_secondary', source: 'product', target: 'secondary-cta',  ...DEFAULT_EDGE_CONF },
        { id: 'first-step_secondary', source: firstStep, target: 'secondary-cta',  ...DEFAULT_EDGE_CONF },
        
        // Secondary action to tools
        ...TOOLS_NODES.filter(node => ![firstStep, secondStep].includes(node.id)).map(({id}) => ({
            id: 'secondary-path' + id, source: 'secondary-cta', target: id, ...DEFAULT_EDGE_CONF,
        })),
        // tools to secondary actions
        ...TOOLS_NODES.filter(node => ![firstStep, secondStep].includes(node.id)).map(({id}) => ({
            id: 'secondary-path-reverse' + id, source: id , target: 'secondary-cta', ...DEFAULT_EDGE_CONF,
        }))
  ];

  return (
    <div className='flow'>
      <ReactFlow nodes={nodes} edges={edges} fitView>
      </ReactFlow>
    </div>
  );
};

export default FlowGraph;
