'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/ConsoleCom/tabs';
import Topbar from '@/components/core/AllComponent/topbar'


const Console = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Sidebar />
      </div>
      <main className='w-full h-full pl-[100px]'>
        <Topbar />
        <Tabs />
      </main>
    </div>
  )
}

export default Console