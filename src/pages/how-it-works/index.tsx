import React from 'react'

interface HomeProps {}

const Rect: React.FC = ({ children }) => {
  return <section className="relative w-full pt-[56.25%]">{children} </section>
}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="grid justify-items-center gap-sm">
      <h2 className="text-6xl font-bold">How it works</h2>
      <Rect>
        <iframe
          className="absolute inset-0 h-full w-full rounded-lg shadow"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3A5C4UFHGaY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Rect>
      <Rect>
        <iframe
          className="absolute inset-0 h-full w-full max-w-full rounded-lg shadow"
          src="https://docs.google.com/presentation/d/e/2PACX-1vTpu5hxPt_1L55_Md-jQTYYSW14-MXbEAV3oucPNNi6xqGa9z7Y7a_-qwMEKOkuvfXLoA3jgy7hNXB1/embed?start=false&loop=false&delayms=3000"
          frameBorder="0"
          width="1280"
          height="749"
          allowFullScreen
        ></iframe>
      </Rect>
    </section>
  )
}

export default Home
