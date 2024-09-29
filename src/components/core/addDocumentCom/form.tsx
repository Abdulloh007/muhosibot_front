"use client";
import React, { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
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
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import { DocumentType } from '@/interfaces/document';
import { Counterparty } from '@/interfaces/counterpaty';

const emptyPos = {
    id: 0,
    product_id: 0,
    name: '',
    price: 0,
    count: 1,
    sale: 0,
    unit: '',
    total: 0
}

function Form() {
    const [doctypeList, setDoctypeList] = useState<DocumentType[]>([]);
    const [groupList, setGroupList] = useState<any[]>([]);
    const [productList, setProductList] = useState<any[]>([]);
    const [counterpartiesList, setCounterpartiesList] = useState<Counterparty[]>([]);
    const [templateList, setTemplateList] = useState<any[]>([]);

    const [editId, setEditId] = useState<null | string>(null)
    const [doctype, setDoctype] = useState<null | DocumentType>(null)
    const [doc_type, set_doc_type] = useState<number>(0)
    const [type, setType] = useState<string>('')
    const [group, setGroup] = useState('')
    const [deadline, setDeadline] = useState('')
    const [template, setTemplate] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [counterparty_id, set_counterparty_id] = useState<any>('')
    const [hasSale, setHasSale] = useState<boolean>(false)
    const [isData, setData] = useState<boolean>(false)
    const [products, setProducs] = useState<any[]>([{ ...emptyPos }])
    const [docSum, setDocSum] = useState(0)
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {
        axios.get('/api/doctypes', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
        }).then(res => setDoctypeList(res.data))

        axios.get('/api/docgroups', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
        }).then(res => {
            setGroupList(res.data?.data),
            console.log("group->",res.data?.data)
        })

        axios.get('/api/products', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
        }).then(res => setProductList(res.data))

        axios.get('/api/counterparty', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
        }).then(res => setCounterpartiesList(res.data))
    }, [])

    useEffect(() => {
        const docId = params.get('doctype_id')
        const type = params.get('type')
        const editId = params.get('editId')
        set_doc_type(parseInt(docId || "0"));
        setType(type || '');
        if (editId) {
            axios.get('/api/documents/' + editId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
                }
            }).then(res => {
                let data = res.data.data

                setEditId(data.id)
                set_counterparty_id(data.counterparty_id)
                setGroup(data.doc_group ? data.doc_group.title : '')
                setDoctype(data.document_type)
                setProducs(data.products.map((item: any) => {
                    return {
                        id: item.id,
                        product_id: item.id,
                        name: item.name,
                        price: item.price,
                        count: item.pivot.count,
                        sale: item.pivot.sale,
                        unit: item.unit,
                        total: (item.price * item.pivot.count) - item.pivot.sale
                    }
                }))
                setDocSum(data.sum)

            })
        }

    }, [params])

    useEffect(() => {
        setDoctype(doctypeList.find(item => item.id === doc_type) || null)
    }, [doc_type, doctypeList])

    function handleSubmit(e: any) {
        e.preventDefault();
        let body = {
            title: doctype?.title,
            description: description,
            doc_type: doctype?.id,
            template: 'ыва',
            with_sign_seal: false,
            counterparty_id,
            deadline,
            public: false,
            sum: docSum,
            status: doctype?.type === 'sign' ? 'Не подписан' : doctype?.type === 'pay' ? 'Ждет оплаты' : 'В работе',
            products: products,
            group: group, 
        }
        if(editId){
            axios.patch('/api/documents/' + editId, body, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
                }
            }).then(() => router.push('/document'))
        }else{
            axios.post('/api/documents', body, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
                }
            }).then(() => router.push('/document'))
        }
    }

    function onProductChange(e: any, id: any) {
        const { name, value } = e.target
        let documentSum = 0
        const editedData = products.map((item, idx) => {
            if (idx === id && name) {
                switch (name) {
                    case 'name':
                        const prod = productList.find(item => item.name === value);
                        if (prod) return { ...item, [name]: prod.name, product_id: prod.id, unit: prod.unit, price: prod.price, total: ((item.count * prod.price) - item.sale).toFixed(2) }
                        else return { ...item, [name]: value, total: ((item.count * prod.price) - item.sale).toFixed(2) }
                    case 'total':
                        return { ...item, price: (parseFloat(value) / item.count).toFixed(2), [name]: value }
                    case 'count':
                        return { ...item, total: ((item.price * parseFloat(value)) - item.sale).toFixed(2), [name]: value }
                    case 'price':
                        return { ...item, total: ((item.count * parseFloat(value)) - item.sale).toFixed(2), [name]: value }
                    case 'sale':
                        return { ...item, total: ((item.count * item.price) - (item.count * parseFloat(value))).toFixed(2), [name]: parseFloat(value).toFixed(2) }
                    default:
                        break
                }
                return { ...item, [name]: value }
            } else return item
        })
        editedData.map(item => documentSum += parseFloat(item.total))
        setProducs(editedData)
        setDocSum(documentSum)
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
                    <h1 className='font-bold text-[24px] ml-[16px]'>{editId ? 'Редактирование' : 'Создание'} {doctype?.title} № </h1>
                    <input style={{ width: 100 }} placeholder='1' type="text" className={`${defaultStyleInput} ml-2`} />
                    <h3 className='font-bold text-[24px] ml-[10px]  mr-[10px]'>От</h3>
                    <input style={{ width: 150 }} type="date" className={defaultStyleInput} />
                </div>
                <form onSubmit={e => handleSubmit(e)} className='md:pr-[30px]'>
                    <div className='flex flex-col items-start justify-center w-8/12 mb-10'>
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
                                        selectedKeys={[template]}
                                        onSelectionChange={setTemplate}
                                    >
                                        {templateList.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                            >
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[18px]'>
                            <label className=' flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Клиент</p>
                                <Autocomplete
                                    aria-label="none"
                                    placeholder="Контрагент"
                                    labelPlacement="outside"
                                    inputProps={{
                                        classNames: {
                                            input: "",
                                            inputWrapper: "bg-[#F1F1F1] border-b-2 border-[#757575] shadow-none p-0 bg-transparent rounded-none min-h-0 h-[30px] pl-[5px]",
                                        }
                                    }}
                                    disableSelectorIconRotation
                                    selectorIcon={<ExpandMore />}
                                    defaultItems={counterpartiesList}
                                    selectedKey={counterparty_id}
                                    onSelectionChange={set_counterparty_id}
                                >
                                    {(item) => <AutocompleteItem key={item.id}>{item.full_name}</AutocompleteItem>}
                                </Autocomplete>
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
                                    value={group}
                                    list='groups'
                                    onChange={e => setGroup(e.target.value)}
                                    autoComplete='off'
                                />
                                <datalist id="groups">
                                    {groupList.map((groupItem, index) => (
                                        <option key={index} value={groupItem} />
                                    ))}
                                </datalist>
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
                                        <input
                                            type='date'
                                            className={`${defaultStyleInput} mt-4 w-[120px]`}
                                            value={deadline}
                                            onChange={e => setDeadline(e.target.value)}
                                        />
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
                                <textarea placeholder='Введите название или ИНН' onChange={e => setDescription(e.target.value)} style={defaultStyleDiv} className={`${defaultStyleInput} min-h-[60px] h-[60px]`}></textarea>
                            </label>
                        </div>
                    </div>
                    {doctype?.hasInvoice
                        ? (<div className="w-3/4">
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

                                    {products.map((item, idx) => (
                                        <tr key={idx}>
                                            <td colSpan={3} className='py-3 pr-3'>
                                                <div className='py-3 border w-full'>
                                                    <input list={'prod-' + idx} className='focus:outline-none px-1 w-full' type="text" name="name" value={item.name} onChange={e => onProductChange(e, item.id)} />
                                                    <datalist id={'prod-' + idx}>
                                                        {productList.map((item) => <option key={item.id}>{item.name}</option>)}
                                                    </datalist>
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
                                            <td colSpan={1} className='py-3 relative'>
                                                <div className='py-3 border w-full'>
                                                    <input className='focus:outline-none px-1 w-full' min={0} type="number" name="total" value={item.total} onChange={e => onProductChange(e, item.id)} />
                                                </div>
                                                {idx !== 0
                                                    ? (
                                                        <Button className='absolute top-[20%] left-[100%]' isIconOnly color="danger" variant="light" aria-label="Delete" onClick={e => setProducs([...products.filter(item => item.id !== idx)])}>
                                                            <svg width={16} height={16} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88"><title>trash</title><path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" /></svg>
                                                        </Button>
                                                    ) : (<></>)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className='group cursor-pointer' onClick={e => setProducs([...products, { ...emptyPos, id: products.length }])}>
                                        <td colSpan={3} className='py-3 pr-3'>
                                            <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                                <p className='px-1 m-0 text-[14px] text-slate-400 bg-transparent'>+ Новая строка</p>
                                            </div>
                                        </td>
                                        <td colSpan={1} className='py-3 pr-3'>
                                            <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                                <input className='focus:outline-none px-1 w-full bg-transparent' />
                                            </div>
                                        </td>
                                        <td colSpan={1} className='py-3 pr-3'>
                                            <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                                <input className='focus:outline-none px-1 w-full bg-transparent' />
                                            </div>
                                        </td>
                                        <td colSpan={1} className='py-3 pr-3'>
                                            <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                                <input className='focus:outline-none px-1 w-full bg-transparent' />
                                            </div>
                                        </td>
                                        {hasSale
                                            ? (<td colSpan={1} className='py-3 pr-3'>
                                                <div className='group-hover:bg-[#f1f1f1] transition py-3 border w-full border-dashed'>
                                                    <input className='focus:outline-none px-1 w-full bg-transparent' />
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
                            <h4>Итого: {docSum} смн</h4>
                        </div>)
                        : (<></>)
                    }

                    <div className="flex items-baseline mt-16">
                        <div>
                            <Button
                                type="submit"
                                className="m-auto py-[10px] px-[25px] bg-[#A774FF] rounded-lg text-white text-sm mt-[25px]"
                                size="md"
                            >
                                Сохранить
                            </Button>
                        </div>
                        <div className="ml-2">
                            <Link href='/document'>
                                <Button
                                    className="py-[10px] px-[25px] bg-transparent rounded-lg text-[#4D89FF] font-semibold hover:bg-[#EEEEEE]  "
                                    size="md"
                                >
                                    Отменить
                                </Button>
                            </Link>
                        </div>
                        {
                            doctype?.hasInvoice
                                ? (<div className="ml-2">
                                    <Button
                                        color='warning'
                                        className="py-[10px] px-[25px] rounded-lg font-semibold"
                                        size="md"
                                    >
                                        Пробить Чек
                                    </Button>
                                </div>)
                                : (<></>)
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form