

export const columns = [
  { name: "Контрагент", uid: "group", sortable: true },
  { name: "Документы", uid: "docs", sortable: true },
  { name: "Статус", uid: "status", sortable: true },
  { name: "Сумма, смн", uid: "summa", sortable: true },
];

export const tabs = {
  all: 'Все документы',
  all_product: 'All',
  secondTab: 'outgoing',
  thirdTab: 'income',
}

export const valueChangeYellow = {
  value: [
    "text-[#FFB904]",
  ],
};

export const valueChangeGrey = {
  value: [
    "text-[#5C5C5C]"
  ],
};

type ItemType = {
  id: number;
  group: string;
  type: string,
  docs?: {
    titleDoc: string;
    titleDocType: string;
    titlePrice: string;
    titlePriceType: string;
  };
  status: {
    SignDoc: [
      { txt: string },
      { txt: string },
      { txt: string },
    ],
    SignDocPay: [
      { txt: string },
      { txt: string },
      { txt: string },
      { txt: string },
    ]
  }
  summa: {
    sumHave: string;
    allLimit: string;
  };
};

export const users: ItemType[] = [
  {
    id: 1,
    group: `ООО “ТЕЗ”`,
    type: 'Исходящие',
    docs: {
      titleDoc: 'Накладная №45 от 16.01.2024',
      titleDocType: 'Накладная',
      titlePrice: 'Связать с документом',
      titlePriceType: 'Счет'
    },
    status: {
      SignDoc: [
        { txt: 'Подписание документов' },
        { txt: 'Подписание документов' },
        { txt: 'Подписание документов' },
      ],
      SignDocPay: [
        { txt: 'Не подписан' },
        { txt: 'Не оплачен' },
        { txt: 'Подписан' },
        { txt: 'Оплачен' },
      ]
    },
    summa: {
      sumHave: '10 000,00',
      allLimit: '10 000,00'
    }
  },
  {
    id: 2,
    group: `ООО “ТЕЗ”`,
    type: 'Входящие',
    docs: {
      titleDoc: 'Счёт №25 от 20.01.2024',
      titleDocType: 'Счет',
      titlePrice: 'Акт №6 от 15.01.2024',
      titlePriceType: 'Акт'
    },
    status: {
      SignDoc: [
        { txt: 'Подписание документов' },
        { txt: 'Подписание документов' },
        { txt: 'Подписание документов' },
      ],
      SignDocPay: [
        { txt: 'Не подписан' },
        { txt: 'Не оплачен' },
        { txt: 'Подписан' },
        { txt: 'Оплачен' },
      ]
    },
    summa: {
      sumHave: '0',
      allLimit: '10 000,00'
    }
  },
];

