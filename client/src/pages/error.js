import React from 'react'
import { useNavigate } from 'react-router-dom'
const Error = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className='min-h-[80vh] flex justify-center items-center'>
            <div className='flex flex-col'>
                <p className=' text-[10rem] m-0 text-center'>404</p>
                <p className=' text-4xl'>Oops! You've lost your way... </p>
                <button onClick={goBack} className="rounded-lg transition shadow-xl p-2 border border-black text-black bg-transparent hover:bg-black hover:text-white " >
                    Go Back
                </button>

            </div>






        </div>
    )
}

export default Error