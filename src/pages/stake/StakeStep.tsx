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
    <div className={`grid grid-cols-1 sm:grid-cols-2 mb-lg ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex self-start">
        <div className="flex items-center text-xl">
          <b>{name}</b>
          <FaCheck size={14} className={`ml-sm text-green-500 ${isComplete ? 'text-success' : 'text-gray-300'}`} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="mb-sm">{label}</span>
        <HSButton label={btnText} type={isComplete ? 'success' : 'filled'} isDisabled={isDisabled} onClick={onClick} />
      </div>
    </div>
  )
}

export default StakeStep
