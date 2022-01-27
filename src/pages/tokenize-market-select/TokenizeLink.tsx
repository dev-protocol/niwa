import React from 'react'
import { HSCard, HSCardContents, HSCardHeader } from '../../components/HSCard'
import { Link } from 'react-router-dom'

interface TokenizeLinkProps {
  title: string
  icon?: React.ReactElement
  details: string
  // iconColor?: string
  disabled?: boolean
  path: string
}

const TokenizeLink: React.FC<TokenizeLinkProps> = ({ title, icon, details, path, disabled = false }) => {
  const Base = (
    <HSCard className={`${disabled ? 'opacity-50' : ''}`}>
      <HSCardHeader>
        <h3
          style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '0.5rem' }}
          className="weight-h3"
        >
          <span>{icon}</span> {title} {disabled && <small>(Coming Soon)</small>}
        </h3>
      </HSCardHeader>
      <HSCardContents>
        <p>{details}</p>
      </HSCardContents>
    </HSCard>
  )

  if (!path || disabled) {
    return Base
  } else {
    return <Link to={path}>{Base}</Link>
  }
}

export default TokenizeLink
