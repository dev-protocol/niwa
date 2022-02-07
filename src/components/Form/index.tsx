import React from 'react'
import HSTextField from '../HSTextField'

interface FormFieldProps {
  label: string
  id: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  value: string
  isError?: boolean
  onChange?: (val: string) => void
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  isError,
  children
}) => {
  return (
    <div className="mb-sm">
      <HSTextField
        name={id}
        label={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={val => (onChange ? onChange(val) : () => {})}
        isError={isError}
        isRequired={required}
        isDisabled={disabled}
      >
        {children}
      </HSTextField>
    </div>
  )
}

export default FormField
