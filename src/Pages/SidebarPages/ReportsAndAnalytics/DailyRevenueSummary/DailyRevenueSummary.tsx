import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import styles from './DailyRevenueSummary.module.css';

interface Breakdown {
  category: string;
  amount: number;
  transactions: number;
}
interface Transaction {
  id: string;
  category: string;
  time: string;
  description: string;
  amount: number;
  guest: string;
  room: string;
  method: string;
}

const dummyBreakdown: Breakdown[] = [
  { category: 'Room Revenue', amount: 15500, transactions: 25 },
  { category: 'Food & Beverage', amount: 4250, transactions: 40 },
  { category: 'Spa Services', amount: 1750, transactions: 12 },
  { category: 'Minibar', amount: 950, transactions: 18 },
  { category: 'Laundry', amount: 620, transactions: 15 },
  { category: 'Other Charges', amount: 400, transactions: 8 },
];

const dummyTransactions: Transaction[] = [
  { id: 'TX-001', category: 'Room Revenue', time: '09:15 AM', description: 'Deluxe Room (1 Night)', amount: 700, guest: 'Ahmed Yassin', room: '301', method: 'Credit Card' },
  { id: 'TX-002', category: 'Room Revenue', time: '10:45 AM', description: 'Suite (3 Nights)', amount: 3000, guest: 'Sarah Johnson', room: '202', method: 'Cash' },
  { id: 'TX-003', category: 'Room Revenue', time: '11:30 AM', description: 'Double Room (2 Nights)', amount: 1400, guest: 'Ali Abdullah', room: '104', method: 'Bank Transfer' },
  { id: 'TX-004', category: 'Room Revenue', time: '02:10 PM', description: 'Single Room (5 Nights)', amount: 2500, guest: 'Omar Hussein', room: '203', method: 'Credit Card' },
  { id: 'TX-005', category: 'Food & Beverage', time: '08:20 AM', description: 'Breakfast Buffet', amount: 200, guest: 'Leen Murtada', room: '305', method: 'Cash' },
  { id: 'TX-006', category: 'Spa Services', time: '09:40 AM', description: 'Spa Massage', amount: 400, guest: 'Ahmed Yassin', room: '301', method: 'Credit Card' },
  { id: 'TX-007', category: 'Minibar', time: '10:30 AM', description: 'Minibar Items', amount: 75, guest: 'Yazeed Feras', room: '402', method: 'Cash' },
  { id: 'TX-008', category: 'Laundry', time: '11:50 AM', description: 'Laundry Service', amount: 120, guest: 'Omar Hussein', room: '203', method: 'Credit Card' },
];

const DailyRevenueSummary: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [breakdown] = useState<Breakdown[]>(dummyBreakdown);
  const [transactions] = useState<Transaction[]>(dummyTransactions);

  // refs for Chart.js
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // generate report handler
  const generateReport = () => {
    if (endDate < startDate) {
      alert('⚠️ End date cannot be earlier than start date!');
      return;
    }
    alert('🔄 Generating your report, please wait...');
    setTimeout(() => {
      alert('✅ Daily revenue summary generated successfully!');
    }, 500);
  };

  // draw / redraw pie chart
  useEffect(() => {
    if (!chartRef.current) return;

    // destroy existing chart if any
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // create new chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: breakdown.map((b) => b.category),
        datasets: [
          {
            data: breakdown.map((b) => b.amount),
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed;
                const total = breakdown.reduce((sum, b) => sum + b.amount, 0);
                const pct = ((val / total) * 100).toFixed(1);
                return `${ctx.label}: ₺${val.toLocaleString()} (${pct}%)`;
              },
            },
          },
        },
      },
    });

    // cleanup on unmount
    return () => {
      chartInstance.current?.destroy();
    };
  }, [breakdown]);

  // modal state
  const [detailOpen, setDetailOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Breakdown | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const openDetail = (b: Breakdown) => { setSelectedCategory(b); setDetailOpen(true); };
  const closeDetail = () => setDetailOpen(false);

  const openReceipt = (t: Transaction) => { setSelectedTransaction(t); setReceiptOpen(true); };
  const closeReceipt = () => setReceiptOpen(false);

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.title}>Daily Revenue Summary</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Reports and Analytics &gt; Daily Revenue Summary
      </div>

      {/* Date Selection */}
      <section className={styles.filterSection}>
        <h2>📅 Select Date Range</h2>
        <div className={styles.filterGrid}>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button className={`${styles.btn} ${styles.generateBtn}`} onClick={generateReport}>
          📊 Generate Report
        </button>
      </section>

      {/* Breakdown Table */}
      <section className={styles.breakdownSection}>
        <h2>💵 Revenue Breakdown</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Revenue Category', 'Total Amount (TL)', 'Transactions', 'Details'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {breakdown.map((b) => (
                <tr key={b.category}>
                  <td>{b.category}</td>
                  <td>{b.amount.toLocaleString()}</td>
                  <td>{b.transactions}</td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.viewDetailBtn}`}
                      onClick={() => openDetail(b)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td><strong>Total Revenue</strong></td>
                <td><strong>{breakdown.reduce((s, b) => s + b.amount, 0).toLocaleString()}</strong></td>
                <td><strong>{breakdown.reduce((s, b) => s + b.transactions, 0)}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pie Chart */}
      <section className={styles.chartSection}>
        <h2>📉 Revenue Distribution Chart</h2>
        <canvas ref={chartRef}></canvas>
      </section>

      {/* Transaction Log */}
      <section className={styles.logSection}>
        <h2>📝 Transaction Log</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Time','Description','Amount (TL)','Guest Name','Method','Receipt'].map((h)=>(
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.time}</td>
                  <td>{tx.description}</td>
                  <td>{tx.amount.toLocaleString()}</td>
                  <td>{tx.guest}</td>
                  <td>{tx.method}</td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.receiptBtn}`}
                      onClick={() => openReceipt(tx)}
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

      {/* Detail Modal */}
      {detailOpen && selectedCategory && (
        <div className={styles.modalOverlay} onClick={closeDetail}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeDetail}>&times;</span>
            <h2>{selectedCategory.category} Details – ₺{selectedCategory.amount.toLocaleString()}</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Description','Amount (TL)','Guest Name','Room No.','Payment Method','Transaction Time'].map((h)=>(
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .filter((tx) => tx.category === selectedCategory.category)
                    .map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.description}</td>
                        <td>{tx.amount.toLocaleString()}</td>
                        <td>{tx.guest}</td>
                        <td>{tx.room}</td>
                        <td>{tx.method}</td>
                        <td>{tx.time}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeDetail}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptOpen && selectedTransaction && (
        <div className={styles.modalOverlay} onClick={closeReceipt}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeReceipt}>&times;</span>
            <h2>🖨️ Transaction Receipt – {selectedTransaction.description}</h2>
            <p><strong>Guest Name:</strong> {selectedTransaction.guest}</p>
            <p><strong>Room Number:</strong> {selectedTransaction.room}</p>
            <p><strong>Transaction Date:</strong> {selectedTransaction.time}</p>
            <p><strong>Amount:</strong> ₺{selectedTransaction.amount.toLocaleString()}</p>
            <p><strong>Payment Method:</strong> {selectedTransaction.method}</p>
            <p><strong>Description:</strong> {selectedTransaction.description}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.printBtn}`}>Print Receipt</button>
              <button className={`${styles.btn} ${styles.downloadBtn}`}>Download PDF</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeReceipt}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRevenueSummary;
