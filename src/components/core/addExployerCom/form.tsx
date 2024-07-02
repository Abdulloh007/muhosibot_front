"use client";
import React, { FormEvent, useEffect, useState } from 'react'
import { Checkbox, Button, RadioGroup, Radio } from "@nextui-org/react";
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
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToList } from '@/lib/features/user/toastSlice';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const Form = () => {
    const [editId, setEditId] = useState<null | string>(null)

    const [editingStuff, setEdditingStuff] = useState<any>(null)
    const [isSameAddress, setIsSameAddress] = useState<any>(false)

    const [full_name, set_full_name] = useState('')
    const [birthday, setBirthday] = useState(new Date().toISOString())
    const [begin_date, set_begin_date] = useState(new Date().toISOString())
    const [gender, setGender] = useState('')
    const [citizenship, setCitizenship] = useState('')
    const [contract_type, set_contract_type] = useState('')
    const [position, setPosition] = useState('')
    const [experience, setExperience] = useState(0)
    const [unique_number, set_unique_number] = useState('')
    const [passport, setPassport] = useState({})
    const [legal_address, set_legal_address] = useState('')
    const [physic_address, set_physic_address] = useState('')
    const [inn, setINN] = useState('')
    const [payment_method, set_payment_method] = useState('')
    const orgId = useAppSelector(state => state.profile.organizations[0].id)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const params = useSearchParams()


    useEffect(() => {
        const id = params.get('edit')
        if (id) setEditId(id)
    }, [params])

    useEffect(() => {
        if (editId) {
            axios.get('/api/stuff-one/' + editId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
                }
            }).then((res: any) => {
                const stuff = res.data.data
                set_full_name(`${stuff.last_name} ${stuff.first_name} ${stuff.father_name}`)
                setBirthday(stuff.birthday.slice(0,10))
                set_begin_date(stuff.begin_date.slice(0,10))
                setGender(stuff.gender)
                setPosition(stuff.position)
                setCitizenship(stuff.citizenship)
                set_contract_type(stuff.contract_type)
                setExperience(stuff.experience_days / 365)
                set_unique_number(stuff.unique_number)
                setPassport(JSON.parse(stuff.passport_details))
                set_legal_address(stuff.legal_address)
                set_physic_address(stuff.physic_address)
                setINN(stuff.inn)
                set_payment_method(stuff.payment_method)
                
            }).catch(error => dispatch(addToList({ color: 'danger', text: error.message })))
        }
    }, [editId])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        axios.post(editId ? '/api/stuff-one/' + editId : '/api/stuff', {
            first_name: full_name.split(' ')[1],
            last_name: full_name.split(' ')[0],
            father_name: full_name.split(' ')[2],
            birthday,
            begin_date,
            gender,
            position,
            citizenship,
            contract_type,
            experience_days: experience * 365,
            unique_number,
            // passport_details: JSON.stringify(passport),
            legal_address,
            physic_address,
            inn,
            payment_method,
            organization_id: orgId
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
        }).then((res: any) => router.push('/cooperator')).catch(error => dispatch(addToList({ color: 'danger', text: error.message })))
    }
    return (
        <div className='container'>
            <div className="container-form h-full">
                <div className='flex items-center mb-[38px]'>
                    <Link href='/cooperator'>
                        <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
                            <ChevronLeftIcon />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-[18px] ml-[16px]'>{editId ? 'Редактирование' : 'Новый'} Сотрудник</h1>
                </div>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className='flex flex-col items-start justify-center w-1/2'>
                        <div className='flex w-full  items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>ФИО</p>
                                <input value={full_name} onChange={(e: any) => set_full_name(e.target.value)} style={defaultStyleDiv} placeholder='Иванов Иван Анатольевич' type="text" className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Дата рождения</p>
                                <input value={birthday} onChange={(e: any) => setBirthday(e.target.value)} aria-label='Дата рождения' type="date" style={defaultStyleDiv} className={defaultStyleInput} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Пол</p>
                            <div style={defaultStyleDiv} className='flex flex-col'>
                                <RadioGroup
                                    value={gender}
                                    onValueChange={setGender}
                                >
                                    <Radio value="Мужской">Мужской</Radio>
                                    <Radio value="Женский">Женский</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className='flex  items-baseline mb-[14px]'>
                            <label className='  flex items-baseline'>
                                <p style={defaultStyleLabel}>Гражданство</p>
                                <div style={{ width: 175 }}>
                                    <Select
                                        aria-label='Гражданство'
                                        placeholder="Гражданство"
                                        labelPlacement="outside"
                                        className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                                        selectedKeys={[citizenship]}
                                        onChange={(e: any) => setCitizenship(e.target.value)}
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
                                <input value={position} onChange={(e: any) => setPosition(e.target.value)} aria-label='Должность' style={defaultStyleDiv} placeholder='Глава...' type="text" className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <label className=' flex items-baseline'>
                                <p style={defaultStyleLabel}>Дата приема</p>
                                <input value={begin_date} onChange={(e: any) => set_begin_date(e.target.value)} aria-label='Дата приема' type="date" style={defaultStyleDiv} className={defaultStyleInput} />
                            </label>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Договор</p>
                            <div style={defaultStyleDiv} className='flex flex-col'>
                                <RadioGroup
                                    value={contract_type}
                                    onValueChange={set_contract_type}
                                >
                                    <Radio value="Трудовой">Трудовой</Radio>
                                    <Radio value="Гражданско-правовой">Гражданско-правовой</Radio>
                                    <Radio value="Аренда у физлица">Аренда у физлица</Radio>
                                    <Radio value="С учредителем">С учредителем</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Страховой стаж на дату приема</p>
                            <div style={defaultStyleDiv} className='flex'>
                                <input type='number' value={experience} onChange={(e: any) => setExperience(e.target.value)} placeholder='Лет' className={`${defaultStyleInput} mr-5`} />
                                {/* <input type="text" placeholder='Месяцев' className={`${defaultStyleInput} mr-5`} />
                                <input type="text" placeholder='Дней' className={`${defaultStyleInput}`} /> */}
                            </div>
                        </div>
                        <div className='flex items-baseline mb-[14px]'>
                            <p style={defaultStyleLabel}>Уникальный номер</p>
                            <div style={defaultStyleDiv} className='flex'>
                                <input type='number' value={unique_number} onChange={(e: any) => set_unique_number(e.target.value)} placeholder='' className={`${defaultStyleInput} mr-5`} />
                                {/* <input type="text" placeholder='Месяцев' className={`${defaultStyleInput} mr-5`} />
                                <input type="text" placeholder='Дней' className={`${defaultStyleInput}`} /> */}
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
                                <input value={legal_address} onChange={(e: any) => {set_legal_address(e.target.value); if(isSameAddress) set_physic_address(e.target.value)}} aria-label='Адрес регистрации' style={defaultStyleDiv} type="text" placeholder='г.Худжанд ул.Пушкина' className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Адрес проживания</p>
                                <div style={defaultStyleDiv} className='flex flex-col w-full'>
                                    <Checkbox radius="md"  value={isSameAddress} onValueChange={setIsSameAddress}>Совпадает с адресом регистрации</Checkbox>
                                    <input value={physic_address} onChange={(e: any) => set_physic_address(e.target.value)} aria-label='Адрес проживания' type="text" placeholder='г.Худжанд ул.Пушкина' className={`${defaultStyleInput} mt-5`} />
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
                                <input value={inn} onChange={(e: any) => setINN(e.target.value)} aria-label='ИНН' type="number" style={{ width: 120 }} className={`${defaultStyleInput}`} />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mt-[70px]  justify-center w-1/2'>
                        <h1 className='font-bold text-[18px] mb-5'>Способ выплат</h1>
                        <div className='flex w-full items-baseline mb-[14px]'>
                            <label className='flex w-full items-baseline'>
                                <p style={defaultStyleLabel}>Способ выплат</p>
                                <div style={{ width: 175 }}>
                                    <Select
                                        aria-label='Наличными'
                                        labelPlacement="outside"
                                        className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                                        disableSelectorIconRotation
                                        selectedKeys={[payment_method]}
                                        onChange={(e: any) => set_payment_method(e.target.value)}
                                        classNames={btnClass}
                                        selectorIcon={<ExpandMore />}
                                    >
                                        {typeMoney.map((item) => (
                                            <SelectItem
                                                key={item.txt}
                                                value={item.txt}
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
                        <div>
                            <Button
                                className="m-auto py-[10px] px-[25px] bg-[#A774FF] rounded-lg text-white text-sm mt-[25px]"
                                size="md"
                                type="submit"
                            >
                                Сохранить
                            </Button>
                        </div>
                        <div className="ml-2">
                            <Link href='/cooperator'>
                                <Button
                                    type='button'
                                    className="py-[10px] px-[25px] bg-transparent rounded-lg text-[#4D89FF] font-semibold hover:bg-[#EEEEEE]  "
                                    size="md"
                                >
                                    Отменить
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form