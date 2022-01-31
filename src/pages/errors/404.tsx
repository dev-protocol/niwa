import React from 'react'

interface PageNotFoundProps {
  // Props
}

const PageNotFound: React.FC<PageNotFoundProps> = () => {
  return (
    <div className="grid-center">
      <h1>404</h1>
      <h4>Page Not Found</h4>
    </div>
  )
}

export default PageNotFound
