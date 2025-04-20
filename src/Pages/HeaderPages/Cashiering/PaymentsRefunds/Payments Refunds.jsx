document.addEventListener('DOMContentLoaded', () => {
    // --- Guest Search Section ---
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', () => {
      // هنا يمكن تنفيذ منطق البحث الحقيقي (مثال: AJAX)
      alert('Search functionality is not implemented in this demo.');
    });
    
    // --- Payment & Refund Section ---
    const transactionForm = document.getElementById('transactionForm');
    
    transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('transactionType').value;
      const method = document.getElementById('paymentMethod').value;
      const amount = parseFloat(document.getElementById('transactionAmount').value);
      const transDate = document.getElementById('transactionDate').value;
      
      // تحقق من الإدخالات
      if (!type) {
        alert("⚠️ Please select a transaction type (Payment or Refund).");
        return;
      }
      if (isNaN(amount) || amount <= 0) {
        alert("⚠️ Please enter a valid amount.");
        return;
      }
      // في حالة Refund، تحقق أن المبلغ لا يتجاوز الرصيد المدفوع (مثال بسيط)
      const currentBalance = 250.00; // مثال: الرصيد الحالي
      if (type === "Refund" && amount > currentBalance) {
        alert("⚠️ Refund amount cannot exceed total paid amount.");
        return;
      }
      
      // هنا يمكن إرسال البيانات للسيرفر أو تحديث الجدول مباشرةً
      alert("✅ Transaction Completed Successfully!");
      // تحديث سجل العمليات ودالة تحديث ملخص الحساب يمكن إضافتها هنا
    });
    
    // --- Payment History Section ---
    // في هذا المثال، يتم عرض بيانات ثابتة في الـHTML؛ يمكن تحديثها ديناميكيًا.
    
    // --- Account Summary Section ---
    // يمكن تحديث ملخص الحساب تلقائيًا عند إجراء معاملة جديدة.
    
    // --- Process Transaction Button ---
    const processBtn = document.getElementById('processBtn');
    processBtn.addEventListener('click', () => {
      // يمكن هنا تنفيذ إجراءات إضافية قبل المعالجة
      transactionForm.dispatchEvent(new Event('submit'));
    });
    
    // --- Payment Confirmation Modal ---
    const confirmationModalOverlay = document.getElementById('confirmationModalOverlay');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    
    // عند الضغط على زر Process Transaction، يتم عرض المودال (مثال بسيط)
    // يمكنك دمجها مع معالج نموذج الدفع
    // على سبيل المثال:
    // processBtn.addEventListener('click', openConfirmationModal);
    
    // زر إلغاء المودال
    modalCancelBtn.addEventListener('click', () => {
      confirmationModalOverlay.style.display = 'none';
    });
    
    // زر تأكيد المودال
    modalConfirmBtn.addEventListener('click', () => {
      alert("✅ Transaction Completed Successfully!");
      confirmationModalOverlay.style.display = 'none';
      // هنا يمكنك تحديث ملخص الحساب وسجل العمليات
    });
    
    // إغلاق المودال عند النقر خارج المحتوى
    confirmationModalOverlay.addEventListener('click', (e) => {
      if (e.target === confirmationModalOverlay) {
        confirmationModalOverlay.style.display = 'none';
      }
    });
  });
  