
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, Clock, User, Send } from "lucide-react";
import { ForumPost } from "@/hooks/useForumPosts";

interface PostDetailModalProps {
  post: ForumPost | null;
  onClose: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string, authorName: string) => void;
}

export function PostDetailModal({ post, onClose, onLike, onComment }: PostDetailModalProps) {
  const [commentData, setCommentData] = useState({
    content: "",
    author: ""
  });

  if (!post) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentData.content.trim() || !commentData.author.trim()) return;
    
    onComment(post.id, commentData.content, commentData.author);
    setCommentData({ content: "", author: "" });
  };

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{post.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Post Header */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <User className="w-3 h-3 mr-1" />
              {post.author_name}
            </Badge>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(post.created_at).toLocaleDateString('de-DE')}
            </Badge>
          </div>
          
          {/* Post Content */}
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
          
          {/* Post Actions */}
          <div className="flex items-center justify-between py-4 border-y">
            <Button
              variant="ghost"
              onClick={() => onLike(post.id)}
              className="text-gray-600 hover:text-red-500"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {post.likes} Likes
            </Button>
            
            <div className="flex items-center gap-1 text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments.length} Kommentare</span>
            </div>
          </div>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <h3 className="font-semibold text-gray-900">Kommentar hinzufügen</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Dein Name"
                value={commentData.author}
                onChange={(e) => setCommentData({ ...commentData, author: e.target.value })}
                required
              />
            </div>
            
            <Textarea
              placeholder="Schreibe einen Kommentar..."
              value={commentData.content}
              onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
              rows={3}
              required
            />
            
            <Button 
              type="submit" 
              disabled={!commentData.content.trim() || !commentData.author.trim()}
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Kommentar senden
            </Button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">
              Kommentare ({post.comments.length})
            </h3>
            
            {post.comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Noch keine Kommentare. Sei der Erste!
              </p>
            ) : (
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <User className="w-3 h-3 mr-1" />
                        {comment.author_name}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
