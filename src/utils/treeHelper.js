export function generateId() {
  return `node_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function addNode(tree, parentId, newNode) {
  if (parentId === null) {
    return [...tree, newNode];
  }
  return tree.map(node => {
    if (node.id === parentId) {
      return { ...node, children: [...(node.children || []), newNode] };
    }
    if (node.type === 'folder' && node.children) {
      return { ...node, children: addNode(node.children, parentId, newNode) };
    }
    return node;
  });
}

export function deleteNode(tree, nodeId) {
  return tree
    .filter(node => node.id !== nodeId)
    .map(node => {
      if (node.type === 'folder' && node.children) {
        return { ...node, children: deleteNode(node.children, nodeId) };
      }
      return node;
    });
}

export function renameNode(tree, nodeId, newName) {
  return tree.map(node => {
    if (node.id === nodeId) {
      return { ...node, name: newName };
    }
    if (node.type === 'folder' && node.children) {
      return { ...node, children: renameNode(node.children, nodeId, newName) };
    }
    return node;
  });
}
