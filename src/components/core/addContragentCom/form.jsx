"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, Button, RadioGroup, Radio } from "@nextui-org/react";
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
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const emptyContact = {
  id: 0,
  type: 'tel',
  value: '',
  comment: ''
}

const emptyPaymentAccount = {
  account: '',
  bank_code: '',
  bank_name: '',
  bic: '',
  сorrespondent_account: '',
  comments: '',
  status: 'active',
  balance: 0
}

function Form() {
  const [incrementContacts, setIncrementContacts] = useState(0)
  const [incrementPaymentAccount, setIncrementPaymentAccount] = useState(0)
  const [categoryList, setCategoryList] = useState([])

  const [editId, setEditId] = useState(null)
  const [full_name, set_full_name] = useState('')
  const [short_name, set_short_name] = useState('')
  const [legal_address, set_legal_address] = useState('')
  const [physic_address, set_physic_address] = useState('')
  const [site, set_site] = useState('')
  const [category_id, set_category_id] = useState(0)
  const [inn, set_inn] = useState('')
  const [kpp, set_kpp] = useState('')
  const [contacts, set_contacts] = useState([])
  const [for_sign_docs, set_for_sign_docs] = useState('')
  const [by_person, set_by_person] = useState('')
  const [passport_details, set_passport_details] = useState('')
  const [comment, set_comment] = useState('')
  const [payment_accounts, set_payment_accounts] = useState([])

  const [isContact, SetContact] = useState(false);
  const [isPrice, SetPrice] = useState(false);
  const [isAddressTrue, setAddressTrue] = useState(true)

  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    // const docId = params.get('doctype_id')
    // const type = params.get('type')
    // set_doc_type(parseInt(docId || "0"));
    // setType(type || '');

  }, [params])

  useEffect(() => {
    axios.get('/api/counterparty-category', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(res => setCategoryList(res.data))
    if (editId) {
      axios.get('/api/counterparty/' + editId, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      }).then(res => { })
    }
  }, [])

  function onContactsChange(e, id) {
    const { name, value } = e.target

    const editedData = contacts.map(item => {
      if (item.id === id) return { ...item, [name]: value }
      else return item
    })

    set_contacts(editedData)
  }
  function onPaymentAccountsChange(e, id) {
    const { name, value } = e.target

    const editedData = payment_accounts.map(item => {
      if (item.id === id) return { ...item, [name]: value }
      else return item
    })

    set_payment_accounts(editedData)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/counterparty', {
      full_name,
      short_name,
      legal_address,
      physic_address,
      site,
      category_id: parseInt(category_id),
      inn,
      kpp,
      contacts: JSON.stringify(contacts),
      for_sign_docs,
      by_person,
      passport_details,
      comment,
      payment_accounts: JSON.stringify(payment_accounts),
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
      }
    }).then(() => router.push('/contragent'))
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
    <div className="container">
      <div className="container-form h-full">
        <div className="flex items-center mb-[38px]">
          <Link href="/contragent">
            <Button isIconOnly className="bg-[#A774FF]" aria-label="Back">
              <ChevronLeftIcon />
            </Button>
          </Link>
          <h1 className="font-bold text-[18px] ml-[16px]">Новый Контрагент</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start justify-center w-1/2">
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Полное название</p>
                <input
                  style={defaultStyleDiv}
                  placeholder="Используется в документах"
                  type="text"
                  className={`${defaultStyleInput}`}
                  value={full_name}
                  onChange={e => { set_full_name(e.target.value); set_short_name(e.target.value) }}
                  required
                />
              </label>
            </div>
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Краткое название</p>
                <input
                  style={defaultStyleDiv}
                  placeholder="Используется в интерфейсе"
                  type="text"
                  className={`${defaultStyleInput}`}
                  value={short_name}
                  onChange={e => set_short_name(e.target.value)}
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
                  value={legal_address}
                  onChange={e => { set_legal_address(e.target.value); if (!isAddressTrue) { set_physic_address(e.target.value) } }}
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
                    value={physic_address}
                    onChange={e => set_physic_address(e.target.value)}
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
                  value={site}
                  onChange={e => set_site(e.target.value)}
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Группа</p>
                <div style={defaultStyleDiv}>
                  <Select
                    aria-label="qwe"
                    placeholder="Выберите группу или введите название новой ..."
                    labelPlacement="outside"
                    className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={<ExpandMore />}
                    selectedKeys={[category_id]}
                    onChange={e => set_category_id(e.target.value)}
                  >
                    {categoryList.map((item) => (
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
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>ИНН</p>
                <input
                  type="text"
                  style={{ width: 120 }}
                  className={`${defaultStyleInput}`}
                  value={inn}
                  onChange={e => set_inn(e.target.value)}
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
                  value={kpp}
                  onChange={e => set_kpp(e.target.value)}
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
                  value={for_sign_docs}
                  onChange={e => set_for_sign_docs(e.target.value)}
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
                  value={by_person}
                  onChange={e => set_by_person(e.target.value)}
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
                  value={passport_details}
                  onChange={e => set_passport_details(e.target.value)}
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
                  value={comment}
                  onChange={e => set_comment(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="flex w-full mt-[75px]  items-center mb-[14px]">
              <div className="flex flex-col" style={defaultStyleLabel}>
                <div>
                  <h1 className="font-bold text-[18px]  mb-6">Контакты</h1>
                  <Button
                    onClick={e => { set_contacts([...contacts, { ...emptyContact, id: incrementContacts + 1 }]); setIncrementContacts(incrementContacts + 1) }}
                    className="bg-[#4D89FF] text-white  border-none"
                    endContent={<PlusIcon />}
                    size="md"
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-wrap">

                {contacts.map(item => (
                  <div className="w-full mb-2 relative" style={defaultStyleDiv}>
                    <Select
                      className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                      classNames={btnClass}
                      aria-label="type"
                      placeholder="Тип"
                      selectedKeys={[item.type]}
                      name="type"
                      onChange={e => onContactsChange(e, item.id)}
                    >
                      <SelectItem key="tel">Телефон</SelectItem>
                      <SelectItem key="email">Почта</SelectItem>
                    </Select>
                    <input
                      type={item.type == 'tel' ? "number" : "email"}
                      placeholder=""
                      className={`${defaultStyleInput} mt-2`}
                      value={item.value}
                      onChange={e => onContactsChange(e, item.id)}
                      name="value"
                      required
                    />
                    <Button className='absolute top-[20%] left-[100%]' isIconOnly color="danger" variant="light" aria-label="Delete" onClick={e => set_contacts([...contacts.filter(it => it.id !== item.id)])}>
                      <svg width={16} height={16} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88"><title>trash</title><path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" /></svg>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full mt-[75px]  items-center mb-[14px]">
              <div className="flex flex-col" style={defaultStyleLabel}>
                <div>
                  <h1 className="font-bold text-[18px]  mb-6">
                    Расчетные счета
                  </h1>
                  <Button
                    onClick={e => { set_payment_accounts([...payment_accounts, { ...emptyPaymentAccount, id: incrementPaymentAccount + 1 }]); setIncrementPaymentAccount(incrementPaymentAccount + 1) }}
                    className="bg-[#4D89FF] text-white  border-none"
                    endContent={<PlusIcon />}
                    size="md"
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-wrap">
                {payment_accounts.map(item => (
                  <div className="w-full mb-2 relative" style={defaultStyleDiv}>
                    <input
                      type="text"
                      placeholder="Счёт"
                      className={`${defaultStyleInput} mb-2`}
                      name="account"
                      value={item.account}
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Код Банка"
                      className={`${defaultStyleInput} mb-2`}
                      name="bank_code"
                      value={item.bank_code}
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                    />
                    <input
                      type="text"
                      placeholder="Название Банка"
                      className={`${defaultStyleInput} mb-2`}
                      name="bank_name"
                      value={item.bank_name}
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="BIC"
                      className={`${defaultStyleInput} mb-2`}
                      name="bic"
                      value={item.bic}
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Кореспондентский счет"
                      className={`${defaultStyleInput} mb-2`}
                      name="сorrespondent_account"
                      value={item.сorrespondent_account}
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                    />
                    <input
                      type="text"
                      placeholder="Комментарий"
                      className={`${defaultStyleInput} mb-2`}
                      name="comments"
                      value={item.comments}
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                    />
                    <RadioGroup
                    aria-label="status"
                      value={item.status}
                      name="status"
                      onChange={e => onPaymentAccountsChange(e, item.id)}
                      >
                      <Radio value="active">Действующий</Radio>
                      <Radio value="close">Закрытый</Radio>
                    </RadioGroup>
                    <Button className='absolute top-[20%] left-[100%]' isIconOnly color="danger" variant="light" aria-label="Delete" onClick={e => set_payment_accounts([...payment_accounts.filter(it => it.id !== item.id)])}>
                      <svg width={16} height={16} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88"><title>trash</title><path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" /></svg>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-baseline mt-16">
            <div onSubmit={handleSubmit}>
              <Button
                className="m-auto py-[10px] px-[25px] bg-[#A774FF] rounded-lg text-white text-sm mt-[25px]"
                size="md"
                type="submit"
              >
                Сохранить
              </Button>
            </div>
            <div className="ml-2">
              <Link href="/contragent">
                <Button
                  className="py-[10px] px-[25px] bg-transparent rounded-lg text-[#4D89FF] font-semibold hover:bg-[#EEEEEE]  "
                  size="md"
                >
                  Отменить
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
