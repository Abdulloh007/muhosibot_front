'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { ExpandMore } from '@mui/icons-material';
import { Select, SelectItem } from "@nextui-org/react";
// import BtnPurple from '@/Components/core/AllComponent/buttonPurple';
import { formInput } from './data'


export default function Home2() {
    const [isCollapse, setCollapse] = useState<boolean>(false);
    const typeOfBisness = 'ООО'
    const systemTax = 'УСН'

    const handleSubmit = () => {
        console.log('Зарегистрировался')
    }

    const btnClass = {
        trigger: ["shadow-none", "p-0", "bg-transparent", "rounded-none", "min-h-0", "h-[30px]", "pl-[5px]"]
    }


    return (
        <main className='w-full flex justify-center items-center h-screen ml-10'>
            <div className="w-[600px] h-[750px] shadow-2xl px-[113px] flex flex-col items-center">
                <Image className='mb-[17px] mt-[-85px]' src='/iconMenu/logoA.svg' width={173} height={120} alt="LogoAuth" />
                <div className='flex flex-col'>
                    <div className='text-center font-montserrat'>
                        <p className='text-[36px] font-bold text-purpleLg '>Мухосиби Ман</p>
                        <p className='text-[22px] font-bold text-purpleMid'>Осон, Кулай, Тез</p>
                    </div>
                    <div className='text-center mt-[31px]'>
                        <p className='text-[18px] mb-[10px]'>Выберите вид деятельности <span className='text-purpleMid underline pl-[10px]'>{typeOfBisness}</span></p>
                        <p className='text-[18px]'>Система налогообложения<span className='text-purpleMid underline pl-[10px]'>{systemTax}</span></p>
                    </div>
                    <form onSubmit={handleSubmit} className='w-[374px] mt-[21px]'>
                        <div className='flex flex-col'>
                            {formInput.map((o) => (
                                <React.Fragment key={o.id}>
                                    {(o.id === 2) ? (
                                        <>
                                            <Select
                                                placeholder="Выберите тип деятельности"
                                                labelPlacement="outside"
                                                className="mt-[20px] pl-[5px] bg-[#F1F1F1] border-b-2 text-[14px]"
                                                disableSelectorIconRotation
                                                classNames={btnClass}
                                                selectorIcon={<ExpandMore />}

                                            >
                                                {o.typeOfBisness ? o.typeOfBisness.map((item) => (
                                                    <SelectItem key={item.txt} value={item.txt}>
                                                        {item.txt}
                                                    </SelectItem>
                                                )) : (<></>)}
                                            </Select>
                                        </>
                                    ) : (
                                        <input key={o.id} type={o.type} placeholder={o.placeHolder} className='border-b-2 h-[30px] bg-[#F1F1F1] mt-[20px] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none' />
                                    )}
                                </React.Fragment>
                            ))}
                            <button>Зарегистрироваться</button>
                        </div>

                    </form>

                    <div className='flex flex-col text-center mt-[60px]'>
                        <p className='text-lg text-[#757575]'>Уже регистрировались?</p>
                        <a className='text-lg text-[#4D89FF]' href="/">Войдите в аккаунт</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
