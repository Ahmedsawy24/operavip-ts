import React, { useState, FormEvent } from 'react';
import styles from './FoodBeverageOrders.module.css';

type Status = 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  room: string;
  guest: string;
  time: string; // e.g. "08:15 AM"
  amount: number; // in SAR
  status: Status;
  items: { name: string; qty: number; price: number }[];
  instructions?: string;
}

const dummyOrders: Order[] = [
  {
    id: 'FB-101',
    room: '101',
    guest: 'Ahmed Yassin',
    time: '08:15 AM',
    amount: 450,
    status: 'Pending',
    items: [
      { name: 'Continental Breakfast', qty: 2, price: 200 },
      { name: 'Cappuccino', qty: 2, price: 50 },
      { name: 'Orange Juice', qty: 2, price: 50 },
    ],
    instructions: 'Allergic to nuts',
  },
  {
    id: 'FB-102',
    room: '202',
    guest: 'Sarah Johnson',
    time: '09:30 AM',
    amount: 250,
    status: 'Preparing',
    items: [
      { name: 'Club Sandwich', qty: 1, price: 120 },
      { name: 'Mineral Water', qty: 2, price: 60 },
      { name: 'Tea', qty: 2, price: 70 },
    ],
  },
  {
    id: 'FB-103',
    room: '303',
    guest: 'Omar Hussein',
    time: '10:00 AM',
    amount: 120,
    status: 'Delivered',
    items: [
      { name: 'Turkish Coffee', qty: 2, price: 40 },
      { name: 'Cheesecake Slice', qty: 1, price: 40 },
      { name: 'Mineral Water', qty: 2, price: 40 },
    ],
  },
  {
    id: 'FB-104',
    room: '404',
    guest: 'Ali Abdullah',
    time: '11:20 AM',
    amount: 320,
    status: 'Cancelled',
    items: [
      { name: 'Steak Sandwich', qty: 1, price: 200 },
      { name: 'French Fries', qty: 1, price: 50 },
      { name: 'Soda', qty: 2, price: 70 },
    ],
  },
];

