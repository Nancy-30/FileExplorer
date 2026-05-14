import FileNode from './FileNode';
import FolderNode from './FolderNode';

export default function TreeNode({ node, onAddFile, onAddFolder, onRename, onDelete }) {
  if (node.type === 'file') {
    return (
      <FileNode
        node={node}
        onRename={onRename}
        onDelete={onDelete}
      />
    );
  }
  return (
    <FolderNode
      node={node}
      onAddFile={onAddFile}
      onAddFolder={onAddFolder}
      onRename={onRename}
      onDelete={onDelete}
    />
  );
}
