import React from 'react'
import UserMenu from '../../components/userMenu'
const Profile = () => {
    return (
        <div>
            <div style={{ fontFamily: 'Poppins' }} className='mx-auto max-w-screen-lg h-[80vh] p-3 bg-gray-200 rounded-lg'>
                <p className='block font-bold text-center text-2xl m-2 bg-gray-300 rounded-lg p-2'> User Dashboard</p>
                <div className="sm:grid sm:grid-cols-[30%_70%] p-2">
                    <UserMenu />
                    <div className="bg-gray-300 h-[50vh] rounded-lg mt-3 sm:mt-0 sm:ml-4 p-2">
                        Profile
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile