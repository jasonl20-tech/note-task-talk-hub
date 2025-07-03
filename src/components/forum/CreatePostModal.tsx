
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string, authorName: string) => void;
}

export function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) return;
    
    onSubmit(formData.title, formData.content, formData.author);
    setFormData({ title: "", content: "", author: "" });
  };

  const handleClose = () => {
    setFormData({ title: "", content: "", author: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Neuen Post erstellen</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="author">Dein Name</Label>
              <Input
                id="author"
                type="text"
                placeholder="Wie sollen andere dich nennen?"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                type="text"
                placeholder="Worum geht es in deinem Post?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="content">Inhalt</Label>
              <Textarea
                id="content"
                placeholder="Teile deine Gedanken, Fragen oder Erfahrungen..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={!formData.title.trim() || !formData.content.trim() || !formData.author.trim()}>
              Veröffentlichen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
