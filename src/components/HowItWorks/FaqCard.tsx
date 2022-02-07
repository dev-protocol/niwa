import React from 'react'

interface FaqCardProps {
  question?: string
  answer?: string
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer, children }) => {
  return (
    <div className="flex flex-col gap-xs mb-sm">
      <h3>{question}</h3>
      <p>{answer || children}</p>
    </div>
  )
}

export default FaqCard
