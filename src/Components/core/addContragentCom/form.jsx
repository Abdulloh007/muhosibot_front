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
} from "../addExployerCom/data";
import { ExpandMore } from "@mui/icons-material";


const Form = () => {
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
    <div className="mt-10 h-[95%]">
      <div className="container-form h-full">
        <div className="flex items-center mb-[38px]">
          <Link href="/contragent">
            <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
              <ChevronLeftIcon />
            </Button>
          </Link>
          <h1 className="font-bold text-[18px] ml-[16px]">Новый Контрагент</h1>
        </div>
        <form action="">
          <div className="flex flex-col items-start justify-center w-1/2">
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Полное название</p>
                <input
                  style={defaultStyleDiv}
                  placeholder="Используется в документах"
                  type="text"
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Краткое название</p>
                <input
                  style={defaultStyleDiv}
                  placeholder="Используется в интерфейсе Эльбы"
                  type="text"
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Юридический адрес</p>
                <textarea
                  style={defaultStyleDiv}
                  placeholder="Например, г. Екатеринбург, пр. Ленина, 99, оф. 234"
                  className={`${defaultStyleText}`}
                ></textarea>
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Фактический адрес</p>
                <div style={defaultStyleDiv} className="flex flex-col w-full">
                  <Checkbox onClick={handleAddress} radius="md">
                    Совпадает с адресом регистрации
                  </Checkbox>
                  {isAddressTrue && (<textarea
                    placeholder="Например, г. Екатеринбург, пр. Ленина, 99, оф. 234"
                    className={`${defaultStyleText} mt-5`}
                  ></textarea>)}
                </div>
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Сайт</p>
                <input
                  style={defaultStyleDiv}
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
                    {GroupList.map((item) => (
                      <SelectItem
                        key={item.txt.toLocaleLowerCase()}
                        value={item.txt.toLocaleLowerCase()}
                      >
                        {item.txt}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>ИНН</p>
                <input
                  type="text"
                  style={{ width: 120 }}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>КПП</p>
                <input
                  type="text"
                  style={{ width: 120 }}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>ФИО для подписи</p>
                <input
                  type="text"
                  placeholder="Иванов И. И."
                  style={defaultStyleDiv}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>В лице</p>
                <input
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  style={defaultStyleDiv}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Паспортные данные</p>
                <textarea
                  style={defaultStyleDiv}
                  placeholder="Например: номер 65 10 000000, выдан Кировским УВД г. Екатеринбурга 01.01.2010"
                  className={`${defaultStyleText}`}
                ></textarea>
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Комментарий</p>
                <textarea
                  style={defaultStyleDiv}
                  placeholder="Видите только вы"
                  className={`${defaultStyleText}`}
                ></textarea>
              </label>
            </div>
            <div className="flex w-full mt-[75px]  items-center mb-[14px]">
              <div className="flex flex-col" style={defaultStyleLabel}>
                <div>
                  <h1 className="font-bold text-[18px]  mb-6">Контакты</h1>
                  <Button
                    onClick={handleClickContact}
                    className="bg-[#4D89FF] text-white  border-none"
                    endContent={isContact ? <MinusIcon /> : <PlusIcon />}
                    size="md"
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              {isContact ? (
                <div className="w-full" style={defaultStyleDiv}>
                  <input
                    type="text"
                    placeholder="Допольнительные контакты"
                    className={`${defaultStyleInput} `}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex w-full mt-[75px]  items-center mb-[14px]">
              <div className="flex flex-col" style={defaultStyleLabel}>
                <div>
                  <h1 className="font-bold text-[18px]  mb-6">
                    Расчетные счета
                  </h1>
                  <Button
                    onClick={handleClickPrice}
                    className="bg-[#4D89FF] text-white  border-none"
                    endContent={isContact ? <MinusIcon /> : <PlusIcon />}
                    size="md"
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              {isPrice ? (
                <div className="w-full" style={defaultStyleDiv}>
                  <input
                    type="text"
                    placeholder="Расчетные счета"
                    className={`${defaultStyleInput} `}
                  />
                </div>
              ) : (
                ""
              )}
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

export default Form;
