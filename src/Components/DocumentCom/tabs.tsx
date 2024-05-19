'use client';
import React, { useState } from "react";
import App from "./table";
import { tabs, users } from "./data";
import { Button, Input } from '@nextui-org/react';
import ExportComponent from '@/Components/core/AllComponent/ExportComponent'
import PlusIcon from "@/Components/core/Icons/PlusIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";



const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('Все документы');
  const [isSearchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('document/add');
  };

  const toggleTab = (index: string) => {
    setToggleState(index);
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterItems = () => {
    if (toggleState !== "Все документы") {
      users.filter((user) => user.type.toLowerCase() === toggleState.toLowerCase());
    }

    return users
  };

  const users1 = filterItems()

  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-semibold'>Документы</h1>
          <span className='text-[#B0B0B0] text-[16px]'>Документы &gt; {toggleState}</span>
        </div>
        <div className="flex items-center">
          <div>
            <Input
              isClearable
              placeholder="Поиск"
              className="shadow-md"
              classNames={SearchInput}
              size="sm"
              value={isSearchValue}
              variant="bordered"
              onClear={() => setSearchValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          <div>
            <Button
              aria-label="addButton"
              className="bg-purpleLg text-white ml-[15px] border-none"
              startContent={<PlusIcon />}
              size="sm"
              onClick={handleButtonClick}
            >
              Добавить
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className='w-[1200px]'>
          <div className="flex justify-between">
            <div className="bloc-tabs">
              <button
                aria-label="TabButton"
                className={toggleState === 'Все документы' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.all)}
              >
                Все
              </button>
              <button
                aria-label="TabButton"
                className={toggleState === 'Исходящие' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.secondTab)}
              >
                Товары
              </button>
              <button
                aria-label="TabButton"
                className={toggleState === 'Входящие' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.thirdTab)}
              >
                Услуги
              </button>
            </div>
            <ExportComponent users1={users1} collapse={true} />
          </div>
          <div className="content-tabs h-[500px] z-0">
            <div
              className={`${toggleState === 'Все документы' ? "content  active-content" : "content"}`}
            >
              <App filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'Исходящие' ? "content  active-content" : "content"}
            >
              <App filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'Входящие' ? "content  active-content" : "content"}
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
