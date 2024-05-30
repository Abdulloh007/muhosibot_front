import Image from 'next/image'
import TypeOfBusiness from '@/components/typeOfBisness'

export default function Home1() {
  return (
    <main className='w-full flex justify-center items-center h-screen'>
      <div className="w-[600px] h-[600px]  shadow-2xl px-[127px] flex flex-col items-center">
        <Image className='mb-[17px] mt-[-85px]' src='/iconMenu/logoA.svg' width={173} height={120} alt="LogoAuth" />
        <div className='flex flex-col'>
          <div className='text-center font-montserrat'>
            <p className='text-[36px] font-bold text-purpleLg '>Мухосиби Ман</p>
            <p className='text-[22px] font-bold text-purpleMid'>Осон, Кулай, Тез</p>
          </div>
          <div className='text-center mt-[75px]'>
            <p className='text-[24px]'>Выберите вид деятельности</p>
            <div className='flex text-purpleLg justify-between text-[72px] mt-[25px]'>
              <TypeOfBusiness name1='ИП' name2='ООО' />
            </div>
          </div>
          <div className='flex flex-col text-center mt-[150px]'>
            <p className='text-lg text-[#757575]'>Уже регистрировались?</p>
            <a className='text-lg text-[#4D89FF]' href="/auth">Войдите в аккаунт</a>
          </div>
        </div>
      </div>
    </main>
  );
}
