'use client'
import React from 'react';
import Sidebar from '@/components/sidebar';

import Topbar from '@/components/core/AllComponent/topbar'
import NextTopLoader from 'nextjs-toploader';
import Container from './_components/container';

const Setting = () => {
    return (
        <>
            <Sidebar />

            <main className='w-full h-full pl-[100px]'>
                <Topbar />
                <Container />
            </main>
        </>
    )
}

export default Setting