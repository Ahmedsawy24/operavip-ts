import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './CashierClosingBalancing.module.css';

const CashierClosingBalancing: React.FC = () => {
  // Shift info
  const [cashierName, setCashierName] = useState('');
  const [shiftDate, setShiftDate] = useState('');
  const [shiftType, setShiftType] = useState<'Morning'|'Evening'|'Night'|''>('');

  // Transactions summary (demo static)
  const transactions = [
    { type: 'Payments Received', count: 25, amount: 2500 },
    { type: 'Refunds Issued', count: 3,   amount: -150 },
    { type: 'Post Charges Added', count: 12, amount: 450 },
    { type: 'Credit Adjustments', count: 2,  amount: -100 },
    { type: 'Debit Adjustments', count: 1,   amount: 50 },
  ];

  // Cash section
  const openingCash = 1000;
  const cashReceived = 800;
  const cashRefunds = 50;
  const expectedCash = openingCash + cashReceived - cashRefunds;
  const [actualCash, setActualCash] = useState<number|''>('');
  const [cashDiscrepancy, setCashDiscrepancy] = useState(0);

  // Non-cash section
  const ccExpected = 1200;
  const btExpected = 300;
  const [ccActual, setCcActual] = useState<number|''>('');
  const [btActual, setBtActual] = useState<number|''>('');
  const [ccDiff, setCcDiff] = useState(0);
  const [btDiff, setBtDiff] = useState(0);

  // Remarks
  const [remarks, setRemarks] = useState('');

  // Modal
  const [showModal, setShowModal] = useState(false);
  const modalCashierName = useRef<HTMLSpanElement>(null);
  const modalShiftInfo  = useRef<HTMLSpanElement>(null);
  const modalExpected   = useRef<HTMLSpanElement>(null);
  const modalActual     = useRef<HTMLSpanElement>(null);
  const modalDiscrepancy= useRef<HTMLSpanElement>(null);
  const modalRemarks    = useRef<HTMLSpanElement>(null);

  // Load transactions (demo)
  const handleLoad = () => {
    if (!cashierName || !shiftDate || !shiftType) {
      alert('⚠️ Please fill in all shift information.');
      return;
    }
    alert('✅ Transactions loaded (demo).');
  };

  // Compute discrepancies
  useEffect(() => {
    if (actualCash !== '') {
      setCashDiscrepancy((actualCash as number) - expectedCash);
    }
  }, [actualCash]);

  useEffect(() => {
    if (ccActual !== '') setCcDiff((ccActual as number) - ccExpected);
  }, [ccActual]);
  useEffect(() => {
    if (btActual !== '') setBtDiff((btActual as number) - btExpected);
  }, [btActual]);

  // Open modal
  const handleCloseShift = () => {
    modalCashierName.current!.textContent = cashierName;
    modalShiftInfo.current!.textContent  = `${shiftDate} , ${shiftType}`;
    modalExpected.current!.textContent   = `$${expectedCash.toFixed(2)}`;
    modalActual.current!.textContent     = actualCash!==''? `$${(actualCash as number).toFixed(2)}` : '--';
    modalDiscrepancy.current!.textContent= `$${cashDiscrepancy.toFixed(2)}`;
    modalRemarks.current!.textContent    = remarks || '--';
    setShowModal(true);
  };

  const handleConfirm = () => {
    alert('✅ Shift closed and balanced!');
    setShowModal(false);
    // هنا ممكن إعادة تعيين الحقول إذا أردت
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>Cashier Closing & Balancing</h1>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt; <Link to="/cashiering">Cashiering</Link> &gt; Cashier Closing & Balancing
          </nav>
        </div>

        {/* Shift Information */}
        <section className={styles.shiftSection}>
          <h2>Shift Information</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Cashier Name</label>
              <input value={cashierName} onChange={e=>setCashierName(e.target.value)} placeholder="Enter cashier name" />
            </div>
            <div className={styles.formGroup}>
              <label>Shift Date</label>
              <input type="date" value={shiftDate} onChange={e=>setShiftDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Shift Type</label>
              <select value={shiftType} onChange={e=>setShiftType(e.target.value as any)}>
                <option value="">-- Select Shift Type --</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button className={styles.loadBtn} onClick={handleLoad}>✅ Load Transactions</button>
          </div>
        </section>

        {/* Transactions Summary */}
        <section className={styles.transactionsSection}>
          <h2>Today's Transactions Summary</h2>
          <table className={styles.transactionsTable}>
            <thead>
              <tr>
                <th>Transaction Type</th><th>Count</th><th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.type}</td><td>{t.count}</td><td>${t.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td><strong>Total Balance:</strong></td>
                <td><strong>{transactions.reduce((s,t)=>s+t.count,0)}</strong></td>
                <td><strong>${transactions.reduce((s,t)=>s+t.amount,0).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Cash Section */}
        <section className={styles.cashSection}>
          <h2>Cash Count & Reconciliation</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Opening Cash</label>
              <input value={openingCash.toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Cash Payments Received</label>
              <input value={cashReceived.toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Cash Refunds Given</label>
              <input value={cashRefunds.toFixed(2)} readOnly />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Expected Cash in Drawer</label>
              <input value={expectedCash.toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Actual Cash Counted</label>
              <input type="number" value={actualCash} onChange={e=>setActualCash(+e.target.value)} placeholder="Enter actual cash counted" />
            </div>
            <div className={styles.formGroup}>
              <label>Overage/Shortage</label>
              <input value={cashDiscrepancy.toFixed(2)} readOnly />
            </div>
          </div>
        </section>

        {/* Non-Cash Section */}
        <section className={styles.noncashSection}>
          <h2>Non-Cash Payments (Credit Cards & Transfers)</h2>
          <table className={styles.noncashTable}>
            <thead>
              <tr>
                <th>Payment Method</th><th>Expected Amount</th><th>Actual Amount Counted</th><th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Credit Card</td>
                <td>${ccExpected.toFixed(2)}</td>
                <td><input type="number" value={ccActual} onChange={e=>setCcActual(+e.target.value)} placeholder="Enter amount" /></td>
                <td>${ccDiff.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Bank Transfer</td>
                <td>${btExpected.toFixed(2)}</td>
                <td><input type="number" value={btActual} onChange={e=>setBtActual(+e.target.value)} placeholder="Enter amount" /></td>
                <td>${btDiff.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Remarks */}
        <section className={styles.remarksSection}>
          <h2>Cashier Remarks</h2>
          <textarea rows={3} value={remarks} onChange={e=>setRemarks(e.target.value)} placeholder="Additional notes or comments..." />
        </section>

        {/* Close Shift */}
        <div className={styles.confirmContainer}>
          <button className={styles.confirmBtn} onClick={handleCloseShift}>
            ✅ Close & Balance Shift
          </button>
        </div>
      </div>

      {/* Final Confirmation Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirm Cashier Shift Closing</h2>
            <div className={styles.modalContent}>
              <p><strong>Cashier Name:</strong> <span ref={modalCashierName} /></p>
              <p><strong>Shift Date & Type:</strong> <span ref={modalShiftInfo} /></p>
              <p><strong>Expected Total Cash:</strong> <span ref={modalExpected} /></p>
              <p><strong>Actual Total Cash Counted:</strong> <span ref={modalActual} /></p>
              <p><strong>Total Overage/Shortage:</strong> <span ref={modalDiscrepancy} /></p>
              <p><strong>Remarks:</strong> <span ref={modalRemarks} /></p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancelBtn} onClick={()=>setShowModal(false)}>Cancel</button>
              <button className={styles.modalConfirmBtn} onClick={handleConfirm}>Confirm & Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CashierClosingBalancing;
