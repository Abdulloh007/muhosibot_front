import Link from "next/link";

export default function Container() {
    return (
        <>
            <div className="container ">
                <div className="container-form h-full flex flex-wrap justify-between">
                    <div className="w-[45%]">
                        <h2 className="text-2xl font-semibold mb-3">Основные отчёты</h2>
                        <ul>
                            <li>
                                <Link href="/report/report?id=1">Оборотно-сальдовая ведомость</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-[45%]">
                        <h2 className="text-2xl font-semibold mb-3">Прочие отчёты</h2>
                        <ul>
                            <li>
                                <Link href="#">Универсальный отчёт</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
