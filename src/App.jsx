import { useState, useRef } from 'react';
import { useFileTree } from './hooks/userFileTree';
import FileTree from './components/FileTree';
import ActionButtons from './components/ActionButtons';

export default function App() {
  const { tree, addFile, addFolder, renameNode, deleteNode } = useFileTree();
  const [pendingType, setPendingType] = useState(null); // 'file' | 'folder' | null
  const [inputValue, setInputValue] = useState('');
  const committingRef = useRef(false);

  const openInput = (type) => {
    setPendingType(type);
    setInputValue('');
  };

  const commit = () => {
    if (committingRef.current) return;
    committingRef.current = true;
    const name = inputValue.trim();
    if (name) {
      pendingType === 'file' ? addFile(null, name) : addFolder(null, name);
    }
    setPendingType(null);
    setInputValue('');
    committingRef.current = false;
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') { setPendingType(null); setInputValue(''); }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full h-screen flex flex-col bg-white border-r border-gray-200 shadow-md">

        {/* Navbar */}
        <div className="flex items-center justify-center gap-2 px-5 py-3 border-b border-blue-900 shrink-0">
          <h1 className="text-xl bold tracking-widest text-gray-900 uppercase">
            File Explorer
          </h1>
        </div>

        {/* Action Buttons */}
        <ActionButtons onRequestNew={openInput} />

        {/* Tree — fills remaining height, scrolls vertically */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Inline root-level create input */}
          {pendingType && (
            <div className="flex items-center gap-1.5 px-2 py-1 mb-1">
              <span className="text-sm">{pendingType === 'file' ? '📄' : '📁'}</span>
              <input
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKey}
                onBlur={commit}
                placeholder={pendingType === 'file' ? 'filename.txt' : 'folder-name'}
                className="flex-1 w-[50%] text-sm px-2 py-0.5 border border-blue-400 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          {tree.length === 0 && !pendingType ? (
            <p className="text text-gray-400 text-center py-8">
              empty — create a file or folder above
            </p>
          ) : (
            <FileTree
              nodes={tree}
              onAddFile={addFile}
              onAddFolder={addFolder}
              onRename={renameNode}
              onDelete={deleteNode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
