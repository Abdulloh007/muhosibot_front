"use client";
import React from 'react'
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import ChevronLeftIcon from "@/components/core/Icons/ChevronLeft";
import Link from "next/link";
import {
    defaultStyleInput,
    defaultStyleLabel,
    defaultStyleDiv,
    btnClass,
    TypeOperation,
    TypeOperationDoc,
} from './data';
import { ExpandMore } from '@mui/icons-material';

const handleSubmit = () => {
    console.log('lox')
}

const Form = () => {
    return (
        <div className='mt-10 h-[90%]'>
            <div className="container-form h-full">
                <div className='flex items-center mb-[38px]'>
                    <Link href='/money'>
                        <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
                            <ChevronLeftIcon />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-[18px] ml-[16px]'>Поступление по банку</h1>
                </div>
                <form action="">
                        <div className='flex w-full  items-baseline mb-[18px]'>
                            <label className='flex w-full items-baseline'>
                                <div>
                                    <p style={defaultStyleLabel}>Тип операции</p>
                                </div>
                                <div style={defaultStyleDiv}>
                                    <Select
                                        placeholder="Оплата товаров и услуг"
                                        labelPlacement="outside"
                                        className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                                        disableSelectorIconRotation
                                        classNames={btnClass}
                                        selectorIcon={<ExpandMore />}
                                    >
                                        {TypeOperation.map((item) => (
                                            <SelectItem
                                                key={item.txt.toLocaleLowerCase()}
                                                value={item.txt.toLocaleLowerCase()}
                                            >
                                                {item.txt}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[18px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Сумма</p>
                                <div style={defaultStyleDiv}>
                                    <input
                                        aria-label='Cумма'
                                        type="number"
                                        step="0.01"
                                        placeholder='0.00'
                                        className='bg-white h-[30px] placeholder:text-black text-end border-b-2 border-[#A774FF]  pl-[5px] text-[14px] hover:border-b-2  focus:outline-none'
                                    />
                                    смн
                                </div>
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[18px]'>
                            <label className=' flex items-center'>
                                <p style={defaultStyleLabel}>Учитывать
                                    <br />в доходах УСН</p>
                                <div style={defaultStyleDiv}>
                                    <input
                                        aria-label='Учитывать в доходах УСН'
                                        type="number"
                                        step="0.01"
                                        placeholder='0.00'
                                        className='border-b-2 h-[30px] bg-[#F1F1F1] border-[#757575] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none'
                                    />
                                    смн
                                </div>
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[18px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Дата поступления</p>
                                <input
                                    aria-label='Дата поступления'
                                    type="date"
                                    style={defaultStyleDiv}
                                    className='border-b-2 h-[30px] bg-[#F1F1F1] border-[#757575] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none'
                                />
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className='w-full flex items-baseline'>
                                <p style={defaultStyleLabel}>Контрагент</p>
                                <input
                                    aria-label='Контрагент'
                                    type="text"
                                    style={defaultStyleDiv}
                                    placeholder='Введите название или ИНН'
                                    className={defaultStyleInput}
                                />
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className='w-full flex items-baseline'>
                                <p style={defaultStyleLabel}>Платежный документ</p>
                                <div style={defaultStyleDiv} className='flex items-center' >
                                    <Select
                                        placeholder="Платёжное поручение"
                                        labelPlacement="outside"
                                        className="bg-[#F1F1F1] border-b-2 mr-1 border-[#757575]"
                                        disableSelectorIconRotation
                                        classNames={btnClass}
                                        selectorIcon={<ExpandMore />}
                                    >
                                        {TypeOperationDoc.map((item) => (
                                            <SelectItem
                                                key={item.txt.toLocaleLowerCase()}
                                                value={item.txt.toLocaleLowerCase()}
                                            >
                                                {item.txt}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    №
                                    <input
                                        aria-label='Платёжное поручение'
                                        type="text"
                                        className={`${defaultStyleInput} ml-1`}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className='w-full flex items-baseline'>
                                <p style={defaultStyleLabel}>Контрагент</p>
                                <textarea placeholder='Введите название или ИНН' style={defaultStyleDiv} className={`${defaultStyleInput} min-h-[60px] h-[60px]`}></textarea>
                            </label>
                        </div>
                    <div className="flex items-baseline mt-16">
                        <div onSubmit={handleSubmit}>
                            <Button
                                className="m-auto py-[10px] px-[25px] bg-[#A774FF] rounded-lg text-white text-sm mt-[25px]"
                                size="md"
                            >
                                Сохранить
                            </Button>
                        </div>
                        <div className="ml-2">
                            <Button
                                className="py-[10px] px-[25px] bg-transparent rounded-lg text-[#4D89FF] font-semibold hover:bg-[#EEEEEE]  "
                                size="md"
                            >
                                Отменить
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form