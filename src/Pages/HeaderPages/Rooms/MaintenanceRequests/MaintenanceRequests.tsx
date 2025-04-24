// D:\operavip-ts\src\Pages\HeaderPages\Rooms\MaintenanceRequests\MaintenanceRequests.tsx
import React, { useState, useRef } from 'react'
import styles from './MaintenanceRequests.module.css'

interface MaintenanceRequest {
  id: string
  room: string
  type: string
  status: string
  priority: string
  assignedTo: string
  createdAt: string
}

const dummyData: MaintenanceRequest[] = [
  { id: '21001', room: '101', type: 'Air Conditioning', status: 'Open',       priority: 'Urgent',  assignedTo: 'Ahmed', createdAt: '12-04-2025' },
  { id: '21002', room: '305', type: 'Plumbing',           status: 'In Progress', priority: 'Medium',  assignedTo: 'Leila', createdAt: '13-04-2025' },
  { id: '21003', room: '204', type: 'Electrical Issue',   status: 'Completed',   priority: 'Normal',  assignedTo: 'Omar',  createdAt: '14-04-2025' },
]

export default function MaintenanceRequests() {
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editReq, setEditReq]   = useState<MaintenanceRequest | null>(null)

  const searchFormRef = useRef<HTMLFormElement>(null)
  const newFormRef    = useRef<HTMLFormElement>(null)
  const editFormRef   = useRef<HTMLFormElement>(null)

  const handleSearch = () => {
    alert('Search functionality is not implemented in this demo.')
  }
  const handleReset = () => {
    searchFormRef.current?.reset()
    alert('Search form reset (demo).')
  }

  const handleAddNew = () => {
    setShowNew(true)
    setShowEdit(false)
  }
  const handleSubmitNew = () => {
    const room = (newFormRef.current?.elements.namedItem('room') as HTMLInputElement)?.value
    const type = (newFormRef.current?.elements.namedItem('type') as HTMLSelectElement)?.value
    const staff = (newFormRef.current?.elements.namedItem('assignedTo') as HTMLSelectElement)?.value
    if (!room) {
      alert('⚠️ Please enter a valid Room Number.')
      return
    }
    if (!type) {
      alert('⚠️ Please select a Request Type.')
      return
    }
    if (!staff) {
      alert('⚠️ Please assign a staff.')
      return
    }
    alert('✅ New maintenance request submitted (demo).')
    newFormRef.current?.reset()
    setShowNew(false)
  }
  const handleCancelNew = () => {
    newFormRef.current?.reset()
    setShowNew(false)
  }

  const handleEditClick = (req: MaintenanceRequest) => {
    setEditReq(req)
    setShowEdit(true)
    setShowNew(false)
  }
  const handleUpdateEdit = () => {
    const staff = (editFormRef.current?.elements.namedItem('assignedTo') as HTMLSelectElement)?.value
    const status = (editFormRef.current?.elements.namedItem('status') as HTMLSelectElement)?.value
    if (!staff && status !== 'Open') {
      alert('⚠️ Please assign a staff before updating the status.')
      return
    }
    alert('🔄 Maintenance request updated (demo).')
    editFormRef.current?.reset()
    setShowEdit(false)
  }
  const handleCancelEdit = () => {
    editFormRef.current?.reset()
    setShowEdit(false)
  }

  function parseStatus(text: string) {
    const t = text.toLowerCase()
    if (t.includes('open')) return 'Open'
    if (t.includes('in progress')) return 'In Progress'
    if (t.includes('completed')) return 'Completed'
    return ''
  }
  function parsePriority(text: string) {
    const t = text.toLowerCase()
    if (t.includes('urgent')) return 'Urgent'
    if (t.includes('medium')) return 'Medium'
    if (t.includes('normal')) return 'Normal'
    return ''
  }

  return (
    <div className={styles.mainContainer}>
      {/* Header & Breadcrumb */}
      <div className={styles.pageHeader}>
        <h1>Maintenance Requests</h1>
        <nav className={styles.breadcrumb}>Home &gt; Rooms &gt; Maintenance Requests</nav>
      </div>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <h2>Search for Maintenance Requests</h2>
        <form ref={searchFormRef} id="searchForm" className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchRoomNumber">Room Number</label>
              <input type="number" id="searchRoomNumber" placeholder="Enter room number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchRequestId">Request ID</label>
              <input type="number" id="searchRequestId" placeholder="Enter request ID" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchRequestType">Request Type</label>
              <select id="searchRequestType">
                <option value="">-- Select --</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>HVAC</option>
                <option>Furniture</option>
                <option>Internet</option>
                <option>Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchStatus">Status</label>
              <select id="searchStatus">
                <option value="">-- Select --</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchPriority">Priority Level</label>
              <select id="searchPriority">
                <option value="">-- Select --</option>
                <option>Normal</option>
                <option>Medium</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={handleSearch} className={styles.searchBtn}>🔍 Search</button>
            <button type="button" onClick={handleReset}  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Requests List */}
      <section className={styles.requestsListSection}>
        <h2>Maintenance Requests List</h2>
        <button onClick={handleAddNew} className={styles.addRequestBtn}>➕ Add New Request</button>
        <table className={styles.requestsTable}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Room</th>
              <th>Type</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.room}</td>
                <td>{req.type}</td>
                <td className={styles[`status${req.status.replace(' ','')}`]}>
                  {req.status === 'Open' ? '🔴 ' : req.status === 'In Progress' ? '🟡 ' : '🟢 '}
                  {req.status}
                </td>
                <td className={styles[`priority${req.priority}`]}>
                  {req.priority === 'Urgent' ? '🔥 ' : req.priority === 'Medium' ? '⚠️ ' : '✅ '}
                  {req.priority}
                </td>
                <td>{req.assignedTo}</td>
                <td>{req.createdAt}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(req)}
                    className={styles.actionBtn}
                  >View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* New Request Form */}
      {showNew && (
        <section className={styles.newRequestSection}>
          <h2>Add New Maintenance Request</h2>
          <form ref={newFormRef} id="newRequestForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newRoomNumber">Room Number</label>
                <input name="room" type="number" id="newRoomNumber" placeholder="Enter room number" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newRequestType">Request Type</label>
                <select name="type" id="newRequestType">
                  <option value="">-- Select --</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>HVAC</option>
                  <option>Furniture</option>
                  <option>Internet</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newPriority">Priority Level</label>
                <select name="priority" id="newPriority">
                  <option value="">-- Select --</option>
                  <option>Normal</option>
                  <option>Medium</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newNotes">Additional Notes</label>
                <textarea name="notes" id="newNotes" rows={3} placeholder="Enter any additional notes" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newAssignedTo">Assigned To</label>
                <select name="assignedTo" id="newAssignedTo">
                  <option value="">-- Select Staff --</option>
                  <option>Ahmed</option><option>Leila</option><option>Omar</option><option>Fatima</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newStatus">Status</label>
                <input name="status" type="text" id="newStatus" value="Open" readOnly />
              </div>
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleSubmitNew} className={styles.submitBtn}>✅ Submit Request</button>
              <button type="button" onClick={handleCancelNew} className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </form>
        </section>
      )}

      {/* Edit Request Form */}
      {showEdit && editReq && (
        <section className={styles.editRequestSection}>
          <h2>Update Maintenance Request</h2>
          <form ref={editFormRef} id="editRequestForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Request ID</label>
                <input name="id" value={editReq.id} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Room Number</label>
                <input name="room" value={editReq.room} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Request Type</label>
                <input name="type" value={editReq.type} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editPriority">Priority Level</label>
                <select name="priority" id="editPriority" defaultValue={editReq.priority}>
                  <option>Normal</option><option>Medium</option><option>Urgent</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="editAssignedTo">Assigned To</label>
                <select name="assignedTo" id="editAssignedTo" defaultValue={editReq.assignedTo}>
                  <option value="">-- Select Staff --</option>
                  <option>Ahmed</option><option>Leila</option><option>Omar</option><option>Fatima</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editStatus">Status</label>
                <select name="status" id="editStatus" defaultValue={editReq.status}>
                  <option>Open</option><option>In Progress</option><option>Completed</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="editCompletionNotes">Completion Notes (if Completed)</label>
              <textarea name="notes" id="editCompletionNotes" rows={3} placeholder="Enter completion details" />
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleUpdateEdit} className={styles.updateBtn}>🔄 Update Request</button>
              <button type="button" onClick={handleCancelEdit} className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </form>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Maintenance Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Status</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>🟢 Completed</td><td>28</td></tr>
            <tr><td>🟡 In Progress</td><td>15</td></tr>
            <tr><td>🔴 Open</td><td>10</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
