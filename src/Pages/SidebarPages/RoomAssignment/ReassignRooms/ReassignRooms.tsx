import React, { useState, FormEvent } from 'react';
import styles from './ReassignRooms.module.css';

interface Assignment {
  id: string;
  guestName: string;
  currentRoom: string;
  floor: number;
  roomType: 'Single' | 'Double' | 'Suite';
  arrivalDate: string;   // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  assignedBy: string;
  specialRequests: string;
}

const dummyAssignments: Assignment[] = [
  {
    id: 'RES-23001',
    guestName: 'James Smith',
    currentRoom: '201',
    floor: 2,
    roomType: 'Single',
    arrivalDate: '2025-06-05',
    departureDate: '2025-06-10',
    assignedBy: 'Maria Lewis',
    specialRequests: 'Near elevator, Non-smoking',
  },
  {
    id: 'RES-23002',
    guestName: 'Olivia Brown',
    currentRoom: '404',
    floor: 4,
    roomType: 'Suite',
    arrivalDate: '2025-06-08',
    departureDate: '2025-06-12',
    assignedBy: 'John Adams',
    specialRequests: 'Corner room with view',
  },
  {
    id: 'RES-23003',
    guestName: 'William Johnson',
    currentRoom: '301',
    floor: 3,
    roomType: 'Double',
    arrivalDate: '2025-06-07',
    departureDate: '2025-06-11',
    assignedBy: 'Ahmed Omar',
    specialRequests: 'Extra towels requested',
  },
  {
    id: 'RES-23004',
    guestName: 'Lily Chen',
    currentRoom: '102',
    floor: 1,
    roomType: 'Single',
    arrivalDate: '2025-06-09',
    departureDate: '2025-06-14',
    assignedBy: 'Sara Ibrahim',
    specialRequests: 'High floor, Early check-in',
  }
];

const ReassignRooms: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);
  const [filtered, setFiltered] = useState(dummyAssignments);

  // search filters
  const [qId, setQId] = useState('');
  const [qGuest, setQGuest] = useState('');
  const [qRoom, setQRoom] = useState('');
  const [qType, setQType] = useState<'all' | Assignment['roomType']>('all');
  const [qFloor, setQFloor] = useState<'all' | number>('all');

  // modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);
  const [selected, setSelected] = useState<Assignment | null>(null);

  // reassign fields
  const [newRoom, setNewRoom] = useState('');
  const [reassignReason, setReassignReason] = useState('');

  // search handler
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const res = assignments.filter(a =>
      (!qId || a.id.includes(qId)) &&
      (!qGuest || a.guestName.toLowerCase().includes(qGuest.toLowerCase())) &&
      (!qRoom || a.currentRoom === qRoom) &&
      (qType === 'all' || a.roomType === qType) &&
      (qFloor === 'all' || a.floor === qFloor)
    );
    setFiltered(res);
  };

  // open detail modal
  const openDetails = (a: Assignment) => {
    setSelected(a);
    setDetailOpen(true);
  };

  // open reassign modal
  const openReassign = (a: Assignment) => {
    setSelected(a);
    setNewRoom('');
    setReassignReason('');
    setReassignOpen(true);
  };

  // confirm reassign
  const confirmReassign = () => {
    if (!selected) return;
    if (!newRoom.trim()) {
      alert('⚠️ Please select a new room number.');
      return;
    }
    if (!reassignReason.trim()) {
      alert('⚠️ Please enter a reason for reassignment.');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const updated = assignments.map(a =>
      a.id === selected.id
        ? {
            ...a,
            currentRoom: newRoom,
            assignedBy: 'Auto-Reassign',
            specialRequests: a.specialRequests + ` | Reassign: ${reassignReason}`,
            arrivalDate: a.arrivalDate, // unchanged
            departureDate: a.departureDate,
          }
        : a
    );
    setAssignments(updated);
    setFiltered(updated);
    setReassignOpen(false);
    alert('✅ Room reassigned successfully!');
  };

  const closeAll = () => {
    setDetailOpen(false);
    setReassignOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb & Title */}
      <div className={styles.header}>
        <h1 className={styles.title}>Reassign Rooms</h1>
        <p className={styles.breadcrumb}>Home &gt; Room Assignment &gt; Reassign Rooms</p>
      </div>

      {/* Search */}
      <form className={styles.searchSection} onSubmit={handleSearch}>
        <h2>🔎 Search Assigned Rooms</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Reservation ID"
            value={qId}
            onChange={e => setQId(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Guest Name"
            value={qGuest}
            onChange={e => setQGuest(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Current Room#"
            value={qRoom}
            onChange={e => setQRoom(e.target.value)}
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
            value={qFloor}
            onChange={e => setQFloor(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className={styles.select}
          >
            <option value="all">All Floors</option>
            {[1,2,3,4,5,6,7,8].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnSearch}`}>
          🔍 Search
        </button>
      </form>

      {/* Results Table */}
      <div className={styles.resultsSection}>
        <h2>Assigned Rooms Results</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest</th>
                <th>Room#</th>
                <th>Floor</th>
                <th>Type</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Assigned By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.guestName}</td>
                  <td>{a.currentRoom}</td>
                  <td>{a.floor}</td>
                  <td>{a.roomType}</td>
                  <td>{a.arrivalDate}</td>
                  <td>{a.departureDate}</td>
                  <td>{a.assignedBy}</td>
                  <td className={styles.actions}>
                    <button onClick={() => openDetails(a)} className={`${styles.btn} ${styles.btnView}`}>
                      View
                    </button>
                    <button onClick={() => openReassign(a)} className={`${styles.btn} ${styles.btnReassign}`}>
                      Reassign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeAll} className={styles.close}>&times;</span>
            <h2>Assigned Room Details – {selected.id}</h2>
            <p><strong>Guest:</strong> {selected.guestName}</p>
            <p><strong>Current Room:</strong> {selected.currentRoom} ({selected.roomType})</p>
            <p><strong>Floor:</strong> {selected.floor}</p>
            <p><strong>Arrival:</strong> {selected.arrivalDate}</p>
            <p><strong>Departure:</strong> {selected.departureDate}</p>
            <p><strong>Assigned By:</strong> {selected.assignedBy}</p>
            <p><strong>Notes:</strong> {selected.specialRequests}</p>
            <div className={styles.modalButtons}>
              <button onClick={() => { closeAll(); openReassign(selected); }} className={`${styles.btn} ${styles.btnReassign}`}>
                Reassign
              </button>
              <button onClick={closeAll} className={`${styles.btn} ${styles.btnCancel}`}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {reassignOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeAll} className={styles.close}>&times;</span>
            <h2>Reassign Room – {selected.id}</h2>
            <p><strong>Guest:</strong> {selected.guestName}</p>
            <p><strong>Current Room:</strong> {selected.currentRoom} ({selected.roomType})</p>
            <div className={styles.formRow}>
              <label>New Room#:</label>
              <input
                value={newRoom}
                onChange={e => setNewRoom(e.target.value)}
                className={styles.input}
                placeholder="e.g. 202"
              />
            </div>
            <div className={styles.formRow}>
              <label>Reason:</label>
              <textarea
                value={reassignReason}
                onChange={e => setReassignReason(e.target.value)}
                className={styles.textarea}
                placeholder="Enter reason for reassignment"
              />
            </div>
            <div className={styles.modalButtons}>
              <button onClick={confirmReassign} className={`${styles.btn} ${styles.btnConfirm}`}>
                Confirm
              </button>
              <button onClick={closeAll} className={`${styles.btn} ${styles.btnCancel}`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReassignRooms;
