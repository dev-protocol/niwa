import React from 'react'
import { DPLHr } from '../DPLHr'

interface DPLFooterProps {
  className?: string
}

const DPLFooter: React.FC<DPLFooterProps> = ({ className, children }) => {
  return (
    <footer className={`mt-lg ${className}`}>
      <DPLHr />
      <div className="py-md ">{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div>{children}</div>
}

export { DPLFooter, DPLFooterSection }
