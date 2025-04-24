// D:\operavip-ts\src\Pages\HeaderPages\AR\AgingReports\AgingReports.tsx
import React, { useState, useRef } from 'react'
import styles from './AgingReports.module.css'

interface AgingReport {
  id: string
  accountName:    string
  accountId:      string
  current:        string
  zeroTo30:       string
  thirtyTo60:     string
  sixtyTo90:      string
  ninetyPlus:     string
  status:         'Pending' | 'Overdue' | 'Cleared'
}

interface AgingDetail extends AgingReport {
  totalDue:     string
}

const dummyData: AgingReport[] = [
  { id: '1', accountName: 'Abdullah Alhammami', accountId: '987654', current: '$1,200.00', zeroTo30: '$800.00', thirtyTo60: '$200.00', sixtyTo90: '$100.00', ninetyPlus: '$100.00', status: 'Overdue' },
  { id: '2', accountName: 'XYZ Corporation',    accountId: '1002',   current: '$3,500.00', zeroTo30: '$1,000.00', thirtyTo60: '$1,500.00', sixtyTo90: '$500.00', ninetyPlus: '$500.00', status: 'Pending' },
  { id: '3', accountName: 'Ahmed Mohamed',       accountId: '342210', current: '$500.00',   zeroTo30: '$400.00', thirtyTo60: '$100.00', sixtyTo90: '$0.00',   ninetyPlus: '$0.00',   status: 'Cleared' },
]

export default function AgingReports() {
  const [detail, setDetail] = useState<AgingDetail | null>(null)
  const formRef     = useRef<HTMLFormElement>(null)
  const reportDateRef = useRef<HTMLInputElement>(null)

  const handleGenerate = () => {
    const date = reportDateRef.current?.value
    if (!date) {
      alert('⚠️ Please select a valid report date.')
      return
    }
    alert('Generating aging report (demo).')
  }

  const handleReset = () => {
    formRef.current?.reset()
    alert('Search form reset (demo).')
  }

  const handleView = (r: AgingReport) => {
    setDetail({ ...r, totalDue: r.current /* demo: use current as totalDue */ })
  }
  const handleClose = () => setDetail(null)
  const handleDownload = () => alert('📥 Download PDF (demo).')
  const handlePrint    = () => alert('🖨 Print Report (demo).')

  return (
    <div className={styles.mainContainer}>
      {/* Header & Breadcrumb */}
      <div className={styles.pageHeader}>
        <h1>Aging Reports</h1>
        <nav className={styles.breadcrumb}>Home &gt; AR &gt; Aging Reports</nav>
      </div>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <h2>Search for Aging Reports</h2>
        <form ref={formRef} id="searchForm" className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="accountType">Account Type</label>
              <select id="accountType">
                <option value="">-- Select --</option>
                <option>Guests</option>
                <option>Companies</option>
                <option>Travel Agents</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reportDate">Report Date</label>
              <input type="date" id="reportDate" ref={reportDateRef}/>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="duePeriod">Due Period</label>
              <select id="duePeriod">
                <option value="">-- Select --</option>
                <option>Current</option>
                <option>30 Days</option>
                <option>60 Days</option>
                <option>90+ Days</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="accountId">Account ID</label>
              <input type="number" id="accountId" placeholder="Enter account ID"/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="minBalance">Minimum Balance</label>
              <input type="number" id="minBalance" placeholder="Enter min. balance"/>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={handleGenerate} className={styles.searchBtn}>🔍 Generate Report</button>
            <button type="button" onClick={handleReset}    className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Results Table */}
      <section className={styles.resultsSection}>
        <h2>Aging Report Results</h2>
        <table className={styles.agingTable}>
          <thead>
            <tr>
              <th>Account Name</th><th>Account ID</th><th>Current</th>
              <th>0-30 Days</th><th>31-60 Days</th><th>61-90 Days</th><th>90+ Days</th>
              <th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(r => (
              <tr key={r.id} data-reportid={r.id}>
                <td>{r.accountName}</td>
                <td>{r.accountId}</td>
                <td>{r.current}</td>
                <td>{r.zeroTo30}</td>
                <td>{r.thirtyTo60}</td>
                <td>{r.sixtyTo90}</td>
                <td>{r.ninetyPlus}</td>
                <td className={styles[`status${r.status}`]}>
                  {r.status === 'Overdue' ? '🔴 ' : r.status === 'Pending' ? '🟡 ' : '🟢 '}
                  {r.status}
                </td>
                <td>
                  <button onClick={() => handleView(r)} className={styles.actionBtn}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Detail Section */}
      {detail && (
        <section className={styles.reportDetailSection} id="reportDetailSection">
          <h2>Aging Report Details</h2>
          <div className={styles.reportDetailContent}>
            <p><strong>Account Name:</strong> {detail.accountName}</p>
            <p><strong>Account ID:</strong>   {detail.accountId}</p>
            <p><strong>Total Due:</strong>    {detail.totalDue}</p>
            <p><strong>0-30 Days:</strong>    {detail.zeroTo30}</p>
            <p><strong>31-60 Days:</strong>   {detail.thirtyTo60}</p>
            <p><strong>61-90 Days:</strong>   {detail.sixtyTo90}</p>
            <p><strong>90+ Days:</strong>     {detail.ninetyPlus}</p>
            <p><strong>Status:</strong>       {detail.status}</p>
            <div className={styles.reportButtons}>
              <button onClick={handleDownload} className={styles.downloadBtn}>📥 Download PDF</button>
              <button onClick={handlePrint}    className={styles.printBtn}>🖨 Print Report</button>
              <button onClick={handleClose}    className={styles.closeBtn}>❌ Close</button>
            </div>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Aging Reports Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Period</th><th>Total Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>0-30 Days</td><td>$10,000.00</td></tr>
            <tr><td>31-60 Days</td><td>$5,000.00</td></tr>
            <tr><td>61-90 Days</td><td>$2,000.00</td></tr>
            <tr><td>90+ Days</td><td>$1,500.00</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
