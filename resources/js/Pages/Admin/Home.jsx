import React from 'react';
import Header from '@/Components/Header';
import SubHeader from '@/Components/SubHeader';
import Histogram from '@/Components/Histogram';
import InvoiceSummary from '@/Components/InvoiceSummary';
import LogsBox from '@/Components/LogsBox';

const Home = () => {

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

      const logs = [
        { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
        { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
        { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
        { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
        { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
        { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
        { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
        { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
        { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
        { title: 'John Doe on Invoice 001', description: 'modify modify modify modify modify' },
        { title: 'Jane Smith on Invoice 002', description: 'created a new invoice' },
        { title: 'Admin on Invoice 003', description: 'deleted the invoice' },
      ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header></Header>
            <div className='flex flex-row items-center justify-center space-x-8'>
                <div className="p-6 mt-6">
                    <LogsBox logs={logs} />
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
            {/* <div className="bg-white shadow-lg rounded-lg p-12 max-w-lg w-full text-center mt-12">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
                    Welcome to Home Admin
                </h1>
                {user ? (
                    <>
                        <p className="text-lg text-gray-700 mb-4">
                            Hello, {user.first_name + ' ' + user.last_name}! You are logged in.
                        </p>
                        <p className="text-lg text-gray-600 mb-4">
                            Email: {user.email}
                        </p>
                    </>
                ) : (
                    <p className="text-lg text-gray-700 mb-4">
                        You are not logged in.
                    </p>
                )}
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div> */}
        </div>
    );
};

export default Home;
