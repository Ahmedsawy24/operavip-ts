import React, { useState } from 'react';
import styles from './AdvanceDeposits.module.css';

type DepositStatus = 'Received' | 'Pending' | 'Refunded';

interface AdvanceDeposit {
  depositId: string;
  reservationId: string;
  guestName: string;
  amount: string;
  depositDate: string;
  status: DepositStatus;
  depositMethod: string;
  processedBy: string;
  remarks: string;
}

// بيانات وهمية إضافية
const dummyDeposits: AdvanceDeposit[] = [
  {
    depositId: 'AD-20001',
    reservationId: 'RES-10945',
    guestName: 'Omar Ali',
    amount: '$300.00',
    depositDate: '2025-04-05',
    status: 'Received',
    depositMethod: 'Credit Card',
    processedBy: 'Ahmed Khaled',
    remarks: 'No additional notes.'
  },
  {
    depositId: 'AD-20002',
    reservationId: 'RES-10950',
    guestName: 'Layla Majid',
    amount: '$150.00',
    depositDate: '2025-04-10',
    status: 'Pending',
    depositMethod: '',
    processedBy: '',
    remarks: ''
  },
  {
    depositId: 'AD-20003',
    reservationId: 'RES-10960',
    guestName: 'Ahmed Hassan',
    amount: '$500.00',
    depositDate: '2025-03-20',
    status: 'Refunded',
    depositMethod: 'Bank Transfer',
    processedBy: 'John Doe',
    remarks: 'Refund processed.'
  },
  // بيانات وهمية إضافية
  {
    depositId: 'AD-20004',
    reservationId: 'RES-10970',
    guestName: 'Sara Brown',
    amount: '$250.00',
    depositDate: '2025-04-12',
    status: 'Pending',
    depositMethod: '',
    processedBy: '',
    remarks: ''
  }
];

