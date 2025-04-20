// معالجة نموذج البحث (محاكاة بحث وهمي)
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Searching reservations... (dummy search)");
});

// معالجة نموذج التعيين اليدوي
document.getElementById("manualAssignmentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let newRoom = document.getElementById("newRoomSelect").value;
  if (newRoom === "") {
    alert("⚠️ Please select a room to complete the assignment.");
  } else {
    alert("Manual room assignment confirmed for reservation " + document.getElementById("manualReservationId").innerText);
  }
});

// معالجة نموذج التعيين التلقائي
document.getElementById("autoAssignmentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("autoAssignMessage").style.display = "block";
  setTimeout(function() {
    document.getElementById("autoAssignMessage").style.display = "none";
  }, 3000);
});

// فتح نافذة تفاصيل التعيين (Modal)
function openDetailsModal(reservationId) {
  // تعبئة بيانات وهمية حسب الـ reservationId
  document.getElementById("modalResId").innerText = reservationId;
  if (reservationId === "RES-15001") {
    document.getElementById("modalGuestName").innerText = "Khalid Al-Ahmad";
    document.getElementById("modalRoomType").innerText = "Suite";
    document.getElementById("modalAssignedRoom").innerText = "701";
    document.getElementById("modalArrival").innerText = "2025-08-01";
    document.getElementById("modalDeparture").innerText = "2025-08-05";
    document.getElementById("modalPaymentStatus").innerText = "Paid";
    document.getElementById("modalBookingChannel").innerText = "Website";
    document.getElementById("modalAssignDate").innerText = "2025-07-25";
    document.getElementById("modalAssignedBy").innerText = "John Smith";
    document.getElementById("modalSpecialRequests").innerText = "Extra pillows requested";
  } else if (reservationId === "RES-15003") {
    document.getElementById("modalGuestName").innerText = "Omar Youssef";
    document.getElementById("modalRoomType").innerText = "Single";
    document.getElementById("modalAssignedRoom").innerText = "405";
    document.getElementById("modalArrival").innerText = "2025-08-03";
    document.getElementById("modalDeparture").innerText = "2025-08-08";
    document.getElementById("modalPaymentStatus").innerText = "Paid";
    document.getElementById("modalBookingChannel").innerText = "Walk-in";
    document.getElementById("modalAssignDate").innerText = "2025-07-26";
    document.getElementById("modalAssignedBy").innerText = "Sara Ibrahim";
    document.getElementById("modalSpecialRequests").innerText = "No smoking room preferred";
  }
  // فتح المودال
  document.getElementById("detailsModal").style.display = "flex";
}

// دالة فتح مودال إعادة التعيين مع تعبئة بيانات بسيطة
function openReassignModal(reservationId) {
  document.getElementById("reassignResId").innerText = reservationId;
  if (reservationId === "RES-15001") {
    document.getElementById("currentRoomModal").innerText = "701";
  } else if (reservationId === "RES-15003") {
    document.getElementById("currentRoomModal").innerText = "405";
  }
  document.getElementById("reassignModal").style.display = "flex";
}

// إجراء تعيين غرفة (للحجوزات غير المعينة)
function assignRoom(reservationId) {
  alert("Assigning room for reservation " + reservationId + " (dummy action)");
}

// تأكيد إعادة التعيين بعد التحقق من اختيار غرفة جديدة
function confirmReassignment() {
  let newRoom = document.getElementById("newReassignRoom").value;
  if(newRoom === ""){
    alert("⚠️ Please select a room to complete the reassignment.");
    return;
  }
  alert("Room reassignment confirmed. New Room: " + newRoom);
  closeModal("reassignModal");
}

// دالة إغلاق المودال (Modal)
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// دالة تعديل التعيين (تطبيق وهمي)
function editAssignment() {
  alert("Edit assignment functionality (dummy action)");
}
