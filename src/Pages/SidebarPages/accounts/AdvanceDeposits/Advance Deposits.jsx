// Dummy Data for Advance Deposits
const advanceDeposits = {
    "AD-20001": {
      depositId: "AD-20001",
      reservationId: "RES-10945",
      guestName: "Omar Ali",
      amount: "$300.00",
      depositDate: "2025-04-05",
      status: "Received",
      depositMethod: "Credit Card",
      processedBy: "Ahmed Khaled",
      remarks: "No additional notes."
    },
    "AD-20002": {
      depositId: "AD-20002",
      reservationId: "RES-10950",
      guestName: "Layla Majid",
      amount: "$150.00",
      depositDate: "2025-04-10",
      status: "Pending",
      depositMethod: "",
      processedBy: "",
      remarks: ""
    },
    "AD-20003": {
      depositId: "AD-20003",
      reservationId: "RES-10960",
      guestName: "Ahmed Hassan",
      amount: "$500.00",
      depositDate: "2025-03-20",
      status: "Refunded",
      depositMethod: "Bank Transfer",
      processedBy: "John Doe",
      remarks: "Refund processed."
    }
  };
  
  /********************************
   * البحث عن الدفعات المقدمة
   ********************************/
  function searchDeposits() {
    const reservationId = document.getElementById('reservationId').value;
    const guestName = document.getElementById('guestName').value;
    const depositDateFrom = document.getElementById('depositDateFrom').value;
    const depositDateTo = document.getElementById('depositDateTo').value;
    const depositStatus = document.getElementById('depositStatus').value;
    
    console.log("Searching Deposits:", {
      reservationId,
      guestName,
      depositDateFrom,
      depositDateTo,
      depositStatus
    });
    // يمكن هنا إضافة منطق التصفية وتحديث الجدول ديناميكيًا
  }
  
  /********************************
   * عرض تفاصيل الدفعة
   ********************************/
  function viewDepositDetails(depositId) {
    const deposit = advanceDeposits[depositId];
    if (!deposit) return alert("No data found for Deposit #" + depositId);
  
    document.getElementById('depositModalId').innerText = deposit.depositId;
    document.getElementById('detailReservationId').innerText = deposit.reservationId;
    document.getElementById('detailGuestName').innerText = deposit.guestName;
    document.getElementById('detailAmount').innerText = deposit.amount;
    document.getElementById('detailDepositDate').innerText = deposit.depositDate;
    document.getElementById('detailDepositMethod').innerText = deposit.depositMethod || "N/A";
    document.getElementById('detailProcessedBy').innerText = deposit.processedBy || "N/A";
    document.getElementById('detailDepositStatus').innerText = deposit.status;
    document.getElementById('detailRemarks').innerText = deposit.remarks || "No additional notes.";
  
    document.getElementById('depositDetailsModal').style.display = 'flex';
  }
  
  /********************************
   * فتح نافذة استرداد الدفعة
   ********************************/
  function openRefundModal(depositId) {
    const deposit = advanceDeposits[depositId];
    if (!deposit) return alert("No data found for Deposit #" + depositId);
  
    document.getElementById('refundModalId').innerText = deposit.depositId;
    document.getElementById('refundDepositAmount').innerText = deposit.amount;
    document.getElementById('refundDate').value = new Date().toISOString().split("T")[0];
  
    document.getElementById('refundModal').style.display = 'flex';
  }
  
  /********************************
   * تأكيد عملية الاسترداد
   ********************************/
  function confirmRefund() {
    const refundAmount = document.getElementById('refundAmount').value;
    const refundDate = document.getElementById('refundDate').value;
    const refundMethod = document.getElementById('refundMethod').value;
    const refundReason = document.getElementById('refundReason').value;
    
    if (!refundAmount || parseFloat(refundAmount) <= 0) {
      return alert("⚠️ Please enter a valid refund amount.");
    }
  
    // منطق التأكد من مبلغ الاسترداد
    alert("Refund successfully processed!");
    closeModal();
  }
  
  /********************************
   * تأكيد الدفعة لحالة Pending
   ********************************/
  function confirmDeposit(depositId) {
    alert(`Deposit ${depositId} confirmed!`);
    // تغيير الحالة إلى Received مثلاً
  }
  
  /********************************
   * إلغاء الدفعة لحالة Pending
   ********************************/
  function cancelDeposit(depositId) {
    alert(`Deposit ${depositId} cancelled!`);
    // تغيير الحالة إلى cancelled
  }
  
  /********************************
   * إغلاق جميع النوافذ
   ********************************/
  function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }
  
  /********************************
   * طباعة الإيصال
   ********************************/
  function printReceipt() {
    alert("Printing receipt...");
  }
  