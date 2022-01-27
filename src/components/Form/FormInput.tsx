import { FunctionComponent } from 'react'

interface FormInputProps {
  id: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  disabled: boolean
}

const FormInput: FunctionComponent<FormInputProps> = ({ id, placeholder, value, onChange, disabled }) => {
  return (
    <input
      id={id}
      placeholder={placeholder ?? ''}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
  )
}

export default FormInput
