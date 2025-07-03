-- Temporarily disable RLS for forum_posts to test
ALTER TABLE public.forum_posts DISABLE ROW LEVEL SECURITY;

-- Re-enable it with a simpler policy first
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Everyone can view forum posts" ON public.forum_posts;
DROP POLICY IF EXISTS "Users can create forum posts" ON public.forum_posts;
DROP POLICY IF EXISTS "Users can update their own forum posts" ON public.forum_posts;
DROP POLICY IF EXISTS "Users can delete their own forum posts" ON public.forum_posts;

-- Create new policies with better error handling
CREATE POLICY "Everyone can view forum posts" 
ON public.forum_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create forum posts" 
ON public.forum_posts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can update their own forum posts" 
ON public.forum_posts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own forum posts" 
ON public.forum_posts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);