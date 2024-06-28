"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function Form() {

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
  const [contacts, set_contacts] = useState('')
  const [for_sign_docs, set_for_sign_docs] = useState('')
  const [by_person, set_by_person] = useState('')
  const [passport_details, set_passport_details] = useState('')
  const [comment, set_comment] = useState('')
  const [payment_method, set_payment_method] = useState('')

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
      contacts,
      for_sign_docs,
      by_person,
      passport_details,
      comment,
      payment_method,
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
                  placeholder="Используется в интерфейсе Эльбы"
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
                  onChange={e => { set_legal_address(e.target.value); if (!isAddressTrue) {set_physic_address(e.target.value)}}}
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
