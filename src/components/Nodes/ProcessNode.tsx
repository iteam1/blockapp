import React from 'react';
import BaseNode from './BaseNode';
import { NodeProps } from 'reactflow';
import styled from 'styled-components';

const ToolsList = styled.div`
  margin-top: 8px;
  font-size: 11px;
  color: #555;
`;

const ProcessNode: React.FC<NodeProps> = (props) => {
  const { data } = props;
  const tools = data.tools || {};
  const toolNames = Object.keys(tools);

  return (
    <BaseNode 
      id={props.id}
      type={props.type || 'process'}
      data={data}
      selected={props.selected}
    >
      {toolNames.length > 0 && (
        <ToolsList>
          <div><strong>Tools:</strong></div>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
            {toolNames.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </ToolsList>
      )}
    </BaseNode>
  );
};

export default ProcessNode;
