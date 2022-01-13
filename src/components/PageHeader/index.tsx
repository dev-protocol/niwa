import { FunctionComponent } from 'react'

interface PageHeaderProps {
  title: string
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 w-full mb-6">
      {title}
    </h1>
  )
}

export default PageHeader
