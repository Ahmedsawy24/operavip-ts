// src/Pages/SidebarPages/RoomAssignment/ManualAutoAssign/ManualAutoAssign.tsx
import React, { useState, FormEvent } from 'react';
import styles from './ManualAutoAssign.module.css';

type PaymentStatus = 'Paid' | 'Pending';
type AssignStatus  = 'Assigned' | 'Unassigned';
type RoomType      = 'Single' | 'Double' | 'Suite';

interface Reservation {
  id: string;
  guest: string;
  arrival: string;     // YYYY-MM-DD
  departure: string;   // YYYY-MM-DD
  roomType: RoomType;
  payment: PaymentStatus;
  assignedRoom: string | null;
  status: AssignStatus;
  channel: string;
  specialRequests: string;
  assignDate?: string;   // YYYY-MM-DD
  assignedBy?: string;
}

const dummyReservations: Reservation[] = [
  {
    id: 'RES-15001',
    guest: 'Khalid Al-Ahmad',
    arrival: '2025-08-01',
    departure: '2025-08-05',
    roomType: 'Suite',
    payment: 'Paid',
    assignedRoom: '701',
    status: 'Assigned',
    channel: 'Website',
    specialRequests: 'Extra pillows',
    assignDate: '2025-07-25',
    assignedBy: 'John Smith'
  },
  {
    id: 'RES-15002',
    guest: 'Sara Ahmed',
    arrival: '2025-08-02',
    departure: '2025-08-06',
    roomType: 'Double',
    payment: 'Pending',
    assignedRoom: null,
    status: 'Unassigned',
    channel: 'Phone',
    specialRequests: ''
  },
  {
    id: 'RES-15003',
    guest: 'Omar Youssef',
    arrival: '2025-08-03',
    departure: '2025-08-08',
    roomType: 'Single',
    payment: 'Paid',
    assignedRoom: '405',
    status: 'Assigned',
    channel: 'Walk-in',
    specialRequests: 'No smoking',
    assignDate: '2025-07-26',
    assignedBy: 'Sara Ibrahim'
  },
  {
    id: 'RES-15004',
    guest: 'Lina Kim',
    arrival: '2025-08-04',
    departure: '2025-08-07',
    roomType: 'Suite',
    payment: 'Paid',
    assignedRoom: null,
    status: 'Unassigned',
    channel: 'Website',
    specialRequests: 'High floor'
  }
];

const availableRooms = [
  { room: '101', type: 'Single', floor: 1 },
  { room: '102', type: 'Single', floor: 1 },
  { room: '203', type: 'Double', floor: 2 },
  { room: '301', type: 'Suite',  floor: 3 },
  { room: '405', type: 'Single', floor: 4 },
  { room: '701', type: 'Suite',  floor: 7 }
];

