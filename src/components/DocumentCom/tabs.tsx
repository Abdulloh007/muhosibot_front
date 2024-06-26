'use client';
import React, { useEffect, useState } from "react";
import App from "./table";
import { tabs, users } from "./data";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import ExportComponent from '@/components/core/AllComponent/ExportComponent'
import PlusIcon from "@/components/core/Icons/PlusIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";



const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('Исходящие');
  const [isSearchValue, setSearchValue] = useState<string>('');
  const [doctypeList, setDoctypeList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get('/api/doctypes', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setDoctypeList(res.data))
  }, [])

  function toggleTab(index: string) {
    setToggleState(index);
  };

  function onSearchChange(value: string) {
    setSearchValue(value);
  };

  function filterItems() {
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

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="bg-purpleLg text-white ml-[15px] border-none"
                startContent={<PlusIcon />}
                // onPress={handleOpen}
                size="sm"
              >
                Добавить
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={(key: any) => router.push('/document/add?doctype_id=' + key)}
            >
              {doctypeList.map((item: any) => (
                <DropdownItem key={item.id}>{item.title}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div>
        <div className='w-full'>
          <div className="flex justify-between">
            <div className="bloc-tabs">
              <button
                aria-label="TabButton"
                className={toggleState === 'Исходящие' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.secondTab)}
              >
                Исходящие
              </button>
              <button
                aria-label="TabButton"
                className={toggleState === 'Входящие' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.thirdTab)}
              >
                Входящие
              </button>
            </div>
            <ExportComponent users1={users1} collapse={true} />
          </div>
          <div className="content-tabs h-[500px] z-0">
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
