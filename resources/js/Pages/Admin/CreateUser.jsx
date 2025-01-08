import React from "react";
import Header from "@/Components/Header";
import UserForm from "@/Components/UserForm";
  
const CreateUser = ({ user }) => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header isAdmin={true} user={user}/>
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <UserForm></UserForm>
            </div>
        </div>
    );
};

export default CreateUser;
