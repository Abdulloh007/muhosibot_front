'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/MoneyComponent/tabs';
import Topbar from '@/components/core/AllComponent/topbar'
import FooterMoney from '@/components/MoneyComponent/footerMoney'
import NextTopLoader from 'nextjs-toploader';

const Money = () => {
  return (
    <>
      <Sidebar />

      <main className='w-full h-full pl-[100px]'>
        <Topbar />
        <div className='flex flex-col justify-center items-center w-full'>
          <Tabs />
          <FooterMoney />
        </div>
      </main>
    </>

  )
}

export default Money