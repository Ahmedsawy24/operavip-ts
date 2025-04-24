// D:\operavip-ts\src\Pages\HeaderPages\AR\LedgerReports\LedgerReports.tsx
import React, { useState, useRef } from 'react'
import styles from './LedgerReports.module.css'

interface LedgerReport {
  id: string
  reportType: string
  accountName: string
  accountId: string
  balance: string
  lastPaymentDate: string
  status: 'Pending' | 'Overdue' | 'Cleared'
}

interface ReportDetail extends LedgerReport {
  lastPaymentAmt: string
  nextDueDate: string
}

const dummyData: LedgerReport[] = [
  { id: '1', reportType: 'Guest Ledger',   accountName: 'Abdullah Alhammami', accountId: '987654', balance: '$1,200.00', lastPaymentDate: '12-04-2025', status: 'Pending' },
  { id: '2', reportType: 'City Ledger',    accountName: 'XYZ Corporation',    accountId: '1002',   balance: '$3,500.00', lastPaymentDate: '10-04-2025', status: 'Overdue' },
  { id: '3', reportType: 'Deposit Ledger', accountName: 'Ahmed Mohamed',      accountId: '342210', balance: '$500.00',   lastPaymentDate: '14-04-2025', status: 'Cleared' },
]

export default function LedgerReports() {
  const [detail, setDetail] = useState<ReportDetail | null>(null)
  const searchFormRef = useRef<HTMLFormElement>(null)
  const dateFromRef   = useRef<HTMLInputElement>(null)
  const dateToRef     = useRef<HTMLInputElement>(null)

  const handleGenerate = () => {
    const from = dateFromRef.current?.value
    const to   = dateToRef.current?.value
    if (from && to && to < from) {
      alert('⚠️ Please select a valid date range.')
      return
    }
    alert('Generating ledger report (demo).')
  }
  const handleReset = () => {
    searchFormRef.current?.reset()
    alert('Search form reset (demo).')
  }

  const handleView = (r: LedgerReport) => {
    setDetail({
      ...r,
      lastPaymentAmt: '$300.00',       // demo
      nextDueDate:   '20-04-2025',     // demo
    })
  }
  const handleCloseDetail = () => setDetail(null)
  const handleDownload = () => alert('📥 Download PDF (demo).')
  const handlePrint    = () => alert('🖨 Print Report (demo).')

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Ledger Reports</h1>
        <nav className={styles.breadcrumb}>Home &gt; AR &gt; Ledger Reports</nav>
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>Search for Ledger Reports</h2>
        <form ref={searchFormRef} id="searchForm" className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="reportType">Report Type</label>
              <select id="reportType">
                <option value="">-- Select --</option>
                <option>Guest Ledger</option>
                <option>City Ledger</option>
                <option>Deposit Ledger</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="accountType">Account Type</label>
              <select id="accountType">
                <option value="">-- Select --</option>
                <option>Guests</option>
                <option>Companies</option>
                <option>Travel Agents</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="dateFrom">Date From</label>
              <input type="date" id="dateFrom" ref={dateFromRef} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dateTo">Date To</label>
              <input type="date" id="dateTo" ref={dateToRef} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="accountId">Account ID</label>
              <input type="number" id="accountId" placeholder="Enter account ID" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="accountStatus">Account Status</label>
              <select id="accountStatus">
                <option value="">-- Select --</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={handleGenerate} className={styles.searchBtn}>🔍 Generate Report</button>
            <button type="button" onClick={handleReset}     className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Results */}
      <section className={styles.resultsSection}>
        <h2>Ledger Report Results</h2>
        <table className={styles.reportsTable}>
          <thead>
            <tr>
              <th>Report Type</th><th>Account Name</th><th>Account ID</th>
              <th>Outstanding Balance</th><th>Last Payment Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(r => (
              <tr key={r.id} data-reportid={r.id}>
                <td>{r.reportType}</td>
                <td>{r.accountName}</td>
                <td>{r.accountId}</td>
                <td>{r.balance}</td>
                <td>{r.lastPaymentDate}</td>
                <td className={styles[`status${r.status}`]}>
                  {r.status === 'Pending' ? '🟡 ' : r.status === 'Overdue' ? '🔴 ' : '🟢 '}
                  {r.status}
                </td>
                <td><button onClick={() => handleView(r)} className={styles.actionBtn}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Detail */}
      {detail && (
        <section className={styles.reportDetailSection} id="reportDetailSection">
          <h2>Ledger Report Details</h2>
          <div className={styles.reportDetailContent}>
            <p><strong>Report Type:</strong> {detail.reportType}</p>
            <p><strong>Account Name:</strong> {detail.accountName}</p>
            <p><strong>Account ID:</strong> {detail.accountId}</p>
            <p><strong>Total Outstanding Balance:</strong> {detail.balance}</p>
            <p><strong>Last Payment Amount:</strong> {detail.lastPaymentAmt}</p>
            <p><strong>Last Payment Date:</strong> {detail.lastPaymentDate}</p>
            <p><strong>Next Due Date:</strong> {detail.nextDueDate}</p>
            <p><strong>Status:</strong> {detail.status}</p>
            <div className={styles.reportButtons}>
              <button onClick={handleDownload} className={styles.downloadBtn}>📥 Download PDF</button>
              <button onClick={handlePrint}    className={styles.printBtn}>🖨 Print Report</button>
              <button onClick={handleCloseDetail} className={styles.closeBtn}>❌ Close</button>
            </div>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Ledger Reports Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Report Type</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>Guest Ledger</td><td>35</td></tr>
            <tr><td>City Ledger</td><td>12</td></tr>
            <tr><td>Deposit Ledger</td><td>8</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
