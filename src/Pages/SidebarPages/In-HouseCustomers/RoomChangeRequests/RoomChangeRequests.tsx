// D:\operavip-ts\src\Pages\SidebarPages\In-HouseCustomers\RoomChangeRequests\RoomChangeRequests.tsx
import React, { useState, ChangeEvent } from 'react';
import styles from './RoomChangeRequests.module.css';

type RequestStatus = 'Pending' | 'Approved' | 'Declined';

interface RoomChangeRequest {
  requestId: number;
  guestName: string;
  currentRoom: string;
  currentRoomType: string;    // أضفنا هذا الحقل
  requestedRoom: string;
  status: RequestStatus;
  requestDate: string;        // YYYY-MM-DD
  guestNotes: string;
}

// بيانات وهمية مع currentRoomType
const dummyRequests: RoomChangeRequest[] = [
  {
    requestId: 3045,
    guestName: 'Omar Ali',
    currentRoom: '305',
    currentRoomType: 'Standard Room',
    requestedRoom: '410 (Suite)',
    status: 'Pending',
    requestDate: '2025-03-18',
    guestNotes: 'Need bigger space for family.',
  },
  {
    requestId: 3046,
    guestName: 'Sara Brown',
    currentRoom: '702',
    currentRoomType: 'Suite',
    requestedRoom: '603 (Deluxe)',
    status: 'Approved',
    requestDate: '2025-03-16',
    guestNotes: 'Prefer lower floor for easy access.',
  },
  {
    requestId: 3047,
    guestName: 'John Smith',
    currentRoom: '410',
    currentRoomType: 'Suite',
    requestedRoom: '512 (Suite)',
    status: 'Declined',
    requestDate: '2025-04-01',
    guestNotes: 'Allergies to carpeting.',
  },
  {
    requestId: 3048,
    guestName: 'Jane Doe',
    currentRoom: '118',
    currentRoomType: 'Standard Room',
    requestedRoom: '220 (Standard)',
    status: 'Pending',
    requestDate: '2025-04-03',
    guestNotes: 'Closer to elevator.',
  },
  {
    requestId: 3049,
    guestName: 'Ali Veli',
    currentRoom: '523',
    currentRoomType: 'Deluxe Room',
    requestedRoom: '305 (Deluxe)',
    status: 'Pending',
    requestDate: '2025-04-05',
    guestNotes: 'Want sea view room.',
  },
];

const RoomChangeRequests: React.FC = () => {
  const [query, setQuery] = useState('');
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [currentType, setCurrentType] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | ''>('');
  const [results, setResults] = useState<RoomChangeRequest[]>(dummyRequests);

  const [activeModal, setActiveModal] = useState<'details' | 'confirm' | null>(null);
  const [selected, setSelected] = useState<RoomChangeRequest | null>(null);
  const [decision, setDecision] = useState<RequestStatus>('Pending');
  const [staffNotes, setStaffNotes] = useState('');

  const searchRequests = () => {
    let filtered = dummyRequests.filter(r =>
      r.guestName.toLowerCase().includes(query.toLowerCase()) ||
      r.requestId.toString().includes(query) ||
      r.currentRoom.includes(query)
    );
    if (arrival) {
      filtered = filtered.filter(r => r.requestDate >= arrival);
    }
    if (departure) {
      filtered = filtered.filter(r => r.requestDate <= departure);
    }
    if (currentType) {
      filtered = filtered.filter(r => r.currentRoomType === currentType);
    }
    if (statusFilter) {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    setResults(filtered);
  };

  const viewRequestDetails = (req: RoomChangeRequest) => {
    setSelected(req);
    setActiveModal('details');
  };

  const openConfirmDecisionModal = (req: RoomChangeRequest, newStatus: RequestStatus) => {
    setSelected(req);
    setDecision(newStatus);
    setActiveModal('confirm');
  };

  const finalizeDecision = () => {
    alert(`Request #${selected?.requestId} has been ${decision}!`);
    setActiveModal(null);
    setSelected(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelected(null);
  };

  return (
    <div className={styles.mainContainer}>
      
      <h1 className={styles.pageTitle}>Room Change Requests</h1>
      <div className={styles.breadcrumb}>
        Home &gt; In-House Customers &gt; Room Change Requests
      </div>

      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search by Guest, ID or Room"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="date"
          value={arrival}
          onChange={e => setArrival(e.target.value)}
          className={styles.datePicker}
        />
        <input
          type="date"
          value={departure}
          onChange={e => setDeparture(e.target.value)}
          className={styles.datePicker}
        />
        <select
          value={currentType}
          onChange={e => setCurrentType(e.target.value)}
          className={styles.select}
        >
          <option value="">All Current Room Types</option>
          <option>Standard Room</option>
          <option>Deluxe Room</option>
          <option>Suite</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as RequestStatus)}
          className={styles.select}
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Declined</option>
        </select>
        <button onClick={searchRequests} className={styles.btnPrimary}>
          Search
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Guest Name</th>
            <th>Current Room</th>
            <th>Requested Room</th>
            <th>Status</th>
            <th>Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.requestId}>
              <td>{r.requestId}</td>
              <td>{r.guestName}</td>
              <td>{r.currentRoom}</td>
              <td>{r.requestedRoom}</td>
              <td>
                <span className={`${styles.status} ${styles[r.status]}`}>{r.status}</span>
              </td>
              <td>{r.requestDate}</td>
              <td>
                <button onClick={() => viewRequestDetails(r)} className={styles.btnDetail}>
                  View
                </button>
                {r.status === 'Pending' && (
                  <>
                    <button onClick={() => openConfirmDecisionModal(r, 'Approved')} className={styles.btnApprove}>
                      Approve
                    </button>
                    <button onClick={() => openConfirmDecisionModal(r, 'Declined')} className={styles.btnDecline}>
                      Decline
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        Showing {results.length} of {dummyRequests.length}
      </div>

      {activeModal === 'details' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Room Change Request – {selected.guestName} (#{selected.requestId})</h2>
            <p><strong>Current Room:</strong> {selected.currentRoom}</p>
            <p><strong>Requested Room:</strong> {selected.requestedRoom}</p>
            <p><strong>Request Date:</strong> {selected.requestDate}</p>
            <p><strong>Guest Notes:</strong> {selected.guestNotes}</p>
            <label>Staff Notes:</label>
            <textarea
              className={styles.textarea}
              value={staffNotes}
              onChange={e => setStaffNotes(e.target.value)}
              placeholder="Enter staff notes..."
            />
            <div className={styles.modalActions}>
              <button onClick={() => openConfirmDecisionModal(selected, 'Approved')} className={styles.btnApprove}>
                Approve
              </button>
              <button onClick={() => openConfirmDecisionModal(selected, 'Declined')} className={styles.btnDecline}>
                Decline
              </button>
              <button onClick={closeModal} className={styles.btnCancel}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'confirm' && selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>Confirm Decision – {selected.guestName} (#{selected.requestId})</h2>
            <p><strong>Decision:</strong> {decision}</p>
            <label>Notes (Optional):</label>
            <textarea
              className={styles.textarea}
              value={staffNotes}
              onChange={e => setStaffNotes(e.target.value)}
              placeholder="Enter notes..."
            />
            <button onClick={finalizeDecision} className={styles.btnPrimary}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomChangeRequests;
