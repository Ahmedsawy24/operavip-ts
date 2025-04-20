document.addEventListener('DOMContentLoaded', () => {
  // --- Search Section ---
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  searchBtn.addEventListener('click', () => {
    // يمكن تنفيذ منطق البحث الحقيقي هنا
    alert('Search functionality is not implemented in this demo.');
  });
  
  // --- Stay Adjustment Section ---
  const originalCheckout = document.getElementById('originalCheckout'); // Readonly field with original check-out date
  const newCheckoutDate = document.getElementById('newCheckoutDate');
  const adjustedNights = document.getElementById('adjustedNights');
  
  // افتراض: نعرف تاريخ Check-In (يمكن جلبه من بيانات النزيل)
  // على سبيل المثال، لنفترض أن تاريخ Check-In هو 2025-04-10
  const checkInDate = new Date("2025-04-10");
  
  newCheckoutDate.addEventListener('change', () => {
    if (newCheckoutDate.value) {
      const newCO = new Date(newCheckoutDate.value);
      // حساب عدد الليالي الجديدة: الفرق بين تاريخ Check-In وتاريخ المغادرة الجديد
      const diffTime = newCO - checkInDate;
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      adjustedNights.value = nights > 0 ? nights : 0;
      updateBillingAdjustment();
    } else {
      adjustedNights.value = "";
      updateBillingAdjustment();
    }
  });
  
  // --- Billing Adjustment Section ---
  const originalTotal = document.getElementById('originalTotal');
  const adjustedAmount = document.getElementById('adjustedAmount');
  const amountPaid = document.getElementById('amountPaid');
  const balanceRefund = document.getElementById('balanceRefund');
  const additionalCharges = document.getElementById('additionalCharges');
  const paymentMethod = document.getElementById('paymentMethod');
  
  function updateBillingAdjustment() {
    // في هذا المثال نُعيد حساب Adjusted Amount بناءً على فرق الليالي
    // لنفترض أن السعر الأصلي للغرفة هو ثابت (يأتي من بيانات النزيل) وهو 100 دولار في الليلة
    const baseRate = 100;
    // حساب المبلغ الجديد = (Adjusted Nights * baseRate) + Additional Charges (إن وجدت)
    const nights = parseInt(adjustedNights.value) || 0;
    const addCharge = parseFloat(additionalCharges.value) || 0;
    const newAmount = (nights * baseRate) + addCharge;
    adjustedAmount.value = newAmount.toFixed(2);
    
    // حساب الرصيد: Remaining = Adjusted Amount - Amount Already Paid
    const paid = parseFloat(amountPaid.value) || 0;
    const balance = newAmount - paid;
    balanceRefund.value = balance.toFixed(2);
  }
  
  additionalCharges.addEventListener('input', updateBillingAdjustment);
  
  // --- Confirm Check-Out Section ---
  const keysReceived = document.getElementById('keysReceived');
  const additionalNotes = document.getElementById('additionalNotes');
  const confirmBtn = document.getElementById('confirmBtn');
  
  // Modal Elements
  const confirmModalOverlay = document.getElementById('confirmModalOverlay');
  const modalGuestName = document.getElementById('modalGuestName');
  const modalRoom = document.getElementById('modalRoom');
  const modalOriginalDep = document.getElementById('modalOriginalDep');
  const modalNewDep = document.getElementById('modalNewDep');
  const modalAdjustedNights = document.getElementById('modalAdjustedNights');
  const modalFinalAmount = document.getElementById('modalFinalAmount');
  const modalPaymentMethod = document.getElementById('modalPaymentMethod');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  
  // بيانات وهمية للنزيل (يمكن استبدالها ببيانات ديناميكية)
  const currentReservation = {
    guestName: "Abdullah Alhammami",
    roomNumber: "204",
    roomType: "Suite",
    originalDeparture: "15-04-2025",
    amountPaid: 300.00
  };
  
  // عند الضغط على زر Confirm Early Check-Out
  confirmBtn.addEventListener('click', () => {
    // التحقق من وجود طريقة دفع
    if (!paymentMethod.value) {
      alert("⚠️ Please select a payment method.");
      return;
    }
    // تعبئة بيانات المودال
    modalGuestName.textContent = currentReservation.guestName;
    modalRoom.textContent = `${currentReservation.roomType}, Room ${currentReservation.roomNumber}`;
    modalOriginalDep.textContent = currentReservation.originalDeparture;
    modalNewDep.textContent = newCheckoutDate.value ? formatDate(newCheckoutDate.value) : "--";
    modalAdjustedNights.textContent = adjustedNights.value ? `${adjustedNights.value} Night(s)` : "--";
    modalFinalAmount.textContent = `$${adjustedAmount.value}`;
    modalPaymentMethod.textContent = paymentMethod.value;
    
    // عرض المودال
    confirmModalOverlay.style.display = 'flex';
  });
  
  modalCancelBtn.addEventListener('click', () => {
    confirmModalOverlay.style.display = 'none';
  });
  
  modalConfirmBtn.addEventListener('click', () => {
    // تحقق من الدفع الكامل (مثال بسيط)
    const balance = parseFloat(balanceRefund.value) || 0;
    if (balance > 0) {
      alert("⚠️ Please ensure full payment before proceeding.");
      return;
    }
    alert("✅ Early Check-Out Successfully Processed!");
    confirmModalOverlay.style.display = 'none';
    // هنا يمكنك إعادة تعيين الحقول أو تحديث الحالة حسب الحاجة
  });
  
  // إغلاق المودال عند النقر خارج المحتوى
  confirmModalOverlay.addEventListener('click', (e) => {
    if (e.target === confirmModalOverlay) {
      confirmModalOverlay.style.display = 'none';
    }
  });
  
  // دالة تنسيق التاريخ (YYYY-MM-DD إلى DD-MM-YYYY)
  function formatDate(dateStr) {
    const parts = dateStr.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
});
