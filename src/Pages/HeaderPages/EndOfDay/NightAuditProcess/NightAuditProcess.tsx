// D:\operavip-ts\src\Pages\HeaderPages\EndOfDay\NightAuditProcess\NightAuditProcess.tsx
import React, { useState } from 'react'
import styles from './NightAuditProcess.module.css'

type ModalData = {
  title: string
  content: React.ReactNode
}

export default function NightAuditProcess() {
  const [modal, setModal] = useState<ModalData | null>(null)

  const openModal = (title: string, content: React.ReactNode) => {
    setModal({ title, content })
  }
  const closeModal = () => setModal(null)

  const handleDownload = () => alert('📥 Download PDF (demo).')
  const handlePrint    = () => alert('🖨 Print Report (demo).')
  const startAudit     = () => alert('🌙 Night Audit started (demo).')

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Night Audit Process</h1>
        <nav className={styles.breadcrumb}>Home &gt; End of Day &gt; Night Audit Process</nav>
      </div>

      {/* Overview */}
      <section className={styles.overviewSection}>
        <h2>Night Audit Overview</h2>
        <table className={styles.overviewTable}>
          <thead>
            <tr>
              <th>Process</th><th>Status</th><th>Required Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { proc: 'Check Unpaid Reservations',   status: '🔴 Required' },
              { proc: 'Cashier Shifts Closure',      status: '🟡 Under Review' },
              { proc: 'Room Status Verification',    status: '🟢 Completed' },
              { proc: 'Collect Overdue Payments',    status: '🔴 Required' },
              { proc: 'Close Checked-out Reservations', status: '🟡 Under Review' },
            ].map(row => (
              <tr key={row.proc}>
                <td>{row.proc}</td>
                <td className={styles[`status${row.status.charAt(1) === '🔴' ? 'Red' : row.status.charAt(1) === '🟡' ? 'Yellow' : 'Green'}`]}>
                  {row.status}
                </td>
                <td>
                  <button
                    className={styles.actionBtn}
                    onClick={() => openModal(row.proc, (
                      <div>
                        <p>Details for <strong>{row.proc}</strong> (demo information).</p>
                        <p>— Dummy step 1</p>
                        <p>— Dummy step 2</p>
                        <div className={styles.modalButtons}>
                          <button onClick={handleDownload} className={styles.downloadBtn}>📥 Download PDF</button>
                          <button onClick={handlePrint}    className={styles.printBtn}>🖨 Print</button>
                        </div>
                      </div>
                    ))}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Send Daily Financial Reports</td>
              <td className={styles.statusGreen}>🟢 Completed</td>
              <td>
                <button
                  className={styles.downloadBtn}
                  onClick={() => alert('📥 Download daily financial report (demo).')}
                >
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.startAudit}>
          <button onClick={startAudit} className={styles.startBtn}>🌙 Start Night Audit</button>
        </div>
      </section>

      {/* Details Sections */}
      <section className={styles.detailsSection}>
        <h2>Night Audit Details</h2>

        {/* Room Status Verification */}
        <div className={styles.detailBlock}>
          <h3>Room Status Verification</h3>
          <table className={styles.detailTable}>
            <thead>
              <tr>
                <th>Room Number</th><th>System Status</th><th>Actual Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { room: '101', sys: 'Vacant', actual: 'Occupied', btn: 'Update' },
                { room: '203', sys: 'Occupied', actual: 'Vacant', btn: 'Verify' },
                { room: '305', sys: 'Out of Order', actual: 'Vacant', btn: 'Resolve' },
              ].map(r => (
                <tr key={r.room}>
                  <td>{r.room}</td>
                  <td>{r.sys}</td>
                  <td>{r.actual}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => alert(`${r.btn} room ${r.room} (demo).`)}
                    >
                      {r.btn}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verify Payments & Transactions */}
        <div className={styles.detailBlock}>
          <h3>Verify Payments &amp; Transactions</h3>
          <table className={styles.detailTable}>
            <thead>
              <tr>
                <th>Invoice Number</th><th>Guest Name</th><th>Amount Due</th><th>Payment Method</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { inv: '987654', guest: 'Abdullah Alhammami', due: '$250.00', method: 'Credit Card', status: '🔴 Pending' },
                { inv: '987655', guest: 'Ahmed Mohamed',       due: '$500.00', method: 'Cash',        status: '🟡 Under Review' },
                { inv: '987656', guest: 'Lina Khaled',         due: '$0.00',   method: 'Bank Transfer',status: '🟢 Cleared' },
              ].map(r => (
                <tr key={r.inv}>
                  <td>{r.inv}</td><td>{r.guest}</td><td>{r.due}</td><td>{r.method}</td>
                  <td className={styles[`status${r.status.charAt(1) === '🔴' ? 'Red' : r.status.charAt(1) === '🟡' ? 'Yellow' : 'Green'}`]}>
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cashier Shift Closure */}
        <div className={styles.detailBlock}>
          <h3>Cashier Shift Closure</h3>
          <table className={styles.detailTable}>
            <thead>
              <tr>
                <th>Shift Number</th><th>Employee Name</th><th>Cash in Drawer</th><th>Expected Amount</th><th>Difference</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { shift: '1201', emp: 'Omar Hamdan', drawer: '$1,200.00', expected: '$1,200.00', diff: '$0.00', status: '🟢 Closed' },
                { shift: '1202', emp: 'Ahmed Khaled',drawer: '$500.00',   expected: '$600.00',   diff: '-$100.00', status: '🔴 Issue Detected' },
              ].map(r => (
                <tr key={r.shift}>
                  <td>{r.shift}</td><td>{r.emp}</td><td>{r.drawer}</td><td>{r.expected}</td><td>{r.diff}</td>
                  <td className={r.status.includes('🟢') ? styles.statusGreen : styles.statusRed}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Close Checked-out Reservations */}
        <div className={styles.detailBlock}>
          <h3>Close Checked-out Reservations</h3>
          <table className={styles.detailTable}>
            <thead>
              <tr>
                <th>Reservation Number</th><th>Guest Name</th><th>Payment Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { res: '342109', guest: 'Abdullah Alhammami', status: '🟢 Cleared' },
                { res: '342210', guest: 'Ahmed Mohamed',      status: '🔴 Issue Detected' },
              ].map(r => (
                <tr key={r.res}>
                  <td>{r.res}</td><td>{r.guest}</td>
                  <td className={r.status.includes('🟢') ? styles.statusGreen : styles.statusRed}>{r.status}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => openModal('Reservation '+r.res, (
                        <div>
                          <p>Details for reservation <strong>{r.res}</strong> (demo).</p>
                          <div className={styles.modalButtons}>
                            <button onClick={handleDownload} className={styles.downloadBtn}>📥 Download PDF</button>
                            <button onClick={handlePrint}    className={styles.printBtn}>🖨 Print</button>
                          </div>
                        </div>
                      ))}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Send Daily Financial Reports */}
        <div className={styles.detailBlock}>
          <h3>Send Daily Financial Reports</h3>
          <div className={styles.reportButtons}>
            <button onClick={handleDownload} className={styles.downloadBtn}>📥 Download PDF</button>
            <button onClick={handlePrint}    className={styles.printBtn}>🖨 Print Report</button>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Night Audit Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Process</th><th>Status</th></tr>
          </thead>
          <tbody>
            {[
              ['Unpaid Reservations','🔴 Pending'],
              ['Cashier Shifts','🟡 Under Review'],
              ['Room Status','🟢 Completed'],
              ['Overdue Payments','🔴 Pending'],
              ['Checked-out Reservations','🟡 Under Review'],
            ].map(([proc,st]) => (
              <tr key={proc}>
                <td>{proc}</td>
                <td className={st.includes('🟢') ? styles.statusGreen : st.includes('🟡') ? styles.statusYellow : styles.statusRed}>{st}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {modal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{modal.title}</h3>
            <div className={styles.modalBody}>{modal.content}</div>
            <button onClick={closeModal} className={styles.closeBtn}>❌ Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
