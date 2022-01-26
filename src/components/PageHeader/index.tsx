import { FunctionComponent } from 'react'

interface PageHeaderProps {
  title: string
  styleOverride?: { [key: string]: string }
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ title, styleOverride }) => {
  const classes = `text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 w-full mb-6`

  return (
    <h1 className={classes} style={styleOverride}>
      {title}
    </h1>
  )
}

export default PageHeader
