import React from 'react';
import Header from '@/Components/Header';
import Histogram from '@/Components/Histogram';
import InvoiceSummary from '@/Components/InvoiceSummary';
import LogsBox from '@/Components/LogsBox';

const Home = ({logs}) => {

    const invoiceData = {
        months: ["Jan", "Feb", "Mar", "Apr"],
        validated: [120, 150, 90, 200],
        pending: [50, 30, 20, 40],
        cancelled: [10, 15, 5, 25],
    };

    const data = {
        totalInvoices: 213,
        paidInvoices: 180,
        pendingInvoices: 7,
        approvedInvoices: 192,
        cancelledInvoices: 14,
      };

    //   const logs = [
    //     { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
    //     { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
    //     { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
    //     { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
    //     { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
    //     { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
    //     { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
    //     { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
    //     { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
    //     { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
    //     { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
    //     { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
    //   ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            {/* <p>{JSON.stringify(logs.original)}</p> */}
            <Header></Header>
            <div className='flex flex-row items-center justify-center space-x-8'>
                <div className="p-6 mt-6">
                    <LogsBox logs={logs.original} />
                </div>
                <div className="flex items-center justify-center bg-white mt-6 shadow-md  border-r-8 border-[#2A2A2A]">
                    <Histogram data={invoiceData} />
                    <InvoiceSummary
                        totalInvoices={data.totalInvoices}
                        paidInvoices={data.paidInvoices}
                        pendingInvoices={data.pendingInvoices}
                        approvedInvoices={data.approvedInvoices}
                        cancelledInvoices={data.cancelledInvoices}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
