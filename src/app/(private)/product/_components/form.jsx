"use client";
import React, { useState, useEffect } from "react";
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
  UnitList,
} from "@/components/core/addExployerCom/data";
import { ExpandMore } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";


export default function Form() {
  const [editId, setEditId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [unit, setUnit] = useState('')
  const [type, setType] = useState('1')
  const [price, setPrice] = useState(null)
  const [balance, setBalance] = useState(null)

  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const id = params.get('editId')
    if (id) {
      setEditId(id)
      axios.get('/api/products/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      }).then(res => {
        setName(res.data.name)
        setDescription(res.data.description)
        setUnit(res.data.unit)
        setPrice(res.data.price)
        setBalance(res.data.balance)
      })
    }
  }, [params])

  function handleSubmit(e) {
    e.preventDefault()
    let body = {
      name,
      description,
      unit,
      type,
      price,
      balance
    }
    if (editId) {
      axios.patch('/api/products/' + editId, body, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      }).then(res => {
        router.push('/product')
      })
    }else {
      axios.post('/api/products', body, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      }).then(res => {
        router.push('/product')
      })
    }
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
          <h1 className="font-bold text-[18px] ml-[16px]">{editId ? 'Редактирование' : 'Новый Продукт'}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start justify-center w-1/2">
            <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Название товара</p>
                <input
                  style={defaultStyleDiv}
                  placeholder=""
                  type="text"
                  className={`${defaultStyleInput}`}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>
            </div>
            {/* <div className="flex w-full  items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Другое название</p>
                <input
                  style={defaultStyleDiv}
                  placeholder="Используется в интерфейсе"
                  type="text"
                  className={`${defaultStyleInput}`}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </label>
            </div> */}
            {/* <div className="flex w-full items-baseline mb-[14px]">
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
                <p style={defaultStyleLabel}>Артикул</p>
                <input
                  type="text"
                  style={defaultStyleDiv}
                  className={`${defaultStyleInput}`}
                />
              </label>
            </div> */}
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Тип</p>
                <div style={defaultStyleDiv}>
                  <Select
                    placeholder=""
                    aria-label=""
                    labelPlacement="outside"
                    className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={<ExpandMore />}
                    onChange={e => setType(e.target.value)}
                    selectedKeys={[type]}
                    isRequired
                  >
                      <SelectItem
                        key={1}
                      >
                        Товар
                      </SelectItem>
                      <SelectItem
                        key={2}
                      >
                        Услуга
                      </SelectItem>
                  </Select>
                </div>
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Единица измерения</p>
                <div style={defaultStyleDiv}>
                  <Select
                    placeholder="шт"
                    aria-label=""
                    labelPlacement="outside"
                    className="bg-[#F1F1F1] border-b-2 border-[#757575]"
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={<ExpandMore />}
                    onChange={e => setUnit(e.target.value)}
                    selectedKeys={[unit]}
                    isRequired
                  >
                    {UnitList.map((item) => (
                      <SelectItem
                        key={item.txt}
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
                <p style={defaultStyleLabel}>Цена</p>
                <input
                  type="number"
                  style={{ width: 120 }}
                  className={`${defaultStyleInput}`}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="flex w-full items-baseline mb-[14px]">
              <label className="flex w-full items-baseline">
                <p style={defaultStyleLabel}>Количество на складе</p>
                <input
                  type="number"
                  style={{ width: 120 }}
                  className={`${defaultStyleInput}`}
                  value={balance}
                  onChange={e => setBalance(e.target.value)}
                  required
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
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
          <div className="flex items-baseline mt-16">
            <div>
              <Button
                className="m-auto py-[10px] px-[25px] bg-[#A774FF] rounded-lg text-white text-sm mt-[25px]"
                type="submit"
                size="md"
              >
                Сохранить
              </Button>
            </div>
            <div className="ml-2">
              <Link href="/product">
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
