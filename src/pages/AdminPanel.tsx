import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Video, Category } from '../types';

export function AdminPanel() {
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isAddingVideo, setIsAddingVideo] = React.useState(false);
  const [isEditingVideo, setIsEditingVideo] = React.useState(false);
  const [editingVideoId, setEditingVideoId] = React.useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    thumbnail_url: '',
    video_url: '',
    category: ''
  });

  React.useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  async function fetchVideos() {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setVideos(data);
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    if (data) setCategories(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('videos')
      .insert([formData]);
    if (!error) {
      setIsAddingVideo(false);
      setFormData({
        title: '',
        description: '',
        thumbnail_url: '',
        video_url: '',
        category: ''
      });
      fetchVideos();
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('categories')
      .insert([{ name: newCategoryName }]);
    if (!error) {
      setIsAddingCategory(false);
      setNewCategoryName('');
      fetchCategories();
    }
  }

  async function handleDeleteCategory(id: number) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    if (!error) fetchCategories();
  }

  async function handleEdit(video: Video) {
    setIsEditingVideo(true);
    setEditingVideoId(video.id);
    setFormData(video);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('videos')
      .update([formData])
      .eq('id', editingVideoId);
    if (!error) {
      setIsEditingVideo(false);
      setEditingVideoId(null);
      setFormData({
        title: '',
        description: '',
        thumbnail_url: '',
        video_url: '',
        category: ''
      });
      fetchVideos();
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);
    if (!error) fetchVideos();
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Category</span>
              <span className="sm:hidden">Category</span>
            </button>
            <button
              onClick={() => setIsAddingVideo(true)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Video</span>
              <span className="sm:hidden">Video</span>
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Categories</h2>
          {isAddingCategory && (
            <form onSubmit={handleAddCategory} className="mb-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1 sm:flex-none rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
              >
                <span className="text-white">{category.name}</span>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Videos</h2>
          <div className="overflow-x-auto bg-gray-800 rounded-lg">
            <div className="min-w-full divide-y divide-gray-700">
              {/* Mobile View */}
              <div className="sm:hidden space-y-4 p-4">
                {videos.map((video) => (
                  <div key={video.id} className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium">{video.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{video.category}</p>
                    <p className="text-gray-400 text-sm">Views: {video.views}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(video.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden sm:table min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {videos.map((video) => (
                    <tr key={video.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {video.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {video.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {video.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {new Date(video.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEdit(video)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Video Forms */}
        {(isAddingVideo || isEditingVideo) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={isAddingVideo ? handleSubmit : handleUpdate} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Thumbnail URL</label>
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Video URL</label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingVideo(false);
                      setIsEditingVideo(false);
                      setEditingVideoId(null);
                      setFormData({
                        title: '',
                        description: '',
                        thumbnail_url: '',
                        video_url: '',
                        category: ''
                      });
                    }}
                    className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    {isAddingVideo ? 'Add Video' : 'Update Video'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
