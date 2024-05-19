'use client'
import React from 'react';
import Header from '@/Components/header';
import Tabs from '@/Components/tableComponent/test';
import Notify from '@/Components/core/AllComponent/notify'


const Explorer = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Header/>
      </div>
      <main className='ml-40'>
        <Notify/>
        <Tabs/>
      </main>
    </div>
  );
};

export default Explorer;
