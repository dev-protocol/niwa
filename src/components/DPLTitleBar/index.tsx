import React from 'react'

interface DPLTitleBarProps {
  title: string
  sub?: string
}

const DPLTitleBar: React.FC<DPLTitleBarProps> = ({ title, sub }) => {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary mb-8">
        {title}
      </h1>
      {sub && <h2 className="mb-4 text-xl">{sub}</h2>}
    </>
  )
}

export default DPLTitleBar
