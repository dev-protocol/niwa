import React from 'react'
import { Link } from 'react-router-dom'

type ButtonStyle = 'outlined' | 'filled' | 'danger'

interface HSButtonProps {
  label?: string
  icon?: React.ReactElement | string
  type?: ButtonStyle
  link?: string
  context?: 'button' | 'submit' | 'reset' | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void)
  isDisabled?: boolean
}

const HSButton: React.FC<HSButtonProps> = ({
  label,
  icon,
  type = 'filled',
  link,
  onClick,
  isDisabled,
  children,
  context = 'button'
}) => {
  const assertBackground = (type: ButtonStyle): string => {
    switch (type) {
      case 'filled':
        return 'bg-blue-500'
      case 'outlined':
      case 'danger':
        return 'bg-white'

      default:
        return 'bg-blue-500'
    }
  }

  const assertText = (type: ButtonStyle): string => {
    switch (type) {
      case 'filled':
        return 'text-white'
      case 'outlined':
        return 'text-blue'
      case 'danger':
        return 'text-red'

      default:
        return 'bg-blue-500'
    }
  }

  const btnStyles = {
    background: assertBackground(type),
    text: assertText(type)
  }

  const ButtonBase = (
    <button
      className={`${btnStyles.background} ${btnStyles.text} px-4 py-2 rounded`}
      role="button"
      type={context}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && <i className="hs-button__icon">{icon}</i>}
      {label || (children && <span className="hs-button__label">{label || children}</span>)}
    </button>
  )

  if (!link) {
    return ButtonBase
  } else {
    const isLinkExternal: boolean = link.charAt(0) !== '/' && link.charAt(0) !== '#'
    return isLinkExternal ? (
      <a href={link} target={isLinkExternal ? '_blank' : '_self'} rel="noreferrer">
        {ButtonBase}
      </a>
    ) : (
      <Link to={link}>{ButtonBase}</Link>
    )
  }
}

export default HSButton
