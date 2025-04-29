import React, { useState, ChangeEvent } from 'react';
import styles from './TrackGuestRequests.module.css';

type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
type RequestType = 'Housekeeping' | 'Food & Beverage' | 'Transportation' | 'Special Amenities';

interface GuestRequest {
  requestId: number;
  guestName: string;
  roomNumber: string;
  requestType: RequestType;
  status: RequestStatus;
  requestDate: string;   // YYYY-MM-DD
  description: string;
  staffNotes: string;
}

// بيانات وهمية إضافية
const dummyRequests: GuestRequest[] = [
  { requestId: 10045, guestName: 'Ahmed Saeed', roomNumber: '305', requestType: 'Housekeeping',    status: 'Pending',     requestDate: '2025-03-18', description: 'Need extra towels and cleaning.',           staffNotes: '' },
  { requestId: 10046, guestName: 'Sarah Jones', roomNumber: '702', requestType: 'Food & Beverage', status: 'In Progress', requestDate: '2025-03-17', description: 'Breakfast request at 8 AM daily.',           staffNotes: '' },
  { requestId: 10047, guestName: 'John Doe',     roomNumber: '412', requestType: 'Transportation', status: 'Completed',   requestDate: '2025-03-16', description: 'Airport drop-off on departure day.',         staffNotes: 'Driver notified.' },
  { requestId: 10048, guestName: 'Lisa Wong',    roomNumber: '101', requestType: 'Special Amenities', status: 'Cancelled', requestDate: '2025-04-01', description: 'Flower arrangement in room.',               staffNotes: 'Guest cancelled.' },
  { requestId: 10049, guestName: 'Mark Lee',     roomNumber: '305', requestType: 'Housekeeping',    status: 'Completed',   requestDate: '2025-04-02', description: 'Deep cleaning and minibar restock.',         staffNotes: 'Completed at 10 AM.' },
];

const TrackGuestRequests: React.FC = () => {
  // حالة البيانات والفلترة
  const [allRequests, setAllRequests] = useState<GuestRequest[]>(dummyRequests);
  const [filtered, setFiltered] = useState<GuestRequest[]>(dummyRequests);

  // فلترز
  const [query, setQuery] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | ''>('');
  const [typeFilter, setTypeFilter] = useState<RequestType | ''>('');

  // مودالات
  const [activeModal, setActiveModal] = useState<'details' | 'update' | null>(null);
  const [selected, setSelected] = useState<GuestRequest | null>(null);
  const [updateStatus, setUpdateStatus] = useState<RequestStatus>('Pending');
  const [updateNotes, setUpdateNotes] = useState('');

  // دالة البحث والتصفية
  const searchRequests = () => {
    let res = allRequests.filter(r =>
      r.guestName.toLowerCase().includes(query.toLowerCase()) ||
      r.roomNumber.includes(query) ||
      r.requestType.toLowerCase().includes(query.toLowerCase())
    );
    if (roomFilter) res = res.filter(r => r.roomNumber === roomFilter);
    if (dateFilter) res = res.filter(r => r.requestDate === dateFilter);
    if (statusFilter) res = res.filter(r => r.status === statusFilter);
    if (typeFilter) res = res.filter(r => r.requestType === typeFilter);
    setFiltered(res);
  };

  // عرض التفاصيل
  const viewRequestDetails = (req: GuestRequest) => {
    setSelected(req);
    setActiveModal('details');
  };

  // فتح مودال التحديث
  const openUpdateStatusModal = (req: GuestRequest) => {
    setSelected(req);
    setUpdateStatus(req.status);
    setUpdateNotes(req.staffNotes);
    setActiveModal('update');
  };

  // تأكيد التحديث
  const confirmStatusUpdate = () => {
    if (!selected) return;
    const updated = allRequests.map(r =>
      r.requestId === selected.requestId
        ? { ...r, status: updateStatus, staffNotes: updateNotes }
        : r
    );
    setAllRequests(updated);
    // أعد تطبيق الفلترة حتى يظهر التحديث فوراً
    setFiltered(updated.filter(r => filtered.some(f => f.requestId === r.requestId)));
    setActiveModal(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelected(null);
  };

  return (
    <div className={styles.mainContainer}>

      
      <h1 className={styles.pageTitle}>
        Track Guest Requests &amp; Special Services
      </h1>

      <div className={styles.breadcrumb}>
        Home &gt; In-House Customers &gt; Track Guest Requests &amp; Special Services
      </div>

      {/* Filters */}
      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search by Guest, Room, Type"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={roomFilter}
          onChange={e => setRoomFilter(e.target.value)}
          className={styles.selectRoom}
        >
          <option value="">All Rooms</option>
          <option>101</option><option>305</option><option>412</option><option>702</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className={styles.datePicker}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as RequestStatus)}
          className={styles.selectStatus}
        >
          <option value="">All Status</option>
          <option>Pending</option><option>In Progress</option><option>Completed</option><option>Cancelled</option>
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as RequestType)}
          className={styles.selectType}
        >
          <option value="">All Types</option>
          <option>Housekeeping</option><option>Food & Beverage</option><option>Transportation</option><option>Special Amenities</option>
        </select>
        <button onClick={searchRequests} className={styles.btnPrimary}>
          Search Requests
        </button>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th><th>Guest</th><th>Room</th><th>Type</th><th>Status</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.requestId}>
              <td>{r.requestId}</td>
              <td>{r.guestName}</td>
              <td>{r.roomNumber}</td>
              <td>{r.requestType}</td>
              <td>
                <span className={`${styles.status} ${styles[r.status.replace(' ', '')]}`}>
                  {r.status}
                </span>
              </td>
              <td>{r.requestDate}</td>
              <td>
                <button onClick={() => viewRequestDetails(r)} className={styles.btnDetail}>
                  View
                </button>
                <button onClick={() => openUpdateStatusModal(r)} className={styles.btnUpdate}>
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination (ثابتة كمثال) */}
      <div className={styles.pagination}>
        Showing {filtered.length} of {allRequests.length}
      </div>

      {/* Details Modal */}
      {activeModal === 'details' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>
              Guest Request Details – {selected.guestName} (#{selected.requestId})
            </h2>
            <p><strong>Room #:</strong> {selected.roomNumber}</p>
            <p><strong>Type:</strong> {selected.requestType}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Date:</strong> {selected.requestDate}</p>
            <label>Description:</label>
            <p>{selected.description}</p>
            <label>Staff Notes:</label>
            <textarea
              className={styles.textarea}
              value={selected.staffNotes}
              readOnly
            />
            <button onClick={closeModal} className={styles.btnCancel}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {activeModal === 'update' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>
              Update Status – {selected.guestName} (#{selected.requestId})
            </h2>
            <p><strong>Current:</strong> {selected.status}</p>
            <label>New Status:</label>
            <select
              value={updateStatus}
              onChange={e => setUpdateStatus(e.target.value as RequestStatus)}
              className={styles.selectStatus}
            >
              <option>Pending</option><option>In Progress</option><option>Completed</option><option>Cancelled</option>
            </select>
            <label>Notes:</label>
            <textarea
              className={styles.textarea}
              value={updateNotes}
              onChange={e => setUpdateNotes(e.target.value)}
              placeholder="Enter update notes..."
            />
            <div className={styles.modalActions}>
              <button onClick={confirmStatusUpdate} className={styles.btnPrimary}>
                Confirm Update
              </button>
              <button onClick={closeModal} className={styles.btnCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrackGuestRequests;
