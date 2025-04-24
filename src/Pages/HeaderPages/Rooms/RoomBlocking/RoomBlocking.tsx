// D:\operavip-ts\src\Pages\HeaderPages\Rooms\RoomBlocking\RoomBlocking.tsx
import React, { useState, useRef } from 'react'
import styles from './RoomBlocking.module.css'

interface Block {
  id: string
  room: string
  type: string
  status: string
  start: string
  end: string
  reason: string
}

const dummyData: Block[] = [
  { id: '301', room: '101', type: 'OOO', status: 'Active',   start: '12-04-2025', end: '15-04-2025', reason: 'AC Malfunction' },
  { id: '302', room: '305', type: 'OOS', status: 'Resolved', start: '10-04-2025', end: '11-04-2025', reason: 'Deep Cleaning' },
  { id: '303', room: '204', type: 'OOO', status: 'Active',   start: '13-04-2025', end: '16-04-2025', reason: 'Major Plumbing Issue' },
]

export default function RoomBlocking() {
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editBlock, setEditBlock] = useState<Block | null>(null)

  const searchFormRef = useRef<HTMLFormElement>(null)
  const newFormRef    = useRef<HTMLFormElement>(null)
  const editFormRef   = useRef<HTMLFormElement>(null)

  // Search / Reset
  const handleSearch = () => alert('Search functionality is not implemented in this demo.')
  const handleReset  = () => {
    searchFormRef.current?.reset()
    alert('Search form reset (demo).')
  }

  // Add New
  const handleAddNew = () => { setShowNew(true); setShowEdit(false) }
  const handleSubmitNew = () => {
    const form = newFormRef.current!
    const room = (form.elements.namedItem('room') as HTMLInputElement).value
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value
    const start= (form.elements.namedItem('start') as HTMLInputElement).value
    const end  = (form.elements.namedItem('end')   as HTMLInputElement).value
    const staff= (form.elements.namedItem('staff') as HTMLSelectElement).value
    if (!room) { alert('⚠️ Please enter a valid Room Number.'); return }
    if (!type) { alert('⚠️ Please select a Block Type.'); return }
    if (!start||!end||end<start) { alert('⚠️ Please select valid dates.'); return }
    if (!staff){ alert('⚠️ Please assign maintenance staff.'); return }
    alert('✅ New block created (demo).')
    form.reset()
    setShowNew(false)
  }
  const handleCancelNew = () => { newFormRef.current?.reset(); setShowNew(false) }

  // Edit Existing
  const handleEditClick = (b: Block) => {
    setEditBlock(b); setShowEdit(true); setShowNew(false)
  }
  const handleUpdateEdit = () => {
    const form = editFormRef.current!
    const status = (form.elements.namedItem('status') as HTMLSelectElement).value
    const end    = (form.elements.namedItem('end')    as HTMLInputElement).value
    if (!end) { alert('⚠️ Please select a valid end date.'); return }
    if (status==='Resolved') {
      const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value
      if (!notes) { alert('⚠️ Please provide completion notes.'); return }
    }
    alert('🔄 Block status updated (demo).')
    form.reset()
    setShowEdit(false)
  }
  const handleCancelEdit = () => { editFormRef.current?.reset(); setShowEdit(false) }

  // Helpers
  const parseStatus = (t: string) => t.includes('Active') ? 'Active' : 'Resolved'

  return (
    <div className={styles.mainContainer}>
      {/* Header & Breadcrumb */}
      <div className={styles.pageHeader}>
        <h1>Room Blocking (Out of Order)</h1>
        <nav className={styles.breadcrumb}>Home &gt; Rooms &gt; Room Blocking (Out of Order)</nav>
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>Search for Blocked Rooms</h2>
        <form ref={searchFormRef} className={styles.form} id="searchForm">
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchRoomNumber">Room Number</label>
              <input type="number" id="searchRoomNumber" placeholder="Enter room number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchBlockType">Block Type</label>
              <select id="searchBlockType">
                <option value="">-- Select --</option>
                <option value="OOO">Out of Order (OOO)</option>
                <option value="OOS">Out of Service (OOS)</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchStatus">Status</label>
              <select id="searchStatus">
                <option value="">-- Select --</option>
                <option>Active</option>
                <option>Resolved</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchStartDate">Start Date</label>
              <input type="date" id="searchStartDate" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchEndDate">End Date</label>
              <input type="date" id="searchEndDate" />
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={handleSearch} className={styles.searchBtn}>🔍 Search</button>
            <button type="button" onClick={handleReset}  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Blocked List */}
      <section className={styles.blockedListSection}>
        <h2>Blocked Rooms List</h2>
        <button onClick={handleAddNew} className={styles.addBlockBtn}>➕ Block a Room</button>
        <table className={styles.blockedTable}>
          <thead>
            <tr>
              <th>Block ID</th><th>Room</th><th>Type</th><th>Status</th>
              <th>Start Date</th><th>End Date</th><th>Reason</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(b => (
              <tr key={b.id} data-blockid={b.id}>
                <td>{b.id}</td><td>{b.room}</td><td>{b.type==='OOO'?'Out of Order':'Out of Service'}</td>
                <td className={styles[`status${b.status}`]}>
                  {b.status==='Active'?'🔴 ':'🟡 '}{b.status}
                </td>
                <td>{b.start}</td><td>{b.end}</td><td>{b.reason}</td>
                <td>
                  <button onClick={()=>handleEditClick(b)} className={styles.actionBtn}>View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* New Block */}
      {showNew && (
        <section className={styles.newBlockSection}>
          <h2>Block a Room (Out of Order / Service)</h2>
          <form ref={newFormRef} id="newBlockForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newRoomNumber">Room Number</label>
                <input name="room" type="number" id="newRoomNumber" placeholder="Enter room number" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newBlockType">Block Type</label>
                <select name="type" id="newBlockType">
                  <option value="">-- Select --</option>
                  <option value="OOO">Out of Order (OOO)</option>
                  <option value="OOS">Out of Service (OOS)</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newStart">Start Date</label>
                <input name="start" type="date" id="newStartDate" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newEnd">End Date</label>
                <input name="end" type="date" id="newEndDate" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newReason">Reason</label>
                <textarea name="reason" id="newReason" rows={3} placeholder="Enter reason" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newStaff">Assigned To</label>
                <select name="staff" id="newAssignedTo">
                  <option value="">-- Select Staff --</option>
                  <option>Ahmed</option><option>Leila</option><option>Omar</option><option>Fatima</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Status</label>
                <input name="status" type="text" value="Active" readOnly />
              </div>
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleSubmitNew} className={styles.submitBtn}>✅ Confirm Blocking</button>
              <button type="button" onClick={handleCancelNew} className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </form>
        </section>
      )}

      {/* Edit Block */}
      {showEdit && editBlock && (
        <section className={styles.editBlockSection}>
          <h2>Update / Unblock Room</h2>
          <form ref={editFormRef} id="editBlockForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Block ID</label>
                <input name="id" value={editBlock.id} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Room Number</label>
                <input name="room" value={editBlock.room} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Block Type</label>
                <input name="type" value={editBlock.type==='OOO'?'Out of Order':'Out of Service'} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select name="status" defaultValue={editBlock.status}>
                  <option>Active</option><option>Resolved</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Start Date</label>
                <input name="start" type="date" value={editBlock.start.split('-').reverse().join('-')} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>End Date</label>
                <input name="end" type="date" defaultValue={editBlock.end.split('-').reverse().join('-')} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Reason</label>
              <textarea name="reason" defaultValue={editBlock.reason} rows={2} />
            </div>
            <div className={styles.formGroup}>
              <label>Completion Notes (if Resolved)</label>
              <textarea name="notes" rows={3} placeholder="Enter completion details" />
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleUpdateEdit} className={styles.updateBtn}>🔄 Update Block Status</button>
              <button type="button" onClick={handleCancelEdit} className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </form>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Room Blocking Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Block Type / Status</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>🔴 Out of Order (OOO)</td><td>12</td></tr>
            <tr><td>🟡 Out of Service (OOS)</td><td>8</td></tr>
            <tr><td>🟢 Reinstated (Unblocked)</td><td>5</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
