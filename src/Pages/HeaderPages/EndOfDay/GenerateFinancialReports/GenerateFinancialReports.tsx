// D:\operavip-ts\src\Pages\HeaderPages\EndOfDay\GenerateFinancialReports\GenerateFinancialReports.tsx
import React, { useRef, useState } from 'react'
import styles from './GenerateFinancialReports.module.css'

type Report = {
  id: string
  name: string
  date: string
  by: string
  format: 'PDF' | 'Excel' | 'CSV'
  status: 'Ready' | 'Processing'
}

export default function GenerateFinancialReports() {
  const startDateRef  = useRef<HTMLInputElement>(null)
  const endDateRef    = useRef<HTMLInputElement>(null)
  const reportTypeRef = useRef<HTMLSelectElement>(null)
  const formatRef     = useRef<HTMLSelectElement>(null)

  const [reports, setReports] = useState<Report[]>([
    { id:'1', name:'Daily Revenue Report',       date:'12-04-2025', by:'Omar Hamdan',      format:'PDF',    status:'Ready' },
    { id:'2', name:'Room Occupancy Report',      date:'12-04-2025', by:'Ahmed Khaled',    format:'Excel',  status:'Ready' },
    { id:'3', name:'Guest Ledger Report',        date:'12-04-2025', by:'Lina Khaled',     format:'CSV',    status:'Processing' },
    { id:'4', name:'City Ledger Report',         date:'11-04-2025', by:'Abdullah Ali',    format:'PDF',    status:'Ready' },
  ])

  const [detail, setDetail] = useState<Report|null>(null)

  const resetForm = () => {
    const start = startDateRef.current?.value
    const end   = endDateRef.current?.value
    const type  = reportTypeRef.current?.value
    const fmt   = formatRef.current?.value
    if (!start || !end || end < start) {
      alert('⚠️ Please select a valid date range.')
      return
    }
    if (!type) {
      alert('⚠️ Please select a report type.')
      return
    }
    if (!fmt) {
      alert('⚠️ Please select a report format.')
      return
    }
    // إضافة تقرير وهمي جديد
    const newRep: Report = {
      id: String(reports.length + 1),
      name: type,
      date: start,
      by: 'Demo User',
      format: fmt as any,
      status: 'Processing'
    }
    setReports([newRep, ...reports])
    alert(`Generating ${type} from ${start} to ${end} as ${fmt} (demo).`)
  }

  const generate = () => {
    if (!startDateRef.current || !endDateRef.current || !reportTypeRef.current || !formatRef.current) {
      alert("Some form fields are not available.");
      return;
    }
  
    const start = startDateRef.current.value;
    const end = endDateRef.current.value;
    const type = reportTypeRef.current.value;
    const fmt  = formatRef.current.value;
  }

  const refresh = () => {
    // محاكاة انتهاء بعض العمليات
    setReports(rs =>
      rs.map(r =>
        r.status === 'Processing' && Math.random() > 0.5
          ? { ...r, status: 'Ready' }
          : r
      )
    )
    alert('🔄 Refreshing report status (demo).')
  }

  const viewDetails = (r: Report) => {
    setDetail(r)
  }
  const closeDetail = () => setDetail(null)
  const download = () => alert('📥 Downloading report (demo).')
  const printRep = () => alert('🖨 Printing report (demo).')

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Generate Financial Reports</h1>
        <nav className={styles.breadcrumb}>Home &gt; End of Day &gt; Generate Financial Reports</nav>
      </div>

      {/* Criteria */}
      <section className={styles.criteriaSection}>
        <h2>Report Criteria</h2>
        <form id="reportForm" className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" ref={startDateRef}/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" ref={endDateRef}/>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="reportType">Report Type</label>
              <select id="reportType" ref={reportTypeRef}>
                <option value="">-- Select --</option>
                <option>Daily Revenue Report</option>
                <option>Room Occupancy Report</option>
                <option>Guest Ledger Report</option>
                <option>City Ledger Report</option>
                <option>Cashier Transactions Report</option>
                <option>Tax & Fees Report</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reportFormat">Report Format</label>
              <select id="reportFormat" ref={formatRef}>
                <option value="">-- Select --</option>
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={generate} className={styles.generateBtn}>📊 Generate Report</button>
            <button type="button" onClick={resetForm} className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Reports List */}
      <section className={styles.reportsListSection}>
        <h2>Generated Reports</h2>
        <button onClick={refresh} className={styles.refreshBtn}>🔄 Refresh Report Status</button>
        <table className={styles.reportsTable}>
          <thead>
            <tr>
              <th>Report Name</th><th>Date Generated</th><th>Generated By</th><th>Format</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id} data-reportid={r.id}>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td>{r.by}</td>
                <td>{r.format}</td>
                <td className={r.status==='Ready' ? styles.statusReady : styles.statusProcessing}>
                  {r.status==='Ready' ? '🟢 Ready' : '🔄 Processing'}
                </td>
                <td>
                  {r.status==='Ready' ? (
                    <>
                      <button onClick={() => viewDetails(r)} className={styles.actionBtn}>View</button>
                      <button onClick={download} className={styles.actionBtn}>Download</button>
                    </>
                  ) : (
                    <button className={styles.waitBtn}>⏳ Wait</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Detail */}
      {detail && (
        <section className={styles.reportDetailSection} id="reportDetailSection">
          <h2>Report Details</h2>
          <div className={styles.reportDetailContent}>
            <p><strong>Report Name:</strong> {detail.name}</p>
            <p><strong>Generated By:</strong> {detail.by}</p>
            <p><strong>Date Generated:</strong> {detail.date}</p>
            <p><strong>Total Revenue:</strong> $25,000.00</p>
            <p><strong>Total Transactions:</strong> 250</p>
            <p><strong>Total Rooms Occupied:</strong> 180</p>
            <p><strong>Tax Collected:</strong> $3,500.00</p>
            <div className={styles.reportButtons}>
              <button onClick={download} className={styles.downloadBtn}>📥 Download Report</button>
              <button onClick={printRep} className={styles.printBtn}>🖨 Print Report</button>
              <button onClick={closeDetail} className={styles.closeBtn}>❌ Close</button>
            </div>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Financial Reports Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Report Type</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>Revenue Reports</td><td>3</td></tr>
            <tr><td>Room Occupancy Reports</td><td>5</td></tr>
            <tr><td>Guest Ledger Reports</td><td>4</td></tr>
            <tr><td>City Ledger Reports</td><td>2</td></tr>
            <tr><td>Tax & Fees Reports</td><td>6</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
