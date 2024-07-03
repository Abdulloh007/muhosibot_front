'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/PayComponent/tabs';
import Topbar from '@/components/core/AllComponent/topbar'
import FooterPaying from '@/components/PayComponent/footerPaying'


const Paying = () => {
  return (
    <>
      <Sidebar />
      <main className='w-full h-full pl-[100px]'>
        <Topbar />
        <div className='flex flex-col justify-center items-center w-full'>
          <Tabs />
        </div>
      </main>
    </>
  )
}

export default Paying