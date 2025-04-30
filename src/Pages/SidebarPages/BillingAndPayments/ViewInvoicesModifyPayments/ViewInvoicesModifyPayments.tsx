import React, { useState, useEffect, FormEvent } from 'react';
import styles from './ViewInvoicesModifyPayments.module.css';

type InvoiceStatus = 'Paid' | 'Partially Paid' | 'Unpaid';
type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Online';

interface Invoice {
  id: string;
  reservationId: string;
  guestName: string;
  invoiceDate: string;    // YYYY-MM-DD
  amount: number;
  paid: number;
  due: number;
  method: PaymentMethod;
  status: InvoiceStatus;
  breakdown: { label: string; amount: number }[];
}

const dummyInvoices: Invoice[] = [
  {
    id: 'INV-101',
    reservationId: 'RES-1101',
    guestName: 'Ahmed Yassin',
    invoiceDate: '2025-06-01',
    amount: 3000,
    paid: 3000,
    due: 0,
    method: 'Credit Card',
    status: 'Paid',
    breakdown: [
      { label: 'Room Charge (3 nights)', amount: 2400 },
      { label: 'Restaurant Charges', amount: 400 },
      { label: 'Taxes', amount: 200 },
    ],
  },
  {
    id: 'INV-102',
    reservationId: 'RES-1105',
    guestName: 'Sarah Johnson',
    invoiceDate: '2025-06-03',
    amount: 2500,
    paid: 1000,
    due: 1500,
    method: 'Bank Transfer',
    status: 'Partially Paid',
    breakdown: [
      { label: 'Room Charge (2 nights)', amount: 1600 },
      { label: 'Spa Service', amount: 500 },
      { label: 'Taxes', amount: 400 },
    ],
  },
  {
    id: 'INV-103',
    reservationId: 'RES-1110',
    guestName: 'Jack Martin',
    invoiceDate: '2025-06-05',
    amount: 1200,
    paid: 0,
    due: 1200,
    method: 'Online',
    status: 'Unpaid',
    breakdown: [
      { label: 'Room Charge (1 night)', amount: 800 },
      { label: 'Mini-bar', amount: 200 },
      { label: 'Taxes', amount: 200 },
    ],
  },
];

