import { Plus } from 'lucide-react'
import React from 'react'
import { CreateNewCateGoryModal } from '../modals/CreateNewCateGoryModal'
import { UserCategoryList } from '../category/UserCategoryList'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
   const navigate = useNavigate();
      const handleExplore = () => {
          navigate('/explore');
      };
  return (
    <div className='bg-base-300 min-w-50 hidden md:flex flex-col items-center justify-start p-2 gap-3'>
      <h1 className='text-xl font-medium'>My ShorCuts</h1>
      <button onClick={handleExplore} className='btn w-full btn-neutral'>Explore</button>

      <CreateNewCateGoryModal />
      <UserCategoryList />
    </div>
  )
}
