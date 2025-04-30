import React, { useState, useRef, useEffect, FormEvent } from 'react';
import Chart from 'chart.js/auto';
import styles from './OccupancyReports.module.css';

type RoomStatus = 'Occupied' | 'Vacant' | 'Maintenance';
type RoomType = 'Deluxe Suite' | 'Single Room' | 'Double Room';

interface RoomDetail {
  roomNo: string;
  roomType: RoomType;
  floor: number;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: RoomStatus;
}

const dummyRooms: RoomDetail[] = [
  { roomNo: '101', roomType: 'Deluxe Suite', floor: 1, guestName: 'Ahmed Yassin', checkIn: '2025-06-01', checkOut: '2025-06-07', status: 'Occupied' },
  { roomNo: '202', roomType: 'Single Room', floor: 2, guestName: '', checkIn: '', checkOut: '', status: 'Vacant' },
  { roomNo: '305', roomType: 'Double Room', floor: 3, guestName: 'Sarah Johnson', checkIn: '2025-06-04', checkOut: '2025-06-09', status: 'Occupied' },
  { roomNo: '404', roomType: 'Deluxe Suite', floor: 4, guestName: '', checkIn: '', checkOut: '', status: 'Maintenance' },
  { roomNo: '110', roomType: 'Single Room', floor: 1, guestName: 'John Doe', checkIn: '2025-06-02', checkOut: '2025-06-05', status: 'Occupied' },
  { roomNo: '215', roomType: 'Double Room', floor: 2, guestName: '', checkIn: '', checkOut: '', status: 'Vacant' },
];

interface TrendPoint {
  date: string;
  percent: number;
}

const generateTrend = (): TrendPoint[] => {
  const points: TrendPoint[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    points.push({
      date: d.toISOString().slice(5, 10),
      percent: Math.round(60 + Math.random() * 30),
    });
  }
  return points;
};

