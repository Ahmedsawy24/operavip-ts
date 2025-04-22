import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UpgradeDowngradeRoom.module.css';

type RoomInfo = { roomNumber: string; rate: number; };
type Reservation = {
  id: string;
  guestName: string;
  currentRoom: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  currentRate: number;
};

const UpgradeDowngradeRoom: React.FC = () => {
  // بيانات وهمية
  const currentReservation: Reservation = {
    id: '230145',
    guestName: 'Abdullah Alhammami',
    currentRoom: '101',
    roomType: 'Single',
    checkIn: '12-04-2025',
    checkOut: '15-04-2025',
    currentRate: 100
  };

  const roomsData: Record<string, RoomInfo[]> = {
    Single: [
      { roomNumber: '102', rate: 100 },
      { roomNumber: '103', rate: 100 }
    ],
    Double: [
      { roomNumber: '201', rate: 150 },
      { roomNumber: '202', rate: 150 }
    ],
    Suite: [
      { roomNumber: '301', rate: 250 },
      { roomNumber: '302', rate: 250 }
    ],
    Family: [
      { roomNumber: '401', rate: 200 },
      { roomNumber: '402', rate: 200 }
    ]
  };

  // عناصر الحالة
  const [searchQuery, setSearchQuery] = React.useState('');
  const [newType, setNewType] = React.useState('');
  const [availableRooms, setAvailableRooms] = React.useState<RoomInfo[]>([]);
  const [newRate, setNewRate] = React.useState<number>(0);
  const [reason, setReason] = React.useState('');
  const [originalTotal, setOriginalTotal] = React.useState<number>(300);
  const [newTotal, setNewTotal] = React.useState<number>(300);
  const [difference, setDifference] = React.useState<number>(0);
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // تحديث قائمة الغرف عند تغيير النوع
  useEffect(() => {
    if (newType && roomsData[newType]) {
      setAvailableRooms(roomsData[newType]);
    } else {
      setAvailableRooms([]);
    }
    setNewRate(0);
    calculateFinancials(0);
  }, [newType]);

  // عند اختيار غرفة
  const handleRoomChange = (roomNum: string, rate: number) => {
    setNewRate(rate);
    calculateFinancials(rate);
  };

  // حساب الفروقات
  const calculateFinancials = (rate: number) => {
    const diff = rate - currentReservation.currentRate;
    setDifference(diff);
    setNewTotal(originalTotal + diff);
  };

  // تأكيد التغيير
  const confirmChange = () => {
    if (!newType || newRate === 0) {
      alert('⚠️ Please select a new room.');
      return;
    }
    if (!paymentMethod) {
      alert('⚠️ Please select a payment method for adjustment.');
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const finalizeChange = () => {
    alert('✅ Room Successfully Changed!');
    closeModal();
    // reset
    setNewType('');
    setReason('');
    setPaymentMethod('');
    setOriginalTotal(300);
    setDifference(0);
    setNewTotal(300);
    setNewRate(0);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>Upgrade / Downgrade Room</h1>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt; <Link to="/front-desk">Front Desk</Link> &gt; Upgrade/Downgrade Room
          </nav>
        </div>

        {/* Search */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="🔎 Search by Name, Room Number, or Reservation ID"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={() => alert('Demo search only.')}>
            Search
          </button>
        </section>

        {/* Current Info */}
        <section className={styles.currentInfo}>
          <h2>Current Guest Information</h2>
          <table className={styles.infoTable}>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Current Room</th>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Current Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentReservation.id}</td>
                <td>{currentReservation.guestName}</td>
                <td>{currentReservation.currentRoom}</td>
                <td>{currentReservation.roomType}</td>
                <td>{currentReservation.checkIn}</td>
                <td>{currentReservation.checkOut}</td>
                <td>${currentReservation.currentRate}/night</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Change Room */}
        <section className={styles.changeSection}>
          <h2>Select New Room Type and Room Number</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>New Room Type</label>
              <select value={newType} onChange={e => setNewType(e.target.value)}>
                <option value="">-- Select Room Type --</option>
                {Object.keys(roomsData).map(rt => (
                  <option key={rt} value={rt}>{rt}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Available Rooms</label>
              <select onChange={e => {
                const sel = roomsData[newType].find(r => r.roomNumber === e.target.value)!;
                handleRoomChange(sel.roomNumber, sel.rate);
              }}>
                <option value="">-- Select Room --</option>
                {availableRooms.map(r => (
                  <option key={r.roomNumber} value={r.roomNumber} data-rate={r.rate}>
                    Room {r.roomNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>New Room Rate (per night)</label>
              <input readOnly value={newRate ? `$${newRate}` : ''} />
            </div>
          </div>
          <div className={styles.formGroupFull}>
            <label>Reason for Change</label>
            <textarea
              rows={3}
              placeholder="Enter reason for room change (optional)"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </div>
        </section>

        {/* Payment Adjustment */}
        <section className={styles.paymentSection}>
          <h2>Payment Adjustment</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Original Total Amount</label>
              <input readOnly value={`$${originalTotal.toFixed(2)}`} />
            </div>
            <div className={styles.formGroup}>
              <label>New Total Amount</label>
              <input readOnly value={`$${newTotal.toFixed(2)}`} />
            </div>
            <div className={styles.formGroup}>
              <label>Difference (Upgrade/Downgrade)</label>
              <input readOnly value={`$${difference.toFixed(2)}`} />
            </div>
          </div>
          <div className={styles.formGroupFull}>
            <label>Payment Method for Adjustment</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Select Payment Method --</option>
              <option value="Add to Bill">Add to Bill</option>
              <option value="Immediate Payment">Immediate Payment</option>
            </select>
          </div>
        </section>

        <div className={styles.confirmContainer}>
          <button className={styles.confirmBtn} onClick={confirmChange}>
            ✅ Confirm Upgrade/Downgrade
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Confirm Room Upgrade/Downgrade</h2>
            <div className={styles.modalContent}>
              <p><strong>Guest Name:</strong> {currentReservation.guestName}</p>
              <p><strong>Old Room:</strong> {currentReservation.roomType}, Room {currentReservation.currentRoom}</p>
              <p><strong>New Room:</strong> {newType}, Room {availableRooms.find(r => r.rate === newRate)?.roomNumber}</p>
              <p><strong>Room Rate Difference:</strong> ${difference.toFixed(2)}</p>
              <p><strong>New Total Charges:</strong> ${newTotal.toFixed(2)}</p>
              <p><strong>Payment Method Chosen:</strong> {paymentMethod}</p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancelBtn} onClick={closeModal}>Cancel</button>
              <button className={styles.modalConfirmBtn} onClick={finalizeChange}>Confirm Change</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradeDowngradeRoom;
