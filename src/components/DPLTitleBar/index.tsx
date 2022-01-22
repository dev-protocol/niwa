import React from 'react'

interface DPLTitleBarProps {
  title: string
}

const DPLTitleBar: React.FC<DPLTitleBarProps> = ({ title }) => {
  return <h1 className="dpl-title-bar">{title}</h1>
}

export default DPLTitleBar
