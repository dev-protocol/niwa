import React from 'react'

interface CheckBoxProps {
  isChecked: boolean
  text: string
  name: string
  onChange: () => {}
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, text, name, onChange }) => {
  return (
    <label className="flex align-center">
      <input name={name} type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="ml-xs">{text}</span>
    </label>
  )
}

export default CheckBox
