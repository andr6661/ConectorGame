import React, { useState } from 'react'
import './ApplicationForm.scss'

interface FormField {
    id: string
    label: string
    correctValue: string
    userValue: string
    placeholder: string
}

interface ApplicationFormProps {
    formFields: FormField[]
    onCheckAnswers: (isCorrect: boolean) => void
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
                                                             formFields: initialFields,
                                                             onCheckAnswers
                                                         }) => {
    const [fields, setFields] = useState<FormField[]>(initialFields)
    const [errors, setErrors] = useState<Record<string, boolean>>({})
    const [showTwoColumns, setShowTwoColumns] = useState(true)

    const handleInputChange = (id: string, value: string) => {
        setFields(prev => prev.map(field =>
            field.id === id ? { ...field, userValue: value } : field
        ))

        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: false }))
        }
    }

    const validateField = (field: FormField): boolean => {
        return field.userValue.trim().toLowerCase() === field.correctValue.toLowerCase()
    }

    const checkAnswers = () => {
        const newErrors: Record<string, boolean> = {}
        let allCorrect = true

        fields.forEach(field => {
            const isCorrect = validateField(field)
            if (!isCorrect) {
                newErrors[field.id] = true
                allCorrect = false
            }
        })

        setErrors(newErrors)
        onCheckAnswers(allCorrect)
    }

    const resetForm = () => {
        setFields(initialFields)
        setErrors({})
    }

    // Разделяем поля на две колонки
    const firstColumnFields = fields.slice(0, Math.ceil(fields.length / 2))
    const secondColumnFields = fields.slice(Math.ceil(fields.length / 2))

    return (
        <div className="application-form">
            <div className="form-header">
                <h2>Заполните пропуски в анкете</h2>
                <p className="instructions">
                    Заполните все поля на основе информации из документов
                </p>
            </div>

            <div className={`form-content ${showTwoColumns ? 'two-columns' : ''}`}>
                {showTwoColumns ? (
                    <>
                        <div className="form-column">
                            {firstColumnFields.map((field) => (
                                <div key={field.id} className="form-field">
                                    <label htmlFor={field.id} className="field-label">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        type="text"
                                        value={field.userValue}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        placeholder={field.placeholder}
                                        className={`field-input ${errors[field.id] ? 'error' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="form-column">
                            {secondColumnFields.map((field) => (
                                <div key={field.id} className="form-field">
                                    <label htmlFor={field.id} className="field-label">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        type="text"
                                        value={field.userValue}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        placeholder={field.placeholder}
                                        className={`field-input ${errors[field.id] ? 'error' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="form-column">
                        {fields.map((field) => (
                            <div key={field.id} className="form-field">
                                <label htmlFor={field.id} className="field-label">
                                    {field.label}
                                </label>
                                <input
                                    id={field.id}
                                    type="text"
                                    value={field.userValue}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className={`field-input ${errors[field.id] ? 'error' : ''}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="form-buttons">
                <button
                    className="check-button"
                    onClick={checkAnswers}
                >
                    Проверить ответы
                </button>
                <button
                    className="reset-button"
                    onClick={resetForm}
                >
                    Сбросить все
                </button>
            </div>
        </div>
    )
}

export default ApplicationForm