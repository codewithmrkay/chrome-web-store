import React from 'react'
import { LogoPart } from './LeftPart.jsx'
import { LoginBtn } from './RightPart.jsx'
import { MiddlePart } from './MiddlePart.jsx'

export const Navbar = () => {
  return (
    <div className='flex items-center justify-between pb-2 gap-2 w-full mx-auto max-w-6xl'>
      <div className='justify-start'>
        <div className='flex items-center justify-center'>
          {/* sidebar togle bolte */}
          <div className='md:hidden'>
          </div>
          <div>
            <LogoPart />
          </div>
        </div>
      </div>
      <div className='w-full'>
         <MiddlePart/>
      </div>
      <div className='justify-end'>
        <LoginBtn/>
      </div>
    </div>
  )
}
