

export const columns = [
{name: "Название", uid: "name", sortable: true},
{name: "Группа", uid: "group", sortable: true},
{name: "Неоплаченные", uid: "type", sortable: true},
];

export const tabs = {
    all: 'ДДС',
    secondTab: 'Поступления',
    thirdTab: 'Списания',
}

export const TabClassActive = 'bg-purpleLg p-[10px] font-semibold text-[14px] text-white min-w-0'
export const TabClassDefault = 'bg-transparent p-[10px] font-md text-[14px] text-[#4D89FF] min-w-0'


export const users = [
    {
        id: 1,
        name: `ООО “Мегасток”`,
        group: "Зерновые",
        type: '1 счет на 900 смн'
    },
    {
        id: 2,
        name: `ООО "Материк"`,
        group: "Без группы",
        type: 'Нет'
    },
    {
        id: 3,
        name: `OOO "Железобетон"`,
        group: "Без группы",
        type: 'Нет'
    },
    {
        id: 4,
        name: `OOO "Мегасток"`,
        group: "Без группы",
        type: 'Нет'
    },
];
