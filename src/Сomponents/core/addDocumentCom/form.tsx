"use client";
import React, { useState } from 'react'
import { Button, Checkbox} from "@nextui-org/react";
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

    const [isData, setData] = useState<boolean>(false)


    return (
        <div className='mt-10 h-[90%]'>
            <div className="container-form h-full">
                <div className='flex items-center mb-[38px]'>
                    <Link href='/document'>
                        <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
                            <ChevronLeftIcon />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-[24px] ml-[16px]'>Создание документа № </h1>
                    <input style={{ width: 100 }} placeholder='1' type="text" className={`${defaultStyleInput} ml-2`} />
                    <h3 className='font-bold text-[24px] ml-[10px]  mr-[10px]'>От</h3>
                    <input style={{ width: 150 }} type="date" className={defaultStyleInput} />
                </div>
                <form action="">
                    <div className='flex flex-col items-start justify-center w-1/2'>
                        <div className='flex w-full  items-baseline mb-[18px]'>
                            <label className='flex w-full items-baseline'>
                                <div>
                                    <p style={defaultStyleLabel}>Шаблон документа</p>
                                </div>
                                <div style={defaultStyleDiv}>
                                    <Select
                                        placeholder="Счет"
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
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className=' flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Клиент</p>
                                <input
                                    type="text"
                                    style={defaultStyleDiv}
                                    placeholder='Введите название или ИНН'
                                    className={defaultStyleInput}
                                />
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className='w-full flex items-baseline'>
                                <p style={defaultStyleLabel}>Заказ, сделка, проект</p>
                                <input
                                    type="text"
                                    style={defaultStyleDiv}
                                    placeholder='Введите название или ИНН'
                                    className={defaultStyleInput}
                                />
                            </label>
                        </div>
                        <div className="flex w-full  items-baseline mb-[14px]">
                            <label className="flex w-full items-baseline">
                                <p style={defaultStyleLabel}>Срок оплаты</p>
                                <div style={defaultStyleDiv} className="flex flex-col w-full">
                                    <Checkbox onClick={() => setData(!isData)} radius="md">
                                        Указать срок оплаты
                                    </Checkbox>
                                    {isData && (
                                        <input type='date' className={`${defaultStyleInput} mt-4 w-[120px]`} />
                                    )}
                                </div>
                            </label>
                        </div>
                        <div className="flex w-full  items-baseline mb-[14px]">
                            <label className="flex w-full items-baseline">
                                <p style={defaultStyleLabel}>Срок оплаты</p>
                                <div style={defaultStyleDiv} className="flex flex-col w-full">
                                    <Checkbox radius="md">
                                        Выставить счёт со скидкой
                                    </Checkbox>
                                    <Checkbox className='mt-1' radius="md">
                                        Выставить счёт с НДС
                                    </Checkbox>

                                </div>
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className='w-full flex items-baseline'>
                                <p style={defaultStyleLabel}>Комментарий</p>
                                <textarea placeholder='Введите название или ИНН' style={defaultStyleDiv} className={`${defaultStyleInput} min-h-[60px] h-[60px]`}></textarea>
                            </label>
                        </div>
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