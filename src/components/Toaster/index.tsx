'use client'

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react"

interface Props { 
    color: string | null;
    text: string;
}

export function Toaster(props: Props) {
    const [classList, setClassList] = useState('p-2 w-full bg-gray-400 text-white text-base rounded-sm transition-all mb-3')

    useEffect(() => {
        if (props.color == 'danger') {
            setClassList('p-2 w-full bg-red-500 text-white text-base rounded-sm transition-all mb-3')
        } else if (props.color == 'warn') {
            setClassList('p-2 w-full bg-amber-300 text-black text-base rounded-sm transition-all mb-3')
        }

        setTimeout(() => setClassList(classList + ' absolute z-[-1] pointer-events-none opacity-0'), 5000)
    }, [])

    return (
        <>
            <div className={classList}>
                {props.text}
            </div>
        </>
    )
}

export function ToastList() {
    const toastList = useAppSelector(state => state.toaste.list)
    return (
        <>
            <div className="fixed flex flex-col top-5 right-5 w-[250px] h-full pointer-events-none">
                {toastList.map((item: any, idx: any) => (<Toaster key={idx} color={item.color} text={item.text} />))}
            </div>
        </>
    )
}