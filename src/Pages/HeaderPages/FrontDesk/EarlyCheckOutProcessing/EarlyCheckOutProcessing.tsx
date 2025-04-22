import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EarlyCheckOutProcessing.module.css';

interface Reservation {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  originalDeparture: string; // DD-MM-YYYY
  amountPaid: number;
}

const EarlyCheckOutProcessing: React.FC = () => {
  // بيانات وهمية
  const currentReservation: Reservation = {
    id: '340023',
    guestName: 'Abdullah Alhammami',
    roomNumber: '204',
    roomType: 'Suite',
    originalDeparture: '15-04-2025',
    amountPaid: 300.00,
  };

  // حالة المكونات
  const [searchQuery, setSearchQuery] = useState('');
  const [newDeparture, setNewDeparture] = useState('');
  const [adjustedNights, setAdjustedNights] = useState<number>(0);
  const [originalTotal] = useState<number>(470.00);
  const [adjustedAmount, setAdjustedAmount] = useState<number>(470.00);
  const [additionalCharges, setAdditionalCharges] = useState<number>(0);
  const [balanceRefund, setBalanceRefund] = useState<number>(170.00);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [keysReceived, setKeysReceived] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // حساب الليالي بعد تغيير تاريخ المغادرة
  useEffect(() => {
    if (!newDeparture) {
      setAdjustedNights(0);
      return;
    }
    const checkInDate = new Date('2025-04-10'); // ثابت في الديمو
    const newDO = new Date(newDeparture);
    const diff = Math.ceil((newDO.getTime() - checkInDate.getTime()) / (1000*60*60*24));
    setAdjustedNights(diff > 0 ? diff : 0);
  }, [newDeparture]);

  // حساب التعديلات المالية
  useEffect(() => {
    const baseRate = 100; // ثابت في الديمو
    const amt = adjustedNights * baseRate + additionalCharges;
    setAdjustedAmount(amt);
    setBalanceRefund(amt - currentReservation.amountPaid);
  }, [adjustedNights, additionalCharges]);

  // فتح مودال التأكيد
  const openModal = () => {
    if (!paymentMethod) {
      alert('⚠️ Please select a payment method.');
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const confirmCheckout = () => {
    if (balanceRefund > 0) {
      alert('⚠️ Please ensure full settlement before confirming.');
      return;
    }
    alert('✅ Early Check‑Out Successfully Processed!');
    closeModal();
  };

  // تنسيق التاريخ من YYYY-MM-DD إلى DD-MM-YYYY
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-');
    return `${d}-${m}-${y}`;
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>Early Check‑Out Processing</h1>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt; <Link to="/front-desk">Front Desk</Link> &gt; Early Check‑Out Processing
          </nav>
        </div>

        {/* Search */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="🔍 Search by Guest Name, Room Number, or Reservation ID"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={() => alert('Demo search only.')}>
            Search
          </button>
        </section>

        {/* Guest Info */}
        <section className={styles.guestInfoSection}>
          <h2>Guest Information</h2>
          <table className={styles.infoTable}>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Original Departure</th>
                <th>New Departure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentReservation.id}</td>
                <td>{currentReservation.guestName}</td>
                <td>{currentReservation.roomNumber}</td>
                <td>{currentReservation.roomType}</td>
                <td>{currentReservation.originalDeparture}</td>
                <td>{newDeparture ? formatDate(newDeparture) : currentReservation.originalDeparture}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Stay Adjustment */}
        <section className={styles.adjustmentSection}>
          <h2>Stay Adjustment Details</h2>
          <div className={styles.adjustmentRow}>
            <div className={styles.adjustmentGroup}>
              <label>Original Check‑Out Date:</label>
              <input readOnly value={currentReservation.originalDeparture} />
            </div>
            <div className={styles.adjustmentGroup}>
              <label>New Check‑Out Date:</label>
              <input
                type="date"
                value={newDeparture}
                onChange={e => setNewDeparture(e.target.value)}
              />
            </div>
            <div className={styles.adjustmentGroup}>
              <label>Adjusted Number of Nights:</label>
              <input readOnly value={adjustedNights} />
            </div>
          </div>
        </section>

        {/* Billing Adjustment */}
        <section className={styles.billingSection}>
          <h2>Billing Adjustment</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Original Total Amount</label>
              <input readOnly value={`$${originalTotal.toFixed(2)}`} />
            </div>
            <div className={styles.formGroup}>
              <label>Adjusted Amount (after early checkout)</label>
              <input readOnly value={`$${adjustedAmount.toFixed(2)}`} />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Amount Already Paid</label>
              <input readOnly value={`$${currentReservation.amountPaid.toFixed(2)}`} />
            </div>
            <div className={styles.formGroup}>
              <label>Remaining Balance / Refund</label>
              <input readOnly value={`$${balanceRefund.toFixed(2)}`} />
            </div>
          </div>
          <div className={styles.formGroupFull}>
            <label>Additional Charges (optional)</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={additionalCharges}
              onChange={e => setAdditionalCharges(+e.target.value)}
            />
          </div>
          <div className={styles.formGroupFull}>
            <label>Payment Method for Adjustment</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Select Payment Method --</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </section>

        {/* Confirmation */}
        <section className={styles.checkoutConfirmationSection}>
          <h2>Early Check‑Out Confirmation</h2>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              checked={keysReceived}
              onChange={e => setKeysReceived(e.target.checked)}
            />
            <label>☑️ Room key cards received back</label>
          </div>
          <div className={styles.formGroupFull}>
            <label>Any notes or feedback from guest?</label>
            <textarea
              rows={3}
              placeholder="Enter any additional notes..."
              value={additionalNotes}
              onChange={e => setAdditionalNotes(e.target.value)}
            />
          </div>
        </section>

        <div className={styles.confirmContainer}>
          <button className={styles.confirmBtn} onClick={openModal}>
            ✅ Confirm Early Check‑Out
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Confirm Early Check‑Out</h2>
            <div className={styles.modalContent}>
              <p><strong>Guest Name:</strong> {currentReservation.guestName}</p>
              <p><strong>Room Number & Type:</strong> {currentReservation.roomType}, Room {currentReservation.roomNumber}</p>
              <p><strong>Original Departure Date:</strong> {currentReservation.originalDeparture}</p>
              <p><strong>New Departure Date:</strong> {newDeparture ? formatDate(newDeparture) : '--'}</p>
              <p><strong>Adjusted Nights:</strong> {adjustedNights} Night(s)</p>
              <p><strong>Final Amount Paid:</strong> ${currentReservation.amountPaid.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancelBtn} onClick={closeModal}>Cancel</button>
              <button className={styles.modalConfirmBtn} onClick={confirmCheckout}>Confirm Check‑Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EarlyCheckOutProcessing;
