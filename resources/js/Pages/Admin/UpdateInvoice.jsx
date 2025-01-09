import React from "react";
import Header from "@/Components/Header";
import InvoiceForm from "@/Components/InvoiceForm";

const UpdateInvoice = ({ invoice, customers, products, taxRate }) => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            {/* <pre>{JSON.stringify(invoice, null, 2)}</pre> */}
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <InvoiceForm
                    invoice_data={invoice}
                    customersData={customers}
                    productsData={products}
                    taxRate={taxRate}
                    toCreate={false}
                />
            </div>
        </div>
    );
};

export default UpdateInvoice;
