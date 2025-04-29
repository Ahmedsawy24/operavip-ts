import React, { useState, ChangeEvent } from 'react';
import styles from './CorporateAccounts.module.css';

type AccountStatus = 'Active' | 'Suspended' | 'Closed';
type InvoiceStatus = 'Paid' | 'Unpaid';
type PaymentStatus = 'Completed' | 'Pending';

interface PaymentRecord {
  date: string;
  method: string;
  amount: string;
  processedBy: string;
  notes: string;
  status: PaymentStatus;
}

interface InvoiceRecord {
  invoiceId: number;
  dateIssued: string;
  dueDate: string;
  amount: string;
  status: InvoiceStatus;
}

interface CorporateAccount {
  accountNumber: number;
  companyName: string;
  representative: string;
  contractStart: string;
  contractExpiry: string;
  contractTerms: string;
  status: AccountStatus;
  outstandingBalance: string;
  contact: string;
  address: string;
  paymentHistory: PaymentRecord[];
  invoices: InvoiceRecord[];
}

// بيانات وهمية إضافية
const dummyAccounts: CorporateAccount[] = [
  {
    accountNumber: 120001,
    companyName: 'ABC Technologies',
    representative: 'Ahmed Khaled',
    contractStart: '2025-01-01',
    contractExpiry: '2025-12-31',
    contractTerms: 'Standard contract terms apply.',
    status: 'Active',
    outstandingBalance: '$1,500.00',
    contact: '+123456789, abc@example.com',
    address: '123 Corporate Ave, City',
    paymentHistory: [
      { date: '2025-03-20', method: 'Credit Card', amount: '$500.00', processedBy: 'Omar Hamdan', notes: 'March Payment', status: 'Completed' },
      { date: '2025-02-18', method: 'Bank Transfer', amount: '$1000.00', processedBy: 'Sara Ahmed', notes: 'Initial Deposit', status: 'Completed' }
    ],
    invoices: [
      { invoiceId: 5001, dateIssued: '2025-03-01', dueDate: '2025-03-15', amount: '$500.00', status: 'Paid' },
      { invoiceId: 5002, dateIssued: '2025-04-01', dueDate: '2025-04-15', amount: '$500.00', status: 'Unpaid' }
    ]
  },
  {
    accountNumber: 120002,
    companyName: 'XYZ Corp',
    representative: 'Layla Majid',
    contractStart: '2025-02-01',
    contractExpiry: '2025-09-15',
    contractTerms: 'Special conditions apply.',
    status: 'Suspended',
    outstandingBalance: '$350.00',
    contact: '+987654321, xyz@example.com',
    address: '456 Business Rd, City',
    paymentHistory: [
      { date: '2025-03-10', method: 'Cash', amount: '$100.00', processedBy: 'Omar Hamdan', notes: 'Partial', status: 'Completed' }
    ],
    invoices: [
      { invoiceId: 6001, dateIssued: '2025-03-01', dueDate: '2025-03-10', amount: '$450.00', status: 'Unpaid' }
    ]
  },
  {
    accountNumber: 120003,
    companyName: 'Golden Supplies',
    representative: 'Sami Alawi',
    contractStart: '2025-03-01',
    contractExpiry: '2025-06-30',
    contractTerms: 'Standard contract terms apply.',
    status: 'Closed',
    outstandingBalance: '$0.00',
    contact: '+555444333, golden@example.com',
    address: '789 Industry Pkwy, City',
    paymentHistory: [],
    invoices: []
  },
  // إضافة وهمية
  {
    accountNumber: 120004,
    companyName: 'Delta Enterprises',
    representative: 'Mona Fadel',
    contractStart: '2025-01-15',
    contractExpiry: '2025-11-15',
    contractTerms: 'Premium support included.',
    status: 'Active',
    outstandingBalance: '$2,200.00',
    contact: '+222333444, delta@example.com',
    address: '321 Commerce St, City',
    paymentHistory: [
      { date: '2025-04-05', method: 'Bank Transfer', amount: '$2200.00', processedBy: 'Layla Majid', notes: 'Quarterly payment', status: 'Pending' }
    ],
    invoices: [
      { invoiceId: 7001, dateIssued: '2025-04-01', dueDate: '2025-04-10', amount: '$2200.00', status: 'Unpaid' }
    ]
  }
];

