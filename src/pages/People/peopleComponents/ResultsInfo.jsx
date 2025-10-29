// Компонент информации о результатах
const ResultsInfo = ({
                         showFrom,
                         showTo,
                         total,
                         currentPage,
                         totalPages,
                         searchValue,
                         filteredCount,
                         hasActiveFilters,
                         onClearAllFilters
                     }) => {
    // if (total === 0) {
    //     return (
    //         <div className="people__info">
    //             {searchValue || hasActiveFilters ? 'По вашему запросу ничего не найдено' : 'Нет данных для отображения'}
    //         </div>
    //     );
    // }

    return (
        <>
            {(searchValue || hasActiveFilters) && (
                <div className="people__search-info">
                    Найдено записей: {filteredCount}
                    {hasActiveFilters && (
                        <button
                            className="people__clear-all-filters"
                            onClick={onClearAllFilters}
                        >
                            Очистить все фильтры
                        </button>
                    )}
                </div>
            )}
            <div className="people__info">
                Показано {showFrom}-{showTo} из {total} записей
                {totalPages > 1 && ` (Страница ${currentPage} из ${totalPages})`}
            </div>
        </>
    );
};

export default ResultsInfo