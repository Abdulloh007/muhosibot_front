export default function Error404() {
    return (
        <>
            <div className='flex flex-wrap w-screen h-screen items-center justify-center'>
                <div className="max-w-[1200px] w-full px-5 m-auto block text-center">
                    <h1 className="md:text-[42px] text-[24px]">404</h1>
                    <h4 className="md:text-[24px] text-[16px]">Страница или запрос не найдены</h4>
                    <p>Пожалуйста обратитесь в тех.поддержку</p>
                </div>
            </div>
        </>
    )
}