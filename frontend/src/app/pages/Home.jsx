import React from 'react'
import { GlobalShortcutGrid } from '../components/shortcut/GlobalShortcutGrid'
import { GlobalCategoryGrid } from '../components/category/GlobalCategryGrid'

export const Home = () => {
  return (
    <div>
      <GlobalCategoryGrid/>
      <GlobalShortcutGrid />
    </div>
  )
}
