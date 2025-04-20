document.addEventListener('DOMContentLoaded', () => {
    // ====== Report Criteria Section ======
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    generateBtn.addEventListener('click', () => {
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const reportType = document.getElementById('reportType').value;
      const reportFormat = document.getElementById('reportFormat').value;
  
      // تحقق من التواريخ
      if (!startDate || !endDate || endDate < startDate) {
        alert("⚠️ Please select a valid date range.");
        return;
      }
      // تحقق من اختيار نوع التقرير
      if (!reportType) {
        alert("⚠️ Please select a report type.");
        return;
      }
      // تحقق من اختيار تنسيق التقرير
      if (!reportFormat) {
        alert("⚠️ Please select a report format.");
        return;
      }
      // منطق توليد التقرير (AJAX/Fetch)
      alert(`Generating ${reportType} from ${startDate} to ${endDate} in ${reportFormat} format (demo).`);
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('reportForm').reset();
      alert("Report criteria reset (demo).");
    });
  
    // ====== Generated Reports List ======
    const refreshReportsBtn = document.getElementById('refreshReportsBtn');
    refreshReportsBtn.addEventListener('click', () => {
      alert("Refreshing report status (demo).");
    });
  
    const reportsTbody = document.getElementById('reportsTbody');
  
    // الأزرار في قائمة التقارير
    reportsTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-btn')) {
        // عرض تفاصيل التقرير
        const row = e.target.parentNode.parentNode;
        showReportDetails(row);
      } else if (e.target.classList.contains('download-btn')) {
        // تنزيل التقرير
        const row = e.target.parentNode.parentNode;
        const reportName = row.cells[0].textContent;
        const statusCell = row.cells[4].textContent.toLowerCase();
        if (statusCell.includes("processing")) {
          alert("⚠️ The selected report is still being processed. Please wait.");
        } else {
          alert(`Downloading report: ${reportName} (demo).`);
        }
      } else if (e.target.classList.contains('wait-btn')) {
        alert("Report is still processing. Please wait (demo).");
      }
    });
  
    // ====== Report Detail Section ======
    const reportDetailSection = document.getElementById('reportDetailSection');
    const detailReportName = document.getElementById('detailReportName');
    const detailGeneratedBy = document.getElementById('detailGeneratedBy');
    const detailDateGenerated = document.getElementById('detailDateGenerated');
    const detailTotalRevenue = document.getElementById('detailTotalRevenue');
    const detailTotalTransactions = document.getElementById('detailTotalTransactions');
    const detailRoomsOccupied = document.getElementById('detailRoomsOccupied');
    const detailTaxCollected = document.getElementById('detailTaxCollected');
  
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const printReportBtn = document.getElementById('printReportBtn');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
  
    function showReportDetails(row) {
      // تعبئة بعض البيانات بشكل افتراضي
      detailReportName.textContent = row.cells[0].textContent;
      detailGeneratedBy.textContent = row.cells[2].textContent;
      detailDateGenerated.textContent = row.cells[1].textContent;
      // demo values
      detailTotalRevenue.textContent = "$25,000.00";
      detailTotalTransactions.textContent = "250";
      detailRoomsOccupied.textContent = "180";
      detailTaxCollected.textContent = "$3,500.00";
  
      // عرض قسم التفاصيل
      reportDetailSection.style.display = 'block';
    }
  
    downloadReportBtn.addEventListener('click', () => {
      alert("📥 Downloading selected report (demo).");
    });
  
    printReportBtn.addEventListener('click', () => {
      alert("🖨 Printing selected report (demo).");
    });
  
    closeDetailBtn.addEventListener('click', () => {
      reportDetailSection.style.display = 'none';
    });
  });
  