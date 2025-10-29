import {useMemo} from 'react';
import './Dashboard.scss';

// Простые компоненты для визуализации
const StatCard = ({ title, value, subtitle, color = '#007bff' }) => (
    <div className="dashboard__stat-card" style={{ borderLeftColor: color }}>
        <div className="dashboard__stat-value">{value}</div>
        <div className="dashboard__stat-title">{title}</div>
        {subtitle && <div className="dashboard__stat-subtitle">{subtitle}</div>}
    </div>
);

const SimpleBarChart = ({ data, title }) => (
    <div className="dashboard__chart">
        <h3 className="dashboard__chart-title">{title}</h3>
        <div className="dashboard__bars">
            {data.map((item, index) => (
                <div key={index} className="dashboard__bar-item">
                    <div className="dashboard__bar-label">{item.label}</div>
                    <div className="dashboard__bar-track">
                        <div
                            className="dashboard__bar-fill"
                            style={{
                                width: `${item.percentage}%`,
                                backgroundColor: item.color
                            }}
                        ></div>
                    </div>
                    <div className="dashboard__bar-value">{item.value}</div>
                </div>
            ))}
        </div>
    </div>
);

// Компоненты для конкретных данных
const GenderChart = ({ people }) => {
    const genderData = useMemo(() => {
        const maleCount = people.filter(person => person.sex === 'Муж').length;
        const femaleCount = people.filter(person => person.sex === 'Жен').length;
        const total = people.length;

        return [
            {
                label: 'Мужчины',
                value: maleCount,
                percentage: total > 0 ? (maleCount / total) * 100 : 0,
                color: '#007bff'
            },
            {
                label: 'Женщины',
                value: femaleCount,
                percentage: total > 0 ? (femaleCount / total) * 100 : 0,
                color: '#e83e8c'
            }
        ];
    }, [people]);

    return <SimpleBarChart data={genderData} title="Распределение по полу" />;
};

const AgeDistributionChart = ({ people }) => {
    const ageData = useMemo(() => {
        const groups = {
            '18-25': 0,
            '26-35': 0,
            '36-45': 0,
            '46+': 0
        };

        people.forEach(person => {
            const age = parseInt(person.age);
            if (age >= 18 && age <= 25) groups['18-25']++;
            else if (age <= 35) groups['26-35']++;
            else if (age <= 45) groups['36-45']++;
            else groups['46+']++;
        });

        const total = people.length;
        return Object.entries(groups)
            .filter(([, value]) => value > 0)
            .map(([label, value]) => ({
                label,
                value,
                percentage: total > 0 ? (value / total) * 100 : 0,
                color: '#28a745'
            }));
    }, [people]);

    return <SimpleBarChart data={ageData} title="Распределение по возрастам" />;
};

const ChildrenChart = ({ people }) => {
    const childrenData = useMemo(() => {
        const withChildren = people.filter(person => person.children).length;
        const withoutChildren = people.length - withChildren;
        const total = people.length;

        return [
            {
                label: 'С детьми',
                value: withChildren,
                percentage: total > 0 ? (withChildren / total) * 100 : 0,
                color: '#dc3545'
            },
            {
                label: 'Без детей',
                value: withoutChildren,
                percentage: total > 0 ? (withoutChildren / total) * 100 : 0,
                color: '#20c997'
            }
        ];
    }, [people]);

    return <SimpleBarChart data={childrenData} title="Наличие детей" />;
};

const ChildrenByGenderChart = ({ people }) => {
    const childrenByGenderData = useMemo(() => {
        const maleWithChildren = people.filter(person => person.sex === 'Муж' && person.children).length;
        const maleWithoutChildren = people.filter(person => person.sex === 'Муж' && !person.children).length;
        const femaleWithChildren = people.filter(person => person.sex === 'Жен' && person.children).length;
        const femaleWithoutChildren = people.filter(person => person.sex === 'Жен' && !person.children).length;

        return [
            {
                label: 'Мужчины с детьми',
                value: maleWithChildren,
                percentage: people.filter(p => p.sex === 'Муж').length > 0 ?
                    (maleWithChildren / people.filter(p => p.sex === 'Муж').length) * 100 : 0,
                color: '#0056b3'
            },
            {
                label: 'Мужчины без детей',
                value: maleWithoutChildren,
                percentage: people.filter(p => p.sex === 'Муж').length > 0 ?
                    (maleWithoutChildren / people.filter(p => p.sex === 'Муж').length) * 100 : 0,
                color: '#66b3ff'
            },
            {
                label: 'Женщины с детьми',
                value: femaleWithChildren,
                percentage: people.filter(p => p.sex === 'Жен').length > 0 ?
                    (femaleWithChildren / people.filter(p => p.sex === 'Жен').length) * 100 : 0,
                color: '#c2185b'
            },
            {
                label: 'Женщины без детей',
                value: femaleWithoutChildren,
                percentage: people.filter(p => p.sex === 'Жен').length > 0 ?
                    (femaleWithoutChildren / people.filter(p => p.sex === 'Жен').length) * 100 : 0,
                color: '#f8bbd0'
            }
        ].filter(item => item.value > 0);
    }, [people]);

    return <SimpleBarChart data={childrenByGenderData} title="Дети по полу" />;
};

