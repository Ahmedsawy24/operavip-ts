document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Functionality ======
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      // منطق البحث (AJAX/Fetch) لتصفية المدفوعات
      alert('Search functionality is not implemented in this demo.');
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert('Search form reset (demo).');
    });
  
    // ====== Pending Payments Table ======
    const paymentsTbody = document.getElementById('paymentsTbody');
  
    // ====== Payment Form (View/Edit) ======
    const paymentFormSection = document.getElementById('paymentFormSection');
    const paymentForm = document.getElementById('paymentForm');
    const processPaymentBtn = document.getElementById('processPaymentBtn');
    const paymentCancelBtn = document.getElementById('paymentCancelBtn');
  
    let selectedInvoiceNum = null;
  
    paymentsTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentNode.parentNode;
        selectedInvoiceNum = row.getAttribute('data-invoicenum');
  
        // تعبئة النموذج من الصف
        document.getElementById('paymentInvoiceNumber').value = row.cells[0].textContent;
        document.getElementById('paymentGuestName').value = row.cells[1].textContent;
        document.getElementById('paymentReservationId').value = row.cells[2].textContent;
        document.getElementById('paymentAmountDue').value = row.cells[3].textContent; // "$350.00"
        // حدد الحالة إذا لزم (يمكن parse)
        // ...
        // عرض قسم الدفع
        paymentFormSection.style.display = 'block';
      }
    });
  
    processPaymentBtn.addEventListener('click', () => {
      // تحقق من المدخلات
      const amountDueStr = document.getElementById('paymentAmountDue').value.replace('$', '');
      const amountDue = parseFloat(amountDueStr) || 0;
      const amountNow = parseFloat(document.getElementById('paymentAmountNow').value) || 0;
      if (amountNow <= 0 || isNaN(amountNow)) {
        alert("⚠️ Please enter a valid amount.");
        return;
      }
      if (amountNow > amountDue) {
        alert("⚠️ Payment amount cannot exceed the outstanding balance.");
        return;
      }
      // تحقق من طريقة الدفع
      const paymentMethod = document.getElementById('paymentMethod').value;
      const transactionRef = document.getElementById('transactionRef').value;
      if ((paymentMethod === "Credit Card" || paymentMethod === "Bank Transfer") && !transactionRef) {
        alert("⚠️ Please enter a transaction reference for this payment method.");
        return;
      }
      alert("✅ Payment processed (demo).");
      // إعادة تعيين الحقول
      paymentFormSection.style.display = 'none';
      paymentForm.reset();
    });
  
    paymentCancelBtn.addEventListener('click', () => {
      paymentFormSection.style.display = 'none';
      paymentForm.reset();
    });
  
    // ====== Updating the Remaining Balance (Optional) ======
    const paymentAmountNow = document.getElementById('paymentAmountNow');
    paymentAmountNow.addEventListener('input', () => {
      const amountDueStr = document.getElementById('paymentAmountDue').value.replace('$', '');
      const amountDue = parseFloat(amountDueStr) || 0;
      const payingNow = parseFloat(paymentAmountNow.value) || 0;
      const remaining = amountDue - payingNow;
      document.getElementById('remainingBalance').value = remaining > 0 ? `$${remaining.toFixed(2)}` : '$0.00';
    });
  
    // ====== Payment Summary (يمكن تحديث خلايا #summaryTbody ديناميكيًا) ======
  });
  