import { FunctionComponent } from 'react'

interface FormInputLabelProps {
  label: string
  id: string
  required: boolean
}

const FormInputLabel: FunctionComponent<FormInputLabelProps> = ({ label, id, required }) => {
  return (
    <label htmlFor={id}>
      {label}
      {required && <span>*</span>}
    </label>
  )
}

export default FormInputLabel
