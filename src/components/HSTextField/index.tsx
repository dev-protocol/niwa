import React from 'react'

interface HSTextFieldProps {
  name: string
  label: string
  type: string
  placeholder?: string
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
  value,
  isError,
  isRequired,
  isDisabled,
  onChange,
  children
}) => {
  const inputClasses = 'border border-gray-300 rounded py-2 px-sm'

  return (
    <label className={`flex flex-col ${isError ? ' danger' : ''}`}>
      <span className="mb-2 font-bold">
        {label} {isRequired && <span className="ml-xs text-danger-400">*</span>}
      </span>
      {type == 'textarea' ? (
        <textarea
          name={name}
          className={inputClasses}
          rows={4}
          placeholder={placeholder ?? ''}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
        />
      ) : (
        <input
          name={name}
          className={inputClasses}
          type={type}
          placeholder={placeholder ?? ''}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
        />
      )}
      {children}
    </label>
  )
}

export default HSTextField
