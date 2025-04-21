// src/Pages/HeaderPages/Reservation/ModifyorCancelBooking/ModifyorCancelBooking.tsx
import React, { useEffect, FormEvent } from 'react';
import './ModifyorCancelBooking.css';

const ModifyorCancelBooking: React.FC = () => {
  useEffect(() => {
    // البحث
    const searchBtn = document.getElementById('mcb-searchBtn') as HTMLButtonElement | null;
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        alert('Search functionality (demo).');
      });
    }

    // أزرار التعديل
    const modifyButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.mcb-modify-btn'));
    const modifyModalOverlay = document.getElementById('mcb-modifyModalOverlay') as HTMLElement | null;
    const modifyModalCancel = document.getElementById('mcb-modifyModalCancel') as HTMLButtonElement | null;
    const modifyForm = document.getElementById('mcb-modifyForm') as HTMLFormElement | null;
    const modifyModalTitle = document.getElementById('mcb-modifyModalTitle') as HTMLElement | null;

    modifyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const bookingNumber = btn.getAttribute('data-booking') || '';
        const guestName = btn.getAttribute('data-guest') || '';
        if (modifyModalTitle) {
          modifyModalTitle.textContent = `Modify Booking - #${bookingNumber}`;
        }
        const modGuestName = document.getElementById('mcb-modGuestName') as HTMLInputElement | null;
        const modEmail     = document.getElementById('mcb-modEmail')     as HTMLInputElement | null;
        const modPhone     = document.getElementById('mcb-modPhone')     as HTMLInputElement | null;
        const modArrival   = document.getElementById('mcb-modArrival')   as HTMLInputElement | null;
        const modDeparture = document.getElementById('mcb-modDeparture') as HTMLInputElement | null;
        const modRoomType  = document.getElementById('mcb-modRoomType')  as HTMLSelectElement | null;
        const modNumRooms  = document.getElementById('mcb-modNumRooms')  as HTMLInputElement | null;
        const modAdults    = document.getElementById('mcb-modAdults')    as HTMLInputElement | null;
        const modChildren  = document.getElementById('mcb-modChildren')  as HTMLInputElement | null;
        const modPayment   = document.getElementById('mcb-modPayment')   as HTMLSelectElement | null;
        const modRequests  = document.getElementById('mcb-modRequests')  as HTMLTextAreaElement | null;

        if (modGuestName)  modGuestName.value = guestName;
        if (modEmail)      modEmail.value     = 'guest@example.com';
        if (modPhone)      modPhone.value     = '1234567890';
        if (modArrival)    modArrival.value   = '2025-03-15';
        if (modDeparture)  modDeparture.value = '2025-03-18';
        if (modRoomType)   modRoomType.value  = 'Double';
        if (modNumRooms)   modNumRooms.value  = '1';
        if (modAdults)     modAdults.value    = '2';
        if (modChildren)   modChildren.value  = '0';
        if (modPayment)    modPayment.value   = 'Cash';
        if (modRequests)   modRequests.value  = '';

        if (modifyModalOverlay) modifyModalOverlay.style.display = 'flex';
      });
    });

    if (modifyModalCancel) {
      modifyModalCancel.addEventListener('click', () => {
        if (modifyModalOverlay) modifyModalOverlay.style.display = 'none';
      });
    }

    if (modifyForm) {
      modifyForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        alert('Booking modified successfully.');
        if (modifyModalOverlay) modifyModalOverlay.style.display = 'none';
      });
    }

    // أزرار الإلغاء
    const cancelButtons         = Array.from(document.querySelectorAll<HTMLButtonElement>('.mcb-cancel-btn'));
    const cancelModalOverlay    = document.getElementById('mcb-cancelModalOverlay') as HTMLElement | null;
    const cancelModalText       = document.getElementById('mcb-cancelModalText')      as HTMLElement | null;
    const cancelModalNo         = document.getElementById('mcb-cancelModalNo')        as HTMLButtonElement | null;
    const cancelModalYes        = document.getElementById('mcb-cancelModalYes')       as HTMLButtonElement | null;

    cancelButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const bookingNumber = btn.getAttribute('data-booking') || '';
        const guestName     = btn.getAttribute('data-guest')   || '';
        if (cancelModalText) {
          cancelModalText.textContent = `Are you sure you want to cancel Booking #${bookingNumber} for ${guestName}?`;
        }
        if (cancelModalOverlay) cancelModalOverlay.style.display = 'flex';
      });
    });

    if (cancelModalNo) {
      cancelModalNo.addEventListener('click', () => {
        if (cancelModalOverlay) cancelModalOverlay.style.display = 'none';
      });
    }

    if (cancelModalYes) {
      cancelModalYes.addEventListener('click', () => {
        alert('Booking canceled successfully.');
        if (cancelModalOverlay) cancelModalOverlay.style.display = 'none';
      });
    }

    // Cleanup (optional)
    return () => {
      // يمكنك إزالة الـ event listeners هنا إذا أردت
    };
  }, []);

  return (
    <>
      <div className="mcb-main-container">
        <header className="mcb-page-header">
          <h1>Modify or Cancel Booking</h1>
          <nav className="mcb-breadcrumb">
            Home &gt; Reservations &gt; Modify or Cancel Booking
          </nav>
        </header>

        {/* Search */}
        <section className="mcb-search-area">
          <h2>Search for Booking</h2>
          <div className="mcb-search-box">
            <input
              type="text"
              id="mcb-searchInput"
              placeholder="Enter Guest Name or Booking Number"
            />
            <button id="mcb-searchBtn">🔍 Search</button>
          </div>
        </section>

        {/* Results Table */}
        <section className="mcb-results-section">
          <table className="mcb-results-table">
            <thead>
              <tr>
                <th>Booking #</th>
                <th>Guest Name</th>
                <th>Arrival Date</th>
                <th>Departure Date</th>
                <th>Room Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="mcb-resultsBody">
              <tr>
                <td>10234</td>
                <td>Abdullah Ahmed</td>
                <td>15-03-2025</td>
                <td>18-03-2025</td>
                <td>Double</td>
                <td className="mcb-status-confirmed">Confirmed</td>
                <td>
                  <button
                    className="mcb-action-btn mcb-modify-btn"
                    data-booking="10234"
                    data-guest="Abdullah Ahmed"
                  >
                    Modify
                  </button>
                  <button
                    className="mcb-action-btn mcb-cancel-btn"
                    data-booking="10234"
                    data-guest="Abdullah Ahmed"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      {/* Modify Modal */}
      <div className="mcb-modal-overlay" id="mcb-modifyModalOverlay">
        <div className="mcb-modal">
          <h2 id="mcb-modifyModalTitle">Modify Booking - #10234</h2>
          <form id="mcb-modifyForm">
            <label htmlFor="mcb-modGuestName">Guest Name</label>
            <input type="text" id="mcb-modGuestName" name="mcb-modGuestName" required />

            <label htmlFor="mcb-modEmail">Email</label>
            <input type="email" id="mcb-modEmail" name="mcb-modEmail" required />

            <label htmlFor="mcb-modPhone">Phone Number</label>
            <input type="text" id="mcb-modPhone" name="mcb-modPhone" required />

            <label htmlFor="mcb-modArrival">Arrival Date</label>
            <input type="date" id="mcb-modArrival" name="mcb-modArrival" required />

            <label htmlFor="mcb-modDeparture">Departure Date</label>
            <input type="date" id="mcb-modDeparture" name="mcb-modDeparture" required />

            <label htmlFor="mcb-modRoomType">Room Type</label>
            <select id="mcb-modRoomType" name="mcb-modRoomType" required>
              <option value="">Select room type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>

            <label htmlFor="mcb-modNumRooms">Number of Rooms</label>
            <input
              type="number"
              id="mcb-modNumRooms"
              name="mcb-modNumRooms"
              min={1}
              defaultValue={1}
              required
            />

            <div className="mcb-form-row">
              <div>
                <label htmlFor="mcb-modAdults">Adults</label>
                <input
                  type="number"
                  id="mcb-modAdults"
                  name="mcb-modAdults"
                  min={1}
                  defaultValue={1}
                  required
                />
              </div>
              <div>
                <label htmlFor="mcb-modChildren">Children</label>
                <input
                  type="number"
                  id="mcb-modChildren"
                  name="mcb-modChildren"
                  min={0}
                  defaultValue={0}
                  required
                />
              </div>
            </div>

            <label htmlFor="mcb-modPayment">Payment Method</label>
            <select id="mcb-modPayment" name="mcb-modPayment" required>
              <option value="">Select payment method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>

            <label htmlFor="mcb-modRequests">Special Requests</label>
            <textarea
              id="mcb-modRequests"
              name="mcb-modRequests"
              rows={4}
              placeholder="Enter any special requests"
            ></textarea>

            <div className="mcb-modal-buttons">
              <button
                type="button"
                className="mcb-modal-cancel"
                id="mcb-modifyModalCancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mcb-modal-save"
                id="mcb-modifyModalSave"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cancel Modal */}
      <div className="mcb-modal-overlay" id="mcb-cancelModalOverlay">
        <div className="mcb-modal mcb-cancel-modal">
          <h2>⚠️ Confirm Cancellation</h2>
          <p id="mcb-cancelModalText">
            Are you sure you want to cancel Booking #10234 for Abdullah Ahmed?
          </p>
          <div className="mcb-modal-buttons">
            <button
              type="button"
              className="mcb-modal-cancel"
              id="mcb-cancelModalNo"
            >
              No, Go Back
            </button>
            <button
              type="button"
              className="mcb-modal-confirm"
              id="mcb-cancelModalYes"
            >
              Yes, Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyorCancelBooking;
