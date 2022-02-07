import React from 'react'

interface DPLFooterProps {
  // Props
}

const DPLFooter: React.FC<DPLFooterProps> = ({ children }) => {
  return (
    <footer className="border-t py-8 mt-12">
      <div>{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div>{children}</div>
}

export { DPLFooter, DPLFooterSection }
