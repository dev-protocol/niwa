import React from 'react'
import ProgressStep from './ProgressStep'
import './ProgressStepper.scss'

interface ProgressStepperProps {
  currentStep: number
  completedStep: number
  stepLabels: readonly string[]
}

// credit to https://codepen.io/thdeux/pen/zBGNrM for the basis of this stepper
const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep, completedStep, stepLabels }) => {
  return (
    <div className="mb-sm table w-full">
      {stepLabels.map((label, i) => (
        <ProgressStep key={i} label={label} index={i} currentStep={currentStep} isCompleted={i <= completedStep} />
      ))}
    </div>
  )
}

export default ProgressStepper
