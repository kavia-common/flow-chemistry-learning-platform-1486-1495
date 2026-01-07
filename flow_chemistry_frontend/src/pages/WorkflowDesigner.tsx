import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  type Connection,
  type Edge,
  type Node,
  type OnConnect,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import '../styles/workflowDesigner.css';

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 120, y: 60 },
  },
  {
    id: 'mix',
    data: { label: 'Mix reagents' },
    position: { x: 120, y: 170 },
  },
  {
    id: 'heat',
    data: { label: 'Heat / Residence time' },
    position: { x: 380, y: 170 },
  },
  {
    id: 'analyze',
    type: 'output',
    data: { label: 'Analyze (UV/Vis)' },
    position: { x: 380, y: 290 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-start-mix', source: 'start', target: 'mix', animated: true },
  { id: 'e-mix-heat', source: 'mix', target: 'heat', label: 'flow' },
  { id: 'e-heat-analyze', source: 'heat', target: 'analyze', label: 'sample' },
];

// PUBLIC_INTERFACE
const WorkflowDesigner: React.FC = () => {
  /** Workflow Designer page: provides a basic React Flow canvas for arranging steps and connections. */
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  return (
    <section className="card workflowCard" aria-label="Workflow designer">
      <header className="workflowCard__header">
        <div>
          <h1 className="workflowCard__title">Workflow Designer</h1>
          <p className="workflowCard__subtitle">
            Drag nodes, connect edges, and prototype a flow chemistry workflow.
          </p>
        </div>

        <div className="workflowCard__meta" aria-label="Designer hints">
          <span className="workflowPill">Tip: drag to pan</span>
          <span className="workflowPill">Shift + drag to select</span>
        </div>
      </header>

      <div className="workflowCanvas" role="region" aria-label="Workflow canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <MiniMap
            zoomable
            pannable
            nodeStrokeColor={() => 'rgba(37, 99, 235, 0.75)'}
            nodeColor={() => 'rgba(37, 99, 235, 0.15)'}
            nodeBorderRadius={10}
          />
          <Controls />
          <Background gap={18} size={1} color="rgba(17, 24, 39, 0.10)" />
        </ReactFlow>
      </div>
    </section>
  );
};

export default WorkflowDesigner;
