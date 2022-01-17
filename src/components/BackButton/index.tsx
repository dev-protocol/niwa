import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

interface BackButtonProps {
  title: string
  path: string
}

const BackButton: FunctionComponent<BackButtonProps> = ({ title, path }) => {
  return (
    <div className="flex w-full">
      <Link to={path}>
        <div className="flex items-center mb-2 text-blue-500">
          <FontAwesomeIcon icon={faChevronLeft} size="xs" className="mr-1" />
          <span>{title}</span>
        </div>
      </Link>
    </div>
  )
}

export default BackButton
