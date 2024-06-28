

export const columns = [
{name: "Название", uid: "full_name", sortable: true},
{name: "Группа", uid: "category", sortable: true},
// {name: "Неоплаченные", uid: "type", sortable: true},
];

export const tabs = {
    all: 'Все Контрагенты',
    secondTab: 'Активные',
    thirdTab: 'В архиве',
}


export const users = [
    {
        id: 1,
        name: `ООО “Мегасток”`,
        group: "Зерновые",
        type: '1 счет на 900 смн',
        typeFilter: 'Активные'
    },
    {
        id: 2,
        name: `ООО "Материк"`,
        group: "Без группы",
        type: 'Нет',
        typeFilter: 'В архиве'
    },
    {
        id: 3,
        name: `OOO "Железобетон"`,
        group: "Без группы",
        type: 'Нет',
        typeFilter: 'Активные'
    },
    {
        id: 4,
        name: `OOO "Мегасток"`,
        group: "Без группы",
        type: 'Нет',
        typeFilter: 'В архиве'
    },
];
