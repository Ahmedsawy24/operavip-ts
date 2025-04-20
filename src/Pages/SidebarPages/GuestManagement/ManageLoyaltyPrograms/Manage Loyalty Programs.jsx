// محاكاة بحث Loyalty Programs
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Searching loyalty programs... (dummy search)");
  });
  
  // فتح نافذة تفاصيل برنامج الولاء
  function openDetailsModal(programId) {
    // تعبئة بيانات وهمية بناءً على programId
    if (programId === "LP-1001") {
      document.getElementById("detailProgramId").innerText = "LP-1001";
      document.getElementById("detailProgramIdText").innerText = "LP-1001";
      document.getElementById("detailProgramName").innerText = "Royal Club";
      document.getElementById("detailProgramNameText").innerText = "Royal Club";
      document.getElementById("detailMembershipLevel").innerText = "Diamond 💎";
      document.getElementById("detailPointsRequired").innerText = "50,000";
      document.getElementById("detailProgramStatus").innerText = "Active 🟢";
      document.getElementById("detailStartDate").innerText = "2025-01-01";
      document.getElementById("detailEndDate").innerText = "2025-12-31";
      document.getElementById("detailMembersCount").innerText = "120";
      document.getElementById("detailProgramDescription").innerText = "Exclusive benefits including complimentary room upgrades, late check-out, free breakfast, and airport transfers.";
    }
    // يمكن إضافة شروط لبرامج أخرى
  
    document.getElementById("detailsModal").style.display = "flex";
  }
  
  // فتح نافذة تعديل برنامج الولاء
  function openEditModal(programId) {
    // تعبئة بيانات وهمية بناءً على programId
    if (programId === "LP-1001") {
      document.getElementById("editProgramIdModal").innerText = "LP-1001";
      document.getElementById("editProgramNameModal").innerText = "Royal Club";
      document.getElementById("editProgramName").value = "Royal Club";
      document.getElementById("editMembershipLevel").value = "diamond";
      document.getElementById("editPointsRequired").value = "50000";
      document.getElementById("editProgramStatus").value = "active";
      document.getElementById("editStartDate").value = "2025-01-01";
      document.getElementById("editEndDate").value = "2025-12-31";
      document.getElementById("editProgramDescription").value = "Exclusive benefits including complimentary room upgrades, late check-out, free breakfast, and airport transfers.";
    }
    // يمكن إضافة شروط لبرامج أخرى
  
    document.getElementById("editModal").style.display = "flex";
  }
  
  // معالجة نموذج تعديل برنامج الولاء
  document.getElementById("editForm").addEventListener("submit", function(e) {
    e.preventDefault();
    // تحقق من المدخلات الأساسية
    let programName = document.getElementById("editProgramName").value.trim();
    let startDate = document.getElementById("editStartDate").value;
    let endDate = document.getElementById("editEndDate").value;
    if (programName === "") {
      alert("⚠️ Please enter the program name to proceed.");
      return;
    }
    if (endDate < startDate) {
      alert("⚠️ End Date cannot be earlier than Start Date.");
      return;
    }
    // محاكاة حفظ التعديلات
    alert("✅ Loyalty program updated successfully!");
    closeModal("editModal");
  });
  
  // تغيير حالة البرنامج (تنشيط/إلغاء تنشيط)
  function toggleProgramStatus(programId) {
    // يمكن استخدام شرط لتبديل الحالة بناءً على الحالة الحالية
    alert("Toggling program status for " + programId + " (dummy action)");
  }
  
  // إغلاق النوافذ (المودال)
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  