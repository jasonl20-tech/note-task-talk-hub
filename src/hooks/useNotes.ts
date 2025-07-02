
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchNotes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Fehler",
        description: "Notizen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title: string, content: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            title,
            content,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setNotes([data, ...notes]);
      toast({
        title: "Erfolg",
        description: "Notiz wurde erstellt.",
      });
      return data;
    } catch (error) {
      console.error('Error creating note:', error);
      toast({
        title: "Fehler",
        description: "Notiz konnte nicht erstellt werden.",
        variant: "destructive",
      });
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notes')
        .update({
          title,
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setNotes(notes.map(note => note.id === id ? data : note));
      toast({
        title: "Erfolg",
        description: "Notiz wurde aktualisiert.",
      });
    } catch (error) {
      console.error('Error updating note:', error);
      toast({
        title: "Fehler",
        description: "Notiz konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  const deleteNote = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setNotes(notes.filter(note => note.id !== id));
      toast({
        title: "Erfolg",
        description: "Notiz wurde gelöscht.",
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Fehler",
        description: "Notiz konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
  };
}
