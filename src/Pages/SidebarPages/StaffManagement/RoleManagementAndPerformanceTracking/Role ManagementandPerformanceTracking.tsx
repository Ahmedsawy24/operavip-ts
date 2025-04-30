import React, { useState, FormEvent } from 'react';
import styles from './RoleManagementPerformance.module.css';

type Role =
  | 'Manager'
  | 'Supervisor'
  | 'Receptionist'
  | 'Housekeeper'
  | 'Chef'
  | 'Waiter'
  | 'Security';
type Performance = 'Excellent' | 'Good' | 'Average' | 'Poor';

interface Employee {
  id: string;
  name: string;
  department: string;
  role: Role;
  hiredDate: string;           // YYYY-MM-DD
  lastEvaluation: string;      // YYYY-MM-DD
  performance: Performance;
  email: string;
  phone: string;
  notes?: string;
}

const dummyEmployees: Employee[] = [
  {
    id: 'EMP-201',
    name: 'Ahmed Yassin',
    department: 'Reception',
    role: 'Manager',
    hiredDate: '2020-04-15',
    lastEvaluation: '2025-05-30',
    performance: 'Excellent',
    email: 'ahmed.yassin@example.com',
    phone: '+90 555 123 4567',
    notes: 'Consistently exceeds targets.'
  },
  {
    id: 'EMP-202',
    name: 'Sarah Johnson',
    department: 'F&B',
    role: 'Supervisor',
    hiredDate: '2019-11-20',
    lastEvaluation: '2025-05-28',
    performance: 'Good',
    email: 'sarah.johnson@example.com',
    phone: '+90 555 234 5678'
  },
  {
    id: 'EMP-203',
    name: 'Omar Hussein',
    department: 'Housekeeping',
    role: 'Housekeeper',
    hiredDate: '2021-02-10',
    lastEvaluation: '2025-05-20',
    performance: 'Average',
    email: 'omar.hussein@example.com',
    phone: '+90 555 345 6789'
  },
  {
    id: 'EMP-204',
    name: 'Ali Abdullah',
    department: 'Security',
    role: 'Security',
    hiredDate: '2018-07-01',
    lastEvaluation: '2025-05-15',
    performance: 'Poor',
    email: 'ali.abdullah@example.com',
    phone: '+90 555 456 7890',
    notes: 'Needs additional training.'
  }
];

