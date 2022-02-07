import React from 'react'
import { Link } from 'react-router-dom'

interface TokenizeLinkProps {
  title: string
  icon?: React.ReactElement
  details: string
  disabled?: boolean
  path: string
}

const TokenizeLink: React.FC<TokenizeLinkProps> = ({ title, icon, details, path, disabled = false }) => {
  const LinkContents = (
    <div className={disabled ? 'text-gray-400 opacity-75' : ''}>
      <div className="flex justify-between mb-2 items-center">
        <h3 className="flex items-center">
          <span>{icon}</span>
          <span className="text-lg ml-2">{title}</span>
        </h3>
        {disabled && <span>Coming Soon</span>}
      </div>
      <p className="text-sm text-gray-400">{details}</p>
    </div>
  )

  return disabled ? (
    <div className="border-2 border-gray-200 rounded py-4 px-8">{LinkContents}</div>
  ) : (
    <Link to={path} className="border-2 border-gray-200 rounded py-4 px-8">
      {LinkContents}
    </Link>
  )
}

export default TokenizeLink
