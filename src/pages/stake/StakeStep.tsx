import React from 'react'
import { FaCheck } from 'react-icons/fa'
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
    <div className="grid grid-cols-1 md:grid-cols-2 align-baseline items-baseline">
      <div className={`flex items-center gap-1 ${isVisible ? 'opacity-100' : 'opacity-25'}`}>
        <b>{name}</b>
        <FaCheck size={14} className={`ml-sm text-green-500 text-success ${isComplete ? 'visible' : 'invisible'}`} />
      </div>
      <div className={`flex flex-col ${isVisible ? 'visible' : 'invisible'}`}>
        <span className="mb-sm">{label}</span>
        <HSButton label={btnText} type={isComplete ? 'success' : 'filled'} isDisabled={isDisabled} onClick={onClick} />
      </div>
    </div>
  )
}

export default StakeStep