function Dashboard({ people = [] }) {
    const stats = useMemo(() => {
        const total = people.length;

        // Подсчет по полу
        const maleCount = people.filter(person => person.sex === 'Муж').length;
        const femaleCount = people.filter(person => person.sex === 'Жен').length;

        // Подсчет детей
        const withChildren = people.filter(person => person.children).length;
        const withoutChildren = total - withChildren;

        // Статистика по возрасту
        const ages = people.map(person => parseInt(person.age));
        const averageAge = ages.length > 0 ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : 0;
        const minAge = ages.length > 0 ? Math.min(...ages) : 0;
        const maxAge = ages.length > 0 ? Math.max(...ages) : 0;

        // Дети по полу
        const maleWithChildren = people.filter(person => person.sex === 'Муж' && person.children).length;
        const femaleWithChildren = people.filter(person => person.sex === 'Жен' && person.children).length;

        // Проценты
        const malePercentage = total > 0 ? Math.round((maleCount / total) * 100) : 0;
        const femalePercentage = total > 0 ? Math.round((femaleCount / total) * 100) : 0;
        const childrenPercentage = total > 0 ? Math.round((withChildren / total) * 100) : 0;

        return {
            total,
            maleCount,
            femaleCount,
            withChildren,
            withoutChildren,
            averageAge,
            minAge,
            maxAge,
            maleWithChildren,
            femaleWithChildren,
            malePercentage,
            femalePercentage,
            childrenPercentage
        };
    }, [people]);

    // Самые популярные имена и фамилии
    const popularNames = useMemo(() => {
        const names = people.map(person => person.name);
        const nameCount = {};
        names.forEach(name => {
            nameCount[name] = (nameCount[name] || 0) + 1;
        });

        return Object.entries(nameCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }, [people]);

    const popularSurnames = useMemo(() => {
        const surnames = people.map(person => person.surname);
        const surnameCount = {};
        surnames.forEach(surname => {
            surnameCount[surname] = (surnameCount[surname] || 0) + 1;
        });

        return Object.entries(surnameCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }, [people]);

    if (people.length === 0) {
        return (
            <div className="dashboard">
                <h1 className="dashboard__title">Дашборд сотрудников</h1>
                <div className="dashboard__no-data">
                    Нет данных для отображения
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Дашборд сотрудников</h1>

            {/* Основная статистика */}
            <div className="dashboard__stats-grid">
                <StatCard
                    title="Всего сотрудников"
                    value={stats.total}
                    color="#007bff"
                />

                <StatCard
                    title="Мужчины"
                    value={stats.maleCount}
                    subtitle={`${stats.malePercentage}%`}
                    color="#0056b3"
                />

                <StatCard
                    title="Женщины"
                    value={stats.femaleCount}
                    subtitle={`${stats.femalePercentage}%`}
                    color="#e83e8c"
                />

                <StatCard
                    title="С детьми"
                    value={stats.withChildren}
                    subtitle={`${stats.childrenPercentage}%`}
                    color="#dc3545"
                />

                <StatCard
                    title="Средний возраст"
                    value={stats.averageAge}
                    subtitle="лет"
                    color="#28a745"
                />

                <StatCard
                    title="Возрастной диапазон"
                    value={`${stats.minAge}-${stats.maxAge}`}
                    subtitle="лет"
                    color="#fd7e14"
                />
            </div>

            {/* Основные графики */}
            <div className="dashboard__charts">
                <div className="dashboard__chart-column">
                    <GenderChart people={people} />
                </div>

                <div className="dashboard__chart-column">
                    <AgeDistributionChart people={people} />
                </div>

                <div className="dashboard__chart-column">
                    <ChildrenChart people={people} />
                </div>
            </div>

            {/* Дополнительные графики */}
            <div className="dashboard__charts">
                <div className="dashboard__chart-column">
                    <ChildrenByGenderChart people={people} />
                </div>
            </div>

            {/* Дополнительная статистика */}
            <div className="dashboard__additional-stats">
                <div className="dashboard__stat-section">
                    <h3>Детальная статистика по детям</h3>
                    <div className="dashboard__stat-details">
                        <div className="dashboard__stat-detail">
                            <span>Мужчин с детьми:</span>
                            <strong>{stats.maleWithChildren} ({stats.maleCount > 0 ? Math.round((stats.maleWithChildren / stats.maleCount) * 100) : 0}% мужчин)</strong>
                        </div>
                        <div className="dashboard__stat-detail">
                            <span>Женщин с детьми:</span>
                            <strong>{stats.femaleWithChildren} ({stats.femaleCount > 0 ? Math.round((stats.femaleWithChildren / stats.femaleCount) * 100) : 0}% женщин)</strong>
                        </div>
                        <div className="dashboard__stat-detail">
                            <span>Без детей:</span>
                            <strong>{stats.withoutChildren} ({100 - stats.childrenPercentage}%)</strong>
                        </div>
                    </div>
                </div>

                <div className="dashboard__stat-section">
                    <h3>Самые популярные имена</h3>
                    <div className="dashboard__popular-list">
                        {popularNames.map(([name, count]) => (
                            <div key={name} className="dashboard__popular-item">
                                <span>{name}</span>
                                <strong>{count}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard__stat-section">
                    <h3>Самые популярные фамилии</h3>
                    <div className="dashboard__popular-list">
                        {popularSurnames.map(([surname, count]) => (
                            <div key={surname} className="dashboard__popular-item">
                                <span>{surname}</span>
                                <strong>{count}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;