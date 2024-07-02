'use client';
import React, { useState } from "react";
import App from "./table";
import { tabs, users } from "./data";
import { Button, Input, useDisclosure } from '@nextui-org/react';
import ExportComponent from '@/components/core/AllComponent/ExportComponent'
import PlusIcon from "@/components/core/Icons/PlusIcon";
import PayModalApp from '@/components/core/addPayCom/modal'



const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('Все платежки');
  const [isSearchValue, setSearchValue] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [paymentList, setPaymentList] = useState<any[]>([])

  const handleOpen = () => {
    onOpen();
  };

  const toggleTab = (index: string) => {
    setToggleState(index);
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterItems = () => {
    if (toggleState !== "Все платежки") {
      users.filter((user) => user.payed.toLowerCase() === toggleState.toLowerCase());
    }

    return users
  };

  const users1 = filterItems()

  return (
    <div className="container">
      <div className='flex mb-[26px] items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[36px] font-semibold'>Платежки</h1>
          <span className='text-[#B0B0B0] text-[16px]'>Платежки &gt; {toggleState}</span>
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

          <Button
            aria-label="addButton"
            className="bg-purpleLg text-white ml-[15px] border-none"
            startContent={<PlusIcon />}
            onPress={handleOpen}
            size="sm"
          >
            Добавить
          </Button>
          <PayModalApp isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        </div>
      </div>
      <div>
        <div className='w-full'>
          <div className="flex justify-between">
            <div className="bloc-tabs">
              <button
                className={toggleState === 'Все платежки' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.all)}
              >
                Все
              </button>
              <button
                className={toggleState === 'не оплачено' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.secondTab)}
              >
                Текущие
              </button>
              <button
                className={toggleState === 'оплачено' ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabs.thirdTab)}
              >
                Оплаченные
              </button>
            </div>
            <ExportComponent users1={users1} collapse={true} />
          </div>
          <div className="content-tabs h-[500px] z-0">
            <div
              className={`${toggleState === 'Все платежки' ? "content  active-content" : "content"}`}
            >
              <App rows={paymentList} filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'не оплачено' ? "content  active-content" : "content"}
            >
              <App rows={paymentList} filterVal={toggleState} searchVal={isSearchValue} />
            </div>

            <div
              className={toggleState === 'оплачено' ? "content  active-content" : "content"}
            >
              <App rows={paymentList} filterVal={toggleState} searchVal={isSearchValue} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Tabs;
