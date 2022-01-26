import React from 'react'

interface HSCardProps {
  className?: string
}

const HSCard: React.FC<HSCardProps> = ({ className, children }) => {
  return <div className={`hs-card${className ? ' ' + className : ''}`}>{children}</div>
}

const HSCardHeader: React.FC<HSCardProps> = ({ className, children }) => {
  return <div className={`hs-card__header${className ? ' ' + className : ''}`}>{children}</div>
}

const HSCardContents: React.FC<HSCardProps> = ({ className, children }) => {
  return <div className={`hs-card__contents${className ? ' ' + className : ''}`}>{children}</div>
}

export { HSCard, HSCardHeader, HSCardContents }
