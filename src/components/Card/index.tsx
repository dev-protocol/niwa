import React from 'react'

interface CardProps {
  isDisabled?: boolean
}

const Card: React.FC<CardProps> = ({ children, isDisabled = false }) => {
  return (
    <div
      className={`${
        !isDisabled ? 'hover:border-gray-300' : ''
      } rounded border border-transparent bg-white py-4 px-md shadow`}
    >
      {children}
    </div>
  )
}

export default Card
