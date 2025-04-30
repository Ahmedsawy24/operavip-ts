import React, { useState, FormEvent } from 'react';
import styles from './IssueReceipts.module.css';

type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer';
interface Receipt {
  id: string;
  reservationId: string;
  guest: string;
  room: string;
  issueDate: string; // YYYY-MM-DD
  issueTime: string; // HH:MM AM/PM
  amount: number;    // SAR
  method: PaymentMethod;
  cardNumber?: string;
  issuedBy: string;
  notes?: string;
}

const dummyReceipts: Receipt[] = [
  {
    id: 'REC-1001',
    reservationId: 'RSV-2001',
    guest: 'Ahmed Yassin',
    room: '101',
    issueDate: '2025-06-07',
    issueTime: '10:15 AM',
    amount: 1500,
    method: 'Credit Card',
    cardNumber: '**** **** **** 1234',
    issuedBy: 'Abdulrahman A.',
    notes: 'Early checkout adjustment.'
  },
  {
    id: 'REC-1002',
    reservationId: 'RSV-2002',
    guest: 'Sarah Johnson',
    room: '205',
    issueDate: '2025-06-07',
    issueTime: '11:30 AM',
    amount: 2000,
    method: 'Cash',
    issuedBy: 'Leen E.'
  },
  {
    id: 'REC-1003',
    reservationId: 'RSV-2003',
    guest: 'Omar Hussein',
    room: '310',
    issueDate: '2025-06-07',
    issueTime: '12:45 PM',
    amount: 850,
    method: 'Bank Transfer',
    issuedBy: 'Yazeed Y.'
  }
];

