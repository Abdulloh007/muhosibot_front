"use client";
import React, { useEffect, useState } from 'react'
import { Button, Checkbox } from "@nextui-org/react";
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
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { DocumentType } from '@/interfaces/document';

const emptyPos = {
    product: {
        id: 0,
        title: ''
    },
    price: 0,
    count: 1,
    unit: '',
    total: 0
}

function Form() {
    const [doctypeList, setDoctypeList] = useState<DocumentType[]>([]);

    const [editId, setEditId] = useState<null | string>(null)
    const [doc_type_title, set_doc_type_title] = useState<any>('')
    const [doc_type, set_doc_type] = useState<number>(0)
    const [type, setType] = useState<string>('')
    const [counterparty_id, set_counterparty_id] = useState('')
    const [group, setGroup] = useState('')
    const [deadline, setDeadline] = useState('')
    const [hasSale, setHasSale] = useState<boolean>(false)
    const [isData, setData] = useState<boolean>(false)
    const [producs, setProducs] = useState<any[]>([{ ...emptyPos }])

    const params = useSearchParams()

    useEffect(() => {
        axios.get('/api/doctypes', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
        }).then(res => setDoctypeList(res.data))

        if (editId) {
            axios.get('/api/documents/' + editId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
                }
            }).then(res => { })
        }
    }, [])

    useEffect(() => {
        const docId = params.get('doctype_id')
        const type = params.get('type')
        set_doc_type(parseInt(docId || "0"));
        setType(type || '');

    }, [params])

    useEffect(() => {
        set_doc_type_title(doctypeList.find(item => item.id === doc_type)?.title)
    }, [doc_type, doctypeList])

    function handleSubmit(e: any) {
        e.preventDefault();

    }

    function onProductChange(e: any, id: any) {
        const { name, value } = e.target
        const editedData = producs.map(item => {
            if (item.id === id && name) {
                switch (name) {
                    case 'total':
                        return { ...item, price: (parseFloat(value) / item.count).toFixed(2), [name]: parseFloat(value).toFixed(2) }
                    case 'count':
                        return { ...item, total: (item.price * parseFloat(value)).toFixed(2), [name]: parseFloat(value).toFixed(2) }
                    case 'price':
                        return { ...item, total: (item.count * parseFloat(value)).toFixed(2), [name]: parseFloat(value).toFixed(2) }
                    case 'sale':
                        return { ...item, total: (item.total - (item.count * parseFloat(value))).toFixed(2), [name]: parseFloat(value).toFixed(2) }
                }
                return { ...item, [name]: value }
            } else return item
        })
        setProducs(editedData)
    }

    return (
        <div className='container'>
            <div className="container-form h-full">
                <div className='flex items-center mb-[38px]'>
                    <Link href='/document'>
                        <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
                            <ChevronLeftIcon />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-[24px] ml-[16px]'>Создание {doc_type_title} № </h1>
                    <input style={{ width: 100 }} placeholder='1' type="text" className={`${defaultStyleInput} ml-2`} />
                    <h3 className='font-bold text-[24px] ml-[10px]  mr-[10px]'>От</h3>
                    <input style={{ width: 150 }} type="date" className={defaultStyleInput} />
                </div>
                <form onSubmit={handleSubmit} className='md:pr-[30px]'>
                    <div className='flex flex-col items-start justify-center w-8/12 mb-10'>
                        <div className='flex w-full  items-baseline mb-[18px]'>
                            <label className='flex w-full items-baseline'>
                                <div>
                                    <p style={defaultStyleLabel}>Шаблон документа</p>
                                </div>
                                <div style={defaultStyleDiv}>
                                    {/* <Select
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
                                    </Select> */}
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
                                <p style={defaultStyleLabel}>Дополнительно</p>
                                <div style={defaultStyleDiv} className="flex flex-col w-full">
                                    <Checkbox radius="md" isSelected={hasSale} onValueChange={setHasSale}>
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
                    <div className="w-3/4">
                        <table className='w-full table-fixed relative '>
                            <thead className='border-b-1 h-[40px]'>
                                <tr>
                                    <th colSpan={3} className='text-[10px] md:text-[12px] text-left text font-normal'>Название</th>
                                    <th colSpan={1} className='text-[10px] md:text-[12px] text-left text font-normal'>Количество</th>
                                    <th colSpan={1} className='text-[10px] md:text-[12px] text-left text font-normal'>Ед.Измерения</th>
                                    <th colSpan={1} className='text-[10px] md:text-[12px] text-left text font-normal'>Цена</th>
                                    {hasSale ? (<th colSpan={1} className='text-[10px] md:text-[12px] text-left text font-normal'>Скидка</th>) : (<></>)}
                                    <th colSpan={1} className='text-[10px] md:text-[12px] text-left text font-normal'>Всего</th>
                                </tr>
                            </thead>
                            <tbody>

                                {producs.map(item => (
                                    <tr key={item.id}>
                                        <td colSpan={3} className='py-3 pr-3'>
                                            <div className='py-3 border w-full'>
                                                <input className='focus:outline-none px-1 w-full' type="text" name="title" value={item.title} onChange={e => onProductChange(e, item.id)} />
                                            </div>
                                        </td>
                                        <td colSpan={1} className='py-3 pr-3'>
                                            <div className='py-3 border w-full'>
                                                <input className='focus:outline-none px-1 w-full' min={0} type="number" name="count" value={item.count} onChange={e => onProductChange(e, item.id)} />
                                            </div>
                                        </td>
                                        <td colSpan={1} className='py-3 pr-3'>
                                            <div className='py-3 border w-full'>
                                                <input className='focus:outline-none px-1 w-full' type="text" name="unit" value={item.unit} onChange={e => onProductChange(e, item.id)} />
                                            </div>
                                        </td>
                                        <td colSpan={1} className='py-3 pr-3'>
                                            <div className='py-3 border w-full'>
                                                <input className='focus:outline-none px-1 w-full' min={0} type="number" name="price" value={item.price} onChange={e => onProductChange(e, item.id)} />
                                            </div>
                                        </td>
                                        {hasSale
                                            ? (<td colSpan={1} className='py-3 pr-3'>
                                                <div className='py-3 border w-full'>
                                                    <input className='focus:outline-none px-1 w-full' min={0} type="number" name="sale" value={item.sale} onChange={e => onProductChange(e, item.id)} />
                                                </div>
                                            </td>)
                                            : (<></>)}
                                        <td colSpan={1} className='py-3'>
                                            <div className='py-3 border w-full'>
                                                <input className='focus:outline-none px-1 w-full' min={0} type="number" name="total" value={item.total} onChange={e => onProductChange(e, item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr className='group cursor-pointer' onClick={e => setProducs([...producs, {...emptyPos}])}>
                                    <td colSpan={3} className='py-3 pr-3'>
                                        <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                            <p className='px-1 m-0 text-[14px] text-slate-400 bg-transparent'>Новая строка</p>
                                        </div>
                                    </td>
                                    <td colSpan={1} className='py-3 pr-3'>
                                        <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                            <input className='focus:outline-none px-1 w-full bg-transparent'/>
                                        </div>
                                    </td>
                                    <td colSpan={1} className='py-3 pr-3'>
                                        <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                            <input className='focus:outline-none px-1 w-full bg-transparent'/>
                                        </div>
                                    </td>
                                    <td colSpan={1} className='py-3 pr-3'>
                                        <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                            <input className='focus:outline-none px-1 w-full bg-transparent'/>
                                        </div>
                                    </td>
                                    {hasSale
                                        ? (<td colSpan={1} className='py-3 pr-3'>
                                            <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                                <input className='focus:outline-none px-1 w-full bg-transparent'/>
                                            </div>
                                        </td>)
                                        : (<></>)}
                                    <td colSpan={1} className='py-3'>
                                        <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                            <input className='focus:outline-none px-1 w-full bg-transparent' />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="flex items-baseline mt-16">
                        <div onSubmit={e => handleSubmit(e)}>
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