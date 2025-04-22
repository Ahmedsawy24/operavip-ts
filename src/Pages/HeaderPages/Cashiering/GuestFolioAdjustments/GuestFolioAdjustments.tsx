import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './GuestFolioAdjustments.module.css';

type AdjustmentOption = 'post' | 'credit' | 'debit';

interface HistoryItem {
  date: string;           // DD-MM-YYYY
  type: 'Post Charge' | 'Credit' | 'Debit';
  description: string;
  amount: number;
  processedBy: string;
}

const GuestFolioAdjustments: React.FC = () => {
  // بيانات ضيف وهمية
  const guest = {
    reservationId: '123456',
    guestName: 'Abdullah Alhammami',
    roomNumber: '204',
    roomType: 'Suite',
    arrival: '10-04-2025',
    departure: '15-04-2025',
    currentBalance: 250.00,
    originalBalance: 500.00,
  };

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [option, setOption] = useState<AdjustmentOption>('post');
  // Post charge fields
  const [chargeType, setChargeType] = useState('');
  const [otherDesc, setOtherDesc] = useState('');
  const [chargeAmount, setChargeAmount] = useState<number | ''>('');
  const [chargeDate, setChargeDate] = useState('');
  const [chargeDescr, setChargeDescr] = useState('');
  // Credit/debit fields
  const [adjAmount, setAdjAmount] = useState<number | ''>('');
  const [adjDetail, setAdjDetail] = useState('');
  const [adjReason, setAdjReason] = useState('');
  const [processedBy, setProcessedBy] = useState('');
  const [adjDate, setAdjDate] = useState('');
  const [adjRemarks, setAdjRemarks] = useState('');
  // History
  const [history, setHistory] = useState<HistoryItem[]>([
    { date: '12-04-2025', type: 'Credit', description: 'Discount - Complaint', amount: 50, processedBy: 'Hamza' },
    { date: '13-04-2025', type: 'Post Charge', description: 'Laundry Service', amount: 30, processedBy: 'Ahmed' },
  ]);
  // Summary
  const [newAdjAmount, setNewAdjAmount] = useState(0);
  const [newTotalBalance, setNewTotalBalance] = useState(guest.currentBalance);

  // تحديث الملبخص عند تغيير الإدخالات
  useEffect(() => {
    let amt = 0;
    if (option === 'post') amt = Number(chargeAmount) || 0;
    else amt = Number(adjAmount) || 0;

    const balance =
      option === 'credit'
        ? guest.currentBalance - amt
        : guest.currentBalance + amt;
    setNewAdjAmount(amt);
    setNewTotalBalance(balance);
  }, [option, chargeAmount, adjAmount]);

  // بحث ديمو
  const handleSearch = () => alert('Demo search only.');

  // تأكيد التعديل
  const handleConfirm = () => {
    // تحقق
    if (option === 'post') {
      if (!chargeType) return alert('⚠️ اختر نوع الشحن.');
      if (!chargeAmount || chargeAmount <= 0) return alert('⚠️ أدخل مبلغاً صحيحاً.');
    } else {
      if (!adjAmount || adjAmount <= 0) return alert('⚠️ أدخل مبلغاً صحيحاً.');
      if (option === 'credit' && (adjAmount as number) > guest.currentBalance)
        return alert('⚠️ لا يمكن أن يتجاوز الائتمان الرصيد الحالي.');
    }
    // أضف للتاريخ
    const item: HistoryItem = {
      date: option === 'post' ? chargeDate : adjDate,
      type: option === 'post' ? 'Post Charge' : option === 'credit' ? 'Credit' : 'Debit',
      description: option === 'post' ? (chargeType === 'Other' ? otherDesc : chargeType) : adjReason,
      amount: option === 'post' ? Number(chargeAmount) : Number(adjAmount),
      processedBy: processedBy || 'N/A',
    };
    setHistory(prev => [...prev, item]);
    alert('✅ Adjustment Successfully Posted to Guest Folio!');
    // إعادة ضبط
    setChargeType(''); setOtherDesc(''); setChargeAmount(''); setChargeDate(''); setChargeDescr('');
    setAdjAmount(''); setAdjDetail(''); setAdjReason(''); setProcessedBy(''); setAdjDate(''); setAdjRemarks('');
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>Guest Folio Adjustments</h1>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt; <Link to="/cashiering">Cashiering</Link> &gt; Guest Folio Adjustments
          </nav>
        </div>

        {/* Search */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="🔎 Search by Name, Room Number, or Reservation ID"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        </section>

        {/* Guest Info */}
        <section className={styles.guestInfoSection}>
          <h2>Guest Information</h2>
          <table className={styles.infoTable}>
            <thead>
              <tr>
                <th>Reservation ID</th><th>Guest Name</th><th>Room Number</th>
                <th>Room Type</th><th>Arrival</th><th>Departure</th><th>Current Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{guest.reservationId}</td>
                <td>{guest.guestName}</td>
                <td>{guest.roomNumber}</td>
                <td>{guest.roomType}</td>
                <td>{guest.arrival}</td>
                <td>{guest.departure}</td>
                <td>${guest.currentBalance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Option Radios */}
        <section className={styles.adjustmentTypeSection}>
          <h2>Adjustment Type</h2>
          <div className={styles.radioGroup}>
            {(['post','credit','debit'] as AdjustmentOption[]).map(opt => (
              <label key={opt}>
                <input
                  type="radio"
                  name="adjustmentOption"
                  value={opt}
                  checked={option===opt}
                  onChange={()=>setOption(opt)}
                />
                {opt==='post'?'Post Charge':opt==='credit'?'Credit Adjustment':'Debit Adjustment'}
              </label>
            ))}
          </div>
        </section>

        {/* Forms */}
        <section className={styles.adjustmentDetailsSection}>
          {option==='post' ? (
            <div className={styles.adjustmentForm}>
              <h2>Post Charges</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Charge Type</label>
                  <select value={chargeType} onChange={e=>setChargeType(e.target.value)}>
                    <option value="">-- Select --</option>
                    {['Food & Beverage','Laundry','Spa','Mini Bar','Room Service','Other'].map(v=>(
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                {chargeType==='Other' && (
                  <div className={styles.formGroup}>
                    <label>Other Description</label>
                    <input value={otherDesc} onChange={e=>setOtherDesc(e.target.value)} />
                  </div>
                )}
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Charge Amount</label>
                  <input type="number" value={chargeAmount} onChange={e=>setChargeAmount(+e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Charge Date</label>
                  <input type="date" value={chargeDate} onChange={e=>setChargeDate(e.target.value)} />
                </div>
              </div>
              <div className={styles.formGroupFull}>
                <label>Description (Optional)</label>
                <textarea value={chargeDescr} onChange={e=>setChargeDescr(e.target.value)} />
              </div>
            </div>
          ) : (
            <div className={styles.adjustmentForm}>
              <h2>Credit/Debit Adjustment</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Adjustment Amount</label>
                  <input type="number" value={adjAmount} onChange={e=>setAdjAmount(+e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Detail Type</label>
                  <select value={adjDetail} onChange={e=>setAdjDetail(e.target.value)}>
                    <option value="">-- Select --</option>
                    {['Guest Complaint','Administrative Correction','Special Offer','Other'].map(v=>(
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Reason</label>
                  <textarea value={adjReason} onChange={e=>setAdjReason(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Processed By</label>
                  <input value={processedBy} onChange={e=>setProcessedBy(e.target.value)} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input type="date" value={adjDate} onChange={e=>setAdjDate(e.target.value)} />
                </div>
                <div className={styles.formGroupFull}>
                  <label>Remarks (Optional)</label>
                  <textarea value={adjRemarks} onChange={e=>setAdjRemarks(e.target.value)} />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* History */}
        <section className={styles.historySection}>
          <h2>Folio Adjustments History</h2>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>Date</th><th>Type</th><th>Description</th>
                <th>Amount</th><th>Processed By</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h,i)=>(
                <tr key={i}>
                  <td>{h.date}</td><td>{h.type}</td><td>{h.description}</td>
                  <td>${h.amount.toFixed(2)}</td><td>{h.processedBy}</td>
                  <td><button className={styles.editBtn}>View/Edit/Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Summary */}
        <section className={styles.summarySection}>
          <h2>Updated Account Summary</h2>
          <div className={styles.summaryInfo}>
            <p><strong>Original Balance:</strong> ${guest.originalBalance.toFixed(2)}</p>
            <p><strong>New Adjustment Amount:</strong> ${newAdjAmount.toFixed(2)}</p>
            <p><strong>New Total Balance:</strong> ${newTotalBalance.toFixed(2)}</p>
          </div>
        </section>

        <div className={styles.confirmContainer}>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            ✅ Confirm Adjustment
          </button>
        </div>
      </div>
    </>
  );
};

export default GuestFolioAdjustments;
