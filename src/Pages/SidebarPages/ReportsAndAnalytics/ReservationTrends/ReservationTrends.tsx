import React, { useState, useRef, useEffect, FormEvent } from 'react';
import Chart from 'chart.js/auto';
import styles from './ReservationTrends.module.css';

type Status = 'Confirmed' | 'Pending' | 'Cancelled';
type Channel = 'Website' | 'OTA' | 'Walk-in' | 'Corporate';
type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe';

interface Reservation {
  id: string;
  guestName: string;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  roomType: RoomType;
  channel: Channel;
  status: Status;
  guests: number;
  amount: number; // TL
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  notes?: string;
}

interface TrendPoint {
  date: string;
  count: number;
}

// Dummy reservations
const dummyReservations: Reservation[] = [
  { id: 'RES-10234', guestName: 'Ahmed Yassin', checkIn: '2025-06-02', checkOut: '2025-06-06', roomType: 'Suite', channel: 'Website', status: 'Confirmed', guests: 2, amount: 3200, paymentStatus: 'Paid' },
  { id: 'RES-10235', guestName: 'Sarah Johnson', checkIn: '2025-06-03', checkOut: '2025-06-07', roomType: 'Deluxe', channel: 'OTA', status: 'Pending', guests: 1, amount: 2800, paymentStatus: 'Partial' },
  { id: 'RES-10236', guestName: 'Omar Hussein', checkIn: '2025-06-04', checkOut: '2025-06-05', roomType: 'Single', channel: 'Walk-in', status: 'Cancelled', guests: 1, amount: 600, paymentStatus: 'Unpaid' },
  { id: 'RES-10237', guestName: 'Leen Murtada', checkIn: '2025-06-05', checkOut: '2025-06-08', roomType: 'Double', channel: 'Corporate', status: 'Confirmed', guests: 2, amount: 2400, paymentStatus: 'Paid' },
  { id: 'RES-10238', guestName: 'Ali Abdullah', checkIn: '2025-06-06', checkOut: '2025-06-09', roomType: 'Suite', channel: 'Website', status: 'Pending', guests: 3, amount: 4500, paymentStatus: 'Partial' },
];

// Generate trend data for the last N days
const generateTrend = (days: number): TrendPoint[] => {
  const result: TrendPoint[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    result.push({
      date: d.toISOString().slice(5, 10), // MM-DD
      count: Math.floor(20 + Math.random() * 60),
    });
  }
  return result;
};

