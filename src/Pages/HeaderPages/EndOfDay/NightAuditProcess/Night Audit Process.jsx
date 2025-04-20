document.addEventListener('DOMContentLoaded', () => {
    // ====== Night Audit Overview Section ======
    const startAuditBtn = document.getElementById('startAuditBtn');
    startAuditBtn.addEventListener('click', () => {
      alert("Night Audit started (demo).");
      // منطق بدء التدقيق الليلي يمكن وضعه هنا
    });
  
    // أزرار "View Details" أو "View" في نظرة عامة
    const overviewViewButtons = document.querySelectorAll('.overview-table .view-btn');
    overviewViewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alert(`Viewing details for: ${btn.parentNode.parentNode.cells[0].textContent} (demo).`);
      });
    });
  
    // زر "Download" في نظرة عامة
    const overviewDownloadButtons = document.querySelectorAll('.overview-table .download-btn');
    overviewDownloadButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Downloading daily financial reports (demo).");
      });
    });
  
    // ====== Room Status Verification Buttons ======
    const updateButtons = document.querySelectorAll('.update-btn');
    updateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Update room status (demo).");
      });
    });
  
    const verifyButtons = document.querySelectorAll('.verify-btn');
    verifyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Verify room status (demo).");
      });
    });
  
    const resolveButtons = document.querySelectorAll('.resolve-btn');
    resolveButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Resolve room status (demo).");
      });
    });
  
    // ====== Close Checked-out Reservations Buttons ======
    const detailViewButtons = document.querySelectorAll('.detail-table .view-btn');
    detailViewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        alert(`View details for reservation: ${btn.parentNode.parentNode.cells[0].textContent} (demo).`);
      });
    });
  
    // ====== Send Daily Financial Reports Buttons ======
    const downloadDailyReportBtn = document.getElementById('downloadDailyReportBtn');
    const printDailyReportBtn = document.getElementById('printDailyReportBtn');
  
    downloadDailyReportBtn?.addEventListener('click', () => {
      alert("Downloading daily report PDF (demo).");
    });
    printDailyReportBtn?.addEventListener('click', () => {
      alert("Printing daily report (demo).");
    });
  });
  