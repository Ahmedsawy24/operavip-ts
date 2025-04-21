// src/Pages/HeaderPages/Reservation/GroupReservations/GroupReservations.tsx
import React, { useEffect } from 'react';
import './GroupReservations.css';

interface GroupReservation {
  id: string;
  groupName: string;
  arrival: string;
  departure: string;
  rooms: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  contactPerson: string;
  email: string;
  phone: string;
  roomTypes: string;
  guestsPerRoom: number;
  paymentStatus: string;
  specialRequests: string;
}

const GroupReservations: React.FC = () => {
  useEffect(() => {
    // Dummy data
    const groupReservations: GroupReservation[] = [
      {
        id: 'G2034',
        groupName: 'ABC Corporation',
        arrival: '12-04-2025',
        departure: '16-04-2025',
        rooms: 12,
        status: 'Confirmed',
        contactPerson: 'John Doe',
        email: 'john@abc-corp.com',
        phone: '123456789',
        roomTypes: 'Mixed',
        guestsPerRoom: 2,
        paymentStatus: 'Paid',
        specialRequests: 'Early check-in if possible.',
      },
      {
        id: 'G2035',
        groupName: 'XYZ Group',
        arrival: '20-04-2025',
        departure: '25-04-2025',
        rooms: 8,
        status: 'Pending',
        contactPerson: 'Sara Smith',
        email: 'sara@xyzgroup.com',
        phone: '987654321',
        roomTypes: 'Double',
        guestsPerRoom: 2,
        paymentStatus: 'Pending',
        specialRequests: '',
      },
    ];

    const successMessage = document.getElementById('gr-successMessage');

    function showSuccessMessage(msg: string) {
      if (successMessage) {
        successMessage.textContent = msg;
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      }
    }

    // Search
    const searchBtn = document.getElementById('gr-searchBtn');
    searchBtn?.addEventListener('click', () => {
      alert('Search functionality (demo only).');
    });

    // Table buttons
    const detailsBtns = document.querySelectorAll<HTMLButtonElement>('.group-reservations-details-btn');
    const modifyBtns  = document.querySelectorAll<HTMLButtonElement>('.group-reservations-modify-btn');
    const cancelBtns  = document.querySelectorAll<HTMLButtonElement>('.group-reservations-cancel-btn');


    // Modals & fields
    const detailsModalOverlay    = document.getElementById('gr-detailsModalOverlay');
    const detailsModalClose      = document.getElementById('gr-detailsModalClose');
    const detailsModalTitle      = document.getElementById('gr-detailsModalTitle');
    const detailsModalContent    = document.getElementById('gr-detailsModalContent');

    const modifyModalOverlay     = document.getElementById('gr-modifyModalOverlay');
    const modifyModalTitle       = document.getElementById('gr-modifyModalTitle');
    const modifyForm             = document.getElementById('gr-modifyForm') as HTMLFormElement | null;
    const modifyModalCancel      = document.getElementById('gr-modifyModalCancel');

    const groupNameField         = document.getElementById('gr-groupName')         as HTMLInputElement;
    const contactPersonField     = document.getElementById('gr-contactPerson')  as HTMLInputElement;
    const modEmailField          = document.getElementById('gr-modEmail')       as HTMLInputElement;
    const modPhoneField          = document.getElementById('gr-modPhone')       as HTMLInputElement;
    const modArrivalDateField    = document.getElementById('gr-modArrivalDate') as HTMLInputElement;
    const modDepartureDateField  = document.getElementById('gr-modDepartureDate') as HTMLInputElement;
    const numRoomsField          = document.getElementById('gr-numRooms')       as HTMLInputElement;
    const roomTypesField         = document.getElementById('gr-roomTypes')     as HTMLSelectElement;
    const guestsPerRoomField     = document.getElementById('gr-guestsPerRoom') as HTMLInputElement;
    const paymentMethodField     = document.getElementById('gr-paymentMethod') as HTMLSelectElement;
    const paymentStatusField     = document.getElementById('gr-paymentStatus') as HTMLSelectElement;
    const specialRequestsField   = document.getElementById('gr-specialRequests') as HTMLTextAreaElement;

    const cancelModalOverlay     = document.getElementById('gr-cancelModalOverlay');
    const cancelModalText        = document.getElementById('gr-cancelModalText');
    const cancelNoBtn            = document.getElementById('gr-cancelNoBtn');
    const cancelYesBtn           = document.getElementById('gr-cancelYesBtn');

    // Close overlays on click outside
    detailsModalOverlay?.addEventListener('click', e => {
      if (e.target === detailsModalOverlay) detailsModalOverlay.style.display = 'none';
    });
    modifyModalOverlay?.addEventListener('click', e => {
      if (e.target === modifyModalOverlay) modifyModalOverlay.style.display = 'none';
    });
    cancelModalOverlay?.addEventListener('click', e => {
      if (e.target === cancelModalOverlay) cancelModalOverlay.style.display = 'none';
    });

    detailsModalClose?.addEventListener('click', () => {
      detailsModalOverlay && (detailsModalOverlay.style.display = 'none');
    });
    modifyModalCancel?.addEventListener('click', () => {
      modifyModalOverlay && (modifyModalOverlay.style.display = 'none');
    });

    // Details button
    detailsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const resid = btn.getAttribute('data-resid');
        const groupData = groupReservations.find(gr => gr.id === resid);
        if (groupData) {
          if (detailsModalTitle)      detailsModalTitle.textContent   = `Group Reservation Details - ${groupData.id}`;
          if (detailsModalContent)    detailsModalContent.innerHTML    = `
            <p><strong>Group Name:</strong> ${groupData.groupName}</p>
            <p><strong>Contact Person:</strong> ${groupData.contactPerson}</p>
            <p><strong>Email:</strong> ${groupData.email}</p>
            <p><strong>Phone Number:</strong> ${groupData.phone}</p>
            <p><strong>Arrival Date:</strong> ${groupData.arrival}</p>
            <p><strong>Departure Date:</strong> ${groupData.departure}</p>
            <p><strong>Total Rooms Booked:</strong> ${groupData.rooms}</p>
            <p><strong>Room Types:</strong> ${groupData.roomTypes}</p>
            <p><strong>Guests per Room:</strong> ${groupData.guestsPerRoom}</p>
            <p><strong>Payment Status:</strong> ${groupData.paymentStatus}</p>
            <p><strong>Special Requests:</strong> ${groupData.specialRequests || 'None'}</p>
          `;
        }
        detailsModalOverlay && (detailsModalOverlay.style.display = 'flex');
      });
    });

    // Modify buttons
    modifyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const resid = btn.getAttribute('data-resid');
        const groupData = groupReservations.find(gr => gr.id === resid);
        if (groupData) {
          modifyModalTitle!.textContent = `Modify Group Reservation - ${groupData.id}`;
          groupNameField.value       = groupData.groupName;
          contactPersonField.value   = groupData.contactPerson;
          modEmailField.value        = groupData.email;
          modPhoneField.value        = groupData.phone;
          // demo dates:
          modArrivalDateField.value   = '2025-04-12';
          modDepartureDateField.value = '2025-04-16';
          numRoomsField.value         = groupData.rooms.toString();
          roomTypesField.value        = groupData.roomTypes;
          guestsPerRoomField.value    = groupData.guestsPerRoom.toString();
          paymentMethodField.value    = 'Cash';
          paymentStatusField.value    = groupData.paymentStatus;
          specialRequestsField.value  = groupData.specialRequests;
          modifyForm?.setAttribute('data-resid', resid!);
          modifyModalOverlay && (modifyModalOverlay.style.display = 'flex');
        }
      });
    });

    // Submit modifications
    modifyForm?.addEventListener('submit', e => {
      e.preventDefault();
      const resid = modifyForm.getAttribute('data-resid');
      const groupData = groupReservations.find(gr => gr.id === resid);
      if (groupData) {
        groupData.groupName      = groupNameField.value;
        groupData.contactPerson  = contactPersonField.value;
        groupData.email          = modEmailField.value;
        groupData.phone          = modPhoneField.value;
        groupData.arrival        = modArrivalDateField.value;
        groupData.departure      = modDepartureDateField.value;
        groupData.rooms          = parseInt(numRoomsField.value, 10);
        groupData.roomTypes      = roomTypesField.value;
        groupData.guestsPerRoom  = parseInt(guestsPerRoomField.value, 10);
        groupData.paymentStatus  = paymentStatusField.value;
        groupData.specialRequests = specialRequestsField.value;
        showSuccessMessage('✅ Group reservation updated successfully!');
      }
      modifyModalOverlay && (modifyModalOverlay.style.display = 'none');
    });

    // Cancel buttons
    let currentCancelId: string | null = null;
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const resid = btn.getAttribute('data-resid');
        const groupName = btn.getAttribute('data-group');
        currentCancelId = resid;
        if (cancelModalText) {
          cancelModalText.textContent = `Are you sure you want to cancel the group reservation (${resid}) for ${groupName}?`;
        }
        cancelModalOverlay && (cancelModalOverlay.style.display = 'flex');
      });
    });

    cancelNoBtn?.addEventListener('click', () => {
      cancelModalOverlay && (cancelModalOverlay.style.display = 'none');
      currentCancelId = null;
    });
    cancelYesBtn?.addEventListener('click', () => {
      if (currentCancelId) {
        const idx = groupReservations.findIndex(gr => gr.id === currentCancelId);
        if (idx !== -1) {
          groupReservations[idx].status = 'Cancelled';
          showSuccessMessage('✅ Group reservation cancelled successfully!');
        }
      }
      cancelModalOverlay && (cancelModalOverlay.style.display = 'none');
      currentCancelId = null;
    });

    // Pagination (demo)
    document.getElementById('gr-prevPageBtn')?.addEventListener('click', () => alert('Go to previous page (demo).'));
    document.getElementById('gr-nextPageBtn')?.addEventListener('click', () => alert('Go to next page (demo).'));
  }, []);

  return (
    <div className="group-reservations-main-container">
      <h1 className="group-reservations-page-title">Group Reservations Management</h1>
      <nav className="group-reservations-breadcrumb">
        Home &gt; Reservations &gt; Group Reservations
      </nav>

      <section className="group-reservations-search-section">
        <h2>Search Group Reservations</h2>
        <div className="group-reservations-search-filters">
          <input
            type="text"
            id="gr-searchInput"
            placeholder="Group Name or Reservation ID"
          />
          <div className="group-reservations-date-filter">
            <label htmlFor="gr-fromDate">From:</label>
            <input type="date" id="gr-fromDate" />
          </div>
          <div className="group-reservations-date-filter">
            <label htmlFor="gr-toDate">To:</label>
            <input type="date" id="gr-toDate" />
          </div>
          <button id="gr-searchBtn" className="group-reservations-search-btn">
            🔍 Search
          </button>
        </div>
      </section>

      <div
        id="gr-successMessage"
        className="group-reservations-success-message"
        style={{ display: 'none' }}
      />

      <section className="group-reservations-table-section">
        <table className="group-reservations-table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Group Name</th>
              <th>Arrival Date</th>
              <th>Departure Date</th>
              <th>Rooms Booked</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="gr-reservationsTbody">
            <tr>
              <td>G2034</td>
              <td>ABC Corporation</td>
              <td>12-04-2025</td>
              <td>16-04-2025</td>
              <td>12</td>
              <td className="group-reservations-status-confirmed">Confirmed ✅</td>
              <td>
                <button
                  className="group-reservations-action-btn group-reservations-details-btn"
                  data-resid="G2034"
                  data-group="ABC Corporation"
                >
                  Details
                </button>
                <button
                  className="group-reservations-action-btn group-reservations-modify-btn"
                  data-resid="G2034"
                  data-group="ABC Corporation"
                >
                  Modify
                </button>
                <button
                  className="group-reservations-action-btn group-reservations-cancel-btn"
                  data-resid="G2034"
                  data-group="ABC Corporation"
                >
                  Cancel
                </button>
              </td>
            </tr>
            <tr>
              <td>G2035</td>
              <td>XYZ Group</td>
              <td>20-04-2025</td>
              <td>25-04-2025</td>
              <td>8</td>
              <td className="group-reservations-status-pending">Pending ⏳</td>
              <td>
                <button
                  className="group-reservations-action-btn group-reservations-details-btn"
                  data-resid="G2035"
                  data-group="XYZ Group"
                >
                  Details
                </button>
                <button
                  className="group-reservations-action-btn group-reservations-modify-btn"
                  data-resid="G2035"
                  data-group="XYZ Group"
                >
                  Modify
                </button>
                <button
                  className="group-reservations-action-btn group-reservations-cancel-btn"
                  data-resid="G2035"
                  data-group="XYZ Group"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="group-reservations-pagination">
        <button id="gr-prevPageBtn">Previous</button>
        <button className="group-reservations-page-number active">1</button>
        <button className="group-reservations-page-number">2</button>
        <button className="group-reservations-page-number">3</button>
        <button id="gr-nextPageBtn">Next</button>
      </div>

      {/* Details Modal */}
      <div
        className="group-reservations-modal-overlay"
        id="gr-detailsModalOverlay"
      >
        <div className="group-reservations-modal" id="gr-detailsModal">
          <h2 id="gr-detailsModalTitle">
            Group Reservation Details - G2034
          </h2>
          <div
            className="group-reservations-modal-content"
            id="gr-detailsModalContent"
          />
          <div className="group-reservations-modal-buttons">
            <button
              type="button"
              className="group-reservations-modal-close-btn"
              id="gr-detailsModalClose"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Modify Modal */}
      <div
        className="group-reservations-modal-overlay"
        id="gr-modifyModalOverlay"
      >
        <div className="group-reservations-modal" id="gr-modifyModal">
          <h2 id="gr-modifyModalTitle">Modify Group Reservation - G2034</h2>
          <form id="gr-modifyForm">
            <label htmlFor="gr-groupName">Group Name</label>
            <input type="text" id="gr-groupName" name="gr-groupName" required />

            <label htmlFor="gr-contactPerson">Contact Person</label>
            <input
              type="text"
              id="gr-contactPerson"
              name="gr-contactPerson"
              required
            />

            <label htmlFor="gr-modEmail">Email</label>
            <input type="email" id="gr-modEmail" name="gr-modEmail" required />

            <label htmlFor="gr-modPhone">Phone Number</label>
            <input type="text" id="gr-modPhone" name="gr-modPhone" required />

            <label htmlFor="gr-modArrivalDate">Arrival Date</label>
            <input
              type="date"
              id="gr-modArrivalDate"
              name="gr-modArrivalDate"
              required
            />

            <label htmlFor="gr-modDepartureDate">Departure Date</label>
            <input
              type="date"
              id="gr-modDepartureDate"
              name="gr-modDepartureDate"
              required
            />

            <label htmlFor="gr-numRooms">Number of Rooms</label>
            <input
              type="number"
              id="gr-numRooms"
              name="gr-numRooms"
              min="1"
              required
            />

            <label htmlFor="gr-roomTypes">Room Types</label>
            <select id="gr-roomTypes" name="gr-roomTypes">
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Mixed">Mixed</option>
            </select>

            <label htmlFor="gr-guestsPerRoom">Guests per Room</label>
            <input
              type="number"
              id="gr-guestsPerRoom"
              name="gr-guestsPerRoom"
              min="1"
              required
            />

            <label htmlFor="gr-paymentMethod">Payment Method</label>
            <select id="gr-paymentMethod" name="gr-paymentMethod">
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Transfer">Transfer</option>
            </select>

            <label htmlFor="gr-paymentStatus">Payment Status</label>
            <select id="gr-paymentStatus" name="gr-paymentStatus">
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Deposit Paid">Deposit Paid</option>
            </select>

            <label htmlFor="gr-specialRequests">Special Requests</label>
            <textarea
              id="gr-specialRequests"
              name="gr-specialRequests"
              rows={3}
            />

            <div className="group-reservations-modal-buttons">
              <button
                type="button"
                className="group-reservations-modal-cancel-btn"
                id="gr-modifyModalCancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="group-reservations-modal-save-btn"
                id="gr-modifyModalSave"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <div
        className="group-reservations-modal-overlay"
        id="gr-cancelModalOverlay"
      >
        <div className="group-reservations-modal" id="gr-cancelModal">
          <h2>⚠️ Confirm Group Reservation Cancellation</h2>
          <p id="gr-cancelModalText">
            Are you sure you want to cancel the group reservation (G2034) for ABC
            Corporation?
          </p>
          <div className="group-reservations-modal-buttons">
            <button
              type="button"
              className="group-reservations-modal-cancel-btn"
              id="gr-cancelNoBtn"
            >
              No, Go Back
            </button>
            <button
              type="button"
              className="group-reservations-modal-confirm-btn"
              id="gr-cancelYesBtn"
            >
              Yes, Cancel Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupReservations;
