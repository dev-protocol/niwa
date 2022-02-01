import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isNumberInput } from '../../utils/utils'

interface StakeOptionProps {
  optionName: string
  fixedAmount?: number
  isCustom: boolean
  propertyAddress: string
}

const StakeOption: React.FC<StakeOptionProps> = ({ optionName, fixedAmount, isCustom, propertyAddress }) => {
  const [stakeAmount, setStakeAmount] = useState(fixedAmount)
  const [formValid, setFormValid] = useState(!isCustom)

  const onChange = (val: string) => {
    // empty string
    if (val.length <= 0) {
      setStakeAmount(undefined)
      setFormValid(false)
      return
    }

    // not valid number input
    if (!isNumberInput(val)) {
      return
    }

    setFormValid(+val > 0)
    setStakeAmount(+val)
  }

  return (
    <div className="flex flow-column">
      <span>{optionName}</span>
      <div>
        {!isCustom && <input readOnly value={stakeAmount} />}
        {isCustom && <input value={stakeAmount ?? ''} onChange={e => onChange(e.target.value)} placeholder="1000" />}
        <span>DEV</span>
      </div>
      <Link to={formValid ? `/properties/${propertyAddress}/stake?amount=${stakeAmount}` : '#'}>Stake</Link>
      <div>
        Stake a{!isCustom && <span> {optionName} </span>}
        {isCustom && <span> custom amount </span>}
        and get a thank you
      </div>
    </div>
  )
}

export default StakeOption
