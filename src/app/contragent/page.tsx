'use client'
import React from 'react';
import Header from '@/components/header';
import Tabs from '@/components/ContragentComponent/tabs';
import Notify from '@/components/core/AllComponent/notify'

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