import React, { useState, FormEvent } from 'react';
import styles from './StaffSchedulingAndPayroll.module.css';

type Department = 'Reception' | 'Housekeeping' | 'F&B' | 'Security' | 'Spa';
type ShiftType = 'Morning' | 'Afternoon' | 'Night';
type Status = 'Completed' | 'Ongoing' | 'Scheduled' | 'OnLeave';

interface Shift {
  staffId: string;
  name: string;
  department: Department;
  shiftDate: string; // YYYY-MM-DD
  shiftType: ShiftType | '—';
  scheduledCheckIn: string; // e.g. "08:00 AM"
  scheduledCheckOut: string; // e.g. "04:00 PM"
  status: Status;
  actualCheckIn?: string;
  actualCheckOut?: string;
  hoursWorked?: string;
  overtime?: string;
  notes?: string;
  hourlyRate?: number; // SAR/hr
  deductions?: number;  // SAR
}

const dummyShifts: Shift[] = [
  {
    staffId: 'EMP101',
    name: 'Ahmed Yassin',
    department: 'Reception',
    shiftDate: '2025-06-07',
    shiftType: 'Morning',
    scheduledCheckIn: '08:00 AM',
    scheduledCheckOut: '04:00 PM',
    status: 'Completed',
    actualCheckIn: '07:55 AM',
    actualCheckOut: '04:10 PM',
    hoursWorked: '8h 15m',
    overtime: '15m',
    notes: 'Covered extra due to guest delays.',
    hourlyRate: 50,
    deductions: 10,
  },
  {
    staffId: 'EMP102',
    name: 'Sarah Johnson',
    department: 'F&B',
    shiftDate: '2025-06-07',
    shiftType: 'Afternoon',
    scheduledCheckIn: '02:00 PM',
    scheduledCheckOut: '10:00 PM',
    status: 'Ongoing',
    hourlyRate: 50,
    deductions: 15,
  },
  {
    staffId: 'EMP103',
    name: 'Omar Hussein',
    department: 'Security',
    shiftDate: '2025-06-07',
    shiftType: 'Night',
    scheduledCheckIn: '10:00 PM',
    scheduledCheckOut: '06:00 AM',
    status: 'Scheduled',
    hourlyRate: 55,
    deductions: 0,
  },
  {
    staffId: 'EMP104',
    name: 'Ali Abdullah',
    department: 'Spa',
    shiftDate: '2025-06-07',
    shiftType: '—',
    scheduledCheckIn: '—',
    scheduledCheckOut: '—',
    status: 'OnLeave',
  },
];

