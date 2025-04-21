// src/Pages/HeaderPages/Reservation/CreateNewReservation/CreateNewReservation.tsx
import React, { useEffect, MouseEvent } from 'react';
import './CreateNewReservation.css';

const CreateNewReservation: React.FC = () => {
  useEffect(() => {
    // ====== 1. Check Room Availability Section ======
    const searchRoomsBtn = document.getElementById(
      'cnr-searchRoomsBtn'
    ) as HTMLButtonElement | null;
    const resetAvailabilityBtn = document.getElementById(
      'cnr-resetAvailabilityBtn'
    ) as HTMLButtonElement | null;
    const roomsListSection = document.getElementById(
      'cnr-roomsListSection'
    ) as HTMLElement | null;
    const roomsTbody = document.getElementById(
      'cnr-roomsTbody'
    ) as HTMLTableSectionElement | null;

    if (searchRoomsBtn) {
      searchRoomsBtn.addEventListener('click', () => {
        const checkInDate = (
          document.getElementById('cnr-checkInDate') as HTMLInputElement
        ).value;
        const checkOutDate = (
          document.getElementById('cnr-checkOutDate') as HTMLInputElement
        ).value;

        if (!checkInDate || !checkOutDate || checkOutDate < checkInDate) {
          alert('⚠️ Please select a valid check-in/check-out date range.');
          return;
        }

        alert('Searching for available rooms (demo).');
        if (roomsListSection) roomsListSection.style.display = 'block';
        if (roomsTbody) {
          roomsTbody.innerHTML = `
            <tr>
              <td>101</td>
              <td>Deluxe Room</td>
              <td>2 Adults</td>
              <td>$200.00</td>
              <td>🟢 Available</td>
              <td><button class="cnr-action-btn cnr-select-room-btn">Select</button></td>
            </tr>
            <tr>
              <td>205</td>
              <td>Standard Room</td>
              <td>1 Adult</td>
              <td>$150.00</td>
              <td>🟢 Available</td>
              <td><button class="cnr-action-btn cnr-select-room-btn">Select</button></td>
            </tr>
          `;
        }
      });
    }

    if (resetAvailabilityBtn) {
      resetAvailabilityBtn.addEventListener('click', () => {
        const form = document.getElementById(
          'cnr-availabilityForm'
        ) as HTMLFormElement | null;
        form?.reset();
        if (roomsListSection) roomsListSection.style.display = 'none';
        alert('Room availability search reset (demo).');
      });
    }

    // ====== 2. Available Rooms List -> Show Guest Details Section ======
    const roomsTbodyEl = document.getElementById(
      'cnr-roomsTbody'
    ) as HTMLTableSectionElement | null;
    const guestDetailsSection = document.getElementById(
      'cnr-guestDetailsSection'
    ) as HTMLElement | null;

    if (roomsTbodyEl) {
      roomsTbodyEl.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('cnr-select-room-btn')) {
          const row = target.closest('tr')!;
          const roomNumber = row.cells[0].textContent;
          alert(`Room selected: ${roomNumber} (demo).`);
          if (guestDetailsSection) guestDetailsSection.style.display = 'block';
        }
      });
    }

    // ====== 3. Guest Details Section ======
    const saveGuestDetailsBtn = document.getElementById(
      'cnr-saveGuestDetailsBtn'
    ) as HTMLButtonElement | null;
    const paymentSection = document.getElementById(
      'cnr-paymentSection'
    ) as HTMLElement | null;

    if (saveGuestDetailsBtn) {
      saveGuestDetailsBtn.addEventListener('click', () => {
        const guestName = (
          document.getElementById('cnr-guestName') as HTMLInputElement
        ).value.trim();
        if (!guestName) {
          alert(
            '⚠️ Please fill all required guest details (Guest Name).'
          );
          return;
        }
        alert('Guest details saved (demo).');
        if (paymentSection) paymentSection.style.display = 'block';
      });
    }

    // ====== 4. Payment & Deposit Section ======
    const processPaymentBtn = document.getElementById(
      'cnr-processPaymentBtn'
    ) as HTMLButtonElement | null;
    const payOnCheckInBtn = document.getElementById(
      'cnr-payOnCheckInBtn'
    ) as HTMLButtonElement | null;
    const reviewSection = document.getElementById(
      'cnr-reviewSection'
    ) as HTMLElement | null;

    if (processPaymentBtn) {
      processPaymentBtn.addEventListener('click', () => {
        alert('✅ Payment processed (demo).');
        if (reviewSection) reviewSection.style.display = 'block';
      });
    }
    if (payOnCheckInBtn) {
      payOnCheckInBtn.addEventListener('click', () => {
        alert('🕒 Payment will be made on check-in (demo).');
        if (reviewSection) reviewSection.style.display = 'block';
      });
    }

    // ====== 5. Review & Confirm Reservation Section ======
    const confirmReservationBtn = document.getElementById(
      'cnr-confirmReservationBtn'
    ) as HTMLButtonElement | null;
    const sendConfirmationBtn = document.getElementById(
      'cnr-sendConfirmationBtn'
    ) as HTMLButtonElement | null;
    const editReservationBtn = document.getElementById(
      'cnr-editReservationBtn'
    ) as HTMLButtonElement | null;

    if (confirmReservationBtn) {
      confirmReservationBtn.addEventListener('click', () => {
        alert('🎟 Reservation confirmed (demo).');
      });
    }
    if (sendConfirmationBtn) {
      sendConfirmationBtn.addEventListener('click', () => {
        alert('📧 Confirmation email sent (demo).');
      });
    }
    if (editReservationBtn) {
      editReservationBtn.addEventListener('click', () => {
        alert('✏️ Edit reservation details (demo).');
      });
    }

    // إذا رغبت بإزالة المستمعين عند تفكيك المكوّن، يمكنك إضافة Cleanup هنا:
    // return () => { /* إزالة جميع event listeners */ };
  }, []);

  return (
    <div className="cnr-main-container">
      <div className="cnr-page-header">
        <h1>Create New Reservation</h1>
        <nav className="cnr-breadcrumb">
          Home &gt; Reservations &gt; Create New Reservation
        </nav>
      </div>

      {/* Section 1: Check Room Availability */}
      <section className="cnr-availability-section">
        <h2>Check Room Availability</h2>
        <form id="cnr-availabilityForm">
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-checkInDate">Check-in Date</label>
              <input type="date" id="cnr-checkInDate" />
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-checkOutDate">Check-out Date</label>
              <input type="date" id="cnr-checkOutDate" />
            </div>
          </div>
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-roomType">Room Type</label>
              <select id="cnr-roomType">
                <option value="">-- Select --</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Suite">Suite</option>
                <option value="Executive Room">Executive Room</option>
              </select>
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-adults">Adults</label>
              <input type="number" id="cnr-adults" min="1" defaultValue="1" />
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-children">Children</label>
              <input type="number" id="cnr-children" min="0" defaultValue="0" />
            </div>
          </div>
          <div className="cnr-form-buttons">
            <button type="button" id="cnr-searchRoomsBtn" className="cnr-search-btn">🔍 Search Available Rooms</button>
            <button type="reset" id="cnr-resetAvailabilityBtn" className="cnr-reset-btn">🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Section 2: Available Rooms List */}
      <section className="cnr-rooms-list-section" id="cnr-roomsListSection" style={{ display: 'none' }}>
        <h2>Available Rooms</h2>
        <table className="cnr-rooms-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Capacity</th>
              <th>Price Per Night</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="cnr-roomsTbody">
            {/* Demo data injected here */}
          </tbody>
        </table>
      </section>

      {/* Section 3: Guest Details */}
      <section className="cnr-guest-details-section" id="cnr-guestDetailsSection" style={{ display: 'none' }}>
        <h2>Guest Details</h2>
        <form id="cnr-guestForm">
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-guestName">Guest Name</label>
              <input type="text" id="cnr-guestName" placeholder="Enter guest name" required />
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-nationality">Nationality</label>
              <select id="cnr-nationality">
                <option value="">-- Select --</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                {/* المزيد من الخيارات */}
              </select>
            </div>
          </div>
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-idPassport">ID/Passport Number</label>
              <input type="text" id="cnr-idPassport" placeholder="Enter ID/Passport number" />
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-phoneNumber">Phone Number</label>
              <input type="text" id="cnr-phoneNumber" placeholder="Enter phone number" />
            </div>
          </div>
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-emailAddress">Email Address</label>
              <input type="email" id="cnr-emailAddress" placeholder="Enter email" />
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-specialRequests">Special Requests</label>
              <textarea id="cnr-specialRequests" rows={2} placeholder="Any special requests?"></textarea>
            </div>
          </div>
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-companyAgency">Company/Agency (optional)</label>
              <input type="text" id="cnr-companyAgency" placeholder="Enter company/agency if any" />
            </div>
            <div className="cnr-form-group">
              <label htmlFor="cnr-guestPaymentMethod">Payment Method</label>
              <select id="cnr-guestPaymentMethod">
                <option value="">-- Select --</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          <div className="cnr-form-buttons">
            <button type="button" id="cnr-saveGuestDetailsBtn" className="cnr-submit-btn">💾 Save Guest Details</button>
          </div>
        </form>
      </section>

      {/* Section 4: Payment & Deposit */}
      <section className="cnr-payment-section" id="cnr-paymentSection" style={{ display: 'none' }}>
        <h2>Reservation Payment & Deposit</h2>
        <form id="cnr-paymentForm">
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label>Total Amount</label>
              <input type="text" id="cnr-totalAmount" readOnly />
            </div>
            <div className="cnr-form-group">
              <label>Deposit Required</label>
              <input type="text" id="cnr-depositRequired" readOnly />
            </div>
          </div>
          <div className="cnr-form-row">
            <div className="cnr-form-group">
              <label htmlFor="cnr-amountPaid">Amount Paid</label>
              <input type="number" id="cnr-amountPaid" placeholder="Enter amount paid" />
            </div>
            <div className="cnr-form-group">
              <label>Remaining Balance</label>
              <input type="text" id="cnr-remainingBalance" readOnly />
            </div>
          </div>
          <div className="cnr-form-group">
            <label htmlFor="cnr-transactionRef">Transaction Reference (required for card/bank)</label>
            <input type="text" id="cnr-transactionRef" placeholder="Enter transaction reference" />
          </div>
          <div className="cnr-form-buttons">
            <button type="button" id="cnr-processPaymentBtn" className="cnr-submit-btn">✅ Process Payment</button>
            <button type="button" id="cnr-payOnCheckInBtn" className="cnr-cancel-btn">🕒 Pay on Check-in</button>
          </div>
        </form>
      </section>

      {/* Section 5: Review & Confirm Reservation */}
      <section className="cnr-review-section" id="cnr-reviewSection" style={{ display: 'none' }}>
        <h2>Review & Confirm Reservation</h2>
        <div className="cnr-review-content">
          <p><strong>Guest Name:</strong> <span id="cnr-reviewGuestName"></span></p>
          <p><strong>Room Type:</strong> <span id="cnr-reviewRoomType"></span></p>
          <p><strong>Check-in Date:</strong> <span id="cnr-reviewCheckIn"></span></p>
          <p><strong>Check-out Date:</strong> <span id="cnr-reviewCheckOut"></span></p>
          <p><strong>Total Nights:</strong> <span id="cnr-reviewNights"></span></p>
          <p><strong>Total Amount:</strong> <span id="cnr-reviewTotalAmount"></span></p>
          <p><strong>Deposit Paid:</strong> <span id="cnr-reviewDepositPaid"></span></p>
          <p><strong>Remaining Balance:</strong> <span id="cnr-reviewRemainingBalance"></span></p>
        </div>
        <div className="cnr-review-buttons">
          <button id="cnr-confirmReservationBtn" className="cnr-submit-btn">🎟 Confirm Reservation</button>
          <button id="cnr-sendConfirmationBtn" className="cnr-update-btn">📧 Send Confirmation Email</button>
          <button id="cnr-editReservationBtn" className="cnr-cancel-btn">✏️ Edit Reservation</button>
        </div>
      </section>

      {/* Section 6: Active Reservations Summary */}
      <section className="cnr-summary-section">
        <h2>Active Reservations Summary</h2>
        <table className="cnr-summary-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody id="cnr-summaryTbody">
            <tr>
              <td>🔴 Pending Confirmation</td>
              <td>5</td>
            </tr>
            <tr>
              <td>🟡 Awaiting Payment</td>
              <td>3</td>
            </tr>
            <tr>
              <td>🟢 Confirmed Reservations</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CreateNewReservation;
