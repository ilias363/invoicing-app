import React from "react";
import Header from "@/Components/Header";
import InvoiceForm from "@/Components/InvoiceForm";

const CreateInvoice = ({ customers, products, taxRate }) => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <InvoiceForm
                    customersData={customers}
                    productsData={products}
                    taxRate={taxRate}
                    toCreate={true}
                ></InvoiceForm>
            </div>
        </div>
    );
};

export default CreateInvoice;
