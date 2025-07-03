
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ForumHeaderProps {
  onCreatePost: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: 'newest' | 'popular' | 'commented';
  onSortChange: (sort: 'newest' | 'popular' | 'commented') => void;
}

export function ForumHeader({ 
  onCreatePost, 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}: ForumHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
          <p className="text-gray-600">Diskutiere, teile Wissen und vernetze dich mit der Community</p>
        </div>
        <Button onClick={onCreatePost} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neuer Post
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Forum durchsuchen..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sortieren" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Neueste</SelectItem>
              <SelectItem value="popular">Beliebteste</SelectItem>
              <SelectItem value="commented">Meiste Kommentare</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
