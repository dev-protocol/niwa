import React from 'react'

interface DPLTitleBarProps {
  title: string
  classNames?: string
}

const DPLTitleBar: React.FC<DPLTitleBarProps> = ({ title, classNames }) => {
  return (
    <>
      <h1
        className={`text-3xl font-extrabold text-transparent bg-clip-text bg-heading-texture bg-center bg-no-repeat bg-cover from-primary to-secondary ${classNames}`}
      >
        {title}
      </h1>
    </>
  )
}

export default DPLTitleBar
