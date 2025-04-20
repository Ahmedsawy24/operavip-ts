import React, { useEffect } from 'react';
import './CheckAvailability.css';

const CheckAvailability = () => {
  useEffect(() => {
    const checkBtn = document.getElementById('ca-checkBtn');
    const noAvailabilityAlert = document.getElementById('ca-noAvailabilityAlert');
    const reservationSuccess = document.getElementById('ca-reservationSuccess');
    const availabilityTbody = document.getElementById('ca-availabilityTbody');
    const reserveModalOverlay = document.getElementById('ca-reserveModalOverlay');
    const reserveModalTitle = document.getElementById('ca-reserveModalTitle');
    const reserveForm = document.getElementById('ca-reserveForm');
    const reserveCancelBtn = document.getElementById('ca-reserveCancelBtn');
    const reserveConfirmBtn = document.getElementById('ca-reserveConfirmBtn');
    const modalArrivalDate = document.getElementById('ca-modalArrivalDate');
    const modalDepartureDate = document.getElementById('ca-modalDepartureDate');
    const prevPageBtn = document.getElementById('ca-prevPageBtn');
    const nextPageBtn = document.getElementById('ca-nextPageBtn');

    // مثال على بيانات الغرف
    let roomsData = [
      { room: 101, type: 'Single', capacity: '1 Adult', rate: 100, status: 'Available' },
      { room: 202, type: 'Double', capacity: '2 Adults', rate: 150, status: 'Available' },
      { room: 303, type: 'Suite', capacity: '4 Adults', rate: 300, status: 'Booked' },
    ];

    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        if (noAvailabilityAlert) noAvailabilityAlert.style.display = 'none';
        if (reservationSuccess) reservationSuccess.style.display = 'none';

        const arrivalDate = document.getElementById('ca-arrivalDate').value;
        const departureDate = document.getElementById('ca-departureDate').value;

        if (!arrivalDate || !departureDate || arrivalDate >= departureDate) {
          alert('Please select valid arrival and departure dates.');
          return;
        }

        if (availabilityTbody) availabilityTbody.innerHTML = '';

        const availableRooms = roomsData.filter(r => r.status === 'Available');

        if (availableRooms.length === 0) {
          if (noAvailabilityAlert) noAvailabilityAlert.style.display = 'block';
        } else {
          availableRooms.forEach(room => {
            const row = document.createElement('tr');

            const roomCell = document.createElement('td');
            roomCell.textContent = room.room;
            const typeCell = document.createElement('td');
            typeCell.textContent = room.type;
            const capCell = document.createElement('td');
            capCell.textContent = room.capacity;
            const rateCell = document.createElement('td');
            rateCell.textContent = `$${room.rate}`;
            const statusCell = document.createElement('td');
            statusCell.classList.add('ca-status-available');
            statusCell.textContent = '✅ Available';
            const actionCell = document.createElement('td');
            const reserveBtn = document.createElement('button');
            reserveBtn.className = 'ca-action-btn ca-reserve-btn';
            reserveBtn.textContent = 'Reserve Now';
            reserveBtn.setAttribute('data-room', room.room);
            reserveBtn.setAttribute('data-roomtype', room.type);
            reserveBtn.addEventListener('click', () => openReserveModal(room.room, room.type, arrivalDate, departureDate));

            actionCell.appendChild(reserveBtn);

            row.appendChild(roomCell);
            row.appendChild(typeCell);
            row.appendChild(capCell);
            row.appendChild(rateCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);

            availabilityTbody.appendChild(row);
          });
        }
      });
    }

    function openReserveModal(roomNumber, roomType, arrival, departure) {
      if (noAvailabilityAlert) noAvailabilityAlert.style.display = 'none';
      if (reservationSuccess) reservationSuccess.style.display = 'none';
      if (reserveModalTitle) reserveModalTitle.textContent = `Reserve Room - ${roomNumber} (${roomType})`;
      if (modalArrivalDate) modalArrivalDate.value = arrival;
      if (modalDepartureDate) modalDepartureDate.value = departure;
      if (reserveModalOverlay) reserveModalOverlay.style.display = 'flex';
    }

    if (reserveCancelBtn) {
      reserveCancelBtn.addEventListener('click', () => {
        if (reserveModalOverlay) reserveModalOverlay.style.display = 'none';
      });
    }

    if (reserveForm) {
      reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (reserveModalOverlay) reserveModalOverlay.style.display = 'none';
        if (reservationSuccess) reservationSuccess.style.display = 'block';
      });
    }

    if (reserveModalOverlay) {
      reserveModalOverlay.addEventListener('click', (e) => {
        if (e.target === reserveModalOverlay) {
          reserveModalOverlay.style.display = 'none';
        }
      });
    }

    if (prevPageBtn) {
      prevPageBtn.addEventListener('click', () => {
        alert('Go to previous page (demo).');
      });
    }
    if (nextPageBtn) {
      nextPageBtn.addEventListener('click', () => {
        alert('Go to next page (demo).');
      });
    }
  }, []);

  return (
    <div className="check-availability-main-container">
      <h1 className="check-availability-page-title">Check Room Availability</h1>
      <nav className="check-availability-breadcrumb">
        Home &gt; Reservations &gt; Check Availability
      </nav>

      <section className="check-availability-date-selection">
        <h2>Select Dates</h2>
        <div className="check-availability-dates-row">
          <div className="check-availability-date-item">
            <label htmlFor="ca-arrivalDate">Arrival Date:</label>
            <input type="date" id="ca-arrivalDate" />
          </div>
          <div className="check-availability-date-item">
            <label htmlFor="ca-departureDate">Departure Date:</label>
            <input type="date" id="ca-departureDate" />
          </div>
          <button id="ca-checkBtn" className="check-availability-check-btn">🔍 Check Availability</button>
        </div>
      </section>

      <div id="ca-noAvailabilityAlert" className="check-availability-no-availability-alert" style={{ display: 'none' }}>
        ⚠️ Sorry, no rooms available for the selected dates. <br />
        Please choose different dates.
      </div>

      <div id="ca-reservationSuccess" className="check-availability-reservation-success" style={{ display: 'none' }}>
        ✅ Reservation created successfully!
      </div>

      <section className="check-availability-results">
        <table className="check-availability-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Capacity</th>
              <th>Rate per Night</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="ca-availabilityTbody">
            <tr>
              <td>101</td>
              <td>Single</td>
              <td>1 Adult</td>
              <td>$100</td>
              <td className="ca-status-available">✅ Available</td>
              <td>
                <button 
                  className="ca-action-btn ca-reserve-btn" 
                  data-room="101" 
                  data-roomtype="Single"
                >
                  Reserve Now
                </button>
              </td>
            </tr>
            <tr>
              <td>202</td>
              <td>Double</td>
              <td>2 Adults</td>
              <td>$150</td>
              <td className="ca-status-available">✅ Available</td>
              <td>
                <button 
                  className="ca-action-btn ca-reserve-btn" 
                  data-room="202" 
                  data-roomtype="Double"
                >
                  Reserve Now
                </button>
              </td>
            </tr>
            <tr>
              <td>303</td>
              <td>Suite</td>
              <td>4 Adults</td>
              <td>$300</td>
              <td className="ca-status-booked">❌ Booked</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="check-availability-pagination">
        <button id="ca-prevPageBtn">Previous</button>
        <button className="check-availability-page-number active">1</button>
        <button className="check-availability-page-number">2</button>
        <button className="check-availability-page-number">3</button>
        <button id="ca-nextPageBtn">Next</button>
      </div>

      {/* Modal for Quick Reservation */}
      <div className="ca-modal-overlay" id="ca-reserveModalOverlay">
        <div className="ca-modal" id="ca-reserveModal">
          <h2 id="ca-reserveModalTitle">Reserve Room - 101 (Single)</h2>
          <form id="ca-reserveForm">
            <label htmlFor="ca-guestName">Guest Name</label>
            <input type="text" id="ca-guestName" name="ca-guestName" required />

            <label htmlFor="ca-email">Email</label>
            <input type="email" id="ca-email" name="ca-email" required />

            <label htmlFor="ca-phone">Phone Number</label>
            <input type="text" id="ca-phone" name="ca-phone" required />

            <label htmlFor="ca-modalArrivalDate">Arrival Date</label>
            <input type="date" id="ca-modalArrivalDate" name="ca-modalArrivalDate" required />

            <label htmlFor="ca-modalDepartureDate">Departure Date</label>
            <input type="date" id="ca-modalDepartureDate" name="ca-modalDepartureDate" required />

            <label htmlFor="ca-paymentMethod">Payment Method</label>
            <select id="ca-paymentMethod" name="ca-paymentMethod" required>
              <option value="">Select method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>

            <label htmlFor="ca-specialRequests">Special Requests</label>
            <textarea 
              id="ca-specialRequests" 
              name="ca-specialRequests" 
              rows="3" 
              placeholder="Enter any special requests (optional)"
            ></textarea>

            <div className="ca-modal-buttons">
              <button type="button" className="ca-modal-cancel-btn" id="ca-reserveCancelBtn">
                Cancel
              </button>
              <button type="submit" className="ca-modal-confirm-btn" id="ca-reserveConfirmBtn">
                Confirm Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckAvailability;
