import React from 'react'
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/supabase';
import Post from './Post';
export const Posts = async () => {
 const { data, error } = await supabase
    .from('posts') // Table name
    .select('*') // Select all columns or specify specific ones
    .order('created_at', { ascending: false }); // Order by 'timestamp' in descending order

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  // Data is an array of posts with their fields
  console.log('Posts:', data);

  return (
    <div>
      {data.map((post,index)=>(
        <Post key={post.id} post={post} />

      )
      )}
    </div>
  )
}
