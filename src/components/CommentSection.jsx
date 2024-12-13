'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { supabase } from '@/supabase'
import Moment from 'react-moment'
const CommentSection = ({id}) => {
    const {data:session} = useSession()
    const [comment , setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [hasCommented, setHasCommented] = useState(false)
    useEffect(()=>{
      const fetchComment = async ()=>{
        const {data, error} = await supabase.from('comments').select('*').eq('user_id', id).order('created_at', { ascending: false })
        if(error) console.error('failed to fetch comments')
          else{
            setAllComments(data)
            console.log(`comments ${id} fetched successfully`)
          }
        }
        fetchComment()
    }, [hasCommented])
    const handleSubmit = async (e)=>{
      e.preventDefault()
      setHasCommented(true)
      if(comment.trim()){
        const co = comment.trim()
        const { error} = await supabase.from('comments').insert({
          username: session?.user?.username,
          comment: co,
          userImage: session?.user?.image,
          user_id: id
        })
        if (error) {console.error('comment not uploaded')
        }
      else{
        setComment('')
        setHasCommented(false)

      }
        }
    }
  return (
    <div>
      {allComments.length>0  && <div className='mx-10 h-24 max-h-24 overflow-y-auto'>
        {allComments.map((allComment, index)=>(
          <div key={index} className='flex items-center space-x-2 mb-2 justify-between pr-2'>
            <img src={allComment.userImage} alt={`${allComment.username} image`} className='h-7 w-7 rounded-full object-cover border p-[2px]'/>
            <p className='text-sm flex-1 truncate'>
              <span className='font-bold text-gray-700'>{allComment.username}</span>{' '}
              {allComment.comment}
            </p>
            <Moment fromNow className='text-xs text-gray-400'>
              {new Date(allComment?.created_at)}
            </Moment>
          </div>
        ))}
      </div>}
        {session && 
        <form className='flex items-center p-4 gap-2' onSubmit={handleSubmit}>
            <img src={session.user.image} alt="user-image" className='h-10 w-10 rounded-full object-cover border p-[4px] ' />
            <input type="text"  value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Add a comment...' className='border-none flex-1 focus:ring-0 outline-none'/>
            <button disabled={!comment.trim()} type='submit' className=' text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400' >Post</button>
        </form>}
    </div>
  )
}

export default CommentSection