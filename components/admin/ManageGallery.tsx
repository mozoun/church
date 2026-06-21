'use client';

import { useState, useEffect, useRef } from 'react';
import { Edit2, Trash2, Save, X, Upload, Eye, EyeOff, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { resizeImageToDataUrl } from '@/lib/image';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  title: '',
  description: '',
  displayOrder: 0,
  isActive: true,
};

export default function ManageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const response = await fetch('/api/gallery?all=true');
      if (!response.ok) throw new Error('Failed to fetch gallery images');
      const data = await response.json();
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return;
    }

    try {
      const dataUrl = await resizeImageToDataUrl(file);
      setPendingImage(dataUrl);
      if (!formData.title) {
        setFormData({ ...formData, title: file.name.replace(/\.[^/.]+$/, '') });
      }
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!editing && !pendingImage) {
      toast.error('Please choose an image to upload');
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        const response = await fetch(`/api/gallery/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, imageUrl: pendingImage || undefined }),
        });
        if (!response.ok) throw new Error('Failed to update image');
        toast.success('Image updated successfully');
      } else {
        const response = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, imageUrl: pendingImage }),
        });
        if (!response.ok) throw new Error('Failed to upload image');
        toast.success('Image uploaded successfully');
      }

      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Error saving gallery image:', error);
      toast.error('Failed to save image');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete image');
      toast.success('Image deleted');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  }

  async function toggleActive(image: GalleryImage) {
    try {
      const response = await fetch(`/api/gallery/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: image.title,
          description: image.description,
          displayOrder: image.displayOrder,
          isActive: !image.isActive,
        }),
      });
      if (!response.ok) throw new Error('Failed to update image');
      fetchImages();
    } catch (error) {
      console.error('Error toggling image visibility:', error);
      toast.error('Failed to update image');
    }
  }

  function handleEdit(image: GalleryImage) {
    setEditing(image.id);
    setPendingImage(null);
    setFormData({
      title: image.title,
      description: image.description || '',
      displayOrder: image.displayOrder,
      isActive: image.isActive,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function resetForm() {
    setEditing(null);
    setPendingImage(null);
    setFormData(emptyForm);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Gallery</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editing ? 'Edit Image' : 'Upload New Image'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {editing ? 'Replace Image (optional)' : 'Image'}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            />
            {(pendingImage || (editing && !pendingImage)) && (
              <div className="mt-3 w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={pendingImage || images.find((i) => i.id === editing)?.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Worship Service"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Praising God together"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="flex items-center gap-2 mt-7">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Visible on website</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? <Upload className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
            {editing ? 'Update' : 'Upload'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No images yet. Upload your first photo above.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square relative">
                <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
                {!image.isActive && (
                  <span className="absolute top-2 left-2 text-xs px-2 py-1 bg-gray-800/80 text-white rounded">
                    Hidden
                  </span>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 truncate">{image.title}</h4>
                {image.description && (
                  <p className="text-sm text-gray-600 truncate">{image.description}</p>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleActive(image)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title={image.isActive ? 'Hide from website' : 'Show on website'}
                  >
                    {image.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
