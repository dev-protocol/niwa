import React from 'react'

interface DPLFooterProps {
  // Props
}

const DPLFooter: React.FC<DPLFooterProps> = ({ children }) => {
  return (
    <footer className="border-t py-md mt-lg">
      <div>{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div>{children}</div>
}

export { DPLFooter, DPLFooterSection }