const RoleManagementPerformance: React.FC = () => {
  // Filters
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | Role>('All');
  const [perfFilter, setPerfFilter] = useState<'All' | Performance>('All');

  // Data
  const [filtered, setFiltered] = useState<Employee[]>(dummyEmployees);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [evalOpen, setEvalOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  // Edit Role form
  const [editRole, setEditRole] = useState<Role>('Manager');
  const [editDept, setEditDept] = useState<string>('Reception');
  const [editDate, setEditDate] = useState('');
  const [editReason, setEditReason] = useState('');

  // Eval form
  const [evalDate, setEvalDate] = useState('');
  const [evalBy, setEvalBy] = useState('');
  const [evalRating, setEvalRating] = useState<Performance>('Excellent');
  const [evalStrengths, setEvalStrengths] = useState('');
  const [evalImprovements, setEvalImprovements] = useState('');

  // Export form
  const [expFormat, setExpFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
  const [expDept, setExpDept] = useState<'All' | string>('All');
  const [expPerf, setExpPerf] = useState<'All' | Performance>('All');

  // Overview card counts
  const total = dummyEmployees.length;
  const excellent = dummyEmployees.filter(e => e.performance === 'Excellent').length;
  const good = dummyEmployees.filter(e => e.performance === 'Good').length;
  const avg = dummyEmployees.filter(e => e.performance === 'Average').length;
  const poor = dummyEmployees.filter(e => e.performance === 'Poor').length;

  // Apply/reset filters
  const applyFilters = () => {
    let res = dummyEmployees;
    if (nameFilter) res = res.filter(e => e.name.toLowerCase().includes(nameFilter.toLowerCase()));
    if (roleFilter !== 'All') res = res.filter(e => e.role === roleFilter);
    if (perfFilter !== 'All') res = res.filter(e => e.performance === perfFilter);
    setFiltered(res);
  };
  const resetFilters = () => {
    setNameFilter(''); setRoleFilter('All'); setPerfFilter('All');
    setFiltered(dummyEmployees);
  };

  // Open modals
  const openDetail = (e: Employee) => { setSelected(e); setDetailOpen(true); };
  const openEdit = (e: Employee) => {
    setSelected(e);
    setEditRole(e.role);
    setEditDept(e.department);
    setEditDate('');
    setEditReason('');
    setEditOpen(true);
  };
  const openEval = (e: Employee) => {
    setSelected(e);
    setEvalDate('');
    setEvalBy('');
    setEvalRating('Excellent');
    setEvalStrengths('');
    setEvalImprovements('');
    setEvalOpen(true);
  };
  const openExport = () => setExportOpen(true);

  // Close all
  const closeAll = () => {
    setDetailOpen(false);
    setEditOpen(false);
    setEvalOpen(false);
    setExportOpen(false);
    setSelected(null);
  };

  // Handle edit role
  const handleEditSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editDate || !editReason) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Employee role updated successfully!');
    closeAll();
  };

  // Handle evaluation submit
  const handleEvalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!evalDate || !evalBy || !evalStrengths || !evalImprovements) {
      alert('⚠️ Please complete all required fields!');
      return;
    }
    alert('✅ Performance evaluation submitted successfully!');
    closeAll();
  };

  // Handle export
  const handleExport = (e: FormEvent) => {
    e.preventDefault();
    alert('✅ Performance report exported successfully!');
    closeAll();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.pageTitle}>Role Management and Performance Tracking</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Staff Management &gt; Role Management and Performance Tracking
      </div>

      {/* Filters */}
      <section className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>🔎 Filter Employee Roles & Performance</h2>
        <div className={styles.filterGrid}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Employee Name"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
          <select
            className={styles.input}
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Manager</option>
            <option>Supervisor</option>
            <option>Receptionist</option>
            <option>Housekeeper</option>
            <option>Chef</option>
            <option>Waiter</option>
            <option>Security</option>
          </select>
          <select
            className={styles.input}
            value={perfFilter}
            onChange={e => setPerfFilter(e.target.value as any)}
          >
            <option>All</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
        </div>
        <button className={`${styles.btn} ${styles.applyBtn}`} onClick={applyFilters}>
          🔎 Apply Filters
        </button>
        <button className={`${styles.btn} ${styles.resetBtn}`} onClick={resetFilters}>
          🔄 Reset
        </button>
        <button className={`${styles.btn} ${styles.exportBtn}`} onClick={openExport}>
          📤 Export Performance Reports
        </button>
      </section>

      {/* Overview Cards */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>📊 Performance Overview</h2>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <div>Total Employees</div>
            <div className={styles.cardValue}>{total}</div>
          </div>
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <div>Excellent</div>
            <div className={styles.cardValue}>{excellent}</div>
          </div>
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <div>Good</div>
            <div className={styles.cardValue}>{good}</div>
          </div>
          <div className={`${styles.card} ${styles.cardOrange}`}>
            <div>Needs Improvement</div>
            <div className={styles.cardValue}>{avg + poor}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>🗃️ Detailed Employee Performance</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Last Evaluation</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                  <td>{emp.lastEvaluation}</td>
                  <td>
                    <span
                      className={
                        emp.performance === 'Excellent' ? styles.badgeGreen :
                        emp.performance === 'Good'      ? styles.badgeBlue  :
                        emp.performance === 'Average'   ? styles.badgeOrange:
                                                          styles.badgeRed
                      }
                    >
                      {emp.performance === 'Excellent'
                        ? '🟢 Excellent'
                        : emp.performance === 'Good'
                        ? '🔵 Good'
                        : emp.performance === 'Average'
                        ? '🟠 Average'
                        : '🔴 Poor'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetail(emp)}
                    >
                      View
                    </button>
                    <button
                      className={`${styles.btn} ${styles.editBtn}`}
                      onClick={() => openEdit(emp)}
                    >
                      Edit Role
                    </button>
                    <button
                      className={`${styles.btn} ${styles.evaluateBtn}`}
                      onClick={() => openEval(emp)}
                    >
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Employee Details Modal */}
      {detailOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📝 Employee Details – {selected.name} ({selected.id})</h2>
            <p><strong>Role:</strong> {selected.role}</p>
            <p><strong>Dept:</strong> {selected.department}</p>
            <p><strong>Hired:</strong> {selected.hiredDate}</p>
            <p><strong>Last Eval:</strong> {selected.lastEvaluation}</p>
            <p><strong>Performance:</strong> {selected.performance}</p>
            <p><strong>Contact:</strong> {selected.email} | {selected.phone}</p>
            <p><strong>Notes:</strong> {selected.notes || '–'}</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>✏️ Edit Employee Role – {selected.name} ({selected.id})</h2>
            <form className={styles.form} onSubmit={handleEditSave}>
              <div className={styles.formRow}>
                <label>Current Role</label>
                <select
                  className={styles.input}
                  value={editRole}
                  onChange={e=>setEditRole(e.target.value as Role)}
                >
                  <option>Manager</option><option>Supervisor</option><option>Receptionist</option>
                  <option>Housekeeper</option><option>Chef</option><option>Waiter</option><option>Security</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Department</label>
                <select
                  className={styles.input}
                  value={editDept}
                  onChange={e=>setEditDept(e.target.value)}
                >
                  <option>Reception</option><option>Housekeeping</option><option>F&B</option>
                  <option>Security</option><option>Spa</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Effective Date</label>
                <input type="date" className={styles.input} value={editDate} onChange={e=>setEditDate(e.target.value)}/>
              </div>
              <div className={styles.formRow}>
                <label>Reason for Change</label>
                <textarea
                  className={styles.input}
                  value={editReason}
                  onChange={e=>setEditReason(e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.confirmBtn}`}>Save Changes</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {evalOpen && selected && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📋 Performance Evaluation – {selected.name} ({selected.id})</h2>
            <form className={styles.form} onSubmit={handleEvalSubmit}>
              <div className={styles.formRow}>
                <label>Evaluation Date</label>
                <input type="date" className={styles.input} value={evalDate} onChange={e=>setEvalDate(e.target.value)}/>
              </div>
              <div className={styles.formRow}>
                <label>Evaluator Name</label>
                <input type="text" className={styles.input} value={evalBy} onChange={e=>setEvalBy(e.target.value)}/>
              </div>
              <div className={styles.formRow}>
                <label>Performance Rating</label>
                <select
                  className={styles.input}
                  value={evalRating}
                  onChange={e=>setEvalRating(e.target.value as Performance)}
                >
                  <option>Excellent</option><option>Good</option><option>Average</option><option>Poor</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Strengths</label>
                <textarea className={styles.input} value={evalStrengths} onChange={e=>setEvalStrengths(e.target.value)}/>
              </div>
              <div className={styles.formRow}>
                <label>Areas of Improvement</label>
                <textarea className={styles.input} value={evalImprovements} onChange={e=>setEvalImprovements(e.target.value)}/>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={`${styles.btn} ${styles.evaluateBtn}`}>Submit Evaluation</button>
                <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className={styles.modalOverlay} onClick={closeAll}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <span className={styles.close} onClick={closeAll}>&times;</span>
            <h2>📤 Export Performance Reports</h2>
            <form className={styles.form} onSubmit={handleExport}>
              <div className={styles.formRow}>
                <label>File Format</label>
                <select className={styles.input} value={expFormat} onChange={e=>setExpFormat(e.target.value as any)}>
                  <option>PDF</option><option>Excel</option><option>CSV</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Department</label>
                <select className={styles.input} value={expDept} onChange={e=>setExpDept(e.target.value)}>
                  <option>All</option><option>Reception</option><option>Housekeeping</option>
                  <option>F&B</option><option>Security</option><option>Spa</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Performance Level</label>
                <select className={styles.input} value={expPerf} onChange={e=>setExpPerf(e.target.value as any)}>
                  <option>All</option><option>Excellent</option><option>Good</option>
                  <option>Average</option><option>Poor</option>
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

export default RoleManagementPerformance;
