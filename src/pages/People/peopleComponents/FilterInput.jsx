import FILTER_TYPES from '../data/filtersTypes';

const FilterInput = ({filter, value, onChange, onClear, options}) => {
    const renderInput = () => {
        switch (filter.type) {
            case FILTER_TYPES.SELECT:
                return (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="people__filter-select"
                    >
                        <option value="">Все</option>
                        {options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case FILTER_TYPES.BOOLEAN:
                return (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="people__filter-select"
                    >
                        <option value="">Все</option>
                        <option value="true">Есть</option>
                        <option value="false">Нет</option>
                    </select>
                );

            case FILTER_TYPES.NUMBER:
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onClear={onClear}
                        className="people__filter-input"
                        placeholder="Фильтр..."
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onClear={onClear}
                        className="people__filter-input"
                        placeholder="Фильтр..."
                    />
                );
        }
    };

    return (
        <div className="people__filter-wrapper">
            {renderInput()}
            {value && (
                <button
                    className="people__filter-clear"
                    onClick={onClear}
                    title="Очистить фильтр"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default FilterInput