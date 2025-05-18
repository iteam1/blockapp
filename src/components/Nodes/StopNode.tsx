import React from 'react';
import BaseNode from './BaseNode';
import { NodeProps } from 'reactflow';

const StopNode: React.FC<NodeProps> = (props) => {
  return (
    <BaseNode 
      id={props.id}
      type={props.type || 'stop'}
      data={props.data}
      selected={props.selected}
    />
  );
};

export default StopNode;
