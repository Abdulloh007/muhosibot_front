'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ExpandMore } from '@mui/icons-material';
import { Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Registration() {
    const [isCollapse, setCollapse] = useState<boolean>(false);
    const [ipAddress, setIpAdress] = useState('')
    const [fillingStep, setFillingStep] = useState(1)
    const [bisnessActivitiesList, setBisnessActivitiesList] = useState<any[]>([])
    const [businessActivity, setBusinessActivity] = useState<string>('')
    const [typeOfBusiness, setTypeOfBusiness] = useState('')
    const [taxSystem, setTaxSystem] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronimic, setPatronimic] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const router = useRouter()

    useEffect(() => {
        axios.get('/api/activities').then((res: any) => {
            setBisnessActivitiesList(res.data.data)
        })
        axios.get('https://api.ipify.org?format=json').then((res: any) => {
            setIpAdress(res.data.ip)
        })
    }, [])

    function setOrgType(type: string) {
        setTypeOfBusiness(type)
        setFillingStep(2)
    }

    function setOrgTaxSys(sys: string) {
        setTaxSystem(sys)
        setFillingStep(3)
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        axios.post('/api/register', {
            username: email.substring(0, 5) + phone.substring(5, 9),
            name: name.split(' ')[1],
            surname: name.split(' ')[0],
            patronimic: name.split(' ')[2] || '',
            email,
            phone,
            device: JSON.stringify({
                name: navigator?.appName,
                ip: ipAddress
            }),
            password
        }).then((res: any) => {
            localStorage.setItem(btoa('token'), res.data.token)
            router.push('/dashboard')
        })
    }

    const btnClass = {
        trigger: ["shadow-none", "p-0", "bg-transparent", "rounded-none", "min-h-0", "h-[30px]", "pl-[5px]"]
    }


    return (
        <main className='w-full flex justify-center items-center min-h-screen'>
            <div className="lg:w-[600px] w-full min-h-[750px] lg:shadow-2xl shadow-none px-[115px] py-[30px] flex flex-col items-center">
                <Image className='mb-[17px] lg:mt-[-85px] mt-[50px]' src='/iconMenu/logoA.svg' width={173} height={120} alt="LogoAuth" />
                <div className='flex flex-col items-center'>
                    <div className='text-center font-montserrat'>
                        <p className='text-[36px] font-bold text-purpleLg '>Мухосиби Ман</p>
                        <p className='text-[22px] font-bold text-purpleMid'>Осон, Кулай, Тез</p>
                    </div>
                    <div className='text-center mt-[31px]'>
                        <p className={fillingStep == 1 ? 'text-[24px]' : 'text-[18px] mb-[10px]'}>Выберите вид деятельности
                            {fillingStep == 1
                                ? (<></>)
                                : (<span className='text-purpleMid underline pl-[10px]' onClick={() => setFillingStep(1)}>{typeOfBusiness}</span>)
                            }
                        </p>
                        {fillingStep < 2
                            ? (<></>)
                            : (<p className={fillingStep < 3 ? 'text-[24px]' : 'text-[18px] mb-[10px]'}>Система налогообложения
                                {fillingStep < 3
                                    ? (<></>)
                                    : (<span className='text-purpleMid underline pl-[10px]' onClick={() => setFillingStep(2)}>{taxSystem}</span>)
                                }
                            </p>)

                        }

                        <div className={(fillingStep == 1) ? 'flex text-purpleLg justify-between text-[72px] mt-[25px] transition' : 'flex text-purpleLg justify-between text-[72px] mt-[25px] transition pointer-events-none opacity-0 z-[-1] h-0'}>
                            <h4 onClick={() => setOrgType('ИП')} className='underline cursor-pointer'>ИП</h4>
                            <span className='text-[#CCCCCC] text-[60px] mt-3 mx-5'>|</span>
                            <h4 onClick={() => setOrgType('ООО')} className='underline cursor-pointer'>ООО</h4>
                        </div>

                        <div className={(fillingStep == 2) ? 'flex text-purpleLg justify-between text-[72px] mt-[25px] transition' : 'flex text-purpleLg justify-between text-[72px] mt-[25px] transition pointer-events-none opacity-0 z-[-1] h-0'}>
                            <h4 onClick={() => setOrgTaxSys('УСН доходы')} className='underline cursor-pointer'>УСН</h4>
                            <span className='text-[#CCCCCC] text-[60px] mt-3 mx-5'>|</span>
                            <h4 onClick={() => setOrgTaxSys('УСН доходы минус расходы')} className='underline cursor-pointer flex flex-col'>
                                <span className='underline'>УСН</span>
                                <span className='text-[23px] mt-[-20px] no-underline'>минус расходы</span>
                            </h4>
                        </div>
                    </div>
                    <form onSubmit={(e: any) => handleSubmit(e)} className={(fillingStep == 3) ? 'w-[374px] transition' : 'w-[374px]  transition pointer-events-none opacity-0 z-[-1] h-0'}>
                        <div className='flex flex-col'>
                            <input 
                                type="text" 
                                placeholder="ФИО" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className='border-b-2 h-[30px] bg-[#F1F1F1] mt-[20px] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none' 
                            />
                            <Select
                                aria-label="hidden"
                                placeholder="Выберите тип деятельности"
                                labelPlacement="outside"
                                className="mt-[20px] pl-[5px] bg-[#F1F1F1] border-b-2 text-[14px]"
                                disableSelectorIconRotation
                                classNames={btnClass}
                                selectedKeys={businessActivity}
                                onChange={(e) => setBusinessActivity(e.target.value)}
                                selectorIcon={<ExpandMore />}
                            >
                                {bisnessActivitiesList.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </Select>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='border-b-2 h-[30px] bg-[#F1F1F1] mt-[20px] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none' 
                            />
                            
                            <input 
                                type="text" 
                                placeholder="Номер телефона" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                className='border-b-2 h-[30px] bg-[#F1F1F1] mt-[20px] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none' 
                            />
                            <input 
                                type="password" 
                                placeholder="Пароль" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='border-b-2 h-[30px] bg-[#F1F1F1] mt-[20px] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none' 
                            />
                            <input 
                                type="password" 
                                placeholder="Подтверждения пароля" 
                                value={passwordConfirmation} 
                                onChange={(e) => setPasswordConfirmation(e.target.value)} 
                                className='border-b-2 h-[30px] bg-[#F1F1F1] mt-[20px] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none' 
                            />
                            
                            <button className='bg-purple-600 rounded text-white p-1 mt-[20px]'>Зарегистрироваться</button>
                        </div>

                    </form>

                    <div className='flex flex-col text-center mt-[60px]'>
                        <p className='text-lg text-[#757575]'>Уже регистрировались?</p>
                        <a className='text-lg text-[#4D89FF]' href="/auth">Войдите в аккаунт</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
