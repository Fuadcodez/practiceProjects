'use client'
import React, { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { supabase } from '@/supabase'
import { HiHeart } from 'react-icons/hi'
import { HiOutlineHeart } from 'react-icons/hi'
const LikeSection = ({id}) => {
    const {data:session} = useSession()
    const [hasLiked, setHasLiked] = useState(false)
    const [likes, setLikes] = useState([])
    useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', id)
        // .eq('user_id', session?.user?.id);

      if (error) console.error(error);
      else {setLikes(data)
        console.log('data added');
      };}
      fetchLikes();
    }, [id]);
    
    // Check if the current user has liked the post
    useEffect(() => {
    console.log(likes)
    if (likes.some((like) => like.username === session?.user?.username)) {
      setHasLiked(true);
      console.log(`he has liked ${id}`)
      console.log(session.user.id)
    } else {
      setHasLiked(false);
      console.log(`he has not liked ${id}`)
    }
  }, [likes]);

  async function likePost() {
    if (hasLiked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', id)
        .eq('username', session.user.username);

      if (error) {
        console.error(error);
      } else {
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.username !== session.user.username)
        );
      }
    } else {
      const { error } = await supabase.from('likes').insert({
        post_id: id,
        user_id: session.user.id,
        username: session.user.username,
      });

      if (error) {
        console.error(error);
      } else {
        setLikes((prevLikes) => [
          ...prevLikes,
          { post_id: id, user_id: session.user.id, username: session.user.username },
        ]);
      }
    }
  }

  // Handle liking/unliking
  // async function likePost() {
  //   if (hasLiked) {
  //     // Remove like
  //     const { error } = await supabase
  //       .from('likes')
  //       .delete()
  //       .eq('post_id', id)
  //       .eq('user_id', session.user.id);

  //     if (error) console.error(error);
  //   } else {
  //     // Add like
  //     const { error } = await supabase.from('likes').insert({
  //       post_id: id,
  //       user_id: session.user.id,
  //       username: session.user.username, // Replace this with the username field if available
  //     });

  //     if (error) console.error(error);
     
      
  //   }
  // }
  return (
    <div className='flex items-center gap-1'>
        {session&&<div className='flex border-t border-gray-100'>
            {hasLiked? (<HiHeart onClick={likePost} className='text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out'/>): (<HiOutlineHeart onClick={likePost} className='cursor-pointer text-3xl hover:scale-125 transition-transform'/>)}
            </div>}
            {likes.length > 0 && (<p className='text-gray-500'>
              {likes.length} {likes.length > 1 ? 'likes': 'like'}
            </p>)}
    </div>
  )
}

export default LikeSection