
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  likes: number;
  created_at: string;
  updated_at: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
}

export function useForumPosts() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      const { data: commentsData, error: commentsError } = await supabase
        .from('forum_comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      const postsWithComments = (postsData || []).map(post => ({
        ...post,
        comments: (commentsData || []).filter(comment => comment.post_id === post.id)
      }));

      setPosts(postsWithComments);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Fehler",
        description: "Forum-Posts konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title: string, content: string, authorName: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([
          {
            title,
            content,
            author_name: authorName,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      const newPost = { ...data, comments: [] };
      setPosts([newPost, ...posts]);
      toast({
        title: "Erfolg",
        description: "Post wurde erstellt.",
      });
      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Fehler",
        description: "Post konnte nicht erstellt werden.",
        variant: "destructive",
      });
    }
  };

  const likePost = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const { data, error } = await supabase
        .from('forum_posts')
        .update({
          likes: post.likes + 1,
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: data.likes } : p));
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Fehler",
        description: "Post konnte nicht geliked werden.",
        variant: "destructive",
      });
    }
  };

  const addComment = async (postId: string, content: string, authorName: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .insert([
          {
            post_id: postId,
            content,
            author_name: authorName,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, data] }
          : post
      ));
      toast({
        title: "Erfolg",
        description: "Kommentar wurde hinzugefügt.",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Fehler",
        description: "Kommentar konnte nicht hinzugefügt werden.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    likePost,
    addComment,
  };
}
