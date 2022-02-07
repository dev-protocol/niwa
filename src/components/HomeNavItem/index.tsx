import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

interface HomeNavItemProps {
  title: string
  message: string
  path?: string
  isExternal: boolean
  isDisabled?: boolean
}

const HomeNavItem: FunctionComponent<HomeNavItemProps> = ({ title, message, path, isExternal, isDisabled }) => {
  const containerClasses = 'bg-gradient-to-r from-cyan-500 to-blue-500'
  return (
    <>
      {isDisabled && (
        <div>
          <HomeNavItemContent title={title} message={message} isDisabled={isDisabled} />
        </div>
      )}
      {isExternal && (
        <a href={path}>
          <HomeNavItemContent title={title} message={message} isDisabled={isDisabled} />
        </a>
      )}

      {!isExternal && path && (
        <Link to={path}>
          <HomeNavItemContent title={title} message={message} isDisabled={isDisabled} />
        </Link>
      )}
    </>
  )
}

interface HomeNavItemContentProps {
  title: string
  message: string
  isDisabled?: boolean
}

const HomeNavItemContent: FunctionComponent<HomeNavItemContentProps> = ({ title, message, isDisabled = false }) => {
  return (
    <div
      className={`bg-gradient-to-r rounded py-4 px-8 text-white ${
        isDisabled ? 'opacity-75 from-blue-400 to-cyan-500' : 'from-blue-500 to-cyan-600'
      }`}
    >
      <div className="flex items-center">
        <h2 className="text-2xl mr-1">{title}</h2>
        <div>
          <FaChevronRight />
        </div>
      </div>
      <span>{message}</span>
    </div>
  )
}

export default HomeNavItem
