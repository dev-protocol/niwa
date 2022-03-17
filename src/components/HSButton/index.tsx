import React from 'react'
import { Link } from 'react-router-dom'

type ButtonStyle = 'outlined' | 'filled' | 'danger' | 'success'

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
  const assertBackground = (type: ButtonStyle) => {
    switch (type) {
      case 'filled':
        return 'bg-black'
      case 'danger':
      case 'success':
        return 'bg-white'

      case 'outlined':
        return 'transparent'

      default:
        return 'bg-blue-500'
    }
  }

  const assertText = (type: ButtonStyle) => {
    switch (type) {
      case 'filled':
        return 'text-white'
      case 'outlined':
        return 'text-blue'
      case 'danger':
        return 'text-red'
      case 'success':
        return 'text-success'

      default:
        return 'bg-blue-500'
    }
  }

  const assertBorder = (type: ButtonStyle) => {
    switch (type) {
      case 'outlined':
        return 'border-blue-400 border-2 hover:border-blue-700'
      case 'danger':
        return 'border-red-500'
      case 'success':
        return 'border-success'
      case 'filled':
      default:
        return 'border-transparent'
    }
  }

  const btnStyles = {
    background: assertBackground(type),
    text: assertText(type),
    border: assertBorder(type)
  }

  const ButtonBase = (
    <button
      className={`${btnStyles.background} ${btnStyles.text} ${btnStyles.border} rounded border px-4 py-2 shadow ${
        isDisabled ? 'opacity-50' : ''
      }`}
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
