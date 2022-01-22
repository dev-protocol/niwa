import React from 'react'

interface HSButtonProps {
  label?: string
  icon?: React.ReactElement | string
  type?: string
  link?: string
  context?: 'button' | 'submit' | 'reset' | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void)
  isDisabled?: boolean
}

const HSButton: React.FC<HSButtonProps> = ({
  label,
  icon,
  type,
  link,
  onClick,
  isDisabled,
  children,
  context = 'button'
}) => {
  const VALID_BUTTON_TYPES = ['outlined', 'filled', 'danger', 'native-blue', 'neutral']
  const assertType = (type: string): string => {
    type.split(' ').forEach(type => {
      if (!VALID_BUTTON_TYPES.includes(type))
        throw new Error(
          `Invalid type ${type}. Please use one of the following valid types: ${VALID_BUTTON_TYPES.join(', ')}.`
        )
    })
    const finalTypes: string[] = []
    type.split(' ').forEach(type => {
      finalTypes.push('hs-button--' + type)
    })
    return finalTypes.join(' ')
  }

  const ButtonBase = (
    <button
      className={`hs-button${type ? ' ' + assertType(type) : ''}`}
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
    return (
      <a href={link} target={isLinkExternal ? '_blank' : '_self'} rel="noreferrer">
        {ButtonBase}
      </a>
    )
  }
}

export default HSButton
