import { Plus } from 'lucide-react'
import React from 'react'
import { CreateNewCateGoryModal } from '../modals/CreateNewCateGoryModal'
import { UserCategoryList } from '../category/UserCategoryList'

export const Sidebar = () => {
  return (
    <div className='bg-base-300 min-w-50 hidden md:flex flex-col items-center justify-start p-2 gap-3'>
      <h1 className='text-xl font-medium'>My ShorCuts</h1> 
      <CreateNewCateGoryModal />
      <UserCategoryList />
    </div>
  )
}
