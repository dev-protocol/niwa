import React from 'react'

interface DPLFooterProps {
  // Props
}

const DPLFooter: React.FC<DPLFooterProps> = ({ children }) => {
  return (
    <footer className="dpl-footer">
      <div className="dpl-footer__wrapper">{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div className="dpl-footer__section">{children}</div>
}

export { DPLFooter, DPLFooterSection }
