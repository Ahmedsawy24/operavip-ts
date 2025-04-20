document.addEventListener('DOMContentLoaded', () => {
  // --- Guest Search Section ---
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', () => {
    // يمكنك تنفيذ منطق البحث الحقيقي هنا (مثال: AJAX)
    alert('Search functionality is not implemented in this demo.');
  });
  
  // --- Adjustment Type Selection ---
  const adjustmentRadios = document.getElementsByName('adjustmentOption');
  const postChargeContainer = document.getElementById('postChargeFormContainer');
  const creditDebitContainer = document.getElementById('adjustmentFormContainer');
  
  // دالة لتبديل عرض النماذج حسب النوع
  function updateAdjustmentForm() {
    const selected = document.querySelector('input[name="adjustmentOption"]:checked').value;
    if (selected === "post") {
      postChargeContainer.style.display = "block";
      creditDebitContainer.style.display = "none";
    } else {
      postChargeContainer.style.display = "none";
      creditDebitContainer.style.display = "block";
    }
  }
  
  // ربط حدث التغيير على جميع الراديوهات
  adjustmentRadios.forEach(radio => {
    radio.addEventListener('change', updateAdjustmentForm);
  });
  
  updateAdjustmentForm(); // استدعاء مبدئي
  
  // --- Adjustment Form Submission ---
  const adjustmentForm = document.getElementById('adjustmentForm');
  adjustmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // تحقق من صحة الإدخالات
    const adjustmentType = document.querySelector('input[name="adjustmentOption"]:checked').value;
    if (adjustmentType === "post") {
      const chargeType = document.getElementById('chargeType').value;
      const chargeAmount = parseFloat(document.getElementById('chargeAmount').value);
      if (!chargeType) {
        alert("⚠️ Please select the adjustment or charge type.");
        return;
      }
      if (isNaN(chargeAmount) || chargeAmount <= 0) {
        alert("⚠️ Please enter a valid amount.");
        return;
      }
      // يمكنك معالجة بيانات Post Charge هنا
    } else {
      const adjAmount = parseFloat(document.getElementById('adjAmount').value);
      if (isNaN(adjAmount) || adjAmount <= 0) {
        alert("⚠️ Please enter a valid adjustment amount.");
        return;
      }
      // في حالة Credit، تحقق أن المبلغ لا يتجاوز الرصيد الحالي
      if (document.getElementById('adjustmentOption').value === "credit") {
        const currentBalance = 250.00; // مثال ثابت
        if (adjAmount > currentBalance) {
          alert("⚠️ Credit amount cannot exceed current balance.");
          return;
        }
      }
    }
    openConfirmationModal();
  });
  
  // --- Confirmation Modal ---
  const confirmationModalOverlay = document.getElementById('confirmationModalOverlay');
  const modalGuestName = document.getElementById('modalGuestName');
  const modalRoomNumber = document.getElementById('modalRoomNumber');
  const modalAdjType = document.getElementById('modalAdjType');
  const modalAdjAmount = document.getElementById('modalAdjAmount');
  const modalNewBalance = document.getElementById('modalNewBalance');
  const modalProcessedBy = document.getElementById('modalProcessedBy');
  const modalRemarks = document.getElementById('modalRemarks');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  
  // بيانات وهمية للنزيل
  const currentReservation = {
    guestName: "Abdullah Alhammami",
    roomNumber: "204",
    currentBalance: 250.00,
    originalBalance: 500.00
  };
  
  function calculateNewBalance() {
    let adjustmentAmt = 0;
    const selected = document.querySelector('input[name="adjustmentOption"]:checked').value;
    if (selected === "post") {
      adjustmentAmt = parseFloat(document.getElementById('chargeAmount').value) || 0;
    } else {
      adjustmentAmt = parseFloat(document.getElementById('adjAmount').value) || 0;
    }
    let newBalance;
    if (selected === "credit") {
      newBalance = currentReservation.currentBalance - adjustmentAmt;
    } else if (selected === "debit") {
      newBalance = currentReservation.currentBalance + adjustmentAmt;
    } else {
      // بالنسبة لـ Post Charge، نفترض أنها زيادة
      newBalance = currentReservation.currentBalance + adjustmentAmt;
    }
    return newBalance.toFixed(2);
  }
  
  function openConfirmationModal() {
    modalGuestName.textContent = currentReservation.guestName;
    modalRoomNumber.textContent = currentReservation.roomNumber;
    const selected = document.querySelector('input[name="adjustmentOption"]:checked').value;
    let adjTypeText = "";
    let adjAmt = 0;
    if (selected === "post") {
      adjTypeText = "Post Charge";
      adjAmt = parseFloat(document.getElementById('chargeAmount').value) || 0;
    } else if (selected === "credit") {
      adjTypeText = "Credit Adjustment";
      adjAmt = parseFloat(document.getElementById('adjAmount').value) || 0;
    } else {
      adjTypeText = "Debit Adjustment";
      adjAmt = parseFloat(document.getElementById('adjAmount').value) || 0;
    }
    modalAdjType.textContent = adjTypeText;
    modalAdjAmount.textContent = `$${adjAmt.toFixed(2)}`;
    modalNewBalance.textContent = `$${calculateNewBalance()}`;
    modalProcessedBy.textContent = document.getElementById('processedBy').value || "N/A";
    modalRemarks.textContent = (document.getElementById('adjRemarks').value || document.getElementById('chargeDescription').value) || "N/A";
    
    confirmationModalOverlay.style.display = 'flex';
  }
  
  modalCancelBtn.addEventListener('click', () => {
    confirmationModalOverlay.style.display = 'none';
  });
  
  modalConfirmBtn.addEventListener('click', () => {
    alert("✅ Adjustment Successfully Posted to Guest Folio!");
    confirmationModalOverlay.style.display = 'none';
    // هنا يمكن إعادة تعيين النماذج أو تحديث سجل العمليات والرصيد
  });
  
  confirmationModalOverlay.addEventListener('click', (e) => {
    if (e.target === confirmationModalOverlay) {
      confirmationModalOverlay.style.display = 'none';
    }
  });
});
