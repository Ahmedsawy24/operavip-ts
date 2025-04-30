import React, { useState, useEffect, FormEvent } from 'react';
import styles from './ManageLoyaltyPrograms.module.css';

type Level = 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
type Status = 'Active' | 'Inactive';

interface LoyaltyProgram {
  id: string;
  name: string;
  level: Level;
  pointsRequired: number;
  status: Status;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  membersCount: number;
  description: string;
}

const dummyPrograms: LoyaltyProgram[] = [
  {
    id: 'LP-1001',
    name: 'Royal Club',
    level: 'Diamond',
    pointsRequired: 50000,
    status: 'Active',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    membersCount: 120,
    description:
      'Complimentary room upgrades, late check-out, free breakfast, airport transfers.',
  },
  {
    id: 'LP-1002',
    name: 'Elite Rewards',
    level: 'Platinum',
    pointsRequired: 30000,
    status: 'Active',
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    membersCount: 250,
    description:
      'Priority reservations, welcome amenities, spa discounts, lounge access.',
  },
  {
    id: 'LP-1003',
    name: 'Gold Saver',
    level: 'Gold',
    pointsRequired: 15000,
    status: 'Inactive',
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    membersCount: 500,
    description:
      'Early check-in, complimentary Wi-Fi, room service credit.',
  },
];

