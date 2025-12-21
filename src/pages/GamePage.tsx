import React, { useState } from 'react'
import ImageSlider from '../components/ImageSlider'
import './GamePage.scss'
import passPropImg from '../assets/passProp.png'
import passportImg from '../assets/passport.png'
import documentImg from '../assets/document.png'
import cnils from '../assets/cnils.png'

interface GamePageProps {
    onBack: () => void
}

const GamePage: React.FC<GamePageProps> = ({ onBack }) => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [formData, setFormData] = useState({
        fio: '',
        snils: '',
        citizenship: '',
        address: '',
        experience: '',
        document: '',
        series: '',
        issueDate: '',
        birthDate: '',
        birthPlace: '',
        gender: ''
    })

    const [errors, setErrors] = useState<Record<string, boolean>>({})
    const [isMaleChecked, setIsMaleChecked] = useState(false)
    const [isFemaleChecked, setIsFemaleChecked] = useState(false)

    const sliderImages = [
        passportImg,
        passPropImg,
        cnils,
        documentImg,
    ]

    const correctAnswers = {
        fio: 'ЮСУПОВ АЛЕКСАНДР ВАЛЕРЬЕВИЧ',
        snils: '241-379-422 89',
        citizenship: 'Российская Федерация',
        address: 'УДМУРТСКАЯ РЕСПУБЛИКА Г.ВОТКИНСК УЛ.1МАЯ 26',
        experience: '43',
        document: 'паспорт',
        series: '2200 997631',
        issueDate: '27.12.1976',
        birthDate: '12.12.1960',
        birthPlace: 'Г.ГОРЬКИЙ',
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: false }))
    }

    const handleGenderClick = (gender: 'male' | 'female') => {
        if (gender === 'male') {
            setIsMaleChecked(true)
            setIsFemaleChecked(false)
            setFormData(prev => ({ ...prev, gender: 'male' }))
        } else {
            setIsMaleChecked(false)
            setIsFemaleChecked(true)
            setFormData(prev => ({ ...prev, gender: 'female' }))
        }
        setErrors(prev => ({ ...prev, gender: false }))
    }

    const handleCheckAnswers = () => {
        const newErrors: Record<string, boolean> = {}

        Object.keys(correctAnswers).forEach(field => {
            const userValue = formData[field as keyof typeof formData]
            const correctValue = correctAnswers[field as keyof typeof correctAnswers]

            if (userValue.trim().toUpperCase() !== correctValue.toUpperCase()) {
                newErrors[field] = true
            }
        })

        if (!isMaleChecked || isFemaleChecked) {
            newErrors.gender = true
        }

        setErrors(newErrors)

        const allCorrect = Object.keys(newErrors).length === 0

        if (allCorrect) {
            setShowSuccess(true)
        }
    }

    const resetForm = () => {
        setFormData({
            fio: '',
            snils: '',
            citizenship: '',
            address: '',
            experience: '',
            document: '',
            series: '',
            issueDate: '',
            birthDate: '',
            birthPlace: '',
            gender: ''
        })
        setIsMaleChecked(false)
        setIsFemaleChecked(false)
        setErrors({})
    }

    return (
        <div className="game-page">
            <div className="container">
                <header className="game-header">
                    <button className="back-button" onClick={onBack} title="Вернуться назад">
                        ←
                    </button>
                    <h1>Заполните заявление</h1>
                    <div className="hint">
                        Изучите документы и заполните пропуски в форме
                    </div>
                </header>

                <main className="game-content">
                    <div className="slider-section">
                        <ImageSlider images={sliderImages} />
                    </div>

                    <div className="form-section">
                        <div className="application-form">
                            <div className="form-container">
                                <div className="form-header">
                                    <h2>ЗАЯВЛЕНИЕ</h2>
                                    <h3>О НАЗНАЧЕНИИ ПЕНСИИ (ПЕРЕВОДЕ С ОДНОЙ ПЕНСИИ НА ДРУГУЮ)</h3>
                                </div>

                                <div className="form-body">
                                    {/* ФИО с инструкцией в одной строке */}
                                    <div className="form-row">
                                        <div className="form-field-group">
                                            <div className="form-label">
                                                Фамилия, имя, отчество (при наличии)
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.fio}
                                                onChange={(e) => handleInputChange('fio', e.target.value)}
                                                className={`form-input ${errors.fio ? 'error' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* СНИЛС */}
                                    <div className="form-row">
                                        <div className="form-field-group">
                                            <div className="form-label">
                                                Страховой номер индивидуального лицевого счета
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.snils}
                                                onChange={(e) => handleInputChange('snils', e.target.value)}
                                                className={`form-input ${errors.snils ? 'error' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Гражданство */}
                                    <div className="form-row">
                                        <div className="form-field-group">
                                            <div className="form-label">
                                                Принадлежность к гражданству
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.citizenship}
                                                onChange={(e) => handleInputChange('citizenship', e.target.value)}
                                                className={`form-input ${errors.citizenship ? 'error' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Адрес */}
                                    <div className="form-row">
                                        <div className="form-field-group">
                                            <div className="form-label">
                                                Адрес регистрации
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className={`form-input ${errors.address ? 'error' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Стаж */}
                                    <div className="form-row">
                                        <div className="form-field-group">
                                            <div className="form-label">
                                                Стаж работы
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.experience}
                                                onChange={(e) => handleInputChange('experience', e.target.value)}
                                                className={`form-input ${errors.experience ? 'error' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Документ */}
                                    <div className="document-block">
                                        <div className="form-row">
                                            <div className="form-field-group">
                                                <div className="form-label">
                                                    Наименование документа, <br/> удостоверяющего личность
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.document}
                                                    onChange={(e) => handleInputChange('document', e.target.value)}
                                                    className={`form-input ${errors.document ? 'error' : ''}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Серия и номер + Дата выдачи в одной строке */}
                                        <div className="form-row">
                                            <div className="two-columns">
                                                <div className="form-field-group">
                                                    <div className="form-label">
                                                        Серия, номер
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={formData.series}
                                                        onChange={(e) => handleInputChange('series', e.target.value)}
                                                        className={`form-input ${errors.series ? 'error' : ''}`}
                                                    />
                                                </div>
                                                <div className="form-field-group">
                                                    <div className="form-label">
                                                        Дата выдачи
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={formData.issueDate}
                                                        onChange={(e) => handleInputChange('issueDate', e.target.value)}
                                                        className={`form-input ${errors.issueDate ? 'error' : ''}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Дата рождения */}
                                        <div className="form-row">
                                            <div className="form-field-group">
                                                <div className="form-label">
                                                    Дата рождения
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.birthDate}
                                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                                    className={`form-input ${errors.birthDate ? 'error' : ''}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Место рождения */}
                                        <div className="form-row">
                                            <div className="form-field-group">
                                                <div className="form-label">
                                                    Место рождения
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.birthPlace}
                                                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                                                    className={`form-input ${errors.birthPlace ? 'error' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Выбор пола */}
                                    <div className="form-row">
                                        <div className="form-field-group">
                                            <div className="form-label">
                                                пол (сделать отметку в соответствующем квадрате):
                                            </div>
                                            <div className="gender-options">
                                                <div className="gender-option">
                                                    <div
                                                        className={`gender-checkbox ${isMaleChecked ? 'checked' : ''} ${errors.gender ? 'error' : ''}`}
                                                        onClick={() => handleGenderClick('male')}
                                                    >
                                                        {isMaleChecked && '✓'}
                                                    </div>
                                                    <span className="gender-text">муж.</span>
                                                </div>
                                                <div className="gender-option">
                                                    <div
                                                        className={`gender-checkbox ${isFemaleChecked ? 'checked' : ''} ${errors.gender ? 'error' : ''}`}
                                                        onClick={() => handleGenderClick('female')}
                                                    >
                                                        {isFemaleChecked && '✓'}
                                                    </div>
                                                    <span className="gender-text">жен.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-buttons">
                                    <button className="check-button" onClick={handleCheckAnswers}>
                                        Проверить ответы
                                    </button>
                                    <button className="reset-button" onClick={resetForm}>
                                        Сбросить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {showSuccess && (
                    <div className="success-overlay">
                        <div className="success-modal">
                            <div className="success-icon">✓</div>
                            <h2>Поздравляем!</h2>
                            <p>Вы правильно заполнили все поля заявления!</p>
                            <button
                                className="continue-button"
                                onClick={() => setShowSuccess(false)}
                            >
                                Продолжить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GamePage