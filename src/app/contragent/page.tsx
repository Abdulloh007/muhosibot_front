'use client'
import React from 'react';
import Header from '@/Components/header';
import Tabs from '@/Components/ContragentComponent/tabs';
import Notify from '@/Components/core/AllComponent/notify'

const Contragent = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Header />
      </div>
      <main className='ml-40'>
        <Notify />
        <Tabs />
      </main>
    </div>
  )
}

export default Contragent