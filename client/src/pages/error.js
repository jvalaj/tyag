import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
    return (
        <div className='min-h-[80vh] flex justify-center flex-col items-center'>
            <div>
                <p className='font-light text-[10rem]'>404</p>

            </div>
            <div>

                <p className=' text-4xl'>Oops! You've lost your way... </p>
            </div>
            <div className='mt-8 '>
                <button className="rounded-md p-2 border border-black text-black bg-transparent hover:bg-black hover:text-white " >
                    <Link to="/">Go Back</Link>
                </button>
            </div>

        </div>
    )
}

export default Error