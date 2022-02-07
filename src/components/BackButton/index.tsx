import { FunctionComponent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface BackButtonProps {
  title: string
  path: string
}

const BackButton: FunctionComponent<BackButtonProps> = ({ title, path }) => {
  return (
    <Link to={path} className="flex items-center mb-4">
      <FaChevronLeft size="12" />
      <span className="ml-1">{title}</span>
    </Link>
  )
}

export default BackButton
