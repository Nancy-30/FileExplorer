export default function ConfirmDialog({ name, type, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 md:w-[40%] w-[90%] "
        onClick={e => e.stopPropagation()}
      >
        <p className="text-md text-gray-500 mb-1 uppercase tracking-widest">
          Delete {type}
        </p>
        <p className=" bold text-gray-900 mb-2 truncate">"{name}"</p>
        <p className="text-md text-gray-400 mb-5">This cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="text-md px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 text-gray-600   transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-md px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded   transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
