document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Reservations Section ======
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      const checkInDate = document.getElementById('checkInDate').value;
      const checkOutDate = document.getElementById('checkOutDate').value;
      if (!checkInDate || !checkOutDate || checkOutDate < checkInDate) {
        alert("⚠️ Please select a valid stay date range.");
        return;
      }
      alert("Searching active reservations (demo).");
      // منطق البحث (AJAX/Fetch) يمكن إضافته هنا
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert("Search criteria reset (demo).");
    });
  
    // ====== Refresh Charges Status Button ======
    const refreshChargesBtn = document.getElementById('refreshChargesBtn');
    refreshChargesBtn.addEventListener('click', () => {
      alert("Refreshing charges status (demo).");
      // منطق تحديث الحالة
    });
  
    // ====== Reservations Table ======
    const reservationsTbody = document.getElementById('reservationsTbody');
    reservationsTbody.addEventListener('click', (e) => {
      // زر "Post Charge"
      if (e.target.classList.contains('post-charge-btn')) {
        const row = e.target.parentNode.parentNode;
        alert(`Posting charge for reservation: ${row.cells[0].textContent} (demo).`);
        showChargeDetails(row, "Pending");
      }
      // زر "Review"
      else if (e.target.classList.contains('review-charge-btn')) {
        const row = e.target.parentNode.parentNode;
        alert(`Reviewing charge for reservation: ${row.cells[0].textContent} (demo).`);
        showChargeDetails(row, "In Progress");
      }
    });
  
    // ====== Charge Detail Section ======
    const chargeDetailSection = document.getElementById('chargeDetailSection');
    const detailReservationId = document.getElementById('detailReservationId');
    const detailGuestName = document.getElementById('detailGuestName');
    const detailRoomNumber = document.getElementById('detailRoomNumber');
    const detailRoomType = document.getElementById('detailRoomType');
    const detailNightlyRate = document.getElementById('detailNightlyRate');
    const detailNights = document.getElementById('detailNights');
    const detailTaxPercent = document.getElementById('detailTaxPercent');
    const detailTaxAmount = document.getElementById('detailTaxAmount');
    const detailRoomCharge = document.getElementById('detailRoomCharge');
    const detailTotalCharge = document.getElementById('detailTotalCharge');
    const detailChargeStatus = document.getElementById('detailChargeStatus');
  
    const postRoomTaxBtn = document.getElementById('postRoomTaxBtn');
    const cancelChargeBtn = document.getElementById('cancelChargeBtn');
  
    function showChargeDetails(row, status) {
      // تعبئة البيانات (Demo)
      detailReservationId.textContent = row.cells[0].textContent;
      detailGuestName.textContent = row.cells[1].textContent;
      detailRoomNumber.textContent = row.cells[2].textContent;
      detailRoomType.textContent = row.cells[3].textContent;
      detailNightlyRate.textContent = row.cells[4].textContent; // $200.00
      detailTaxPercent.textContent = row.cells[5].textContent;  // 10%
      detailTotalCharge.textContent = row.cells[6].textContent; // $220.00
      detailChargeStatus.textContent = row.cells[7].textContent; // Pending / In Progress
  
      // حساب عدد الليالي بشكل Demo
      detailNights.textContent = "2"; 
      // حساب ضريبة بشكل Demo
      detailTaxAmount.textContent = "$40.00";
      // حساب المبلغ قبل الضريبة بشكل Demo
      detailRoomCharge.textContent = "$400.00";
      // حالياً تم وضع status param فقط للعرض
      detailChargeStatus.textContent = `Status: ${status}`;
  
      // إظهار قسم التفاصيل
      chargeDetailSection.style.display = 'block';
    }
  
    postRoomTaxBtn.addEventListener('click', () => {
      alert("✅ Room & Tax charges posted (demo).");
      // منطق الإضافة
    });
  
    cancelChargeBtn.addEventListener('click', () => {
      chargeDetailSection.style.display = 'none';
    });
  });
  