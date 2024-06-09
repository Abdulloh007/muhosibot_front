

export const columns = [
  { name: "Дата", uid: "date", sortable: true },
  { name: "Контрагент", uid: "group", sortable: true },
  { name: "Тип операции", uid: "type", sortable: true },
  { name: "Поступило/Списано", uid: "docs", sortable: true },
  { name: "В налоге УСН, смн", uid: "taxes", sortable: true },
];

export const tabs = {
  all: 'Все операции',
  all_product: 'All',
  secondTab: 'Поступления',
  thirdTab: 'Списания',
}

type ItemType = {
  id: number;
  date: string;
  group: string;
  docs: string;
  type: {
    docs: string;
    title: string;
    link?: string; // Добавил вопросительный знак, так как в вашем первом объекте свойство link не присутствует
  };
  typeCheck: string;
  taxes: string;
};

export const users: ItemType[] = [
  {
    id: 1,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    docs: 'Поступления',
    type: {
      docs: 'Оплата товаров и услуг клиентами',
      title: 'Связать с документом',
      link: 'https://www.instagram.com/_niggafood/?hl=ru',
    },
    typeCheck: '+10000',
    taxes: '10000'
  },
  {
    id: 2,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    docs: 'Списания',
    type: {
      docs: 'Уплата налогов в 2022 году и ранее',
      title: 'Авансовый платёж по налогу УСН за 2020 год'
    },
    typeCheck: '-3000',
    taxes: ''
  },
  {
    id: 3,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    docs: 'Поступления',
    type: {
      docs: 'Оплата товаров и услуг клиентами',
      title: 'Связать с документом',
      link: 'https://www.instagram.com/_niggafood/?hl=ru',
    },
    typeCheck: '+10000',
    taxes: ''
  },
  {
    id: 4,
    date: "20.01.2024",
    group: `ООО “ТЕЗ”`,
    docs: 'Списания',
    type: {
      docs: 'Уплата налогов в 2022 году и ранее',
      title: 'Авансовый платёж по налогу УСН за 2020 год'
    },
    typeCheck: '-3000',
    taxes: '3000'
  },
];

