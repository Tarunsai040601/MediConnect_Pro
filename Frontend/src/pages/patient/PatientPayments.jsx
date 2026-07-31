import React, { useState } from 'react';
import { FaCreditCard, FaFileInvoiceDollar, FaDownload } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import './PatientPayments.css';

const INITIAL_INVOICES = [
  { id: 'INV-40293', desc: 'Cardiology Consultation - Dr. Mitchell', date: '2026-07-20', amount: 150, status: 'unpaid' },
  { id: 'INV-39281', desc: 'Blood Count & Lipid Profile Diagnostics', date: '2026-07-22', amount: 120, status: 'paid' },
  { id: 'INV-20938', desc: 'General Consultations OPD Entry', date: '2026-07-02', amount: 80, status: 'paid' }
];

const PatientPayments = () => {
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [activeInvoice, setActiveInvoice] = useState(null);
  
  const [cardDetails, setCardDetails] = useState({
    num: '',
    expiry: '',
    cvv: '',
    holder: '',
  });

  const handleOpenPay = (inv) => {
    setActiveInvoice(inv);
    setCardDetails({ num: '', expiry: '', cvv: '', holder: '' });
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!cardDetails.num || !cardDetails.expiry || !cardDetails.cvv) {
      Swal.fire('Error', 'Please fill in credit card details.', 'error');
      return;
    }

    Swal.fire({
      title: 'Processing Payment...',
      text: 'Connecting to medical gateway clearance.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      const updated = invoices.map(inv => 
        inv.id === activeInvoice.id ? { ...inv, status: 'paid' } : inv
      );
      setInvoices(updated);
      setActiveInvoice(null);

      Swal.fire({
        title: 'Payment Complete!',
        text: 'Your balance invoice has been settled successfully.',
        icon: 'success',
        confirmButtonColor: 'var(--primary)',
      });
    }, 2000);
  };

  const handleDownloadInvoice = (id) => {
    Swal.fire({
      title: 'Invoice Downloaded',
      text: `PDF format of invoice receipt: ${id} downloaded.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="patientPayments">
      <div className="dashPageHeader">
        <h2>Invoices & Payments</h2>
        <p>Review billing charges, diagnostic fees, and settle outstanding balances.</p>
      </div>

      <Card glass className="paymentsListCard">
        <div className="paymentsTableWrap">
          <table className="dashDataTable">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Description</th>
                <th>Bill Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>#{inv.id}</td>
                  <td>
                    <div className="invDetailsRow">
                      <FaFileInvoiceDollar className="invIcon" />
                      <strong>{inv.desc}</strong>
                    </div>
                  </td>
                  <td>{inv.date}</td>
                  <td><strong className="invoiceCostText">${inv.amount}</strong></td>
                  <td>
                    <span className={`statusBadge ${inv.status}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    {inv.status === 'unpaid' ? (
                      <div className="invoiceActions">
                        <Button size="sm" onClick={() => handleOpenPay(inv)}>
                          <FaCreditCard /> Pay Bill
                        </Button>
                      </div>
                    ) : (
                      <div className="invoiceActions">
                        <button className="downloadInvoiceBtn" onClick={() => handleDownloadInvoice(inv.id)}>
                          <FaDownload /> Download
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Credit Card Input Modal Simulator */}
      {activeInvoice && (
        <div className="modalOverlay" onClick={() => setActiveInvoice(null)}>
          <div className="modalPanel glass paymentModal" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={() => setActiveInvoice(null)}>×</button>
            <h3>Settle Outstanding Bill</h3>
            <p className="payAmountLabel">Total Surcharge: <strong>${activeInvoice.amount}</strong></p>

            <form onSubmit={handleCardSubmit} className="paymentForm">
              <div className="formField">
                <label htmlFor="cardNum">Card Number</label>
                <input
                  type="text"
                  id="cardNum"
                  placeholder="4000 1234 5678 9010"
                  maxLength="19"
                  value={cardDetails.num}
                  onChange={(e) => setCardDetails({ ...cardDetails, num: e.target.value })}
                  required
                />
              </div>

              <div className="cardRowGroup">
                <div className="formField">
                  <label htmlFor="cardExpiry">Expiration Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    required
                  />
                </div>
                <div className="formField">
                  <label htmlFor="cardCvv">CVV Code</label>
                  <input
                    type="password"
                    id="cardCvv"
                    placeholder="***"
                    maxLength="3"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="formField">
                <label htmlFor="cardHolder">Cardholder Name</label>
                <input
                  type="text"
                  id="cardHolder"
                  placeholder="JOHN DOE"
                  value={cardDetails.holder}
                  onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div className="paymentFormControls">
                <Button variant="outline" type="button" onClick={() => setActiveInvoice(null)}>Cancel</Button>
                <Button type="submit">Submit Settle Payment</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPayments;
