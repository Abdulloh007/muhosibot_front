"use client";
import React from "react";
import Link from "next/link";
import FolderIconYellow from "@/components/core/Icons/FolderIconYellow";
import FolderIconGreen from "@/components/core/Icons/FolderIconGreen";
import FolderIconPurple from "@/components/core/Icons/FolderIconPurple";
import { Accordion, AccordionItem } from "@nextui-org/react";

const DivTables = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="flex items-center">
      <div className="flex flex-col w-[60%]">
        <div className="py-4 mt-[35px] rounded-md shadow-md bg-white pl-4">
          <div className="flex items-center mb-3">
            <h1 className="font-medium text-[24px]">Деньги</h1>
            <span className="ml-[9px] text-[12px] text-linkSm">
              Составить счет
            </span>
          </div>
          <div className="mb-[10px]">
            <p className="mt-[10px]">
              Доход: <span>25420.25 </span>смн
            </p>
            <p className="mt-[10px]">
              Расход: <span>25420.25 </span>смн
            </p>
            <p className="mt-[10px]">
              Текущий остаток по кассе:{" "}
              <span className="text-linkSm">25420.25 </span>смн
            </p>
            <p className="mt-[10px]">
              Текущий остаток по э.кошельку:{" "}
              <span className="text-linkSm">25420.25 </span>смн
            </p>
            <p className="mt-[10px]">
              Текущий остаток по банку:{" "}
              <span className="text-linkSm">25420.25 </span>смн
            </p>
          </div>
          <Link href="/money" className="text-linkSm ">
            Все деньги
          </Link>
        </div>
        <div className="pt-4 pb-5 mt-[35px]  rounded-md shadow-md bg-white pl-4">
          <div className="flex items-center mb-3">
            <h1 className="font-medium text-[24px]">Документы</h1>
            <span className="ml-[9px] text-[12px] text-linkSm">
              Составить документ
            </span>
          </div>
          <div className="mb-[10px] flex items-center">
            <FolderIconYellow />
            <p className="text-linkSm pl-1.5">
              Неоплаченный счёт
              <span className="text-[#141414]">- 1 на 500,00 смн</span>
            </p>
          </div>
          <div className="mb-[10px] flex items-center">
            <FolderIconGreen />
            <p className="text-linkSm pl-1.5">
              Неоплаченный акт
              <span className="text-[#141414]">- 1 на 500,00 смн</span>
            </p>
          </div>
          <div className="mb-[12px] flex items-center">
            <FolderIconPurple />
            <p className="text-linkSm pl-1.5">
              Неподписанная накладная
              <span className="text-[#141414]">- 8 на 5 600,00 смн</span>
            </p>
          </div>
          <Link href="/document" className="text-linkSm ">
            Все документы
          </Link>
        </div>
      </div>
      <div className="flex flex-col ml-[30px] w-[40%] h-[490px]">
        <div className="rounded-md pt-[15px] pl-[10px] h-full bg-white shadow-md">
          <h1 className="font-medium text-[24px]">События дня</h1>
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 4" title="Accordion 4">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="5" aria-label="Accordion 5" title="Accordion 5">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DivTables;
