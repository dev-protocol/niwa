import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import { isNumberInput } from '../../../utils/utils'

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
    <Card>
      <div className="flex flex-col">
        <span>{optionName}</span>

        {!isCustom && (
          <div className="flex">
            <div className="flex items-end">
              <span className="mr-2 text-4xl font-bold">{stakeAmount}</span>
              <span className="text-xl font-bold">DEV</span>
            </div>
          </div>
        )}

        {isCustom && (
          <input
            className="border-none text-4xl focus:border-transparent focus:outline-none focus:ring-0"
            value={stakeAmount ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder="1000"
          />
        )}

        <Link
          className={`my-sm rounded bg-black from-primary to-secondary py-2 px-sm text-center text-lg text-white ${
            !formValid ? 'opacity-75' : ''
          }`}
          to={formValid ? `/properties/${propertyAddress}/stake?amount=${stakeAmount}` : '#'}
        >
          Stake
        </Link>
        <div className="text-sm text-gray-500">
          Stake a{!isCustom && <span> {optionName} </span>}
          {isCustom && <span> custom amount </span>}
          and get a thank you
        </div>
      </div>
    </Card>
  )
}

export default StakeOption
