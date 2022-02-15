import React from 'react'
import { FaTwitter } from 'react-icons/fa'

interface TweetProps {
  params: { [key: string]: string }
  className?: string
}

const TweetLarge: React.FC<TweetProps> = ({ params, className, children }) => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?${new URLSearchParams(params).toString()}`}
      target="_blank"
      rel="norefferer  noopener noreferrer"
      className={`inline-grid justify-items-center gap-1 ${className}`}
    >
      <span>{children}</span>
      <FaTwitter size="3em" />
    </a>
  )
}

export { TweetLarge }
