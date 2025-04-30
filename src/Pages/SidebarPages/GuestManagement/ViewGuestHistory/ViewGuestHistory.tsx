import React, { useState, FormEvent } from 'react';
import styles from './ViewGuestHistory.module.css';

interface GuestRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  vip: 'VIP' | 'Regular';
  lastVisit: string;      // YYYY-MM-DD
  totalVisits: number;
  totalSpend: number;
  visitsHistory: Visit[];
}

interface Visit {
  reservationId: string;
  arrival: string;
  departure: string;
  roomType: 'Single' | 'Double' | 'Suite';
  roomNumber: string;
  bill: number;
  notes: string;
}

// dummy data
const dummyGuests: GuestRecord[] = [
  {
    id: 'GST-1001',
    name: 'Emily Clark',
    email: 'emily@example.com',
    phone: '+1-202-555-0150',
    nationality: 'USA',
    vip: 'VIP',
    lastVisit: '2025-05-25',
    totalVisits: 12,
    totalSpend: 4500,
    visitsHistory: [
      { reservationId: 'RES-5412', arrival: '2025-05-20', departure: '2025-05-25', roomType: 'Suite', roomNumber: '401', bill: 1200, notes: 'Requested extra towels' },
      { reservationId: 'RES-5201', arrival: '2025-02-15', departure: '2025-02-20', roomType: 'Double', roomNumber: '305', bill: 900, notes: 'Preferred sea view' },
      { reservationId: 'RES-5010', arrival: '2024-12-10', departure: '2024-12-15', roomType: 'Single', roomNumber: '101', bill: 600, notes: 'Early check-in' },
    ]
  },
  {
    id: 'GST-1002',
    name: 'Ali Ahmad',
    email: 'ali.ahmad@example.ae',
    phone: '+971-50-1234567',
    nationality: 'UAE',
    vip: 'Regular',
    lastVisit: '2025-06-02',
    totalVisits: 3,
    totalSpend: 900,
    visitsHistory: [
      { reservationId: 'RES-6001', arrival: '2025-06-01', departure: '2025-06-02', roomType: 'Single', roomNumber: '202', bill: 300, notes: 'No special requests' },
      { reservationId: 'RES-5802', arrival: '2025-04-12', departure: '2025-04-15', roomType: 'Double', roomNumber: '310', bill: 450, notes: 'Requested late checkout' },
      { reservationId: 'RES-5603', arrival: '2025-01-10', departure: '2025-01-12', roomType: 'Suite', roomNumber: '501', bill: 150, notes: 'Suite upgrade' },
    ]
  },
  {
    id: 'GST-1003',
    name: 'Sophia Müller',
    email: 'sophia.mueller@web.de',
    phone: '+49-170-9876543',
    nationality: 'Germany',
    vip: 'VIP',
    lastVisit: '2025-04-15',
    totalVisits: 8,
    totalSpend: 3200,
    visitsHistory: [
      { reservationId: 'RES-5305', arrival: '2025-04-10', departure: '2025-04-15', roomType: 'Suite', roomNumber: '702', bill: 1400, notes: 'Flower arrangement' },
      { reservationId: 'RES-5104', arrival: '2024-11-05', departure: '2024-11-10', roomType: 'Double', roomNumber: '408', bill: 800, notes: 'Dietary meal' },
      { reservationId: 'RES-4903', arrival: '2024-10-01', departure: '2024-10-05', roomType: 'Single', roomNumber: '105', bill: 600, notes: 'Quiet room' },
    ]
  }
];

