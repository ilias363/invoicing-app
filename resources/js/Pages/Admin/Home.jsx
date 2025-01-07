import React from 'react';
import Header from '@/Components/Header';
import Histogram from '@/Components/Histogram';
import InvoiceSummary from '@/Components/InvoiceSummary';
import LogsBox from '@/Components/LogsBox';

const Home = ({logs,invoicesData}) => {

    const invoice = {
        Last4months: ["Jan", "Feb", "Mar", "Apr"],
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

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <pre className='ml-96'>{JSON.stringify(invoicesData.original, null, 2)}</pre>
            {/* <Header></Header>
            <div className='flex flex-row items-center justify-center space-x-8'>
                <div className="p-6 mt-6">
                    <LogsBox logs={logs.original} />
                </div>
                <div className="flex items-center justify-center bg-white mt-6 shadow-md  border-r-8 border-[#2A2A2A]">
                    <Histogram data={invoice} />
                    <InvoiceSummary
                        totalInvoices={data.totalInvoices}
                        paidInvoices={data.paidInvoices}
                        pendingInvoices={data.pendingInvoices}
                        approvedInvoices={data.approvedInvoices}
                        cancelledInvoices={data.cancelledInvoices}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default Home;
