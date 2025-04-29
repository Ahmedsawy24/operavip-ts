import React, { useState, useRef } from 'react'
import styles from './PostRoomAndTaxCharges.module.css'

type Reservation = {
  id: string
  guest: string
  room: string
  type: string
  rate: string
  tax: string
  total: string
  status: 'Pending' | 'In Progress' | 'Completed'
}

export default function PostRoomAndTaxCharges() {
  const checkInRef      = useRef<HTMLInputElement>(null)
  const checkOutRef     = useRef<HTMLInputElement>(null)
  const roomTypeRef     = useRef<HTMLSelectElement>(null)
  const paymentMethodRef= useRef<HTMLSelectElement>(null)

  const [reservations, setReservations] = useState<Reservation[]>([
    { id:'342109', guest:'Abdullah Alhammami', room:'101', type:'Deluxe Room',    rate:'$200.00', tax:'10%', total:'$220.00', status:'Pending' },
    { id:'342210', guest:'Ahmed Mohamed',       room:'305', type:'Standard Room', rate:'$150.00', tax:'8%',  total:'$162.00', status:'Pending' },
    { id:'342315', guest:'Lina Khaled',         room:'204', type:'Suite',         rate:'$300.00', tax:'12%', total:'$336.00', status:'In Progress' },
    // بيانات وهمية إضافية
    { id:'342420', guest:'Sara Alnahdi',        room:'110', type:'Executive Room',rate:'$250.00', tax:'11%', total:'$277.50', status:'Pending' },
    { id:'342521', guest:'Omar Youssef',        room:'502', type:'Suite',         rate:'$320.00', tax:'12%', total:'$358.40', status:'Completed' },
  ])
  const [detail, setDetail] = useState<Reservation|null>(null)

  const search = () => {
    const inD  = checkInRef.current?.value
    const outD = checkOutRef.current?.value
    if (!inD || !outD || outD < inD) {
      alert('⚠️ Please select a valid stay date range.')
      return
    }
    alert('🔍 Searching active reservations (demo).')
    // يمكنك هنا تطبيق filter على reservations استناداً للقيم
  }

  const reset = () => {
    checkInRef.current!.value = ''
    checkOutRef.current!.value= ''
    roomTypeRef.current!.selectedIndex     = 0
    paymentMethodRef.current!.selectedIndex= 0
    alert('🔄 Reset criteria (demo).')
  }

  const refresh = () => {
    alert('🔄 Refreshing charges status (demo).')
    // يمكنك هنا تحديث حالات الـreservations بشكل عشوائي أو ثابت
  }

  const showDetail = (r: Reservation) => {
    setDetail(r)
  }
  const closeDetail = () => {
    setDetail(null)
  }

  const postCharge = () => {
    if (!detail) return
    alert(`✅ Room & Tax charges posted for reservation ${detail.id} (demo).`)
    setReservations(rs =>
      rs.map(r =>
        r.id === detail.id
          ? { ...r, status:'Completed' }
          : r
      )
    )
    closeDetail()
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageHeader}>
        <h1>Post Room &amp; Tax Charges</h1>
        <nav className={styles.breadcrumb}>
          Home &gt; End of Day &gt; Post Room &amp; Tax Charges
        </nav>
      </div>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <h2>Search for Active Reservations</h2>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="checkInDate">Check-in Date</label>
              <input type="date" id="checkInDate" ref={checkInRef}/>
            </div>
            <div className={styles.group}>
              <label htmlFor="checkOutDate">Check-out Date</label>
              <input type="date" id="checkOutDate" ref={checkOutRef}/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="roomType">Room Type</label>
              <select id="roomType" ref={roomTypeRef}>
                <option value="">-- Select --</option>
                <option>Standard Room</option>
                <option>Deluxe Room</option>
                <option>Suite</option>
                <option>Executive Room</option>
              </select>
            </div>
            <div className={styles.group}>
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" ref={paymentMethodRef}>
                <option value="">-- Select --</option>
                <option>Credit Card</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Company Account</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={search} className={styles.searchBtn}>
              🔍 Search Reservations
            </button>
            <button type="button" onClick={reset} className={styles.resetBtn}>
              🔄 Reset
            </button>
          </div>
        </form>
      </section>

      {/* Reservations List */}
      <section className={styles.listSection}>
        <h2>Active Reservations List</h2>
        <button onClick={refresh} className={styles.refreshBtn}>
          🔄 Refresh Charges Status
        </button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reservation ID</th><th>Guest Name</th><th>Room #</th>
              <th>Room Type</th><th>Nightly Rate</th><th>Tax %</th>
              <th>Total Charge</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id} data-resvid={r.id}>
                <td>{r.id}</td>
                <td>{r.guest}</td>
                <td>{r.room}</td>
                <td>{r.type}</td>
                <td>{r.rate}</td>
                <td>{r.tax}</td>
                <td>{r.total}</td>
                <td className={
                  r.status==='Completed'? styles.statusGreen
                  : r.status==='Pending'  ? styles.statusRed
                  :                          styles.statusYellow
                }>
                  {r.status==='Pending' ? '🔴 Pending'
                   : r.status==='Completed'?'🟢 Completed'
                   :'🟡 In Progress'}
                </td>
                <td>
                  {r.status==='Pending' && (
                    <button onClick={()=>showDetail(r)} className={styles.actionBtn}>
                      Post Charge
                    </button>
                  )}
                  {r.status==='In Progress' && (
                    <button onClick={()=>showDetail(r)} className={styles.actionBtn}>
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Detail Modal */}
      {detail && (
        <section className={styles.detailSection}>
          <h2>Room &amp; Tax Charge Details</h2>
          <div className={styles.detailContent}>
            <p><strong>Reservation ID:</strong> {detail.id}</p>
            <p><strong>Guest Name:</strong> {detail.guest}</p>
            <p><strong>Room Number:</strong> {detail.room}</p>
            <p><strong>Room Type:</strong> {detail.type}</p>
            <p><strong>Nightly Rate:</strong> {detail.rate}</p>
            <p><strong>Number of Nights:</strong> 2</p>
            <p><strong>Tax Percentage:</strong> {detail.tax}</p>
            <p><strong>Total Tax Amount:</strong> $40.00</p>
            <p><strong>Total Room Charge:</strong> $400.00</p>
            <p><strong>Total Charge:</strong> {detail.total}</p>
            <p><strong>Status:</strong> {detail.status}</p>
            <div className={styles.detailButtons}>
              <button onClick={postCharge} className={styles.submitBtn}>
                ✅ Post Room &amp; Tax Charges
              </button>
              <button onClick={closeDetail} className={styles.cancelBtn}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Room &amp; Tax Charges Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Status</th><th>Count</th><th>Total Charges</th></tr>
          </thead>
          <tbody>
            <tr><td>🔴 Pending Charges</td>    <td>5</td>  <td>$2,500.00</td></tr>
            <tr><td>🟡 In Progress</td>         <td>3</td>  <td>$1,200.00</td></tr>
            <tr><td>🟢 Completed Charges</td>  <td>10</td> <td>$5,000.00</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
