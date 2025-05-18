import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeType } from '../../types';
import styled from 'styled-components';

const NodeContainer = styled.div<{ type: NodeType; selected?: boolean }>`
  padding: 12px 16px 12px 14px;
  border-radius: 8px;
  min-width: 200px;
  background: white;
  border: 1px solid #E2E8F0;
  border-left: 4px solid ${({ type }) => {
    switch (type) {
      case 'start':
        return '#10B981'; // Green for start
      case 'process':
        return '#3B82F6'; // Blue for process
      case 'stop':
        return '#EF4444'; // Red for stop
      default:
        return '#9CA3AF'; // Gray for unknown
    }
  }};
  box-shadow: ${({ selected }) => (selected ? '0 0 0 2px #60A5FA' : '0 1px 3px rgba(0, 0, 0, 0.1)')};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Node header has been removed as per request

const NodeContent = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;

interface BaseNodeProps {
  id: string;
  type: string;
  data: {
    type: NodeType;
    name: string;
    description: string;
    prompt: string;
    tools: Record<string, any>;
    aiModel: string;
    inputNodes: string[];
    outputNodes: string[];
  };
  selected?: boolean;
  children?: React.ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({ id, data, selected, children }) => {
  return (
    <NodeContainer type={data.type} selected={selected}>
      <NodeContent>
        <div><strong>Name:</strong> {data.name}</div>
        <div><strong>Model:</strong> {data.aiModel || 'N/A'}</div>
        {data.description && <div>{data.description}</div>}
        {children}
      </NodeContent>
      
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={data.type !== 'start'}
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={data.type !== 'stop'}
      />
    </NodeContainer>
  );
};

export default BaseNode;
