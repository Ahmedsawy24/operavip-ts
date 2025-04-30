// src/Pages/SidebarPages/RoomAssignment/CheckHousekeepingStatus/CheckHousekeepingStatus.tsx
import React, { useState, FormEvent } from 'react';
import styles from './CheckHousekeepingStatus.module.css';

type RoomType = 'Single' | 'Double' | 'Suite';
type HKStatus = 'Clean' | 'Dirty' | 'Inspected' | 'InProgress' | 'OutOfService';

interface RoomRecord {
  roomNumber: string;
  floor: string;
  roomType: RoomType;
  status: HKStatus;
  lastUpdated: string;   // YYYY-MM-DD
  updatedBy: string;
  notes: string;
}

const dummyData: RoomRecord[] = [
  { roomNumber: '101', floor: '1', roomType: 'Single',     status: 'Clean',        lastUpdated: '2025-06-01', updatedBy: 'Ahmad Ali',   notes: 'All amenities replenished. Room is ready.' },
  { roomNumber: '202', floor: '2', roomType: 'Double',     status: 'Dirty',        lastUpdated: '2025-06-02', updatedBy: 'Sarah Noor',  notes: 'Needs urgent cleaning.' },
  { roomNumber: '305', floor: '3', roomType: 'Suite',      status: 'Inspected',    lastUpdated: '2025-06-03', updatedBy: 'John Doe',     notes: 'Inspection passed. Ready.' },
  { roomNumber: '406', floor: '4', roomType: 'Double',     status: 'InProgress',   lastUpdated: '2025-06-04', updatedBy: 'Mona Saeed',   notes: 'Housekeeping in progress.' },
  { roomNumber: '509', floor: '5', roomType: 'Single',     status: 'OutOfService', lastUpdated: '2025-06-05', updatedBy: 'Admin User',  notes: 'Under maintenance.' },
  { roomNumber: '612', floor: '6', roomType: 'Suite',      status: 'Clean',        lastUpdated: '2025-06-06', updatedBy: 'Rita Brown',   notes: 'VIP prep completed.' },
];

const statusDisplay: Record<HKStatus,string> = {
  Clean:         'Clean ✅',
  Dirty:         'Dirty ❌',
  Inspected:     'Inspected 🔎',
  InProgress:    'In Progress 🕒',
  OutOfService:  'Out of Service ⚠️',
};

