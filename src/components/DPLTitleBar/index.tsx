import React from 'react'

interface DPLTitleBarProps {
  title: string
  className?: string
}

const DPLTitleBar: React.FC<DPLTitleBarProps> = ({ title, className }) => {
  return (
    <>
      <h1
        className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary ${className}`}
      >
        {title}
      </h1>
    </>
  )
}

export default DPLTitleBar
