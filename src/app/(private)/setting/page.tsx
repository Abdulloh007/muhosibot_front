'use client'
import React from 'react';
import Header from '@/components/header';
import TabsCom from '@/components/SettingCom/tabs';
import Notify from '@/components/core/AllComponent/notify'
import NextTopLoader from 'nextjs-toploader';

const Setting = () => {
    return (
        <div className='flex'>
            <div className='h-screen flex'>
                <Header />
            </div>
            <main className='ml-40 h-full'>
                <Notify />
                <TabsCom />
            </main>
        </div>
    )
}

export default Setting