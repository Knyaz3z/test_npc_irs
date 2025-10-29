import './Card.scss'
import people from '../../data/people';
import {useParams} from 'react-router';
import {useState} from 'react';

function Card() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('personal');

    if (!id) {
        return <div className="card card--error">ID не указан в URL</div>;
    }

    const currentPerson = people.find((p) => p.id === parseInt(id));

    if (!currentPerson) {
        return <div className="card card--error">Человек с ID {id} не найден</div>;
    }

    // Вспомогательные функции
    const calculateBirthYear = () => {
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(currentPerson.age);
    };

    const generateEmail = () => {
        return `${currentPerson.name.toLowerCase()}.${currentPerson.surname.toLowerCase()}@company.com`;
    };

    const generatePhone = () => {
        return `+7 (${900 + currentPerson.id % 100}) ${100 + currentPerson.id % 900}-${1000 + currentPerson.id % 9000}`;
    };

    const getAgeCategory = () => {
        const age = parseInt(currentPerson.age);
        if (age <= 25) return 'Молодой специалист';
        if (age <= 35) return 'Специалист';
        if (age <= 45) return 'Опытный специалист';
        return 'Эксперт';
    };

    // Вкладки
    const tabs = [
        { id: 'personal', label: 'Личная информация' },
        { id: 'work', label: 'Рабочая информация' },
        { id: 'contacts', label: 'Контакты' },
        { id: 'additional', label: 'Дополнительно' }
    ];

    // Рендер контента в зависимости от активной вкладки
    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <div className="card__info-grid">
                        <div className="card__info-item">
                            <span className="card__label">Полное имя:</span>
                            <span className="card__value">{currentPerson.name} {currentPerson.surname}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Дата рождения:</span>
                            <span className="card__value">{currentPerson.birthDate}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Возраст:</span>
                            <span className="card__value">{currentPerson.age} лет</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Пол:</span>
                            <span className="card__value">{currentPerson.sex}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Наличие детей:</span>
                            <span className={`card__value card__value--${currentPerson.children ? 'yes' : 'no'}`}>
                                {currentPerson.children ? 'Есть' : 'Нет'}
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Возрастная категория:</span>
                            <span className="card__value">{getAgeCategory()}</span>
                        </div>
                    </div>
                );

            case 'work':
                return (
                    <div className="card__info-grid">
                        <div className="card__info-item">
                            <span className="card__label">ID сотрудника:</span>
                            <span className="card__value card__value--id">{currentPerson.id}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Должность:</span>
                            <span className="card__value">
                                {currentPerson.sex === 'Муж' ? 'Старший специалист' : 'Специалист'}
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Отдел:</span>
                            <span className="card__value">
                                {parseInt(currentPerson.age) > 40 ? 'Опытных специалистов' : 'Молодых специалистов'}
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Статус:</span>
                            <span className="card__value card__value--yes">Активен</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Дата найма:</span>
                            <span className="card__value">01.01.{calculateBirthYear() + 22}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Опыт работы:</span>
                            <span className="card__value">
                                {Math.max(1, parseInt(currentPerson.age) - 22)} лет
                            </span>
                        </div>
                    </div>
                );

            case 'contacts':
                return (
                    <div className="card__info-grid">
                        <div className="card__info-item">
                            <span className="card__label">Email:</span>
                            <span className="card__value card__value--email">
                                {generateEmail()}
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Рабочий телефон:</span>
                            <span className="card__value">{generatePhone()}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Мобильный телефон:</span>
                            <span className="card__value">{generatePhone().replace('900', '915')}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Кабинет:</span>
                            <span className="card__value">№{300 + currentPerson.id}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Этаж:</span>
                            <span className="card__value">{2 + (currentPerson.id % 3)}</span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">График работы:</span>
                            <span className="card__value">9:00 - 18:00</span>
                        </div>
                    </div>
                );

            case 'additional':
                return (
                    <div className="card__info-grid">
                        <div className="card__info-item">
                            <span className="card__label">Уровень доступа:</span>
                            <span className="card__value">
                                {currentPerson.id % 3 === 0 ? 'Администратор' :
                                    currentPerson.id % 3 === 1 ? 'Модератор' : 'Пользователь'}
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Проекты:</span>
                            <span className="card__value">
                                {currentPerson.id % 4 + 2} активных
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Отпуск:</span>
                            <span className="card__value">
                                {28 - (currentPerson.id % 10)} дней осталось
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Больничные:</span>
                            <span className="card__value">
                                {currentPerson.id % 5} дней в этом году
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Премия:</span>
                            <span className="card__value card__value--yes">
                                {currentPerson.children ? '15%' : '10%'}
                            </span>
                        </div>

                        <div className="card__info-item">
                            <span className="card__label">Статус HR:</span>
                            <span className="card__value card__value--yes">Проверен</span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="card">
            <div className="card__header">
                <h1 className="card__title">Карточка сотрудника</h1>
            </div>

            <div className="card__content">
                {/* Блок с фото и основной информацией */}
                <div className="card__photo-section">
                    <div className="card__photo-placeholder">
                        <span className="card__photo-text">Фото</span>
                    </div>
                    <div className="card__basic-info">
                        <h2 className="card__name">{currentPerson.name} {currentPerson.surname}</h2>
                        <p className="card__age">Возраст: {currentPerson.age} лет</p>
                        <p className="card__id">ID: {currentPerson.id}</p>
                        <p className="card__position">{getAgeCategory()}</p>
                    </div>
                </div>

                {/* Навигация по вкладкам */}
                <div className="card__tabs">
                    <div className="card__tabs-nav">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`card__tab-button ${activeTab === tab.id ? 'card__tab-button--active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Контент вкладок */}
                    <div className="card__tabs-content">
                        <div className="card__details">
                            <h3 className="card__subtitle">{tabs.find(tab => tab.id === activeTab)?.label}</h3>
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;