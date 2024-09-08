import React, { useEffect, useState } from "react";
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
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import {
  defaultStyleInput,
  defaultStyleLabel,
  defaultStyleDiv,
  // btnClassSelect,
  btnClass,
  TypeOperation,
} from "./data";
import axios from "axios";

export default function PayModalApp({ isOpen, onOpen, onClose, editID = null }) {

  const [operationTypeList, setOperationTypeList] = useState([]);
  const [counterpartiesList, setCounterpartiesList] = useState([]);

  const [type_id, set_type_id] = useState('')
  const [date, set_date] = useState('')
  const [payment_sum, set_payment_sum] = useState()
  const [total_payment_sum, set_total_payment_sum] = useState()
  const [payment_purpose, set_payment_purpose] = useState()
  const [counterparty_id, set_counterparty_id] = useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    let body = {
      type_id,
      date,
      payment_purpose,
      payment_sum,
      owner_id: counterparty_id
    }
    axios.post('/api/payments', body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => { onClose(); location.reload() })
  };

  useEffect(() => {
    axios.get('/api/transaction-types', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setOperationTypeList(res.data))

    axios.get('/api/counterparty', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setCounterpartiesList(res.data))

    console.log(editID);
  }, [])

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
                      <p style={defaultStyleLabel}>Тип операции</p>

                      
                        <Select
                          aria-label="none"
                          placeholder="Оплата товаров и услуг"
                          labelPlacement="outside"
                          className={"bg-[#F1F1F1] border-b-2 border-[#757575] "}
                          disableSelectorIconRotation
                          selectorIcon={<ExpandMore />}
                          selectedKeys={[type_id]}
                          onChange={e => set_type_id(e.target.value)}
                        >
                          {operationTypeList.filter((item) => item.operation == 'payment' ? true : false).map((item) => (
                            <SelectItem
                              key={item.id}
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                        </Select>
                      
                    </label>
                  </div>
                  <div className="flex w-full items-baseline mb-[18px]">
                    <label className="w-full flex items-baseline">
                      <p style={defaultStyleLabel}>Контрагент</p>

                      <Autocomplete
                        aria-label="none"
                        placeholder="Контрагент"
                        labelPlacement="outside"
                        inputProps={{
                          classNames: {
                            input: "",
                            inputWrapper: "bg-[#F1F1F1] border-b-2 border-[#757575] shadow-none p-0 bg-transparent rounded-none min-h-0 h-[30px] pl-[5px]",
                          }
                        }}
                        disableSelectorIconRotation
                        selectorIcon={<ExpandMore />}
                        defaultItems={counterpartiesList}
                        selectedKey={counterparty_id}
                        onSelectionChange={set_counterparty_id}
                        onChange={()  => setHasDocument(false)}
                      >
                        {(item) => <AutocompleteItem key={item.id}>{item.full_name}</AutocompleteItem>}
                      </Autocomplete>
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
                          className="transition bg-[#F1F1F1] focus:bg-white h-[30px] placeholder:text-black focus:text-end border-b-2 border-[#757575] focus:border-[#A774FF]  pl-[5px] text-[14px] focus:outline-none"
                          value={payment_sum}
                          onChange={e => { set_payment_sum(parseFloat(e.target.value)); set_total_payment_sum(parseFloat(e.target.value)) }}
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
                          className="transition bg-[#F1F1F1] focus:bg-white h-[30px] placeholder:text-black focus:text-end border-b-2 border-[#757575] focus:border-[#A774FF]  pl-[5px] text-[14px] focus:outline-none"
                          value={total_payment_sum}
                          onChange={e => set_total_payment_sum(parseFloat(e.target.value))}
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
                        className="transition bg-[#F1F1F1] focus:bg-white h-[30px] placeholder:text-black border-b-2 border-[#757575] focus:border-[#A774FF]  pl-[5px] text-[14px] focus:outline-none"
                        value={date}
                        onChange={e => set_date(e.target.value)}
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
                          value={payment_purpose}
                          onChange={e => set_payment_purpose(e.target.value)}
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
