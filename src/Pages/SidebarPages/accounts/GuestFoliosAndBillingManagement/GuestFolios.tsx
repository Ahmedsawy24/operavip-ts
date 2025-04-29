import React, { useState, ChangeEvent } from 'react';
import styles from './GuestFolios.module.css';

type FolioStatus = 'Unpaid' | 'Paid' | 'Pending';
type PaymentMethod = 'credit-card' | 'cash' | 'bank-transfer';

interface FolioItem {
  name: string;
  amount: string;
}

interface GuestFolio {
  folioId: number;
  guestName: string;
  roomNumber: string;
  balance: string;
  dateCreated: string; // YYYY-MM-DD
  status: FolioStatus;
  items: FolioItem[];
}

// بيانات وهمية إضافية
const dummyFolios: GuestFolio[] = [
  {
    folioId: 10445,
    guestName: 'Omar Ali',
    roomNumber: '305',
    balance: '$250.00',
    dateCreated: '2025-03-18',
    status: 'Unpaid',
    items: [
      { name: 'Room Charges', amount: '$200' },
      { name: 'Mini Bar',      amount: '$50' }
    ]
  },
  {
    folioId: 10446,
    guestName: 'Sara Ahmed',
    roomNumber: '702',
    balance: '$120.00',
    dateCreated: '2025-03-17',
    status: 'Paid',
    items: [
      { name: 'Room Charges',   amount: '$100' },
      { name: 'Room Service',    amount: '$20' }
    ]
  },
  {
    folioId: 10447,
    guestName: 'John Doe',
    roomNumber: '412',
    balance: '$500.00',
    dateCreated: '2025-03-16',
    status: 'Pending',
    items: [
      { name: 'Room Charges',      amount: '$300' },
      { name: 'Laundry Service',    amount: '$50' },
      { name: 'Transport',          amount: '$150' }
    ]
  },
  // إضافات وهمية
  {
    folioId: 10448,
    guestName: 'Lina Kim',
    roomNumber: '101',
    balance: '$75.00',
    dateCreated: '2025-04-01',
    status: 'Unpaid',
    items: [{ name: 'Spa Service', amount: '$75' }]
  },
  {
    folioId: 10449,
    guestName: 'Mark Lee',
    roomNumber: '305',
    balance: '$0.00',
    dateCreated: '2025-04-02',
    status: 'Paid',
    items: [
      { name: 'Room Charges',    amount: '$220' },
      { name: 'Dinner Buffet',    amount: '$0 (complimentary)' }
    ]
  }
];