const ViewGuestHistory: React.FC = () => {
  const [records] = useState(dummyGuests);
  const [filtered, setFiltered] = useState(records);

  // search filters
  const [qId, setQId] = useState('');
  const [qName, setQName] = useState('');
  const [qEmail, setQEmail] = useState('');
  const [qPhone, setQPhone] = useState('');
  const [qNat, setQNat] = useState<'all' | string>('all');
  const [qVip, setQVip] = useState<'all' | 'VIP' | 'Regular'>('all');

  // modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<GuestRecord | null>(null);

  // handle search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const res = records.filter(r =>
      (!qId || r.id.includes(qId)) &&
      (!qName || r.name.toLowerCase().includes(qName.toLowerCase())) &&
      (!qEmail || r.email.toLowerCase().includes(qEmail.toLowerCase())) &&
      (!qPhone || r.phone.includes(qPhone)) &&
      (qNat === 'all' || r.nationality === qNat) &&
      (qVip === 'all' || r.vip === qVip)
    );
    setFiltered(res);
  };

  // open detail modal
  const openDetails = (r: GuestRecord) => {
    setSelected(r);
    setDetailOpen(true);
  };

  const closeModal = () => {
    setDetailOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>View Guest History</h1>
        <p className={styles.breadcrumb}>
          Home &gt; Guest Management &gt; View Guest History
        </p>
      </div>

      {/* Search Section */}
      <form className={styles.searchSection} onSubmit={handleSearch}>
        <h2>🔎 Search Guest History</h2>
        <div className={styles.fields}>
          <input
            className={styles.input}
            placeholder="Guest ID"
            value={qId}
            onChange={e => setQId(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Guest Name"
            value={qName}
            onChange={e => setQName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Email"
            value={qEmail}
            onChange={e => setQEmail(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Phone Number"
            value={qPhone}
            onChange={e => setQPhone(e.target.value)}
          />
          <select
            className={styles.select}
            value={qNat}
            onChange={e => setQNat(e.target.value)}
          >
            <option value="all">All Nationalities</option>
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
            <option>Germany</option>
            <option>Saudi Arabia</option>
            <option>UAE</option>
            <option>Turkey</option>
          </select>
          <select
            className={styles.select}
            value={qVip}
            onChange={e => setQVip(e.target.value as any)}
          >
            <option value="all">All VIP Status</option>
            <option value="VIP">VIP 🥇</option>
            <option value="Regular">Regular</option>
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnSearch}`}>
          🔍 Search
        </button>
      </form>

      {/* Results Table */}
      <div className={styles.resultsSection}>
        <h2>Guest History Results</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Guest ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Nationality</th>
                <th>VIP Status</th>
                <th>Last Visit</th>
                <th>Total Visits</th>
                <th>Total Spend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.nationality}</td>
                  <td>
                    <span
                      className={`${styles.vipBadge} ${
                        r.vip === 'VIP' ? styles.vip : styles.regular
                      }`}
                    >
                      {r.vip}
                    </span>
                  </td>
                  <td>{r.lastVisit}</td>
                  <td>{r.totalVisits}</td>
                  <td>${r.totalSpend.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => openDetails(r)}
                      className={`${styles.btn} ${styles.btnView}`}
                    >
                      View Details
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
            <span onClick={closeModal} className={styles.close}>&times;</span>
            <h2>
              {selected.name} ({selected.id})
            </h2>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Nationality:</strong> {selected.nationality}</p>
            <p><strong>VIP Status:</strong> {selected.vip}</p>
            <p><strong>Total Visits:</strong> {selected.totalVisits}</p>
            <p><strong>Total Spend:</strong> ${selected.totalSpend.toLocaleString()}</p>
            <p><strong>Last Visit:</strong> {selected.lastVisit}</p>

            <h3>Past Visits History</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Reservation</th>
                    <th>Arrival</th>
                    <th>Departure</th>
                    <th>Type</th>
                    <th>Room#</th>
                    <th>Bill ($)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.visitsHistory.map(v => (
                    <tr key={v.reservationId}>
                      <td>{v.reservationId}</td>
                      <td>{v.arrival}</td>
                      <td>{v.departure}</td>
                      <td>{v.roomType}</td>
                      <td>{v.roomNumber}</td>
                      <td>{v.bill}</td>
                      <td>{v.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.modalButtons}>
              <button onClick={closeModal} className={`${styles.btn} ${styles.btnClose}`}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGuestHistory;
