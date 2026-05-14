import { useState } from 'react';

export default function ActionButtons({ onAddFile, onAddFolder }) {
  const [mode, setMode] = useState(null);
  const [value, setValue] = useState('');

  const commit = () => {
    const name = value.trim();
    if (name) {
      mode === 'file' ? onAddFile(null, name) : onAddFolder(null, name);
    }
    setMode(null);
    setValue('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') { setMode(null); setValue(''); }
  };

  const open = (type) => {
    setMode(type);
    setValue('');
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
      <button
        onClick={() => open('file')}
        className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-200 rounded font-mono transition-colors"
      >
        + New File
      </button>
      <button
        onClick={() => open('folder')}
        className="text-xs px-3 py-1 bg-black hover:bg-gray-800 text-white rounded font-mono transition-colors"
      >
        + New Folder
      </button>
      {mode && (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          onBlur={commit}
          placeholder={mode === 'file' ? 'filename.txt' : 'folder-name'}
          className="text-xs px-2 py-1 border border-blue-300 rounded bg-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-400 w-36"
        />
      )}
    </div>
  );
}
