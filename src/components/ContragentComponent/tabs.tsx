'use client';
import React, { useState } from "react";
import App from "./table";
import { tabs, users } from "./data";
import { Button, Input } from '@nextui-org/react';
import ExportComponent from '@/components/core/AllComponent/ExportComponent'
import PlusIcon from "@/components/core/Icons/PlusIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('Все Контрагенты');
  const [isSearchValue, setSearchValue] = useState<string>('');
  const router = useRouter()

  const toggleTab = (index: string) => {
    setToggleState(index);
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterItems = () => {
    if (toggleState !== "Все Контрагенты") {
      users.filter((user) => user.typeFilter.toLowerCase() === toggleState.toLowerCase());
    }

    return users
  };

  const users1 = filterItems()


  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-semibold'>Контрагенты</h1>
          <span className='text-[#B0B0B0] text-[16px]'>Контрагенты &gt; {toggleState}</span>
        </div>
        <div className="flex items-center">

          <Input
            isClearable
            placeholder="Поиск"
            classNames={SearchInput}
            size="sm"
            value={isSearchValue}
            variant="bordered"
            radius="sm"
            onClear={() => setSearchValue("")}
            onValueChange={onSearchChange}
          />

          <Link href='/contragent/add' className='ml-[15px]'>
            <Button
              className="bg-purpleLg text-white  border-none"
              startContent={<PlusIcon />}
              size="sm"
            >
              Добавить
            </Button>
          </Link>

        </div>
      </div>
      <div>
        <div className='w-full'>
          <div className="flex justify-between">
            <div className="bloc-tabs">
              <button
                aria-label="Tabs"
                className={toggleState === 'Все Контрагенты' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.all)}
              >
                Все
              </button>
              <button
                aria-label="Tabs"
                className={toggleState === 'Активные' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.secondTab)}
              >
                Активные
              </button>
              <button
                aria-label="Tabs"
                className={toggleState === 'В архиве' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.thirdTab)}
              >
                В архиве
              </button>
            </div>
            <ExportComponent users1={users1} collapse={true} />
          </div>
          <div className="content-tabs h-[500px] z-0">
            <div
              className={`${toggleState === 'Все Контрагенты' ? "content  active-content" : "content"}`}
            >
              <App filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'Активные' ? "content  active-content" : "content"}
            >
              <App filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'В архиве' ? "content  active-content" : "content"}
            >
              <App filterVal={toggleState} searchVal={isSearchValue} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Tabs;
