
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Cast the data to match our Task interface
      const typedTasks: Task[] = (data || []).map(task => ({
        ...task,
        status: task.status as Task["status"],
        priority: task.priority as Task["priority"]
      }));
      
      setTasks(typedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Fehler",
        description: "Tasks konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string, description: string, priority: Task["priority"], dueDate: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            description,
            priority,
            due_date: dueDate || null,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      // Cast the returned data to match our Task interface
      const typedTask: Task = {
        ...data,
        status: data.status as Task["status"],
        priority: data.priority as Task["priority"]
      };
      
      setTasks([typedTask, ...tasks]);
      toast({
        title: "Erfolg",
        description: "Task wurde erstellt.",
      });
      return typedTask;
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Fehler",
        description: "Task konnte nicht erstellt werden.",
        variant: "destructive",
      });
    }
  };

  const updateTaskStatus = async (id: string, status: Task["status"]) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Cast the returned data to match our Task interface
      const typedTask: Task = {
        ...data,
        status: data.status as Task["status"],
        priority: data.priority as Task["priority"]
      };
      
      setTasks(tasks.map(task => task.id === id ? typedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Fehler",
        description: "Task-Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Erfolg",
        description: "Task wurde gelöscht.",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Fehler",
        description: "Task konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return {
    tasks,
    loading,
    createTask,
    updateTaskStatus,
    deleteTask,
  };
}