const CheckHousekeepingStatus: React.FC = () => {
  const [records, setRecords]               = useState<RoomRecord[]>(dummyData);
  const [filtered, setFiltered]             = useState<RoomRecord[]>(dummyData);

  const [fRoom, setFRoom]                   = useState('');
  const [fFloor, setFFloor]                 = useState<'all'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'>('all');
  const [fType, setFType]                   = useState<'all'|RoomType>('all');
  const [fStatus, setFStatus]               = useState<'all'|HKStatus>('all');

  const [detailOpen, setDetailOpen]         = useState(false);
  const [changeOpen, setChangeOpen]         = useState(false);
  const [selected, setSelected]             = useState<RoomRecord|null>(null);

  const [newStatus, setNewStatus]           = useState<HKStatus>('Clean');
  const [changeNotes, setChangeNotes]       = useState('');

  // filter handler
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setFiltered(records.filter(r =>
      (fRoom === ''    || r.roomNumber.includes(fRoom)) &&
      (fFloor === 'all'|| r.floor === fFloor) &&
      (fType  === 'all'|| r.roomType === fType) &&
      (fStatus==='all'|| r.status === fStatus)
    ));
  };

  // modals
  const openDetails = (r: RoomRecord) => {
    setSelected(r);
    setDetailOpen(true);
  };
  const openChange  = (r: RoomRecord) => {
    setSelected(r);
    setNewStatus(r.status);
    setChangeNotes('');
    setChangeOpen(true);
  };
  const closeAll    = () => {
    setDetailOpen(false);
    setChangeOpen(false);
    setSelected(null);
  };

  // confirm change
  const confirmChange = () => {
    if (!selected) return;
    const today = new Date().toISOString().slice(0,10);
    const updated = records.map(r =>
      r.roomNumber === selected.roomNumber
        ? { ...r,
            status: newStatus,
            lastUpdated: today,
            updatedBy: 'System User',
            notes: changeNotes || r.notes
          }
        : r
    );
    setRecords(updated);
    setFiltered(updated);
    closeAll();
    alert('✅ Housekeeping status updated.');
  };

  return (
    <div className={styles.container}>

      {/* page header */}
      <div className={styles.pageHeader}>
        <h1>Check Housekeeping Status</h1>
        <div className={styles.breadcrumb}>
          Home &gt; Room Assignment &gt; Check Housekeeping Status
        </div>
      </div>

      {/* search */}
      <section className={styles.searchSection}>
        <h2>🔎 Search Room Status</h2>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchFields}>
            <div className={styles.fieldGroup}>
              <label>Room Number</label>
              <input
                className={styles.formInput}
                value={fRoom}
                onChange={e=>setFRoom(e.target.value)}
                placeholder="Enter Room Number"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Floor</label>
              <select
                className={styles.formInput}
                value={fFloor}
                onChange={e=>setFFloor(e.target.value as any)}
              >
                <option value="all">All Floors</option>
                {['1','2','3','4','5','6','7','8'].map(n=>(
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className={styles.fieldGroup}>
              <label>Room Type</label>
              <select
                className={styles.formInput}
                value={fType}
                onChange={e=>setFType(e.target.value as any)}
              >
                <option value="all">All Types</option>
                <option>Single</option><option>Double</option><option>Suite</option>
              </select>
            </div>
            <div className={styles.fieldGroup}>
              <label>Housekeeping Status</label>
              <select
                className={styles.formInput}
                value={fStatus}
                onChange={e=>setFStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="Clean">Clean</option>
                <option value="Dirty">Dirty</option>
                <option value="Inspected">Inspected</option>
                <option value="InProgress">In Progress</option>
                <option value="OutOfService">Out of Service</option>
              </select>
            </div>
          </div>
          <div className={styles.searchButtonRow}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
              🔍 Search Rooms
            </button>
          </div>
        </form>
      </section>

      {/* results table */}
      <section className={styles.resultsSection}>
        <h2>Room Housekeeping Status Results</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Floor</th>
                <th>Room Type</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Updated By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.roomNumber}>
                  <td>{r.roomNumber}</td>
                  <td>{r.floor}</td>
                  <td>{r.roomType}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[r.status]}`}>
                      {statusDisplay[r.status]}
                    </span>
                  </td>
                  <td>{r.lastUpdated}</td>
                  <td>{r.updatedBy}</td>
                  <td className={styles.actions}>
                    <button
                      onClick={()=>openDetails(r)}
                      className={`${styles.btn} ${styles.btnInfo}`}
                    >
                      View
                    </button>
                    <button
                      onClick={()=>openChange(r)}
                      className={`${styles.btn} ${styles.btnWarning}`}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* detail modal */}
      {detailOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeAll} className={styles.close}>&times;</span>
            <h2>Room Status Details – {selected.roomNumber}</h2>
            <p><strong>Floor:</strong> {selected.floor}</p>
            <p><strong>Type:</strong> {selected.roomType}</p>
            <p><strong>Status:</strong> {statusDisplay[selected.status]}</p>
            <p><strong>Last Updated:</strong> {selected.lastUpdated}</p>
            <p><strong>Updated By:</strong> {selected.updatedBy}</p>
            <p><strong>Notes:</strong> {selected.notes}</p>
            <div className={styles.modalButtons}>
              <button
                onClick={()=>{ closeAll(); openChange(selected); }}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Change Status
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

      {/* change-status modal */}
      {changeOpen && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeAll} className={styles.close}>&times;</span>
            <h2>Change Status – Room {selected.roomNumber}</h2>
            <p><strong>Current:</strong> {statusDisplay[selected.status]}</p>
            <div className={styles.formRow}>
              <label>New Status</label>
              <select
                value={newStatus}
                onChange={e=>setNewStatus(e.target.value as HKStatus)}
                className={styles.formInput}
              >
                {Object.keys(statusDisplay).map(s=>(
                  <option key={s} value={s}>{statusDisplay[s as HKStatus]}</option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label>Notes (optional)</label>
              <textarea
                value={changeNotes}
                onChange={e=>setChangeNotes(e.target.value)}
                className={styles.formInput}
                placeholder="Enter any notes..."
              />
            </div>
            <div className={styles.modalButtons}>
              <button
                onClick={confirmChange}
                className={`${styles.btn} ${styles.btnSuccess}`}
              >
                Confirm
              </button>
              <button
                onClick={closeAll}
                className={`${styles.btn} ${styles.btnDanger}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckHousekeepingStatus;
