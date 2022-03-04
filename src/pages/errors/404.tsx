import React from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'

interface PageNotFoundProps {
  // Props
}

const PageNotFound: React.FC<PageNotFoundProps> = () => {
  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Page Not found" />
      <p>Sorry, we could not find the page you were looking for.</p>
    </div>
  )
}

export default PageNotFound
