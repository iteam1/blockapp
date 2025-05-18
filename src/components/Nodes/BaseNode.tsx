import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeType } from '../../types';
import styled from 'styled-components';

const NodeContainer = styled.div<{ type: NodeType; selected?: boolean }>`
  padding: 12px;
  border-radius: 8px;
  min-width: 200px;
  background: white;
  border: 2px solid ${({ type }) => {
    switch (type) {
      case 'start':
        return '#10B981';
      case 'process':
        return '#3B82F6';
      case 'stop':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  }};
  box-shadow: ${({ selected }) => (selected ? '0 0 0 2px #60A5FA' : '0 1px 3px rgba(0, 0, 0, 0.1)')};
`;

const NodeHeader = styled.div<{ type: NodeType }>`
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 12px;
  background: ${({ type }) => {
    switch (type) {
      case 'start':
        return '#10B981';
      case 'process':
        return '#3B82F6';
      case 'stop':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  }};
`;

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
      <NodeHeader type={data.type}>
        {data.type.toUpperCase()} NODE
      </NodeHeader>
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
