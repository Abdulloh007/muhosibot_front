'use client'
import React from 'react';
import Header from '@/components/header';
import Tabs from '@/components/PayComponent/tabs';
import Notify from '@/components/core/AllComponent/notify'
import FooterPaying from '@/components/PayComponent/footerPaying'


const Paying = () => {
  return (
    <div className='flex'>

      <div className='h-screen flex'>
        <Header />
      </div>
      <main className='ml-40'>
        <Notify />
        <div className='flex flex-col justify-center items-center w-full'>
          <Tabs />
          <FooterPaying />
        </div>
      </main>
    </div>
  )
}

export default Paying