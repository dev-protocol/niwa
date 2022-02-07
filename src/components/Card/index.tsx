import React from 'react'

interface CardProps {
  isDisabled?: boolean
}

const Card: React.FC<CardProps> = ({ children, isDisabled = false }) => {
  return (
    <div className={`${!isDisabled ? 'hover:border-gray-300' : ''} shadow border border-transparent rounded py-4 px-8`}>
      {children}
    </div>
  )
}

export default Card
