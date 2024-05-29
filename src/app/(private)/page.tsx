'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Main = () => {
    const router = useRouter();
    useEffect(()=> {
        if(localStorage.getItem(btoa('token'))) router.push('/dashboard');
        else router.push('/auth')
    }, [])

    return (
        <>
            <div className='flex w-screen h-screen items-center justify-center'>
                <div className="loader"></div>
            </div>
        </>
    )
}

export default Main