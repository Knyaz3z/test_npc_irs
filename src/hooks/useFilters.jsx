import {useCallback, useMemo, useState} from 'react';

const useFilters = (initialFilters) => {
    const [filters, setFilters] = useState(initialFilters);

    const updateFilter = useCallback((field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                value: value
            }
        }));
    }, []);

    const clearFilter = useCallback((field) => {
        setFilters(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                value: ''
            }
        }));
    }, []);

    const clearAllFilters = useCallback(() => {
        const clearedFilters = {};
        Object.keys(filters).forEach(key => {
            clearedFilters[key] = {...filters[key], value: ''};
        });
        setFilters(clearedFilters);
    }, [filters]);

    const hasActiveFilters = useMemo(() => {
        return Object.values(filters).some(filter => filter.value && filter.value !== '');
    }, [filters]);

    return {
        filters,
        updateFilter,
        clearFilter,
        clearAllFilters,
        hasActiveFilters
    };
};

export default useFilters;