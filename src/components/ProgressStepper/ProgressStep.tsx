import React from 'react'
import { FaCheck } from 'react-icons/fa'

interface ProgressStepProps {
  label: string
  index: number
  currentStep: number
  isCompleted: boolean
}

const ProgressStep: React.FC<ProgressStepProps> = ({ label, index, currentStep, isCompleted }) => {
  return (
    <div className={`md-step relative table-cell p-5`}>
      <div
        className={`m-auto flex h-8 w-8 items-center justify-center rounded-full text-white ${
          index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        {isCompleted && <FaCheck />}
        {!isCompleted && <span>{index + 1}</span>}
      </div>
      <div className={`md-step-title mt-sm text-center text-gray-500`}>{label}</div>
      <div className="md-step-bar-left absolute h-1 border-t-2 border-gray-300"></div>
      <div className="md-step-bar-right absolute h-1 border-t-2 border-gray-300"></div>
    </div>
  )
}

export default ProgressStep
