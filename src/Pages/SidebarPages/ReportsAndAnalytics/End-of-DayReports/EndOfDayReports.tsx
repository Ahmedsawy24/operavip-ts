import React, { useState, FormEvent } from 'react';
import styles from './EndOfDayReports.module.css';

type Shift = 'Morning' | 'Afternoon' | 'Night' | 'All';

interface FinancialRow {
  category: string;
  amount: number;
  transactions: number | '—';
  remarks: string;
}

interface Transaction {
  time: string;
  description: string;
  amount: number;
  method: string;
  guest: string;
}

interface CashCountRow {
  denom: string;
  quantity: number;
  total: number;
}

const dummyFinancial: FinancialRow[] = [
  { category: 'Room Revenue', amount: 15500, transactions: 45, remarks: '—' },
  { category: 'Food & Beverage', amount: 5800, transactions: 68, remarks: 'Includes minibar' },
  { category: 'Spa Services', amount: 1200, transactions: 10, remarks: '—' },
  { category: 'Laundry', amount: 900, transactions: 15, remarks: '—' },
  { category: 'Miscellaneous', amount: 1100, transactions: 10, remarks: 'Gift shop, etc.' },
  { category: 'Expenses', amount: 3750, transactions: '—', remarks: 'Operational costs' },
];

const dummyTransactions: Transaction[] = [
  { time: '08:15 AM', description: 'Breakfast Buffet', amount: 250, method: 'Cash', guest: 'Ahmed Yassin' },
  { time: '09:30 AM', description: 'Spa Massage', amount: 400, method: 'Credit Card', guest: 'Sarah Johnson' },
  { time: '11:00 AM', description: 'Minibar Purchase', amount: 120, method: 'Cash', guest: 'Ali Abdullah' },
  { time: '01:45 PM', description: 'Laundry Service', amount: 80, method: 'Bank Transfer', guest: 'Omar Hussein' },
  { time: '03:15 PM', description: 'Deluxe Room Charge', amount: 700, method: 'Credit Card', guest: 'Yazeed Feras' },
];

const dummyCashCount: CashCountRow[] = [
  { denom: '200 TL', quantity: 5, total: 1000 },
  { denom: '100 TL', quantity: 7, total: 700 },
  { denom: '50 TL', quantity: 8, total: 400 },
  { denom: '20 TL', quantity: 15, total: 300 },
  { denom: 'Coins', quantity: 0, total: 150 },
];

