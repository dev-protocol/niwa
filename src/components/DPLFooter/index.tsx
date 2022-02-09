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
  return <div className="grid gap-8 justify-items-start">{children}</div>
}

export { DPLFooter, DPLFooterSection }