const ReservationTrends: React.FC = () => {
  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [channelFilter, setChannelFilter] = useState<'All' | Channel>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | RoomType>('All');

  // Data
  const [reservations, setReservations] = useState<Reservation[]>(dummyReservations);
  const [filtered, setFiltered] = useState<Reservation[]>(dummyReservations);

  // Overview
  const overview = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'Confirmed').length,
    pending: reservations.filter(r => r.status === 'Pending').length,
    cancelled: reservations.filter(r => r.status === 'Cancelled').length,
  };

  // Chart
  const trend = useRef<TrendPoint[]>(generateTrend(30));
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: trend.current.map(p => p.date),
        datasets: [{
          label: 'Reservations',
          data: trend.current.map(p => p.count),
          fill: false,
          tension: 0.3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
    return () => { chartInstance.current?.destroy(); };
  }, []);

  // Filter handlers
  const applyFilters = () => {
    let res = reservations;
    if (startDate) res = res.filter(r => r.checkIn >= startDate);
    if (endDate) res = res.filter(r => r.checkOut <= endDate);
    if (channelFilter !== 'All') res = res.filter(r => r.channel === channelFilter);
    if (typeFilter !== 'All') res = res.filter(r => r.roomType === typeFilter);
    setFiltered(res);
  };
  const clearFilters = () => {
    setStartDate(''); setEndDate('');
    setChannelFilter('All'); setTypeFilter('All');
    setFiltered(reservations);
  };

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Reservation | null>(null);

  // Modify form
  const [modCheckIn, setModCheckIn] = useState('');
  const [modCheckOut, setModCheckOut] = useState('');
  const [modType, setModType] = useState<RoomType>('Single');
  const [modGuests, setModGuests] = useState(1);
  const [modNotes, setModNotes] = useState('');

  // Export form
  const [exportFormat, setExportFormat] = useState<'CSV' | 'PDF' | 'Excel'>('CSV');
  const [expFrom, setExpFrom] = useState('');
  const [expTo, setExpTo] = useState('');
  const [includeNotes, setIncludeNotes] = useState(true);

  // Open/close
  const openDetail = (r: Reservation) => {
    setSelected(r);
    setDetailOpen(true);
  };
  const closeDetail = () => setDetailOpen(false);

  const openModify = (r: Reservation) => {
    setSelected(r);
    setModCheckIn(r.checkIn);
    setModCheckOut(r.checkOut);
    setModType(r.roomType);
    setModGuests(r.guests);
    setModNotes(r.notes || '');
    setModifyOpen(true);
  };
  const closeModify = () => setModifyOpen(false);

  const openExport = () => setExportOpen(true);
  const closeExport = () => setExportOpen(false);

  // Submit Modify
  const handleModify = (e: FormEvent) => {
    e.preventDefault();
    if (!modCheckIn || !modCheckOut || modGuests < 1) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    if (modCheckOut <= modCheckIn) {
      alert('⚠️ Check-Out must be after Check-In date!');
      return;
    }
    if (selected) {
      setReservations(prev =>
        prev.map(r =>
          r.id === selected.id
            ? { ...r, checkIn: modCheckIn, checkOut: modCheckOut, roomType: modType, guests: modGuests, notes: modNotes }
            : r
        )
      );
      alert('✅ Reservation modified successfully!');
      closeModify();
      applyFilters();
    }
  };

  // Submit Export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    if (!expFrom || !expTo) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    setTimeout(() => {
      alert('✅ Reservations exported successfully!');
      closeExport();
    }, 300);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Reservation Trends</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Reports and Analytics &gt; Reservation Trends
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2>📅 Filter Reservation Data</h2>
        <div className={styles.filterGrid}>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              className={styles.input}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              className={styles.input}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label>Booking Channel</label>
            <select
              className={styles.input}
              value={channelFilter}
              onChange={e => setChannelFilter(e.target.value as any)}
            >
              <option>All</option>
              <option>Website</option>
              <option>OTA</option>
              <option>Walk-in</option>
              <option>Corporate</option>
            </select>
          </div>
          <div>
            <label>Room Type</label>
            <select
              className={styles.input}
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
            >
              <option>All</option>
              <option>Single</option>
              <option>Double</option>
              <option>Suite</option>
              <option>Deluxe</option>
            </select>
          </div>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Apply Filters
        </button>
        <button className={`${styles.btn} ${styles.clearBtn}`} onClick={clearFilters}>
          🔄 Clear
        </button>
      </section>

      {/* Trends Chart */}
      <section className={styles.chartSection}>
        <h2>📈 Reservations Over Time</h2>
        <div className={styles.chartWrapper}>
          <canvas ref={chartRef}></canvas>
        </div>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2>📊 Reservation Statistics</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Reservations</div>
            <div className={styles.cardValue}>{overview.total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Confirmed Reservations</div>
            <div className={styles.cardValue}>{overview.confirmed}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Pending Reservations</div>
            <div className={styles.cardValue}>{overview.pending}</div>
          </div>
          <div className={`${styles.card} ${styles.cardRed}`}>
            <div>Cancelled Reservations</div>
            <div className={styles.cardValue}>{overview.cancelled}</div>
          </div>
        </div>
      </section>

      {/* Details Table */}
      <section className={styles.detailSection}>
        <h2>🗂️ Reservation Details</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  'Reservation ID',
                  'Guest Name',
                  'Check-In',
                  'Check-Out',
                  'Room Type',
                  'Channel',
                  'Status',
                  'Amount (SAR)',
                  'Actions',
                ].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.guestName}</td>
                  <td>{r.checkIn}</td>
                  <td>{r.checkOut}</td>
                  <td>{r.roomType}</td>
                  <td>{r.channel}</td>
                  <td>
                    <span
                      className={
                        r.status === 'Confirmed'
                          ? styles.badgeGreen
                          : r.status === 'Pending'
                          ? styles.badgeOrange
                          : styles.badgeRed
                      }
                    >
                      {r.status === 'Confirmed'
                        ? '🟢 Confirmed'
                        : r.status === 'Pending'
                        ? '🟠 Pending'
                        : '🔴 Cancelled'}
                    </span>
                  </td>
                  <td>{r.amount.toLocaleString()}</td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetail(r)}
                    >
                      View
                    </button>
                    {r.status !== 'Cancelled' && (
                      <button
                        className={`${styles.btn} ${styles.modifyBtn}`}
                        onClick={() => openModify(r)}
                      >
                        Modify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Export */}
      <section className={styles.exportSection}>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Data
        </button>
      </section>

      {/* Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeDetail}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeDetail}>&times;</span>
            <h2>📝 Reservation Details – {selected.id}</h2>
            <p><strong>Guest Name:</strong> {selected.guestName}</p>
            <p><strong>Room Type:</strong> {selected.roomType}</p>
            <p><strong>Channel:</strong> {selected.channel}</p>
            <p><strong>Check-In:</strong> {selected.checkIn}</p>
            <p><strong>Check-Out:</strong> {selected.checkOut}</p>
            <p><strong>Guests:</strong> {selected.guests}</p>
            <p><strong>Total Amount:</strong> ₺{selected.amount.toLocaleString()}</p>
            <p><strong>Payment Status:</strong> {selected.paymentStatus}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeDetail}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {modifyOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeModify}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeModify}>&times;</span>
            <h2>✏️ Modify Reservation – {selected.id}</h2>
            <form className={styles.form} onSubmit={handleModify}>
              <div className={styles.formRow}>
                <label>Check-In Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={modCheckIn}
                  onChange={e => setModCheckIn(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Check-Out Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={modCheckOut}
                  onChange={e => setModCheckOut(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Room Type</label>
                <select
                  className={styles.input}
                  value={modType}
                  onChange={e => setModType(e.target.value as RoomType)}
                >
                  <option>Single</option>
                  <option>Double</option>
                  <option>Suite</option>
                  <option>Deluxe</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Guests</label>
                <input
                  type="number"
                  className={styles.input}
                  min={1}
                  value={modGuests}
                  onChange={e => setModGuests(Number(e.target.value))}
                />
              </div>
              <div className={styles.formRow}>
                <label>Notes</label>
                <textarea
                  className={styles.input}
                  value={modNotes}
                  onChange={e => setModNotes(e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
                  Save Changes
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeModify}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeExport}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeExport}>&times;</span>
            <h2>📤 Export Data</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>Format</label>
                <select
                  className={styles.input}
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value as any)}
                >
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>From Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={expFrom}
                  onChange={e => setExpFrom(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>To Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={expTo}
                  onChange={e => setExpTo(e.target.value)}
                />
              </div>
              <div className={styles.formRowCheckbox}>
                <input
                  type="checkbox"
                  checked={includeNotes}
                  onChange={e => setIncludeNotes(e.target.checked)}
                />
                <label>Include reservation notes</label>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.applyBtn}`}>
                  Export
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeExport}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationTrends;