const OccupancyReports: React.FC = () => {
  // filter state
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | RoomType>('All');
  const [floorFilter, setFloorFilter] = useState<'All' | number>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | RoomStatus>('All');

  // room data
  const [rooms, setRooms] = useState<RoomDetail[]>(dummyRooms);
  const [filtered, setFiltered] = useState<RoomDetail[]>(dummyRooms);

  // overview cards
  const overview = { total: 150, occupied: 120, vacant: 25, maintenance: 5 };

  // trend chart
  const trend = useRef<TrendPoint[]>(generateTrend());
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // apply/reset filters
  const applyFilters = () => {
    let res = rooms;
    if (typeFilter !== 'All') res = res.filter((r) => r.roomType === typeFilter);
    if (floorFilter !== 'All') res = res.filter((r) => r.floor === floorFilter);
    if (statusFilter !== 'All') res = res.filter((r) => r.status === statusFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setDateFilter('');
    setTypeFilter('All');
    setFloorFilter('All');
    setStatusFilter('All');
    setFiltered(rooms);
  };

  // init line chart
  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: trend.current.map((p) => p.date),
        datasets: [{
          label: '% Occupancy',
          data: trend.current.map((p) => p.percent),
          fill: false,
          tension: 0.3,
        }],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { callback: (v) => `${v}%` } },
        },
      },
    });
    return () => void chartInstance.current?.destroy();
  }, []);

  // modals state
  const [guestOpen, setGuestOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);

  // update status form
  const [newStatus, setNewStatus] = useState<RoomStatus>('Maintenance');
  const [reason, setReason] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [updateDate, setUpdateDate] = useState(new Date().toISOString().slice(0, 10));

  // export form
  const [exportFormat, setExportFormat] = useState<'CSV' | 'PDF' | 'Excel'>('CSV');
  const [exportFrom, setExportFrom] = useState('');
  const [exportTo, setExportTo] = useState('');
  const [includeDetails, setIncludeDetails] = useState(true);

  // open/close handlers
  const openGuest = (r: RoomDetail) => { setSelectedRoom(r); setGuestOpen(true); };
  const closeGuest = () => setGuestOpen(false);

  const openStatus = (r: RoomDetail) => {
    setSelectedRoom(r);
    setNewStatus(r.status);              // <— initialize to current status
    setReason('');
    setUpdatedBy('');
    setUpdateDate(new Date().toISOString().slice(0, 10));
    setStatusOpen(true);
  };
  const closeStatus = () => setStatusOpen(false);

  const openExport = () => setExportOpen(true);
  const closeExport = () => setExportOpen(false);

  // submit handlers
  const handleStatusUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!reason || !updatedBy) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    if (selectedRoom) {
      setRooms((prev) =>
        prev.map((r) =>
          r.roomNo === selectedRoom.roomNo
            ? { ...r, status: newStatus }
            : r
        )
      );
      alert('✅ Status updated successfully!');
      closeStatus();
      applyFilters();
    }
  };

  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    if (!exportFrom || !exportTo) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    setTimeout(() => {
      alert('✅ Occupancy data exported successfully!');
      closeExport();
    }, 300);
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <h1 className={styles.pageTitle}>Occupancy Reports</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Reports and Analytics &gt; Occupancy Reports
      </div>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <h2>🔍 Filter Occupancy Data</h2>
        <div className={styles.filterGrid}>
          <div>
            <label>Date</label>
            <input
              type="date"
              className={styles.input}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div>
            <label>Room Type</label>
            <select
              className={styles.input}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
            >
              <option>All</option>
              <option>Deluxe Suite</option>
              <option>Single Room</option>
              <option>Double Room</option>
            </select>
          </div>
          <div>
            <label>Floor</label>
            <select
              className={styles.input}
              value={floorFilter}
              onChange={(e) =>
                setFloorFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))
              }
            >
              <option>All</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div>
            <label>Occupancy Status</label>
            <select
              className={styles.input}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option>All</option>
              <option>Occupied</option>
              <option>Vacant</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Apply Filters
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2>📋 Today's Occupancy Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Rooms</div>
            <div className={styles.cardValue}>{overview.total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Occupied Rooms</div>
            <div className={styles.cardValue}>{overview.occupied}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Vacant Rooms</div>
            <div className={styles.cardValue}>{overview.vacant}</div>
          </div>
          <div className={`${styles.card} ${styles.cardRed}`}>
            <div>Under Maintenance</div>
            <div className={styles.cardValue}>{overview.maintenance}</div>
          </div>
        </div>
      </section>

      {/* Detailed Table */}
      <section className={styles.detailSection}>
        <h2>🗃️ Detailed Occupancy Status</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  'Room No.',
                  'Room Type',
                  'Floor',
                  'Guest Name',
                  'Check-In',
                  'Check-Out',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.roomNo}>
                  <td>{r.roomNo}</td>
                  <td>{r.roomType}</td>
                  <td>{r.floor}</td>
                  <td>{r.guestName || '—'}</td>
                  <td>{r.checkIn || '—'}</td>
                  <td>{r.checkOut || '—'}</td>
                  <td>
                    <span
                      className={
                        r.status === 'Occupied'
                          ? styles.badgeGreen
                          : r.status === 'Vacant'
                          ? styles.badgeGray
                          : styles.badgeRed
                      }
                    >
                      {r.status === 'Occupied'
                        ? '🟢 Occupied'
                        : r.status === 'Vacant'
                        ? '⚪ Vacant'
                        : '🔴 Maintenance'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openGuest(r)}
                    >
                      View Details
                    </button>
                    {r.status === 'Vacant' && (
                      <button
                        className={`${styles.btn} ${styles.cleanBtn}`}
                        onClick={() => alert('✅ Room marked as cleaned!')}
                      >
                        Mark Cleaned
                      </button>
                    )}
                    {r.status === 'Maintenance' && (
                      <button
                        className={`${styles.btn} ${styles.updateStatusBtn}`}
                        onClick={() => openStatus(r)}
                      >
                        Update Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trend Chart */}
      <section className={styles.trendSection}>
        <h2>📊 Monthly Occupancy Trends</h2>
        <canvas ref={chartRef}></canvas>
      </section>

      {/* Export */}
      <section className={styles.exportSection}>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📥 Export Occupancy Data
        </button>
      </section>

      {/* Guest Details Modal */}
      {guestOpen && selectedRoom && (
        <div className={styles.modalOverlay} onClick={closeGuest}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeGuest}>&times;</span>
            <h2>👤 Guest &amp; Room Details – Room {selectedRoom.roomNo}</h2>
            <p><strong>Guest Name:</strong> {selectedRoom.guestName}</p>
            <p><strong>Room Type:</strong> {selectedRoom.roomType}</p>
            <p><strong>Floor:</strong> {selectedRoom.floor}</p>
            <p><strong>Check-In:</strong> {selectedRoom.checkIn}</p>
            <p><strong>Check-Out:</strong> {selectedRoom.checkOut}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeGuest}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {statusOpen && selectedRoom && (
        <div className={styles.modalOverlay} onClick={closeStatus}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeStatus}>&times;</span>
            <h2>🛠️ Update Room Status – Room {selectedRoom.roomNo}</h2>
            <form className={styles.form} onSubmit={handleStatusUpdate}>
              <div className={styles.formRow}>
                <label>Current Status</label>
                <select
                  className={styles.input}
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as RoomStatus)}
                >
                  <option>Occupied</option>
                  <option>Vacant</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Reason</label>
                <textarea
                  className={styles.input}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Updated By</label>
                <input
                  className={styles.input}
                  value={updatedBy}
                  onChange={(e) => setUpdatedBy(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Update Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={updateDate}
                  onChange={(e) => setUpdateDate(e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>Update Status</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeStatus}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeExport}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeExport}>&times;</span>
            <h2>📥 Export Occupancy Data</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select
                  className={styles.input}
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
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
                  value={exportFrom}
                  onChange={(e) => setExportFrom(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>To Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={exportTo}
                  onChange={(e) => setExportTo(e.target.value)}
                />
              </div>
              <div className={styles.formRowCheckbox}>
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                />
                <label>Include guest & room details</label>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.applyBtn}`}>Export</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeExport}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OccupancyReports;
