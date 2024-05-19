'use client'
import React from 'react';
import Header from '@/Components/header';
import Tabs from '@/Components/DocumentCom/tabs';
import Notify from '@/Components/core/AllComponent/notify'



const Document = () => {
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

export default Document;
