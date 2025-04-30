import React, { useState, FormEvent } from 'react';
import styles from './FinalizePaymentsAndBalances.module.css';

type PaymentStatus = 'Pending' | 'Partial' | 'Completed';
type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer';

interface Reservation {
  id: string;
  guest: string;
  room: string;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  total: number;     // SAR
  paid: number;      // SAR
  balance: number;   // SAR
  status: PaymentStatus;
  breakdown: { label: string; amount: number }[];
  processedBy?: string;
  paymentDate?: string;
  paymentMethod?: PaymentMethod;
}

const dummyReservations: Reservation[] = [
  {
    id: 'RSV-1234',
    guest: 'Ahmed Yassin',
    room: '101',
    checkIn: '2025-06-07',
    checkOut: '2025-06-10',
    total: 3500,
    paid: 2500,
    balance: 1000,
    status: 'Partial',
    breakdown: [
      { label: 'Accommodation', amount: 3000 },
      { label: 'Minibar', amount: 250 },
      { label: 'Laundry', amount: 150 },
      { label: 'Miscellaneous', amount: 100 }
    ]
  },
  {
    id: 'RSV-1235',
    guest: 'Sarah Johnson',
    room: '205',
    checkIn: '2025-06-05',
    checkOut: '2025-06-09',
    total: 2000,
    paid: 0,
    balance: 2000,
    status: 'Pending',
    breakdown: [
      { label: 'Accommodation', amount: 1800 },
      { label: 'F&B', amount: 200 }
    ]
  },
  {
    id: 'RSV-1236',
    guest: 'Omar Hussein',
    room: '310',
    checkIn: '2025-06-03',
    checkOut: '2025-06-08',
    total: 1800,
    paid: 1800,
    balance: 0,
    status: 'Completed',
    breakdown: [
      { label: 'Accommodation', amount: 1500 },
      { label: 'Spa', amount: 300 }
    ],
    processedBy: 'Abdulrahman Ahmed',
    paymentDate: '2025-06-08',
    paymentMethod: 'Credit Card'
  }
];

