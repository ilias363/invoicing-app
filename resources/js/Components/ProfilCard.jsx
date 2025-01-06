import React from 'react';
import { useForm } from '@inertiajs/react';
import { FiLogOut } from "react-icons/fi";

function ProfileCard() {
    const { post } = useForm();

    const handleLogout = () => {
        post('/logout');
    };
    return (
        <div className="flex items-center justify-between bg-[#2A2A2A] text-white px-4 py-2 w-40">
            <div>
                <h1 className="text-lg font-bold">John Doe</h1>
                <p className="text-sm text-gray-400 text-right">Admin</p>
            </div>
            <button className="text-4xl focus:outline-none hover:text-[#ACACAC]" onClick={handleLogout}>
                <FiLogOut />
            </button>
        </div>
    );
}

export default ProfileCard;
