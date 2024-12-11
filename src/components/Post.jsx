import React from 'react'
import {HiOutlineDotsVertical} from 'react-icons/hi'
const Post = ({post}) => {
  return (
    <div className='bg-white my-7 border rounded-md text-black'>
        <div className='flex items-center p-5 border-b border-gray-100'>
            <img src={post.profileImg} alt={post.username} className='h-12 rounded-s-full object-cover border p-1 mr-3'/>
            <p className='flex-1 font-bold'>{post.username}</p>
            <HiOutlineDotsVertical className='h-5 cursor-pointer'/>
        </div>
        <img src={post.image} alt={post.caption} className='object-cover w-full' />
        <p className='p-5 truncate'>
        <span className='font-bold mr-2'>{post.username}</span>

        </p>
    </div>
  )
}

export default Post 