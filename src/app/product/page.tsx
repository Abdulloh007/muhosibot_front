'use client'
import React from 'react';
import Header from '@/Components/header';
import Tabs from '@/Components/ProductCompnent/tabs';
import Notify from '@/Components/core/AllComponent/notify'
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
