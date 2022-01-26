import { FunctionComponent } from 'react'
import { FaYoutube } from 'react-icons/fa'

interface YouTubeFormProps {}

const YouTubeForm: FunctionComponent<YouTubeFormProps> = () => {
  return (
    <div className="flex items-center">
      <FaYoutube />
      YouTube Coming Soon!
    </div>
  )
}

export default YouTubeForm
