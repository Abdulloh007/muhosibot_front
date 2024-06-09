import React from "react";
import { Tabs, Tab, RadioGroup, Radio } from "@nextui-org/react";
import PenIcon from "@/components/core/Icons/PenIcon";

const TabsSelect = {
  cursor: ["bg-purpleLg", "w-[90%]"],
  tabContent: ["text-[18px]"],
};

const TabsCom = () => {
  return (
    <div className="container">
      <div className="flex flex-col">
        <h1 className="text-[36px] font-semibold">Настройки</h1>
        <span className="text-[#B0B0B0] text-[16px]">
          Настройки &gt; Аккаунт и уведомления
        </span>
      </div>
      <div className="w-full  rounded-xl shadow-lg h-[700px] bg-white">
        <div className="pl-[20px] mt-[26px]">
          <div className="pt-[20px] w-full border-b-2">
            <Tabs
              key="underlined"
              variant="underlined"
              classNames={TabsSelect}
              aria-label="Tabs variants"
            >
              <Tab key="account" title="Аккаунт и уведомления" />
              <Tab key="tarif" title="Тарифы и оплата" />
              <Tab key="adaptive" title="Многопользовательский режим" />
              <Tab key="copy" title="Копия данных" />
            </Tabs>
          </div>
          <div className="w-1/2 mt-[25px]">
            <div className="pt-[25px]">
              <div className="flex mt-[15px]">
                <p style={{ width: 158 }}>Электронная почта</p>
                <div className="flex ">
                  <p className="ml-[100px]">domain@email.com</p>
                  <div className="flex items-center ml-[10px] text-linkSm">
                    <PenIcon />
                    Изменить почту
                  </div>
                </div>
              </div>
              <div className="flex mt-[15px]">
                <p style={{ width: 158 }}>Телефон</p>
                <div className="flex">
                  <p className="ml-[100px]">+992 92 999 9999</p>
                  <div className="flex items-center ml-[10px] text-linkSm">
                    <PenIcon />
                    Изменить номер
                  </div>
                </div>
              </div>
              <div className="flex mt-[15px]">
                <p style={{ width: 158 }}>Пароль</p>
                <div className="flex">
                  <p className="ml-[100px]">**************</p>
                  <div className="flex items-center ml-[10px] text-linkSm">
                    <PenIcon />
                    Изменить пароль
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 mt-[40px]">
            <h1 className="font-semibold text-[18px]">Вход в платформу</h1>
            <RadioGroup className="mt-[20px]">
              <Radio value="toPassword">По паролю</Radio>
              <Radio value="PushAndPw" className="flex items-start">
                По паролю и push-уведомлению от мобильного приложения
                <br />
                <a
                  href="https://nextui.org/docs/components/radio-group"
                  className="text-linkSm text-[14px]"
                >
                  Почему это удобно
                </a>
              </Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsCom;
