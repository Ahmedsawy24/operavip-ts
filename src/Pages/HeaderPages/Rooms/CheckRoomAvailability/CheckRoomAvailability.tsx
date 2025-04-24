import React, { useEffect } from 'react';
import styles from './CheckRoomAvailability.module.css';

interface Room {
  roomNumber: string;
  roomType: string;
  status: string;
  bedType: string;
  smoking: string;
  housekeeping: string;
  notes: string;
}

const CheckRoomAvailability: React.FC = () => {
  useEffect(() => {
    const searchBtn = document.getElementById('searchBtn')!;
    const resetBtn = document.getElementById('resetBtn')!;
    const roomsTbody = document.getElementById('roomsTbody')!;
    const noRoomsAlert = document.getElementById('noRoomsAlert')!;
    const proceedBookingBtn = document.getElementById('proceedBookingBtn')!;
    const searchAgainBtn = document.getElementById('searchAgainBtn')!;

    // بحث + تحقق
    searchBtn.addEventListener('click', () => {
      const checkIn = (document.getElementById('checkInDate') as HTMLInputElement).value;
      const checkOut = (document.getElementById('checkOutDate') as HTMLInputElement).value;
      if (!checkIn || !checkOut || checkOut <= checkIn) {
        alert('⚠️ برجاء اختيار تواريخ صالحة.');
        return;
      }
      const roomType = (document.getElementById('roomType') as HTMLSelectElement).value;
      if (!roomType) {
        alert('⚠️ برجاء اختيار نوع الغرفة.');
        return;
      }
      // عرض النتائج (demo)
      alert('🔍 يبحث عن الغرف المتاحة (تجريبي)');
      noRoomsAlert.style.display = 'none';
    });

    resetBtn.addEventListener('click', () => {
      (document.getElementById('searchForm') as HTMLFormElement).reset();
      alert('🔄 تم إعادة ضبط نموذج البحث.');
    });

    // اختيار غرفة من الجدول
    roomsTbody.addEventListener('click', e => {
      const tr = (e.target as HTMLElement).closest('tr')!;
      Array.from(roomsTbody.children).forEach(r => r.classList.remove(styles.selectedRow));
      tr.classList.add(styles.selectedRow);
      const status = tr.cells[2].textContent!.toLowerCase();
      if (status.includes('reserved') || status.includes('❌')) {
        alert('❌ هذه الغرفة محجوزة بالفعل.');
      } else {
        alert(`🟢 غرفة ${tr.cells[0].textContent} متاحة!`);
      }
    });

    // أزرار المتابعة
    proceedBookingBtn.addEventListener('click', () => {
      alert('🏨 الانتقال إلى صفحة الحجز (demo)');
    });
    searchAgainBtn.addEventListener('click', () => {
      alert('🔄 العودة لنموذج البحث (demo)');
    });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageHeader}>
        <h1>Check Room Availability</h1>
        <nav className={styles.breadcrumb}>Home &gt; Rooms &gt; Check Room Availability</nav>
      </div>

      <section className={styles.searchSection}>
        <h2>Search for Room Availability</h2>
        <form id="searchForm" className={styles.searchForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="checkInDate">Check-in Date</label>
              <input type="date" id="checkInDate" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="checkOutDate">Check-out Date</label>
              <input type="date" id="checkOutDate" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="roomType">Room Type</label>
              <select id="roomType">
                <option value="">-- Select --</option>
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
                <option>King</option>
                <option>Twin</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bedType">Bed Type</label>
              <select id="bedType">
                <option value="">-- Select --</option>
                <option>King</option>
                <option>Queen</option>
                <option>Twin</option>
                <option>Double</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="smokingPref">Smoking Preference</label>
              <select id="smokingPref">
                <option value="">-- Select --</option>
                <option>Smoking</option>
                <option>Non-Smoking</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="specialFeatures">Special Features</label>
              <select id="specialFeatures">
                <option value="">-- Select --</option>
                <option>Near Pool</option>
                <option>Balcony</option>
                <option>City View</option>
                <option>High Floor</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" id="searchBtn" className={styles.searchBtn}>
              🔍 Search
            </button>
            <button type="reset" id="resetBtn" className={styles.resetBtn}>
              🔄 Reset
            </button>
          </div>
        </form>
      </section>

      <section className={styles.availableRoomsSection}>
        <h2>Available Rooms</h2>
        <table className={styles.roomsTable}>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Bed Type</th>
              <th>Smoking</th>
              <th>Housekeeping</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody id="roomsTbody">
            <tr>
              <td>101</td>
              <td>Suite</td>
              <td className={styles.statusGreen}>🟢 Available</td>
              <td>King</td>
              <td>Non-Smoking</td>
              <td>✅ Clean</td>
              <td>Near Pool</td>
            </tr>
            <tr>
              <td>203</td>
              <td>Deluxe</td>
              <td className={styles.statusGreen}>🟢 Available</td>
              <td>Queen</td>
              <td>Smoking</td>
              <td>❌ Needs Cleaning</td>
              <td>City View</td>
            </tr>
            <tr>
              <td>305</td>
              <td>Standard</td>
              <td className={styles.statusYellow}>🟡 Reserved</td>
              <td>Twin</td>
              <td>Non-Smoking</td>
              <td>✅ Clean</td>
              <td>Balcony</td>
            </tr>
          </tbody>
        </table>
        <div id="noRoomsAlert" className={styles.noRoomsAlert} style={{ display: 'none' }}>
          ❌ No rooms available for the selected dates.
        </div>
      </section>

      <section className={styles.summarySection}>
        <h2>Room Availability Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Total Rooms</th>
              <th>Available</th>
              <th>Reserved</th>
              <th>Out of Service</th>
            </tr>
          </thead>
          <tbody id="summaryTbody">
            <tr>
              <td>Standard</td>
              <td>50</td>
              <td>30</td>
              <td>18</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Deluxe</td>
              <td>40</td>
              <td>22</td>
              <td>15</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Suite</td>
              <td>20</td>
              <td>10</td>
              <td>9</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.proceedSection}>
        <button id="proceedBookingBtn" className={styles.proceedBtn}>
          🏨 Proceed to Reservation
        </button>
        <button id="searchAgainBtn" className={styles.searchAgainBtn}>
          🔄 Search Again
        </button>
      </section>
    </div>
  );
};

export default CheckRoomAvailability;
