import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from './BlacklistRestrictions.module.css';

type Nationality =
  | 'USA'
  | 'Canada'
  | 'UK'
  | 'Saudi Arabia'
  | 'UAE'
  | 'Germany'
  | 'Turkey';
type Reason =
  | 'Payment Issues'
  | 'Property Damage'
  | 'Misbehavior'
  | 'Fraud'
  | 'Other';
type Status = 'Active' | 'Expired';

interface Restriction {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  nationality: Nationality;
  reason: Reason;
  restrictionDate: string; // YYYY-MM-DD
  expiryDate: string;      // YYYY-MM-DD
  status: Status;
  addedBy: string;
  notes: string;
}

const dummyRestrictions: Restriction[] = [
  {
    id: 'BL-5001',
    guestName: 'John Doe',
    email: 'john@example.com',
    phone: '+1-202-555-0170',
    nationality: 'USA',
    reason: 'Payment Issues',
    restrictionDate: '2025-01-15',
    expiryDate: '2026-01-15',
    status: 'Active',
    addedBy: 'Admin User',
    notes: 'Multiple declined credit card transactions. Issue unresolved.',
  },
  {
    id: 'BL-5002',
    guestName: 'Ahmad Salem',
    email: 'ahmad@web.ae',
    phone: '+971-50-1234876',
    nationality: 'UAE',
    reason: 'Misbehavior',
    restrictionDate: '2024-05-10',
    expiryDate: '2025-05-10',
    status: 'Expired',
    addedBy: 'Sarah Noor',
    notes: 'Involved in several incidents. Restriction period ended.',
  },
  {
    id: 'BL-5003',
    guestName: 'Maria Schmidt',
    email: 'maria@web.de',
    phone: '+49-170-1231234',
    nationality: 'Germany',
    reason: 'Fraud',
    restrictionDate: '2025-03-20',
    expiryDate: '2026-03-20',
    status: 'Active',
    addedBy: 'John Adams',
    notes: 'Suspicious activity detected. Under monitoring.',
  },
];

