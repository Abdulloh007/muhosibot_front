'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';
import TabsCom from '@/components/SettingCom/tabs';
import Topbar from '@/components/core/AllComponent/topbar'
import NextTopLoader from 'nextjs-toploader';

const Setting = () => {
    return (
        <>
            <Sidebar />

            <main className='w-full h-full pl-[100px]'>
                <Topbar />
                <TabsCom />
            </main>
        </>
    )
}

export default Setting