const GuestFolios: React.FC = () => {
  const [allFolios, setAllFolios]     = useState<GuestFolio[]>(dummyFolios);
  const [filtered, setFiltered]       = useState<GuestFolio[]>(dummyFolios);

  // فلترة
  const [query, setQuery]             = useState('');
  const [roomFilter, setRoomFilter]   = useState('');
  const [dateFilter, setDateFilter]   = useState('');
  const [statusFilter, setStatusFilter] = useState<FolioStatus | ''>('');

  // مودالات
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selected, setSelected]       = useState<GuestFolio | null>(null);

  // بيانات الدفع
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [cardNumber,    setCardNumber    ] = useState('');
  const [expiryDate,    setExpiryDate    ] = useState('');
  const [cvv,           setCvv           ] = useState('');
  const [paymentDate,   setPaymentDate   ] = useState('');

  // بحث وتصفية
  const searchFolios = () => {
    let res = allFolios.filter(f =>
      f.guestName.toLowerCase().includes(query.toLowerCase()) ||
      f.folioId.toString().includes(query) ||
      f.roomNumber.includes(query)
    );
    if (roomFilter)    res = res.filter(f => f.roomNumber === roomFilter);
    if (dateFilter)    res = res.filter(f => f.dateCreated === dateFilter);
    if (statusFilter)  res = res.filter(f => f.status === statusFilter);
    setFiltered(res);
  };

  // عرض التفاصيل
  const viewDetails = (folio: GuestFolio) => {
    setSelected(folio);
    setDetailsOpen(true);
  };

  // فتح نافذة الدفع
  const openPayment = (folio: GuestFolio) => {
    setSelected(folio);
    setPaymentOpen(true);
  };

  // تأكيد الدفع
  const confirmPayment = () => {
    if (!selected) return;
    const newStatus: FolioStatus = 'Paid';  // نؤكد هنا النوع
    const updated: GuestFolio[] = allFolios.map(f =>
      f.folioId === selected.folioId
        ? { ...f, status: newStatus }
        : f
    );
    setAllFolios(updated);
    setFiltered(updated.filter(f => filtered.some(x => x.folioId === f.folioId)));
    setPaymentOpen(false);
  };

  const closeModals = () => {
    setDetailsOpen(false);
    setPaymentOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles.mainContainer}>

      <h1 className={styles.pageTitle}>
        Guest Folios &amp; Billing Management
      </h1>
      <div className={styles.breadcrumb}>
        Home &gt; Accounts &gt; Guest Folios &amp; Billing Management
      </div>

      <div className={styles.searchFilter}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by ID, Guest or Folio#"
          className={styles.searchInput}
        />
        <select
          value={roomFilter}
          onChange={e => setRoomFilter(e.target.value)}
          className={styles.selectRoom}
        >
          <option value="">All Rooms</option>
          <option>101</option><option>305</option><option>412</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className={styles.datePicker}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as FolioStatus)}
          className={styles.selectStatus}
        >
          <option value="">All Status</option>
          <option>Unpaid</option><option>Paid</option><option>Pending</option>
        </select>
        <button onClick={searchFolios} className={styles.btnPrimary}>
          Search Folios
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Folio #</th><th>Guest</th><th>Room</th><th>Balance</th><th>Date</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(f => (
            <tr key={f.folioId}>
              <td>{f.folioId}</td>
              <td>{f.guestName}</td>
              <td>{f.roomNumber}</td>
              <td>{f.balance}</td>
              <td>{f.dateCreated}</td>
              <td>
                <span className={`${styles.status} ${styles[f.status]}`}>
                  {f.status}
                </span>
              </td>
              <td>
                <button onClick={() => viewDetails(f)} className={styles.btnView}>
                  View
                </button>
                {f.status === 'Unpaid' && (
                  <button onClick={() => openPayment(f)} className={styles.btnPay}>
                    Pay
                  </button>
                )}
                {f.status === 'Paid' && (
                  <button onClick={() => alert('Reprinting folio...')} className={styles.btnReprint}>
                    Reprint
                  </button>
                )}
                {f.status === 'Pending' && (
                  <button onClick={() => openPayment(f)} className={styles.btnPayNow}>
                    Pay Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        Showing {filtered.length} of {allFolios.length}
      </div>

      {detailsOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModals} className={styles.close}>&times;</span>
            <h2>Guest Folio Details – #{selected.folioId}</h2>
            <p><strong>Guest:</strong> {selected.guestName}</p>
            <p><strong>Room:</strong> {selected.roomNumber}</p>
            <p><strong>Date:</strong> {selected.dateCreated}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Total:</strong> {selected.balance}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selected.items.map((i, idx) => (
                <li key={idx}>{i.name} – {i.amount}</li>
              ))}
            </ul>
            <button onClick={closeModals} className={styles.btnCancel}>Close</button>
          </div>
        </div>
      )}

      {paymentOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModals} className={styles.close}>&times;</span>
            <h2>Pay Folio #{selected.folioId}</h2>
            <p><strong>Amount Due:</strong> {selected.balance}</p>
            <label>Method:</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
              className={styles.selectPaymentMethod}
            >
              <option value="credit-card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
            {paymentMethod === 'credit-card' && (
              <>
                <label>Card #:</label>
                <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className={styles.inputField} placeholder="Enter card number"/>
                <label>Expiry:</label>
                <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className={styles.inputField}/>
                <label>CVV:</label>
                <input type="text" value={cvv} onChange={e => setCvv(e.target.value)} className={styles.inputField} placeholder="CVV"/>
              </>
            )}
            <label>Payment Date:</label>
            <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className={styles.inputField}/>
            <div className={styles.modalActions}>
              <button onClick={confirmPayment} className={styles.btnConfirm}>Confirm Payment</button>
              <button onClick={closeModals} className={styles.btnCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GuestFolios;