const ManageLoyaltyPrograms: React.FC = () => {
  // State
  const [programs, setPrograms] = useState<LoyaltyProgram[]>(dummyPrograms);
  const [filtered, setFiltered] = useState<LoyaltyProgram[]>(dummyPrograms);

  // Search filters
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');
  const [levelFilter, setLevelFilter] = useState<'All' | Level>('All');
  const [startFilter, setStartFilter] = useState('');
  const [endFilter, setEndFilter] = useState('');

  // Modal state
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<LoyaltyProgram | null>(null);

  // Apply filters
  useEffect(() => {
    let res = programs.filter((p) => {
      if (nameFilter && !p.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (levelFilter !== 'All' && p.level !== levelFilter) return false;
      if (startFilter && p.startDate < startFilter) return false;
      if (endFilter && p.endDate > endFilter) return false;
      return true;
    });
    setFiltered(res);
  }, [nameFilter, statusFilter, levelFilter, startFilter, endFilter, programs]);

  // Handlers
  const openDetails = (prog: LoyaltyProgram) => {
    setSelected(prog);
    setDetailsOpen(true);
  };
  const closeDetails = () => setDetailsOpen(false);

  const openEdit = (prog: LoyaltyProgram) => {
    setSelected(prog);
    setEditOpen(true);
  };
  const closeEdit = () => setEditOpen(false);

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    // Basic validation
    if (selected.name.trim() === '') {
      alert('⚠️ Please enter a program name.');
      return;
    }
    if (selected.endDate < selected.startDate) {
      alert('⚠️ End Date cannot be before Start Date.');
      return;
    }
    setPrograms((prev) =>
      prev.map((p) => (p.id === selected.id ? selected : p))
    );
    setEditOpen(false);
    alert('✅ Program updated.');
  };

  const toggleStatus = (prog: LoyaltyProgram) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === prog.id
          ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
          : p
      )
    );
    alert(`✅ ${prog.id} is now ${prog.status === 'Active' ? 'Inactive' : 'Active'}.`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Manage Loyalty Programs</h1>
      <div className={styles.breadcrumb}>
        Home &gt; Guest Management &gt; Manage Loyalty Programs
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>🔎 Search Loyalty Programs</h2>
        <form
          className={styles.searchForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.fieldsGrid}>
            <div>
              <label>Program Name</label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className={styles.input}
                placeholder="Enter program name"
              />
            </div>
            <div>
              <label>Status</label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as any)
                }
                className={styles.input}
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label>Level</label>
              <select
                value={levelFilter}
                onChange={(e) =>
                  setLevelFilter(e.target.value as any)
                }
                className={styles.input}
              >
                <option>All</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
                <option>Diamond</option>
              </select>
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={startFilter}
                onChange={(e) =>
                  setStartFilter(e.target.value)
                }
                className={styles.input}
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                value={endFilter}
                onChange={(e) =>
                  setEndFilter(e.target.value)
                }
                className={styles.input}
              />
            </div>
          </div>
          <button
            className={`${styles.btn} ${styles.searchBtn}`}
          >
            🔍 Search
          </button>
        </form>
      </section>

      {/* Results */}
      <section className={styles.resultsSection}>
        <h2>Results</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  'ID',
                  'Name',
                  'Level',
                  'Points',
                  'Status',
                  'Start',
                  'End',
                  'Members',
                  'Actions',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>
                    <span
                      className={
                        styles[
                          `level${p.level}` as
                            | 'levelSilver'
                            | 'levelGold'
                            | 'levelPlatinum'
                            | 'levelDiamond'
                        ]
                      }
                    >
                      {p.level}
                    </span>
                  </td>
                  <td>{p.pointsRequired.toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        p.status === 'Active'
                          ? styles.statusActive
                          : styles.statusInactive
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>{p.startDate}</td>
                  <td>{p.endDate}</td>
                  <td>{p.membersCount}</td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.viewBtn}`}
                      onClick={() => openDetails(p)}
                    >
                      View
                    </button>
                    <button
                      className={`${styles.btn} ${styles.editBtn}`}
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.btn} ${styles.toggleBtn}`}
                      onClick={() => toggleStatus(p)}
                    >
                      {p.status === 'Active'
                        ? 'Deactivate'
                        : 'Activate'}
                    </button>
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
              Details – {selected.name} ({selected.id})
            </h2>
            <p>
              <strong>Level:</strong> {selected.level}
            </p>
            <p>
              <strong>Points Required:</strong>{' '}
              {selected.pointsRequired.toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {selected.status}
            </p>
            <p>
              <strong>Start Date:</strong> {selected.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {selected.endDate}
            </p>
            <p>
              <strong>Members:</strong> {selected.membersCount}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              {selected.description}
            </p>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.closeBtn}`}
                onClick={closeDetails}
              >
                Close
              </button>
              <button
                className={`${styles.btn} ${styles.editBtn}`}
                onClick={() => {
                  closeDetails();
                  openEdit(selected);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && selected && (
        <div
          className={styles.modalOverlay}
          onClick={closeEdit}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={closeEdit}
            >
              &times;
            </span>
            <h2>
              Edit – {selected.name} ({selected.id})
            </h2>
            <form
              onSubmit={handleEditSubmit}
              className={styles.editForm}
            >
              <label>Program Name</label>
              <input
                value={selected.name}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    name: e.target.value,
                  })
                }
                className={styles.input}
              />

              <label>Level</label>
              <select
                value={selected.level}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    level: e.target.value as Level,
                  })
                }
                className={styles.input}
              >
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
                <option>Diamond</option>
              </select>

              <label>Points Required</label>
              <input
                type="number"
                value={selected.pointsRequired}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    pointsRequired: Number(
                      e.target.value
                    ),
                  })
                }
                className={styles.input}
              />

              <label>Status</label>
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    status: e.target.value as Status,
                  })
                }
                className={styles.input}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <label>Start Date</label>
              <input
                type="date"
                value={selected.startDate}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    startDate: e.target.value,
                  })
                }
                className={styles.input}
              />

              <label>End Date</label>
              <input
                type="date"
                value={selected.endDate}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    endDate: e.target.value,
                  })
                }
                className={styles.input}
              />

              <label>Description</label>
              <textarea
                value={selected.description}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    description: e.target.value,
                  })
                }
                className={styles.input}
              />

              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.saveBtn}`}
                >
                  Save
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={closeEdit}
                >
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

export default ManageLoyaltyPrograms;
