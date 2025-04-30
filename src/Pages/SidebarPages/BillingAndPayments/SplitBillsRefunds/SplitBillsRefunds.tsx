import React, { useState, useEffect, FormEvent } from 'react';
import styles from './SplitBillsRefunds.module.css';

type ChargeType = 'Room Charge' | 'Service' | 'F&B' | 'Tax';
type Status = 'Active' | 'Split' | 'Refunded';
type SplitType = 'By Guest' | 'By Method';
type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer';

interface Charge {
  id: string;
  description: string;
  amount: number;
  type: ChargeType;
  status: Status;
}

interface Processed {
  action: 'Split' | 'Refund';
  description: string;
  amount: number;
  guestOrMethod: string;
  date: string;
  status: 'Done';
}

const dummyCharges: Charge[] = [
  { id: 'CH-001', description: 'Accommodation', amount: 3000, type: 'Room Charge', status: 'Active' },
  { id: 'CH-002', description: 'Minibar Usage', amount: 450, type: 'Service', status: 'Refunded' },
  { id: 'CH-003', description: 'Room Service', amount: 750, type: 'F&B', status: 'Active' },
  { id: 'CH-004', description: 'Laundry', amount: 320, type: 'Service', status: 'Split' },
  { id: 'CH-005', description: 'Taxes & Fees', amount: 200, type: 'Tax', status: 'Active' },
];

