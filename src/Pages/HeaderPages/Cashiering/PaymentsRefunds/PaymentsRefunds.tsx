import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './PaymentsRefunds.module.css';

interface Transaction {
  date: string;           // DD-MM-YYYY
  type: 'Payment' | 'Refund';
  method: string;
  amount: number;
  processedBy: string;
}

const PaymentsRefunds: React.FC = () => {
  // بيانات ضيف وهمية
  const guestInfo = {
    reservationId: '450023',
    guestName: 'Abdullah Alhammami',
    roomNumber: '101',
    roomType: 'Suite',
    checkIn: '12-04-2025',
    checkOut: '15-04-2025',
    currentBalance: 250.00,
  };

  // State للنموذج
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionType, setTransactionType] = useState<'Payment' | 'Refund' | ''>('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionAmount, setTransactionAmount] = useState<number | ''>('');
  const [transactionDate, setTransactionDate] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<Transaction[]>([
    { date: '10-04-2025', type: 'Payment', method: 'Cash', amount: 200, processedBy: 'Ahmed' },
    { date: '11-04-2025', type: 'Refund', method: 'Credit Card', amount: 50, processedBy: 'Ahmed Sami' },
  ]);
  const [totalCharges, setTotalCharges] = useState(500.00);
  const [totalPayments, setTotalPayments] = useState(450.00);
  const [balanceDue, setBalanceDue] = useState(50.00);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تحديث ملخص الحساب
  useEffect(() => {
    const payments = history
      .filter(tx => tx.type === 'Payment')
      .reduce((sum, tx) => sum + tx.amount, 0);
    const refunds = history
      .filter(tx => tx.type === 'Refund')
      .reduce((sum, tx) => sum + tx.amount, 0);
    setTotalPayments(payments);
    const charges = totalCharges; // ثابت في الديمو
    setBalanceDue(charges - payments + refunds);
  }, [history, totalCharges]);

  // معالجة البحث (ديمو فقط)
  const handleSearch = () => {
    alert('Demo search only.');
  };

  // إرسال الدفع/استرجاع
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionType) {
      alert('⚠️ اختر نوع العملية.');
      return;
    }
    if (!paymentMethod) {
      alert('⚠️ اختر طريقة الدفع.');
      return;
    }
    const amt = Number(transactionAmount);
    if (isNaN(amt) || amt <= 0) {
      alert('⚠️ أدخل مبلغًا صحيحًا.');
      return;
    }
    if (transactionType === 'Refund' && amt > guestInfo.currentBalance) {
      alert('⚠️ مبلغ الاسترجاع أكبر من الرصيد الحالي.');
      return;
    }
    // أضف للسجل
    setHistory(prev => [
      ...prev,
      {
        date: transactionDate,
        type: transactionType as 'Payment' | 'Refund',
        method: paymentMethod,
        amount: amt,
        processedBy: 'You',
      }
    ]);
    openModal();
  };

  // مودال التأكيد
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const confirmTransaction = () => {
    alert('✅ Transaction Completed Successfully!');
    closeModal();
    // إعادة ضبط النموذج:
    setTransactionType('');
    setPaymentMethod('');
    setTransactionAmount('');
    setTransactionDate('');
    setNotes('');
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>Payments &amp; Refunds</h1>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt; <Link to="/cashiering">Cashiering</Link> &gt; Payments &amp; Refunds
          </nav>
        </div>

        {/* Search */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="🔎 Search by Name, Reservation ID, or Room Number"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
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
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{guestInfo.reservationId}</td>
                <td>{guestInfo.guestName}</td>
                <td>{guestInfo.roomNumber}</td>
                <td>{guestInfo.roomType}</td>
                <td>{guestInfo.checkIn}</td>
                <td>{guestInfo.checkOut}</td>
                <td id="currentBalance">${guestInfo.currentBalance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Transaction Form */}
        <section className={styles.transactionSection}>
          <h2>Payment or Refund Information</h2>
          <form id="transactionForm" onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Transaction Type</label>
                <select
                  value={transactionType}
                  required
                  onChange={e => setTransactionType(e.target.value as any)}
                >
                  <option value="">-- Select --</option>
                  <option value="Payment">Payment</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Payment Method</label>
                <select
                  value={paymentMethod}
                  required
                  onChange={e => setPaymentMethod(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  required
                  value={transactionAmount}
                  onChange={e => setTransactionAmount(+e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input
                  type="date"
                  required
                  value={transactionDate}
                  onChange={e => setTransactionDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroupFull}>
              <label>Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Enter any additional notes..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
            <div className={styles.formButtons}>
              <button type="submit" className={styles.submitBtn}>
                ✅ Submit Payment / Refund
              </button>
            </div>
          </form>
        </section>

        {/* Transaction History */}
        <section className={styles.historySection}>
          <h2>Transaction History</h2>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Processed By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((tx, i) => (
                <tr key={i}>
                  <td>{tx.date}</td>
                  <td>{tx.type}</td>
                  <td>{tx.method}</td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>{tx.processedBy}</td>
                  <td>
                    <button className={styles.editBtn}>Edit/Delete</button>
                    <button className={styles.viewBtn}>View Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Account Summary */}
        <section className={styles.summarySection}>
          <h2>Guest Account Summary</h2>
          <div className={styles.summaryInfo}>
            <p><strong>Total Charges:</strong> <span>${totalCharges.toFixed(2)}</span></p>
            <p><strong>Total Payments:</strong> <span>${totalPayments.toFixed(2)}</span></p>
            <p><strong>Balance Due:</strong> <span>${balanceDue.toFixed(2)}</span></p>
          </div>
        </section>

        <div className={styles.processContainer}>
          <button id="processBtn" className={styles.processBtn} onClick={() => document.getElementById('transactionForm')?.dispatchEvent(new Event('submit'))}>
            ✅ Process Payment/Refund
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Confirm Transaction</h2>
            <div className={styles.modalContent}>
              <p><strong>Guest Name:</strong> {guestInfo.guestName}</p>
              <p><strong>Transaction Type:</strong> {transactionType}</p>
              <p><strong>Amount:</strong> ${transactionAmount}</p>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <p><strong>Date of Transaction:</strong> {transactionDate}</p>
              <p><strong>New Account Balance:</strong> ${(balanceDue).toFixed(2)}</p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancelBtn} onClick={closeModal}>Cancel</button>
              <button className={styles.modalConfirmBtn} onClick={confirmTransaction}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentsRefunds;
