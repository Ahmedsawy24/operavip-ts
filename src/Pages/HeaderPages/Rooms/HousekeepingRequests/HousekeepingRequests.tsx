import React, { useState, useRef } from 'react'
import styles from './HousekeepingRequests.module.css'

interface Request {
  id: string
  room: string
  guest: string
  type: string
  status: string
  priority: string
  assignedTo: string
}

const dummyData: Request[] = [
  { id: '12001', room: '101', guest: 'Abdullah Alhammami', type: 'Deep Cleaning', status: 'Open',    priority: 'Urgent', assignedTo: 'Ahmed' },
  { id: '12002', room: '305', guest: 'Ahmed Mohamed',       type: 'Towel Replacement', status: 'In Progress', priority: 'Medium', assignedTo: 'Leila' },
  { id: '12003', room: '204', guest: '-',                    type: 'Standard Cleaning', status: 'Completed',  priority: 'Normal', assignedTo: 'Omar' },
]

export default function HousekeepingRequests() {
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editReq, setEditReq] = useState<Request | null>(null)
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
    if (!newFormRef.current?.room.value) {
      alert('⚠️ Please enter a valid Room Number.')
      return
    }
    if (!newFormRef.current?.type.value) {
      alert('⚠️ Please select a Request Type.')
      return
    }
    alert('✅ New housekeeping request submitted (demo).')
    newFormRef.current.reset()
    setShowNew(false)
  }
  const handleCancelNew = () => {
    newFormRef.current?.reset()
    setShowNew(false)
  }

  const handleEditClick = (req: Request) => {
    setEditReq(req)
    setShowEdit(true)
    setShowNew(false)
  }
  const handleUpdateEdit = () => {
    if (!editFormRef.current?.assignedTo.value && editFormRef.current?.status.value !== 'Open') {
      alert('⚠️ Please assign a housekeeping staff before updating the status.')
      return
    }
    alert('🔄 Housekeeping request updated (demo).')
    editFormRef.current.reset()
    setShowEdit(false)
  }
  const handleCancelEdit = () => {
    editFormRef.current?.reset()
    setShowEdit(false)
  }

  return (
    <div className={styles.mainContainer}>
      {/* Header & Breadcrumb */}
      <div className={styles.pageHeader}>
        <h1>Housekeeping Requests</h1>
        <nav className={styles.breadcrumb}>Home &gt; Rooms &gt; Housekeeping Requests</nav>
      </div>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <h2>Search for Housekeeping Requests</h2>
        <form ref={searchFormRef} className={styles.form} id="searchForm">
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchRoomNumber">Room Number</label>
              <input type="number" id="searchRoomNumber" placeholder="Enter room number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchGuestName">Guest Name</label>
              <input type="text" id="searchGuestName" placeholder="Enter guest name" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchRequestType">Request Type</label>
              <select id="searchRequestType">
                <option value="">-- Select --</option>
                <option>Daily Cleaning</option>
                <option>Quick Cleaning</option>
                <option>Towel Replacement</option>
                <option>Extra Disinfection</option>
                <option>Post-Checkout Cleaning</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchStatus">Request Status</label>
              <select id="searchStatus">
                <option value="">-- Select --</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
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
        <h2>Housekeeping Requests List</h2>
        <button onClick={handleAddNew} className={styles.addRequestBtn}>➕ Add New Request</button>
        <table className={styles.requestsTable}>
          <thead>
            <tr>
              <th>Request ID</th><th>Room</th><th>Guest</th><th>Type</th>
              <th>Status</th><th>Priority</th><th>Assigned To</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.room}</td>
                <td>{req.guest}</td>
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
                <td>
                  <button
                    onClick={() => handleEditClick(req)}
                    className={styles.actionBtn}
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* New Request Form */}
      {showNew && (
        <section className={styles.newRequestSection}>
          <h2>Add New Housekeeping Request</h2>
          <form ref={newFormRef} id="newRequestForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newRoomNumber">Room Number</label>
                <input name="room" type="number" id="newRoomNumber" placeholder="Enter room number" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newGuestName">Guest Name (Optional)</label>
                <input name="guest" type="text" id="newGuestName" placeholder="Enter guest name" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="newRequestType">Request Type</label>
                <select name="type" id="newRequestType">
                  <option value="">-- Select --</option>
                  <option>Daily Cleaning</option>
                  <option>Quick Cleaning</option>
                  <option>Towel Replacement</option>
                  <option>Extra Disinfection</option>
                  <option>Post-Checkout Cleaning</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newPriority">Priority Level</label>
                <select name="priority" id="newPriority">
                  <option>Normal</option>
                  <option>Medium</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newNotes">Additional Notes</label>
              <textarea name="notes" id="newNotes" rows={3} placeholder="Enter any additional notes" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newAssignedTo">Assigned To</label>
              <select name="assignedTo" id="newAssignedTo">
                <option value="">-- Select Staff --</option>
                <option>Ahmed</option><option>Leila</option><option>Omar</option><option>Fatima</option>
              </select>
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
          <h2>Update Housekeeping Request</h2>
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
                <label>Guest Name</label>
                <input name="guest" value={editReq.guest} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Request Type</label>
                <input name="type" value={editReq.type} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="editPriority">Priority Level</label>
                <select name="priority" id="editPriority" defaultValue={editReq.priority}>
                  <option>Normal</option><option>Medium</option><option>Urgent</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editAssignedTo">Assigned To</label>
                <select name="assignedTo" id="editAssignedTo" defaultValue={editReq.assignedTo}>
                  <option value="">-- Select Staff --</option>
                  <option>Ahmed</option><option>Leila</option><option>Omar</option><option>Fatima</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="editStatus">Request Status</label>
              <select name="status" id="editStatus" defaultValue={editReq.status}>
                <option>Open</option><option>In Progress</option><option>Completed</option>
              </select>
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
        <h2>Housekeeping Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Status</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>🟢 Completed</td><td>35</td></tr>
            <tr><td>🟡 In Progress</td><td>12</td></tr>
            <tr><td>🔴 Open</td><td>7</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
