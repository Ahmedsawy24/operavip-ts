import React, { useState, FormEvent } from 'react';
import styles from './SendFeedbackForms.module.css';

type FeedbackStatus = 'Sent' | 'Not Sent' | 'Awaiting' | 'Responded';

interface Guest {
  id: string;
  name: string;
  email: string;
  checkOut: string;    // YYYY-MM-DD
  formStatus: 'Sent' | 'Not Sent';
  responseStatus: 'Awaiting' | 'Responded' | '';
  sentDate?: string;   // YYYY-MM-DD
  sentTime?: string;   // HH:MM AM/PM
}

const dummyGuests: Guest[] = [
  { id: 'GST-101', name: 'Ahmed Yassin', email: 'ahmed.y@example.com', checkOut: '2025-06-07', formStatus: 'Sent', responseStatus: 'Awaiting', sentDate: '2025-06-08', sentTime: '09:00 AM' },
  { id: 'GST-102', name: 'Sarah Johnson', email: 'sarah.j@example.com', checkOut: '2025-06-06', formStatus: 'Sent', responseStatus: 'Responded', sentDate: '2025-06-07', sentTime: '10:30 AM' },
  { id: 'GST-103', name: 'Omar Hussein', email: 'omar.h@example.com', checkOut: '2025-06-05', formStatus: 'Not Sent', responseStatus: '' }
];

