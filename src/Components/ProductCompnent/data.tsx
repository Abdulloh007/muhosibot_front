

export const columns = [
{name: "Товар/Услуга", uid: "name", sortable: true},
{name: "Группа", uid: "group", sortable: true},
{name: "Артикул", uid: "articul", sortable: true},
{name: "Остаток", uid: "remain"},
{name: "Ед.измерения/Ставка", uid: "oneTip"},
];

export const tabs = {
    all: 'Все Товары',
    all_product: 'All',
    secondTab: 'Товары',
    thirdTab: 'Услуги',
}


export const users = [
{
    id: 1,
    name: "Зерно",
    group: "Зерновые",
    articul: "N/H",
    remain: '577',
    oneTip: 'тонн',
    type: 'Товары'
},
{
    id: 2,
    name: "Хранение",
    group: "Сырьё",
    articul: "#В005",
    remain: '',
    oneTip: 'Мес',
    type: 'Услуги'
},
{
    id: 3,
    name: "Зерно",
    group: "Зерновые",
    articul: "N/H",
    remain: '577',
    oneTip: 'тонн',
    type: 'Товары'
},
{
    id: 4,
    name: "Хранение",
    group: "Сырьё",
    articul: "#В005",
    remain: '',
    oneTip: 'Мес',
    type: 'Услуги'
},
{
    id: 4,
    name: "Хранение",
    group: "Сырьё",
    articul: "#В005",
    remain: '',
    oneTip: 'Мес',
    type: 'Услуги',
    docs: [
        {
            title: "",
            link: ""
        }
    ]
},
];
