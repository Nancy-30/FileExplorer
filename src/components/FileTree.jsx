import TreeNode from './TreeNode';

export default function FileTree({ nodes, onAddFile, onAddFolder, onRename, onDelete }) {
  if (!nodes || nodes.length === 0) return null;

  const sorted = [...nodes].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  return (
    <ul className="list-none m-0 p-0">
      {sorted.map(node => (
        <li key={node.id}>
          <TreeNode
            node={node}
            onAddFile={onAddFile}
            onAddFolder={onAddFolder}
            onRename={onRename}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
