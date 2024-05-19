import Image from 'next/image'
import TypeOfBusiness from '@/Components/typeOfBisness'

export default function Home3() {

  const typeOfBisness = 'ООО'

  return (
    <main className='w-full flex justify-center items-center h-screen ml-10'>
      <div className="w-[600px] h-[600px]  shadow-2xl px-[108px] flex flex-col items-center">
        <Image className='mb-[17px] mt-[-85px]' src='/iconMenu/logoA.svg' width={173} height={120} alt="LogoAuth" />
        <div className='flex flex-col'>
          <div className='text-center font-montserrat'>
            <p className='text-[36px] font-bold text-purpleLg '>Мухосиби Ман</p>
            <p className='text-[22px] font-bold text-purpleMid'>Осон, Кулай, Тез</p>
          </div>
          <div className='text-center mt-[31px]'>
            <p className='text-[18px]'>Выберите вид деятельности <span className='text-purpleMid underline'>{typeOfBisness}</span></p>
            <p className='text-[24px] mt-[61px]'>Система налогообложения</p>
            <div className='flex text-purpleLg justify-between text-[72px]'>
              <TypeOfBusiness name1='УСН' name2='УСН' name3='минус расходы' />
            </div>
          </div>
          <div className='flex flex-col text-center mt-[120px]'>
            <p className='text-lg text-[#757575]'>Уже регистрировались?</p>
            <a className='text-lg text-[#4D89FF]' href="/">Войдите в аккаунт</a>
          </div>
        </div>
      </div>
    </main>
  );
}
