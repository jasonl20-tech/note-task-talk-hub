
import { Layout } from "@/components/Layout";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { ForumStats } from "@/components/forum/ForumStats";
import { ForumPostList } from "@/components/forum/ForumPostList";
import { CreatePostModal } from "@/components/forum/CreatePostModal";
import { PostDetailModal } from "@/components/forum/PostDetailModal";
import { useState } from "react";
import { useForumPosts, ForumPost } from "@/hooks/useForumPosts";

const Forum = () => {
  const { posts, loading, createPost, likePost, addComment } = useForumPosts();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'commented'>('newest');

  const filteredAndSortedPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'commented':
          return b.comments.length - a.comments.length;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const handleCreatePost = async (title: string, content: string, authorName: string) => {
    const newPost = await createPost(title, content, authorName);
    if (newPost) {
      setShowCreateModal(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ForumHeader 
          onCreatePost={() => setShowCreateModal(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        <ForumStats posts={posts} />
        
        <ForumPostList
          posts={filteredAndSortedPosts}
          loading={loading}
          onPostClick={setSelectedPost}
          onLike={likePost}
        />

        <CreatePostModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />

        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={likePost}
          onComment={addComment}
        />
      </div>
    </Layout>
  );
};

export default Forum;
