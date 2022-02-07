import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

interface HomeNavItemProps {
  title: string
  message: string
  path: string
  isExternal: boolean
}

const HomeNavItem: FunctionComponent<HomeNavItemProps> = ({ title, message, path, isExternal }) => {
  return (
    <>
      {isExternal && (
        <a href={path}>
          <HomeNavItemContent title={title} message={message} />
        </a>
      )}

      {!isExternal && (
        <Link to={path}>
          <HomeNavItemContent title={title} message={message} />
        </Link>
      )}
    </>
  )
}

interface HomeNavItemContentProps {
  title: string
  message: string
}

const HomeNavItemContent: FunctionComponent<HomeNavItemContentProps> = ({ title, message }) => {
  return (
    <div className="home-nav-item">
      <div className="home-nav-item__header">
        <h2 className="home-nav-item__label">{title}</h2>
        <div className="home-nav-item__icon">
          <FaChevronRight />
        </div>
      </div>
      <span className="home-nav-item__description">{message}</span>
    </div>
  )
}

export default HomeNavItem
