'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/tableComponent/test';
import Topbar from '@/components/core/AllComponent/topbar'


const Explorer = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Sidebar/>
      </div>
      <main className='w-full h-full pl-[100px]'>
        <Topbar/>
        <Tabs/>
      </main>
    </div>
  );
};

export default Explorer;
