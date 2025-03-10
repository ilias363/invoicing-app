import React from "react";
import Header from "@/Components/Header";
import UserForm from "@/Components/UserForm";

const CreateUser = ({roles}) => {
    const user_data = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        account_status: "active",
        role_id: "",
    };
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <UserForm user_data={user_data} toCreate={true} roles={roles}></UserForm>
            </div>
        </div>
    );
};

export default CreateUser;
