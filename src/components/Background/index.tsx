import { FunctionComponent } from 'react'

interface BackgroundProps {}

const Background: FunctionComponent<BackgroundProps> = () => {
  return <div className="z-0 fixed h-screen w-screen inset-0 background"></div>
}

export { Background }
