import React from 'react'

interface TitleSubSectionProps {
  classNames?: string
}

const TitleSubSection: React.FC<TitleSubSectionProps> = ({ classNames, children }) => {
  return <div className={`mb-sm text-xl ${classNames}`}>{children}</div>
}

export default TitleSubSection
