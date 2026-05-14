export default function ConfirmDialog({ name, type, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 w-72 font-mono"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">
          Delete {type}
        </p>
        <p className="text-sm font-bold text-gray-900 mb-2 truncate">"{name}"</p>
        <p className="text-xs text-gray-400 mb-5">This cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 font-mono transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-xs px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded font-mono transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
