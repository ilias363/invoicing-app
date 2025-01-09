import React from "react";
import Header from "@/Components/Header";
import CustomerForm from "@/Components/CustomerForm";

const UpdateCustomer = ({ customerToEdit }) => {
    const customer_data = {
        first_name: customerToEdit.first_name,
        last_name: customerToEdit.last_name,
        email: customerToEdit.email,
        phone: customerToEdit.phone,
        address: customerToEdit.address,
        customer_id: customerToEdit.id,
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <CustomerForm customer_data={customer_data} toCreate={false}></CustomerForm>
            </div>
        </div>
    );
};

export default UpdateCustomer;
