document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Sessions Section ======
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      const sessionStartDate = document.getElementById('sessionStartDate').value;
      const sessionEndDate = document.getElementById('sessionEndDate').value;
      if (!sessionStartDate || !sessionEndDate || sessionEndDate < sessionStartDate) {
        alert("⚠️ Please select a valid date range.");
        return;
      }
      alert("Searching sessions (demo).");
      // منطق البحث (AJAX/Fetch) يمكن إضافته هنا
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert("Search criteria reset (demo).");
    });
  
    // ====== Refresh Sessions Button ======
    const refreshSessionsBtn = document.getElementById('refreshSessionsBtn');
    refreshSessionsBtn.addEventListener('click', () => {
      alert("Refreshing sessions (demo).");
      // منطق تحديث الجلسات (AJAX/Fetch) يمكن إضافته هنا
    });
  
    // ====== Open Cashier Sessions List ======
    const sessionsTbody = document.getElementById('sessionsTbody');
    sessionsTbody.addEventListener('click', (e) => {
      // زر "Close Session"
      if (e.target.classList.contains('close-session-btn')) {
        const row = e.target.parentNode.parentNode;
        alert(`Closing session: ${row.cells[0].textContent} (demo).`);
        // يمكنك عرض التفاصيل أيضًا قبل الإغلاق
        showSessionDetails(row);
      }
      // زر "Review"
      else if (e.target.classList.contains('review-session-btn')) {
        const row = e.target.parentNode.parentNode;
        alert(`Reviewing session: ${row.cells[0].textContent} (demo).`);
        // يمكنك عرض التفاصيل للمراجعة
        showSessionDetails(row);
      }
    });
  
    // ====== Session Detail Section ======
    const sessionDetailSection = document.getElementById('sessionDetailSection');
    const detailSessionId = document.getElementById('detailSessionId');
    const detailCashierName = document.getElementById('detailCashierName');
    const detailStartTime = document.getElementById('detailStartTime');
    const detailEndTime = document.getElementById('detailEndTime');
    const detailTotalCash = document.getElementById('detailTotalCash');
    const detailExpectedBalance = document.getElementById('detailExpectedBalance');
    const detailDifference = document.getElementById('detailDifference');
    const detailSessionStatus = document.getElementById('detailSessionStatus');
  
    const closeSessionBtn = document.getElementById('closeSessionBtn');
    const reviewSessionBtn = document.getElementById('reviewSessionBtn');
    const cancelSessionBtn = document.getElementById('cancelSessionBtn');
  
    function showSessionDetails(row) {
      // تعبئة البيانات (Demo)
      detailSessionId.textContent = row.cells[0].textContent; // Session ID
      detailCashierName.textContent = row.cells[1].textContent; // Cashier Name
      detailStartTime.textContent = row.cells[2].textContent;   // Start Time
      detailEndTime.textContent = row.cells[3].textContent;     // End Time
      detailTotalCash.textContent = row.cells[4].textContent;   // Total Cash
      detailExpectedBalance.textContent = row.cells[5].textContent; // Expected
      // احسب الفرق بشكل Demo
      const total = parseFloat(row.cells[4].textContent.replace('$','')) || 0;
      const expected = parseFloat(row.cells[5].textContent.replace('$','')) || 0;
      const diff = total - expected;
      detailDifference.textContent = `$${diff.toFixed(2)}`;
      detailSessionStatus.textContent = row.cells[6].textContent; // Status
  
      // عرض قسم التفاصيل
      sessionDetailSection.style.display = 'block';
    }
  
    closeSessionBtn.addEventListener('click', () => {
      alert("🔒 Closing cashier session (demo).");
      // منطق إغلاق الجلسة
    });
  
    reviewSessionBtn.addEventListener('click', () => {
      alert("🔄 Reviewing cashier session (demo).");
      // منطق مراجعة الجلسة
    });
  
    cancelSessionBtn.addEventListener('click', () => {
      sessionDetailSection.style.display = 'none';
    });
  });
  