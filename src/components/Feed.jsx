import React from 'react'
import { MiniProfile } from './MiniProfile'
import { Posts } from './Posts'
export default function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-6xl mx-auto'>
      {/* Posts (left) */}
      <section className='md:col-span-2'>
        <Posts />
      </section>
      {/* Main profile(right) */}
      <section className='hidden md:inline-grid col-span-1'>
        <MiniProfile/>
      </section>
    </main>
  )
}
