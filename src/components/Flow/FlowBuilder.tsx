import React, { useCallback, useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  Edge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '../../types';
import StartNode from '../Nodes/StartNode';
import ProcessNode from '../Nodes/ProcessNode';
import StopNode from '../Nodes/StopNode';
import styled from 'styled-components';

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  stop: StopNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'start',
    position: { x: 250, y: 5 },
    data: {
      type: 'start',
      name: 'Start',
      description: 'Start of the workflow',
      prompt: '',
      tools: {},
      aiModel: 'gpt-4',
      inputNodes: [],
      outputNodes: [],
    },
  },
  {
    id: '2',
    type: 'process',
    position: { x: 100, y: 100 },
    data: {
      type: 'process',
      name: 'Process Step',
      description: 'Processing step',
      prompt: 'Process the input',
      tools: { tool1: {}, tool2: {} },
      aiModel: 'gpt-4',
      inputNodes: [],
      outputNodes: [],
    },
  },
  {
    id: '3',
    type: 'stop',
    position: { x: 400, y: 100 },
    data: {
      type: 'stop',
      name: 'End',
      description: 'End of the workflow',
      prompt: '',
      tools: {},
      aiModel: '',
      inputNodes: [],
      outputNodes: [],
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const FlowContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Toolbar = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #f5f5f5;
  }
`;

const FlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  // Handle keyboard events for edge deletion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selectedEdge) {
        setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
        setSelectedEdge(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEdge, setEdges]);

  // Update selected edge when edges change
  useEffect(() => {
    if (selectedEdge && !edges.some((e) => e.id === selectedEdge.id)) {
      setSelectedEdge(null);
    }
  }, [edges, selectedEdge]);

  const onConnect = useCallback(
    (params: Connection) => {
      // Allow any node to connect to any other node
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#555' },
      }, eds));
    },
    [setEdges]
  );

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedEdge(null);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const addNode = useCallback((type: NodeType, position?: { x: number; y: number }) => {
    if (!reactFlowWrapper.current || !reactFlowInstance) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const centerX = reactFlowBounds.width / 2;
    const centerY = reactFlowBounds.height / 2;

    const nodePosition = position || reactFlowInstance.project({
      x: centerX,
      y: centerY,
    });

    const newNode: Node = {
      id: uuidv4(),
      type,
      position: nodePosition,
      data: {
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        description: '',
        prompt: '',
        tools: {},
        aiModel: 'gpt-4',
        inputNodes: [],
        outputNodes: [],
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, setNodes]);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Add the node at the dropped position
      addNode(type, position);
    },
    [reactFlowInstance, addNode]
  );

  const exportWorkflow = useCallback(() => {
    if (nodes.length > 0) {
      const flow = { nodes, edges };
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(flow, null, 2)
      )}`;
      const link = document.createElement('a');
      link.href = jsonString;
      link.download = 'workflow.json';
      link.click();
    }
  }, [nodes, edges]);

  const importWorkflow = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = JSON.parse(e.target?.result as string);
        if (result.nodes && result.edges) {
          setNodes(result.nodes);
          setEdges(result.edges);
        }
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  }, [setNodes, setEdges]);

  return (
    <FlowContainer ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges.map(edge => ({
          ...edge,
          selected: selectedEdge?.id === edge.id,
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ stroke: '#555', strokeWidth: 2 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#555' },
        }}
        fitView
      >
        <Background />
        <Controls />
        <Toolbar>
          <Button
            onClick={() => addNode('start')}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/reactflow', 'start');
              e.dataTransfer.effectAllowed = 'move';
            }}
          >
            Add Start
          </Button>
          <Button
            onClick={() => addNode('process')}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/reactflow', 'process');
              e.dataTransfer.effectAllowed = 'move';
            }}
          >
            Add Process
          </Button>
          <Button
            onClick={() => addNode('stop')}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/reactflow', 'stop');
              e.dataTransfer.effectAllowed = 'move';
            }}
          >
            Add Stop
          </Button>
          <Button onClick={exportWorkflow}>Export Workflow</Button>
          <Button as="label" htmlFor="file-upload">
            Import Workflow
            <input
              id="file-upload"
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={importWorkflow}
            />
          </Button>
        </Toolbar>
      </ReactFlow>
    </FlowContainer>
  );
};

const FlowBuilderWithProvider: React.FC = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);

export default FlowBuilderWithProvider;
