// Компонент таблицы с фильтрами
import {Link} from 'react-router';
import {useCallback} from 'react';
import FilterInput from './FilterInput';
import FILTER_TYPES from '../data/filtersTypes';

const PeopleTable = ({
                         people,
                         columns,
                         filters,
                         onFilterChange,
                         onFilterClear,
                         isFound
                     }) => {
    // Получаем уникальные значения для селектов
    const getSelectOptions = useCallback((field) => {
        const uniqueValues = [...new Set(people.map(person => person[field]))];
        return uniqueValues.map(value => ({
            value: value,
            label: value
        }));
    }, [people]);

    return (
        <>
            <div className="people__header">
                {columns.map(column => (
                    <div key={column.key}
                         className="people__cell people__cell--header">
                        <div className="people__header-content">
                            {column.label}
                            {column.filterable !== false && (
                                <FilterInput
                                    filter={filters[column.key]}
                                    value={filters[column.key]?.value || ''}
                                    onChange={(value) => onFilterChange(column.key, value)}
                                    onClear={() => onFilterClear(column.key)}
                                    options={column.filterType === FILTER_TYPES.SELECT ? getSelectOptions(column.key) : undefined}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {
                isFound ? (
                    <div className="people__body">
                        {people.map((person) => (
                            <Link to={`/card/${person.id}`}
                                  className="people__row"
                                  key={person.id}>
                                {columns.map(column => (
                                    <div key={column.key}
                                         className="people__cell">
                                        {column.render ? column.render(person) : person[column.key]}
                                    </div>
                                ))}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="people__body">
                        Ничего не найдено
                    </div>
                )
            }

        </>
    );
};

export default PeopleTable