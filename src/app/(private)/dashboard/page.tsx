'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/ConsoleCom/tabs';
import Topbar from '@/components/core/AllComponent/topbar'
import SecondApp from '@/components/ConsoleCom/secondTab';


const Console = () => {
  return (
    <>
      <Sidebar />

      <main className='w-full h-full pl-[100px]'>
        <Topbar />
        <Tabs />
      </main>
    </>

  )
}

export default Console