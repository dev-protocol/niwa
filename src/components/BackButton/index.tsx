import { FunctionComponent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import HSButton from '../HSButton'

interface BackButtonProps {
  title: string
  path: string
}

const BackButton: FunctionComponent<BackButtonProps> = ({ title, path }) => {
  return (
    <div className="mb-md">
      <HSButton link={path} type="outlined neutral" icon={<FaChevronLeft />}>
        {title}
      </HSButton>
    </div>
  )
}

export default BackButton
