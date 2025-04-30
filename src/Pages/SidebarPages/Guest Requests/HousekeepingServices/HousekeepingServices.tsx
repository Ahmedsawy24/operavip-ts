import React, { useState, FormEvent } from 'react';
import styles from './HousekeepingServices.module.css';

type ServiceType = 'Housekeeping' | 'Laundry' | 'Special Request';
type Status = 'Pending' | 'In Progress' | 'Completed';

interface Request {
  id: string;
  room: string;
  guest: string;
  service: ServiceType;
  time: string;       // e.g. "08:30 AM"
  status: Status;
  details: string;
  priority?: 'Low' | 'Medium' | 'High';
  staff?: string;
  completionTime?: string;
}

const dummyRequests: Request[] = [
  { id: 'HK-101', room: '101', guest: 'Ahmed Yassin', service: 'Housekeeping', time: '08:30 AM', status: 'Pending',   details: 'Room cleaning, towel replacement, extra pillows.', priority: 'High' },
  { id: 'LD-205', room: '205', guest: 'Sarah Johnson', service: 'Laundry',       time: '09:45 AM', status: 'In Progress',   details: 'Wash & fold 3 garments.',                          staff: 'Alice' },
  { id: 'SP-312', room: '312', guest: 'Omar Hussein',  service: 'Special Request', time: '10:20 AM', status: 'Completed',    details: 'Arrange airport pickup.',                         staff: 'Bob', completionTime: '11:00 AM' },
  { id: 'HK-108', room: '108', guest: 'Leen Murtada',  service: 'Housekeeping', time: '11:15 AM', status: 'Pending',     details: 'Change bed linen, vacuum floor.',                 priority: 'Medium' },
  { id: 'SP-450', room: '450', guest: 'Ali Abdullah',  service: 'Special Request', time: '12:00 PM', status: 'Pending',     details: 'Order extra towels and toiletries.',              priority: 'Low' },
];

