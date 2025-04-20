// محاكاة عملية البحث عن القائمة السوداء
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Searching blacklist... (dummy search)");
  });
  
  // فتح نافذة تفاصيل القيد
  function openDetailsModal(restrictionId) {
    if (restrictionId === "BL-5001") {
      document.getElementById("detailRestrictionId").innerText = "BL-5001";
      document.getElementById("detailRestrictionIdText").innerText = "BL-5001";
      document.getElementById("detailGuestName").innerText = "John Doe";
      document.getElementById("detailGuestNameModal").innerText = "John Doe";
      document.getElementById("detailEmail").innerText = "john@example.com";
      document.getElementById("detailPhone").innerText = "+1-202-555-0170";
      document.getElementById("detailNationality").innerText = "USA";
      document.getElementById("detailRestrictionReason").innerText = "Payment Issues 💳";
      document.getElementById("detailRestrictionStatus").innerText = "Active 🟢";
      document.getElementById("detailRestrictionDate").innerText = "2025-01-15";
      document.getElementById("detailExpiryDate").innerText = "2026-01-15";
      document.getElementById("detailAddedBy").innerText = "Admin User";
      document.getElementById("detailNotes").innerText = "Multiple declined credit card transactions. Guest informed but issue unresolved.";
    } else if (restrictionId === "BL-5002") {
      document.getElementById("detailRestrictionId").innerText = "BL-5002";
      document.getElementById("detailRestrictionIdText").innerText = "BL-5002";
      document.getElementById("detailGuestName").innerText = "Ahmad Salem";
      document.getElementById("detailGuestNameModal").innerText = "Ahmad Salem";
      document.getElementById("detailEmail").innerText = "ahmad@web.ae";
      document.getElementById("detailPhone").innerText = "+971-50-1234876";
      document.getElementById("detailNationality").innerText = "UAE";
      document.getElementById("detailRestrictionReason").innerText = "Misbehavior 🚫";
      document.getElementById("detailRestrictionStatus").innerText = "Expired 🔴";
      document.getElementById("detailRestrictionDate").innerText = "2024-05-10";
      document.getElementById("detailExpiryDate").innerText = "2025-05-10";
      document.getElementById("detailAddedBy").innerText = "Sarah Noor";
      document.getElementById("detailNotes").innerText = "Guest was involved in several incidents. Restriction period ended.";
    } else if (restrictionId === "BL-5003") {
      document.getElementById("detailRestrictionId").innerText = "BL-5003";
      document.getElementById("detailRestrictionIdText").innerText = "BL-5003";
      document.getElementById("detailGuestName").innerText = "Maria Schmidt";
      document.getElementById("detailGuestNameModal").innerText = "Maria Schmidt";
      document.getElementById("detailEmail").innerText = "maria@web.de";
      document.getElementById("detailPhone").innerText = "+49-170-1231234";
      document.getElementById("detailNationality").innerText = "Germany";
      document.getElementById("detailRestrictionReason").innerText = "Fraud ⚠️";
      document.getElementById("detailRestrictionStatus").innerText = "Active 🟢";
      document.getElementById("detailRestrictionDate").innerText = "2025-03-20";
      document.getElementById("detailExpiryDate").innerText = "2026-03-20";
      document.getElementById("detailAddedBy").innerText = "John Adams";
      document.getElementById("detailNotes").innerText = "Suspicious activity detected. Under monitoring.";
    }
    document.getElementById("detailsModal").style.display = "flex";
  }
  
  // فتح نافذة إزالة القيد
  function openRemoveModal(restrictionId) {
    if (restrictionId === "BL-5001") {
      document.getElementById("removeRestrictionId").innerText = "BL-5001";
      document.getElementById("removeGuestName").innerText = "John Doe";
      document.getElementById("removeGuestNameModal").innerText = "John Doe";
    } else if (restrictionId === "BL-5003") {
      document.getElementById("removeRestrictionId").innerText = "BL-5003";
      document.getElementById("removeGuestName").innerText = "Maria Schmidt";
      document.getElementById("removeGuestNameModal").innerText = "Maria Schmidt";
    }
    document.getElementById("removeModal").style.display = "flex";
  }
  
  // فتح نافذة تجديد القيد
  function openRenewModal(restrictionId) {
    if (restrictionId === "BL-5002") {
      document.getElementById("renewRestrictionId").innerText = "BL-5002";
      document.getElementById("renewGuestName").innerText = "Ahmad Salem";
      document.getElementById("renewGuestNameModal").innerText = "Ahmad Salem";
    }
    document.getElementById("renewModal").style.display = "flex";
  }
  
  // تأكيد إزالة القيد
  function confirmRemoval() {
    alert("✅ Restriction removed successfully!");
    closeModal("removeModal");
  }
  
  // تأكيد تجديد القيد
  function confirmRenewal() {
    let newExpiry = document.getElementById("newExpiryDate").value;
    if (newExpiry === "") {
      alert("⚠️ Please select a new expiry date.");
      return;
    }
    alert("✅ Restriction renewed successfully!");
    closeModal("renewModal");
  }
  
  // إغلاق النوافذ (المودال)
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  