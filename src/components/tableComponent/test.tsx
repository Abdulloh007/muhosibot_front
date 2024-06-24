'use client';
import React, { useEffect, useState } from "react";
import App from "./table";
import { users } from "./data";
import ExportComponent from '@/components/core/AllComponent/ExportComponent'
import { Button, Input } from '@nextui-org/react';
import PlusIcon from "@/components/core/Icons/PlusIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";

const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('All');
  const [isSearchValue, setSearchValue] = useState<string>('');
  const [stuff, setStauff] = useState<any[]>([]);
  const organization = useAppSelector((state) => state.profile.organizations[0])
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/stuff/' + organization.id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then((res: any) => {
      const stuffList = res.data.data.map((item: any) => {
        return {
          ...item,
          full_name: `${item.last_name} ${item.first_name} ${item.father_name}` ,
          begin_date: new Date(item.begin_date).toDateString()
        }
      })
      setStauff(stuffList)
    })
  }, [])

  const toggleTab = (index: string) => {
    setToggleState(index);
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterItems = () => {
    if (toggleState !== "All") {
      users.filter((user) => user.status.toLowerCase() === toggleState.toLowerCase());
    }

    return users
  };

  const users1 = filterItems()

  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-semibold'>Сотрудники</h1>
          <span className='text-[#B0B0B0] text-[16px]'>Сотрудники &gt; Все Сотрудники</span>
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

          <Link href="cooperator/add" className="ml-[15px]">
            <Button
              className="bg-purpleLg text-white border-none"
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
                className={toggleState === 'All' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab('All')}
              >
                Все
              </button>
              <button
                className={toggleState === 'Работает' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab('Работает')}
              >
                Работающие
              </button>
              <button
                className={toggleState === 'Уволен' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab('Уволен')}
              >
                Уволенные
              </button>
            </div>
            <ExportComponent users1={users1} collapse={false} />
          </div>
          <div className="content-tabs h-[500px]">
            <div
              className={`${toggleState === 'All' ? "content  active-content" : "content"}`}
            >
              <App filterVal='All' searchVal={isSearchValue} stuff={stuff} />
            </div>

            <div
              className={toggleState === 'Работает' ? "content  active-content" : "content"}
            >
              <App filterVal='Работает' searchVal={isSearchValue} stuff={stuff} />
            </div>

            <div
              className={toggleState === 'Уволен' ? "content  active-content" : "content"}
            >
              <App filterVal='Уволен' searchVal={isSearchValue} stuff={stuff} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
