import React, { useState, FormEvent } from 'react';
import styles from './TransportRequests.module.css';

type TransportType =
  | 'Airport Pickup'
  | 'Airport Drop-off'
  | 'City Tour'
  | 'Special Transfer';
type Status = 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled';

interface Request {
  id: string;
  guest: string;
  room: string;
  type: TransportType;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation?: string;
  vehicle?: string;
  driver?: string;
  charge: number; // in SAR
  status: Status;
  notes?: string;
}

const dummyRequests: Request[] = [
  {
    id: 'TR-101',
    guest: 'Ahmed Yassin',
    room: '501',
    type: 'Airport Pickup',
    pickupTime: '08:00 AM',
    pickupLocation: 'Istanbul Airport',
    vehicle: 'Mercedes Vito',
    charge: 600,
    status: 'Pending',
    notes: 'Baby seat required',
  },
  {
    id: 'TR-102',
    guest: 'Sarah Johnson',
    room: '402',
    type: 'City Tour',
    pickupTime: '09:30 AM',
    pickupLocation: 'Hotel Lobby',
    vehicle: 'Mini Bus',
    driver: 'Yazeed Feras',
    charge: 1200,
    status: 'Scheduled',
  },
  {
    id: 'TR-103',
    guest: 'Omar Hussein',
    room: '303',
    type: 'Airport Drop-off',
    pickupTime: '11:00 AM',
    pickupLocation: 'Hotel Lobby',
    dropoffLocation: 'Istanbul Airport',
    vehicle: 'BMW X5',
    driver: 'Yazeed Feras',
    charge: 600,
    status: 'Completed',
  },
  {
    id: 'TR-104',
    guest: 'Ali Abdullah',
    room: '205',
    type: 'Special Transfer',
    pickupTime: '12:00 PM',
    pickupLocation: 'Hotel Lobby',
    charge: 400,
    status: 'Cancelled',
  },
];

