'use client';
import React, { useState } from "react";
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

const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('ДДС');


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

  function test() {
    dispatch
  }

  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-bold'>Консоль</h1>
          <span className='text-linkSm font-semibold text-[16px]'>Панель управления</span>
        </div>
      </div>
      <div>
        {/* <div className='w-full rounded-md bg-white pt-3 px-[20px] pb-4'>
          <div className="flex justify-between">
            <div className="bloc-tabs">
              <Button
                aria-label="Табы"
                className={`mr-[15px] ${toggleState === 'ДДС' ? TabClassActive : TabClassDefault}`}
                onClick={() => toggleTab(tabs.all)}
              >
                ДДС
              </Button>
              <Button
                aria-label="Табы"
                className={`mr-[15px] ${toggleState === 'Поступления' ? TabClassActive : TabClassDefault}`}
                onClick={() => toggleTab(tabs.secondTab)}
              >
                Поступления
              </Button>
              <Button
                aria-label="Табы"
                className={` ${toggleState === 'Списания' ? TabClassActive : TabClassDefault}`}
                onClick={() => toggleTab(tabs.thirdTab)}
              >
                Списания
              </Button>
            </div>
            <Button aria-label="setting" size='md' className='text-white text-[14px] py-[10px] px-[10px] bg-[#4D89FF] rounded-lg'>
              Настроить
            </Button>
          </div>
          <div className="content-tabs h-[400px] z-0">
            <div
              className={`${toggleState === 'ДДС' ? "content flex items-center  active-content" : "content"}`}
            >
              <App filterVal={toggleState} />
              <SecondApp />
            </div>

            <div
              className={toggleState === 'Поступления' ? "content flex items-center  active-content" : "content"}
            >
              <App filterVal={toggleState} />
              <SecondApp />
            </div>

            <div
              className={toggleState === 'Списания' ? "content flex items-center   active-content" : "content"}
            >
              <App filterVal={toggleState} />
              <SecondApp />
            </div>

          </div>
        </div> */}
        <div className="flex items-center">
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
              <span className="text-linkSm">0.00 </span>смн
            </p>
            <p className="mt-[10px]">
              Текущий остаток по э.кошельку:{" "}
              <span className="text-linkSm">0.00 </span>смн
            </p>
            <p className="mt-[10px]">
              Текущий остаток по банку:{" "}
              <span className="text-linkSm">0.00 </span>смн
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
      <div className="flex flex-col ml-[30px] w-[40%] h-[490px] ">
        <div className="rounded-md pt-[15px] pl-[10px] h-full bg-white shadow-md overflow-y-auto">
          <h1 className="font-medium text-[24px]">События дня</h1>
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 4" title="Accordion 4">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="5" aria-label="Accordion 5" title="Accordion 5">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
      </div>
    </div >
  );
};

export default Tabs;
