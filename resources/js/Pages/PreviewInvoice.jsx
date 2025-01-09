import React from "react";
import Header from "@/Components/Header";
import Preview from "@/Components/Preview";

const InvoicePreview = ({ company, invoice, docStyle, fonts }) => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-full">
                <Preview company={company} invoice={invoice} docStyle={docStyle} fonts={fonts} />
            </div>
        </div>
    );
};

export default InvoicePreview;
