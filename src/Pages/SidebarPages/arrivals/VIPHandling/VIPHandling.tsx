import React, { useState, useMemo } from 'react';
import styles from './VIPHandling.module.css';

interface VIPBooking {
  bookingId: string;
  guestName: string;
  roomNumber: string;
  arrival: string;
  departure: string;
  vipLevel: string;
  specialRequests: string;
  butler: string;
  status: 'Confirmed' | 'Pending';
}

export default function VIPHandling() {
  // بيانات وهمية
  const dummyBookings: VIPBooking[] = useMemo(() => [
    {
      bookingId: '230045',
      guestName: 'John Smith',
      roomNumber: '505',
      arrival: '2025-03-16',
      departure: '2025-03-20',
      vipLevel: 'Gold VIP',
      specialRequests: 'Airport Pickup',
      butler: 'None',
      status: 'Confirmed',
    },
    {
      bookingId: '230046',
      guestName: 'Sarah Brown',
      roomNumber: '702',
      arrival: '2025-03-18',
      departure: '2025-03-22',
      vipLevel: 'Black VIP',
      specialRequests: 'Private Chef',
      butler: 'None',
      status: 'Pending',
    },
    {
      bookingId: '230047',
      guestName: 'Michael Oliver',
      roomNumber: '803',
      arrival: '2025-04-20',
      departure: '2025-04-25',
      vipLevel: 'Platinum VIP',
      specialRequests: 'Spa Appointment',
      butler: 'None',
      status: 'Pending',
    },
  ], []);

  // الحالات
  const [visibleBookings, setVisibleBookings] = useState<VIPBooking[]>(dummyBookings);
  const [viewModal, setViewModal] = useState<VIPBooking | null>(null);
  const [editModal, setEditModal] = useState<VIPBooking | null>(null);
  const [assignModal, setAssignModal] = useState<VIPBooking | null>(null);

  // دوال الإجراءات
  const applyVipFilters = () => {
    console.log('VIP Filters Applied');
    // هنا يمكنك فلترة visibleBookings بناءً على القيم وأحدث state
  };

  const closeModal = () => {
    setViewModal(null);
    setEditModal(null);
    setAssignModal(null);
  };

  const confirmButlerAssignment = () => {
    alert('Butler successfully assigned!');
    closeModal();
  };

  const saveVipChanges = () => {
    alert('VIP status updated successfully!');
    closeModal();
  };

  return (
    <div className={styles.main}>
      
      <div className={styles.pageTitle}>
        <h1><i className="fas fa-star" style={{ color: '#FFD700', marginRight: '8px' }}></i>VIP Handling</h1>
      </div>

      <div className={styles.breadcrumb}>
        Home &gt; Arrivals &gt; VIP Handling
      </div>

      {/* Search & Filter */}
      <div className={styles.searchFilter}>
        <h3>Search &amp; Filter VIP Guests</h3>
        <div className={styles.filterContainer}>
          <input
            type="text"
            id="vipSearchInput"
            placeholder="Search by Guest Name, Booking ID, or Room Number"
            className={styles.searchInput}
          />
          <label htmlFor="vipArrivalDate">From:</label>
          <input type="date" id="vipArrivalDate" className={styles.datePicker} />
          <label htmlFor="vipDepartureDate">To:</label>
          <input type="date" id="vipDepartureDate" className={styles.datePicker} />

          <select id="vipRoomType" className={styles.roomTypeSelect}>
            <option value="">-- Room Type --</option>
            <option value="Suite">Suite</option>
            <option value="Presidential Suite">Presidential Suite</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="Penthouse">Penthouse</option>
          </select>

          <select id="vipLevel" className={styles.vipLevelSelect}>
            <option value="">-- VIP Level --</option>
            <option value="Gold VIP">Gold VIP</option>
            <option value="Platinum VIP">Platinum VIP</option>
            <option value="Black VIP">Black VIP</option>
          </select>

          <button onClick={applyVipFilters} className={styles.applyBtn}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* VIP Guest Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking #</th>
            <th>Guest Name</th>
            <th>Room Number</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>VIP Level</th>
            <th>Special Requests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleBookings.map(b => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td>{b.guestName}</td>
              <td>{b.roomNumber}</td>
              <td>{b.arrival}</td>
              <td>{b.departure}</td>
              <td>{b.vipLevel}</td>
              <td>{b.specialRequests}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    b.status === 'Confirmed' ? styles.confirmed : styles.pending
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => setViewModal(b)}
                >
                  View
                </button>
                <button
                  className={styles.editBtn}
                  onClick={() => setEditModal(b)}
                >
                  Edit VIP Status
                </button>
                <button
                  className={styles.assignBtn}
                  onClick={() => setAssignModal(b)}
                >
                  Assign Butler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination (ثابت الآن) */}
      <div className={styles.pagination}>
        <span>Showing 1 to {visibleBookings.length} of {visibleBookings.length * 5} entries</span>
        <div className={styles.pages}>
          <button>Previous</button>
          <button className={styles.activePage}>1</button>
          <button>2</button>
          <button>Next</button>
        </div>
      </div>

      {/* Assign Butler Modal */}
      {assignModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>Assign Butler to {assignModal.guestName} (#{assignModal.bookingId})</h2>
            <p><strong>VIP Level:</strong> {assignModal.vipLevel}</p>

            <div className={styles.formRow}>
              <label htmlFor="butlerSelect">Select Butler:</label>
              <select id="butlerSelect">
                <option>Ali</option>
                <option>Mohammed</option>
                <option>Sara</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="butlerNotes">Additional Notes:</label>
              <textarea id="butlerNotes" placeholder="Any special instructions..." />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalConfirm} onClick={confirmButlerAssignment}>
                Confirm Assignment
              </button>
              <button className={styles.modalCancel} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIP Details Modal */}
      {viewModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>VIP Guest Details — {viewModal.guestName} (#{viewModal.bookingId})</h2>
            <p><strong>Arrival:</strong> {viewModal.arrival}</p>
            <p><strong>Departure:</strong> {viewModal.departure}</p>
            <p><strong>Room Number:</strong> {viewModal.roomNumber}</p>
            <p><strong>VIP Level:</strong> {viewModal.vipLevel}</p>
            <p><strong>Special Requests:</strong> {viewModal.specialRequests}</p>
            <p><strong>Butler Assigned:</strong> {viewModal.butler}</p>
            <button className={styles.modalCancel} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit VIP Status Modal */}
      {editModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>Edit VIP Status — {editModal.guestName} (#{editModal.bookingId})</h2>

            <div className={styles.formRow}>
              <label htmlFor="vipLevelEdit">VIP Level:</label>
              <select id="vipLevelEdit" defaultValue={editModal.vipLevel}>
                <option>Gold VIP</option>
                <option>Platinum VIP</option>
                <option>Black VIP</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="specialRequestsEdit">Special Requests:</label>
              <textarea
                id="specialRequestsEdit"
                defaultValue={editModal.specialRequests}
                placeholder="Update special requests..."
              />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalConfirm} onClick={saveVipChanges}>
                Save Changes
              </button>
              <button className={styles.modalCancel} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
