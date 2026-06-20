'use client';

export default function ManageGallery() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Gallery</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Gallery Management</h3>
        <p className="text-gray-700 mb-4">
          Currently, gallery images are managed from the <code className="bg-white px-2 py-1 rounded">public/images</code> folder.
        </p>
        <p className="text-gray-600 text-sm">
          To add new images:
        </p>
        <ol className="list-decimal list-inside text-sm text-gray-600 mt-2 space-y-1">
          <li>Place image files in the <code className="bg-white px-1 rounded">public/images</code> folder</li>
          <li>Update the gallery array in <code className="bg-white px-1 rounded">components/tabs/GalleryTab.tsx</code></li>
          <li>Images will automatically appear in the gallery</li>
        </ol>

        <div className="mt-6 p-4 bg-white rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Current Images</h4>
          <p className="text-sm text-gray-600">You have <strong>10 images</strong> in your gallery</p>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <strong>Future Enhancement:</strong> This section can be upgraded to support drag-and-drop uploads to Supabase Storage with full CRUD operations.
        </div>
      </div>
    </div>
  );
}
