'use client'
import React from 'react';
import Header from '@/components/header';
import Tabs from '@/components/ProductCompnent/tabs';
import Notify from '@/components/core/AllComponent/notify'
import NextTopLoader from 'nextjs-toploader';

const Product = () => {
  return (
    <div className='flex'>
      <div className='h-screen flex'>
        <Header />
      </div>
      <main className='ml-40 h-full'>
        <Notify />
        <Tabs />
      </main>
    </div>
  );
};

export default Product;
