import React, { useEffect } from 'react';
import './CheckinGuests.css';

const CheckinGuests = () => {
  useEffect(() => {
    // الحصول على عناصر DOM باستخدام المعرفات الخاصة بالصفحة (مسبوقة بـ "cig-")
    const searchInput = document.getElementById('cig-searchInput');
    const searchBtn = document.getElementById('cig-searchBtn');
    const noResultsAlert = document.getElementById('cig-noResultsAlert');
    const successMessage = document.getElementById('cig-successMessage');
    const resultsTbody = document.getElementById('cig-resultsTbody');

    const checkinModalOverlay = document.getElementById('cig-checkinModalOverlay');
    const checkinModal = document.getElementById('cig-checkinModal');
    const checkinModalTitle = document.getElementById('cig-checkinModalTitle');
    const checkinGuestName = document.getElementById('cig-checkinGuestName');
    const checkinArrivalDate = document.getElementById('cig-checkinArrivalDate');
    const checkinDepartureDate = document.getElementById('cig-checkinDepartureDate');
    const checkinRoomNumber = document.getElementById('cig-checkinRoomNumber');
    const checkinGuestsCount = document.getElementById('cig-checkinGuestsCount');
    const checkinPaymentMethod = document.getElementById('cig-checkinPaymentMethod');
    const advancePayment = document.getElementById('cig-advancePayment');
    const roomKeyCards = document.getElementById('cig-roomKeyCards');
    const checkinRequests = document.getElementById('cig-checkinRequests');
    const checkinCancelBtn = document.getElementById('cig-checkinCancelBtn');
    const checkinConfirmBtn = document.getElementById('cig-checkinConfirmBtn');

    const assignModalOverlay = document.getElementById('cig-assignModalOverlay');
    const assignModal = document.getElementById('cig-assignModal');
    const assignModalTitle = document.getElementById('cig-assignModalTitle');
    const availableRooms = document.getElementById('cig-availableRooms');
    const assignRoomType = document.getElementById('cig-assignRoomType');
    const assignRoomRate = document.getElementById('cig-assignRoomRate');
    const assignCancelBtn = document.getElementById('cig-assignCancelBtn');
    const assignConfirmBtn = document.getElementById('cig-assignConfirmBtn');

    // بيانات وهمية للحجوزات (Dummy Data)
    let reservationsData = [
      {
        id: "230101",
        guestName: "Abdullah Alhammami",
        arrival: "10-04-2025",
        departure: "15-04-2025",
        roomNumber: "101",
        roomType: "Single",
        status: "Reserved",
        adults: 1,
        children: 0
      },
      {
        id: "230102",
        guestName: "Ahmed Sami",
        arrival: "11-04-2025",
        departure: "12-04-2025",
        roomNumber: "105",
        roomType: "Double",
        status: "Checked-in",
        adults: 2,
        children: 0
      },
      {
        id: "230103",
        guestName: "Safa Emad",
        arrival: "11-04-2025",
        departure: "15-04-2025",
        roomNumber: "Not Assigned",
        roomType: "Suite",
        status: "Pending",
        adults: 2,
        children: 1
      }
    ];

    // دوال مساعدة لعرض الرسائل وتحديث الجدول
    function showNoResultsAlert() {
      if (noResultsAlert) noResultsAlert.style.display = 'block';
    }
    function hideNoResultsAlert() {
      if (noResultsAlert) noResultsAlert.style.display = 'none';
    }
    function showSuccessMessage(msg) {
      if (successMessage) {
        successMessage.textContent = msg;
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      }
    }

    function renderTable(data) {
      if (resultsTbody) {
        resultsTbody.innerHTML = '';
        data.forEach(res => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${res.id}</td>
            <td>${res.guestName}</td>
            <td>${res.arrival}</td>
            <td>${res.departure}</td>
            <td>${res.roomNumber}</td>
            <td>${res.roomType}</td>
            <td class="cig-status-${res.status.toLowerCase().replace(/ /g, '')}">
              ${res.status === "Checked-in" ? "✅ Checked-in"
                : res.status === "Pending" ? "⏳ Pending"
                : res.status === "Cancelled" ? "❌ Cancelled"
                : res.status === "Reserved" ? "✅ Reserved"
                : res.status}
            </td>
            <td>
              ${res.status === "Reserved" ? `<button class="cig-action-btn cig-checkin-btn" data-id="${res.id}">Check-In</button>` : ""}
              ${res.status === "Checked-in" ? `<button class="cig-action-btn cig-details-btn" data-id="${res.id}">View Details</button>` : ""}
              ${res.status === "Pending" ? `<button class="cig-action-btn cig-assign-btn" data-id="${res.id}">Assign Room</button>` : ""}
            </td>
          `;
          resultsTbody.appendChild(row);
        });
        if (data.length === 0) {
          showNoResultsAlert();
        } else {
          hideNoResultsAlert();
        }
      }
    }

    renderTable(reservationsData);

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        hideNoResultsAlert();
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
          renderTable(reservationsData);
          return;
        }
        const filtered = reservationsData.filter(res => {
          return (
            res.id.toLowerCase().includes(query) ||
            res.guestName.toLowerCase().includes(query) ||
            res.roomNumber.toLowerCase().includes(query)
          );
        });
        renderTable(filtered);
      });
    }

    // إغلاق المودال عند النقر خارج النافذة
    function closeModalOnOverlayClick(overlay, modal) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.display = 'none';
        }
      });
    }
    if (checkinModalOverlay && checkinModal) {
      closeModalOnOverlayClick(checkinModalOverlay, checkinModal);
    }
    if (assignModalOverlay && assignModal) {
      closeModalOnOverlayClick(assignModalOverlay, assignModal);
    }

    function openCheckInModal(reservation) {
      if (checkinModalTitle) checkinModalTitle.textContent = `🔑 Guest Check-In - ${reservation.guestName} (${reservation.roomNumber})`;
      if (checkinGuestName) checkinGuestName.textContent = reservation.guestName;
      if (checkinArrivalDate) checkinArrivalDate.textContent = reservation.arrival;
      if (checkinDepartureDate) checkinDepartureDate.textContent = reservation.departure;
      if (checkinRoomNumber) checkinRoomNumber.textContent = reservation.roomNumber;
      if (checkinGuestsCount) checkinGuestsCount.textContent = `${reservation.adults} Adults, ${reservation.children} Children`;
      if (checkinPaymentMethod) checkinPaymentMethod.value = "Cash";
      if (advancePayment) advancePayment.value = "";
      if (roomKeyCards) roomKeyCards.value = "";
      if (checkinRequests) checkinRequests.value = "";
      if (checkinModalOverlay) checkinModalOverlay.style.display = 'flex';
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('cig-checkin-btn')) {
        const id = e.target.getAttribute('data-id');
        const reservation = reservationsData.find(r => r.id === id);
        if (reservation) {
          openCheckInModal(reservation);
        }
      }
    });

    if (checkinCancelBtn) {
      checkinCancelBtn.addEventListener('click', () => {
        if (checkinModalOverlay) checkinModalOverlay.style.display = 'none';
      });
    }
    if (checkinConfirmBtn) {
      checkinConfirmBtn.addEventListener('click', () => {
        const idMatch = checkinModalTitle.textContent.match(/\d+/);
        if (idMatch) {
          const id = idMatch[0];
          const reservation = reservationsData.find(r => r.id.includes(id));
          if (reservation) {
            reservation.status = "Checked-in";
            showSuccessMessage("✅ Guest Checked-In Successfully!");
            renderTable(reservationsData);
          }
        }
        if (checkinModalOverlay) checkinModalOverlay.style.display = 'none';
      });
    }

    function openAssignModal(reservation) {
      if (assignModalTitle) assignModalTitle.textContent = `Assign Room - ${reservation.guestName}`;
      if (availableRooms) availableRooms.value = "";
      if (assignRoomType) assignRoomType.textContent = reservation.roomType;
      if (assignRoomRate) assignRoomRate.textContent = "$0";
      if (assignModalOverlay) assignModalOverlay.style.display = 'flex';
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('cig-assign-btn')) {
        const id = e.target.getAttribute('data-id');
        const reservation = reservationsData.find(r => r.id === id);
        if (reservation) {
          openAssignModal(reservation);
        }
      }
    });

    if (assignCancelBtn) {
      assignCancelBtn.addEventListener('click', () => {
        if (assignModalOverlay) assignModalOverlay.style.display = 'none';
      });
    }
    if (assignConfirmBtn) {
      assignConfirmBtn.addEventListener('click', () => {
        const selectedRoom = availableRooms.value;
        if (!selectedRoom) {
          alert("Please select a room.");
          return;
        }
        const idMatch = assignModalTitle.textContent.match(/\d+/);
        if (!idMatch) {
          if (assignModalOverlay) assignModalOverlay.style.display = 'none';
          return;
        }
        const id = idMatch[0];
        const reservation = reservationsData.find(r => r.id.includes(id));
        if (reservation) {
          reservation.roomNumber = selectedRoom;
          if (reservation.status === "Pending") {
            reservation.status = "Reserved";
          }
          showSuccessMessage(`✅ Room assigned to ${reservation.guestName}!`);
          renderTable(reservationsData);
        }
        if (assignModalOverlay) assignModalOverlay.style.display = 'none';
      });
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('cig-details-btn')) {
        const id = e.target.getAttribute('data-id');
        alert(`Showing details for reservation ${id} (demo only).`);
      }
    });
  }, []);

  return (
    <>
      <div className="cig-main-container">
        <div className="cig-page-header">
          <h1>Check-In Guests</h1>
          <nav className="cig-breadcrumb">Home &gt; Front Desk &gt; Check-In Guests</nav>
        </div>

        <section className="cig-search-section">
          <input 
            type="text" 
            id="cig-searchInput" 
            placeholder="🔎 Search Reservation by Name, Reservation ID or Phone Number"
          />
          <button id="cig-searchBtn" className="cig-search-btn">Search</button>
        </section>

        <div id="cig-noResultsAlert" className="cig-no-results-alert" style={{ display: 'none' }}>
          ⚠️ No reservations found for the provided details.
        </div>
        <div id="cig-successMessage" className="cig-success-message" style={{ display: 'none' }}>
          ✅ Guest Checked-In Successfully!
        </div>

        <section className="cig-results-section">
          <table className="cig-results-table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Arrival Date</th>
                <th>Departure Date</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="cig-resultsTbody">
              <tr>
                <td>230101</td>
                <td>Abdullah Alhammami</td>
                <td>10-04-2025</td>
                <td>15-04-2025</td>
                <td>101</td>
                <td>Single</td>
                <td className="cig-status-reserved">✅ Reserved</td>
                <td>
                  <button className="cig-action-btn cig-checkin-btn" data-id="230101">
                    Check-In
                  </button>
                </td>
              </tr>
              <tr>
                <td>230102</td>
                <td>Ahmed Sami</td>
                <td>11-04-2025</td>
                <td>12-04-2025</td>
                <td>105</td>
                <td>Double</td>
                <td className="cig-status-checkedin">✅ Checked-in</td>
                <td>
                  <button className="cig-action-btn cig-details-btn" data-id="230102">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td>230103</td>
                <td>Safa Emad</td>
                <td>11-04-2025</td>
                <td>15-04-2025</td>
                <td>Not Assigned</td>
                <td>Suite</td>
                <td className="cig-status-pending">⏳ Pending</td>
                <td>
                  <button className="cig-action-btn cig-assign-btn" data-id="230103">
                    Assign Room
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      {/* Check-In Modal */}
      <div className="cig-modal-overlay" id="cig-checkinModalOverlay">
        <div className="cig-modal" id="cig-checkinModal">
          <h2 id="cig-checkinModalTitle">🔑 Guest Check-In - Abdullah Alhammami (101)</h2>
          <div className="cig-modal-content">
            <p><strong>Guest Name:</strong> <span id="cig-checkinGuestName"></span></p>
            <p><strong>Arrival Date:</strong> <span id="cig-checkinArrivalDate"></span></p>
            <p><strong>Departure Date:</strong> <span id="cig-checkinDepartureDate"></span></p>
            <p><strong>Assigned Room:</strong> <span id="cig-checkinRoomNumber"></span></p>
            <p><strong>Adults / Children:</strong> <span id="cig-checkinGuestsCount"></span></p>
            <label htmlFor="cig-checkinPaymentMethod">Payment Method</label>
            <select id="cig-checkinPaymentMethod">
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Transfer">Transfer</option>
            </select>
            <label htmlFor="cig-advancePayment">Advance Payment Amount</label>
            <input type="number" id="cig-advancePayment" placeholder="e.g. 100" />
            <label htmlFor="cig-roomKeyCards">Room Key Cards Issued</label>
            <input type="number" id="cig-roomKeyCards" placeholder="e.g. 2" />
            <label htmlFor="cig-checkinRequests">Special Requests</label>
            <textarea id="cig-checkinRequests" rows="3" placeholder="Any special requests?"></textarea>
          </div>
          <div className="cig-modal-buttons">
            <button type="button" className="cig-modal-cancel-btn" id="cig-checkinCancelBtn">Cancel</button>
            <button type="button" className="cig-modal-confirm-btn" id="cig-checkinConfirmBtn">Complete Check-In</button>
          </div>
        </div>
      </div>

      {/* Assign Room Modal */}
      <div className="cig-modal-overlay" id="cig-assignModalOverlay">
        <div className="cig-modal" id="cig-assignModal">
          <h2 id="cig-assignModalTitle">Assign Room - Safa Emad</h2>
          <div className="cig-modal-content">
            <label htmlFor="cig-availableRooms">Available Rooms</label>
            <select id="cig-availableRooms">
              <option value="">-- Select Room --</option>
              <option value="201">Room 201</option>
              <option value="202">Room 202</option>
              <option value="303">Room 303</option>
            </select>
            <p><strong>Room Type:</strong> <span id="cig-assignRoomType"></span></p>
            <p><strong>Room Rate:</strong> <span id="cig-assignRoomRate"></span></p>
          </div>
          <div className="cig-modal-buttons">
            <button type="button" className="cig-modal-cancel-btn" id="cig-assignCancelBtn">Cancel</button>
            <button type="button" className="cig-modal-confirm-btn" id="cig-assignConfirmBtn">Confirm Assignment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckinGuests;
