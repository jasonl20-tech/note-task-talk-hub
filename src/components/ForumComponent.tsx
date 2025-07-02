
import { useState } from "react";
import { Plus, Search, MessageSquare, ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { useForumPosts, ForumPost } from "@/hooks/useForumPosts";

export function ForumComponent() {
  const { posts, loading, createPost, likePost, addComment } = useForumPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", author: "" });
  const [commentData, setCommentData] = useState({ content: "", author: "" });

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) return;

    await createPost(formData.title, formData.content, formData.author);
    setFormData({ title: "", content: "", author: "" });
    setShowForm(false);
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentData.content.trim() || !commentData.author.trim()) return;

    await addComment(postId, commentData.content, commentData.author);
    setCommentData({ content: "", author: "" });
  };

  const handleLike = async (postId: string) => {
    await likePost(postId);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (selectedPost) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Zurück zum Forum
          </button>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>Von {selectedPost.author_name}</span>
              <span>{new Date(selectedPost.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} />
                {selectedPost.likes}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{selectedPost.content}</p>
            
            <button
              onClick={() => handleLike(selectedPost.id)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mb-6"
            >
              <ThumbsUp size={16} />
              Like ({selectedPost.likes})
            </button>

            {/* Comments */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Kommentare ({selectedPost.comments.length})
              </h3>
              
              {/* Comment Form */}
              <form onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Dein Name"
                    value={commentData.author}
                    onChange={(e) => setCommentData({ ...commentData, author: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <textarea
                  placeholder="Schreibe einen Kommentar..."
                  value={commentData.content}
                  onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kommentar hinzufügen
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {selectedPost.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="font-medium text-gray-700">{comment.author_name}</span>
                      <span>•</span>
                      <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Forum</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Neuer Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Forum durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Neuen Post erstellen</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Titel"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Dein Name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Inhalt deines Posts..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Veröffentlichen
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setSelectedPost(post)}
            >
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>Von {post.author_name}</span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  {post.comments.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchTerm ? "Keine Posts gefunden" : "Noch keine Posts vorhanden"}
          </p>
        </div>
      )}
    </div>
  );
}
