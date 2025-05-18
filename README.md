# BlockApp - Workflow Builder

A visual workflow builder that allows you to create, edit, and manage workflows using a node-based interface. Build complex workflows by connecting different types of nodes together.

## Description

A workflow can be a chain of nodes, a tree of nodes, or a graph of nodes. Each node represents a step in the workflow, and they can be connected to create complex processing pipelines.

## Node Types

- **Start Node**: The entry point of your workflow
- **Process Node**: Performs operations or transformations
- **Stop Node**: The end point of your workflow

## Node Properties

Each node supports the following configurable properties:

* **ID**: A unique, auto-generated UUID (not editable).
* **Name**: The node’s display name (always visible, editable).
* **Description**: An optional explanation of the node’s purpose (shown on hover, editable).
* **Prompt**: The AI input prompt (shown on hover; editable, applicable to AI-powered nodes only).
* **Tools**: A list of tools associated with the node (displayed in a dropdown; tools can be added or removed).
* **AI Model**: The name of the AI model used (e.g., `gpt-4`; editable).
* **Input Nodes**: An array of connected input node IDs (visualized as connecting lines).
* **Output Nodes**: An array of connected output node IDs (also visualized as connecting lines).

## Technology Stack

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [ReactFlow](https://reactflow.dev/) - Library for building node-based editors and interactive diagrams
- [Styled Components](https://styled-components.com/) - CSS-in-JS styling solution

## Features

- **Workflow Management**
  - Drag and drop nodes onto the canvas
  - Connect nodes by dragging from one node's output to another's input
  - Export your workflow to a JSON file
  - Import existing workflows from JSON
  - Responsive design that works on different screen sizes

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blockapp.git
   cd blockapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Use

1. **Adding Nodes**
   - Click on any node type in the toolbar to start dragging it onto the canvas
   - Release the mouse button to place the node

2. **Connecting Nodes**
   - Hover over a node to see its connection points (handles)
   - Click and drag from an output handle to another node's input handle
   - Release to create a connection

3. **Editing Node Properties**
   - Click on a node to select it
   - Edit its properties in the sidebar (if implemented)

4. **Saving and Loading Workflows**
   - Click "Export Workflow" to download your workflow as a JSON file
   - Click "Import Workflow" to load a previously saved workflow

## Technology Stack

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [ReactFlow](https://reactflow.dev/) - Library for building node-based editors and interactive diagrams
- [Styled Components](https://styled-components.com/) - CSS-in-JS styling solution

## Project Structure

```
src/
├── components/
│   ├── Flow/
│   │   └── FlowBuilder.tsx    # Main flow builder component
│   └── Nodes/
│       ├── BaseNode.tsx      # Base node component with common styling
│       ├── ProcessNode.tsx   # Process node implementation
│       ├── StartNode.tsx     # Start node implementation
│       └── StopNode.tsx      # Stop node implementation
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                   # Main application component
└── index.tsx                 # Application entry point
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Reference

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ReactFlow](https://reactflow.dev/)
- [Styled Components](https://styled-components.com/)
- [UUID](https://github.com/uuidjs/uuid)
- [Rete](https://rete.js.org/#/)
- [LangFlow](https://github.com/langflow/langflow)
- [LangGraph](https://github.com/langflow/langgraph)
- [crewAI](https://github.com/crew-ai/crewai)
- [n8n](https://github.com/n8n-io/n8n)
- [AgenticFlow](https://github.com/locchh/agenticflow)