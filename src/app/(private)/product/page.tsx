'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import Tabs from '@/components/ProductCompnent/tabs';
import Topbar from '@/components/core/AllComponent/topbar'
import NextTopLoader from 'nextjs-toploader';

const Product = () => {
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

export default Product;