const EndOfDayReports: React.FC = () => {
  // filters
  const [reportDate, setReportDate] = useState('');
  const [shift, setShift] = useState<Shift>('Morning');
  const [includeTx, setIncludeTx] = useState(true);
  const [includeCash, setIncludeCash] = useState(true);

  // state
  const [generated, setGenerated] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDesc, setReceiptDesc] = useState('');
  const [showCashModal, setShowCashModal] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // summary computed
  const totalRevenue = dummyFinancial
    .filter(r => r.category !== 'Expenses')
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = dummyFinancial.find(r => r.category === 'Expenses')!.amount;
  const netRevenue = totalRevenue - totalExpenses;
  const totalTransactions = dummyTransactions.length;

  const handleGenerate = () => {
    if (!reportDate) {
      alert('⚠️ Please select a report date.');
      return;
    }
    setGenerated(true);
    alert('🔄 Generating report…');
    setTimeout(() => {
      alert('✅ End-of-Day report generated successfully!');
      if (includeCash) setShowCashModal(true);
    }, 500);
  };

  const handleReset = () => {
    setReportDate('');
    setShift('Morning');
    setIncludeTx(true);
    setIncludeCash(true);
    setGenerated(false);
  };

  const openReceipt = (desc: string) => {
    setReceiptDesc(desc);
    setShowReceipt(true);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  const confirmExport = () => {
    alert('✅ End-of-Day report exported successfully!');
    setShowExport(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>End-of-Day Reports</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Reports and Analytics &gt; End-of-Day Reports
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🗓️ Generate End-of-Day Report</h2>
        <div className={styles.formGrid}>
          <div className={styles.formRow}>
            <label>Report Date</label>
            <input
              type="date"
              className={styles.input}
              value={reportDate}
              onChange={e => setReportDate(e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <label>Shift</label>
            <select
              className={styles.input}
              value={shift}
              onChange={e => setShift(e.target.value as Shift)}
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Night</option>
              <option>All</option>
            </select>
          </div>
          <div className={styles.formRowCheckbox}>
            <input
              type="checkbox"
              checked={includeTx}
              onChange={e => setIncludeTx(e.target.checked)}
            />
            <label>Include All Transactions</label>
          </div>
          <div className={styles.formRowCheckbox}>
            <input
              type="checkbox"
              checked={includeCash}
              onChange={e => setIncludeCash(e.target.checked)}
            />
            <label>Include Cash Count Summary</label>
          </div>
        </div>
        <button className={`${styles.btn} ${styles.generateBtn}`} onClick={handleGenerate}>
          🖨️ Generate Report
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={handleReset}>
          🔄 Reset
        </button>
      </section>

      {generated && (
        <>
          {/* Summary Cards */}
          <section className={styles.summarySection}>
            <h2 className={styles.sectionTitle}>📌 End-of-Day Summary</h2>
            <div className={styles.cardGrid}>
              <div className={`${styles.card} ${styles.cardGreen}`}>
                <div>Total Revenue</div>
                <div className={styles.cardValue}>₺{totalRevenue.toLocaleString()}</div>
              </div>
              <div className={`${styles.card} ${styles.cardRed}`}>
                <div>Total Expenses</div>
                <div className={styles.cardValue}>₺{totalExpenses.toLocaleString()}</div>
              </div>
              <div className={`${styles.card} ${styles.cardBlue}`}>
                <div>Net Revenue</div>
                <div className={styles.cardValue}>₺{netRevenue.toLocaleString()}</div>
              </div>
              <div className={`${styles.card} ${styles.cardPurple}`}>
                <div>Total Transactions</div>
                <div className={styles.cardValue}>{totalTransactions}</div>
              </div>
            </div>
          </section>

          {/* Financial Table */}
          {includeTx && (
            <section className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>💰 Financial Breakdown</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount (TL)</th>
                      <th>Transactions</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyFinancial.map((row) => (
                      <tr key={row.category}>
                        <td>{row.category}</td>
                        <td>{row.amount.toLocaleString()}</td>
                        <td>{row.transactions}</td>
                        <td>{row.remarks}</td>
                      </tr>
                    ))}
                    <tr className={styles.totalRow}>
                      <td><strong>Net Total</strong></td>
                      <td><strong>₺{netRevenue.toLocaleString()}</strong></td>
                      <td><strong>{totalTransactions}</strong></td>
                      <td>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Transactions Table */}
          {includeTx && (
            <section className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>🗃️ Transaction Details</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Description</th>
                      <th>Amount (TL)</th>
                      <th>Payment Method</th>
                      <th>Guest Name</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyTransactions.map((tx, i) => (
                      <tr key={i}>
                        <td>{tx.time}</td>
                        <td>{tx.description}</td>
                        <td>{tx.amount}</td>
                        <td>{tx.method}</td>
                        <td>{tx.guest}</td>
                        <td>
                          <button
                            className={`${styles.btn} ${styles.receiptBtn}`}
                            onClick={() => openReceipt(tx.description)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Export Button */}
          <section className={styles.exportSection}>
            <button className={`${styles.btn} ${styles.exportBtn}`} onClick={handleExport}>
              📤 Export End-of-Day Report
            </button>
          </section>
        </>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <div className={styles.modalOverlay} onClick={() => setShowReceipt(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowReceipt(false)}>&times;</span>
            <h2>🧾 Transaction Receipt – {receiptDesc}</h2>
            <p><strong>Time:</strong> 09:30 AM</p>
            <p><strong>Description:</strong> {receiptDesc}</p>
            <p><strong>Guest:</strong> Sarah Johnson</p>
            <p><strong>Amount:</strong> ₺400</p>
            <p><strong>Payment Method:</strong> Credit Card</p>
            <p><strong>Staff Processed:</strong> Leen Emad</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.saveBtn}`}>Print Receipt</button>
              <button className={`${styles.btn} ${styles.exportBtn}`}>Download PDF</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={() => setShowReceipt(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cash Count Modal */}
      {showCashModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCashModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowCashModal(false)}>&times;</span>
            <h2>💵 Cash Count Summary – {reportDate}</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Denomination</th>
                    <th>Quantity</th>
                    <th>Total (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyCashCount.map((row) => (
                    <tr key={row.denom}>
                      <td>{row.denom}</td>
                      <td>{row.quantity}</td>
                      <td>{row.total}</td>
                    </tr>
                  ))}
                  <tr className={styles.totalRow}>
                    <td><strong>Total</strong></td>
                    <td>—</td>
                    <td><strong>{dummyCashCount.reduce((s, r) => s + r.total, 0)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={() => setShowCashModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <div className={styles.modalOverlay} onClick={() => setShowExport(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowExport(false)}>&times;</span>
            <h2>📤 Export End-of-Day Report</h2>
            <form
              className={styles.form}
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                confirmExport();
              }}
            >
              <div className={styles.formRow}>
                <label>File Format</label>
                <select className={styles.input}>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
              </div>
              <div className={styles.formRowCheckbox}>
                <input
                  type="checkbox"
                  checked={includeTx}
                  onChange={e => setIncludeTx(e.target.checked)}
                />
                <label>Include All Transactions</label>
              </div>
              <div className={styles.formRowCheckbox}>
                <input
                  type="checkbox"
                  checked={includeCash}
                  onChange={e => setIncludeCash(e.target.checked)}
                />
                <label>Include Cash Count Summary</label>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.generateBtn}`}>Export</button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={() => setShowExport(false)}
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

export default EndOfDayReports;