const BlacklistRestrictions: React.FC = () => {
  // البيانات والحالة
  const [list, setList] = useState<Restriction[]>(dummyRestrictions);
  const [filtered, setFiltered] = useState<Restriction[]>(dummyRestrictions);

  // فلاتر البحث
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState<'All' | Nationality>('All');
  const [reasonFilter, setReasonFilter] = useState<'All' | Reason>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');

  // مودالات
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [renewOpen, setRenewOpen] = useState(false);
  const [selected, setSelected] = useState<Restriction | null>(null);

  // حقول التجديد
  const [newExpiry, setNewExpiry] = useState('');
  const [renewNotes, setRenewNotes] = useState('');

  // تطبيق فلاتر البحث
  useEffect(() => {
    const res = list.filter((r) => {
      if (nameFilter && !r.guestName.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      if (emailFilter && !r.email.toLowerCase().includes(emailFilter.toLowerCase())) return false;
      if (phoneFilter && !r.phone.includes(phoneFilter)) return false;
      if (nationalityFilter !== 'All' && r.nationality !== nationalityFilter) return false;
      if (reasonFilter !== 'All' && r.reason !== reasonFilter) return false;
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      return true;
    });
    setFiltered(res);
  }, [nameFilter, emailFilter, phoneFilter, nationalityFilter, reasonFilter, statusFilter, list]);

  // فتح/إغلاق المودالات
  const openDetails = (r: Restriction) => { setSelected(r); setDetailsOpen(true); };
  const closeDetails = () => setDetailsOpen(false);

  const openRemove = (r: Restriction) => { setSelected(r); setRemoveOpen(true); };
  const closeRemove = () => setRemoveOpen(false);

  const openRenew = (r: Restriction) => { setSelected(r); setRenewOpen(true); };
  const closeRenew = () => setRenewOpen(false);

  // تأكيد الإزالة
  const confirmRemoval = () => {
    if (selected) {
      setList((prev) => prev.filter((r) => r.id !== selected.id));
      alert(`✅ Restriction ${selected.id} removed.`);
      closeRemove();
    }
  };

  // تأكيد التجديد
  const confirmRenewal = () => {
    if (!newExpiry) {
      alert('⚠️ Please select a new expiry date.');
      return;
    }
    if (selected) {
      setList((prev) =>
        prev.map((r) =>
          r.id === selected.id
            ? { ...r, expiryDate: newExpiry, notes: renewNotes || r.notes, status: 'Active' }
            : r
        )
      );
      alert(`✅ Restriction ${selected.id} renewed until ${newExpiry}.`);
      closeRenew();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Blacklist &amp; Restrictions</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Guest Management &gt; Blacklist &amp; Restrictions
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>🔎 Search Blacklisted Guests</h2>
        <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.fieldsGrid}>
            <div>
              <label>Guest Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Guest Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Email"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Phone Number"
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Nationality</label>
              <select
                className={styles.input}
                value={nationalityFilter}
                onChange={(e) =>
                  setNationalityFilter(e.target.value as any)
                }
              >
                <option>All</option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
                <option>Saudi Arabia</option>
                <option>UAE</option>
                <option>Germany</option>
                <option>Turkey</option>
              </select>
            </div>
            <div>
              <label>Restriction Reason</label>
              <select
                className={styles.input}
                value={reasonFilter}
                onChange={(e) =>
                  setReasonFilter(e.target.value as any)
                }
              >
                <option>All</option>
                <option>Payment Issues</option>
                <option>Property Damage</option>
                <option>Misbehavior</option>
                <option>Fraud</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Restriction Status</label>
              <select
                className={styles.input}
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as any)
                }
              >
                <option>All</option>
                <option>Active</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
          <button className={`${styles.btn} ${styles.searchBtn}`}>
            🔍 Search Blacklist
          </button>
        </form>
      </section>

      {/* Results */}
      <section className={styles.resultsSection}>
        <h2>Blacklist Results</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  'Restriction ID',
                  'Guest Name',
                  'Email',
                  'Phone Number',
                  'Nationality',
                  'Reason',
                  'Restriction Date',
                  'Expiry Date',
                  'Status',
                  'Added By',
                  'Actions',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.guestName}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.nationality}</td>
                  <td>
                    <span
                      className={
                        styles[
                          `reason${r.reason.replace(/ /g, '')}` as
                            | 'reasonPaymentIssues'
                            | 'reasonPropertyDamage'
                            | 'reasonMisbehavior'
                            | 'reasonFraud'
                            | 'reasonOther'
                        ]
                      }
                    >
                      {r.reason}
                    </span>
                  </td>
                  <td>{r.restrictionDate}</td>
                  <td>{r.expiryDate}</td>
                  <td>
                    <span
                      className={
                        r.status === 'Active'
                          ? styles.statusActive
                          : styles.statusExpired
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>{r.addedBy}</td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetails(r)}
                    >
                      View
                    </button>
                    {r.status === 'Expired' ? (
                      <button
                        className={`${styles.btn} ${styles.renewBtn}`}
                        onClick={() => openRenew(r)}
                      >
                        Renew
                      </button>
                    ) : (
                      <button
                        className={`${styles.btn} ${styles.removeBtn}`}
                        onClick={() => openRemove(r)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Details Modal */}
      {detailsOpen && selected && (
        <div
          className={styles.modalOverlay}
          onClick={closeDetails}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={closeDetails}
            >
              &times;
            </span>
            <h2>
              Restriction Details – {selected.guestName} ({selected.id})
            </h2>
            <p>
              <strong>Reason:</strong> {selected.reason}
            </p>
            <p>
              <strong>Status:</strong> {selected.status}
            </p>
            <p>
              <strong>Restriction Date:</strong> {selected.restrictionDate}
            </p>
            <p>
              <strong>Expiry Date:</strong> {selected.expiryDate}
            </p>
            <p>
              <strong>Added By:</strong> {selected.addedBy}
            </p>
            <p>
              <strong>Notes:</strong> {selected.notes}
            </p>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.closeBtn}`}
                onClick={closeDetails}
              >
                Close
              </button>
              {selected.status === 'Expired' ? (
                <button
                  className={`${styles.btn} ${styles.renewBtn}`}
                  onClick={() => { closeDetails(); openRenew(selected); }}
                >
                  Renew
                </button>
              ) : (
                <button
                  className={`${styles.btn} ${styles.removeBtn}`}
                  onClick={() => { closeDetails(); openRemove(selected); }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Remove Modal */}
      {removeOpen && selected && (
        <div
          className={styles.modalOverlay}
          onClick={closeRemove}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={closeRemove}
            >
              &times;
            </span>
            <h2>
              Remove Restriction – {selected.guestName} ({selected.id})
            </h2>
            <p>
              Are you sure you want to remove this restriction?
            </p>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.removeBtn}`}
                onClick={confirmRemoval}
              >
                Confirm Removal
              </button>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={closeRemove}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renew Modal */}
      {renewOpen && selected && (
        <div
          className={styles.modalOverlay}
          onClick={closeRenew}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={closeRenew}
            >
              &times;
            </span>
            <h2>
              Renew Restriction – {selected.guestName} ({selected.id})
            </h2>
            <div className={styles.formRow}>
              <label>New Expiry Date</label>
              <input
                type="date"
                className={styles.input}
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <label>Additional Notes</label>
              <textarea
                className={styles.input}
                placeholder="Enter any additional notes"
                value={renewNotes}
                onChange={(e) => setRenewNotes(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.renewBtn}`}
                onClick={confirmRenewal}
              >
                Renew Restriction
              </button>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={closeRenew}
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

export default BlacklistRestrictions;
