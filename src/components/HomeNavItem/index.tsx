import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

interface HomeNavItemProps {
  title: string
  message: string
  path?: string
  isExternal: boolean
  isDisabled?: boolean
  className?: string
}

const HomeNavItem: FunctionComponent<HomeNavItemProps> = ({
  title,
  message,
  path,
  isExternal,
  isDisabled,
  className
}) => {
  return (
    <>
      {isDisabled && (
        <div>
          <HomeNavItemContent title={title} message={message} isDisabled={isDisabled} className={className} />
        </div>
      )}
      {isExternal && (
        <a href={path}>
          <HomeNavItemContent title={title} message={message} isDisabled={isDisabled} className={className} />
        </a>
      )}

      {!isExternal && path && (
        <Link to={path}>
          <HomeNavItemContent title={title} message={message} isDisabled={isDisabled} className={className} />
        </Link>
      )}
    </>
  )
}

interface HomeNavItemContentProps {
  title: string
  message: string
  isDisabled?: boolean
  className?: string
}

const HomeNavItemContent: FunctionComponent<HomeNavItemContentProps> = ({
  title,
  message,
  className,
  isDisabled = false
}) => {
  return (
    <div
      className={`grid gap-4 rounded border py-sm px-md from-primary to-secondary h-full ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
    >
      <div className="flex items-center">
        <h2 className="text-4xl font-bold mr-1">{title}</h2>
        <div>
          <FaChevronRight />
        </div>
      </div>
      <span className="font-bold">{message}</span>
    </div>
  )
}

export default HomeNavItem
