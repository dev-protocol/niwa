import React from 'react'

interface FaqCardProps {
  question?: string
  answer?: string
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer, children }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">{question}</h3>
      <p className="text-sm">{answer || children}</p>
    </div>
  )
}

export default FaqCard
