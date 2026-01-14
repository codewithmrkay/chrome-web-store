import { Plus } from 'lucide-react'
import React from 'react'
import { CreateNewCateGoryModal } from '../modals/CreateNewCateGoryModal'

export const Sidebar = () => {
  return (
    <div className='bg-base-300 min-w-50 hidden md:flex flex-col items-center justify-start p-2 gap-3'>
      <h1>My ShorCuts</h1>
      <button
        onClick={() => document.getElementById('my_modal_5').showModal()}
        className='btn btn-secondary btn-sm uppercase'>
        <span>
          <Plus size={15} />
        </span>
        create new Category
      </button>
      <CreateNewCateGoryModal />
    </div>
  )
}
