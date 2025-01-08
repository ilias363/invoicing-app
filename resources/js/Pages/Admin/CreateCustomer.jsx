import React from "react";
import Header from "@/Components/Header";
import CustomerForm from "@/Components/CustomerForm";

const CreateCustomer = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <CustomerForm></CustomerForm>
            </div>
        </div>
    );
};

export default CreateCustomer;
