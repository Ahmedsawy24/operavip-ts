// D:\operavip-ts\src\Pages\HeaderPages\EndOfDay\CloseCashierSessions\CloseCashierSessions.tsx
import React, { useState, useRef } from 'react'
import styles from './CloseCashierSessions.module.css'

type Session = {
  id: string
  cashier: string
  start: string
  end: string
  totalCash: string
  expected: string
  status: 'Open' | 'Pending Review' | 'Closed'
}

export default function CloseCashierSessions() {
  const startRef  = useRef<HTMLInputElement>(null)
  const endRef    = useRef<HTMLInputElement>(null)
  const cashierRef= useRef<HTMLSelectElement>(null)
  const statusRef = useRef<HTMLSelectElement>(null)

  const [sessions, setSessions] = useState<Session[]>([
    { id:'CS-1201', cashier:'Omar Hamdan',  start:'08:00 AM', end:'-',       totalCash:'$1,200.00', expected:'$1,200.00', status:'Open' },
    { id:'CS-1202', cashier:'Ahmed Khaled', start:'02:00 PM', end:'-',       totalCash:'$500.00',   expected:'$500.00',   status:'Open' },
    { id:'CS-1203', cashier:'Lina Khaled',  start:'10:00 AM', end:'06:00 PM', totalCash:'$1,100.00', expected:'$1,200.00', status:'Pending Review' },
    // بيانات وهمية إضافية
    { id:'CS-1204', cashier:'Fatima Ali',   start:'09:00 AM', end:'-',       totalCash:'$800.00',   expected:'$800.00',   status:'Open' },
    { id:'CS-1205', cashier:'Youssef Sami', start:'11:30 AM', end:'07:00 PM', totalCash:'$1,300.00', expected:'$1,300.00', status:'Closed' },
  ])

  const [detail, setDetail] = useState<Session|null>(null)

  const search = () => {
    const s = startRef.current?.value
    const e = endRef.current?.value
    if (!s || !e || e < s) {
      alert('⚠️ Please select a valid date range.')
      return
    }
    alert('🔍 Searching sessions (demo).')
    // منطق الفلترة يمكن إضافته هنا
  }

  const reset = () => {
    startRef.current!.value = ''
    endRef.current!.value   = ''
    cashierRef.current!.selectedIndex = 0
    statusRef.current!.selectedIndex  = 0
    alert('🔄 Reset criteria (demo).')
  }

  const refresh = () => {
    // Demo: randomly close one open
    setSessions(ss =>
      ss.map(s =>
        s.status==='Open' && Math.random()>0.7
          ? { ...s, status:'Pending Review' }
          : s
      )
    )
    alert('🔄 Refreshing sessions (demo).')
  }

  const showDetail = (s: Session) => setDetail(s)
  const closeDetail = () => setDetail(null)

  const closeSession = () => {
    if (!detail) return
    alert(`🔒 Closing session ${detail.id} (demo).`)
    setSessions(ss =>
      ss.map(s =>
        s.id===detail.id ? { ...s, status:'Closed', end:(new Date()).toLocaleTimeString() } : s
      )
    )
    closeDetail()
  }

  const reviewSession = () => {
    if (!detail) return
    alert(`🔄 Reviewing session ${detail.id} (demo).`)
    closeDetail()
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageHeader}>
        <h1>Close Cashier Sessions</h1>
        <nav className={styles.breadcrumb}>Home &gt; End of Day &gt; Close Cashier Sessions</nav>
      </div>

      <section className={styles.searchSection}>
        <h2>Search Open Cashier Sessions</h2>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="sessionStartDate">Start Date</label>
              <input type="date" id="sessionStartDate" ref={startRef}/>
            </div>
            <div className={styles.group}>
              <label htmlFor="sessionEndDate">End Date</label>
              <input type="date" id="sessionEndDate" ref={endRef}/>
            </div>
            <div className={styles.group}>
              <label htmlFor="cashierName">Cashier Name</label>
              <select id="cashierName" ref={cashierRef}>
                <option value="">-- Select --</option>
                <option>Omar Hamdan</option>
                <option>Ahmed Khaled</option>
                <option>Lina Khaled</option>
                <option>Fatima Ali</option>
              </select>
            </div>
            <div className={styles.group}>
              <label htmlFor="sessionStatus">Session Status</label>
              <select id="sessionStatus" ref={statusRef}>
                <option value="">-- Select --</option>
                <option>Open</option>
                <option>Pending Review</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={search} className={styles.searchBtn}>🔍 Search Sessions</button>
            <button type="button" onClick={reset}  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      <section className={styles.listSection}>
        <h2>Open Cashier Sessions List</h2>
        <button onClick={refresh} className={styles.refreshBtn}>🔄 Refresh Sessions</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Session ID</th><th>Cashier</th><th>Start Time</th><th>End Time</th>
              <th>Total Cash</th><th>Expected</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id} data-sessionid={s.id}>
                <td>{s.id}</td>
                <td>{s.cashier}</td>
                <td>{s.start}</td>
                <td>{s.end}</td>
                <td>{s.totalCash}</td>
                <td>{s.expected}</td>
                <td className={
                  s.status==='Closed' ? styles.statusGreen :
                  s.status==='Open'   ? styles.statusRed   :
                                         styles.statusYellow
                }>
                  {s.status==='Open'   ? '🔴 Open' :
                   s.status==='Closed' ? '🟢 Closed' : '🟡 Pending Review'}
                </td>
                <td>
                  <button onClick={()=>showDetail(s)} className={styles.actionBtn}>Close Session</button>
                  <button onClick={()=>showDetail(s)} className={styles.actionBtn}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {detail && (
        <section className={styles.detailSection}>
          <h2>Cashier Session Details</h2>
          <div className={styles.detailContent}>
            <p><strong>Session ID:</strong> {detail.id}</p>
            <p><strong>Cashier Name:</strong> {detail.cashier}</p>
            <p><strong>Start Time:</strong> {detail.start}</p>
            <p><strong>End Time:</strong> {detail.end}</p>
            <p><strong>Total Cash Collected:</strong> {detail.totalCash}</p>
            <p><strong>Expected Balance:</strong> {detail.expected}</p>
            <p><strong>Difference:</strong> {
              `$${(parseFloat(detail.totalCash.replace('$','')) - parseFloat(detail.expected.replace('$',''))).toFixed(2)}`
            }</p>
            <p><strong>Status:</strong> {detail.status}</p>
            <div className={styles.detailButtons}>
              <button onClick={closeSession} className={styles.submitBtn}>🔒 Close Cashier Session</button>
              <button onClick={reviewSession} className={styles.updateBtn}>🔄 Review Session</button>
              <button onClick={closeDetail} className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </div>
        </section>
      )}

      <section className={styles.summarySection}>
        <h2>Cashier Sessions Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Session Status</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>🔴 Open Sessions</td>       <td>3</td></tr>
            <tr><td>🟡 Pending Review</td>     <td>2</td></tr>
            <tr><td>🟢 Closed Sessions</td>    <td>5</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
