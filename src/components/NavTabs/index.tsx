import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavTabsProps {}

export const NavTabs: React.FC<NavTabsProps> = ({ children }) => {
  return <div className="mb-md flex">{children}</div>
}

interface NavTabItemProps {
  title: string
  path: string
}

export const NavTabItem: React.FC<NavTabItemProps> = ({ title, path }) => {
  return (
    <NavLink
      end
      className={({ isActive }) =>
        `mr-sm rounded px-sm py-1 shadow ${isActive ? `bg-black from-primary to-secondary text-white` : 'bg-white'}`
      }
      to={path}
    >
      {title}
    </NavLink>
  )
}
