'use client'

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react"

interface Props { 
    color: string | null;
    text: string;
}

export function Toaster(props: Props) {
    const [classList, setClassList] = useState('bg-gray-400 text-white')

    useEffect(() => {
        if (props.color == 'danger') {
            setClassList('bg-red-500 text-white')
        } else if (props.color == 'warn') {
            setClassList('bg-amber-300 text-black')
        }

        setTimeout(() => setClassList(classList + ' absolute z-[-1] pointer-events-none opacity-0'), 5000)
    }, [])

    const closeToast = () => {
        setClassList(classList + ' absolute z-[-1] pointer-events-none opacity-0')
    }

    return (
        <>
            <div onClick={closeToast} className={'p-2 w-full text-base rounded-md transition-all mb-3 cursor-pointer shadow-md ' + classList}>
                {props.text}
            </div>
        </>
    )
}

export function ToastList() {
    const toastList = useAppSelector(state => state.toaste.list)
    
    return (
        <>
            <div className="fixed flex flex-col top-5 right-5 w-[250px] z-50">
                {toastList.map((item: any, idx: any) => (<Toaster key={idx} color={item.color} text={item.text} />))}
            </div>
        </>
    )
}