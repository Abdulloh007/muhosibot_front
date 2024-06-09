import React, { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  defaultStyleInput,
  defaultStyleLabel,
  defaultStyleDiv,
  // btnClassSelect,
  btnClass,
  TypeOperation,
} from "./data";

export default function PayModalApp({ isOpen, onOpen, onClose }) {
  const handleSubmit = () => {
    console.log("lox");
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        className="!max-w-[600px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-semibold text-[24px]">Платежка</h1>
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="flex w-full  items-baseline mb-[18px]">
                    <label className="flex w-full items-baseline">
                      <div>
                        <p style={defaultStyleLabel}>Тип операции</p>
                      </div>
                      <div style={defaultStyleDiv}>
                        <Select
                          placeholder="Оплата товаров и услуг"
                          labelPlacement="outside"
                          className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                          disableSelectorIconRotation
                          classNames={btnClass}
                          selectorIcon={<ExpandMore />}
                        >
                          {TypeOperation.map((item) => (
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
                  <div className="flex items-baseline mb-[18px]">
                    <label className=" flex items-baseline">
                      <p style={defaultStyleLabel}>Сумма</p>
                      <div style={defaultStyleDiv} className="flex">
                        <input
                          aria-label="Cумма"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="bg-white h-[30px] placeholder:text-black text-end border-b-2 border-[#A774FF]  pl-[5px] text-[14px] hover:border-b-2  focus:outline-none"
                        />
                        смн
                        <Select
                          placeholder="без НДС"
                          labelPlacement="outside"
                          className="bg-[#F1F1F1] w-[107px] border-b-2 border-[#757575]"
                          disableSelectorIconRotation
                          classNames={btnClass}
                          selectorIcon={<ExpandMore />}
                        >
                          {TypeOperation.map((item) => (
                            <SelectItem key={item.txt} value={item.txt}>
                              {item.txt}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-baseline mb-[18px]">
                    <label className=" flex items-center">
                      <p style={defaultStyleLabel}>
                        Учитывать
                        <br />в доходах УСН
                      </p>
                      <div style={defaultStyleDiv}>
                        <input
                          aria-label="Учитывать в доходах УСН"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="border-b-2 h-[30px] bg-[#F1F1F1] border-[#757575] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none"
                        />
                        смн
                      </div>
                    </label>
                  </div>
                  <div className="flex items-baseline mb-[18px]">
                    <label className=" flex items-baseline">
                      <p style={defaultStyleLabel}>Когда заплатить</p>
                      <input
                        aria-label="Дата поступления"
                        type="date"
                        style={defaultStyleDiv}
                        className="border-b-2 h-[30px] bg-[#F1F1F1] border-[#757575] pl-[5px] text-[14px] hover:border-b-2  focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="flex w-full items-baseline mb-[18px]">
                    <label className="w-full flex items-baseline">
                      <p style={defaultStyleLabel}>Назначение платежа</p>
                      <div style={defaultStyleDiv} className="flex flex-col">
                        <textarea
                          placeholder="НДС"
                          className={`${defaultStyleInput} min-h-[60px] h-[60px]`}
                        ></textarea>
                        <span className="text-[#525252] text-[10px]">
                          Укажите название товара или услуги, номер и дату счёта
                          или договора
                        </span>
                      </div>
                    </label>
                  </div>
                </ModalBody>
                <ModalFooter className="justify-start">
                  <div className="flex items-baseline mt-16">
                    <div>
                      <Button
                        type="submit"
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
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
