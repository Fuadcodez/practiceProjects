'use client'
import Link from "next/link";
import Image from "next/image";
import { images } from "@/assets";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from 'react-modal'
import { useEffect, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {HiCamera} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import { supabase } from "@/supabase";

export default function Header() {
    const {data: session} = useSession()
    console.log(session)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [postUploading, setPostUploading] = useState(false)
    const [caption, setCaption] = useState('')
    const imageRef = useRef(null)
    const addImageToPost = (e)=>{
        const file = e.target.files[0]
        if(file){
            setSelectedFile(file)
            setImageFileUrl(URL.createObjectURL(file))
            console.log(imageFileUrl)
        }
    }
    useEffect(()=>{
        if(selectedFile){
            uploadImageToStorage(selectedFile)
        }
    }, [selectedFile])
    async function uploadImageToStorage(selectedFile){
        setImageFileUploading(true)
        const fileName = new Date().getTime() + '-'+ selectedFile.name
        const { data, error } = await supabase.storage
    .from('insta-next')
    .upload(`public/${fileName}`, selectedFile);
        console.log(data)
      if (error) {
    console.error('Error uploading file:', error);
    setImageFileUploading(false)
    setImageFileUrl(null)
    setSelectedFile(null)
  } else {
    console.log('File uploaded successfully:', data);
    const imageUrl =supabase.storage.from('insta-next').getPublicUrl(`public/${fileName}`).data.publicUrl
    setImageFileUrl(imageUrl)
    setImageFileUploading(false)
    
    console.log('File received successfully:', data);
  }
    }
    const handleSubmit = async ()=>{
    setPostUploading(true)
    try {
        const { data: newPost, error } = await supabase
        .from("posts") // Name of your table
        .insert([{username:session.user.name, caption, profileImg: session.user.image, image:imageFileUrl, }]); // Insert takes an array of objects
if (error) {
    throw error;
}
setPostUploading(false)
setIsOpen(false)
location.reload()
console.log("Record inserted:", newPost);
} catch (error) {
console.error("Error adding record:", error.message);
}
}
  return (
    <header className="shadow-sm sticky border-b top-0 bg-white z-30 p-3">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
            {/* Logo */}
            <Link href='/' className="lg:hidden">
            <Image src={images.instagram} alt="instagram-header" width={40} height={40}/>
            </Link>
            <Link href='/' className="hidden lg:inline-flex">
            <Image src={images.instagram2} alt="instagram-header2" width={96} height={96}/>
            </Link>
            {/* Search input */}
            <input type="text" placeholder="search" className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"/>

            {/* Menu items */}

            {session ?
            <div className="flex items-center gap-5">
            <IoMdAddCircleOutline  className="text-2xl cursor-pointer transform hover:scale-125 text-black transition duration-300 hover:text-red-600" onClick={()=>setIsOpen(true)}/>
            <img src={session.user.image} alt={session.user.name} className="rounded-full cursor-pointer w-10 h-10" onClick={signOut}/>
            </div>
            : <button className="font-semibold text-sm text-blue-500" onClick={()=> signIn()}>
                    Log in
                </button>
            }
        </div>
            {isOpen && (<Modal isOpen={isOpen} ariaHideApp={false} className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md text-black' onRequestClose={()=>setIsOpen(false)}>
                <AiOutlineClose className="absolute top-2 right-2 cursor-pointer hover:text-red-600 transition duration-300 transform hover:scale-125" onClick={()=>setIsOpen(false)}/>
                    {selectedFile? <img src={imageFileUrl} alt="selected image" className={`${imageFileUploading ? 'animate-pulse': ''} w-full max-h-[250px] cursor-pointer object-cover`}  onClick={()=>setSelectedFile(null)}/> :<div className="flex flex-col items-center justify-center h-[100%]">
                    <HiCamera className="text-4xl text-gray-400 cursor-pointer" onClick={()=>imageRef.current?.click()}/>
                    <input hidden ref={imageRef} type="file" accept="image/*" onChange={addImageToPost} />
                </div>}
                
                <input type="text" maxLength='150' placeholder="please enter your caption" className="m-4 text-center border-none w-full focus:ring-0 outline-none" onChange={(e)=>setCaption(e.target.value)}/>
                <button className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100" onClick={handleSubmit} disabled={!selectedFile||caption.trim()===''||postUploading||imageFileUploading}
                >Upload Post</button>
            </Modal>)}
    </header>
  )

}
