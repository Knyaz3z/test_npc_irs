// Константы
import FILTER_TYPES from './filtersTypes';

export const ITEMS_PER_PAGE = 5;
export const MAX_VISIBLE_PAGES = 7;
export const SIDE_PAGES = 2;

export const tableColumns = [
    {key: 'id', label: 'ID', filterType: FILTER_TYPES.NUMBER},
    {key: 'name', label: 'Имя', filterType: FILTER_TYPES.TEXT},
    {key: 'surname', label: 'Фамилия', filterType: FILTER_TYPES.TEXT},
    {key: 'age', label: 'Возраст', filterType: FILTER_TYPES.NUMBER},
    {
        key: 'birthDate',
        label: 'Дата рождения',
        filterType: FILTER_TYPES.TEXT
    },
    {key: 'sex', label: 'Пол', filterType: FILTER_TYPES.SELECT},
    {
        key: 'children',
        label: 'Дети',
        render: (person) => person.children ? 'Есть' : 'Нет',
        filterType: FILTER_TYPES.BOOLEAN
    }
];

