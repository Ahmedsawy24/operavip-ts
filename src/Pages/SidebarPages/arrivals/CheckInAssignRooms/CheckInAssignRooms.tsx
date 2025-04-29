// D:/operavip-ts/src/Pages/SidebarPages/arrivals/CheckInAssignRooms/CheckInAssignRooms.tsx
import React, { useState, ChangeEvent } from 'react'
import styles from './CheckInAssignRooms.module.css'

interface Booking {
  bookingId: number
  guestName: string
  roomNumber: string | null
  arrivalDate: string
  departureDate: string
  roomType: string
  status: 'Confirmed' | 'Pending' | 'Checked-In'
}

const dummyBookings: Booking[] = [
  {
    bookingId: 230101,
    guestName: 'Abdullah Alhammami',
    roomNumber: '101',
    arrivalDate: '2025-04-10',
    departureDate: '2025-04-15',
    roomType: 'Single',
    status: 'Confirmed',
  },
  {
    bookingId: 230102,
    guestName: 'Ahed Sami',
    roomNumber: '105',
    arrivalDate: '2025-04-11',
    departureDate: '2025-04-12',
    roomType: 'Double',
    status: 'Pending',
  },
  {
    bookingId: 230103,
    guestName: 'Lina Khaled',
    roomNumber: null,
    arrivalDate: '2025-04-12',
    departureDate: '2025-04-14',
    roomType: 'Suite',
    status: 'Pending',
  },
  // ...more dummy entries if you like
]

const CheckInAssignRooms: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings)
  const [filtered, setFiltered] = useState<Booking[]>(dummyBookings)
  const [searchText, setSearchText] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const [viewModal, setViewModal] = useState<Booking | null>(null)
  const [assignModal, setAssignModal] = useState<Booking | null>(null)
  const [checkInModal, setCheckInModal] = useState<Booking | null>(null)

  // Filter logic
  const applyFilters = () => {
    const res = bookings.filter(b => {
      const matchesText =
        !searchText ||
        b.guestName.toLowerCase().includes(searchText.toLowerCase()) ||
        b.bookingId.toString().includes(searchText)
      const matchesFrom = !dateFrom || b.arrivalDate >= dateFrom
      const matchesTo = !dateTo || b.departureDate <= dateTo
      return matchesText && matchesFrom && matchesTo
    })
    setFiltered(res)
  }

  // Handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value)
  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDateFrom(e.target.value)
  const handleToChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDateTo(e.target.value)

  const openView = (b: Booking) => setViewModal(b)
  const openAssign = (b: Booking) => setAssignModal(b)
  const openCheckIn = (b: Booking) => setCheckInModal(b)

  const closeAll = () => {
    setViewModal(null)
    setAssignModal(null)
    setCheckInModal(null)
  }

  // Confirm actions
  const confirmAssignment = () => {
    alert('✅ Room assigned (demo).')
    closeAll()
  }
  const confirmCheckIn = () => {
    if (!checkInModal) return
    setBookings(bs =>
      bs.map(b =>
        b.bookingId === checkInModal.bookingId
          ? { ...b, status: 'Checked-In' }
          : b
      )
    )
    alert('✅ Guest checked-in (demo).')
    closeAll()
  }

  return (
    <div className={styles.checkInMain}>
      

      <h1 className={styles.pageTitle}>Check-In &amp; Assign Rooms</h1>
      
      <div className={styles.breadcrumb}>
        Home &gt; Arrivals &gt; Check-In &amp; Assign Rooms
      </div>

      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Guest Name or Booking #"
          className={styles.searchInput}
          value={searchText}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          className={styles.datePicker}
          value={dateFrom}
          onChange={handleFromChange}
        />
        <input
          type="date"
          className={styles.datePicker}
          value={dateTo}
          onChange={handleToChange}
        />
        <button className={styles.applyBtn} onClick={applyFilters}>
          🔍 Apply Filters
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking #</th>
            <th>Guest Name</th>
            <th>Room #</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Room Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(b => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td>{b.guestName}</td>
              <td>{b.roomNumber ?? '—'}</td>
              <td>{b.arrivalDate}</td>
              <td>{b.departureDate}</td>
              <td>{b.roomType}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    b.status === 'Confirmed'
                      ? styles.confirmed
                      : b.status === 'Pending'
                      ? styles.pending
                      : styles.checkedIn
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => openView(b)}
                >
                  View
                </button>
                <button
                  className={styles.checkInBtn}
                  onClick={() => openCheckIn(b)}
                >
                  Check-In
                </button>
                <button
                  className={styles.assignBtn}
                  onClick={() => openAssign(b)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination placeholder */}
      <div className={styles.pagination}>
        <span>
          Showing 1 to {filtered.length} of {bookings.length} entries
        </span>
        <div className={styles.pages}>
          <button disabled>Previous</button>
          <button className={styles.activePage}>1</button>
          <button disabled>Next</button>
        </div>
      </div>

      {/* View Details Modal */}
      {viewModal && (
        <div className={styles.modal} onClick={closeAll}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>Booking Details</h2>
            <p>
              <strong>Booking #:</strong> {viewModal.bookingId}
            </p>
            <p>
              <strong>Guest:</strong> {viewModal.guestName}
            </p>
            <p>
              <strong>Arrival:</strong> {viewModal.arrivalDate}
            </p>
            <p>
              <strong>Departure:</strong> {viewModal.departureDate}
            </p>
            <p>
              <strong>Type:</strong> {viewModal.roomType}
            </p>
            <p>
              <strong>Status:</strong> {viewModal.status}
            </p>
            <button
              className={styles.modalCancel}
              onClick={closeAll}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Assign Room Modal */}
      {assignModal && (
        <div className={styles.modal} onClick={closeAll}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>
              Assign Room – {assignModal.guestName} (#
              {assignModal.bookingId})
            </h2>
            <label>Available Rooms:</label>
            <select>
              <option>101</option>
              <option>102</option>
              <option>103</option>
            </select>
            <label>Floor:</label>
            <select>
              <option>1</option>
              <option>2</option>
            </select>
            <textarea
              placeholder="Special Requests..."
            />
            <button
              className={styles.modalConfirm}
              onClick={confirmAssignment}
            >
              Confirm
            </button>
            <button
              className={styles.modalCancel}
              onClick={closeAll}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Check-In Modal */}
      {checkInModal && (
        <div className={styles.modal} onClick={closeAll}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>
              Check-In – {checkInModal.guestName} (#
              {checkInModal.bookingId})
            </h2>
            <label>Room Number:</label>
            <select>
              <option>101</option>
              <option>102</option>
            </select>
            <label>Payment Status:</label>
            <select>
              <option>Paid</option>
              <option>Pay Later</option>
            </select>
            <button
              className={styles.modalConfirm}
              onClick={confirmCheckIn}
            >
              Confirm Check-In
            </button>
            <button
              className={styles.modalCancel}
              onClick={closeAll}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckInAssignRooms
