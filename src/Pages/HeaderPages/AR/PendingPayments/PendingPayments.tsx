// D:\operavip-ts\src\Pages\HeaderPages\AR\PendingPayments\PendingPayments.tsx
import React, { useState, useRef } from 'react'
import styles from './PendingPayments.module.css'

interface Payment {
  invoice: string
  guest:   string
  reservation: string
  amountDue: string
  dueDate:   string
  status:    'Unpaid' | 'Partially Paid' | 'Overdue'
}

const dummyData: Payment[] = [
  { invoice: '987654', guest: 'Abdullah Alhammami', reservation: '342109', amountDue: '$350.00', dueDate: '15-04-2025', status: 'Unpaid' },
  { invoice: '987655', guest: 'Ahmed Mohamed',       reservation: '342210', amountDue: '$120.00', dueDate: '13-04-2025', status: 'Partially Paid' },
  { invoice: '987656', guest: 'Lina Khaled',         reservation: '342315', amountDue: '$500.00', dueDate: '10-04-2025', status: 'Overdue' },
]

export default function PendingPayments() {
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<Payment | null>(null)
  const [payNow, setPayNow] = useState<number>(0)
  const [remaining, setRemaining] = useState<string>('')

  const searchFormRef = useRef<HTMLFormElement>(null)
  const paymentFormRef = useRef<HTMLFormElement>(null)

  const handleSearch = () => {
    alert('Search functionality is not implemented in this demo.')
  }
  const handleReset = () => {
    searchFormRef.current?.reset()
    alert('Search form reset (demo).')
  }

  const handleRowClick = (p: Payment) => {
    setSelected(p)
    setShowForm(true)
    setPayNow(0)
    setRemaining(p.amountDue)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paid = parseFloat(e.target.value) || 0
    setPayNow(paid)
    const due = parseFloat((selected?.amountDue.replace('$','') ?? '0')) || 0
    const rem = due - paid
    setRemaining(`$${(rem > 0 ? rem : 0).toFixed(2)}`)
  }

  const handleProcess = () => {
    if (!selected) return
    if (payNow <= 0) {
      alert('⚠️ Please enter a valid amount.')
      return
    }
    const due = parseFloat(selected.amountDue.replace('$','')) || 0
    if (payNow > due) {
      alert('⚠️ Payment amount cannot exceed the outstanding balance.')
      return
    }
    const method = (document.getElementById('paymentMethod') as HTMLSelectElement).value
    const txref = (document.getElementById('transactionRef') as HTMLInputElement).value
    if ((method === 'Credit Card' || method === 'Bank Transfer') && !txref) {
      alert('⚠️ Please enter a transaction reference for this payment method.')
      return
    }
    alert('✅ Payment processed (demo).')
    paymentFormRef.current?.reset()
    setShowForm(false)
  }

  const handleCancel = () => {
    paymentFormRef.current?.reset()
    setShowForm(false)
  }

  return (
    <div className={styles.mainContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1>Pending Payments</h1>
        <nav className={styles.breadcrumb}>Home &gt; AR &gt; Pending Payments</nav>
      </div>

      {/* Search */}
      <section className={styles.searchSection}>
        <h2>Search for Pending Payments</h2>
        <form ref={searchFormRef} id="searchForm" className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchGuestName">Guest Name</label>
              <input type="text" id="searchGuestName" placeholder="Enter guest name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchReservationId">Reservation ID</label>
              <input type="number" id="searchReservationId" placeholder="Enter reservation ID" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchInvoiceNumber">Invoice Number</label>
              <input type="number" id="searchInvoiceNumber" placeholder="Enter invoice number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchPaymentStatus">Payment Status</label>
              <select id="searchPaymentStatus">
                <option value="">-- Select --</option>
                <option>Unpaid</option>
                <option>Partially Paid</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="searchDueDate">Due Date</label>
              <input type="date" id="searchDueDate" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="searchPaymentMethod">Payment Method</label>
              <select id="searchPaymentMethod">
                <option value="">-- Select --</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="button" onClick={handleSearch} className={styles.searchBtn}>🔍 Search</button>
            <button type="button" onClick={handleReset}  className={styles.resetBtn}>🔄 Reset</button>
          </div>
        </form>
      </section>

      {/* Payments List */}
      <section className={styles.paymentsListSection}>
        <h2>Pending Payments List</h2>
        <table className={styles.paymentsTable}>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Guest Name</th>
              <th>Reservation ID</th>
              <th>Amount Due</th>
              <th>Due Date</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(p => (
              <tr key={p.invoice} onClick={() => handleRowClick(p)} data-invoicenum={p.invoice}>
                <td>{p.invoice}</td>
                <td>{p.guest}</td>
                <td>{p.reservation}</td>
                <td>{p.amountDue}</td>
                <td>{p.dueDate}</td>
                <td className={styles[`status${p.status.replace(/\s+/g,'')}`]}>
                  {p.status === 'Unpaid' ? '🔴 ' : p.status === 'Partially Paid' ? '🟡 ' : '🔴 '}
                  {p.status}
                </td>
                <td><button className={styles.actionBtn}>View/Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Payment Form */}
      {showForm && selected && (
        <section className={styles.paymentFormSection}>
          <h2>Process Payment for Invoice</h2>
          <form ref={paymentFormRef} id="paymentForm">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Invoice Number</label>
                <input type="text" value={selected.invoice} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Guest Name</label>
                <input type="text" value={selected.guest} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Reservation ID</label>
                <input type="text" value={selected.reservation} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Total Amount Due</label>
                <input type="text" id="paymentAmountDue" value={selected.amountDue} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="paymentAmountNow">Amount Being Paid</label>
                <input
                  type="number"
                  id="paymentAmountNow"
                  onChange={handleAmountChange}
                  placeholder="Enter amount to pay"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="remainingBalance">Remaining Balance</label>
                <input type="text" id="remainingBalance" value={remaining} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="paymentMethod">Payment Method</label>
                <select id="paymentMethod">
                  <option value="">-- Select --</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="transactionRef">Transaction Reference</label>
                <input type="text" id="transactionRef" placeholder="Required for bank/card" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="paymentNotes">Payment Notes (Optional)</label>
              <textarea id="paymentNotes" rows={3}></textarea>
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleProcess} className={styles.submitBtn}>✅ Process Payment</button>
              <button type="button" onClick={handleCancel} className={styles.cancelBtn}>❌ Cancel</button>
            </div>
          </form>
        </section>
      )}

      {/* Summary */}
      <section className={styles.summarySection}>
        <h2>Pending Payments Summary</h2>
        <table className={styles.summaryTable}>
          <thead>
            <tr><th>Status</th><th>Count</th></tr>
          </thead>
          <tbody>
            <tr><td>🔴 Unpaid</td><td>15</td></tr>
            <tr><td>🟡 Partially Paid</td><td>8</td></tr>
            <tr><td>🔴 Overdue</td><td>6</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
