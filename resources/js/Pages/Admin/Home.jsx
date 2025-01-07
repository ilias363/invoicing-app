import React from 'react';
import Header from '@/Components/Header';
import Histogram from '@/Components/Histogram';
import InvoiceSummary from '@/Components/InvoiceSummary';
import LogsBox from '@/Components/LogsBox';

const Home = ({logs,invoicesData,roles,user}) => {
    function getLastFourMonths() {
        const now = new Date();
        const months = [];
        for (let i = 3; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(date.toLocaleString("default", { month: "long" }));
        }
        return months;
    }
    function calculateInvoiceStatuses(invoices) {
        const lastFourMonths = getLastFourMonths();
        const statusCounts = {
        Last4months: lastFourMonths,
        paid: Array(4).fill(0),
        pending: Array(4).fill(0),
        cancelled: Array(4).fill(0),
        };
    
        invoices.forEach(invoice => {
            const invoiceDate = new Date(invoice.invoice_date);
            const currentDate = new Date();
            const yearDiff = currentDate.getFullYear() - invoiceDate.getFullYear();
            const monthIndex = yearDiff * 12 + currentDate.getMonth() - invoiceDate.getMonth();
        
            const isInLastFourMonths = monthIndex >= 0 && monthIndex < 4;
        
            if (isInLastFourMonths) {
                const index = 3 - monthIndex; // Calculate the correct index for the last 4 months
                if (invoice.payment_status === "paid") statusCounts.paid[index]++;
                if (invoice.payment_status === "pending") statusCounts.pending[index]++;
                if (invoice.payment_status === "cancelled") statusCounts.cancelled[index]++;
            }
        });
        
    
        return statusCounts;
    }
    
    const invoicePaymentStatus = calculateInvoiceStatuses(invoicesData.original);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            {/* <pre >{JSON.stringify(user, null, 2)}</pre> */}
            {/* <pre className='ml-96'>{JSON.stringify(logs.original, null, 2)}</pre> */}
            <Header isAdmin={true} user={user}></Header>
            <div className='flex flex-row items-center justify-center space-x-1'>
                <div className="p-6 mt-6">
                    <LogsBox logs={logs.original} roles={roles.original} />
                </div>
                <div className="flex items-center justify-center bg-white mt-6 shadow-md  border-r-8 border-[#2A2A2A]">
                    <Histogram data={invoicePaymentStatus} />
                    <InvoiceSummary
                        totalInvoices={invoicesData.original.length}
                        paidInvoices={invoicesData.original.filter((invoice) => invoice.payment_status === "paid").length}
                        pendingInvoices={invoicesData.original.filter((invoice) => invoice.status === "pending").length}
                        approvedInvoices={invoicesData.original.filter((invoice) => invoice.status === "approved").length}
                        cancelledInvoices={invoicesData.original.filter((invoice) => invoice.status === "denied").length}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
