import React from 'react';
import Header from '@/Components/Header';
import SubHeader from '@/Components/SubHeader';
import InvoiceForm from '@/Components/InvoiceForm';

const CreateInvoice = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header></Header>
            <div className='flex flex-row items-center justify-center w-[1300px]'>
                <InvoiceForm></InvoiceForm>
            </div>
        </div>
    );
};

export default CreateInvoice;
