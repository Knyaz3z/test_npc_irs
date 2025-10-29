import './People.scss';
import people from '../../data/people';
import usePagination from '../../hooks/usePagination';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import Pagination from './peopleComponents/Pagination';
import {ITEMS_PER_PAGE, tableColumns} from './data/constants';
import ResultsInfo from './peopleComponents/ResultsInfo';
import PeopleTable from './peopleComponents/PeopleTable';


// Основной компонент
function People() {
    const {
        searchValue,
        filteredData,
        filters,
        updateFilter,
        clearFilter,
        clearAllFilters,
        hasActiveFilters,
        handleSearchChange
    } = useSearchAndFilter(people);

    const {
        currentPage,
        currentItems,
        totalPages,
        indexOfFirstItem,
        indexOfLastItem,
        totalItems,
        goToPage,
        nextPage,
        prevPage
    } = usePagination(filteredData, ITEMS_PER_PAGE);



    return (
        <div className="people">
            <input
                onChange={handleSearchChange}
                value={searchValue}
                className="people__search"
                type="text"
                placeholder="Поиск по всем полям..."
            />

            <ResultsInfo
                showFrom={indexOfFirstItem + 1}
                showTo={Math.min(indexOfLastItem, totalItems)}
                total={totalItems}
                currentPage={currentPage}
                totalPages={totalPages}
                searchValue={searchValue}
                filteredCount={filteredData.length}
                hasActiveFilters={hasActiveFilters}
                onClearAllFilters={clearAllFilters}
            />

            {currentItems.length > 0 ? (
                <PeopleTable
                    people={currentItems}
                    columns={tableColumns}
                    filters={filters}
                    onFilterChange={updateFilter}
                    onFilterClear={clearFilter}
                    isFound={true}
                />
            ) : (
                <PeopleTable
                    people={currentItems}
                    columns={tableColumns}
                    filters={filters}
                    onFilterChange={updateFilter}
                    onFilterClear={clearFilter}
                    isFound={false}
                />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
            />
        </div>
    );
}

export default People;