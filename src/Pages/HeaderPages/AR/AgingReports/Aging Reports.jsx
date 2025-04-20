document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Functionality ======
    const generateReportBtn = document.getElementById('generateReportBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    generateReportBtn.addEventListener('click', () => {
      // منطق البحث وتوليد التقرير (AJAX/Fetch)
      const reportDate = document.getElementById('reportDate').value;
      if (!reportDate) {
        alert("⚠️ Please select a valid report date.");
        return;
      }
      // إذا لم يتم العثور على سجلات
      // alert("⚠️ No records found for the selected criteria.");
      // ...
      alert("Generating aging report (demo).");
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert('Search form reset (demo).');
    });
  
    // ====== Aging Table ======
    const agingTbody = document.getElementById('agingTbody');
  
    // ====== Report Detail Section ======
    const reportDetailSection = document.getElementById('reportDetailSection');
    const detailAccountName = document.getElementById('detailAccountName');
    const detailAccountId = document.getElementById('detailAccountId');
    const detailBalance = document.getElementById('detailBalance');
    const detail0to30 = document.getElementById('detail0to30');
    const detail31to60 = document.getElementById('detail31to60');
    const detail61to90 = document.getElementById('detail61to90');
    const detail90plus = document.getElementById('detail90plus');
    const detailStatus = document.getElementById('detailStatus');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const printReportBtn = document.getElementById('printReportBtn');
  
    agingTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-btn')) {
        const row = e.target.parentNode.parentNode;
        // جمع بيانات الصف
        const rowData = {
          accountName: row.cells[0].textContent,
          accountId: row.cells[1].textContent,
          currentBalance: row.cells[2].textContent,
          zeroTo30: row.cells[3].textContent,
          thirtyTo60: row.cells[4].textContent,
          sixtyTo90: row.cells[5].textContent,
          ninetyPlus: row.cells[6].textContent,
          status: row.cells[7].textContent
        };
        // تعبئة قسم التفاصيل
        detailAccountName.textContent = rowData.accountName;
        detailAccountId.textContent = rowData.accountId;
        detailBalance.textContent = rowData.currentBalance;
        detail0to30.textContent = rowData.zeroTo30;
        detail31to60.textContent = rowData.thirtyTo60;
        detail61to90.textContent = rowData.sixtyTo90;
        detail90plus.textContent = rowData.ninetyPlus;
        detailStatus.textContent = rowData.status;
        // عرض قسم التفاصيل
        reportDetailSection.style.display = 'block';
      }
    });
  
    closeDetailBtn.addEventListener('click', () => {
      reportDetailSection.style.display = 'none';
    });
  
    downloadPdfBtn.addEventListener('click', () => {
      // منطق توليد PDF
      alert("📥 Download PDF (demo).");
    });
  
    printReportBtn.addEventListener('click', () => {
      // منطق الطباعة
      alert("🖨 Print Report (demo).");
    });
  
    // ====== Summary Section ======
    // يمكن تحديث خلايا #summaryTbody ديناميكيًا عند الحاجة
  });
  