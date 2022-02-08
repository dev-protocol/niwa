import React from 'react'

interface TitleSubSectionProps {
  classNames?: string
}

const TitleSubSection: React.FC<TitleSubSectionProps> = ({ classNames, children }) => {
  return <div className={`text-xl mb-sm ${classNames}`}>{children}</div>
}

export default TitleSubSection
