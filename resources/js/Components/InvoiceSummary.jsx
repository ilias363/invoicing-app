import React from 'react';
import PropTypes from 'prop-types';

const InvoiceSummary = ({ totalInvoices, paidInvoices, pendingInvoices, approvedInvoices, cancelledInvoices }) => {
  return (
    <div className='flex flex-col justify-center text-right bg-white p-4 w-auto'>
      <div className='flex flex-col mr-4 text-2xl'>
        <p>Total Invoices</p>
        <div className='font-extrabold'>{totalInvoices}</div>
      </div>
      <div className='flex flex-col mr-4 text-2xl pt-8 '>
        <p>Paid Invoices</p>
        <div className='font-extrabold'>{paidInvoices}</div>
      </div>
      <div className='flex flex-col mr-4 text-2xl pt-8'>
        <p>Pending Invoices</p>
        <div className='font-extrabold'>{pendingInvoices}</div>
      </div>
      <div className='flex flex-col mr-4 text-2xl pt-8'>
        <p>Approved Invoices</p>
        <div className='font-extrabold'>{approvedInvoices}</div>
      </div>
      <div className='flex flex-col mr-4 text-2xl pt-8'>
        <p>Cancelled Invoices</p>
        <div className='font-extrabold'>{cancelledInvoices}</div>
      </div>
    </div>
  );
};

InvoiceSummary.propTypes = {
  totalInvoices: PropTypes.number.isRequired,
  paidInvoices: PropTypes.number.isRequired,
  pendingInvoices: PropTypes.number.isRequired,
  approvedInvoices: PropTypes.number.isRequired,
  cancelledInvoices: PropTypes.number.isRequired,
};

export default InvoiceSummary;