const FinalizePaymentsAndBalances: React.FC = () => {
  // Filters
  const [resvFilter, setResvFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | PaymentStatus>('All');

  // Data
  const [filtered, setFiltered] = useState<Reservation[]>(dummyReservations);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [finalizeOpen, setFinalizeOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Reservation | null>(null);

  // Finalize form
  const [payMethod, setPayMethod] = useState<PaymentMethod>('Cash');
  const [payAmount, setPayAmount] = useState('');
  const [payDate, setPayDate] = useState('');
  const [txId, setTxId] = useState('');
  const [payNotes, setPayNotes] = useState('');

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [expStatus, setExpStatus] = useState<'All' | PaymentStatus>('All');
  const [expDateFrom, setExpDateFrom] = useState('');
  const [expDateTo, setExpDateTo] = useState('');

  // Overview counts
  const totalRes = dummyReservations.length;
  const pending = dummyReservations.filter(r => r.status === 'Pending').length;
  const partial = dummyReservations.filter(r => r.status === 'Partial').length;
  const completed = dummyReservations.filter(r => r.status === 'Completed').length;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyReservations;
    if (resvFilter) res = res.filter(r => r.id.includes(resvFilter));
    if (guestFilter) res = res.filter(r => r.guest.toLowerCase().includes(guestFilter.toLowerCase()));
    if (roomFilter) res = res.filter(r => r.room.includes(roomFilter));
    if (statusFilter !== 'All') res = res.filter(r => r.status === statusFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setResvFilter(''); setGuestFilter(''); setRoomFilter(''); setStatusFilter('All');
    setFiltered(dummyReservations);
  };

  // Open modals
  const openDetail = (r: Reservation) => { setSelected(r); setDetailOpen(true); };
  const openFinalize = (r: Reservation) => {
    setSelected(r);
    setPayMethod('Cash');
    setPayAmount('');
    setPayDate('');
    setTxId('');
    setPayNotes('');
    setFinalizeOpen(true);
  };
  const openReceipt = (r: Reservation) => { setSelected(r); setReceiptOpen(true); };
  const openExport = () => setExportOpen(true);

  // Close all
  const closeAll = () => {
    setDetailOpen(false);
    setFinalizeOpen(false);
    setReceiptOpen(false);
    setExportOpen(false);
    setSelected(null);
  };

  // Handle finalize
  const handleFinalize = (e: FormEvent) => {
    e.preventDefault();
    if (!payAmount || !payDate) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    const amt = parseFloat(payAmount);
    if (selected && amt > selected.balance) {
      alert('⚠️ Amount exceeds the outstanding balance!');
      return;
    }
    alert('✅ Payment finalized successfully!');
    closeAll();
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    alert('✅ Payment data exported successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>
        Finalize Payments and Check Pending Balances
      </h1>
      <div className={styles.breadcrumb}>
        Home &gt; Check-In and Out &gt; Finalize Payments and Check Pending Balances
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🔎 Find Guest & Reservations</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., RSV-1234"
            value={resvFilter}
            onChange={e => setResvFilter(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Guest Full Name"
            value={guestFilter}
            onChange={e => setGuestFilter(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., 204"
            value={roomFilter}
            onChange={e => setRoomFilter(e.target.value)}
          />
          <select
            className={styles.input}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Partial</option>
            <option>Completed</option>
          </select>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Search
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Payment Data
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>📌 Payment Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Reservations</div>
            <div className={styles.cardValue}>{totalRes}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Pending Balances</div>
            <div className={styles.cardValue}>{pending}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Partially Paid</div>
            <div className={styles.cardValue}>{partial}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Fully Paid</div>
            <div className={styles.cardValue}>{completed}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>🗃️ Detailed Payment & Balances</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Check-Out Date</th>
                <th>Total (SAR)</th>
                <th>Paid (SAR)</th>
                <th>Balance (SAR)</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.guest}</td>
                  <td>{r.room}</td>
                  <td>{r.checkOut}</td>
                  <td>{r.total.toLocaleString()}</td>
                  <td>{r.paid.toLocaleString()}</td>
                  <td>{r.balance.toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        r.status === 'Pending'
                          ? styles.badgeOrange
                          : r.status === 'Partial'
                          ? styles.badgePurple
                          : styles.badgeGreen
                      }
                    >
                      {r.status === 'Pending'
                        ? '🟠 Pending'
                        : r.status === 'Partial'
                        ? '🟣 Partial'
                        : '🟢 Completed'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetail(r)}
                    >
                      View
                    </button>
                    {(r.status === 'Pending' || r.status === 'Partial') && (
                      <button
                        className={`${styles.btn} ${styles.finalizeBtn}`}
                        onClick={() => openFinalize(r)}
                      >
                        Finalize
                      </button>
                    )}
                    {r.status === 'Completed' && (
                      <button
                        className={`${styles.btn} ${styles.receiptBtn}`}
                        onClick={() => openReceipt(r)}
                      >
                        View Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📝 Payment Details – {selected.id}</h2>
            <p><strong>Guest Name:</strong> {selected.guest}</p>
            <p><strong>Room Number:</strong> {selected.room}</p>
            <p><strong>Check-In:</strong> {selected.checkIn}</p>
            <p><strong>Check-Out:</strong> {selected.checkOut}</p>
            <p><strong>Total Charges:</strong> SAR {selected.total}</p>
            <ul className={styles.breakdownList}>
              {selected.breakdown.map((b,i) => (
                <li key={i}>{b.label}: SAR {b.amount}</li>
              ))}
            </ul>
            <p><strong>Amount Paid:</strong> SAR {selected.paid}</p>
            <p><strong>Balance Due:</strong> SAR {selected.balance}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Finalize Payment Modal */}
      {finalizeOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>💳 Finalize Payment – {selected.id}</h2>
            <form className={styles.form} onSubmit={handleFinalize}>
              <div className={styles.formRow}>
                <label>Payment Method</label>
                <select className={styles.input} value={payMethod} onChange={e => setPayMethod(e.target.value as any)}>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Amount (Max SAR {selected.balance})</label>
                <input
                  type="number"
                  className={styles.input}
                  value={payAmount}
                  onChange={e => setPayAmount(e.target.value)}
                  max={selected.balance}
                />
              </div>
              <div className={styles.formRow}>
                <label>Payment Date</label>
                <input type="date" className={styles.input} value={payDate} onChange={e => setPayDate(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>Transaction ID (optional)</label>
                <input type="text" className={styles.input} value={txId} onChange={e => setTxId(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>Notes (optional)</label>
                <textarea className={styles.input} value={payNotes} onChange={e => setPayNotes(e.target.value)} />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.finalizeBtn}`}>Confirm Payment</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>🧾 Payment Receipt – {selected.id}</h2>
            <p><strong>Guest Name:</strong> {selected.guest}</p>
            <p><strong>Room:</strong> {selected.room}</p>
            <p><strong>Check-Out:</strong> {selected.checkOut}</p>
            <p><strong>Method:</strong> {selected.paymentMethod}</p>
            <p><strong>Total Paid:</strong> SAR {selected.paid}</p>
            <p><strong>Payment Date:</strong> {selected.paymentDate}</p>
            <p><strong>Processed by:</strong> {selected.processedBy}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.printBtn}`}>Print Receipt</button>
              <button className={`${styles.btn} ${styles.exportBtn}`}>Download PDF</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Payment Data</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select className={styles.input} value={expFormat} onChange={e => setExpFormat(e.target.value as any)}>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Payment Status</label>
                <select className={styles.input} value={expStatus} onChange={e => setExpStatus(e.target.value as any)}>
                  <option>All</option>
                  <option>Pending</option>
                  <option>Partial</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Date From</label>
                <input type="date" className={styles.input} value={expDateFrom} onChange={e => setExpDateFrom(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>Date To</label>
                <input type="date" className={styles.input} value={expDateTo} onChange={e => setExpDateTo(e.target.value)} />
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

export default FinalizePaymentsAndBalances;
