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
      className={`grid h-full gap-4 rounded border border-transparent bg-white from-primary to-secondary py-sm px-md shadow ${
        isDisabled ? 'bg-slate-50' : 'hover:border-gray-300'
      } ${className}`}
    >
      <div className={`flex items-center gap-2 ${isDisabled ? 'opacity-20' : ''}`}>
        <h2 className="mr-1 text-4xl font-bold">{title}</h2>
        <div>
          <FaChevronRight />
        </div>
      </div>
      <span className={`font-bold ${isDisabled ? 'opacity-20' : ''}`}>{message}</span>
    </div>
  )
}

export default HomeNavItem
