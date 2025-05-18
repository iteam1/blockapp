# BlockApp

## Description

Workflow is can be chain of nodes, or tree of nodes or graph of nodes.

node is step of workflow, There are 3 type of node:
- Start node
- Process node
- Stop node

Each node can have these properties:
- ID: UUID
- Name: String
- Description: String
- Prompt: String
- Tools: Object
- AI Model: String
- Input Nodes: Array of Node ID
- Output Nodes: Array of Node ID

## Features

- Create, edit, and Export workflow to JSON 
- Import workflow from JSON


# Reference
https://reactflow.dev/
