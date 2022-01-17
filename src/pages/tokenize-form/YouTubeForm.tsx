import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

interface YouTubeFormProps {}

const YouTubeForm: FunctionComponent<YouTubeFormProps> = () => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faYoutube} className="mr-1" style={{ color: '#e93323' }} />
      YouTube Coming Soon!
    </div>
  )
}

export default YouTubeForm
