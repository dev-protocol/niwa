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
      className={`mr-sm rounded px-sm py-1 ${isActive ? 'bg-black from-primary to-secondary text-white' : 'bg-white'}`}
      to={path}
    >
      {title}
    </Link>
  )
}
