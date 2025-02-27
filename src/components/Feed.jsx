import React from 'react'
import { MiniProfile } from './MiniProfile'
import { Posts } from './Posts'
export default function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
      {/* Posts (left) */}
      <section className='md:col-span-2'>
        <Posts />
      </section>
      {/* Main profile(right) */}
      <section className='relative hidden md:inline-grid md:col-span-1'>
        <div className='fixed w-[380px]'>
        <MiniProfile/>
        </div>
      </section>
    </main>
  )
}
