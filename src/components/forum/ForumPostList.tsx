
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, Clock, User, Eye } from "lucide-react";
import { ForumPost } from "@/hooks/useForumPosts";

interface ForumPostListProps {
  posts: ForumPost[];
  loading: boolean;
  onPostClick: (post: ForumPost) => void;
  onLike: (postId: string) => void;
}

export function ForumPostList({ posts, loading, onPostClick, onLike }: ForumPostListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Keine Posts gefunden</h3>
          <p className="text-gray-600">Sei der Erste und erstelle einen neuen Post!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1" onClick={() => onPostClick(post)}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    <User className="w-3 h-3 mr-1" />
                    {post.author_name}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(post.created_at).toLocaleDateString('de-DE')}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.content}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(post.id);
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {post.likes}
                </Button>
                
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments.length}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPostClick(post)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Ansehen
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
