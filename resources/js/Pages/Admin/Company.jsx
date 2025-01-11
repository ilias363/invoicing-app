import React from "react";
import Header from "@/Components/Header";
import CompanyForm from "@/Components/CompanyForm";

const Company = ({ company }) => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <CompanyForm company={company}></CompanyForm>
            </div>
        </div>
    );
};

export default Company;
