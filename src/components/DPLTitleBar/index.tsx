import React from 'react'

interface DPLTitleBarProps {
  title: string
  classNames?: string
}

const DPLTitleBar: React.FC<DPLTitleBarProps> = ({ title, classNames }) => {
  return (
    <>
      <h1
        className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary ${classNames}`}
      >
        {title}
      </h1>
    </>
  )
}

export default DPLTitleBar
