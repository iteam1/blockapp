import React from 'react';
import BaseNode from './BaseNode';
import { NodeProps } from 'reactflow';

const StartNode: React.FC<NodeProps> = (props) => {
  return (
    <BaseNode 
      id={props.id}
      type={props.type || 'start'}
      data={props.data}
      selected={props.selected}
    />
  );
};

export default StartNode;
