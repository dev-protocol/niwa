import React from 'react'

interface DPLTitleBarProps {
  title: string
  className?: string
}

const DPLTitleBar: React.FC<DPLTitleBarProps> = ({ title, className }) => {
  return (
    <>
      <h1
        className={`bg-heading-texture from-primary to-secondary bg-cover bg-clip-text bg-center bg-no-repeat text-3xl font-extrabold text-transparent ${className}`}
      >
        {title}
      </h1>
    </>
  )
}

export default DPLTitleBar
