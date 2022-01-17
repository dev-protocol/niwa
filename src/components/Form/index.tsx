import { FunctionComponent } from 'react'
import FormInput from './FormInput'
import FormInputLabel from './FormInputLabel'

interface FormFieldProps {
  label: string
  id: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  value: string
  onChange?: (val: string) => void
}

const FormField: FunctionComponent<FormFieldProps> = ({
  label,
  id,
  required = false,
  disabled = false,
  placeholder,
  value,
  onChange
}) => {
  return (
    <div className="mb-4">
      <FormInputLabel label={label} id={id} required={required} />
      <FormInput
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={val => (onChange ? onChange(val) : () => {})}
        disabled={disabled}
      />
    </div>
  )
}

export default FormField
