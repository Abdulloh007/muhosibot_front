'use client'
import React from 'react';
import Header from '@/Components/header';
import Tabs from '@/Components/ConsoleCom/tabs';
import Notify from '@/Components/core/AllComponent/notify'


const Console = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Header />
      </div>
      <main className='w-full h-full pl-[100px]'>
        <Notify />
        <Tabs />
      </main>
    </div>
  )
}

export default Console