// D:\operavip-ts\src\Pages\HeaderPages\EndOfDay\ReviewDailyTransactions\ReviewDailyTransactions.tsx
import React, { useState, useRef } from 'react'
import styles from './ReviewDailyTransactions.module.css'

type Transaction = {
  id: string
  account: string
  type: string
  amount: string
  method: string
  status: 'Approved' | 'Pending' | 'Under Review'
  date: string
}

export default function ReviewDailyTransactions() {
  // Refs for search form
  const startRef = useRef<HTMLInputElement>(null)
  const endRef   = useRef<HTMLInputElement>(null)
  const typeRef  = useRef<HTMLSelectElement>(null)
  const methodRef= useRef<HTMLSelectElement>(null)

  // Dummy initial data (extended)
  const [txns, setTxns] = useState<Transaction[]>([
    { id:'TXN-987654', account:'Abdullah Alhammami', type:'Guest Payment', amount:'$250.00', method:'Credit Card',   status:'Approved',    date:'12-04-2025' },
    { id:'TXN-987655', account:'XYZ Corporation',      type:'Refund',          amount:'$500.00', method:'Bank Transfer',status:'Pending',     date:'12-04-2025' },
    { id:'TXN-987656', account:'Ahmed Mohamed',        type:'Adjustment',      amount:'-$30.00', method:'N/A',           status:'Under Review',date:'12-04-2025' },
    { id:'TXN-987657', account:'Global Ltd.',          type:'Charges',         amount:'$120.00', method:'Cash',          status:'Approved',    date:'12-04-2025' },
    { id:'TXN-987658', account:'Leila Hosni',          type:'Taxes & Fees',    amount:'$75.00',  method:'Credit Card',   status:'Pending',     date:'12-04-2025' },
  ])

  const [detail, setDetail] = useState<Transaction|null>(null)

  const search = () => {
    const start = startRef.current?.value
    const end   = endRef.current?.value
    if (!start || !end || end < start) {
      alert('⚠️ Please select a valid date range.')
      return
    }
    alert('🔍 Searching transactions (demo).')
    // منطق الفلترة يمكن إضافته هنا
  }

  const reset = () => {
    startRef.current!.value = ''
    endRef.current!.value   = ''
    typeRef.current!.selectedIndex   = 0
    methodRef.current!.selectedIndex = 0
    alert('🔄 Reset search criteria (demo).')
  }

  const refresh = () => {
    // محاكاة تغيير بعض الحالات
    setTxns(ts =>
      ts.map(t =>
        t.status==='Pending' && Math.random()>0.5
          ? { ...t, status:'Approved' }
          : t
      )
    )
    alert('🔄 Refreshing transaction status (demo).')
  }

  const viewDetail = (t: Transaction) => {
    setDetail(t)
  }
  const closeDetail = () => setDetail(null)
  const downloadTxn = () => alert('📥 Downloading transaction details (demo).')
  const printReceipt = () => alert('🖨 Printing receipt (demo).')

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Review Daily Transactions</h1>
        <nav className={styles.breadcrumb}>Home &gt; End of Day &gt; Review Daily Transactions</nav>
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>Search Transactions</h2>
        <form className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" ref={startRef}/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" ref={endRef}/>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="transactionType">Transaction Type</label>
              <select id="transactionType" ref={typeRef}>
                <option value="">-- Select --</option>
                <option>Guest Payments</option>
                <option>Refunds</option>
                <option>Charges</option>
                <option>Adjustments</option>
                <option>Taxes & Fees</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" ref={methodRef}>
                <option value="">-- Select --</option>
                <option>Credit Card</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={search} className={styles.searchBtn}>🔍 Search Transactions</button>
            <button type="button" onClick={reset}  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className={styles.listSection}>
        <h2>Daily Transactions List</h2>
        <button onClick={refresh} className={styles.refreshBtn}>🔄 Refresh Transaction Status</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th><th>Account</th><th>Type</th><th>Amount</th><th>Method</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {txns.map(t => (
              <tr key={t.id} data-txnid={t.id}>
                <td>{t.id}</td>
                <td>{t.account}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.method}</td>
                <td className={
                  t.status==='Approved' ? styles.statusGreen :
                  t.status==='Pending'  ? styles.statusRed   :
                                          styles.statusYellow
                }>
                  {t.status==='Approved' ? '🟢 Approved' :
                   t.status==='Pending'  ? '🔴 Pending'  :'🟡 Under Review'}
                </td>
                <td>
                  <button onClick={()=>viewDetail(t)} className={styles.actionBtn}>View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Detail */}
      {detail && (
        <section className={styles.detailSection} id="transactionDetailSection">
          <h2>Transaction Details</h2>
          <div className={styles.detailContent}>
            <p><strong>Transaction ID:</strong> {detail.id}</p>
            <p><strong>Guest / Account:</strong> {detail.account}</p>
            <p><strong>Transaction Type:</strong> {detail.type}</p>
            <p><strong>Amount:</strong> {detail.amount}</p>
            <p><strong>Payment Method:</strong> {detail.method}</p>
            <p><strong>Transaction Date:</strong> {detail.date}</p>
            <p><strong>Approval Status:</strong> {detail.status}</p>
            <div className={styles.detailButtons}>
              <button onClick={downloadTxn} className={styles.downloadBtn}>📥 Download Transaction</button>
              <button onClick={printReceipt} className={styles.printBtn}>🖨 Print Receipt</button>
              <button onClick={closeDetail} className={styles.closeBtn}>❌ Close</button>
            </div>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Daily Transactions Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Transaction Type</th><th>Count</th><th>Total Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>Guest Payments</td><td>35</td><td>$12,000.00</td></tr>
            <tr><td>Refunds</td><td>10</td><td>$2,500.00</td></tr>
            <tr><td>Adjustments</td><td>8</td><td>-$300.00</td></tr>
            <tr><td>Charges Added</td><td>20</td><td>$4,200.00</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
