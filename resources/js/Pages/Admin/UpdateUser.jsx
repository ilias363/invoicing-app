import React, { use } from "react";
import Header from "@/Components/Header";
import UserForm from "@/Components/UserForm";

const UpdateUser = ({ userToedit }) => {
    const user_data = {
        first_name: userToedit.first_name,
        last_name: userToedit.last_name,
        email: userToedit.email,
        phone: userToedit.phone,
        password: userToedit.password,
        password_confirmation: userToedit.password,
        account_status: "active",
        role_id: userToedit.role_id,
        user_id: userToedit.id,
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <UserForm user_data={user_data} toCreate={false}></UserForm>
            </div>
        </div>
    );
};

export default UpdateUser;
