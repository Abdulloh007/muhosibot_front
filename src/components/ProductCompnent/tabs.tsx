'use client';
import React, { useEffect, useState } from "react";
import App from "./table";
import { tabs } from "./data";
import { Button, Input } from '@nextui-org/react';
import ExportComponent from '@/components/core/AllComponent/ExportComponent'
import PlusIcon from '@/components/core/Icons/PlusIcon';
import Link from "next/link";
import axios from "axios";



const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('Все Товары');
  const [isSearchValue, setSearchValue] = useState<string>('');
  let [productList, setProductList] = useState<any[]>([]);
  let [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/products', {
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
  }).then(res => { setProductList(res.data); setFiltered(res.data) })
  }, [])

  const toggleTab = (index: string) => {
    let filtered = [];
    if (index === "Товары") {
      setFiltered(productList.filter((val) => val.type === "Товар"))
    } else if (index === "Услуги") {
      setFiltered(productList.filter((val) => val.type === "Услуга"))
    } else if (index === "Все Товары") {
      setFiltered(productList)
    }
    
    setToggleState(index);
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterItems = () => {
    if (toggleState !== "Все Товары") {
      productList.filter((user) => user.type.toLowerCase() === toggleState.toLowerCase());
    }

    return productList
  };

  const users1 = filterItems()



  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-semibold'>Товары</h1>
          <span className='text-[#B0B0B0] text-[16px]'>Товары &gt; {toggleState}</span>
        </div>
        <div className='flex items-center'>

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

          <Link href="/product/add" className="ml-[15px]">
            <Button
              className='bg-purpleLg text-white  border-none'
              startContent={<PlusIcon />}
              size='sm'
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
                className={toggleState === 'Все Товары' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.all)}
              >
                Все
              </button>
              <button
                className={toggleState === 'Товары' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.secondTab)}
              >
                Товары
              </button>
              <button
                className={toggleState === 'Услуги' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.thirdTab)}
              >
                Услуги
              </button>
            </div>
            <ExportComponent users1={users1} collapse={true} />
          </div>
          <div className="content-tabs h-[500px] z-0">
            <div
              className={`${toggleState === 'Все Товары' ? "content  active-content" : "content"}`}
            >
              <App rows={productList} filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'Товары' ? "content  active-content" : "content"}
            >
              <App rows={filtered} filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'Услуги' ? "content  active-content" : "content"}
            >
              <App rows={filtered} filterVal={toggleState} searchVal={isSearchValue} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Tabs;
