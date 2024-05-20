"use client";
import React from 'react'
import { Checkbox, Button } from "@nextui-org/react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import ChevronLeftIcon from "@/components/core/Icons/ChevronLeft";
import Link from "next/link";
import {
    defaultStyleInput,
    defaultStyleLabel,
    defaultStyleDiv,
    country,
    btnClass,
    typeMoney,
} from './data';
import { ExpandMore } from '@mui/icons-material';


const handleSubmit = () => {
    console.log('lox')
}

const Form = () => {
    return (
        <div className='mt-10 h-[95%]'>
            <div className="container-form h-full">
                <div className='flex items-center mb-[38px]'>
                    <Link href='/cooperator'>
                        <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
                            <ChevronLeftIcon />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-[18px] ml-[16px]'>Новый Сотрудник</h1>
                </div>
                <form action="">
                    <div className='flex flex-col items-start justify-center w-1/2'>
                        <div className='flex w-full  items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>ФИО</p>
                                <input style={defaultStyleDiv} placeholder='Иванов Иван Анатольевич' type="text" className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Дата рождения</p>
                                <input aria-label='Дата рождения' type="date" style={defaultStyleDiv} className={defaultStyleInput} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Пол</p>
                            <div style={defaultStyleDiv} className='flex flex-col'>
                                <label>
                                    <Checkbox radius="full">Мужской</Checkbox>
                                </label>
                                <label>
                                    <Checkbox radius="full">Женский</Checkbox>
                                </label>
                            </div>
                        </div>
                        <div className='flex  items-baseline mb-[14px]'>
                            <label className='  flex items-baseline'>
                                <p style={defaultStyleLabel}>Гражданство</p>
                                <div style={{ width: 175 }}>
                                    <Select
                                        placeholder="Таджикистан"
                                        labelPlacement="outside"
                                        className="bg-[#F1F1F1] border-b-2 border-[#757575]"

                                        disableSelectorIconRotation
                                        classNames={btnClass}
                                        selectorIcon={<ExpandMore />}
                                    >
                                        {country.map((item) => (
                                            <SelectItem
                                                key={item.txt.toLocaleLowerCase()}
                                                startContent={
                                                    <Avatar
                                                        alt={item.txt.toLocaleLowerCase()}
                                                        className="w-6 h-6"
                                                        src={item.src}
                                                    />
                                                }
                                            >
                                                {item.txt}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mt-[70px]  justify-center w-1/2'>
                        <h1 className='font-bold text-[18px] mb-5'>Данные о найме</h1>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Должность</p>
                                <input aria-label='Должность' style={defaultStyleDiv} placeholder='Глава...' type="text" className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Дата приема</p>
                                <input aria-label='Дата приема' type="date" style={defaultStyleDiv} className={defaultStyleInput} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Пол</p>
                            <div style={defaultStyleDiv} className='flex flex-col'>
                                <label>
                                    <Checkbox radius="md">Трудовой</Checkbox>
                                </label>
                                <label>
                                    <Checkbox radius="md">Гражданско-правовой</Checkbox>
                                </label>
                                <label>
                                    <Checkbox radius="md">Аренда у физлица</Checkbox>
                                </label>
                                <label>
                                    <Checkbox radius="md">С учредителем</Checkbox>
                                </label>
                            </div>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Пол</p>
                            <div style={defaultStyleDiv} className='flex'>
                                <input aria-label='Пол' type="text" placeholder='Лет' className={`${defaultStyleInput} mr-5`} />
                                <input aria-label='Пол' type="text" placeholder='Месяцев' className={`${defaultStyleInput} mr-5`} />
                                <input aria-label='Пол' type="text" placeholder='Дней' className={`${defaultStyleInput}`} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mt-[70px]  justify-center w-1/2'>
                        <h1 className='font-bold text-[18px] mb-5'>Паспорт</h1>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex  items-baseline'>
                                <p style={defaultStyleLabel}>Серия и номер</p>
                                <input aria-label='Серия и номер' style={{ width: 120 }} type="text" placeholder='--- -------' className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Дата Выдачи</p>
                                <input aria-label='Дата Выдачи' type="date" style={defaultStyleDiv} className={defaultStyleInput} />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mt-[70px]  justify-center w-1/2'>
                        <h1 className='font-bold text-[18px] mb-5'>Адреса</h1>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Адрес регистрации</p>
                                <input aria-label='Адрес регистрации' style={defaultStyleDiv} type="text" placeholder='г.Худжанд ул.Пушкина' className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Адрес проживания</p>
                                <div style={defaultStyleDiv} className='flex flex-col w-full'>
                                    <Checkbox radius="md">Совпадает с адресом регистрации</Checkbox>
                                    <input aria-label='Адрес проживания' type="text" placeholder='г.Худжанд ул.Пушкина' className={`${defaultStyleInput} mt-5`} />
                                </div>
                            </label>

                        </div>

                    </div>
                    <div className='flex flex-col items-start mt-[70px]  justify-center w-1/2'>
                        <h1 className='font-bold text-[18px] mb-5'>Документы</h1>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>СНИЛС</p>
                                <input aria-label='СНИЛС' style={{ width: 120 }} type="text" placeholder='---- -----' className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>ИНН</p>
                                <input aria-label='ИНН' type="text" style={{ width: 120 }} className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mt-[70px]  justify-center w-1/2'>
                        <h1 className='font-bold text-[18px] mb-5'>Документы</h1>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Способ выплат</p>
                                <div style={{ width: 175 }}>
                                    <Select
                                        placeholder="Наличными"
                                        labelPlacement="outside"
                                        className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                                        disableSelectorIconRotation
                                        classNames={btnClass}
                                        selectorIcon={<ExpandMore />}
                                    >
                                        {typeMoney.map((item) => (
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