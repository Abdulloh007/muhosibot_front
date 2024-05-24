'use client';
import React, { useState } from "react";
import App from "./table";
import SecondApp from "./secondTab";
import { tabs, users } from "./data";
import { Button } from '@nextui-org/react';

import { TabClassActive, TabClassDefault } from './data'
import DivTables from './divTabls'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


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
  const name = useAppSelector((state) => state.userSlice.name)

  function test() {
    dispatch
  }

  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-bold'>Консоль {name}</h1>
          <span className='text-linkSm font-semibold text-[16px]'>Панель управления</span>
        </div>
      </div>
      <div>
        <div className='w-full rounded-md bg-white pt-3 px-[20px] pb-4'>
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
        </div>
        <DivTables />
      </div>
    </div >
  );
};

export default Tabs;
