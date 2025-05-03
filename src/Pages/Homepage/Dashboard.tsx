// src/Homepage/Dashboard.tsx
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';
import { DashboardResponseDTO } from '../../model/Reservation DTO/DashboardResponseDTO';
import { getDashboardReservations } from '../../api/reservationService';

const Dashboard: React.FC = () => {
  // مراجع لتخزين مثيلات Chart
  const pieChartRef = useRef<Chart | null>(null);
  const barChartRef = useRef<Chart | null>(null);
  const [dashboard, setDashboard] = useState<DashboardResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Arrivals'|'Departures'|'InHouse'>('Arrivals');

  useEffect(() => {
    // 1. رسم بياني دائري (Occupancy)
    const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement | null;
    const pieCtx = pieCanvas?.getContext('2d');
    if (pieCtx) {
      // دمر الرسم السابق إذا وجد
      pieChartRef.current?.destroy();
      pieChartRef.current = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Occupied', 'Vacant', 'Blocked'],
          datasets: [
            {
              data: [72, 23, 5],
              backgroundColor: ['#ff4d4d', '#4dff4d', '#a6a6a6'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // 2. رسم بياني عمودي (Weekly Occupancy)
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement | null;
    const barCtx = barCanvas?.getContext('2d');
    if (barCtx) {
      barChartRef.current?.destroy();
      barChartRef.current = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Occupied',
              data: [45, 50, 40, 55, 60, 48, 52],
              backgroundColor: '#ff4d4d',
            },
            {
              label: 'Vacant',
              data: [15, 10, 20, 5, 0, 12, 8],
              backgroundColor: '#4dff4d',
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

   // 3. منطق التابات
    const tabButtons = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
    const tabContents = document.querySelectorAll<HTMLElement>('.tab-content');
    tabButtons.forEach(btn => {
      const handler = () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(tc => (tc.style.display = 'none'));
        const targetTab = btn.getAttribute('data-tab');
        const targetElement = targetTab ? document.getElementById(targetTab) : null;
        if (targetElement) targetElement.style.display = 'block';
      };
      btn.addEventListener('click', handler);
      // cleanup later
      btn.dataset['handler'] = ''; // marker
    }); 

    // 4. منطق المودال (تفاصيل الحجز)
    const modal = document.getElementById('reservationModal') as HTMLElement | null;
    const closeBtn = document.querySelector<HTMLElement>('.close-btn');
    const viewDetailsButtons = document.querySelectorAll<HTMLButtonElement>('.view-details');

    const openModal = () => { if (modal) modal.style.display = 'block'; };
    const closeModal = () => { if (modal) modal.style.display = 'none'; };
    const outsideClick = (e: MouseEvent) => { if (modal && e.target === modal) modal.style.display = 'none'; };

    viewDetailsButtons.forEach(btn => btn.addEventListener('click', openModal));
    closeBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    
    getDashboardReservations()
    .then(data => {
      console.log(data);
      setDashboard({
        arrivals: data.arrivals,
        departures: data.departures,
        inHouse:   data.inHouse, 
      });
      setLoading(false);

    });
  
    setLoading(false);

    // Cleanup
    return () => {
      pieChartRef.current?.destroy();
      barChartRef.current?.destroy();
      viewDetailsButtons.forEach(btn => btn.removeEventListener('click', openModal));
      closeBtn?.removeEventListener('click', closeModal);
      window.removeEventListener('click', outsideClick);

    };


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
                <button
                  className={activeTab==='Arrivals' ? 'tab-btn active':'tab-btn'}
                  onClick={()=>setActiveTab('Arrivals')}
                >Arrival</button>
                <button
                  className={activeTab==='Departures' ? 'tab-btn active':'tab-btn'}
                  onClick={()=>setActiveTab('Departures')}
                >Departure</button>
                <button
                  className={activeTab==='InHouse' ? 'tab-btn active':'tab-btn'}
                  onClick={()=>setActiveTab('InHouse')}
                >In House</button>
              </div>


              {/* بحث صغير */}
              <div className="search-bar small-search">
                <input type="text" placeholder="Search by phone, name, or reservation no." />
                <button id="searchBtn">🔍</button>
              </div>

              {loading && <div>جاري التحميل…</div>}
              {error && <div className="error">{error}</div>}
              {!loading && !error && (
                <>
                {/* Arrivals Table */}
                {activeTab==='Arrivals' && (
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
                  {dashboard?.arrivals.length
                    ? dashboard!.arrivals.map(r => (
                  <tr key={r.reservationId}>
                    <td>RES-{r.reservationId}</td>
                    <td>{r.status}</td>
                    <td>{r.roomNumber}</td>
                    <td>{r.roomType}</td>
                    <td>{r.guestName}</td>
                    <td>{r.phoneNumber}</td>
                    <td>{r.paymentStatus}</td>
                    <td>{r.ArrivalDate}</td>
                    <td>{r.DepartureDate}</td>
                    <td>
                    <button className="view-details" data-res={r.reservationId}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            : (
                <tr>
                  <td colSpan={11} className="empty">
                    لا توجد سجلات للوصول اليوم
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    )}

    {/* Departures Table */}
    {activeTab==='Departures' && (
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
          {dashboard!.departures.length
            ? dashboard!.departures.map(r=>(
              <tr key={r.reservationId}>
              <td>RES-{r.reservationId}</td>
              <td>{r.status}</td>
              <td>{r.roomNumber}</td>
              <td>{r.roomType}</td>
              <td>{r.guestName}</td>
              <td>{r.phoneNumber}</td>
              <td>{r.paymentStatus}</td>
              <td>{r.ArrivalDate}</td>
              <td>{r.DepartureDate}</td>
              <td>
              <button className="view-details" data-res={r.reservationId}>
                View Details
              </button>
            </td>
          </tr>
              ))
            : (
                <tr>
                  <td colSpan={11} className="empty">
                    لا توجد سجلات للمغادرة اليوم
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    )}

    {/* In House Table */}
    {activeTab==='InHouse' && (
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
            {dashboard!.inHouse.length
              ? dashboard!.inHouse.map(r=>(
                <tr key={r.reservationId}>
                <td>RES-{r.reservationId}</td>
                <td>{r.status}</td>
                <td>{r.roomNumber}</td>
                <td>{r.roomType}</td>
                <td>{r.guestName}</td>
                <td>{r.phoneNumber}</td>
                <td>{r.paymentStatus}</td>
                <td>{r.ArrivalDate}</td>
                <td>{r.DepartureDate}</td>
                <td>
                <button className="view-details" data-res={r.reservationId}>
                  View Details
                </button>
              </td>
              </tr>
                  ))
                : (
                    <tr>
                      <td colSpan={10} className="empty">
                        لا توجد نزلاء في الفندق حالياً
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
                )}
              </>
            )}

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
