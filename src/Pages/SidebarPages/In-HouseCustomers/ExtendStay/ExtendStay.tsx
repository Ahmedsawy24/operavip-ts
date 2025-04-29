// src/components/ExtendStay.tsx
import React, { useState, ChangeEvent } from 'react';
import styles from './ExtendStay.module.css';

type PaymentStatus = 'Paid' | 'Pending Payment' | 'Not Paid';
type ExtensionPayment = 'paid-now' | 'charge-checkout' | 'charge-corporate';

interface Reservation {
  bookingId: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  currentCheckOut: string;
  roomType: string;
  paymentStatus: PaymentStatus;
}

const dummyReservations: Reservation[] = [
  { bookingId: '10445', guestName: 'Omar Ali',    roomNumber: '305', checkIn: '2025-03-16', currentCheckOut: '2025-03-20', roomType: 'Deluxe Room',  paymentStatus: 'Paid' },
  { bookingId: '10446', guestName: 'Sarah Brown', roomNumber: '702', checkIn: '2025-03-18', currentCheckOut: '2025-03-22', roomType: 'Suite',         paymentStatus: 'Pending Payment' },
  { bookingId: '10447', guestName: 'Ali Veli',    roomNumber: '410', checkIn: '2025-04-01', currentCheckOut: '2025-04-05', roomType: 'Standard Room', paymentStatus: 'Not Paid' },
  { bookingId: '10448', guestName: 'Jane Doe',    roomNumber: '118', checkIn: '2025-04-02', currentCheckOut: '2025-04-06', roomType: 'Deluxe Room',  paymentStatus: 'Paid' },
  { bookingId: '10449', guestName: 'John Smith',  roomNumber: '523', checkIn: '2025-04-05', currentCheckOut: '2025-04-08', roomType: 'Suite',         paymentStatus: 'Pending Payment' },
];

const ExtendStay: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterRoomType, setFilterRoomType] = useState('');
  const [filterPayment, setFilterPayment] = useState<PaymentStatus | ''>('');
  const [reservations, setReservations] = useState<Reservation[]>(dummyReservations);

  const [activeModal, setActiveModal] = useState<'extend' | 'details' | 'confirm' | null>(null);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [newDate, setNewDate] = useState('');
  const [extensionCost, setExtensionCost] = useState(0);
  const [confirmPayment, setConfirmPayment] = useState<ExtensionPayment>('paid-now');
  const [notes, setNotes] = useState('');

  const searchGuest = () => {
    let filtered = dummyReservations.filter(r =>
      r.guestName.toLowerCase().includes(query.toLowerCase()) ||
      r.bookingId.includes(query) ||
      r.roomNumber.includes(query)
    );
    if (filterDate) {
      filtered = filtered.filter(r => r.currentCheckOut === filterDate);
    }
    if (filterRoomType) {
      filtered = filtered.filter(r => r.roomType === filterRoomType);
    }
    if (filterPayment) {
      filtered = filtered.filter(r => r.paymentStatus === filterPayment);
    }
    setReservations(filtered);
  };

  const openExtendModal = (res: Reservation) => {
    setSelected(res);
    const dt = new Date(res.currentCheckOut);
    dt.setDate(dt.getDate() + 1);
    setNewDate(dt.toISOString().split('T')[0]);
    setExtensionCost(0);
    setNotes('');
    setActiveModal('extend');
  };

  const updateExtensionCost = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setNewDate(date);
    if (!selected) return;
    const cur = new Date(selected.currentCheckOut);
    const nxt = new Date(date);
    const diff = Math.ceil((nxt.getTime() - cur.getTime()) / (1000 * 60 * 60 * 24));
    setExtensionCost(diff * 50);
  };

  const confirmExtension = () => {
    setActiveModal('confirm');
  };

  const finalizeExtension = () => {
    alert(`تم تمديد إقامة ${selected?.guestName} حتى ${newDate} بتكلفة $${extensionCost.toFixed(2)}`);
    closeModal();
  };

  const viewDetails = (res: Reservation) => {
    setSelected(res);
    setActiveModal('details');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelected(null);
  };

  return (
    <div className={styles.mainContainer}>
      
      <h1 className={styles.pageTitle}>Extend Stay</h1>
      <div className={styles.breadcrumb}>Home &gt; In-House Customers &gt; Extend Stay</div>

      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search by Guest, ID or Room"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className={styles.datePicker}
        />
        <select
          value={filterRoomType}
          onChange={e => setFilterRoomType(e.target.value)}
          className={styles.select}
        >
          <option value="">All Room Types</option>
          <option>Deluxe Room</option>
          <option>Suite</option>
          <option>Standard Room</option>
        </select>
        <select
          value={filterPayment}
          onChange={e => setFilterPayment(e.target.value as PaymentStatus)}
          className={styles.select}
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending Payment">Pending Payment</option>
          <option value="Not Paid">Not Paid</option>
        </select>
        <button onClick={searchGuest} className={styles.btnPrimary}>Search</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking #</th><th>Guest</th><th>Room #</th><th>Check-In</th><th>Current Check-Out</th><th>Room Type</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.bookingId}>
              <td>{r.bookingId}</td>
              <td>{r.guestName}</td>
              <td>{r.roomNumber}</td>
              <td>{r.checkIn}</td>
              <td>{r.currentCheckOut}</td>
              <td>{r.roomType}</td>
              <td>
                <span className={`${styles.status} ${styles[r.paymentStatus.replace(' ', '')]}`}>
                  {r.paymentStatus}
                </span>
              </td>
              <td>
                <button onClick={() => viewDetails(r)} className={styles.btnSecondary}>Details</button>
                <button onClick={() => openExtendModal(r)} className={styles.btnSuccess}>Extend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        Showing {reservations.length} of {dummyReservations.length}
      </div>

      {/* Extend Modal */}
      {activeModal === 'extend' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Extend Stay – {selected.guestName} (#{selected.bookingId})</h2>
            <p>Current Check-Out: {selected.currentCheckOut}</p>
            <label>New Check-Out:</label>
            <input type="date" value={newDate} onChange={updateExtensionCost} className={styles.datePicker}/>
            <p>Cost: ${extensionCost.toFixed(2)}</p>
            <label>Payment:</label>
            <select
              value={confirmPayment}
              onChange={e => setConfirmPayment(e.target.value as ExtensionPayment)}
              className={styles.select}
            >
              <option value="paid-now">Paid Now</option>
              <option value="charge-checkout">Charge at Checkout</option>
              <option value="charge-corporate">Corporate Charge</option>
            </select>
            <label>Notes:</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className={styles.textarea}/>
            <button onClick={confirmExtension} className={styles.btnSuccess}>Confirm</button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {activeModal === 'confirm' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Confirm Extension – {selected.guestName}</h2>
            <p>New Date: {newDate}</p>
            <p>Cost: ${extensionCost.toFixed(2)}</p>
            <button onClick={finalizeExtension} className={styles.btnSuccess}>Finalize</button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {activeModal === 'details' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Details – {selected.guestName}</h2>
            <p><strong>Booking #:</strong> {selected.bookingId}</p>
            <p><strong>Check-In:</strong> {selected.checkIn}</p>
            <p><strong>Current Check-Out:</strong> {selected.currentCheckOut}</p>
            <p><strong>Room Type:</strong> {selected.roomType}</p>
            <p><strong>Status:</strong> {selected.paymentStatus}</p>
            <p><strong>Total Paid:</strong> $250.00</p>
            <p><strong>Special Requests:</strong> N/A</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtendStay;
