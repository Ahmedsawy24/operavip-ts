// GuestStatusUpdates.tsx
import React, { useState, useMemo } from 'react'
import styles from './GuestStatusUpdates.module.css'

type Guest = {
  reservationId: string
  name: string
  roomNumber: string
  arrivalDate: string
  status: 'Confirmed' | 'Pending' | 'No-Show' | 'Checked-In' | 'Cancelled'
  notes?: string
}

export default function GuestStatusUpdates() {
  // بيانات وهمية
  const [guests] = useState<Guest[]>([
    { reservationId:'123456', name:'John Doe',      roomNumber:'201', arrivalDate:'2025-03-16', status:'Confirmed', notes:'Requested late check-in.' },
    { reservationId:'123457', name:'Jane Smith',    roomNumber:'205', arrivalDate:'2025-03-17', status:'Pending' },
    { reservationId:'123458', name:'Ali Hassan',    roomNumber:'N/A', arrivalDate:'2025-03-18', status:'No-Show' },
    { reservationId:'123459', name:'Sara Al Saud',  roomNumber:'302', arrivalDate:'2025-03-19', status:'Pending' },
    { reservationId:'123460', name:'Omar Youssef',  roomNumber:'210', arrivalDate:'2025-03-20', status:'Confirmed' },
    { reservationId:'123461', name:'Lina Khaled',   roomNumber:'101', arrivalDate:'2025-03-21', status:'No-Show' },
  ])

  const [filter, setFilter] = useState('')
  const [modalGuest, setModalGuest] = useState<Guest|null>(null)
  const [newStatus, setNewStatus] = useState<Guest['status']>('Confirmed')
  const [newNotes, setNewNotes] = useState('')

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return guests
    return guests.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.reservationId.includes(q)
    )
  }, [filter, guests])

  const openModal = (g: Guest) => {
    setModalGuest(g)
    setNewStatus(g.status)
    setNewNotes(g.notes || '')
  }
  const closeModal = () => setModalGuest(null)
  const updateStatus = () => {
    alert(`Status updated to "${newStatus}"\nNotes: ${newNotes}`)
    closeModal()
  }

  return (
    <div className={styles.container}>
      <header className={styles.header} />

      <main className={styles.main}>
        

        <div className={styles.title}>
          <h1>Guest Status Updates</h1>
        </div>

        <div className={styles.breadcrumb}>
          Home &gt; Arrivals &gt; Guest Status Updates
        </div>

        <div className={styles.search}>
          <h3>Search and Filter Reservations</h3>
          <div className={styles.filterBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter Guest Name or Booking Number"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <button
              className={styles.searchBtn}
              onClick={() => alert(`🔍 Searching for "${filter}" (demo)`)}
            >
              Search
            </button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Guest Name</th>
              <th>Room Number</th>
              <th>Arrival Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.reservationId}>
                <td>{g.reservationId}</td>
                <td>{g.name}</td>
                <td>{g.roomNumber}</td>
                <td>{g.arrivalDate}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      g.status === 'Confirmed'  ? styles.confirmed :
                      g.status === 'Pending'    ? styles.pending :
                      g.status === 'No-Show'    ? styles.noShow :
                      g.status === 'Checked-In' ? styles.checkedIn :
                                                  styles.cancelled
                    }`}
                  >
                    {g.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() => openModal(g)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span>
            Showing 1 to {filtered.length} of {guests.length} entries
          </span>
          <div className={styles.pages}>
            <button>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </main>

      {modalGuest && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>Guest Details</h2>
            <p><strong>Guest Name:</strong> {modalGuest.name}</p>
            <p><strong>Arrival Date:</strong> {modalGuest.arrivalDate}</p>
            <p><strong>Room Number:</strong> {modalGuest.roomNumber}</p>
            <p><strong>Status:</strong> {modalGuest.status}</p>
            <p><strong>Notes:</strong> {modalGuest.notes || '-'}</p>

            <h3>Update Status</h3>
            <select
              className={styles.modalSelect}
              value={newStatus}
              onChange={e => setNewStatus(e.target.value as Guest['status'])}
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Checked-In">Checked-In</option>
              <option value="No-Show">No-Show</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <textarea
              className={styles.modalTextarea}
              placeholder="Add Notes..."
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
            />

            <button
              className={styles.modalConfirm}
              onClick={updateStatus}
            >
              Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
