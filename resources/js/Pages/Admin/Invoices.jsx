import Header from "@/Components/Header";
import ListInvoices from "@/Components/ListInvoices";
import SubHeader from "@/Components/SubHeader";
import React, { useState } from "react";

const Invoices = ({ invoicesData }) => {

    return (
        <>
            <Header />
            <SubHeader />
            <ListInvoices invoices={invoicesData.original.data} pages={invoicesData.original.links} />
        </>
    );
};

export default Invoices;
