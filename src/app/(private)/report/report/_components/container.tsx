import Link from "next/link";

export default function Container() {
    return (
        <>
            <div className="container ">
                <div className="container-form h-full flex flex-wrap justify-between">
                    <div className="w-full">
                        <h2 className="text-2xl font-semibold mb-3">Обротно сальдовая ведомость</h2>
                        {/* <ul>
                            <li>
                                <Link href="#">Оборотно-сальдовая ведомость</Link>
                            </li>
                        </ul> */}
                    </div>
                    <div className="w-full">
                        <table className="border-collapse border border-slate-500 min-w-[25%]">
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 ...">Код</th>
                                    <th className="border border-slate-600 ...">Начальное сальдо дебит</th>
                                    <th className="border border-slate-600 ...">Начальное сальдо кредит</th>
                                    <th className="border border-slate-600 ...">Промеж сальдо дебит</th>
                                    <th className="border border-slate-600 ...">Промеж сальдо кредит</th>
                                    <th className="border border-slate-600 ...">Конечное сальдо дебит</th>
                                    <th className="border border-slate-600 ...">Конечное сальдо кредит</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td className="border border-slate-700 ...">Касса, 50</td>
                                    <td className="border border-slate-700 ...">0</td>
                                    <td className="border border-slate-700 ...">0</td>
                                    <td className="border border-slate-700 ...">500</td>
                                    <td className="border border-slate-700 ...">200</td>
                                    <td className="border border-slate-700 ...">300</td>
                                    <td className="border border-slate-700 ...">0</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
