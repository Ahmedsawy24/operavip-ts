// 📁 Homepage/Dashboard.jsx
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    // رسم بياني دائري (Occupancy)
    const pieCanvas = document.getElementById("pieChart");
    if (pieCanvas) {
      const pieCtx = pieCanvas.getContext("2d");
      new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Occupied", "Vacant", "Blocked"],
          datasets: [
            {
              data: [72, 23, 5],
              backgroundColor: ["#ff4d4d", "#4dff4d", "#a6a6a6"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
    
    // رسم بياني عمودي (Weekly Occupancy)
    const barCanvas = document.getElementById("barChart");
    if (barCanvas) {
      const barCtx = barCanvas.getContext("2d");
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Occupied",
              data: [45, 50, 40, 55, 60, 48, 52],
              backgroundColor: "#ff4d4d",
            },
            {
              label: "Vacant",
              data: [15, 10, 20, 5, 0, 12, 8],
              backgroundColor: "#4dff4d",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      });
    }
    
    // منطق التابات
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        tabContents.forEach((tc) => (tc.style.display = "none"));
        const targetTab = btn.getAttribute("data-tab");
        const targetElement = document.getElementById(targetTab);
        if (targetElement) {
          targetElement.style.display = "block";
        }
      });
    });

    // منطق المودال (تفاصيل الحجز)
    const modal = document.getElementById("reservationModal");
    const closeBtn = document.querySelector(".close-btn");
    const viewDetailsButtons = document.querySelectorAll(".view-details");

    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (modal) modal.style.display = "block";
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (modal) modal.style.display = "none";
      });
    }

    window.addEventListener("click", function (event) {
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    });
  }, []);

  return (
    <>
      <main className="main-container">
        {/* مقدمة الصفحة */}
        <section className="page-intro">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Here you can find all insights about your property's daily operations.
          </p>
        </section>

        {/* الكروت العلوية */}
        <section className="top-cards">
          <div className="card reservations-balances">
            <h2>Reservations Balances</h2>
            <p className="card-amount">SAR 42,500</p>
          </div>
          <div className="card drawer-balance">
            <h2>Drawer Balance</h2>
            <p className="card-amount">SAR 9,750</p>
          </div>
          <div className="card todays-res-status">
            <h2>Today's Reservation Status</h2>
            <ul className="card-list">
              <li>
                <span className="status-dot arrival"></span>
                On Arrival: <strong>18</strong>
              </li>
              <li>
                <span className="status-dot checked-in"></span>
                Checked-In: <strong>26</strong>
              </li>
              <li>
                <span className="status-dot in-house"></span>
                In-House: <strong>45</strong>
              </li>
              <li>
                <span className="status-dot departure"></span>
                On Departure: <strong>14</strong>
              </li>
              <li>
                <span className="status-dot checked-out"></span>
                Checked-Out: <strong>10</strong>
              </li>
            </ul>
          </div>
          <div className="card todays-fin-summary">
            <h2>Today's Financial Summary</h2>
            <ul className="card-list">
              <li>Revenue: <strong>42,500 SAR</strong></li>
              <li>Pending Payments: <strong>3,200 SAR</strong></li>
              <li>Expenses: <strong>8,750 SAR</strong></li>
              <li>Net Profit: <strong>30,550 SAR</strong></li>
            </ul>
          </div>
          <div className="card housekeeping">
            <h2>Housekeeping</h2>
            <ul className="card-list">
              <li>Rooms Needing Cleaning: <strong>8</strong></li>
              <li>Rooms Under Maintenance: <strong>2</strong></li>
            </ul>
          </div>
        </section>

        {/* المحتوى: قسم الحجوزات والإشغال */}
        <section className="content-row">
          {/* يسار: الحجوزات */}
          <div className="left-panel">
            <section className="reservations-section">
              <h2>Reservations</h2>
              {/* التابات */}
              <div className="tabs">
                <button className="tab-btn active" data-tab="arrivalTab">Arrival</button>
                <button className="tab-btn" data-tab="departureTab">Departure</button>
                <button className="tab-btn" data-tab="inHouseTab">In House</button>
              </div>

              {/* بحث صغير */}
              <div className="search-bar small-search">
                <input type="text" placeholder="Search by phone, name, or reservation no." />
                <button id="searchBtn">🔍</button>
              </div>

              {/* جدول Arrival */}
              <div className="tab-content" id="arrivalTab" style={{ display: "block" }}>
                <table className="reservations-table">
                  <thead>
                    <tr>
                      <th>Reservation No.</th>
                      <th>Status</th>
                      <th>Room No</th>
                      <th>Room Type</th>
                      <th>Guest Name</th>
                      <th>Phone Number</th>
                      <th>Payment Status</th>
                      <th>Check-In</th>
                      <th>Nights</th>
                      <th>Rate</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>RES-20001</td>
                      <td>Confirmed ✅</td>
                      <td>102</td>
                      <td>Single Room</td>
                      <td>Abdullah Khan</td>
                      <td>+966501112233</td>
                      <td>Paid ✅</td>
                      <td>2025-03-20</td>
                      <td>3</td>
                      <td>500 SAR</td>
                      <td>
                        <button className="view-details" data-res="RES-20001">View Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td>RES-20002</td>
                      <td>Checked-In ✅</td>
                      <td>209</td>
                      <td>Double Room</td>
                      <td>Maria Lopez</td>
                      <td>+966502223344</td>
                      <td>Pending ⚠️</td>
                      <td>2025-03-19</td>
                      <td>2</td>
                      <td>750 SAR</td>
                      <td>
                        <button className="view-details" data-res="RES-20002">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* جدول Departure */}
              <div className="tab-content" id="departureTab">
                <table className="reservations-table">
                  <thead>
                    <tr>
                      <th>Reservation No.</th>
                      <th>Status</th>
                      <th>Room No</th>
                      <th>Room Type</th>
                      <th>Guest Name</th>
                      <th>Phone Number</th>
                      <th>Payment Status</th>
                      <th>Check-Out</th>
                      <th>Nights</th>
                      <th>Balance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>RES-20003</td>
                      <td>Confirmed ✅</td>
                      <td>310</td>
                      <td>Suite</td>
                      <td>Jack Smith</td>
                      <td>+966503334455</td>
                      <td>Paid ✅</td>
                      <td>2025-03-23</td>
                      <td>4</td>
                      <td>0 SAR</td>
                      <td>
                        <button className="view-details" data-res="RES-20003">View Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td>RES-20004</td>
                      <td>Confirmed ✅</td>
                      <td>415</td>
                      <td>Deluxe Room</td>
                      <td>Noor Ahmed</td>
                      <td>+966504445566</td>
                      <td>Pending ⚠️</td>
                      <td>2025-03-25</td>
                      <td>2</td>
                      <td>300 SAR</td>
                      <td>
                        <button className="view-details" data-res="RES-20004">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* جدول In House */}
              <div className="tab-content" id="inHouseTab">
                <table className="reservations-table">
                  <thead>
                    <tr>
                      <th>Reservation No.</th>
                      <th>Status</th>
                      <th>Room No</th>
                      <th>Room Type</th>
                      <th>Guest Name</th>
                      <th>Phone Number</th>
                      <th>Payment Status</th>
                      <th>Arrival Date</th>
                      <th>Departure Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>RES-30001</td>
                      <td>In-House</td>
                      <td>501</td>
                      <td>Double Room</td>
                      <td>Ali Hassan</td>
                      <td>+966501223344</td>
                      <td>Paid ✅</td>
                      <td>2025-03-21</td>
                      <td>2025-03-27</td>
                      <td>
                        <button className="view-details" data-res="RES-30001">View Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td>RES-30002</td>
                      <td>In-House</td>
                      <td>305</td>
                      <td>Suite</td>
                      <td>John Doe</td>
                      <td>+966509876543</td>
                      <td>Pending ⚠️</td>
                      <td>2025-03-20</td>
                      <td>2025-03-29</td>
                      <td>
                        <button className="view-details" data-res="RES-30002">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick Access Shortcuts */}
            <section className="quick-access">
              <h2>Quick Access Shortcuts</h2>
              <div className="shortcut-btns">
                <button>Add Reservation ➕📅</button>
                <button>Manage Bookings 📋</button>
                <button>Guest History 👥</button>
                <button>Housekeeping 🧹</button>
                <button>Financial Reports 📊</button>
              </div>
            </section>
          </div>

          {/* يمين: الإشغال والOccupancy */}
          <div className="right-panel">
            <section className="occupancy-section">
              <h2>Occupancy</h2>
              <div className="pie-chart-container">
                <canvas id="pieChart"></canvas>
              </div>
              <div className="room-type-stats">
                <table>
                  <thead>
                    <tr>
                      <th>Room Type</th>
                      <th>Occupied 🔴</th>
                      <th>Vacant 🟢</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Single Room</td>
                      <td>28</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td>Double Room</td>
                      <td>35</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Suite</td>
                      <td>12</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Deluxe Room</td>
                      <td>18</td>
                      <td>5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="weekly-occupancy">
              <h2>Weekly Occupancy Status</h2>
              <div className="chart-container">
                <canvas id="barChart"></canvas>
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* مودال تفاصيل الحجز */}
      <div id="reservationModal" className="modal">
        <div className="modal-content">
          <span className="close-btn">&times;</span>
          <h2>Reservation Details - RES-20001</h2>
          <div className="modal-details">
            <p><strong>Reservation No:</strong> RES-20001</p>
            <p><strong>Status:</strong> Confirmed ✅</p>
            <p><strong>Room No:</strong> 102</p>
            <p><strong>Room Type:</strong> Single Room</p>
            <p><strong>Arrival Date:</strong> March 20, 2025</p>
            <p><strong>Departure Date:</strong> March 23, 2025</p>
            <p><strong>Guest Name:</strong> Abdullah Khan</p>
            <p><strong>Mobile Number:</strong> +966501112233</p>
            <p><strong>Booking Source:</strong> Online 🌐</p>
            <p><strong>Payment Status:</strong> Paid ✅</p>
            <p><strong>Total Amount:</strong> 1,650 SAR 💳</p>
            <p><strong>Special Requests:</strong></p>
            <ul>
              <li>Quiet room requested.</li>
              <li>Extra pillows required.</li>
            </ul>
          </div>
          <div className="modal-actions">
            <button className="btn close-modal">Close</button>
            <button className="btn check-in">Check-In</button>
            <button className="btn cancel-reservation">Cancel Reservation</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
