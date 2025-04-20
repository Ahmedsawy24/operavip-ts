document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Transactions Section ======
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      if (!startDate || !endDate || endDate < startDate) {
        alert("⚠️ Please select a valid date range.");
        return;
      }
      alert("Searching transactions (demo).");
      // منطق البحث عن المعاملات (AJAX/Fetch) يمكن إضافته هنا
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert("Search criteria reset (demo).");
    });
  
    // ====== Transactions List Section ======
    const refreshTransactionsBtn = document.getElementById('refreshTransactionsBtn');
    refreshTransactionsBtn.addEventListener('click', () => {
      alert("Refreshing transaction status (demo).");
      // منطق تحديث حالة المعاملات (AJAX/Fetch) يمكن إضافته هنا
    });
  
    const transactionsTbody = document.getElementById('transactionsTbody');
    transactionsTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-btn')) {
        // فتح تفاصيل المعاملة
        const row = e.target.parentNode.parentNode;
        showTransactionDetails(row);
      }
    });
  
    // ====== Transaction Detail Section ======
    const transactionDetailSection = document.getElementById('transactionDetailSection');
    const detailTxnId = document.getElementById('detailTxnId');
    const detailGuestName = document.getElementById('detailGuestName');
    const detailTxnType = document.getElementById('detailTxnType');
    const detailAmount = document.getElementById('detailAmount');
    const detailPaymentMethod = document.getElementById('detailPaymentMethod');
    const detailTxnDate = document.getElementById('detailTxnDate');
    const detailStatus = document.getElementById('detailStatus');
  
    const downloadTxnBtn = document.getElementById('downloadTxnBtn');
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
  
    function showTransactionDetails(row) {
      // تعبئة البيانات بشكل Demo
      detailTxnId.textContent = row.cells[0].textContent; // Transaction ID
      detailGuestName.textContent = row.cells[1].textContent; // Guest Name / Account
      detailTxnType.textContent = row.cells[2].textContent; // Transaction Type
      detailAmount.textContent = row.cells[3].textContent; // Amount
      detailPaymentMethod.textContent = row.cells[4].textContent; // Payment Method
      // demo date
      detailTxnDate.textContent = "12-04-2025"; 
      detailStatus.textContent = row.cells[5].textContent; // Status
  
      // عرض قسم التفاصيل
      transactionDetailSection.style.display = 'block';
    }
  
    downloadTxnBtn.addEventListener('click', () => {
      alert("📥 Downloading transaction details (demo).");
    });
  
    printReceiptBtn.addEventListener('click', () => {
      alert("🖨 Printing transaction receipt (demo).");
    });
  
    closeDetailBtn.addEventListener('click', () => {
      transactionDetailSection.style.display = 'none';
    });
  });
  