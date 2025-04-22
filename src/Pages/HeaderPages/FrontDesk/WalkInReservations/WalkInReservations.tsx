import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './WalkInReservations.module.css';

// 1. ندّرج أنواع الغرف
type RoomType = 'Single' | 'Double' | 'Suite' | 'Family';

// 2. واجهة بيانات غرفة
interface RoomInfo {
  roomNumber: number;
  rate: number;
}

const WalkInReservations: React.FC = () => {
  // refs لعناصر DOM
  const checkInDateRef = useRef<HTMLInputElement>(null);
  const checkOutDateRef = useRef<HTMLInputElement>(null);
  const numNightsRef = useRef<HTMLInputElement>(null);
  const roomTypeRef = useRef<HTMLSelectElement>(null);
  const availableRoomsRef = useRef<HTMLSelectElement>(null);
  const roomRateRef = useRef<HTMLInputElement>(null);
  const totalAmountRef = useRef<HTMLInputElement>(null);
  const amountPaidNowRef = useRef<HTMLInputElement>(null);
  const remainingBalanceRef = useRef<HTMLInputElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalCancelRef = useRef<HTMLButtonElement>(null);
  const modalConfirmRef = useRef<HTMLButtonElement>(null);
  const confirmGuestNameRef = useRef<HTMLSpanElement>(null);
  const confirmDatesRef = useRef<HTMLSpanElement>(null);
  const confirmRoomRef = useRef<HTMLSpanElement>(null);
  const confirmPaymentRef = useRef<HTMLSpanElement>(null);
  const confirmPaymentMethodRef = useRef<HTMLSpanElement>(null);

  // 3. بيانات تجريبية عن الغرف
  const roomsData: Record<RoomType, RoomInfo[]> = {
    Single: [{ roomNumber: 101, rate: 100 }, { roomNumber: 102, rate: 100 }],
    Double: [{ roomNumber: 201, rate: 150 }, { roomNumber: 202, rate: 150 }],
    Suite:  [{ roomNumber: 301, rate: 250 }, { roomNumber: 302, rate: 250 }],
    Family: [{ roomNumber: 401, rate: 200 }, { roomNumber: 402, rate: 200 }],
  };

  // ====== دوال الحساب ======
  const calculateNights = () => {
    const inEl = checkInDateRef.current;
    const outEl = checkOutDateRef.current;
    const nightsEl = numNightsRef.current;
    if (inEl && outEl && nightsEl) {
      if (inEl.value && outEl.value) {
        const diff = (new Date(outEl.value).getTime() - new Date(inEl.value).getTime()) 
                   / (1000 * 60 * 60 * 24);
        nightsEl.value = diff > 0 ? Math.ceil(diff).toString() : '0';
      } else {
        nightsEl.value = '0';
      }
    }
    calculateTotal();
  };

  const updateAvailableRooms = () => {
    const sel = availableRoomsRef.current;
    if (!sel) return;
    sel.innerHTML = `<option value="">-- Select Room --</option>`;

    // نأكد لـ TS أنه من نوع RoomType
    const chosen = roomTypeRef.current?.value as RoomType;
    const list = roomsData[chosen] || [];

    list.forEach((r: RoomInfo) => {
      const opt = document.createElement('option');
      opt.value = r.roomNumber.toString();
      opt.textContent = `Room ${r.roomNumber}`;
      opt.setAttribute('data-rate', r.rate.toString());
      sel.appendChild(opt);
    });

    if (roomRateRef.current) roomRateRef.current.value = '';
    calculateTotal();
  };

  const selectRoom = () => {
    const sel = availableRoomsRef.current;
    const rateEl = roomRateRef.current;
    if (sel && rateEl) {
      const opt = sel.selectedOptions[0];
      rateEl.value = opt?.getAttribute('data-rate') || '';
    }
    calculateTotal();
  };

  const calculateTotal = () => {
    const nights = parseInt(numNightsRef.current?.value || '') || 0;
    const rate   = parseFloat(roomRateRef.current?.value || '') || 0;
    const total  = nights * rate;
    if (totalAmountRef.current)
      totalAmountRef.current.value = total > 0 ? total.toFixed(2) : '';
    updateRemainingBalance();
  };

  const updateRemainingBalance = () => {
    const total = parseFloat(totalAmountRef.current?.value || '') || 0;
    const paid  = parseFloat(amountPaidNowRef.current?.value || '') || 0;
    if (remainingBalanceRef.current)
      remainingBalanceRef.current.value = (total - paid).toFixed(2);
  };

  // ====== مودال التأكيد ======
  const openConfirmModal = () => {
    if (
      !checkInDateRef.current?.value ||
      !checkOutDateRef.current?.value ||
      !roomTypeRef.current?.value ||
      !availableRoomsRef.current?.value ||
      !totalAmountRef.current?.value
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    // ملء بيانات المودال
    const fName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lName = (document.getElementById('lastName')  as HTMLInputElement).value;
    if (confirmGuestNameRef.current) confirmGuestNameRef.current.textContent = `${fName} ${lName}`;
    if (confirmDatesRef.current)     confirmDatesRef.current.textContent     =
      `${checkInDateRef.current!.value} to ${checkOutDateRef.current!.value}`;
    if (confirmRoomRef.current)      confirmRoomRef.current.textContent      =
      `${roomTypeRef.current!.value}, Room ${availableRoomsRef.current!.value}`;
    if (confirmPaymentRef.current)   confirmPaymentRef.current.textContent   =
      `$${totalAmountRef.current!.value} & Paid $${amountPaidNowRef.current!.value || '0'}`;
    if (confirmPaymentMethodRef.current) confirmPaymentMethodRef.current.textContent =
      (document.getElementById('paymentMethod') as HTMLSelectElement).value;

    modalOverlayRef.current!.style.display = 'flex';
  };

  const closeModal = () => {
    modalOverlayRef.current!.style.display = 'none';
  };

  const confirmReservation = () => {
    closeModal();
    if (successMessageRef.current) {
      successMessageRef.current.style.display = 'block';
      setTimeout(() => {
        successMessageRef.current!.style.display = 'none';
      }, 3000);
    }
    // reset form
    (document.getElementById('walkInForm') as HTMLFormElement).reset();
    if (checkInDateRef.current) checkInDateRef.current.value = '';
    if (numNightsRef.current)   numNightsRef.current.value = '';
    if (roomTypeRef.current)    roomTypeRef.current.value = '';
    if (availableRoomsRef.current)
      availableRoomsRef.current.innerHTML = `<option value="">-- Select Room --</option>`;
    if (roomRateRef.current)    roomRateRef.current.value = '';
    if (totalAmountRef.current) totalAmountRef.current.value = '';
    if (amountPaidNowRef.current) amountPaidNowRef.current.value = '0';
    if (remainingBalanceRef.current) remainingBalanceRef.current.value = '';
    (document.getElementById('specialRequests') as HTMLTextAreaElement).value = '';
  };

  useEffect(() => {
    // ضبط التاريخ الافتراضي
    const today = new Date().toISOString().split('T')[0];
    if (checkInDateRef.current) checkInDateRef.current.value = today;

    // ثبت الاستماعات
    checkInDateRef.current?.addEventListener('change', calculateNights);
    checkOutDateRef.current?.addEventListener('change', calculateNights);
    roomTypeRef.current?.addEventListener('change', updateAvailableRooms);
    availableRoomsRef.current?.addEventListener('change', selectRoom);
    amountPaidNowRef.current?.addEventListener('input', updateRemainingBalance);
    confirmBtnRef.current?.addEventListener('click', openConfirmModal);
    modalCancelRef.current?.addEventListener('click', closeModal);
    modalConfirmRef.current?.addEventListener('click', confirmReservation);
    modalOverlayRef.current?.addEventListener('click', e => {
      if (e.target === modalOverlayRef.current) closeModal();
    });

    // cleanup
    return () => {
      checkInDateRef.current?.removeEventListener('change', calculateNights);
      checkOutDateRef.current?.removeEventListener('change', calculateNights);
      roomTypeRef.current?.removeEventListener('change', updateAvailableRooms);
      availableRoomsRef.current?.removeEventListener('change', selectRoom);
      amountPaidNowRef.current?.removeEventListener('input', updateRemainingBalance);
      confirmBtnRef.current?.removeEventListener('click', openConfirmModal);
      modalCancelRef.current?.removeEventListener('click', closeModal);
      modalConfirmRef.current?.removeEventListener('click', confirmReservation);
      modalOverlayRef.current?.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>Walk‑In Reservations</h1>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt; <Link to="/front-desk">Front Desk</Link> &gt; Walk‑In Reservations
          </nav>
        </div>

        <div ref={successMessageRef} className={styles.successMessage} style={{ display: 'none' }}>
          ✅ Walk‑In Reservation Created Successfully!
        </div>

        <section className={styles.sectionBox}>
          <h2>Guest Information</h2>
          <form id="walkInForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email (optional)</label>
                <input type="email" id="email" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nationality">Nationality</label>
                <select id="nationality" required>
                  <option value="">-- Select Nationality --</option>
                  <option>Saudi Arabia</option>
                  <option>United Arab Emirates</option>
                  <option>Egypt</option>
                  <option>Kuwait</option>
                  <option>Bahrain</option>
                  <option>Oman</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="idPassport">ID / Passport Number</label>
                <input type="text" id="idPassport" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="numAdults">Number of Adults</label>
                <input type="number" id="numAdults" min="1" defaultValue={1} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="numChildren">Number of Children</label>
                <input type="number" id="numChildren" min="0" defaultValue={0} required />
              </div>
            </div>
          </form>
        </section>

        <section className={styles.sectionBox}>
          <h2>Stay Details</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="checkInDate">Check‑In Date</label>
              <input ref={checkInDateRef} type="date" id="checkInDate" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="checkOutDate">Check‑Out Date</label>
              <input ref={checkOutDateRef} type="date" id="checkOutDate" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numNights">Number of Nights</label>
              <input ref={numNightsRef} type="number" id="numNights" readOnly />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="roomType">Room Type</label>
              <select ref={roomTypeRef} id="roomType" required>
                <option value="">-- Select Room Type --</option>
                <option>Single</option>
                <option>Double</option>
                <option>Suite</option>
                <option>Family</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="availableRooms">Available Rooms</label>
              <select ref={availableRoomsRef} id="availableRooms" required>
                <option value="">-- Select Room --</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="roomRate">Room Rate (per night)</label>
              <input ref={roomRateRef} type="text" id="roomRate" readOnly />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroupFull}>
              <label htmlFor="specialRequests">Special Requests (optional)</label>
              <textarea id="specialRequests" rows={3} />
            </div>
          </div>
        </section>

        <section className={styles.sectionBox}>
          <h2>Payment Information</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" required>
                <option value="">-- Select Method --</option>
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="totalAmount">Total Amount</label>
              <input ref={totalAmountRef} type="text" id="totalAmount" readOnly />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="amountPaidNow">Amount Paid Now</label>
              <input ref={amountPaidNowRef} type="number" id="amountPaidNow" min="0" defaultValue={0} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="remainingBalance">Remaining Balance</label>
              <input ref={remainingBalanceRef} type="text" id="remainingBalance" readOnly />
            </div>
          </div>
        </section>

        <div className={styles.confirmContainer}>
          <button ref={confirmBtnRef} className={styles.confirmBtn}>
            ✅ Confirm Walk‑In Reservation
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <div ref={modalOverlayRef} className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2>Confirm Walk‑In Reservation</h2>
          <div className={styles.modalContent}>
            <p><strong>Guest Name:</strong> <span ref={confirmGuestNameRef} /></p>
            <p><strong>Check‑In / Check‑Out:</strong> <span ref={confirmDatesRef} /></p>
            <p><strong>Room Type & Number:</strong> <span ref={confirmRoomRef} /></p>
            <p><strong>Total & Paid:</strong> <span ref={confirmPaymentRef} /></p>
            <p><strong>Payment Method:</strong> <span ref={confirmPaymentMethodRef} /></p>
          </div>
          <div className={styles.modalButtons}>
            <button ref={modalCancelRef} className={styles.modalCancelBtn}>Cancel</button>
            <button ref={modalConfirmRef} className={styles.modalConfirmBtn}>Confirm Reservation</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalkInReservations;
