// محاكاة بحث Assigned Rooms
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Searching assigned rooms... (dummy search)");
  });
  
  // فتح نافذة تفاصيل الغرفة المُعيّنة
  function openDetailsModal(reservationId) {
    // تعبئة بيانات وهمية بناءً على reservationId
    document.getElementById("detailResId").innerText = reservationId;
    document.getElementById("detailResIdText").innerText = reservationId;
    
    if (reservationId === "RES-23001") {
      document.getElementById("detailGuestName").innerText = "James Smith";
      document.getElementById("detailCurrentRoom").innerText = "201";
      document.getElementById("detailRoomType").innerText = "Single";
      document.getElementById("detailFloor").innerText = "2";
      document.getElementById("detailArrival").innerText = "2025-06-05";
      document.getElementById("detailDeparture").innerText = "2025-06-10";
      document.getElementById("detailAssignedDate").innerText = "2025-06-02";
      document.getElementById("detailAssignedBy").innerText = "Maria Lewis";
      document.getElementById("detailSpecialRequests").innerText = "Near elevator, Non-smoking room.";
    } else if (reservationId === "RES-23002") {
      document.getElementById("detailGuestName").innerText = "Olivia Brown";
      document.getElementById("detailCurrentRoom").innerText = "404";
      document.getElementById("detailRoomType").innerText = "Suite";
      document.getElementById("detailFloor").innerText = "4";
      document.getElementById("detailArrival").innerText = "2025-06-08";
      document.getElementById("detailDeparture").innerText = "2025-06-12";
      document.getElementById("detailAssignedDate").innerText = "2025-06-03";
      document.getElementById("detailAssignedBy").innerText = "John Adams";
      document.getElementById("detailSpecialRequests").innerText = "Corner room with view.";
    } else if (reservationId === "RES-23003") {
      document.getElementById("detailGuestName").innerText = "William Johnson";
      document.getElementById("detailCurrentRoom").innerText = "301";
      document.getElementById("detailRoomType").innerText = "Double";
      document.getElementById("detailFloor").innerText = "3";
      document.getElementById("detailArrival").innerText = "2025-06-07";
      document.getElementById("detailDeparture").innerText = "2025-06-11";
      document.getElementById("detailAssignedDate").innerText = "2025-06-04";
      document.getElementById("detailAssignedBy").innerText = "Ahmed Omar";
      document.getElementById("detailSpecialRequests").innerText = "Extra towels requested.";
    }
    
    document.getElementById("detailsModal").style.display = "flex";
  }
  
  // فتح نافذة إعادة التعيين
  function openReassignModal(reservationId) {
    document.getElementById("reassignResId").innerText = reservationId;
    document.getElementById("reassignResIdText").innerText = reservationId;
    
    if (reservationId === "RES-23001") {
      document.getElementById("reassignGuestName").innerText = "James Smith";
      document.getElementById("reassignCurrentRoom").innerText = "201";
      document.getElementById("reassignRoomType").innerText = "Single";
    } else if (reservationId === "RES-23002") {
      document.getElementById("reassignGuestName").innerText = "Olivia Brown";
      document.getElementById("reassignCurrentRoom").innerText = "404";
      document.getElementById("reassignRoomType").innerText = "Suite";
    } else if (reservationId === "RES-23003") {
      document.getElementById("reassignGuestName").innerText = "William Johnson";
      document.getElementById("reassignCurrentRoom").innerText = "301";
      document.getElementById("reassignRoomType").innerText = "Double";
    }
    
    document.getElementById("reassignModal").style.display = "flex";
  }
  
  // تأكيد إعادة التعيين
  function confirmReassignment() {
    let newRoom = document.getElementById("newRoomSelect").value;
    let reason = document.getElementById("reassignReason").value.trim();
    if (newRoom === "") {
      alert("⚠️ Please select a new room to proceed.");
      return;
    }
    if (reason === "") {
      alert("⚠️ Please provide a reason for reassignment.");
      return;
    }
    // محاكاة نجاح إعادة التعيين
    alert("✅ Room reassigned successfully!");
    closeModal("reassignModal");
  }
  
  // إغلاق النوافذ (المودال)
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  