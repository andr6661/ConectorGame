import React, { useState, useEffect, useRef } from 'react'
import ImageSlider from '../components/ImageSlider'
import './GamePage.scss'
import passPropImg from '../assets/passProp.png'
import passportImg from '../assets/passport.png'
import documentImg from '../assets/document.png'
import cnils from '../assets/cnils.png'

interface GamePageProps {
    onBack: () => void
}

interface FormField {
    id: string
    correctValue: string
    userValue: string
    x: number
    y: number
    width: number
    height: number
    hasError?: boolean
}

interface CheckboxOption {
    id: string
    label: string
    value: string
    checked: boolean
    hasError?: boolean
    x: number
    y: number
    width: number
    height: number
}

const GamePage: React.FC<GamePageProps> = ({ onBack }) => {
    const [showSuccess, setShowSuccess] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)
    const [formSize, setFormSize] = useState({ width: 1200, height: 800 })

    const sliderImages = [
        passportImg,
        passPropImg,
        cnils,
        documentImg,
    ]

    // Координаты полей на фото
    const formFields: FormField[] = [
        // ФИО
        {
            id: 'fio',
            correctValue: 'ЮСУПОВ АЛЕКСАНДР ВАЛЕРЬЕВИЧ',
            userValue: '',
            x: 140,
            y: 170,
            width: 1000,
            height: 30
        },
        // СНИЛС
        {
            id: 'snils',
            correctValue: '241-379-422 89',
            userValue: '',
            x: 740,
            y: 210,
            width: 400,
            height: 25
        },
        // Гражданство
        {
            id: 'citizenship',
            correctValue: 'Российская Федерация',
            userValue: '',
            x: 500,
            y: 250,
            width: 600,
            height: 25
        },
        // Адрес
        {
            id: 'address',
            correctValue: 'УДМУРТСКАЯ РЕСПУБЛИКА Г.ВОТКИНСК УЛ.1МАЯ 26',
            userValue: '',
            x: 350,
            y: 290,
            width: 800,
            height: 25
        },
        // Стаж
        {
            id: 'experience',
            correctValue: '43',
            userValue: '',
            x: 200,
            y: 330,
            width: 100,
            height: 25
        },
        // Документ
        {
            id: 'document',
            correctValue: 'паспорт',
            userValue: '',
            x: 420,
            y: 420,
            width: 600,
            height: 25
        },
        // Серия, номер
        {
            id: 'series',
            correctValue: '2200 997631',
            userValue: '',
            x: 200,
            y: 460,
            width: 400,
            height: 25
        },
        // Дата выдачи
        {
            id: 'issueDate',
            correctValue: '27.12.1976',
            userValue: '',
            x: 750,
            y: 460,
            width: 300,
            height: 25
        },
        // Кем выдан
        {
            id: 'issuedBy',
            correctValue: 'ОТДЕЛ УФМС РОССИИ ПО НИЖЕГОРОДСКОЙ ОБЛАСТИ Г.НИЖНИЙ НОВГОРОД',
            userValue: '',
            x: 200,
            y: 500,
            width: 850,
            height: 25
        },
        // Дата рождения
        {
            id: 'birthDate',
            correctValue: '12.12.1960',
            userValue: '',
            x: 200,
            y: 540,
            width: 300,
            height: 25
        },
        // Место рождения
        {
            id: 'birthPlace',
            correctValue: 'Г.ГОРЬКИЙ',
            userValue: '',
            x: 200,
            y: 580,
            width: 600,
            height: 25
        },
    ]

    const checkboxOptions: CheckboxOption[] = [
        {
            id: 'male',
            label: '✓',
            value: 'male',
            checked: false,
            x: 220,
            y: 650,
            width: 25,
            height: 25,
        },
        {
            id: 'female',
            label: '✓',
            value: 'female',
            checked: false,
            x: 300,
            y: 650,
            width: 25,
            height: 25
        }
    ]

    const [fields, setFields] = useState<FormField[]>(formFields)
    const [checkboxes, setCheckboxes] = useState<CheckboxOption[]>(checkboxOptions)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const updateScale = () => {
            if (formRef.current) {
                const container = formRef.current
                const containerWidth = container.clientWidth
                const containerHeight = container.clientHeight

                const widthScale = containerWidth / 1200
                const heightScale = containerHeight / 800
                const newScale = Math.min(widthScale, heightScale) * 0.95

                setScale(newScale)
                setFormSize({
                    width: 1200 * newScale,
                    height: 800 * newScale
                })
            }
        }

        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [])

    const handleFieldChange = (id: string, value: string) => {
        setFields(prev => prev.map(field =>
            field.id === id ? { ...field, userValue: value, hasError: false } : field
        ))
    }

    const handleCheckboxClick = (clickedId: string) => {
        setCheckboxes(prev => prev.map(option => ({
            ...option,
            checked: option.id === clickedId,
            hasError: false
        })))
    }

    const handleCheckAnswers = () => {
        const updatedFields = fields.map(field => ({
            ...field,
            hasError: field.userValue.trim().toUpperCase() !== field.correctValue.toUpperCase()
        }))

        setFields(updatedFields)

        const firstChecked = checkboxes[0].checked
        const secondChecked = checkboxes[1].checked
        const checkboxesCorrect = firstChecked && !secondChecked

        const updatedCheckboxes = checkboxes.map(option => ({
            ...option,
            hasError: !checkboxesCorrect
        }))

        setCheckboxes(updatedCheckboxes)

        const allTextFieldsCorrect = updatedFields.every(field => !field.hasError)
        const allCorrect = allTextFieldsCorrect && checkboxesCorrect

        if (allCorrect) {
            setShowSuccess(true)
        }
    }

    const resetForm = () => {
        setFields(formFields.map(field => ({ ...field, userValue: '', hasError: false })))
        setCheckboxes(checkboxOptions.map(option => ({ ...option, checked: false, hasError: false })))
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
                        <div className="section-header">
                            <h2>Изучите документы</h2>
                            <p className="section-description">
                                Листайте документы для получения необходимой информации
                            </p>
                        </div>
                        <ImageSlider images={sliderImages} />
                    </div>

                    <div className="form-section">
                        <div className="application-form">
                            <div
                                ref={formRef}
                                className="form-container"
                                style={{
                                    width: `${formSize.width}px`,
                                    height: `${formSize.height}px`,
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top left'
                                }}
                            >
                                {/* Текст формы как на фото */}
                                <div className="form-text-content">
                                    <h2>ЗАЯВЛЕНИЕ</h2>
                                    <h3>О НАЗНАЧЕНИИ ПЕНСИИ (ПЕРЕВОДЕ С ОДНОЙ ПЕНСИИ НА ДРУГУЮ)</h3>

                                    <div className="form-number">1.</div>

                                    <div className="form-body">
                                        <div className="form-line">
                                            <span className="instruction">(фамилия, имя, отчество (при наличии)</span>
                                        </div>
                                        <div className="form-line">
                                            страховой номер индивидуального лицевого счета
                                        </div>
                                        <div className="form-line">
                                            принадлежность к гражданству
                                        </div>
                                        <div className="form-line">
                                            проживавший в Российской Федерации (указывается адрес до выезда за пределы Российской Федерации):
                                        </div>
                                        <div className="form-line">
                                            адрес регистрации
                                        </div>
                                        <div className="form-line">
                                            <br />
                                            Стаж работы
                                            <br />
                                            <br />
                                            <br />
                                        </div>

                                        <hr className="divider" />

                                        <div className="form-line">
                                            Наименование документа,
                                        </div>
                                        <div className="form-line">
                                            удостоверяющего личность
                                        </div>
                                        <div className="form-line">
                                            Серия, номер
                                        </div>
                                        <div className="form-line">
                                            Дата выдачи
                                        </div>
                                        <div className="form-line">
                                            Кем выдан
                                        </div>
                                        <div className="form-line">
                                            Дата рождения
                                        </div>
                                        <div className="form-line">
                                            Место рождения
                                        </div>
                                        <div className="form-line">
                                            <br />
                                            пол (сделать отметку в соответствующем квадрате):
                                        </div>
                                        <div className="form-line gender-line">
                                            <span className="gender-option-text">муж.</span>
                                            <span className="gender-option-text">жен.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Поля ввода */}
                                {fields.map((field) => (
                                    <input
                                        key={field.id}
                                        type="text"
                                        value={field.userValue}
                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                        className={`form-input-field ${field.hasError ? 'error' : ''}`}
                                        style={{
                                            position: 'absolute',
                                            left: `${field.x * scale}px`,
                                            top: `${field.y * scale}px`,
                                            width: `${field.width * scale}px`,
                                            height: `${field.height * scale}px`,
                                            fontSize: `${14 * scale}px`,
                                            padding: `${2 * scale}px ${4 * scale}px`
                                        }}
                                    />
                                ))}

                                {/* Чекбоксы */}
                                {checkboxes.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`checkbox-field ${option.checked ? 'checked' : ''} ${option.hasError ? 'error' : ''}`}
                                        onClick={() => handleCheckboxClick(option.id)}
                                        style={{
                                            position: 'absolute',
                                            left: `${option.x * scale}px`,
                                            top: `${option.y * scale}px`,
                                            width: `${option.width * scale}px`,
                                            height: `${option.height * scale}px`,
                                            fontSize: `${16 * scale}px`
                                        }}
                                    >
                                        {option.checked && option.label}
                                    </div>
                                ))}
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