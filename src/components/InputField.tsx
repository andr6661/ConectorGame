import React from 'react'
import './InputField.scss'

interface InputFieldProps {
    id: string
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    error?: boolean
    success?: boolean
    errorMessage?: string
}

const InputField: React.FC<InputFieldProps> = ({
                                                   id,
                                                   label,
                                                   value,
                                                   onChange,
                                                   placeholder,
                                                   error = false,
                                                   success = false,
                                                   errorMessage
                                               }) => {
    return (
        <div className="input-field">
            <label htmlFor={id} className="input-label">
                {label}
                {error && <span className="status-icon error">✗</span>}
                {success && !error && <span className="status-icon success">✓</span>}
            </label>

            <input
                id={id}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
            />

            {error && errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default InputField