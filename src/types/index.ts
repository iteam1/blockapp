export type NodeType = 'start' | 'process' | 'stop';

export interface NodeData {
  id: string;
  type: NodeType;
  name: string;
  description: string;
  prompt: string;
  tools: Record<string, any>;
  aiModel: string;
  inputNodes: string[];
  outputNodes: string[];
}

export interface NodeProps {
  id: string;
  data: Omit<NodeData, 'id'>;
  selected?: boolean;
}

export interface FlowData {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Omit<NodeData, 'id'>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}
