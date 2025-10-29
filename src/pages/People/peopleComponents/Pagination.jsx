// Компонент пагинации
import {useMemo} from 'react';
import {MAX_VISIBLE_PAGES, SIDE_PAGES} from '../data/constants';

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange,
                        onNext,
                        onPrev
                    }) => {
    const pageNumbers = useMemo(() => {
        if (totalPages <= MAX_VISIBLE_PAGES) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }

        const pages = [1];
        const startPage = Math.max(2, currentPage - SIDE_PAGES);
        const endPage = Math.min(totalPages - 1, currentPage + SIDE_PAGES);

        if (startPage > 2) pages.push('...');
        for (let i = startPage; i <= endPage; i++) pages.push(i);
        if (endPage < totalPages - 1) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <div className="people__pagination">
            <button
                className="people__pagination-btn people__pagination-btn--prev"
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                ← Назад
            </button>

            <div className="people__pagination-pages">
                {pageNumbers.map((page, index) => (
                    <button
                        key={`${page}-${index}`}
                        className={`people__pagination-page ${
                            page === currentPage ? 'people__pagination-page--active' : ''
                        } ${page === '...' ? 'people__pagination-page--ellipsis' : ''}`}
                        onClick={() => onPageChange(page)}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className="people__pagination-btn people__pagination-btn--next"
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                Вперед →
            </button>
        </div>
    );
};

export default Pagination