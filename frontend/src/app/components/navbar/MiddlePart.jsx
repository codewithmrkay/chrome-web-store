import React from 'react'
import {toast} from "react-hot-toast"
export const MiddlePart = () => {
    return (
        <div>
            <div className='hidden md:flex items-center justify-center gap-4 w-full max-w-2xl mx-auto'>
                <div className='w-full'>
                    <label className="floating-label">
                        <input type="text" placeholder="Enter Name" className="input input-md w-full" />
                        <span className='text-lg'>Enter Name</span>
                    </label>
                </div>
                <div className='w-full'>
                    <label className="floating-label">
                        <input type="text" placeholder="Enter Url" className="input input-md w-full" />
                        <span className='text-lg'>Enter Url</span>
                    </label>
                </div>
                <div>
                    <button
                    className='btn btn-neutral btn-md'>ADD</button>
                </div>
            </div>
            <div className='flex w-fit ml-auto md:hidden'>
               <button className='btn btn-neutral btn-md'>Create New ShortCut</button>
            </div>
        </div>
    )
}
