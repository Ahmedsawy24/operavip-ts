// محاكاة بحث حالة الغرف
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Searching rooms... (dummy search)");
  });
  
  // فتح نافذة تفاصيل حالة الغرفة
  function openDetailsModal(roomNumber) {
    document.getElementById("detailRoomNumber").innerText = roomNumber;
    document.getElementById("detailRoomNum").innerText = roomNumber;
    // تعبئة بيانات وهمية بناءً على رقم الغرفة
    if (roomNumber === "101") {
      document.getElementById("detailFloor").innerText = "1";
      document.getElementById("detailRoomType").innerText = "Single";
      document.getElementById("detailStatus").innerText = "Clean ✅";
      document.getElementById("detailLastUpdated").innerText = "2025-06-01";
      document.getElementById("detailUpdatedBy").innerText = "Ahmad Ali";
      document.getElementById("detailNotes").innerText = "All amenities replenished. Room is ready for guests.";
    } else if (roomNumber === "202") {
      document.getElementById("detailFloor").innerText = "2";
      document.getElementById("detailRoomType").innerText = "Double";
      document.getElementById("detailStatus").innerText = "Dirty ❌";
      document.getElementById("detailLastUpdated").innerText = "2025-06-02";
      document.getElementById("detailUpdatedBy").innerText = "Sarah Noor";
      document.getElementById("detailNotes").innerText = "Room requires cleaning urgently.";
    } else if (roomNumber === "305") {
      document.getElementById("detailFloor").innerText = "3";
      document.getElementById("detailRoomType").innerText = "Suite";
      document.getElementById("detailStatus").innerText = "Inspected 🔎";
      document.getElementById("detailLastUpdated").innerText = "2025-06-03";
      document.getElementById("detailUpdatedBy").innerText = "John Doe";
      document.getElementById("detailNotes").innerText = "Room inspected and all is well.";
    } else if (roomNumber === "406") {
      document.getElementById("detailFloor").innerText = "4";
      document.getElementById("detailRoomType").innerText = "Double";
      document.getElementById("detailStatus").innerText = "In Progress 🕒";
      document.getElementById("detailLastUpdated").innerText = "2025-06-04";
      document.getElementById("detailUpdatedBy").innerText = "Mona Saeed";
      document.getElementById("detailNotes").innerText = "Cleaning is in progress.";
    } else if (roomNumber === "509") {
      document.getElementById("detailFloor").innerText = "5";
      document.getElementById("detailRoomType").innerText = "Single";
      document.getElementById("detailStatus").innerText = "Out of Service ⚠️";
      document.getElementById("detailLastUpdated").innerText = "2025-06-05";
      document.getElementById("detailUpdatedBy").innerText = "Admin User";
      document.getElementById("detailNotes").innerText = "Room is out of service due to maintenance.";
    }
    // فتح النافذة (مودال)
    document.getElementById("detailsModal").style.display = "flex";
  }
  
  // فتح نافذة تغيير الحالة
  function openChangeModal(roomNumber) {
    document.getElementById("changeRoomNumber").innerText = roomNumber;
    // تعبئة الحالة الحالية بناءً على رقم الغرفة
    if (roomNumber === "101") {
      document.getElementById("currentStatus").innerText = "Clean ✅";
    } else if (roomNumber === "202") {
      document.getElementById("currentStatus").innerText = "Dirty ❌";
    } else if (roomNumber === "305") {
      document.getElementById("currentStatus").innerText = "Inspected 🔎";
    } else if (roomNumber === "406") {
      document.getElementById("currentStatus").innerText = "In Progress 🕒";
    } else if (roomNumber === "509") {
      document.getElementById("currentStatus").innerText = "Out of Service ⚠️";
    }
    document.getElementById("changeModal").style.display = "flex";
  }
  
  // تأكيد تغيير الحالة
  function confirmStatusChange() {
    let newStatus = document.getElementById("newStatus").value;
    if (newStatus === "") {
      alert("⚠️ Please select a new status to proceed.");
      return;
    }
    // محاكاة نجاح التحديث
    alert("✅ Room status updated successfully!");
    closeModal("changeModal");
  }
  
  // إغلاق النوافذ (مودال)
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  