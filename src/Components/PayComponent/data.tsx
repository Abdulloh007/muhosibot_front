

export const columns = [
  { name: "Дата", uid: "date", sortable: true },
  { name: "Контрагент", uid: "group", sortable: true },
  { name: "Назначение платежа", uid: "type", sortable: true },
  { name: "Сумма, смн", uid: "summa", sortable: true },
  { name: "Когда заплатить", uid: "pay", sortable: true },
  { uid: "purchase", sortable: true },
];

export const tabs = {
  all: 'Все платежки',
  secondTab: 'не оплачено',
  thirdTab: 'оплачено',
}

type ItemType = {
  id: number;
  date: string;
  group: string;
  type: string;
  summa: string;
  pay: string;
  purchase: [
    { txt: string },
    { txt: string }
  ],
  payed: string,
};

export const users: ItemType[] = [
  {
    id: 1,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    type: 'Оплата товаров и услуг клиентами',
    summa: '2500,00',
    pay: 'Сегодня',
    purchase: [
      { txt: 'Оплачено' },
      { txt: 'Не оплачено' },
    ],
    payed: 'оплачено',
  },
  {
    id: 2,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    type: 'Оплата товаров и услуг клиентами',
    summa: '2500,00',
    pay: 'Сегодня',
    purchase: [
      { txt: 'Оплачено' },
      { txt: 'Не оплачено' },
    ],
    payed: 'оплачено',
  },
  {
    id: 3,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    type: 'Оплата товаров и услуг клиентами',
    summa: '2500,00',
    pay: 'Сегодня',
    purchase: [
      { txt: 'Оплачено' },
      { txt: 'Не оплачено' },
    ],
    payed: 'оплачено',
  },
  {
    id: 4,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    type: 'Оплата товаров и услуг клиентами',
    summa: '2500,00',
    pay: 'Сегодня',
    purchase: [
      { txt: 'Оплачено' },
      { txt: 'Не оплачено' },
    ],
    payed: 'оплачено',
  },
];

export const btnClass = {
  trigger: [
    "shadow-none",
    "p-0",
    "bg-transparent",
    "rounded-none",
    "min-h-0",
    "h-[30px]",
    "pl-[5px]",
  ],
  popoverContent: ["w-[140px]"],
};

