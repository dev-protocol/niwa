import React from 'react'
import { Link } from 'react-router-dom'

interface LauncherHeaderProps {
  // Props
}

const LauncherHeader: React.FC<LauncherHeaderProps> = ({ children }) => {
  return (
    <header className="mb-md flex h-24 flex-col justify-between py-sm sm:flex-row">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-xl font-bold">Niwa</h1>
        </Link>
        <span className="ml-sm justify-center pt-1 text-sm">Social Token Launcher for DAOs</span>
      </div>
      <div className="flex items-center">{children}</div>
    </header>
  )
}

export default LauncherHeader
