'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import TabsCom from '@/components/SettingCom/tabs';
import Topbar from '@/components/core/AllComponent/topbar'
import NextTopLoader from 'nextjs-toploader';

const Setting = () => {
    return (
        <div className='flex'>
            <div className='h-screen flex'>
                <Sidebar />
            </div>
            <main className='w-full h-full pl-[100px]'>
                <Topbar />
                <TabsCom />
            </main>
        </div>
    )
}

export default Setting