// D:\operavip-react\src\components\HeaderPages\Reservation\ViewUpcomingReservations\ViewUpcomingReservations.jsx
import React, { useEffect } from 'react';
import './ViewUpcomingReservations.css';

const ViewUpcomingReservations = () => {
  useEffect(() => {
    // ====== تطبيق الفلاتر ======
    const applyFiltersBtn = document.getElementById('vur-applyFiltersBtn');
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener('click', () => {
        alert('Filters applied (demo only).');
      });
    }

    // ====== عرض تفاصيل الحجز ======
    const detailsBtns = document.querySelectorAll('.view-upcoming-reservations-details-btn');
    const detailsModalOverlay = document.getElementById('vur-detailsModalOverlay');
    const detailsModalClose = document.getElementById('vur-detailsModalClose');
    const detailsModalTitle = document.getElementById('vur-detailsModalTitle');
    const detailsModalContent = document.getElementById('vur-detailsModalContent');

    detailsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const bookingNumber = btn.getAttribute('data-booking');
        const guestName = btn.getAttribute('data-guest');
        detailsModalTitle.textContent = `Reservation Details - #${bookingNumber}`;
        detailsModalContent.innerHTML = `
          <p><strong>Guest Name:</strong> ${guestName}</p>
          <p><strong>Email:</strong> guest@example.com</p>
          <p><strong>Phone Number:</strong> 123456789</p>
          <p><strong>Arrival Date:</strong> 22-03-2025</p>
          <p><strong>Departure Date:</strong> 25-03-2025</p>
          <p><strong>Room Type:</strong> Single</p>
          <p><strong>Guests:</strong> 2 Adults, 0 Children</p>
          <p><strong>Booking Date:</strong> 10-03-2025</p>
          <p><strong>Payment Status:</strong> Paid</p>
          <p><strong>Special Requests:</strong> None</p>
        `;
        detailsModalOverlay.style.display = 'flex';
      });
    });

    if (detailsModalClose) {
      detailsModalClose.addEventListener('click', () => {
        detailsModalOverlay.style.display = 'none';
      });
    }

    detailsModalOverlay.addEventListener('click', (e) => {
      if (e.target === detailsModalOverlay) {
        detailsModalOverlay.style.display = 'none';
      }
    });

    // ====== نافذة Check-In ======
    const checkinBtns = document.querySelectorAll('.view-upcoming-reservations-checkin-btn');
    const checkinModalOverlay = document.getElementById('vur-checkinModalOverlay');
    const checkinCancelBtn = document.getElementById('vur-checkinCancelBtn');
    const checkinConfirmBtn = document.getElementById('vur-checkinConfirmBtn');
    const checkinModalTitle = document.getElementById('vur-checkinModalTitle');
    const checkinRoomType = document.getElementById('vur-checkinRoomType');
    const checkinStay = document.getElementById('vur-checkinStay');

    checkinBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const bookingNumber = btn.getAttribute('data-booking');
        const guestName = btn.getAttribute('data-guest');
        checkinModalTitle.textContent = `Check-In Guest - ${guestName} (#${bookingNumber})`;
        checkinRoomType.textContent = 'Single';
        checkinStay.textContent = '22-03-2025 to 25-03-2025';
        checkinModalOverlay.style.display = 'flex';
      });
    });

    if (checkinCancelBtn) {
      checkinCancelBtn.addEventListener('click', () => {
        checkinModalOverlay.style.display = 'none';
      });
    }

    checkinModalOverlay.addEventListener('click', (e) => {
      if (e.target === checkinModalOverlay) {
        checkinModalOverlay.style.display = 'none';
      }
    });

    if (checkinConfirmBtn) {
      checkinConfirmBtn.addEventListener('click', () => {
        alert('Guest checked-in successfully!');
        checkinModalOverlay.style.display = 'none';
      });
    }

    // ====== ترقيم الصفحات (Pagination) ======
    const prevPageBtn = document.getElementById('vur-prevPageBtn');
    const nextPageBtn = document.getElementById('vur-nextPageBtn');
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
    
    // يمكنك هنا إضافة تنظيف (cleanup) للمستمعين عند إلغاء تركيب المكون إن لزم الأمر

  }, []);

  return (
    <div className="view-upcoming-reservations-main-container">
      <h1 className="view-upcoming-reservations-page-title">View Upcoming Reservations</h1>
      <nav className="view-upcoming-reservations-breadcrumb">
        Home &gt; Reservations &gt; View Upcoming Reservations
      </nav>
      <section className="view-upcoming-reservations-filter-section">
        <h2>Filter Reservations</h2>
        <div className="view-upcoming-reservations-filters">
          <div className="view-upcoming-reservations-filter-item">
            <label htmlFor="vur-fromDate">From:</label>
            <input type="date" id="vur-fromDate" />
          </div>
          <div className="view-upcoming-reservations-filter-item">
            <label htmlFor="vur-toDate">To:</label>
            <input type="date" id="vur-toDate" />
          </div>
          <div className="view-upcoming-reservations-filter-item">
            <input 
              type="text" 
              id="vur-searchInput" 
              placeholder="Guest Name or Booking Number"
            />
          </div>
          <button id="vur-applyFiltersBtn" className="view-upcoming-reservations-apply-filters-btn">
            🔍 Apply Filters
          </button>
        </div>
      </section>
      <section className="view-upcoming-reservations-table-section">
        <table className="view-upcoming-reservations-table">
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
          <tbody id="vur-reservationsTbody">
            <tr>
              <td>10445</td>
              <td>Omar Ali</td>
              <td>22-03-2025</td>
              <td>25-03-2025</td>
              <td>Single</td>
              <td className="view-upcoming-reservations-status-confirmed">Confirmed</td>
              <td>
                <button 
                  className="view-upcoming-reservations-action-btn view-upcoming-reservations-details-btn" 
                  data-booking="10445" 
                  data-guest="Omar Ali"
                >
                  View Details
                </button>
                <button 
                  className="view-upcoming-reservations-action-btn view-upcoming-reservations-checkin-btn" 
                  data-booking="10445" 
                  data-guest="Omar Ali"
                >
                  Check-In
                </button>
              </td>
            </tr>
            <tr>
              <td>10446</td>
              <td>Sara Ahmed</td>
              <td>24-03-2025</td>
              <td>28-03-2025</td>
              <td>Suite</td>
              <td className="view-upcoming-reservations-status-pending">Pending</td>
              <td>
                <button 
                  className="view-upcoming-reservations-action-btn view-upcoming-reservations-details-btn" 
                  data-booking="10446" 
                  data-guest="Sara Ahmed"
                >
                  View Details
                </button>
                <button 
                  className="view-upcoming-reservations-action-btn view-upcoming-reservations-checkin-btn" 
                  data-booking="10446" 
                  data-guest="Sara Ahmed"
                >
                  Check-In
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="view-upcoming-reservations-pagination">
        <button id="vur-prevPageBtn">Previous</button>
        <button className="view-upcoming-reservations-page-number active">1</button>
        <button className="view-upcoming-reservations-page-number">2</button>
        <button className="view-upcoming-reservations-page-number">3</button>
        <button id="vur-nextPageBtn">Next</button>
      </div>

      {/* ====== Modal لعرض تفاصيل الحجز ====== */}
      <div className="view-upcoming-reservations-modal-overlay" id="vur-detailsModalOverlay">
        <div className="view-upcoming-reservations-modal" id="vur-detailsModal">
          <h2 id="vur-detailsModalTitle">Reservation Details - #10445</h2>
          <div className="view-upcoming-reservations-modal-content" id="vur-detailsModalContent">
            {/* سيتم ملء المحتوى ديناميكيًا */}
          </div>
          <div className="view-upcoming-reservations-modal-buttons">
            <button type="button" className="view-upcoming-reservations-modal-close-btn" id="vur-detailsModalClose">
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ====== Modal لتسجيل الوصول (Check-In) ====== */}
      <div className="view-upcoming-reservations-modal-overlay" id="vur-checkinModalOverlay">
        <div className="view-upcoming-reservations-modal" id="vur-checkinModal">
          <h2 id="vur-checkinModalTitle">Check-In Guest - Omar Ali (#10445)</h2>
          <div className="view-upcoming-reservations-modal-content">
            <p><strong>Room Type:</strong> <span id="vur-checkinRoomType">Single</span></p>
            <p><strong>Stay:</strong> <span id="vur-checkinStay">22-03-2025 to 25-03-2025</span></p>
            <label htmlFor="vur-roomNumber">Select Room Number</label>
            <select id="vur-roomNumber">
              <option value="">-- Available Rooms --</option>
              <option value="101">Room 101</option>
              <option value="102">Room 102</option>
              <option value="201">Room 201</option>
            </select>
            <label htmlFor="vur-paymentStatus">Payment Status</label>
            <select id="vur-paymentStatus">
              <option value="Paid">Paid</option>
              <option value="Pay Now">Pay Now</option>
              <option value="Pay Later">Pay Later</option>
            </select>
          </div>
          <div className="view-upcoming-reservations-modal-buttons">
            <button type="button" className="view-upcoming-reservations-modal-close-btn" id="vur-checkinCancelBtn">
              Cancel
            </button>
            <button type="button" className="view-upcoming-reservations-modal-save-btn" id="vur-checkinConfirmBtn">
              Confirm Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUpcomingReservations;