const ViewInvoicesModifyPayments: React.FC = () => {
  // state
  const [invoices, setInvoices] = useState<Invoice[]>(dummyInvoices);
  const [filtered, setFiltered] = useState<Invoice[]>(dummyInvoices);

  // search filters
  const [idFilter, setIdFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [resFilter, setResFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | InvoiceStatus>('All');
  const [methodFilter, setMethodFilter] = useState<'All' | PaymentMethod>('All');
  const [dateFilter, setDateFilter] = useState('');

  // modals
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [selected, setSelected] = useState<Invoice | null>(null);

  // modify form
  const [addAmount, setAddAmount] = useState(0);
  const [newMethod, setNewMethod] = useState<PaymentMethod>('Cash');
  const [newDate, setNewDate] = useState('');
  const [notes, setNotes] = useState('');

  // apply filters
  useEffect(() => {
    setFiltered(
      invoices.filter((inv) => {
        if (idFilter && !inv.id.includes(idFilter)) return false;
        if (guestFilter && !inv.guestName.toLowerCase().includes(guestFilter.toLowerCase())) return false;
        if (resFilter && !inv.reservationId.includes(resFilter)) return false;
        if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
        if (methodFilter !== 'All' && inv.method !== methodFilter) return false;
        if (dateFilter && inv.invoiceDate !== dateFilter) return false;
        return true;
      })
    );
  }, [idFilter, guestFilter, resFilter, statusFilter, methodFilter, dateFilter, invoices]);

  // handlers
  const openDetails = (inv: Invoice) => { setSelected(inv); setDetailsOpen(true); };
  const closeDetails = () => setDetailsOpen(false);

  const openModify = (inv: Invoice) => {
    setSelected(inv);
    setAddAmount(0);
    setNewMethod('Cash');
    setNewDate('');
    setNotes('');
    setModifyOpen(true);
  };
  const closeModify = () => setModifyOpen(false);

  const handleModifySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (addAmount <= 0 || !newDate) {
      alert('⚠️ Please enter amount and date!');
      return;
    }
    if (addAmount > selected.due) {
      alert('⚠️ Payment exceeds due amount!');
      return;
    }
    // update invoice
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === selected.id
          ? {
              ...inv,
              paid: inv.paid + addAmount,
              due: inv.due - addAmount,
              method: newMethod,
              status: inv.due - addAmount === 0 ? 'Paid' : 'Partially Paid',
            }
          : inv
      )
    );
    alert('✅ Payment updated successfully!');
    closeModify();
  };

  return (
    <div className={styles.container}>
      {/* header */}
      <h1 className={styles.pageTitle}>View Invoices &amp; Modify Payments</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Billing &amp; Payments &gt; View Invoices &amp; Modify Payments
      </div>

      {/* search filters */}
      <section className={styles.searchSection}>
        <h2>🔎 Search Invoices</h2>
        <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.fieldsGrid}>
            <div>
              <label>Invoice Number</label>
              <input
                className={styles.input}
                placeholder="Enter Invoice Number"
                value={idFilter}
                onChange={(e) => setIdFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Guest Name</label>
              <input
                className={styles.input}
                placeholder="Enter Guest Name"
                value={guestFilter}
                onChange={(e) => setGuestFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Reservation ID</label>
              <input
                className={styles.input}
                placeholder="Enter Reservation ID"
                value={resFilter}
                onChange={(e) => setResFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Invoice Status</label>
              <select
                className={styles.input}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option>All</option>
                <option>Paid</option>
                <option>Partially Paid</option>
                <option>Unpaid</option>
              </select>
            </div>
            <div>
              <label>Payment Method</label>
              <select
                className={styles.input}
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value as any)}
              >
                <option>All</option>
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Online</option>
              </select>
            </div>
            <div>
              <label>Invoice Date</label>
              <input
                type="date"
                className={styles.input}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          <button className={`${styles.btn} ${styles.searchBtn}`}>🔍 Search Invoices</button>
        </form>
      </section>

      {/* invoice table */}
      <section className={styles.resultsSection}>
        <h2>Invoice Results</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  'Invoice No',
                  'Reservation ID',
                  'Guest Name',
                  'Invoice Date',
                  'Amount (TL)',
                  'Paid (TL)',
                  'Due (TL)',
                  'Method',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.reservationId}</td>
                  <td>{inv.guestName}</td>
                  <td>{inv.invoiceDate}</td>
                  <td>{inv.amount.toLocaleString()}</td>
                  <td>{inv.paid.toLocaleString()}</td>
                  <td>{inv.due.toLocaleString()}</td>
                  <td>
                    {inv.method}{' '}
                    <span className={styles.methodBadge}>
                      {inv.method === 'Cash' && '💵'}
                      {inv.method === 'Credit Card' && '💳'}
                      {inv.method === 'Bank Transfer' && '🏦'}
                      {inv.method === 'Online' && '🌐'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={[
                        inv.status === 'Paid'
                          ? styles.statusPaid
                          : inv.status === 'Partially Paid'
                          ? styles.statusPartial
                          : styles.statusUnpaid,
                      ].join(' ')}
                    >
                      {inv.status === 'Paid'
                        ? '✅ Paid'
                        : inv.status === 'Partially Paid'
                        ? '⚠️ Partially Paid'
                        : '❌ Unpaid'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetails(inv)}
                    >
                      View
                    </button>
                    <button
                      className={`${styles.btn} ${styles.modifyBtn}`}
                      onClick={() => openModify(inv)}
                    >
                      Modify Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Details Modal */}
      {detailsOpen && selected && (
        <div
          className={styles.modalOverlay}
          onClick={closeDetails}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={closeDetails}
            >
              &times;
            </span>
            <h2>
              Invoice Details – {selected.id}
            </h2>
            <p><strong>Reservation ID:</strong> {selected.reservationId}</p>
            <p><strong>Guest Name:</strong> {selected.guestName}</p>
            <p><strong>Invoice Date:</strong> {selected.invoiceDate}</p>
            <p><strong>Total Amount:</strong> {selected.amount.toLocaleString()} TL</p>
            <p><strong>Paid Amount:</strong> {selected.paid.toLocaleString()} TL</p>
            <p><strong>Due Amount:</strong> {selected.due.toLocaleString()} TL</p>
            <p><strong>Payment Method:</strong> {selected.method}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <h3>Invoice Breakdown:</h3>
            <ul className={styles.breakdownList}>
              {selected.breakdown.map((b, i) => (
                <li key={i}>
                  {b.label}: {b.amount.toLocaleString()} TL
                </li>
              ))}
            </ul>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={closeDetails}
              >
                Close
              </button>
              <button
                className={`${styles.btn} ${styles.modifyBtn}`}
                onClick={() => { closeDetails(); openModify(selected); }}
              >
                Modify Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Payment Modal */}
      {modifyOpen && selected && (
        <div
          className={styles.modalOverlay}
          onClick={closeModify}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={closeModify}
            >
              &times;
            </span>
            <h2>
              Modify Payment – {selected.id}
            </h2>
            <form
              className={styles.editForm}
              onSubmit={handleModifySubmit}
            >
              <p><strong>Total:</strong> {selected.amount.toLocaleString()} TL</p>
              <p><strong>Paid:</strong> {selected.paid.toLocaleString()} TL</p>
              <p><strong>Due:</strong> {selected.due.toLocaleString()} TL</p>

              <div className={styles.formRow}>
                <label>Add Payment</label>
                <input
                  type="number"
                  className={styles.input}
                  value={addAmount}
                  onChange={(e) => setAddAmount(Number(e.target.value))}
                  min={1}
                  max={selected.due}
                />
              </div>

              <div className={styles.formRow}>
                <label>Payment Method</label>
                <select
                  className={styles.input}
                  value={newMethod}
                  onChange={(e) => setNewMethod(e.target.value as PaymentMethod)}
                >
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>Online</option>
                </select>
              </div>

              <div className={styles.formRow}>
                <label>Payment Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <label>Notes (optional)</label>
                <textarea
                  className={styles.input}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.saveBtn}`}
                >
                  Save Payment
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={closeModify}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInvoicesModifyPayments;
