import React from 'react'
import { Link } from 'react-router-dom'

interface LauncherHeaderProps {
  // Props
}

const LauncherHeader: React.FC<LauncherHeaderProps> = ({ children }) => {
  return (
    <header className="flex justify-between py-sm h-24 mb-md">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="font-bold text-xl">Niwa</h1>
        </Link>
        <span className="ml-sm text-sm justify-center">Social Token Launcher</span>
      </div>
      <div className="flex items-center">{children}</div>
    </header>
  )
}

export default LauncherHeader