const CorporateAccounts: React.FC = () => {
  const [accounts, setAccounts]           = useState<CorporateAccount[]>(dummyAccounts);
  const [filtered, setFiltered]           = useState<CorporateAccount[]>(dummyAccounts);

  // فلاتر البحث
  const [companyFilter, setCompanyFilter] = useState('');
  const [accountFilter, setAccountFilter] = useState('');
  const [statusFilter, setStatusFilter]   = useState<AccountStatus | ''>('');
  const [expiryFrom, setExpiryFrom]       = useState('');
  const [expiryTo, setExpiryTo]           = useState('');
  const [repFilter, setRepFilter]         = useState('');

  // مودالات
  const [detailOpen, setDetailOpen]       = useState(false);
  const [paymentsOpen, setPaymentsOpen]   = useState(false);
  const [invoicesOpen, setInvoicesOpen]   = useState(false);
  const [selectedAcc, setSelectedAcc]     = useState<CorporateAccount | null>(null);

  // نموذج الدفع
  const [payDate, setPayDate]             = useState('');
  const [payAmount, setPayAmount]         = useState('');
  const [payMethod, setPayMethod]         = useState('credit-card');
  const [payReference, setPayReference]   = useState('');

  const searchAccounts = () => {
    let res = accounts.filter(a =>
      a.companyName.toLowerCase().includes(companyFilter.toLowerCase()) &&
      a.accountNumber.toString().includes(accountFilter) &&
      a.representative.toLowerCase().includes(repFilter.toLowerCase())
    );
    if (statusFilter) res = res.filter(a => a.status === statusFilter);
    if (expiryFrom)   res = res.filter(a => a.contractExpiry >= expiryFrom);
    if (expiryTo)     res = res.filter(a => a.contractExpiry <= expiryTo);
    setFiltered(res);
  };

  const viewAccountDetails = (acc: CorporateAccount) => {
    setSelectedAcc(acc);
    setDetailOpen(true);
  };
  const activateAccount = (acc: CorporateAccount) => {
    alert(`Account #${acc.accountNumber} activated!`);
  };
  const reopenAccount = (acc: CorporateAccount) => {
    alert(`Account #${acc.accountNumber} reopened!`);
  };
  const viewHistory = (acc: CorporateAccount) => {
    alert(`Viewing history for Account #${acc.accountNumber}`);
  };

  const openPaymentsModal = (acc: CorporateAccount) => {
    setSelectedAcc(acc);
    setPaymentsOpen(true);
  };
  const confirmPayment = () => {
    alert('Payment successfully processed!');
    setPaymentsOpen(false);
  };

  const openBillsModal = (acc: CorporateAccount) => {
    setSelectedAcc(acc);
    setInvoicesOpen(true);
  };
  const printInvoice = (invoiceId: number) => {
    alert(`Printing Invoice #${invoiceId}`);
  };
  const viewInvoice = (invoiceId: number) => {
    alert(`Viewing Invoice #${invoiceId}`);
  };
  const payInvoice = (invoiceId: number) => {
    alert(`Paying Invoice #${invoiceId}`);
  };

  const editAccountDetails = () => {
    alert('Editing account details...');
  };

  const closeModal = () => {
    setDetailOpen(false);
    setPaymentsOpen(false);
    setInvoicesOpen(false);
    setSelectedAcc(null);
  };

  return (
    <div className={styles.mainContainer}>

      <h1 className={styles.pageTitle}>Corporate Accounts Management</h1>
      <div className={styles.breadcrumb}>Home &gt; Accounts &gt; Corporate Accounts</div>

      <section className={styles.searchFilter}>
        <h3>🔍 Search &amp; Filter Accounts</h3>
        <div className={styles.filterContainer}>
          <input
            type="text" placeholder="Enter Company Name"
            value={companyFilter} onChange={e => setCompanyFilter(e.target.value)}
            className={styles.searchInput}
          />
          <input
            type="text" placeholder="Enter Account Number"
            value={accountFilter} onChange={e => setAccountFilter(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={statusFilter} onChange={e => setStatusFilter(e.target.value as AccountStatus)}
            className={styles.statusSelect}
          >
            <option value="">All Status</option>
            <option>Active</option><option>Suspended</option><option>Closed</option>
          </select>
          <label>Contract Expiry:</label>
          <input
            type="date" value={expiryFrom}
            onChange={e => setExpiryFrom(e.target.value)} className={styles.datePicker}
          /><span>to</span>
          <input
            type="date" value={expiryTo}
            onChange={e => setExpiryTo(e.target.value)} className={styles.datePicker}
          />
          <input
            type="text" placeholder="Enter Representative Name"
            value={repFilter} onChange={e => setRepFilter(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={searchAccounts} className={styles.applyBtn}>🔎 Apply Filters</button>
        </div>
      </section>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Account #</th>
            <th>Company Name</th>
            <th>Representative</th>
            <th>Contract Expiry</th>
            <th>Status</th>
            <th>Outstanding Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(acc => (
            <tr key={acc.accountNumber}>
              <td>{acc.accountNumber}</td>
              <td>{acc.companyName}</td>
              <td>{acc.representative}</td>
              <td>{acc.contractExpiry}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[acc.status]}`}>
                  {acc.status}
                </span>
              </td>
              <td>{acc.outstandingBalance}</td>
              <td>
                <button onClick={() => viewAccountDetails(acc)} className={styles.btnView}>View</button>
                {acc.status === 'Active' && (
                  <>
                    <button onClick={() => openPaymentsModal(acc)} className={styles.btnPayments}>Payments</button>
                    <button onClick={() => openBillsModal(acc)} className={styles.btnBills}>Bills</button>
                  </>
                )}
                {acc.status === 'Suspended' && (
                  <button onClick={() => activateAccount(acc)} className={styles.btnActivate}>Activate</button>
                )}
                {acc.status === 'Closed' && (
                  <button onClick={() => reopenAccount(acc)} className={styles.btnReopen}>Reopen</button>
                )}
                <button onClick={() => viewHistory(acc)} className={styles.btnHistory}>History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        Showing {filtered.length} of {accounts.length} entries
        <div className={styles.pages}>
          <button>Previous</button>
          <button>1</button>
          <button>2</button>
          <button>Next</button>
        </div>
      </div>

      {/* Details Modal */}
      {detailOpen && selectedAcc && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>
              Corporate Account Details – {selectedAcc.companyName} (#{selectedAcc.accountNumber})
            </h2>
            <p><strong>Company Name:</strong> {selectedAcc.companyName}</p>
            <p><strong>Account Number:</strong> {selectedAcc.accountNumber}</p>
            <p><strong>Representative:</strong> {selectedAcc.representative}</p>
            <p><strong>Phone & Email:</strong> {selectedAcc.contact}</p>
            <p><strong>Address:</strong> {selectedAcc.address}</p>
            <p><strong>Contract Start Date:</strong> {selectedAcc.contractStart}</p>
            <p><strong>Contract Expiry Date:</strong> {selectedAcc.contractExpiry}</p>
            <p><strong>Contract Terms:</strong> {selectedAcc.contractTerms}</p>
            <p><strong>Outstanding Balance:</strong> {selectedAcc.outstandingBalance}</p>
            <p><strong>Status:</strong> {selectedAcc.status}</p>
            <button onClick={editAccountDetails} className={styles.btnEdit}>Edit Details</button>
            <button onClick={closeModal} className={styles.btnClose}>Close</button>
          </div>
        </div>
      )}

      {/* Payments Modal */}
      {paymentsOpen && selectedAcc && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>
              Manage Payments – {selectedAcc.companyName} (#{selectedAcc.accountNumber})
            </h2>
            <label>Payment Date:</label>
            <input
              type="date"
              value={payDate}
              onChange={e => setPayDate(e.target.value)}
              className={styles.datePicker}
            />
            <label>Amount Paid:</label>
            <input
              type="number"
              value={payAmount}
              onChange={e => setPayAmount(e.target.value)}
              className={styles.paymentInput}
            />
            <label>Payment Method:</label>
            <select
              value={payMethod}
              onChange={e => setPayMethod(e.target.value)}
              className={styles.paymentMethod}
            >
              <option value="credit-card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
            <label>Reference/Note:</label>
            <input
              type="text"
              value={payReference}
              onChange={e => setPayReference(e.target.value)}
              className={styles.paymentInput}
            />
            <button onClick={confirmPayment} className={styles.btnConfirm}>Confirm Payment</button>
            <button onClick={closeModal} className={styles.btnClose}>Cancel</button>

            <h3>Payment History</h3>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Date</th><th>Method</th><th>Amount</th><th>Processed By</th><th>Notes</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedAcc.paymentHistory.map((p, i) => (
                  <tr key={i}>
                    <td>{p.date}</td><td>{p.method}</td><td>{p.amount}</td><td>{p.processedBy}</td><td>{p.notes}</td><td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoices Modal */}
      {invoicesOpen && selectedAcc && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>
              Invoices &amp; Billing History – {selectedAcc.companyName} (#{selectedAcc.accountNumber})
            </h2>
            <table className={styles.invoicesTable}>
              <thead>
                <tr>
                  <th>Invoice #</th><th>Date Issued</th><th>Due Date</th><th>Amount</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedAcc.invoices.map(inv => (
                  <tr key={inv.invoiceId}>
                    <td>{inv.invoiceId}</td>
                    <td>{inv.dateIssued}</td>
                    <td>{inv.dueDate}</td>
                    <td>{inv.amount}</td>
                    <td>
                      <span className={`${styles.invoiceStatus} ${styles[inv.status]}`}>
                        {inv.status === 'Paid' ? '✅ Paid' : '🔴 Unpaid'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => viewInvoice(inv.invoiceId)} className={styles.btnView}>View</button>
                      {inv.status === 'Paid'
                        ? <button onClick={() => printInvoice(inv.invoiceId)} className={styles.btnPrint}>Print</button>
                        : <button onClick={() => payInvoice(inv.invoiceId)} className={styles.btnPay}>Pay</button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default CorporateAccounts;
