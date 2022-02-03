import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import HSButton from '../../components/HSButton'

interface StakeStepProps {
  isComplete: boolean
  isDisabled: boolean
  isVisible: boolean
  name: string
  label: string
  btnText: string
  onClick: () => void
}

const StakeStep: React.FC<StakeStepProps> = ({ isComplete, isDisabled, label, onClick, name, btnText, isVisible }) => {
  return (
    <div className={`grid-2 mb-lg ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex align-center">
        <b>{name}</b>
        <FaCheckCircle className="ml-xs" color={isComplete ? 'green' : 'grey'} />
      </div>
      <div className="flex flow-column">
        <span className="mb-sm">{label}</span>
        <HSButton label={btnText} type="filled" isDisabled={isDisabled} onClick={onClick} />
      </div>
    </div>
  )
}

export default StakeStep
