import { useState, useEffect } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function FileNode({ node, onRename, onDelete }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(node.name);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => { setRenameVal(node.name); }, [node.name]);

  const commitRename = () => {
    const name = renameVal.trim();
    if (name && name !== node.name) onRename(node.id, name);
    else setRenameVal(node.name);
    setIsRenaming(false);
  };

  return (
    <div className="group  flex items-center gap-1 px-2 py-0.5 rounded hover:bg-blue-50 cursor-default">
      <span className="w-3 flex-shrink-0" />
      <span className="leading-none mr-0.5">📄</span>
      {isRenaming ? (
        <input
          autoFocus
          value={renameVal}
          onChange={e => setRenameVal(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') commitRename();
            if (e.key === 'Escape') { setRenameVal(node.name); setIsRenaming(false); }
          }}
          onBlur={commitRename}
          className="text-md px-1 py-0 border border-blue-300 rounded   bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 w-32"
        />
      ) : (
        <span
          className="text-md text-gray-700 flex-1  "
          onDoubleClick={() => setIsRenaming(true)}
        >
          {node.name}
        </span>
      )}
      <div className="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsRenaming(true)}
          title="Rename"
          className="text-md px-1 py-0.5 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-700"
        >
          ✎
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          title="Delete"
          className="text-md px-1 py-0.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
        >
          ✕
        </button>
      </div>
      {showConfirm && (
        <ConfirmDialog
          name={node.name}
          type="file"
          onConfirm={() => { setShowConfirm(false); onDelete(node.id); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
