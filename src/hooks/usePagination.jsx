// Кастомный хук для пагинации
import {useCallback, useEffect, useMemo, useState} from 'react';

const calculatePagination = (data, currentPage, itemsPerPage) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return {
        totalPages,
        currentItems,
        indexOfFirstItem,
        indexOfLastItem,
        totalItems
    };
};

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const paginationData = useMemo(() =>
            calculatePagination(data, currentPage, itemsPerPage),
        [data, currentPage, itemsPerPage]
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const goToPage = useCallback((pageNumber) => {
        if (typeof pageNumber === 'number' && pageNumber >= 1 && pageNumber <= paginationData.totalPages) {
            setCurrentPage(pageNumber);
        }
    }, [paginationData.totalPages]);

    const nextPage = useCallback(() => {
        if (currentPage < paginationData.totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }, [currentPage, paginationData.totalPages]);

    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }, [currentPage]);

    return {
        currentPage,
        setCurrentPage,
        goToPage,
        nextPage,
        prevPage,
        ...paginationData
    };
};

export default usePagination