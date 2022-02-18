import React from 'react'

interface DetailProps {
  label: string
  valueElem: React.ReactElement
}

const Detail: React.FC<DetailProps> = ({ label, valueElem }) => {
  return (
    <div className="mb-sm flex flex-col">
      <span className="text-xs font-bold text-gray-400">{label}</span>
      {valueElem}
    </div>
  )
}

export default Detail
