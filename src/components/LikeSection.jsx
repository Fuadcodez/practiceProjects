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
    console.log(id)
    fetchLikes();
  }, [id]);

  // Check if the current user has liked the post
  useEffect(() => {
    if (likes.some((like) => like.user_id === session?.user?.id)) {
      setHasLiked(true);
      console.log(`he has liked ${id}`)
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
        .eq('user_id', session.user.id);

      if (error) {
        console.error(error);
      } else {
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.user_id !== session.user.id)
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
    <div>
        {session&&<div className='flex border-t border-gray-100'>
            {hasLiked? (<HiHeart onClick={likePost} className='text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out'/>): (<HiOutlineHeart onClick={likePost} className='cursor-pointer text-3xl hover:scale-125 transition-transform'/>)}
            </div>}
    </div>
  )
}

export default LikeSection