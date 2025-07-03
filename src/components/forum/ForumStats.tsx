
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Users, TrendingUp } from "lucide-react";
import { ForumPost } from "@/hooks/useForumPosts";

interface ForumStatsProps {
  posts: ForumPost[];
}

export function ForumStats({ posts }: ForumStatsProps) {
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);
  const activeUsers = new Set(posts.map(post => post.author_name)).size;

  const stats = [
    { icon: MessageSquare, label: "Posts", value: totalPosts, color: "text-blue-600" },
    { icon: ThumbsUp, label: "Likes", value: totalLikes, color: "text-green-600" },
    { icon: Users, label: "Aktive User", value: activeUsers, color: "text-purple-600" },
    { icon: TrendingUp, label: "Kommentare", value: totalComments, color: "text-orange-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
