import React from 'react'
import { GlobalShortcutGrid } from '../components/shortcut/GlobalShortcutGrid'
import { GlobalCategoryGrid } from '../components/category/GlobalCategryGrid'

export const Explore = () => {
  return (
    <div>
      <GlobalCategoryGrid/>
      <GlobalShortcutGrid />
    </div>
  )
}
