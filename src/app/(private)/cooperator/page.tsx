'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/tableComponent/test';
import Topbar from '@/components/core/AllComponent/topbar'


const Explorer = () => {
  return (
    <>
      <Sidebar />
      <main className='w-full h-full pl-[100px]'>
        <Topbar />
        <Tabs />
      </main>
    </>
  );
};

export default Explorer;
