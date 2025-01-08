import React from 'react';
import { useForm } from '@inertiajs/react';
import { FiLogOut } from "react-icons/fi";

function ProfileCard({user}) {
    const { post } = useForm();

    const handleLogout = () => {
        post('/logout');
    };
    return (
        <div className="flex items-center justify-end space-x-5 bg-[#2A2A2A] text-white px-4 py-2 w-64">
            <div className='flex flex-col items-end'>
                <h1 className="text-lg font-bold">{user.first_name}</h1>
                <h1 className="text-lg font-bold">{user.last_name}</h1>
                <p className="text-sm text-gray-400 text-right">{user.role.name}</p>
            </div>
            <button className="text-4xl focus:outline-none hover:text-[#ACACAC]" onClick={handleLogout}>
                <FiLogOut />
            </button>
        </div>
    );
}

export default ProfileCard;
