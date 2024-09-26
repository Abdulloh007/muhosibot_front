'use client';
import React, { useEffect, useState } from "react";
import App from "./table";
import { tabs, users } from "./data";
import { Autocomplete, AutocompleteItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import ExportComponent from '@/components/core/AllComponent/ExportComponent'
import PlusIcon from "@/components/core/Icons/PlusIcon";
import {
  defaultStyleInput,
  defaultStyleLabel,
  defaultStyleDiv,
  btnClassSelect,
  btnClass,
  TypeOperation,
} from "../core/addMoneyCom/data";
import { ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { Counterparty } from "@/interfaces/counterpaty";
import { useAppSelector } from "@/lib/hooks";
import { Transaction } from "@/interfaces/transaction";
import { Document } from "@/interfaces/document";

const SearchInput = {
  inputWrapper: ["border-none", "bg-[#FFFFFF]", "py-0", "h-[33px]", "w-[250px]"],
}

const Tabs: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('Все операции');
  const [isSearchValue, setSearchValue] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [operationTypeList, setOperationTypeList] = useState([]);
  const [operationDocTypeList, setOperationDocTypeList] = useState([]);
  const [counterpartiesList, setCounterpartiesList] = useState<Counterparty[]>([]);
  const [documentsList, setDocumentsList] = useState<Document[]>([]);
  
  const [editId, setEditId] = useState<null | string>(null)
  const [operation, setOperation] = useState('')
  const [type_id, set_type_id] = useState('')
  const [hasDocument, setHasDocument] = useState<boolean>(false)
  const [doctype_id, set_doctype_id] = useState('')
  const [resource, setResource] = useState('bank')
  const [title, setTitle] = useState('')
  const [document_id, set_document_id] = useState('')
  const [details, setDetails] = useState('')
  const [total, setTotal] = useState(0)
  const [total_tax, setTotalTax] = useState(0)
  const [counterparty_id, set_counterparty_id] = useState<any>(0)
  const [date, setDate] = useState('')
  const payment_account = useAppSelector(state => state.paymentAccount.id)

  useEffect(() => {
    axios.get('/api/transactions', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setTransactionList(res.data))

    axios.get('/api/transaction-types', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setOperationTypeList(res.data))

    axios.get('/api/transaction-doctypes', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setOperationDocTypeList(res.data))

    axios.get('/api/counterparty', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setCounterpartiesList(res.data))

  }, [])


  function handleModalOpen(key: any) {
    setOperation(key);
    onOpen()
  }
  const toggleTab = (index: string) => {
    setToggleState(index);
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filterItems = () => {
    if (toggleState !== "Все операции") {
      users.filter((user) => user.docs.toLowerCase() === toggleState.toLowerCase());
    }

    return users
  };

  const users1 = filterItems()

  function logDocs() {
    axios.get('/api/docs4transac/' + counterparty_id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => {
      if (res.data.length > 0) {
        setDocumentsList(res.data)
        setHasDocument(true)
      } else { }
    })
  }

  function submit(e: any) {
    e.preventDefault()
    let body = {
      operation,
      type_id,
      doctype_id,
      document_id,
      resource,
      title,
      details,
      total,
      total_tax,
      counterparty_id,
      date,
      payment_account
    }

    if(editId){
      axios.patch('/api/transactions/' + editId, body, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      }).then(res => { onClose(); location.reload() })
    }else{
      axios.post('/api/transactions', body, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      }).then(res => { onClose(); location.reload() })
    }
  }

  function editTr(id: number) {
    axios.get('/api/transactions/ ' + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => {
      let {data} = res
      setEditId(data.id)
      setOperation(data.operation)
      set_type_id(data.type_id)
      set_doctype_id(data.doctype_id)
      setTotal(data.total)
      setTotalTax(data.total_tax)
      setDetails(data.details)
      set_counterparty_id(data.counterparty_id)
      set_document_id(data.document_id)
      setDocumentsList(data.document ? [data.document] : [])
      setHasDocument(data.document ? true : false)
    })
    onOpen()
  }

  return (
    <>
      <div className="container">
        <div className='flex mb-[26px] items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-[36px] font-semibold'>Деньги</h1>
            <span className='text-[#B0B0B0] text-[16px]'>Деньги &gt; {toggleState}</span>
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
              <DropdownMenu aria-label="Static Actions" onAction={(key: any) => handleModalOpen(key)}
              >
                <DropdownItem key="income">Поступление</DropdownItem>
                <DropdownItem key="payment">Списание</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
        <div>
          <div className='w-full'>
            <div className="flex justify-between">
              <div className="bloc-tabs">
                <button
                  className={toggleState === 'Все операции' ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(tabs.all)}
                >
                  Все
                </button>
                <button
                  className={toggleState === 'Поступления' ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(tabs.secondTab)}
                >
                  Поступления
                </button>
                <button
                  className={toggleState === 'Списания' ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(tabs.thirdTab)}
                >
                  Списания
                </button>
              </div>
              <ExportComponent users1={users1} collapse={true} />
            </div>
            <div className="content-tabs h-[500px] z-0">
              <div
                className={`${toggleState === 'Все операции' ? "content  active-content" : "content"}`}
              >
                <App action={editTr} rows={transactionList} filterVal={toggleState} searchVal={isSearchValue} />
              </div>

              <div
                className={toggleState === 'Поступления' ? "content  active-content" : "content"}
              >
                <App action={editTr} rows={transactionList} filterVal={"income"} searchVal={isSearchValue} />
              </div>

              <div
                className={toggleState === 'Списания' ? "content  active-content" : "content"}
              >
                <App action={editTr} rows={transactionList} filterVal={"payment"} searchVal={isSearchValue} />
              </div>
            </div>
          </div>
        </div>
      </div >
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
                <div className="flex">
                  <h1 className="font-semibold text-[24px]">
                    {operation == 'payment' ? 'Списание' : operation == 'income' ? 'Поступление' : ''}
                    <span className="ml-2 font-semibold text-purpleLg">{resource == 'cash' ? 'наличными' : resource == 'bank' ? 'по банку' : resource == 'ect' ? 'прочее' : ''}</span>
                  </h1>
                  <Select
                    aria-label="none"
                    labelPlacement="outside"
                    className="bg-white w-[10px] text-purpleLg "
                    disableSelectorIconRotation
                    classNames={btnClassSelect}
                    selectedKeys={[resource]}
                    onChange={e => setResource(e.target.value)}
                    startContent={<ExpandMore />}
                  >
                    {TypeOperation.map((item) => (
                      <SelectItem key={item.code} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalHeader>
              <form onSubmit={submit}>
                <ModalBody>
                  <div className="flex w-full  items-baseline mb-[18px]">
                    <label className="flex w-full items-baseline">
                      <div>
                        <p style={defaultStyleLabel}>Тип операции</p>
                      </div>
                      <div style={defaultStyleDiv}>
                        <Select
                          aria-label="none"
                          placeholder="Оплата товаров и услуг"
                          labelPlacement="outside"
                          className={"bg-[#F1F1F1] border-b-2 border-[#757575] "}
                          disableSelectorIconRotation
                          classNames={btnClass}
                          selectorIcon={<ExpandMore />}
                          selectedKeys={[type_id]}
                          onChange={e => set_type_id(e.target.value)}
                        >
                          {operationTypeList.filter((item: any) => item.operation == operation ? true : false).map((item: any) => (
                            <SelectItem
                              key={item.id}
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-baseline mb-[18px]">
                    <label className=" flex items-baseline">
                      <p style={defaultStyleLabel}>Сумма</p>
                      <div style={defaultStyleDiv}>
                        <input
                          aria-label="Cумма"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="transition bg-[#F1F1F1] focus:bg-white h-[30px] placeholder:text-black focus:text-end border-b-2 border-[#757575] focus:border-[#A774FF]  pl-[5px] text-[14px] focus:outline-none"
                          value={total}
                          onChange={e => { setTotal(parseFloat(e.target.value)); setTotalTax(parseFloat(e.target.value)) }}
                        />
                        смн
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
                          value={total_tax}
                          onChange={e => setTotalTax(parseFloat(e.target.value))}
                        />
                        смн
                      </div>
                    </label>
                  </div>
                  <div className="flex items-baseline mb-[18px]">
                    <label className=" flex items-baseline">
                      <p style={defaultStyleLabel}>Дата {operation == 'payment' ? 'списания' : operation == 'income' ? 'поступления' : ''}</p>
                      <input
                        aria-label="Дата поступления"
                        type="date"
                        style={defaultStyleDiv}
                        className="transition bg-[#F1F1F1] focus:bg-white h-[30px] placeholder:text-black border-b-2 border-[#757575] focus:border-[#A774FF]  pl-[5px] text-[14px] focus:outline-none"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                      />
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
                  <div className="flex w-full items-baseline mb-[18px]">
                    <label className="w-full flex items-baseline">
                      <p style={defaultStyleLabel}>Платежный документ</p>
                      <div
                        style={defaultStyleDiv}
                        className="flex items-center"
                      >
                        <Select
                          placeholder="Платёжное поручение"
                          labelPlacement="outside"
                          className="bg-[#F1F1F1] border-b-2 mr-1 border-[#757575]"
                          disableSelectorIconRotation
                          classNames={btnClass}
                          selectorIcon={<ExpandMore />}
                          selectedKeys={[doctype_id]}
                          onChange={e => set_doctype_id(e.target.value)}
                        >
                          {operationDocTypeList.filter((item: any) => item.operation == operation ? true : false).map((item: any) => (
                            <SelectItem
                              key={item.id}
                              value={item.title}
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                        </Select>
                        №
                        <input
                          aria-label="Платёжное поручение"
                          type="text"
                          className={`${defaultStyleInput} ml-1`}
                          value={details}
                          onChange={e => setDetails(e.target.value)}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="flex w-full items-baseline mb-[18px]">
                    <label className="w-full flex items-baseline">
                      <p style={defaultStyleLabel}>Назначение платежа</p>
                      <textarea
                        placeholder="Назначение платежа"
                        style={defaultStyleDiv}
                        className={`${defaultStyleInput} min-h-[60px] h-[60px]`}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      ></textarea>
                    </label>
                  </div>
                  {
                    hasDocument
                      ? (<div className="flex w-full items-baseline mb-[18px]">
                        <label className="w-full flex items-baseline">
                          <p style={defaultStyleLabel}>Документ</p>
                          <Select
                            aria-label="none"
                            placeholder="Платёжное поручение"
                            labelPlacement="outside"
                            className="bg-[#F1F1F1] border-b-2 mr-1 border-[#757575]"
                            disableSelectorIconRotation
                            classNames={btnClass}
                            selectorIcon={<ExpandMore />}
                            selectedKeys={[document_id]}
                            onChange={e => set_document_id(e.target.value)}
                          >
                            {operation == 'income'
                              ? documentsList.filter((item: any) => item.document_type.id == 2 ? true : false).map((item: any) => (
                                <SelectItem
                                  key={item.id}
                                >
                                  {item.title} от {new Date(item.created_at).toLocaleDateString()}
                                </SelectItem>
                              ))
                              : documentsList.filter((item: any) => item.document_type.id == 3 ? true : false).map((item: any) => (
                                <SelectItem
                                  key={item.id}
                                >
                                  {item.title} от {new Date(item.created_at).toLocaleDateString()}
                                </SelectItem>
                              ))
                          }
                            
                          </Select>
                        </label>
                      </div>)
                      : (<p className="text-[#4d89ff]" onClick={e => logDocs()}>Связать документ</p>)
                  }
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
                        onClick={onClose}
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
};

export default Tabs;
