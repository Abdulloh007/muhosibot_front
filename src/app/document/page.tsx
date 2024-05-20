'use client'
import React from 'react';
import Header from '@/components/header';
import Tabs from '@/components/DocumentCom/tabs';
import Notify from '@/components/core/AllComponent/notify'



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
