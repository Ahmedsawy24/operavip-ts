document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Functionality ======
    const generateReportBtn = document.getElementById('generateReportBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    generateReportBtn.addEventListener('click', () => {
      // منطق البحث وتوليد التقرير (AJAX/Fetch)
      const dateFrom = document.getElementById('dateFrom').value;
      const dateTo = document.getElementById('dateTo').value;
      if (dateFrom && dateTo && dateTo < dateFrom) {
        alert("⚠️ Please select a valid date range.");
        return;
      }
      // إذا لم يتم العثور على سجلات
      // alert("⚠️ No records found for the selected criteria.");
      // ...
      alert("Generating ledger report (demo).");
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert("Search form reset (demo).");
    });
  
    // ====== Reports Table ======
    const reportsTbody = document.getElementById('reportsTbody');
  
    // ====== Report Detail Section ======
    const reportDetailSection = document.getElementById('reportDetailSection');
    const detailReportType = document.getElementById('detailReportType');
    const detailAccountName = document.getElementById('detailAccountName');
    const detailAccountId = document.getElementById('detailAccountId');
    const detailBalance = document.getElementById('detailBalance');
    const detailLastPaymentAmt = document.getElementById('detailLastPaymentAmt');
    const detailLastPaymentDate = document.getElementById('detailLastPaymentDate');
    const detailNextDueDate = document.getElementById('detailNextDueDate');
    const detailStatus = document.getElementById('detailStatus');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const printReportBtn = document.getElementById('printReportBtn');
  
    reportsTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-btn')) {
        const row = e.target.parentNode.parentNode;
        // جلب البيانات من الصف
        const rowData = {
          reportType: row.cells[0].textContent,
          accountName: row.cells[1].textContent,
          accountId: row.cells[2].textContent,
          balance: row.cells[3].textContent,
          lastPaymentDate: row.cells[4].textContent,
          status: row.cells[5].textContent
        };
        // تعبئة تفاصيل التقرير
        detailReportType.textContent = rowData.reportType;
        detailAccountName.textContent = rowData.accountName;
        detailAccountId.textContent = rowData.accountId;
        detailBalance.textContent = rowData.balance;
        // منطق demo لمبلغ آخر دفعة
        detailLastPaymentAmt.textContent = "$300.00";
        detailLastPaymentDate.textContent = rowData.lastPaymentDate;
        detailNextDueDate.textContent = "20-04-2025"; // demo
        detailStatus.textContent = rowData.status;
        // إظهار قسم التفاصيل
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
  