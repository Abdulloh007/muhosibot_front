'use client'

import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  function handleSubmit (e: Event) {
    e.preventDefault()
    axios.post('/api/auth', {
      phone,
      password
    }).then((res: any) => {
      localStorage.setItem(btoa('token'), res.data.token)
      router.push('/dashboard')
    })
  }

  return (
    <main className='w-full flex justify-center items-center min-h-screen'>
      <div className="lg:w-[600px] w-full min-h-[500px] lg:shadow-2xl shadow-none px-[115px] py-[30px] flex flex-col items-center">
        <Image className='mb-[17px] lg:mt-[-85px] mt-[50px]' src='/iconMenu/logoA.svg' width={173} height={120} alt="LogoAuth" />
        <div className='flex flex-col items-center'>
          <div className='text-center font-montserrat'>
            <p className='text-[36px] font-bold text-purpleLg '>Мухосиби Ман</p>
            <p className='text-[22px] font-bold text-purpleMid'>Осон, Кулай, Тез</p>
          </div>
          
          <form onSubmit={(e: any) => handleSubmit(e)} className="w-[374px] transition">
            <div className='flex flex-col'>
              
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

              <button className='bg-purple-600 rounded text-white p-1 mt-[20px]'>Войдите</button>
            </div>

          </form>

          <div className='flex flex-col text-center mt-[60px]'>
            <p className='text-lg text-[#757575]'>Ещё не регистрировались?</p>
            <a className='text-lg text-[#4D89FF]' href="/register">Создайте аккаунт</a>
          </div>
        </div>
      </div>
    </main>
  );
}
