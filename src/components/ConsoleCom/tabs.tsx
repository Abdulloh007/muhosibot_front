'use client';
import React, { useEffect, useState } from "react";
import App from "./table";
import SecondApp from "./secondTab";
import { tabs, users } from "./data";
import { Button } from '@nextui-org/react';

import { TabClassActive, TabClassDefault } from './data'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";

import FolderIconYellow from "@/components/core/Icons/FolderIconYellow";
import FolderIconGreen from "@/components/core/Icons/FolderIconGreen";
import FolderIconPurple from "@/components/core/Icons/FolderIconPurple";
import { Accordion, AccordionItem } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { logout } from "@/lib/features/user/userSlice";

const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('ДДС');
  const [news, setNews] = useState([]);
  const bankBalance = useAppSelector(state => state.paymentAccount.balance);
  const cashboxBalance = useAppSelector(state => state.cashbox.balance);

  useEffect(() => {
    axios.get('/wp-json/wp/v2/posts?categories=22').then((res: any) => {
      setNews(res.data)
    })
  }, []);

  const toggleTab = (index: string) => {
    setToggleState(index);
  };


  const filterItems = () => {
    if (toggleState !== "ДДС") {
      users.filter((user) => user.type.toLowerCase() === toggleState.toLowerCase());
    }

    return users
  };

  const users1 = filterItems()

  const dispatch = useAppDispatch();
  // const name = useAppSelector((state) => state.profile.name)
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-bold'>Консоль</h1>
          <span className='text-linkSm font-semibold text-[16px]'>Панель управления</span>
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="flex flex-col w-[60%]">
            <div className="py-4 mt-[35px] rounded-md shadow-md bg-white pl-4">
              <div className="flex items-center mb-3">
                <h1 className="font-medium text-[24px]">Деньги</h1>
                <span className="ml-[9px] text-[12px] text-linkSm">
                  Составить счет
                </span>
              </div>
              <div className="mb-[10px]">
                <p className="mt-[10px]">
                  Доход: <span>0.00 </span>смн
                </p>
                <p className="mt-[10px]">
                  Расход: <span>0.00 </span>смн
                </p>
                <p className="mt-[10px]">
                  Текущий остаток по кассе:{" "}
                  <span className="text-linkSm">{cashboxBalance} </span>смн
                </p>
                {/* <p className="mt-[10px]">
                  Текущий остаток по э.кошельку:{" "}
                  <span className="text-linkSm">0.00 </span>смн
                </p> */}
                <p className="mt-[10px]">
                  Текущий остаток по банку:{" "}
                  <span className="text-linkSm">{bankBalance} </span>смн
                </p>
              </div>
              <Link href="/money" className="text-linkSm ">
                Все деньги
              </Link>
            </div>
            <div className="pt-4 pb-5 mt-[35px]  rounded-md shadow-md bg-white pl-4">
              <div className="flex items-center mb-3">
                <h1 className="font-medium text-[24px]">Документы</h1>
                <span className="ml-[9px] text-[12px] text-linkSm">
                  Составить документ
                </span>
              </div>
              <div className="mb-[10px] flex items-center">
                <FolderIconYellow />
                <p className="text-linkSm pl-1.5">
                  Неоплаченный счёт
                  <span className="text-[#141414]">- 0 на 0,00 смн</span>
                </p>
              </div>
              <div className="mb-[10px] flex items-center">
                <FolderIconGreen />
                <p className="text-linkSm pl-1.5">
                  Неоплаченный акт
                  <span className="text-[#141414]">- 0 на 0,00 смн</span>
                </p>
              </div>
              <div className="mb-[12px] flex items-center">
                <FolderIconPurple />
                <p className="text-linkSm pl-1.5">
                  Неподписанная накладная
                  <span className="text-[#141414]">- 0 на 0,00 смн</span>
                </p>
              </div>
              <Link href="/document" className="text-linkSm ">
                Все документы
              </Link>
            </div>
          </div>
          <div className="flex flex-col ml-[30px] w-[40%]">
            <div className="rounded-md py-4 mt-[35px] pl-[10px] h-full bg-white shadow-md overflow-y-auto">
              <h1 className="font-medium text-[24px]">События дня</h1>
              <Accordion>
                {news.map((item: any) => (
                  <AccordionItem key={item.id} aria-label={item.title.rendered} title={item.title.rendered}>
                    <p className="text-[16px]" dangerouslySetInnerHTML={{__html: item.excerpt.rendered}}></p>
                    <a href={item.link} className="text-[14px] text-blue-500">Подробнее</a>
                  </AccordionItem>
                ))}

              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Tabs;
