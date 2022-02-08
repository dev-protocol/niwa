import React from 'react'
import { DPLHr } from '../DPLHr'

interface DPLFooterProps {
  // Props
}

const DPLFooter: React.FC<DPLFooterProps> = ({ children }) => {
  return (
    <footer className="mt-lg">
      <DPLHr />
      <div className="py-md ">{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div>{children}</div>
}

export { DPLFooter, DPLFooterSection }