const IssueReceipts: React.FC = () => {
  // Filters
  const [filterId, setFilterId] = useState('');
  const [filterResv, setFilterResv] = useState('');
  const [filterGuest, setFilterGuest] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Data
  const [filtered, setFiltered] = useState<Receipt[]>(dummyReceipts);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Receipt | null>(null);

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF'|'Excel'|'CSV'>('PDF');
  const [expMethod, setExpMethod] = useState<'All'|PaymentMethod>('All');
  const [expFrom, setExpFrom] = useState('');
  const [expTo, setExpTo] = useState('');

  // Overview counts
  const total = dummyReceipts.length;
  const todayCount = dummyReceipts.filter(r => r.issueDate === new Date().toISOString().slice(0,10)).length;
  const cashCount = dummyReceipts.filter(r => r.method === 'Cash').length;
  const cardCount = dummyReceipts.filter(r => r.method === 'Credit Card').length;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyReceipts;
    if (filterId) res = res.filter(r => r.id.includes(filterId));
    if (filterResv) res = res.filter(r => r.reservationId.includes(filterResv));
    if (filterGuest) res = res.filter(r => r.guest.toLowerCase().includes(filterGuest.toLowerCase()));
    if (dateFrom) res = res.filter(r => r.issueDate >= dateFrom);
    if (dateTo)   res = res.filter(r => r.issueDate <= dateTo);
    setFiltered(res);
  };
  const resetFilters = () => {
    setFilterId(''); setFilterResv(''); setFilterGuest(''); setDateFrom(''); setDateTo('');
    setFiltered(dummyReceipts);
  };

  // Open modals
  const openDetail = (r: Receipt) => { setSelected(r); setDetailOpen(true); };
  const openCancel = (r: Receipt) => { setSelected(r); setCancelOpen(true); };
  const openExport = () => setExportOpen(true);

  // Close all
  const closeAll = () => {
    setDetailOpen(false);
    setCancelOpen(false);
    setExportOpen(false);
    setSelected(null);
  };

  // Handle cancel
  const confirmCancel = () => {
    alert('✅ Receipt cancelled successfully!');
    closeAll();
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    alert('✅ Receipts exported successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Issue Receipts</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Check-In and Out &gt; Issue Receipts
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🔎 Find Reservations & Payments</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., REC-1001"
            value={filterId}
            onChange={e => setFilterId(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., RSV-2001"
            value={filterResv}
            onChange={e => setFilterResv(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Guest Name"
            value={filterGuest}
            onChange={e => setFilterGuest(e.target.value)}
          />
          <div className={styles.dateRange}>
            <input
              type="date"
              className={styles.input}
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
            <span>–</span>
            <input
              type="date"
              className={styles.input}
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <button className={`${styles.btn} ${styles.searchBtn}`} onClick={applyFilters}>
          🔎 Search
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Receipts
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>📈 Receipts Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Receipts</div>
            <div className={styles.cardValue}>{total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Today's Receipts</div>
            <div className={styles.cardValue}>{todayCount}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Cash Receipts</div>
            <div className={styles.cardValue}>{cashCount}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Card Receipts</div>
            <div className={styles.cardValue}>{cardCount}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>🗃️ Issued Receipts Details</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Issue Date</th>
                <th>Amount (SAR)</th>
                <th>Payment Method</th>
                <th>Issued By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.reservationId}</td>
                  <td>{r.guest}</td>
                  <td>{r.room}</td>
                  <td>{r.issueDate}</td>
                  <td>{r.amount.toLocaleString()}</td>
                  <td>
                    {r.method === 'Cash' ? '💵 Cash' :
                     r.method === 'Credit Card' ? '✅ Credit Card' :
                     '🏦 Bank Transfer'}
                  </td>
                  <td>{r.issuedBy}</td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetail(r)}
                    >
                      View
                    </button>
                    <button
                      className={`${styles.btn} ${styles.printBtn}`}
                      onClick={() => window.print()}
                    >
                      Print
                    </button>
                    <button
                      className={`${styles.btn} ${styles.cancelBtn}`}
                      onClick={() => openCancel(r)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Receipt Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>🧾 Receipt Details – {selected.id}</h2>
            <p><strong>Reservation ID:</strong> {selected.reservationId}</p>
            <p><strong>Guest Name:</strong> {selected.guest}</p>
            <p><strong>Room Number:</strong> {selected.room}</p>
            <p><strong>Check-In Date:</strong> {/* dummy */}2025-06-05</p>
            <p><strong>Check-Out Date:</strong> {/* dummy */}2025-06-07</p>
            <p><strong>Issue Date:</strong> {selected.issueDate} ({selected.issueTime})</p>
            <p><strong>Amount Paid:</strong> SAR {selected.amount}</p>
            <p><strong>Payment Method:</strong> {selected.method}</p>
            {selected.cardNumber && (
              <p><strong>Card Number:</strong> {selected.cardNumber}</p>
            )}
            <p><strong>Issued By:</strong> {selected.issuedBy}</p>
            {selected.notes && <p><strong>Additional Notes:</strong> {selected.notes}</p>}
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.printBtn}`}>Print Receipt</button>
              <button className={`${styles.btn} ${styles.exportDownloadBtn}`}>Download PDF</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>⚠️ Confirm Receipt Cancellation</h2>
            <p>
              Are you sure you want to cancel Receipt <strong>{selected.id}</strong> issued to <strong>{selected.guest}</strong>?<br/>
              <em>⚠️ This action cannot be undone.</em>
            </p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelReceiptBtn}`} onClick={confirmCancel}>
                Yes, Cancel Receipt
              </button>
              <button className={`${styles.btn} ${styles.noCancelBtn}`} onClick={closeAll}>
                No, Keep Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Receipts</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select className={styles.input} value={expFormat} onChange={e => setExpFormat(e.target.value as any)}>
                  <option>PDF</option><option>Excel</option><option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Payment Method</label>
                <select className={styles.input} value={expMethod} onChange={e => setExpMethod(e.target.value as any)}>
                  <option>All</option><option>Cash</option><option>Credit Card</option><option>Bank Transfer</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Date From</label>
                <input type="date" className={styles.input} value={expFrom} onChange={e => setExpFrom(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>Date To</label>
                <input type="date" className={styles.input} value={expTo} onChange={e => setExpTo(e.target.value)} />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.applyBtn}`}>Export</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueReceipts;
