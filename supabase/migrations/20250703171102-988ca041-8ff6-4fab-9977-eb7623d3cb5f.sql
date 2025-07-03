-- Fix RLS policies for forum_comments
DROP POLICY IF EXISTS "Everyone can view forum comments" ON public.forum_comments;
DROP POLICY IF EXISTS "Users can create forum comments" ON public.forum_comments;
DROP POLICY IF EXISTS "Users can update their own forum comments" ON public.forum_comments;
DROP POLICY IF EXISTS "Users can delete their own forum comments" ON public.forum_comments;

-- Create new policies with better authentication handling
CREATE POLICY "Everyone can view forum comments" 
ON public.forum_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create forum comments" 
ON public.forum_comments 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can update their own forum comments" 
ON public.forum_comments 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own forum comments" 
ON public.forum_comments 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);