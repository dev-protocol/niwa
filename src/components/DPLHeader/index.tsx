import React from 'react'
import { Link } from 'react-router-dom'

interface LauncherHeaderProps {
  // Props
}

const LauncherHeader: React.FC<LauncherHeaderProps> = ({ children }) => {
  return (
    <header className="flex justify-between py-4 h-24 mb-8">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="font-bold text-xl">Niwa</h1>
        </Link>
        <span className="ml-4 text-sm justify-center">Social Token Launcher</span>
      </div>
      <div className="flex items-center">{children}</div>
    </header>
  )
}

export default LauncherHeader
