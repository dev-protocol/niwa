import React from 'react'
import HSTextField from '../HSTextField'

interface FormFieldProps {
  label: string
  id: string
  helper?: string
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
  helper,
  required = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  isError
}) => {
  return (
    <div className="mb-lg">
      <HSTextField
        name={id}
        label={label}
        helper={helper}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={val => (onChange ? onChange(val) : () => {})}
        isError={isError}
        isRequired={required}
        isDisabled={disabled}
      />
    </div>
  )
}

export default FormField
