import React, { useEffect } from 'react';
import styles from './AssignRooms.module.css';

interface Reservation {
  reservationId: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  specialRequests: string;
}

interface Room {
  roomNumber: string;
  roomType: string;
  status: string;
  housekeeping: string;
  notes: string;
}

const AssignRooms: React.FC = () => {
  useEffect(() => {
    const searchBtn = document.getElementById('searchBtn')!;
    const resetBtn = document.getElementById('resetBtn')!;

    const reservationsTbody = document.getElementById('reservationsTbody')!;
    const availableSection = document.getElementById('availableRoomsSection')!;
    const assignSection = document.getElementById('assignRoomSection')!;

    const roomsTbody = document.getElementById('roomsTbody')!;
    const assignedTbody = document.getElementById('assignedTbody')!;

    let selectedRes: Reservation | null = null;
    let selectedRoom: Room | null = null;

    // البحث وإعادة الضبط
    searchBtn.addEventListener('click', () => {
      alert('🔍 Search demo only.');
    });
    resetBtn.addEventListener('click', () => {
      (document.getElementById('searchForm') as HTMLFormElement).reset();
      alert('🔄 Search form reset.');
    });

    // اختيار حجز
    reservationsTbody.addEventListener('click', e => {
      const tr = (e.target as HTMLElement).closest('tr')!;
      Array.from(reservationsTbody.children).forEach(r => r.classList.remove(styles.selectedRow));
      tr.classList.add(styles.selectedRow);

      const [rid, guest, ci, co, type, req] = Array.from(tr.cells).map(c => c.textContent!);
      selectedRes = { reservationId: rid, guestName: guest, checkInDate: ci, checkOutDate: co, roomType: type, specialRequests: req };

      availableSection.style.display = 'block';
      assignSection.style.display = 'none';
    });

    // اختيار غرفة
    roomsTbody.addEventListener('click', e => {
      const tr = (e.target as HTMLElement).closest('tr')!;
      Array.from(roomsTbody.children).forEach(r => r.classList.remove(styles.selectedRow));
      tr.classList.add(styles.selectedRow);

      const [num, type, status, hk, notes] = Array.from(tr.cells).map(c => c.textContent!);
      selectedRoom = { roomNumber: num, roomType: type, status, housekeeping: hk, notes };

      if (selectedRes && selectedRoom) {
        // ملء نموذج التعيين
        (document.getElementById('assignGuestName')    as HTMLInputElement).value = selectedRes.guestName;
        (document.getElementById('assignReservationId') as HTMLInputElement).value = selectedRes.reservationId;
        (document.getElementById('selectedRoomNumber') as HTMLInputElement).value = selectedRoom.roomNumber;
        (document.getElementById('selectedRoomType')   as HTMLInputElement).value = selectedRoom.roomType;
        // تحويل التاريخ من DD-MM-YYYY إلى YYYY-MM-DD
        const parts = selectedRes.checkOutDate.split('-');
        (document.getElementById('expectedCheckout') as HTMLInputElement).value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        (document.getElementById('housekeepingStatus') as HTMLInputElement).value = selectedRoom.housekeeping;

        assignSection.style.display = 'block';
      }
    });

    // تأكيد التعيين
    document.getElementById('assignConfirmBtn')!.addEventListener('click', () => {
      if (!selectedRes || !selectedRoom) {
        alert('⚠️ اختر حجزًا وغرفة أولاً.');
        return;
      }
      if (selectedRoom.housekeeping.toLowerCase() === 'dirty') {
        alert('⚠️ الغرفة بحاجة للتنظيف أولاً.');
        return;
      }
      if (selectedRoom.status.toLowerCase() !== 'vacant') {
        alert('⚠️ الغرفة محجوزة بالفعل.');
        return;
      }

      // أضف إلى ملخص الغرف المعينة
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${selectedRes!.guestName}</td>
        <td>${selectedRoom!.roomNumber}</td>
        <td>${selectedRes!.checkInDate}</td>
        <td>${selectedRes!.checkOutDate}</td>
        <td>Assigned</td>
      `;
      assignedTbody.appendChild(newRow);

      alert(`✅ تم تعيين الغرفة ${selectedRoom.roomNumber} لـ ${selectedRes.guestName}`);

      // إعادة الضبط
      Array.from(reservationsTbody.children).forEach(r => r.classList.remove(styles.selectedRow));
      Array.from(roomsTbody.children).forEach(r => r.classList.remove(styles.selectedRow));
      assignSection.style.display    = 'none';
      availableSection.style.display = 'none';
      selectedRes = null;
      selectedRoom = null;
    });

    // إلغاء التعيين
    document.getElementById('assignCancelBtn')!.addEventListener('click', () => {
      assignSection.style.display = 'none';
      selectedRoom = null;
      Array.from(roomsTbody.children).forEach(r => r.classList.remove(styles.selectedRow));
    });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageHeader}>
        <h1>Assign Rooms</h1>
        <nav className={styles.breadcrumb}>Home &gt; Rooms &gt; Assign Rooms</nav>
      </div>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <h2>Search for Reservations</h2>
        <form id="searchForm" className={styles.searchForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="guestNameSearch">Guest Name</label>
              <input type="text" id="guestNameSearch" placeholder="Enter guest name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reservationIdSearch">Reservation ID</label>
              <input type="text" id="reservationIdSearch" placeholder="Enter reservation ID" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="checkInDateSearch">Check-in Date</label>
              <input type="date" id="checkInDateSearch" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="roomTypeSearch">Room Type</label>
              <select id="roomTypeSearch">
                <option value="">-- Select Room Type --</option>
                <option>Suite</option>
                <option>Deluxe</option>
                <option>Standard</option>
              </select>
            </div>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="specialRequestsSearch">Special Requests</label>
            <input type="text" id="specialRequestsSearch" placeholder="Enter special requests" />
          </div>
          <div className={styles.formButtons}>
            <button type="button" id="searchBtn" className={styles.searchBtn}>🔍 Search</button>
            <button type="reset"  id="resetBtn"  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Unassigned Reservations */}
      <section className={styles.reservationsListSection}>
        <h2>Unassigned Reservations</h2>
        <table className={styles.unassignedTable}>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Guest Name</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Room Type</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody id="reservationsTbody">
            <tr><td>342109</td><td>Abdullah Alhammami</td><td>12-04-2025</td><td>15-04-2025</td><td>Suite</td><td>Near Elevator</td></tr>
            <tr><td>342210</td><td>Ahmed Mohamed</td><td>13-04-2025</td><td>16-04-2025</td><td>Deluxe</td><td>High Floor</td></tr>
            <tr><td>342315</td><td>Lina Khaled</td><td>14-04-2025</td><td>17-04-2025</td><td>Standard</td><td>Smoking Room</td></tr>
          </tbody>
        </table>
      </section>

      {/* Available Rooms */}
      <section id="availableRoomsSection" className={styles.availableRoomsSection}>
        <h2>Available Rooms</h2>
        <table className={styles.roomsTable}>
          <thead>
            <tr><th>Room#</th><th>Type</th><th>Status</th><th>Housekeeping</th><th>Notes</th></tr>
          </thead>
          <tbody id="roomsTbody">
            <tr><td>101</td><td>Suite</td><td className={styles.statusGreen}>Vacant</td><td>Clean</td><td>Near Lobby</td></tr>
            <tr><td>203</td><td>Deluxe</td><td className={styles.statusYellow}>Vacant</td><td>Dirty</td><td>Needs Cleaning</td></tr>
            <tr><td>305</td><td>Standard</td><td className={styles.statusGreen}>Vacant</td><td>Clean</td><td>Balcony</td></tr>
          </tbody>
        </table>
      </section>

      {/* Assign Room Form */}
      <section id="assignRoomSection" className={styles.assignRoomSection}>
        <h2>Assign Room to Guest</h2>
        <form id="assignRoomForm" className={styles.assignForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}><label>Guest Name</label><input type="text" id="assignGuestName" readOnly /></div>
            <div className={styles.formGroup}><label>Reservation ID</label><input type="text" id="assignReservationId" readOnly /></div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}><label>Room#</label><input type="text" id="selectedRoomNumber" readOnly /></div>
            <div className={styles.formGroup}><label>Room Type</label><input type="text" id="selectedRoomType" readOnly /></div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}><label>Expected Checkout</label><input type="date" id="expectedCheckout" readOnly /></div>
          </div>
          <div className={styles.formGroup}><label>Additional Notes</label><textarea id="assignNotes" rows={3} /></div>
          <div className={styles.formGroup}><label>Housekeeping Status</label><input type="text" id="housekeepingStatus" readOnly /></div>
          <div className={styles.formButtons}>
            <button type="button" id="assignConfirmBtn" className={styles.assignBtn}>✔️ Assign Room</button>
            <button type="button" id="assignCancelBtn"  className={styles.cancelBtn}>❌ Cancel</button>
          </div>
        </form>
      </section>

      {/* Assigned Summary */}
      <section className={styles.assignedSummarySection}>
        <h2>Assigned Rooms Summary</h2>
        <table className={styles.assignedTable}>
          <thead>
            <tr><th>Guest</th><th>Room#</th><th>Check-in</th><th>Check-out</th><th>Status</th></tr>
          </thead>
          <tbody id="assignedTbody">
            <tr><td>Abdullah Alhammami</td><td>101</td><td>12-04-2025</td><td>15-04-2025</td><td>Checked-In</td></tr>
            <tr><td>Ahmed Mohamed</td><td>203</td><td>13-04-2025</td><td>16-04-2025</td><td>Assigned</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AssignRooms;