const FoodBeverageOrders: React.FC = () => {
  // Filters
  const [idFilter, setIdFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');

  // Filtered data
  const [filtered, setFiltered] = useState<Order[]>(dummyOrders);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);

  // Update-status form
  const [updStatus, setUpdStatus] = useState<Status>('Pending');
  const [updStaff, setUpdStaff] = useState('');
  const [updNotes, setUpdNotes] = useState('');
  const [updTime, setUpdTime] = useState('');

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [expFrom, setExpFrom] = useState('');
  const [expTo, setExpTo] = useState('');
  const [expDetails, setExpDetails] = useState(true);

  // Counts
  const total = dummyOrders.length;
  const pending = dummyOrders.filter(o => o.status === 'Pending').length;
  const preparing = dummyOrders.filter(o => o.status === 'Preparing').length;
  const delivered = dummyOrders.filter(o => o.status === 'Delivered').length;
  const cancelled = dummyOrders.filter(o => o.status === 'Cancelled').length;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyOrders;
    if (idFilter) res = res.filter(o => o.id.includes(idFilter));
    if (roomFilter) res = res.filter(o => o.room.includes(roomFilter));
    if (statusFilter !== 'All') res = res.filter(o => o.status === statusFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setIdFilter('');
    setRoomFilter('');
    setStatusFilter('All');
    setFiltered(dummyOrders);
  };

  // Modal openers
  const openDetail = (o: Order) => { setSelected(o); setDetailOpen(true); };
  const openStatus = (o: Order) => {
    setSelected(o);
    setUpdStatus(o.status);
    setUpdStaff('');
    setUpdNotes('');
    setUpdTime('');
    setStatusOpen(true);
  };
  const openReceipt = (o: Order) => { setSelected(o); setReceiptOpen(true); };
  const openExport = () => setExportOpen(true);

  // Close all modals
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
    if (!updStaff || (updStatus === 'Delivered' && !updTime)) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Order status updated successfully!');
    closeAll();
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    if (!expFrom || !expTo) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Orders exported successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Food and Beverage Orders</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Guest Requests &gt; Food and Beverage Orders
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🔎 Filter Orders</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., FB-1023"
            value={idFilter}
            onChange={e => setIdFilter(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., 304"
            value={roomFilter}
            onChange={e => setRoomFilter(e.target.value)}
          />
          <select
            className={styles.input}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Apply Filters
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Orders
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>📈 Today's Order Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Orders</div>
            <div className={styles.cardValue}>{total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Pending</div>
            <div className={styles.cardValue}>{pending}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Preparing</div>
            <div className={styles.cardValue}>{preparing}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Delivered</div>
            <div className={styles.cardValue}>{delivered}</div>
          </div>
          <div className={`${styles.card} ${styles.cardRed}`}>
            <div>Cancelled</div>
            <div className={styles.cardValue}>{cancelled}</div>
          </div>
        </div>
      </section>

      {/* Detailed Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>🗃️ Detailed Food & Beverage Orders</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Room</th>
                <th>Guest Name</th>
                <th>Order Time</th>
                <th>Total (SAR)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.room}</td>
                  <td>{o.guest}</td>
                  <td>{o.time}</td>
                  <td>{o.amount.toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        o.status === 'Pending'   ? styles.badgeOrange :
                        o.status === 'Preparing' ? styles.badgePurple :
                        o.status === 'Delivered' ? styles.badgeGreen :
                        styles.badgeRed
                      }
                    >
                      {o.status === 'Pending'   ? '🟠 Pending' :
                       o.status === 'Preparing' ? '🟣 Preparing' :
                       o.status === 'Delivered' ? '🟢 Delivered' :
                       '🔴 Cancelled'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button className={`${styles.btn} ${styles.viewBtn}`} onClick={() => openDetail(o)}>
                      View
                    </button>
                    {o.status !== 'Delivered' && o.status !== 'Cancelled' && (
                      <button className={`${styles.btn} ${styles.updateBtn}`} onClick={() => openStatus(o)}>
                        Update Status
                      </button>
                    )}
                    {o.status === 'Delivered' && (
                      <button className={`${styles.btn} ${styles.receiptBtn}`} onClick={() => openReceipt(o)}>
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

      {/* Order Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📝 Order Details – {selected.id}</h2>
            <p><strong>Room:</strong> {selected.room}</p>
            <p><strong>Guest:</strong> {selected.guest}</p>
            <p><strong>Time:</strong> {selected.time}</p>
            <p><strong>Items Ordered:</strong></p>
            <ul>
              {selected.items.map((i, idx) => (
                <li key={idx}>{i.name} (×{i.qty}) – SAR {i.price}</li>
              ))}
            </ul>
            {selected.instructions && (
              <p><strong>Instructions:</strong> {selected.instructions}</p>
            )}
            <p><strong>Total Amount:</strong> SAR {selected.amount}</p>
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
            <h2>🔄 Update Order Status – {selected.id}</h2>
            <form className={styles.form} onSubmit={handleUpdate}>
              <div className={styles.formRow}>
                <label>Current Status</label>
                <select
                  className={styles.input}
                  value={updStatus}
                  onChange={e => setUpdStatus(e.target.value as Status)}
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Staff Assigned</label>
                <input
                  type="text"
                  className={styles.input}
                  value={updStaff}
                  onChange={e => setUpdStaff(e.target.value)}
                />
              </div>
              {updStatus === 'Delivered' && (
                <div className={styles.formRow}>
                  <label>Delivery Time</label>
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

      {/* Receipt Modal */}
      {receiptOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>🧾 Food & Beverage Receipt – {selected.id}</h2>
            <p><strong>Guest:</strong> {selected.guest}</p>
            <p><strong>Room:</strong> {selected.room}</p>
            <p><strong>Delivered At:</strong> {selected.time}</p>
            <ul> 
              {selected.items.map((i, idx) => (
                <li key={idx}>{i.name} (×{i.qty}) – SAR {i.price}</li>
              ))}
            </ul>
            <p><strong>Total:</strong> SAR {selected.amount}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.printBtn}`}>Print Receipt</button>
              <button className={`${styles.btn} ${styles.exportBtn}`}>Download PDF</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
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
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Orders</h2>
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
                <label>Include detailed items</label>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.applyBtn}`}>
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

export default FoodBeverageOrders;