const HousekeepingServices: React.FC = () => {
  // filters
  const [roomFilter, setRoomFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState<'All' | ServiceType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');

  // state
  const [filtered, setFiltered] = useState<Request[]>(dummyRequests);

  // modals
  const [viewOpen, setViewOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [selected, setSelected] = useState<Request | null>(null);

  // update-status form
  const [updStatus, setUpdStatus] = useState<Status>('Pending');
  const [updStaff, setUpdStaff] = useState('');
  const [updNotes, setUpdNotes] = useState('');
  const [updTime, setUpdTime] = useState('');

  // new-request form
  const [newRoom, setNewRoom] = useState('');
  const [newGuest, setNewGuest] = useState('');
  const [newService, setNewService] = useState<ServiceType>('Housekeeping');
  const [newDetails, setNewDetails] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  // export form
  const [exportFormat, setExportFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [exportFrom, setExportFrom] = useState('');
  const [exportTo, setExportTo] = useState('');
  const [exportNotes, setExportNotes] = useState(true);

  // apply/reset filters
  const applyFilters = () => {
    let res = dummyRequests;
    if (roomFilter) res = res.filter(r => r.room.includes(roomFilter));
    if (serviceFilter !== 'All') res = res.filter(r => r.service === serviceFilter);
    if (statusFilter !== 'All') res = res.filter(r => r.status === statusFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setRoomFilter('');
    setServiceFilter('All');
    setStatusFilter('All');
    setFiltered(dummyRequests);
  };

  // open modals
  const openView = (r: Request) => { setSelected(r); setViewOpen(true); };
  const openStatus = (r: Request) => {
    setSelected(r);
    setUpdStatus(r.status);
    setUpdStaff(r.staff || '');
    setUpdNotes('');
    setUpdTime(r.completionTime || '');
    setStatusOpen(true);
  };
  const openNew = () => setNewOpen(true);
  const openExport = () => setExportOpen(true);

  // close modals
  const closeAll = () => {
    setViewOpen(false);
    setStatusOpen(false);
    setNewOpen(false);
    setExportOpen(false);
    setSelected(null);
  };

  // handle status update
  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!updStaff || (updStatus === 'Completed' && !updTime)) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    alert('✅ Request status updated successfully!');
    closeAll();
    applyFilters();
  };

  // handle new request
  const handleNew = (e: FormEvent) => {
    e.preventDefault();
    if (!newRoom || !newGuest || !newDetails) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ New request submitted successfully!');
    closeAll();
    applyFilters();
  };

  // handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    if (!exportFrom || !exportTo) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    alert('✅ Requests exported successfully!');
    closeAll();
  };

  // counts
  const total = dummyRequests.length;
  const hkCount = dummyRequests.filter(r => r.service === 'Housekeeping').length;
  const ldCount = dummyRequests.filter(r => r.service === 'Laundry').length;
  const spCount = dummyRequests.filter(r => r.service === 'Special Request').length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Housekeeping and Special Services</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Guest Requests &gt; Housekeeping and Special Services
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🔍 Filter Requests</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., 304"
            value={roomFilter}
            onChange={e => setRoomFilter(e.target.value)}
          />
          <select
            className={styles.input}
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Housekeeping</option>
            <option>Laundry</option>
            <option>Special Request</option>
          </select>
          <select
            className={styles.input}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Apply Filters
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
        <button className={`${styles.btn} ${styles.newBtn}`} onClick={openNew}>
          🛎️ New Special Request
        </button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Requests
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>📊 Today's Requests Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Requests</div>
            <div className={styles.cardValue}>{total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Housekeeping</div>
            <div className={styles.cardValue}>{hkCount}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Laundry</div>
            <div className={styles.cardValue}>{ldCount}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Special Requests</div>
            <div className={styles.cardValue}>{spCount}</div>
          </div>
        </div>
      </section>

      {/* Requests Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>📑 Detailed Service Requests</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Room</th>
                <th>Guest Name</th>
                <th>Service Type</th>
                <th>Requested Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.room}</td>
                  <td>{r.guest}</td>
                  <td>{r.service}</td>
                  <td>{r.time}</td>
                  <td>
                    <span
                      className={
                        r.status === 'Pending'
                          ? styles.badgeOrange
                          : r.status === 'In Progress'
                          ? styles.badgeBlue
                          : styles.badgeGreen
                      }
                    >
                      {r.status === 'Pending'
                        ? '🟠 Pending'
                        : r.status === 'In Progress'
                        ? '🔵 In Progress'
                        : '🟢 Completed'}
                    </span>
                  </td>
                  <td>
                    <button className={`${styles.btn} ${styles.viewBtn}`} onClick={() => openView(r)}>
                      View
                    </button>
                    {r.status !== 'Completed' && (
                      <button
                        className={`${styles.btn} ${styles.updateBtn}`}
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

      {/* View Modal */}
      {viewOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📝 Request Details – {selected.id}</h2>
            <p><strong>Room Number:</strong> {selected.room}</p>
            <p><strong>Guest Name:</strong> {selected.guest}</p>
            <p><strong>Service Type:</strong> {selected.service}</p>
            <p><strong>Requested At:</strong> {selected.time}</p>
            <p><strong>Details:</strong> {selected.details}</p>
            <p><strong>Assigned Staff:</strong> {selected.staff || 'Pending Assignment'}</p>
            <p><strong>Priority:</strong> {selected.priority || 'Normal'}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
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
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>🔄 Update Request Status – {selected.id}</h2>
            <form className={styles.form} onSubmit={handleUpdate}>
              <div className={styles.formRow}>
                <label>Current Status</label>
                <select
                  className={styles.input}
                  value={updStatus}
                  onChange={e => setUpdStatus(e.target.value as Status)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Assigned Staff</label>
                <input
                  type="text"
                  className={styles.input}
                  value={updStaff}
                  onChange={e => setUpdStaff(e.target.value)}
                />
              </div>
              {updStatus === 'Completed' && (
                <div className={styles.formRow}>
                  <label>Completion Time</label>
                  <input
                    type="time"
                    className={styles.input}
                    value={updTime}
                    onChange={e => setUpdTime(e.target.value)}
                  />
                </div>
              )}
              <div className={styles.formRow}>
                <label>Notes</label>
                <textarea
                  className={styles.input}
                  value={updNotes}
                  onChange={e => setUpdNotes(e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.updateBtn}`}>
                  Update
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Special Request Modal */}
      {newOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>🛎️ New Special Service Request</h2>
            <form className={styles.form} onSubmit={handleNew}>
              <div className={styles.formRow}>
                <label>Room Number</label>
                <input
                  type="text"
                  className={styles.input}
                  value={newRoom}
                  onChange={e => setNewRoom(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Guest Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={newGuest}
                  onChange={e => setNewGuest(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Service Type</label>
                <select
                  className={styles.input}
                  value={newService}
                  onChange={e => setNewService(e.target.value as ServiceType)}
                >
                  <option>Housekeeping</option>
                  <option>Laundry</option>
                  <option>Special Request</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Request Detail</label>
                <textarea
                  className={styles.input}
                  value={newDetails}
                  onChange={e => setNewDetails(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>Priority</label>
                <select
                  className={styles.input}
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as any)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.newBtn}`}>
                  Submit Request
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Requests</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select
                  className={styles.input}
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value as any)}
                >
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>From Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={exportFrom}
                  onChange={e => setExportFrom(e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <label>To Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={exportTo}
                  onChange={e => setExportTo(e.target.value)}
                />
              </div>
              <div className={styles.formRowCheckbox}>
                <input
                  type="checkbox"
                  checked={exportNotes}
                  onChange={e => setExportNotes(e.target.checked)}
                />
                <label>Include detailed notes</label>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.exportBtn}`}>
                  Export
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
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

export default HousekeepingServices;
