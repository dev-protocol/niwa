import { FunctionComponent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface BackButtonProps {
  title: string
  path: string
}

const BackButton: FunctionComponent<BackButtonProps> = ({ title, path }) => {
  return (
    <div className="float-left w-full">
      <Link to={path} className="float-left mb-sm flex items-center">
        <FaChevronLeft size="12" />
        <span className="ml-1">{title}</span>
      </Link>
    </div>
  )
}

export default BackButton
