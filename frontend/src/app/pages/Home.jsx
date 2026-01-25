import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserShortcutGrid } from '../components/shortcut/UserShortcutGrid';

export const Home = () => {
  return (
    <div>
      <UserShortcutGrid/>
    </div>
  )
}