const SplitBillsRefunds: React.FC = () => {
  // data & filters
  const [charges, setCharges] = useState<Charge[]>(dummyCharges);
  const [filtered, setFiltered] = useState<Charge[]>(dummyCharges);
  const [reservationId, setReservationId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');

  // modals
  const [splitOpen, setSplitOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [selected, setSelected] = useState<Charge | null>(null);

  // split form
  const [splitType, setSplitType] = useState<SplitType>('By Guest');
  const [guestA, setGuestA] = useState('');
  const [guestAAmount, setGuestAAmount] = useState(0);
  const [guestB, setGuestB] = useState('');
  const [guestBAmount, setGuestBAmount] = useState(0);

  // refund form
  const [refundReason, setRefundReason] = useState('');
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundMethod, setRefundMethod] = useState<PaymentMethod>('Cash');
  const [refundDate, setRefundDate] = useState(() => new Date().toISOString().slice(0,10));

  // summary
  const [processed, setProcessed] = useState<Processed[]>([]);

  // filtering
  useEffect(() => {
    setFiltered(charges);
  }, [charges]);

  // open/close
  const openSplit = (c: Charge) => {
    setSelected(c);
    setGuestA(''); setGuestAAmount(0);
    setGuestB(''); setGuestBAmount(0);
    setSplitOpen(true);
  };
  const closeSplit = () => setSplitOpen(false);

  const openRefund = (c: Charge) => {
    setSelected(c);
    setRefundReason('');
    setRefundAmount(0);
    setRefundMethod('Cash');
    setRefundDate(new Date().toISOString().slice(0,10));
    setRefundOpen(true);
  };
  const closeRefund = () => setRefundOpen(false);

  // handle split
  const handleSplit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (!guestA || !guestB) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    if (guestAAmount + guestBAmount !== selected.amount) {
      alert('⚠️ Split amounts must add up to the original charge!');
      return;
    }
    setCharges((prev) =>
      prev.map((c) =>
        c.id === selected.id ? { ...c, status: 'Split' } : c
      )
    );
    setProcessed((p) => [
      ...p,
      {
        action: 'Split',
        description: selected.description,
        amount: selected.amount,
        guestOrMethod: `${guestA}/${guestB}`,
        date: new Date().toISOString().slice(0,10),
        status: 'Done',
      },
    ]);
    alert('✅ Split processed successfully!');
    closeSplit();
  };

  // handle refund
  const handleRefund = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (!refundReason) {
      alert('⚠️ Please fill all required fields!');
      return;
    }
    if (refundAmount > selected.amount) {
      alert('❌ Refund amount exceeds original charge!');
      return;
    }
    setCharges((prev) =>
      prev.map((c) =>
        c.id === selected.id ? { ...c, status: 'Refunded' } : c
      )
    );
    setProcessed((p) => [
      ...p,
      {
        action: 'Refund',
        description: selected.description,
        amount: refundAmount,
        guestOrMethod: refundMethod,
        date: refundDate,
        status: 'Done',
      },
    ]);
    alert('✅ Refund processed successfully!');
    closeRefund();
  };

  return (
    <div className={styles.container}>
      {/* header */}
      <h1 className={styles.pageTitle}>Split Bills &amp; Refunds</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Billing &amp; Payments &gt; Split Bills &amp; Refunds
      </div>

      {/* search */}
      <section className={styles.searchSection}>
        <h2>🔎 Search Guest Invoice</h2>
        <form className={styles.searchForm} onSubmit={(e)=>e.preventDefault()}>
          <div className={styles.fieldsGrid}>
            <div>
              <label>Reservation ID</label>
              <input
                className={styles.input}
                placeholder="Enter Reservation ID"
                value={reservationId}
                onChange={e => setReservationId(e.target.value)}
              />
            </div>
            <div>
              <label>Guest Name</label>
              <input
                className={styles.input}
                placeholder="Enter Guest Full Name"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
              />
            </div>
            <div>
              <label>Invoice Number</label>
              <input
                className={styles.input}
                placeholder="Enter Invoice Number"
                value={invoiceNumber}
                onChange={e => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div>
              <label>Room Number</label>
              <input
                className={styles.input}
                placeholder="e.g. 204"
                value={roomNumber}
                onChange={e => setRoomNumber(e.target.value)}
              />
            </div>
            <div>
              <label>Date of Invoice</label>
              <input
                type="date"
                className={styles.input}
                value={invoiceDate}
                onChange={e => setInvoiceDate(e.target.value)}
              />
            </div>
          </div>
          <button className={`${styles.btn} ${styles.searchBtn}`}>
            🔍 Search Invoice
          </button>
        </form>
      </section>

      {/* breakdown table */}
      <section className={styles.resultsSection}>
        <h2>💳 Invoice Charges Breakdown</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Description','Amount (TL)','Charge Type','Status','Actions'].map(h=>(
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c.id}>
                  <td>{c.description}</td>
                  <td>{c.amount.toLocaleString()}</td>
                  <td>{c.type}</td>
                  <td>
                    <span className={
                      c.status==='Active'
                        ? styles.statusActive
                        : c.status==='Split'
                          ? styles.statusSplit
                          : styles.statusRefunded
                    }>
                      {c.status==='Active'?'🟢 Active':c.status==='Split'?'🟡 Split':'🔴 Refunded'}
                    </span>
                  </td>
                  <td>
                    {c.status!=='Refunded' && (
                      <button
                        className={`${styles.btn} ${styles.splitBtn}`}
                        onClick={()=>openSplit(c)}
                      >Split</button>
                    )}
                    {c.status==='Active' && (
                      <button
                        className={`${styles.btn} ${styles.refundBtn}`}
                        onClick={()=>openRefund(c)}
                      >Refund</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Split Modal */}
      {splitOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeSplit}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeSplit}>&times;</span>
            <h2>Split Charge – {selected.description} (₺{selected.amount.toLocaleString()})</h2>
            <form className={styles.form} onSubmit={handleSplit}>
              <label>Split Type</label>
              <select
                className={styles.input}
                value={splitType}
                onChange={e=>setSplitType(e.target.value as SplitType)}
              >
                <option>By Guest</option>
                <option>By Method</option>
              </select>

              <label>Guest A Name</label>
              <input
                className={styles.input}
                value={guestA} onChange={e=>setGuestA(e.target.value)}
              />
              <label>Guest A Amount</label>
              <input
                type="number"
                className={styles.input}
                value={guestAAmount}
                onChange={e=>setGuestAAmount(Number(e.target.value))}
                min={0} max={selected.amount}
              />

              <label>Guest B Name</label>
              <input
                className={styles.input}
                value={guestB} onChange={e=>setGuestB(e.target.value)}
              />
              <label>Guest B Amount</label>
              <input
                type="number"
                className={styles.input}
                value={guestBAmount}
                onChange={e=>setGuestBAmount(Number(e.target.value))}
                min={0} max={selected.amount}
              />

              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
                  Save Split
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeSplit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {refundOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeRefund}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeRefund}>&times;</span>
            <h2>Refund Charge – {selected.description} (₺{selected.amount.toLocaleString()})</h2>
            <form className={styles.form} onSubmit={handleRefund}>
              <label>Refund Reason</label>
              <textarea
                className={styles.input}
                value={refundReason}
                onChange={e=>setRefundReason(e.target.value)}
              />

              <label>Refund Amount</label>
              <input
                type="number"
                className={styles.input}
                value={refundAmount}
                onChange={e=>setRefundAmount(Number(e.target.value))}
                min={0} max={selected.amount}
              />

              <label>Refund Method</label>
              <select
                className={styles.input}
                value={refundMethod}
                onChange={e=>setRefundMethod(e.target.value as PaymentMethod)}
              >
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
              </select>

              <label>Refund Date</label>
              <input
                type="date"
                className={styles.input}
                value={refundDate}
                onChange={e=>setRefundDate(e.target.value)}
              />

              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
                  Process Refund
                </button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeRefund}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>🧾 Processed Refunds &amp; Splits</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Action','Description','Amount (TL)','Guest/Method','Date','Status'].map(h=>(
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processed.map((p,i)=>(
                <tr key={i}>
                  <td>{p.action}</td>
                  <td>{p.description}</td>
                  <td>{p.amount.toLocaleString()}</td>
                  <td>{p.guestOrMethod}</td>
                  <td>{p.date}</td>
                  <td>✅ Done</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SplitBillsRefunds;
