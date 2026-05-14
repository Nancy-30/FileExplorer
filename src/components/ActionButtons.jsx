export default function ActionButtons({ onRequestNew }) {
  return (
    <div className="gap-0 border-b border-gray-200 shrink-0">
      <div className="flex gap-4 w-1/3 m-3">
        <button
          onClick={() => onRequestNew('file')}
          className="rounded-lg w-full px-4 py-3 hover:bg-blue-100 text-gray-900 border-gray-900 border-3 transition-colors text-left"
        >
          + New File
        </button>
        <button
          onClick={() => onRequestNew('folder')}
          className="rounded-lg w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white transition-colors text-left"
        >
          + New Folder
        </button>
      </div>
    </div>
  );
}