const TransportRequests: React.FC = () => {
  // Filters
  const [idFilter, setIdFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | TransportType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');

  // Data
  const [filtered, setFiltered] = useState<Request[]>(dummyRequests);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Request | null>(null);

  // Update-status form
  const [updStatus, setUpdStatus] = useState<Status>('Pending');
  const [updDriver, setUpdDriver] = useState('');
  const [updVehicle, setUpdVehicle] = useState('');
  const [updNotes, setUpdNotes] = useState('');

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [expFrom, setExpFrom] = useState('');
  const [expTo, setExpTo] = useState('');
  const [expDetails, setExpDetails] = useState(true);

  // Counts
  const total = dummyRequests.length;
  const pending = dummyRequests.filter(r => r.status === 'Pending').length;
  const scheduled = dummyRequests.filter(r => r.status === 'Scheduled').length;
  const completed = dummyRequests.filter(r => r.status === 'Completed').length;
  const cancelled = dummyRequests.filter(r => r.status === 'Cancelled').length;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyRequests;
    if (idFilter) res = res.filter(r => r.id.includes(idFilter));
    if (guestFilter)
      res = res.filter(r =>
        r.guest.toLowerCase().includes(guestFilter.toLowerCase())
      );
    if (typeFilter !== 'All') res = res.filter(r => r.type === typeFilter);
    if (statusFilter !== 'All') res = res.filter(r => r.status === statusFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setIdFilter('');
    setGuestFilter('');
    setTypeFilter('All');
    setStatusFilter('All');
    setFiltered(dummyRequests);
  };

  // Open modals
  const openDetail = (r: Request) => {
    setSelected(r);
    setDetailOpen(true);
  };
  const openStatus = (r: Request) => {
    setSelected(r);
    setUpdStatus(r.status);
    setUpdDriver(r.driver || '');
    setUpdVehicle(r.vehicle || '');
    setUpdNotes(r.notes || '');
    setStatusOpen(true);
  };
  const openReceipt = (r: Request) => {
    setSelected(r);
    setReceiptOpen(true);
  };
  const openExport = () => setExportOpen(true);

  // Close all
  const closeAll = () => {
    setDetailOpen(false);
    setStatusOpen(false);
    setReceiptOpen(false);
    setExportOpen(false);
    setSelected(null);
  };

  // Handle update
  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!updDriver || !updVehicle) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Transport status updated successfully!');
    closeAll();
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    if (!expFrom || !expTo) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Transport requests exported successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Transport Requests</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Guest Requests &gt; Transport Requests
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>
          🔎 Filter Transport Requests
        </h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., TR-101"
            value={idFilter}
            onChange={e => setIdFilter(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Guest Name"
            value={guestFilter}
            onChange={e => setGuestFilter(e.target.value)}
          />
          <select
            className={styles.input}
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Airport Pickup</option>
            <option>Airport Drop-off</option>
            <option>City Tour</option>
            <option>Special Transfer</option>
          </select>
          <select
            className={styles.input}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <button
          className={`${styles.btn} ${styles.applyBtn}`}
          onClick={applyFilters}
        >
          🔎 Apply Filters
        </button>
        <button
          className={`${styles.btn} ${styles.resetBtn}`}
          onClick={resetFilters}
        >
          🔄 Reset
        </button>
        <button
          className={`${styles.btn} ${styles.exportBtn}`}
          onClick={openExport}
        >
          📤 Export Requests
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>
          📊 Today's Transport Overview
        </h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Requests</div>
            <div className={styles.cardValue}>{total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Pending</div>
            <div className={styles.cardValue}>{pending}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Scheduled</div>
            <div className={styles.cardValue}>{scheduled}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Completed</div>
            <div className={styles.cardValue}>{completed}</div>
          </div>
          <div className={`${styles.card} ${styles.cardRed}`}>
            <div>Cancelled</div>
            <div className={styles.cardValue}>{cancelled}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>
          📋 Detailed Transport Requests
        </h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Guest Name</th>
                <th>Transport Type</th>
                <th>Pickup Time</th>
                <th>Pickup Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.guest}</td>
                  <td>{r.type}</td>
                  <td>{r.pickupTime}</td>
                  <td>{r.pickupLocation}</td>
                  <td>
                    <span
                      className={
                        r.status === 'Pending'
                          ? styles.badgeOrange
                          : r.status === 'Scheduled'
                          ? styles.badgePurple
                          : r.status === 'Completed'
                          ? styles.badgeGreen
                          : styles.badgeRed
                      }
                    >
                      {r.status === 'Pending'
                        ? '🟠 Pending'
                        : r.status === 'Scheduled'
                        ? '🟣 Scheduled'
                        : r.status === 'Completed'
                        ? '🟢 Completed'
                        : '🔴 Cancelled'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetail(r)}
                    >
                      View
                    </button>
                    {r.status !== 'Completed' && r.status !== 'Cancelled' && (
                      <button
                        className={`${styles.btn} ${styles.updateBtn}`}
                        onClick={() => openStatus(r)}
                      >
                        Update Status
                      </button>
                    )}
                    {r.status === 'Completed' && (
                      <button
                        className={`${styles.btn} ${styles.receiptBtn}`}
                        onClick={() => openReceipt(r)}
                      >
                        View Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>📝 Transport Request Details – {selected.id}</h2>
            <p>
              <strong>Guest:</strong> {selected.guest}
            </p>
            <p>
              <strong>Room:</strong> {selected.room}
            </p>
            <p>
              <strong>Type:</strong> {selected.type}
            </p>
            <p>
              <strong>Pickup Time:</strong> {selected.pickupTime}
            </p>
            <p>
              <strong>Pickup Location:</strong> {selected.pickupLocation}
            </p>
            {selected.dropoffLocation && (
              <p>
                <strong>Drop-off Location:</strong> {selected.dropoffLocation}
              </p>
            )}
            {selected.vehicle && (
              <p>
                <strong>Vehicle:</strong> {selected.vehicle}
              </p>
            )}
            <p>
              <strong>Charge:</strong> SAR {selected.charge}
            </p>
            <p>
              <strong>Notes:</strong> {selected.notes || '—'}
            </p>
            <p>
              <strong>Status:</strong> {selected.status}
            </p>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={closeAll}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {statusOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>🔄 Update Transport Status – {selected.id}</h2>
            <form className={styles.form} onSubmit={handleUpdate}>
              <div className={styles.formRow}>
                <label>Current Status</label>
                <select
                  className={styles.input}
                  value={updStatus}
                  onChange={e => setUpdStatus(e.target.value as Status)}
                >
                  <option>Pending</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Assigned Driver</label>
                <input
                  type="text"
                  className={styles.input}
                  value={updDriver}
                  onChange={e => setUpdDriver(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Vehicle Details</label>
                <input
                  type="text"
                  className={styles.input}
                  value={updVehicle}
                  onChange={e => setUpdVehicle(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Notes</label>
                <textarea
                  className={styles.input}
                  value={updNotes}
                  onChange={e => setUpdNotes(e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.updateBtn}`}
                >
                  Update
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={closeAll}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>🧾 Transport Service Receipt – {selected.id}</h2>
            <p>
              <strong>Guest:</strong> {selected.guest}
            </p>
            <p>
              <strong>Type:</strong> {selected.type}
            </p>
            <p>
              <strong>Pickup Time:</strong> {selected.pickupTime}
            </p>
            <p>
              <strong>Pickup Location:</strong> {selected.pickupLocation}
            </p>
            {selected.dropoffLocation && (
              <p>
                <strong>Drop-off:</strong> {selected.dropoffLocation}
              </p>
            )}
            {selected.vehicle && (
              <p>
                <strong>Vehicle:</strong> {selected.vehicle}
              </p>
            )}
            <p>
              <strong>Driver:</strong> {selected.driver || '—'}
            </p>
            <p>
              <strong>Charge:</strong> SAR {selected.charge}
            </p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.printBtn}`}>
                Print Receipt
              </button>
              <button className={`${styles.btn} ${styles.exportBtn}`}>
                Download PDF
              </button>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={closeAll}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>
              &times;
            </span>
            <h2>📤 Export Transport Requests</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select
                  className={styles.input}
                  value={expFormat}
                  onChange={e => setExpFormat(e.target.value as any)}
                >
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>From</label>
                <input
                  type="date"
                  className={styles.input}
                  value={expFrom}
                  onChange={e => setExpFrom(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>To</label>
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
                  checked={expDetails}
                  onChange={e => setExpDetails(e.target.checked)}
                />
                <label>Include all details</label>
              </div>
              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.applyBtn}`}
                >
                  Export
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={closeAll}
                >
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

export default TransportRequests;
