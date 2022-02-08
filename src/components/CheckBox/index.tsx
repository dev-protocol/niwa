import React from 'react'

interface CheckBoxProps {
  isChecked: boolean
  text: string
  name: string
  onChange: () => {}
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, text, name, onChange }) => {
  return (
    <label className="flex items-center">
      <input name={name} type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="ml-2">{text}</span>
    </label>
  )
}

export default CheckBox
