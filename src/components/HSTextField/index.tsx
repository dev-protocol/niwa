import React from 'react'

interface HSTextFieldProps {
  name: string
  label: string
  type: string
  placeholder?: string
  helper?: string
  value?: string
  isError?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  onChange: (val: string) => void
}

const HSTextField: React.FC<HSTextFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  helper,
  value,
  isError,
  isRequired,
  isDisabled,
  onChange
}) => {
  return (
    <label className={`hs-text-field${isError ? ' danger' : ''}${isDisabled ? ' hs-text-field--disabled' : ''}`}>
      <span className="hs-text-field__label">
        {label} {isRequired && <span className="ml-xs text-danger-400">*</span>}
      </span>
      {type == 'textarea' ? (
        <textarea
          name={name}
          className="hs-text-field__input"
          rows={4}
          placeholder={placeholder ?? ''}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
        />
      ) : (
        <input
          name={name}
          className="hs-text-field__input"
          type={type}
          placeholder={placeholder ?? ''}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
        />
      )}
      <span className="hs-text-field__helper">{helper}</span>
    </label>
  )
}

export default HSTextField