const StaffSchedulingAndPayroll: React.FC = () => {
  // Filters
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [deptFilter, setDeptFilter] = useState<'All' | Department>('All');
  const [shiftFilter, setShiftFilter] = useState<'All' | ShiftType>('All');

  // Data
  const [filtered, setFiltered] = useState<Shift[]>(dummyShifts);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Shift | null>(null);

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [expPeriodFrom, setExpPeriodFrom] = useState('');
  const [expPeriodTo, setExpPeriodTo] = useState('');
  const [expDept, setExpDept] = useState<'All' | Department>('All');

  // Overview cards (dummy counts)
  const totalEmployees = 120;
  const onShift = 65;
  const offToday = 40;
  const onLeave = 15;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyShifts;
    if (dateFrom) res = res.filter(s => s.shiftDate >= dateFrom);
    if (dateTo) res = res.filter(s => s.shiftDate <= dateTo);
    if (deptFilter !== 'All') res = res.filter(s => s.department === deptFilter);
    if (shiftFilter !== 'All') res = res.filter(s => s.shiftType === shiftFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setDateFrom(''); setDateTo('');
    setDeptFilter('All'); setShiftFilter('All');
    setFiltered(dummyShifts);
  };

  // Open modals
  const openDetail = (s: Shift) => { setSelected(s); setDetailOpen(true); };
  const openPayroll = (s: Shift) => { setSelected(s); setPayrollOpen(true); };
  const openExport = () => setExportOpen(true);

  // Close
  const closeAll = () => {
    setDetailOpen(false); setPayrollOpen(false); setExportOpen(false); setSelected(null);
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    if (!expPeriodFrom || !expPeriodTo) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Payroll data exported successfully!');
    closeAll();
  };

  // Handle payroll confirm
  const confirmPayroll = () => {
    alert('✅ Payroll confirmed successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Staff Scheduling and Payroll</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Staff Management &gt; Staff Scheduling and Payroll
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>📆 Filter Staff Schedule</h2>
        <div className={styles.filterGrid}>
          <div>
            <label>From</label>
            <input type="date" className={styles.input} value={dateFrom} onChange={e=>setDateFrom(e.target.value)}/>
          </div>
          <div>
            <label>To</label>
            <input type="date" className={styles.input} value={dateTo} onChange={e=>setDateTo(e.target.value)}/>
          </div>
          <div>
            <label>Department</label>
            <select className={styles.input} value={deptFilter} onChange={e=>setDeptFilter(e.target.value as any)}>
              <option>All</option>
              <option>Reception</option>
              <option>Housekeeping</option>
              <option>F&B</option>
              <option>Security</option>
              <option>Spa</option>
            </select>
          </div>
          <div>
            <label>Shift Type</label>
            <select className={styles.input} value={shiftFilter} onChange={e=>setShiftFilter(e.target.value as any)}>
              <option>All</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Night</option>
            </select>
          </div>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Apply Filters
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Payroll Data
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>👥 Staff Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Employees</div>
            <div className={styles.cardValue}>{totalEmployees}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>On Shift Today</div>
            <div className={styles.cardValue}>{onShift}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Off Today</div>
            <div className={styles.cardValue}>{offToday}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>On Leave</div>
            <div className={styles.cardValue}>{onLeave}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>📊 Staff Scheduling Details</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Shift Date</th>
                <th>Shift Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.staffId}>
                  <td>{s.staffId}</td>
                  <td>{s.name}</td>
                  <td>{s.department}</td>
                  <td>{s.shiftDate}</td>
                  <td>{s.shiftType}</td>
                  <td>{s.scheduledCheckIn}</td>
                  <td>{s.scheduledCheckOut}</td>
                  <td>
                    <span
                      className={
                        s.status === 'Completed'
                          ? styles.badgeGreen
                          : s.status === 'Ongoing'
                          ? styles.badgeBlue
                          : s.status === 'Scheduled'
                          ? styles.badgeOrange
                          : styles.badgePurple
                      }
                    >
                      {s.status === 'Completed'
                        ? '✅ Completed'
                        : s.status === 'Ongoing'
                        ? '🕒 Ongoing'
                        : s.status === 'Scheduled'
                        ? '📅 Scheduled'
                        : '🏖️ On Leave'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetail(s)}
                    >
                      View
                    </button>
                    {(s.status === 'Completed' || s.status === 'Ongoing') && (
                      <button
                        className={`${styles.btn} ${styles.payrollBtn}`}
                        onClick={() => openPayroll(s)}
                      >
                        Payroll
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shift Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📝 Shift Details – {selected.name} ({selected.staffId})</h2>
            <p><strong>Department:</strong> {selected.department}</p>
            <p><strong>Shift Date:</strong> {selected.shiftDate}</p>
            <p><strong>Type:</strong> {selected.shiftType}</p>
            <p><strong>Scheduled:</strong> {selected.scheduledCheckIn} – {selected.scheduledCheckOut}</p>
            {selected.actualCheckIn && <p><strong>Actual Check-In:</strong> {selected.actualCheckIn}</p>}
            {selected.actualCheckOut && <p><strong>Actual Check-Out:</strong> {selected.actualCheckOut}</p>}
            {selected.hoursWorked && <p><strong>Total Worked:</strong> {selected.hoursWorked}</p>}
            {selected.overtime && <p><strong>Overtime:</strong> {selected.overtime}</p>}
            <p><strong>Notes:</strong> {selected.notes || '–'}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Modal */}
      {payrollOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>💵 Payroll Details – {selected.name} ({selected.staffId})</h2>
            <p><strong>Department:</strong> {selected.department}</p>
            <p><strong>Shift Date:</strong> {selected.shiftDate}</p>
            <p><strong>Hourly Rate:</strong> SAR {selected.hourlyRate}/hr</p>
            <p><strong>Scheduled Hours:</strong> {selected.scheduledCheckOut !== '—' ? '8 hrs' : '–'}</p>
            <p><strong>Overtime:</strong> {selected.overtime || '0 hrs'}</p>
            <p><strong>Gross Pay:</strong> SAR {((selected.hourlyRate||0)*8 + Number(selected.overtime?.split('h')[0]||0)* (selected.hourlyRate||0)).toLocaleString()}</p>
            <p><strong>Deductions:</strong> SAR {selected.deductions?.toLocaleString()}</p>
            <p><strong>Net Pay:</strong> SAR {(((selected.hourlyRate||0)*8 + Number(selected.overtime?.split('h')[0]||0)*(selected.hourlyRate||0)) - (selected.deductions||0)).toLocaleString()}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={confirmPayroll}>Confirm Payroll</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Payroll Data</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select className={styles.input} value={expFormat} onChange={e=>setExpFormat(e.target.value as any)}>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Payroll Period From</label>
                <input type="date" className={styles.input} value={expPeriodFrom} onChange={e=>setExpPeriodFrom(e.target.value)}/>
              </div>
              <div className={styles.formRow}>
                <label>To</label>
                <input type="date" className={styles.input} value={expPeriodTo} onChange={e=>setExpPeriodTo(e.target.value)}/>
              </div>
              <div className={styles.formRow}>
                <label>Department</label>
                <select className={styles.input} value={expDept} onChange={e=>setExpDept(e.target.value as any)}>
                  <option>All</option>
                  <option>Reception</option>
                  <option>Housekeeping</option>
                  <option>F&B</option>
                  <option>Security</option>
                  <option>Spa</option>
                </select>
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

export default StaffSchedulingAndPayroll;
