'use client'
import React from 'react';
import Header from '@/Components/header';
import Tabs from '@/Components/MoneyComponent/tabs';
import Notify from '@/Components/core/AllComponent/notify'
import FooterMoney from '@/Components/MoneyComponent/footerMoney'
import NextTopLoader from 'nextjs-toploader';

const Money = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Header />
      </div>
      <main className='ml-20'>
        <Notify />
        <div className='flex flex-col justify-center items-center w-full'>
          <Tabs />
          <FooterMoney />
        </div>
      </main>
    </div>
  )
}

export default Money