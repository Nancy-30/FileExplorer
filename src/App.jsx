import { useFileTree } from './hooks/userFileTree';
import FileTree from './components/FileTree';
import ActionButtons from './components/ActionButtons';

export default function App() {
  const { tree, addFile, addFolder, renameNode, deleteNode } = useFileTree();

  return (
    <div className="min-h-screen bg-gray-100 font-mono flex items-start justify-center pt-16 px-4">
      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-blue-950 border-b border-blue-900">
          <h1 className="text-xs font-bold tracking-widest text-blue-100 uppercase">
            ⌂ File Explorer
          </h1>
        </div>
        <ActionButtons onAddFile={addFile} onAddFolder={addFolder} />
        <div className="p-2 max-h-[32rem] overflow-y-auto">
          {tree.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6 font-mono">
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
