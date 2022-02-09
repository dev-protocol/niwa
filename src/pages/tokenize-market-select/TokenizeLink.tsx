import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'

interface TokenizeLinkProps {
  title: string
  icon?: React.ReactElement
  details: string | React.ReactElement
  disabled?: boolean
  path: string
}

const TokenizeLink: React.FC<TokenizeLinkProps> = ({ title, icon, details, path, disabled = false }) => {
  const LinkContents = (
    <div className={disabled ? 'text-gray-400 opacity-75' : ''}>
      <div className="flex justify-between mb-2 items-center">
        <h3 className="flex items-center">
          <span>{icon}</span>
          <span className="text-lg ml-2 font-bold">{title}</span>
        </h3>
        {disabled && <span>Coming Soon</span>}
      </div>
      <p className="text-sm text-gray-400">{details}</p>
    </div>
  )

  return disabled ? (
    <Card isDisabled={disabled}>{LinkContents}</Card>
  ) : (
    <Link to={path}>
      <Card>{LinkContents}</Card>
    </Link>
  )
}

export default TokenizeLink
