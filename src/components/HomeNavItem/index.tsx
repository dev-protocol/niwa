import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

interface HomeNavItemProps {
  title: string
  message: string
  path: string
}

const HomeNavItem: FunctionComponent<HomeNavItemProps> = ({ title, message, path }) => {
  return (
    <Link to={path}>
      <div className="home-nav-item">
        <div className="home-nav-item__header">
          <h2 className="home-nav-item__label">{title}</h2>
          <div className="home-nav-item__icon">
            <FaChevronRight />
          </div>
        </div>
        <span className="home-nav-item__description">{message}</span>
      </div>
    </Link>
  )
}

export default HomeNavItem
