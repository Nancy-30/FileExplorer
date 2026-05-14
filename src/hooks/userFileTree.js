import { useState } from 'react';
import { addNode, deleteNode, renameNode, generateId } from '../utils/treeHelper';

const INITIAL_TREE = [
  {
    id: 'folder_init_1',
    name: 'my-project',
    type: 'folder',
    children: [
      {
        id: 'folder_init_2',
        name: 'src',
        type: 'folder',
        children: [
          { id: 'file_init_1', name: 'main.jsx', type: 'file' },
          { id: 'file_init_2', name: 'App.jsx', type: 'file' },
          {
            id: 'folder_init_3',
            name: 'components',
            type: 'folder',
            children: [
              { id: 'file_init_3', name: 'Button.jsx', type: 'file' },
            ],
          },
        ],
      },
      { id: 'file_init_4', name: 'README.md', type: 'file' },
      { id: 'file_init_5', name: 'package.json', type: 'file' },
    ],
  },
];

export function useFileTree() {
  const [tree, setTree] = useState(INITIAL_TREE);

  const addFile = (parentId, name) => {
    const newNode = { id: generateId(), name, type: 'file' };
    setTree(prev => addNode(prev, parentId, newNode));
  };

  const addFolder = (parentId, name) => {
    const newNode = { id: generateId(), name, type: 'folder', children: [] };
    setTree(prev => addNode(prev, parentId, newNode));
  };

  const handleRename = (nodeId, newName) => {
    setTree(prev => renameNode(prev, nodeId, newName));
  };

  const handleDelete = (nodeId) => {
    setTree(prev => deleteNode(prev, nodeId));
  };

  return {
    tree,
    addFile,
    addFolder,
    renameNode: handleRename,
    deleteNode: handleDelete,
  };
}
