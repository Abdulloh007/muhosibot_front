"use client";
import React, { useState } from "react";
import { Checkbox, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import PlusIcon from "@/components/core/Icons/PlusIcon";
import MinusIcon from "@/components/core/Icons/MinusIcon";
import ChevronLeftIcon from "@/components/core/Icons/ChevronLeft";
import Link from "next/link";
import {
  defaultStyleInput,
  defaultStyleLabel,
  defaultStyleDiv,
  defaultStyleText,
  GroupList,
  btnClass,
} from "@/components/core/addExployerCom/data";
import { ExpandMore } from "@mui/icons-material";


export default function Form() {
  const [isContact, SetContact] = useState(false);
  const [isPrice, SetPrice] = useState(false);
  const [isAddressTrue, setAddressTrue] = useState(true)

  const handleSubmit = () => {
    console.log("lox");
  };


  const handleClickContact = () => {
    SetContact(!isContact);
  };

  const handleAddress = () => {
    setAddressTrue(!isAddressTrue);
  }



  const handleClickPrice = () => {
    SetPrice(!isPrice);
  };

  return (
    <div className="container ">
      <div className="container-form h-full">
        <div className="flex items-center mb-[38px]">
          <Link href="/product">
            <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
              <ChevronLeftIcon />
            </Button>
          </Link>
          <h1 className="font-bold text-[18px] ml-[16px]">Новый Продукт</h1>
        </div>
        <form action="">
          <div className="flex flex-col items-start justify-center w-1/2">
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Название товара</p>
                <input
                  style={defaultStyleDiv}
                  placeholder=""
                  type="text"
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Другое название</p>
                <input
                  style={defaultStyleDiv}
                  placeholder="Используется в интерфейсе Эльбы"
                  type="text"
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Группа</p>
                <div style={defaultStyleDiv}>
                  <Select
                    placeholder="Выберите группу или введите название новой ..."
                    labelPlacement="outside"
                    className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={<ExpandMore />}
                  >
                    {/* {GroupList.map((item) => (
                      <SelectItem
                        key={item.txt.toLocaleLowerCase()}
                        value={item.txt.toLocaleLowerCase()}
                      >
                        {item.txt}
                      </SelectItem>
                    ))} */}
                  </Select>
                </div>
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Артикул</p>
                <input
                  type="text"
                  style={defaultStyleDiv}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Единица измерения</p>
                <div style={defaultStyleDiv}>
                  <Select
                    placeholder="шт"
                    labelPlacement="outside"
                    className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={<ExpandMore />}
                  >
                    {/* {GroupList.map((item) => (
                      <SelectItem
                        key={item.txt.toLocaleLowerCase()}
                        value={item.txt.toLocaleLowerCase()}
                      >
                        {item.txt}
                      </SelectItem>
                    ))} */}
                  </Select>
                </div>
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Количество на складе</p>
                <input
                  type="number"
                  style={{ width: 120 }}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Описание, комментарий</p>
                <textarea
                  style={defaultStyleDiv}
                  placeholder="Видите только вы"
                  className={`${defaultStyleText}`}
                ></textarea>
              </label>
            </div>
          </div>
          <div className="flex items-baseline mt-16">
            <div onSubmit={handleSubmit}>
              <Button
                className="m-auto py-[10px] px-[25px] bg-[#A774FF] rounded-lg text-white text-sm mt-[25px]"
                size="md"
              >
                Сохранить
              </Button>
            </div>
            <div className="ml-2">
              <Button
                className="py-[10px] px-[25px] bg-transparent rounded-lg text-[#4D89FF] font-semibold hover:bg-[#EEEEEE]  "
                size="md"
              >
                Отменить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
