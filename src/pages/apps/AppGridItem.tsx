import React from 'react'
import Card from '../../components/Card'

interface AppGridItemProps {
  title: string
  url: string
  description: string
  logo: string
}

const AppGridItem: React.FC<AppGridItemProps> = ({ title, url, description, logo }) => {
  return (
    <Card>
      <div className="flex flex-col">
        <div className="mb-sm flex">
          <div className="flex items-center">
            <div className="h-8 w-8">
              <img src={logo} />
            </div>
          </div>

          <div className="ml-sm flex flex-col">
            <span className="text-xl font-bold">{title}</span>
            <a className="text-link" href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </div>
        </div>
        <span>{description}</span>
      </div>
    </Card>
  )
}

export default AppGridItem
