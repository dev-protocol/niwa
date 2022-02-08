import React from 'react'
import { Link } from 'react-router-dom'

interface NavTabsProps {}

export const NavTabs: React.FC<NavTabsProps> = ({ children }) => {
  return <div className="flex mb-md">{children}</div>
}

interface NavTabItemProps {
  title: string
  path: string
  isActive: boolean
}

export const NavTabItem: React.FC<NavTabItemProps> = ({ title, path, isActive }) => {
  return (
    <Link
      className={`mr-sm rounded px-sm py-1 ${
        isActive ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'bg-white text-blue-500'
      }`}
      to={path}
    >
      {title}
    </Link>
  )
}
