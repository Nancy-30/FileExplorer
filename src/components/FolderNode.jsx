import { useState, useEffect } from 'react';
import FileTree from './FileTree';
import ConfirmDialog from './ConfirmDialog';

export default function FolderNode({ node, onAddFile, onAddFolder, onRename, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(node.name);
  const [addingType, setAddingType] = useState(null);
  const [addVal, setAddVal] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => { setRenameVal(node.name); }, [node.name]);

  const commitRename = () => {
    const name = renameVal.trim();
    if (name && name !== node.name) onRename(node.id, name);
    else setRenameVal(node.name);
    setIsRenaming(false);
  };

  const commitAdd = () => {
    const name = addVal.trim();
    if (name) {
      addingType === 'file' ? onAddFile(node.id, name) : onAddFolder(node.id, name);
    }
    setAddingType(null);
    setAddVal('');
  };

  const startAdding = (type) => {
    setAddingType(type);
    setAddVal('');
    setIsOpen(true);
  };

  return (
    <div className="select-none">
      <div className="group flex items-center gap-1 px-2 py-0.5 rounded hover:bg-blue-50 cursor-pointer">
        <span
          onClick={() => setIsOpen(o => !o)}
          className="text-blue-500 w-3 text-xs flex-shrink-0 font-mono"
        >
          {isOpen ? '▼' : '▶'}
        </span>
        <span className="mr-0.5 text-sm leading-none" onClick={() => setIsOpen(o => !o)}>
          {isOpen ? '📂' : '📁'}
        </span>
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
            onClick={e => e.stopPropagation()}
            className="text-xs px-1 py-0 border border-blue-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 w-32"
          />
        ) : (
          <span
            className="text-xs text-gray-800 flex-1 font-mono"
            onClick={() => setIsOpen(o => !o)}
            onDoubleClick={() => setIsRenaming(true)}
          >
            {node.name}
          </span>
        )}
        <div className="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => { e.stopPropagation(); startAdding('file'); }}
            title="New File"
            className="text-xs px-1 py-0.5 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-700 font-mono"
          >
            +f
          </button>
          <button
            onClick={e => { e.stopPropagation(); startAdding('folder'); }}
            title="New Folder"
            className="text-xs px-1 py-0.5 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-700 font-mono"
          >
            +d
          </button>
          <button
            onClick={e => { e.stopPropagation(); setIsRenaming(true); }}
            title="Rename"
            className="text-xs px-1 py-0.5 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-700"
          >
            ✎
          </button>
          <button
            onClick={e => { e.stopPropagation(); setShowConfirm(true); }}
            title="Delete"
            className="text-xs px-1 py-0.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      </div>
      {showConfirm && (
        <ConfirmDialog
          name={node.name}
          type="folder"
          onConfirm={() => { setShowConfirm(false); onDelete(node.id); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {isOpen && (
        <div className="ml-4 border-l border-blue-100 pl-1">
          {addingType && (
            <div className="flex items-center gap-1 px-2 py-0.5">
              <span className="text-xs">{addingType === 'file' ? '📄' : '📁'}</span>
              <input
                autoFocus
                value={addVal}
                onChange={e => setAddVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') commitAdd();
                  if (e.key === 'Escape') { setAddingType(null); setAddVal(''); }
                }}
                onBlur={commitAdd}
                placeholder={addingType === 'file' ? 'filename.txt' : 'folder-name'}
                className="text-xs px-2 py-0.5 border border-blue-300 rounded font-mono bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 w-36"
              />
            </div>
          )}
          <FileTree
            nodes={node.children || []}
            onAddFile={onAddFile}
            onAddFolder={onAddFolder}
            onRename={onRename}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
}
