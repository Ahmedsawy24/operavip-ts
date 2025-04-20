// Dummy Data for Corporate Accounts
const corporateAccounts = {
    120001: {
      accountNumber: 120001,
      companyName: 'ABC Technologies',
      representative: 'Ahmed Khaled',
      contractExpiry: '2025-12-31',
      status: 'Active',
      outstandingBalance: '$1,500.00',
      contact: '+123456789, abc@example.com',
      address: '123 Corporate Ave, City',
      contractStart: '2025-01-01',
      contractTerms: 'Standard contract terms apply.'
    },
    120002: {
      accountNumber: 120002,
      companyName: 'XYZ Corp',
      representative: 'Layla Majid',
      contractExpiry: '2025-09-15',
      status: 'Suspended',
      outstandingBalance: '$350.00',
      contact: '+987654321, xyz@example.com',
      address: '456 Business Rd, City',
      contractStart: '2025-02-01',
      contractTerms: 'Special conditions apply.'
    },
    120003: {
      accountNumber: 120003,
      companyName: 'Golden Supplies',
      representative: 'Sami Alawi',
      contractExpiry: '2025-06-30',
      status: 'Closed',
      outstandingBalance: '$0.00',
      contact: '+555444333, golden@example.com',
      address: '789 Industry Pkwy, City',
      contractStart: '2025-03-01',
      contractTerms: 'Standard contract terms apply.'
    }
  };
  
  /********************************
   * البحث عن الحسابات
   ********************************/
  function searchAccounts() {
    const companyName = document.getElementById('companyName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const accountStatus = document.getElementById('accountStatus').value;
    const expiryFrom = document.getElementById('expiryFrom').value;
    const expiryTo = document.getElementById('expiryTo').value;
    const representative = document.getElementById('representative').value;
  
    console.log("Searching Accounts:", {
      companyName,
      accountNumber,
      accountStatus,
      expiryFrom,
      expiryTo,
      representative
    });
    // هنا منطق التصفية وتحديث الجدول
  }
  
  /********************************
   * عرض تفاصيل الحساب
   ********************************/
  function viewAccountDetails(accountNumber) {
    const account = corporateAccounts[accountNumber];
    if (!account) return alert("No data found for Account #" + accountNumber);
  
    // تعبئة البيانات في النافذة
    document.getElementById('modalAccountNumber').innerText = account.accountNumber;
    document.getElementById('modalCompanyName').innerText = account.companyName;
    document.getElementById('detailCompanyName').innerText = account.companyName;
    document.getElementById('detailAccountNumber').innerText = account.accountNumber;
    document.getElementById('detailRepresentative').innerText = account.representative;
    document.getElementById('detailContact').innerText = account.contact;
    document.getElementById('detailAddress').innerText = account.address;
    document.getElementById('detailContractStart').innerText = account.contractStart;
    document.getElementById('detailContractExpiry').innerText = account.contractExpiry;
    document.getElementById('detailContractTerms').innerText = account.contractTerms;
    document.getElementById('detailBalance').innerText = account.outstandingBalance;
    document.getElementById('detailStatus').innerText = account.status;
  
    // إظهار النافذة
    document.getElementById('accountDetailsModal').style.display = 'flex';
  }
  
  /********************************
   * تفعيل الحساب
   ********************************/
  function activateAccount(accountNumber) {
    alert(`Account #${accountNumber} activated!`);
    // منطق التفعيل هنا
  }
  
  /********************************
   * إعادة فتح الحساب
   ********************************/
  function reopenAccount(accountNumber) {
    alert(`Account #${accountNumber} reopened!`);
    // منطق إعادة الفتح هنا
  }
  
  /********************************
   * عرض السجل
   ********************************/
  function viewHistory(accountNumber) {
    alert(`Viewing history for Account #${accountNumber}`);
    // منطق عرض السجل هنا
  }
  
  /********************************
   * فتح نافذة المدفوعات
   ********************************/
  function openPaymentsModal(accountNumber) {
    const account = corporateAccounts[accountNumber];
    if (!account) return alert("No data found for Account #" + accountNumber);
  
    document.getElementById('paymentsAccountNumber').innerText = account.accountNumber;
    document.getElementById('paymentsCompanyName').innerText = account.companyName;
  
    document.getElementById('paymentsModal').style.display = 'flex';
  }
  
  /********************************
   * تأكيد الدفع
   ********************************/
  function confirmPayment() {
    alert("Payment successfully processed!");
    closeModal();
  }
  
  /********************************
   * فتح نافذة الفواتير
   ********************************/
  function openBillsModal(accountNumber) {
    const account = corporateAccounts[accountNumber];
    if (!account) return alert("No data found for Account #" + accountNumber);
  
    document.getElementById('invoicesAccountNumber').innerText = account.accountNumber;
    document.getElementById('invoicesCompanyName').innerText = account.companyName;
  
    document.getElementById('invoicesModal').style.display = 'flex';
  }
  
  /********************************
   * طباعة الفاتورة
   ********************************/
  function printInvoice(invoiceNumber) {
    alert("Printing Invoice #" + invoiceNumber);
  }
  
  /********************************
   * عرض تفاصيل الفاتورة
   ********************************/
  function viewInvoice(invoiceNumber) {
    alert("Viewing Invoice #" + invoiceNumber);
  }
  
  /********************************
   * دفع الفاتورة
   ********************************/
  function payInvoice(invoiceNumber) {
    alert("Paying Invoice #" + invoiceNumber);
  }
  
  /********************************
   * تعديل بيانات الحساب
   ********************************/
  function editAccountDetails() {
    alert("Editing account details...");
    // منطق تعديل بيانات الحساب
  }
  
  /********************************
   * إغلاق جميع النوافذ
   ********************************/
  function closeModal() {
    document.getElementById('accountDetailsModal').style.display = 'none';
    document.getElementById('paymentsModal').style.display = 'none';
    document.getElementById('invoicesModal').style.display = 'none';
  }
  