import React from 'react'

interface DPLFooterProps {
  // Props
}

const DPLFooter: React.FC<DPLFooterProps> = ({ children }) => {
  return (
    <footer className="container mx-auto border-t py-8 mt-12 px-4">
      <div className="dpl-footer__wrapper">{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div className="">{children}</div>
}

export { DPLFooter, DPLFooterSection }