const ManualAutoAssign: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(dummyReservations);
  const [filtered, setFiltered]         = useState<Reservation[]>(dummyReservations);

  const [qId, setQId]           = useState('');
  const [qGuest, setQGuest]     = useState('');
  const [qArrival, setQArrival] = useState('');
  const [qDeparture, setQDeparture] = useState('');
  const [qType, setQType]       = useState<'all' | RoomType>('all');
  const [qStatus, setQStatus]   = useState<'all' | AssignStatus>('all');
  const [qChannel, setQChannel] = useState<'all' | string>('all');

  const [detailOpen, setDetailOpen]     = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);
  const [selected, setSelected]         = useState<Reservation | null>(null);

  const [newRoom, setNewRoom]             = useState('');
  const [reassignReason, setReassignReason] = useState('');
  const [autoMessage, setAutoMessage]       = useState('');

  // Quick stats
  const total           = reservations.length;
  const assignedCount   = reservations.filter(r => r.status === 'Assigned').length;
  const unassignedCount = total - assignedCount;

  // Search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const res = reservations.filter(r =>
      (qId === '' || r.id.includes(qId)) &&
      (qGuest === '' || r.guest.toLowerCase().includes(qGuest.toLowerCase())) &&
      (qArrival === '' || r.arrival === qArrival) &&
      (qDeparture === '' || r.departure === qDeparture) &&
      (qType === 'all' || r.roomType === qType) &&
      (qStatus === 'all' || r.status === qStatus) &&
      (qChannel === 'all' || r.channel === qChannel)
    );
    setFiltered(res);
  };

  // Open detail modal
  const openDetails = (r: Reservation) => {
    setSelected(r);
    setDetailOpen(true);
  };

  // Open reassign modal
  const openReassign = (r: Reservation) => {
    setSelected(r);
    setNewRoom(r.assignedRoom || '');
    setReassignReason('');
    setReassignOpen(true);
  };

  // Confirm reassign
  const confirmReassign = () => {
    if (!selected || !newRoom) {
      alert('Please select a new room.');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const updated = reservations.map<Reservation>(r =>
      r.id === selected.id
        ? {
            ...r,
            assignedRoom: newRoom,
            status: 'Assigned',
            assignDate: today,
            assignedBy: 'Auto-User',
            specialRequests: r.specialRequests + (reassignReason ? ` | Reassigned: ${reassignReason}` : '')
          }
        : r
    );
    setReservations(updated);
    setFiltered(updated);
    setReassignOpen(false);
    setDetailOpen(false);
  };

  // Manual assignment trigger
  const handleManualAssign = (e: FormEvent) => {
    e.preventDefault();
    if (selected) openReassign(selected);
  };

  // Auto-assign
  const runAutoAssign = (e: FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    let available = [...availableRooms];
    const updated = reservations.map<Reservation>(r => {
      if (r.status === 'Unassigned') {
        const idx = available.findIndex(a => a.type === r.roomType || qType === 'all');
        if (idx >= 0) {
          const room = available[idx].room;
          available.splice(idx, 1);
          return {
            ...r,
            assignedRoom: room,
            status: 'Assigned',
            assignDate: today,
            assignedBy: 'Auto-Assign'
          };
        }
      }
      return r;
    });
    setReservations(updated);
    setFiltered(updated);
    setAutoMessage('✅ Auto-assignment completed successfully!');
    setTimeout(() => setAutoMessage(''), 3000);
  };

  const closeAll = () => {
    setDetailOpen(false);
    setReassignOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles.container}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1>Assign Rooms</h1>
        <div className={styles.breadcrumb}>
          Home &gt; Room Assignment &gt; Assign Rooms
        </div>
      </div>

      {/* Quick stats */}
      <div className={styles.stats}>
        <div>Total: {total}</div>
        <div>Assigned: {assignedCount}</div>
        <div>Unassigned: {unassignedCount}</div>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className={styles.searchSection}>
        <h2>Search Reservations</h2>
        <div className={styles.row}>
          <input
            placeholder="Reservation ID"
            value={qId}
            onChange={e => setQId(e.target.value)}
            className={styles.input}
          />
          <input
            placeholder="Guest Name"
            value={qGuest}
            onChange={e => setQGuest(e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            value={qArrival}
            onChange={e => setQArrival(e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            value={qDeparture}
            onChange={e => setQDeparture(e.target.value)}
            className={styles.input}
          />
          <select
            value={qType}
            onChange={e => setQType(e.target.value as any)}
            className={styles.select}
          >
            <option value="all">All Types</option>
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
          </select>
          <select
            value={qStatus}
            onChange={e => setQStatus(e.target.value as any)}
            className={styles.select}
          >
            <option value="all">All Status</option>
            <option>Assigned</option>
            <option>Unassigned</option>
          </select>
          <select
            value={qChannel}
            onChange={e => setQChannel(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Channels</option>
            <option>Website</option>
            <option>Phone</option>
            <option>Walk-in</option>
          </select>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            Search
          </button>
        </div>
      </form>

      {/* Results table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Guest</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Room Type</th>
              <th>Payment</th>
              <th>Room#</th>
              <th>Status</th>
              <th>Channel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.guest}</td>
                <td>{r.arrival}</td>
                <td>{r.departure}</td>
                <td>{r.roomType}</td>
                <td>
                  <span className={`${styles.badge} ${styles[r.payment]}`}>
                    {r.payment}
                  </span>
                </td>
                <td>{r.assignedRoom || '—'}</td>
                <td>
                  <span className={`${styles.badge} ${styles[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td>{r.channel}</td>
                <td className={styles.actions}>
                  <button
                    onClick={() => openDetails(r)}
                    className={`${styles.btn} ${styles.btnInfo}`}
                  >
                    View
                  </button>
                  {r.status === 'Unassigned' ? (
                    <button
                      onClick={() => openReassign(r)}
                      className={`${styles.btn} ${styles.btnSuccess}`}
                    >
                      Assign
                    </button>
                  ) : (
                    <button
                      onClick={() => openReassign(r)}
                      className={`${styles.btn} ${styles.btnWarning}`}
                    >
                      Reassign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manual assign form */}
      {selected && selected.status === 'Unassigned' && (
        <form onSubmit={handleManualAssign} className={styles.manualSection}>
          <h2>Manual Assignment for {selected.id}</h2>
          <div className={styles.row}>
            <label>New Room#:</label>
            <select
              value={newRoom}
              onChange={e => setNewRoom(e.target.value)}
              className={styles.select}
            >
              <option value="">-- Select Room --</option>
              {availableRooms
                .filter(a => a.type === selected.roomType)
                .map(a => (
                  <option key={a.room} value={a.room}>
                    {a.room} (Floor {a.floor})
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.row}>
            <label>Notes:</label>
            <textarea
              value={reassignReason}
              onChange={e => setReassignReason(e.target.value)}
              className={styles.textarea}
            />
          </div>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            Confirm Manual Assign
          </button>
        </form>
      )}

      {/* Auto-assign form */}
      <form onSubmit={runAutoAssign} className={styles.autoSection}>
        <h2>Auto-Assign Rooms</h2>
        <div className={styles.row}>
          <label>Arrival From:</label>
          <input
            type="date"
            value={qArrival}
            onChange={e => setQArrival(e.target.value)}
            className={styles.input}
          />
          <label>To:</label>
          <input
            type="date"
            value={qDeparture}
            onChange={e => setQDeparture(e.target.value)}
            className={styles.input}
          />
          <label>Room Type:</label>
          <select
            value={qType}
            onChange={e => setQType(e.target.value as any)}
            className={styles.select}
          >
            <option value="all">All</option>
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
          </select>
          <button type="submit" className={`${styles.btn} ${styles.btnSecondary}`}>
            Run Auto-Assign
          </button>
        </div>
        {autoMessage && <div className={styles.success}>{autoMessage}</div>}
      </form>

      {/* Detail modal */}
      {detailOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeAll} className={styles.close}>&times;</span>
            <h2>Details – {selected.id}</h2>
            <p><strong>Guest:</strong> {selected.guest}</p>
            <p><strong>Arrival:</strong> {selected.arrival}</p>
            <p><strong>Departure:</strong> {selected.departure}</p>
            <p><strong>Room Type:</strong> {selected.roomType}</p>
            <p><strong>Payment:</strong> {selected.payment}</p>
            <p><strong>Assigned Room:</strong> {selected.assignedRoom || '—'}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Channel:</strong> {selected.channel}</p>
            {selected.assignDate && <p><strong>Assign Date:</strong> {selected.assignDate}</p>}
            {selected.assignedBy && <p><strong>Assigned By:</strong> {selected.assignedBy}</p>}
            {selected.specialRequests && <p><strong>Notes:</strong> {selected.specialRequests}</p>}
            <div className={styles.modalButtons}>
              <button
                onClick={() => { closeAll(); openReassign(selected); }}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Reassign
              </button>
              <button
                onClick={closeAll}
                className={`${styles.btn} ${styles.btnDanger}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualAutoAssign;