const AdvanceDeposits: React.FC = () => {
  const [all, setAll] = useState<AdvanceDeposit[]>(dummyDeposits);
  const [filtered, setFiltered] = useState<AdvanceDeposit[]>(dummyDeposits);

  // فلاتر
  const [resFilter, setResFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState<DepositStatus | ''>('');

  // مودالات
  const [detailOpen, setDetailOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [selected, setSelected] = useState<AdvanceDeposit | null>(null);

  // حقول استرداد
  const [refundAmount, setRefundAmount] = useState('');
  const [refundDate, setRefundDate] = useState('');
  const [refundMethod, setRefundMethod] = useState('cash');
  const [refundReason, setRefundReason] = useState('');

  // بحث وتصفية
  const searchDeposits = () => {
    let res = all.filter(d =>
      d.reservationId.includes(resFilter) &&
      d.guestName.toLowerCase().includes(guestFilter.toLowerCase())
    );
    if (fromDate) res = res.filter(d => d.depositDate >= fromDate);
    if (toDate)   res = res.filter(d => d.depositDate <= toDate);
    if (statusFilter) res = res.filter(d => d.status === statusFilter);
    setFiltered(res);
  };

  // عرض التفاصيل
  const viewDepositDetails = (d: AdvanceDeposit) => {
    setSelected(d);
    setDetailOpen(true);
  };

  // فتح مودال استرداد
  const openRefundModal = (d: AdvanceDeposit) => {
    setSelected(d);
    setRefundAmount('');
    setRefundDate(new Date().toISOString().slice(0,10));
    setRefundMethod('cash');
    setRefundReason('');
    setRefundOpen(true);
  };

  // تأكيد استرداد
  const confirmRefund = () => {
    if (!refundAmount || parseFloat(refundAmount) <= 0) {
      alert('Please enter a valid refund amount.');
      return;
    }
    alert(`Refund of ${refundAmount} processed.`);
    setRefundOpen(false);
  };

  // تأكيد دفعة معلقة
  const confirmDeposit = (id: string) => {
    alert(`Deposit ${id} confirmed.`);
  };

  // إلغاء دفعة معلقة
  const cancelDeposit = (id: string) => {
    alert(`Deposit ${id} cancelled.`);
  };

  const closeModal = () => {
    setDetailOpen(false);
    setRefundOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Advance Deposits Management</h1>
      <div className={styles.breadcrumb}>Home &gt; Accounts &gt; Advance Deposits</div>

      <section className={styles.filters}>
        <h3>🔎 Search &amp; Filter Deposits</h3>
        <div className={styles.filterRow}>
          <input
            type="text" placeholder="Enter Reservation ID"
            value={resFilter} onChange={e => setResFilter(e.target.value)}
            className={styles.input}
          />
          <input
            type="text" placeholder="Enter Guest Name"
            value={guestFilter} onChange={e => setGuestFilter(e.target.value)}
            className={styles.input}
          />
          <label>Date From:</label>
          <input
            type="date"
            value={fromDate} onChange={e => setFromDate(e.target.value)}
            className={styles.input}
          />
          <label>To:</label>
          <input
            type="date"
            value={toDate} onChange={e => setToDate(e.target.value)}
            className={styles.input}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as DepositStatus)}
            className={styles.select}
          >
            <option value="">-- All Status --</option>
            <option>Received</option>
            <option>Pending</option>
            <option>Refunded</option>
          </select>
          <button onClick={searchDeposits} className={styles.btn}>
            🔍 Search Deposits
          </button>
        </div>
      </section>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Deposit ID</th><th>Reservation ID</th><th>Guest Name</th>
            <th>Amount</th><th>Deposit Date</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(d => (
            <tr key={d.depositId}>
              <td>{d.depositId}</td>
              <td>{d.reservationId}</td>
              <td>{d.guestName}</td>
              <td>{d.amount}</td>
              <td>{d.depositDate}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[d.status]}`}>
                  {d.status}
                </span>
              </td>
              <td>
                <button onClick={() => viewDepositDetails(d)} className={styles.btnView}>View</button>
                {d.status === 'Received' && (
                  <button onClick={() => openRefundModal(d)} className={styles.btnRefund}>
                    Refund
                  </button>
                )}
                {d.status === 'Pending' && (
                  <>
                    <button onClick={() => confirmDeposit(d.depositId)} className={styles.btnConfirm}>
                      Confirm
                    </button>
                    <button onClick={() => cancelDeposit(d.depositId)} className={styles.btnCancel}>
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* تفاصيل الدفعة */}
      {detailOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Advance Deposit Details – {selected.depositId}</h2>
            <p><strong>Reservation ID:</strong> {selected.reservationId}</p>
            <p><strong>Guest Name:</strong> {selected.guestName}</p>
            <p><strong>Amount Deposited:</strong> {selected.amount}</p>
            <p><strong>Date:</strong> {selected.depositDate}</p>
            <p><strong>Method:</strong> {selected.depositMethod || 'N/A'}</p>
            <p><strong>Processed By:</strong> {selected.processedBy || 'N/A'}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Remarks:</strong> {selected.remarks || 'None'}</p>
            <button onClick={closeModal} className={styles.btnClose}>Close</button>
            <button onClick={() => window.print()} className={styles.btnPrint}>Print Receipt</button>
          </div>
        </div>
      )}

      {/* مودال استرداد */}
      {refundOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Refund Deposit – {selected.depositId}</h2>
            <p><strong>Original Amount:</strong> {selected.amount}</p>
            <label>Refund Amount:</label>
            <input
              type="number"
              value={refundAmount}
              onChange={e => setRefundAmount(e.target.value)}
              className={styles.input}
            />
            <label>Refund Date:</label>
            <input
              type="date"
              value={refundDate}
              onChange={e => setRefundDate(e.target.value)}
              className={styles.input}
            />
            <label>Refund Method:</label>
            <select
              value={refundMethod}
              onChange={e => setRefundMethod(e.target.value)}
              className={styles.select}
            >
              <option value="cash">Cash</option>
              <option value="credit-card">Credit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
            <label>Reason:</label>
            <input
              type="text"
              value={refundReason}
              onChange={e => setRefundReason(e.target.value)}
              className={styles.input}
            />
            <button onClick={confirmRefund} className={styles.btnConfirm}>✅ Confirm Refund</button>
            <button onClick={closeModal} className={styles.btnCancel}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvanceDeposits;
