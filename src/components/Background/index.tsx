import { FunctionComponent } from 'react'

interface BackgroundProps {}

const Background: FunctionComponent<BackgroundProps> = () => {
  return <div className="background fixed inset-0 z-0 h-screen w-screen"></div>
}

export { Background }
