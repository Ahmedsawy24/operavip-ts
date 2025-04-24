// D:\operavip-ts\src\Pages\HeaderPages\AR\CompanyAccounts\CompanyAccounts.tsx
import React, { useState, useRef } from 'react'
import styles from './CompanyAccounts.module.css'

interface CompanyAccount {
  id: string
  name: string
  contact: string
  outstanding: string
  expiry: string
  status: 'Active' | 'Inactive' | 'Overdue'
}

const dummyData: CompanyAccount[] = [
  { id: '1001', name: 'ABC Corporation', contact: 'John Smith', outstanding: '$1,500.00', expiry: '31-12-2025', status: 'Active' },
  { id: '1002', name: 'XYZ Holdings',    contact: 'Sarah Johnson', outstanding: '$500.00',  expiry: '15-06-2025', status: 'Overdue' },
  { id: '1003', name: 'Global Ltd.',     contact: 'Ahmed Ali',     outstanding: '$0.00',    expiry: '10-09-2025', status: 'Inactive' },
]

export default function CompanyAccounts() {
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selected, setSelected] = useState<CompanyAccount | null>(null)

  const searchFormRef   = useRef<HTMLFormElement>(null)
  const newFormRef      = useRef<HTMLFormElement>(null)
  const editFormRef     = useRef<HTMLFormElement>(null)

  // Search & Reset
  const handleSearch = () => alert('Search functionality is not implemented in this demo.')
  const handleReset  = () => {
    searchFormRef.current?.reset()
    alert('Search form reset (demo).')
  }

  // Add New
  const handleAddNew = () => { setShowNew(true); setShowEdit(false) }
  const handleSubmitNew = () => {
    const form = newFormRef.current!
    const name    = (form.elements.namedItem('companyName')   as HTMLInputElement).value.trim()
    const phone   = (form.elements.namedItem('phoneNumber')   as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('email')         as HTMLInputElement).value.trim()
    const address = (form.elements.namedItem('billingAddress')as HTMLInputElement).value.trim()
    const start   = (form.elements.namedItem('contractStartDate') as HTMLInputElement).value
    const expiry  = (form.elements.namedItem('contractExpiryDate')as HTMLInputElement).value
    const status  = (form.elements.namedItem('accountStatus')    as HTMLSelectElement).value

    if (!name) {
      alert('⚠️ Please enter a valid Company Name.')
      return
    }
    if (!validateEmail(email)) {
      alert('⚠️ Please enter a valid Email Address.')
      return
    }
    if (expiry < start) {
      alert('⚠️ Contract Expiry Date cannot be before the Start Date.')
      return
    }
    alert('✅ New company account saved (demo).')
    form.reset()
    setShowNew(false)
  }
  const handleCancelNew = () => {
    newFormRef.current?.reset()
    setShowNew(false)
  }

  // Edit Existing
  const handleEditClick = (acct: CompanyAccount) => {
    setSelected(acct)
    setShowEdit(true)
    setShowNew(false)
  }
  const handleUpdateEdit = () => {
    const form = editFormRef.current!
    const contact = (form.elements.namedItem('editContactPerson') as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('editEmail')         as HTMLInputElement).value.trim()
    const expiry  = (form.elements.namedItem('editContractExpiryDate') as HTMLInputElement).value
    if (!contact) {
      alert('⚠️ Please enter a valid Contact Person.')
      return
    }
    if (!validateEmail(email)) {
      alert('⚠️ Please enter a valid Email Address.')
      return
    }
    if (!expiry) {
      alert('⚠️ Please select a valid Contract Expiry Date.')
      return
    }
    alert('🔄 Company account updated (demo).')
    form.reset()
    setShowEdit(false)
  }
  const handleDeactivate = () => {
    alert('🛑 Deactivate account (demo).')
    editFormRef.current?.reset()
    setShowEdit(false)
  }

  // Helpers
  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }
  function convertDateToInput(ddmmyyyy: string) {
    const [d,m,y] = ddmmyyyy.split('-')
    return `${y}-${m}-${d}`
  }

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Company Accounts</h1>
        <nav className={styles.breadcrumb}>Home &gt; AR &gt; Company Accounts</nav>
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>Search for Company Accounts</h2>
        <form ref={searchFormRef} id="searchForm" className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchCompanyName">Company Name</label>
              <input type="text" id="searchCompanyName" placeholder="Enter company name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchCompanyId">Company ID</label>
              <input type="number" id="searchCompanyId" placeholder="Enter company ID" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchAccountStatus">Account Status</label>
              <select id="searchAccountStatus">
                <option value="">-- Select --</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Overdue</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchOutstanding">Outstanding Balance</label>
              <select id="searchOutstanding">
                <option value="">-- Select --</option>
                <option value="less">Less Than</option>
                <option value="more">More Than</option>
                <option value="zero">Zero</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchExpiryDate">Contract Expiry Date</label>
              <input type="date" id="searchExpiryDate" />
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={handleSearch} className={styles.searchBtn}>🔍 Search</button>
            <button type="button" onClick={handleReset}  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className={styles.accountsListSection}>
        <h2>Company Accounts List</h2>
        <button onClick={handleAddNew} className={styles.addCompanyBtn}>➕ Add New Company</button>
        <table className={styles.accountsTable}>
          <thead>
            <tr>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Contact Person</th>
              <th>Outstanding Balance</th>
              <th>Contract Expiry</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(acct => (
              <tr key={acct.id} data-companyid={acct.id}>
                <td>{acct.id}</td>
                <td>{acct.name}</td>
                <td>{acct.contact}</td>
                <td>{acct.outstanding}</td>
                <td>{acct.expiry}</td>
                <td className={styles[`status${acct.status}`]}>
                  {acct.status === 'Active' ? '🟢 ' : acct.status === 'Overdue' ? '🟡 ' : '🔴 '}
                  {acct.status}
                </td>
                <td>
                  <button onClick={() => handleEditClick(acct)} className={styles.actionBtn}>View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* New Company Form */}
      {showNew && (
        <section className={styles.newCompanySection}>
          <h2>Add New Company Account</h2>
          <form ref={newFormRef} id="newCompanyForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name</label>
                <input name="companyName" type="text" id="companyName" placeholder="Enter company name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="companyId">Company ID</label>
                <input name="companyId" type="text" id="companyId" placeholder="Auto-generated" readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="contactPerson">Contact Person</label>
                <input name="contactPerson" type="text" id="contactPerson" placeholder="Enter contact person" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input name="phoneNumber" type="number" id="phoneNumber" placeholder="Enter phone number" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" id="email" placeholder="Enter email address" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="billingAddress">Billing Address</label>
                <input name="billingAddress" type="text" id="billingAddress" placeholder="Enter billing address" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="outstandingBalance">Outstanding Balance</label>
                <input name="outstandingBalance" type="number" id="outstandingBalance" placeholder="Enter outstanding balance" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contractStartDate">Contract Start Date</label>
                <input name="contractStartDate" type="date" id="contractStartDate" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contractExpiryDate">Contract Expiry Date</label>
                <input name="contractExpiryDate" type="date" id="contractExpiryDate" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="accountStatus">Account Status</label>
                <select name="accountStatus" id="accountStatus" required>
                  <option value="">-- Select --</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleSubmitNew} className={styles.submitBtn}>✅ Save Company Account</button>
              <button type="button" onClick={handleCancelNew}  className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </form>
        </section>
      )}

      {/* Edit Company Form */}
      {showEdit && selected && (
        <section className={styles.editCompanySection}>
          <h2>Update Company Account</h2>
          <form ref={editFormRef} id="editCompanyForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Company ID</label>
                <input name="editCompanyId" type="text" value={selected.id} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input name="editCompanyName" type="text" value={selected.name} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="editContactPerson">Contact Person</label>
                <input name="editContactPerson" type="text" defaultValue={selected.contact} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editPhoneNumber">Phone Number</label>
                <input name="editPhoneNumber" type="number" id="editPhoneNumber" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="editEmail">Email</label>
                <input name="editEmail" type="text" id="editEmail" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editBillingAddress">Billing Address</label>
                <input name="editBillingAddress" type="text" id="editBillingAddress" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Outstanding Balance</label>
                <input name="editOutstandingBalance" type="number" value={parseFloat(selected.outstanding.replace(/[$,]/g,''))} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editContractExpiryDate">Contract Expiry Date</label>
                <input name="editContractExpiryDate" type="date" id="editContractExpiryDate" defaultValue={convertDateToInput(selected.expiry)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editAccountStatus">Account Status</label>
                <select name="editAccountStatus" id="editAccountStatus" defaultValue={selected.status} required>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleUpdateEdit}   className={styles.updateBtn}>🔄 Update Account</button>
              <button type="button" onClick={handleDeactivate} className={styles.cancelBtn}>🛑 Deactivate Account</button>
            </div>
          </form>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Company Accounts Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Account Status</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>🟢 Active</td><td>25</td></tr>
            <tr><td>🟡 Overdue</td><td>10</td></tr>
            <tr><td>🔴 Inactive</td><td>5</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