const SendFeedbackForms: React.FC = () => {
  // Filters
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | FeedbackStatus>('All');

  // Data
  const [filtered, setFiltered] = useState<Guest[]>(dummyGuests);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [resendOpen, setResendOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Guest | null>(null);

  // Send form
  const [template, setTemplate] = useState<'Standard'|'Personalized'>('Standard');
  const [subject, setSubject] = useState('Guest Feedback Request');
  const [body, setBody] = useState('Dear Guest,\n\nWe value your feedback…');

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF'|'Excel'|'CSV'>('PDF');
  const [expStatus, setExpStatus] = useState<'All'|'Awaiting'|'Responded'>('All');
  const [expFrom, setExpFrom] = useState('');
  const [expTo, setExpTo] = useState('');

  // Overview counts
  const total = dummyGuests.length;
  const sent = dummyGuests.filter(g => g.formStatus==='Sent').length;
  const awaiting = dummyGuests.filter(g => g.responseStatus==='Awaiting').length;
  const responded = dummyGuests.filter(g => g.responseStatus==='Responded').length;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyGuests;
    if (nameFilter) res = res.filter(g => g.name.toLowerCase().includes(nameFilter.toLowerCase()));
    if (emailFilter) res = res.filter(g => g.email.includes(emailFilter));
    if (dateFrom) res = res.filter(g => g.checkOut >= dateFrom);
    if (dateTo)   res = res.filter(g => g.checkOut <= dateTo);
    if (statusFilter!=='All') {
      if (statusFilter==='Sent' || statusFilter==='Not Sent') {
        res = res.filter(g => g.formStatus === statusFilter);
      } else {
        res = res.filter(g => g.responseStatus === statusFilter);
      }
    }
    setFiltered(res);
  };
  const resetFilters = () => {
    setNameFilter(''); setEmailFilter(''); setDateFrom(''); setDateTo(''); setStatusFilter('All');
    setFiltered(dummyGuests);
  };

  // Open modals
  const openDetail = (g: Guest) => { setSelected(g); setDetailOpen(true); };
  const openSend = (g: Guest) => { setSelected(g); setSendOpen(true); };
  const openResend = (g: Guest) => { setSelected(g); setResendOpen(true); };
  const openExport = () => setExportOpen(true);

  // Close all
  const closeAll = () => {
    setDetailOpen(false);
    setSendOpen(false);
    setResendOpen(false);
    setExportOpen(false);
    setSelected(null);
  };

  // Handle send
  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!selected || !selected.email || !subject || !body) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Feedback form sent successfully!');
    closeAll();
  };

  // Handle resend
  const confirmResend = () => {
    alert('✅ Feedback form resent successfully!');
    closeAll();
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    alert('✅ Feedback data exported successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Send Feedback Forms</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Check-In and Out &gt; Send Feedback Forms
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🔎 Find Guests for Feedback</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Guest Name"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Enter Email Address"
            value={emailFilter}
            onChange={e => setEmailFilter(e.target.value)}
          />
          <div className={styles.dateRange}>
            <input type="date" className={styles.input} value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            <span>–</span>
            <input type="date" className={styles.input} value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <select
            className={styles.input}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Sent</option>
            <option>Not Sent</option>
            <option>Awaiting</option>
            <option>Responded</option>
          </select>
        </div>
        <button className={`${styles.btn} ${styles.searchBtn}`} onClick={applyFilters}>🔎 Search</button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>🔄 Reset</button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>📤 Export Feedback Data</button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>📈 Feedback Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Guests</div>
            <div className={styles.cardValue}>{total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Forms Sent</div>
            <div className={styles.cardValue}>{sent}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Awaiting Response</div>
            <div className={styles.cardValue}>{awaiting}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Forms Completed</div>
            <div className={styles.cardValue}>{responded}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>🗃️ Guest Feedback Forms</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Guest ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Check-Out Date</th>
                <th>Form Status</th>
                <th>Response Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(g => (
                <tr key={g.id}>
                  <td>{g.id}</td>
                  <td>{g.name}</td>
                  <td>{g.email}</td>
                  <td>{g.checkOut}</td>
                  <td>
                    <span className={
                      g.formStatus==='Sent'? styles.badgeGreen : styles.badgeRed
                    }>
                      {g.formStatus==='Sent'? '✅ Sent':'❌ Not Sent'}
                    </span>
                  </td>
                  <td>
                    {g.formStatus==='Sent' && (
                      <span className={
                        g.responseStatus==='Awaiting'? styles.badgeOrange: styles.badgeGreen
                      }>
                        {g.responseStatus==='Awaiting'? '🕒 Awaiting':'✅ Responded'}
                      </span>
                    )}
                  </td>
                  <td className={styles.actions}>
                    {g.formStatus==='Sent' && (
                      <button className={`${styles.btn} ${styles.viewBtn}`} onClick={() => openDetail(g)}>
                        View
                      </button>
                    )}
                    {g.formStatus==='Sent' && g.responseStatus==='Responded' && (
                      <button className={`${styles.btn} ${styles.detailsBtn}`} onClick={() => openDetail(g)}>
                        Details
                      </button>
                    )}
                    {g.formStatus==='Sent' && g.responseStatus==='Awaiting' && (
                      <button className={`${styles.btn} ${styles.resendBtn}`} onClick={() => openResend(g)}>
                        Resend
                      </button>
                    )}
                    {g.formStatus==='Not Sent' && (
                      <button className={`${styles.btn} ${styles.sendBtn}`} onClick={() => openSend(g)}>
                        Send Form
                      </button>
                    )}
                    <button className={`${styles.btn} ${styles.detailsBtn}`} onClick={() => openDetail(g)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detail Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📝 Feedback Form – {selected.name} ({selected.id})</h2>
            <p><strong>Guest Name:</strong> {selected.name}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Check-Out Date:</strong> {selected.checkOut}</p>
            {selected.sentDate && selected.sentTime && (
              <p><strong>Form Sent Date:</strong> {selected.sentDate} ({selected.sentTime})</p>
            )}
            {selected.responseStatus && (
              <p><strong>Response Status:</strong> {selected.responseStatus==='Awaiting'? '🕒 Awaiting':'✅ Responded'}</p>
            )}
            <div className={styles.modalActions}>
              {selected.formStatus==='Sent' && (
                <button className={`${styles.btn} ${styles.resendBtn}`} onClick={()=>{ closeAll(); openResend(selected); }}>
                  Resend Form
                </button>
              )}
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Form Modal */}
      {sendOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📧 Send Feedback Form – {selected.name} ({selected.id})</h2>
            <form className={styles.form} onSubmit={handleSend}>
              <div className={styles.formRow}>
                <label>Email Address</label>
                <input type="email" className={styles.input} defaultValue={selected.email} readOnly />
              </div>
              <div className={styles.formRow}>
                <label>Subject</label>
                <input type="text" className={styles.input} value={subject} onChange={e=>setSubject(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>Email Template</label>
                <select className={styles.input} value={template} onChange={e=>setTemplate(e.target.value as any)}>
                  <option>Standard</option>
                  <option>Personalized</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Message</label>
                <textarea className={styles.input} rows={6} value={body} onChange={e=>setBody(e.target.value)} />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.sendBtn}`}>Send Feedback Form</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resend Confirmation Modal */}
      {resendOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>🔄 Confirm Resend – {selected.name} ({selected.id})</h2>
            <p>Are you sure you want to resend the feedback form to <strong>{selected.name}</strong> at <strong>{selected.email}</strong>?</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.resendBtn}`} onClick={confirmResend}>Yes, Resend</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Feedback Data</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select className={styles.input} value={expFormat} onChange={e=>setExpFormat(e.target.value as any)}>
                  <option>PDF</option><option>Excel</option><option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Response Status</label>
                <select className={styles.input} value={expStatus} onChange={e=>setExpStatus(e.target.value as any)}>
                  <option>All</option><option>Awaiting</option><option>Responded</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Date From</label>
                <input type="date" className={styles.input} value={expFrom} onChange={e=>setExpFrom(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>Date To</label>
                <input type="date" className={styles.input} value={expTo} onChange={e=>setExpTo(e.target.value)} />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.applyBtn}`}>Export</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendFeedbackForms;
