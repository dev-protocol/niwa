import React from 'react'
import { Link } from 'react-router-dom'

interface LauncherHeaderProps {
  // Props
}

const LauncherHeader: React.FC<LauncherHeaderProps> = ({ children }) => {
  return (
    <header className="dpl-header">
      <div className="dpl-header__wrapper">
        <div className="dpl-header__brand">
          <Link to="/">
            <h2>Launcher</h2>
          </Link>
        </div>
        <div className="dpl-header__actions">{children}</div>
      </div>
    </header>
  )
}

export default LauncherHeader
