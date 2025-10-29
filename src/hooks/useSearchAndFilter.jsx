// Кастомный хук для поиска и фильтрации
import {useCallback, useMemo, useState} from 'react';
import useFilters from './useFilters';
import FILTER_TYPES from '../pages/People/data/filtersTypes';


const useSearchAndFilter = (data) => {
    const [searchValue, setSearchValue] = useState('');

    // Вспомогательные функции
    const normalizeString = (value) => String(value || '').toLowerCase().trim();

    const searchInPerson = (person, searchTerm) => {
        const normalizedSearch = searchTerm.toLowerCase();

        return [
            person.name,
            person.surname,
            String(person.age),
            person.birthDate,
            person.sex,
            person.children ? 'есть' : 'нет'
        ].some(field => normalizeString(field).includes(normalizedSearch));
    };

    const applyFilters = (data, filters) => {
        return data.filter(person => {
            return Object.entries(filters).every(([field, filter]) => {
                if (!filter.value || filter.value === '') return true;

                const personValue = person[field];

                switch (filter.type) {
                    case FILTER_TYPES.TEXT:
                        return normalizeString(personValue).includes(normalizeString(filter.value));

                    case FILTER_TYPES.SELECT:
                        return normalizeString(personValue) === normalizeString(filter.value);

                    case FILTER_TYPES.BOOLEAN:
                        if (filter.value === 'true') return personValue === true;
                        if (filter.value === 'false') return personValue === false;
                        return true;

                    case FILTER_TYPES.NUMBER:
                        return String(personValue) === String(filter.value);

                    default:
                        return true;
                }
            });
        });
    };


    const initialFilters = useMemo(() => ({
        id: {type: FILTER_TYPES.NUMBER, value: ''},
        name: {type: FILTER_TYPES.TEXT, value: ''},
        surname: {type: FILTER_TYPES.TEXT, value: ''},
        age: {type: FILTER_TYPES.NUMBER, value: ''},
        birthDate: {type: FILTER_TYPES.TEXT, value: ''},
        sex: {type: FILTER_TYPES.SELECT, value: ''},
        children: {type: FILTER_TYPES.BOOLEAN, value: ''}
    }), []);

    const {
        filters,
        updateFilter,
        clearFilter,
        clearAllFilters,
        hasActiveFilters
    } = useFilters(initialFilters);

    const filteredData = useMemo(() => {
        let result = data;

        // Применяем глобальный поиск
        if (searchValue.trim()) {
            result = result.filter(person => searchInPerson(person, searchValue));
        }

        // Применяем фильтры по колонкам
        if (hasActiveFilters) {
            result = applyFilters(result, filters);
        }

        return result;
    }, [data, searchValue, filters, hasActiveFilters]);

    const handleSearchChange = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);

    return {
        searchValue,
        setSearchValue,
        filteredData,
        filters,
        updateFilter,
        clearFilter,
        clearAllFilters,
        hasActiveFilters,
        handleSearchChange
    };
};

export default useSearchAndFilter