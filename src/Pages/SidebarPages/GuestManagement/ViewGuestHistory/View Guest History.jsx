// محاكاة عملية البحث عن سجل الضيوف
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Searching guest history... (dummy search)");
  });
  
  // فتح نافذة تفاصيل سجل الضيف
  function openDetailsModal(guestId) {
    // تعبئة بيانات وهمية بناءً على guestId
    if (guestId === "GST-1001") {
      document.getElementById("detailGuestId").innerText = "GST-1001";
      document.getElementById("detailGuestIdModal").innerText = "GST-1001";
      document.getElementById("detailGuestName").innerText = "Emily Clark";
      document.getElementById("detailGuestNameModal").innerText = "Emily Clark";
      document.getElementById("detailEmail").innerText = "emily@example.com";
      document.getElementById("detailPhone").innerText = "+1-202-555-0150";
      document.getElementById("detailNationality").innerText = "USA";
      document.getElementById("detailVIP").innerText = "VIP 🥇";
      document.getElementById("detailTotalVisits").innerText = "12";
      document.getElementById("detailTotalSpend").innerText = "4,500";
      document.getElementById("detailAverageSpend").innerText = "375";
      document.getElementById("detailLastVisit").innerText = "2025-05-25";
  
      // تعبئة سجل الزيارات الوهمية
      let visitsTableBody = document.querySelector("#visitsTable tbody");
      visitsTableBody.innerHTML = `
        <tr>
          <td>RES-5412</td>
          <td>2025-05-20</td>
          <td>2025-05-25</td>
          <td>Suite</td>
          <td>401</td>
          <td>1200</td>
          <td>Requested extra towels</td>
        </tr>
        <tr>
          <td>RES-5201</td>
          <td>2025-02-15</td>
          <td>2025-02-20</td>
          <td>Double</td>
          <td>305</td>
          <td>900</td>
          <td>Preferred room with sea view</td>
        </tr>
        <tr>
          <td>RES-5010</td>
          <td>2024-12-10</td>
          <td>2024-12-15</td>
          <td>Single</td>
          <td>101</td>
          <td>600</td>
          <td>Early check-in requested</td>
        </tr>
      `;
    }
    // يمكن إضافة شروط أخرى لبيانات ضيوف مختلفين
  
    document.getElementById("detailsModal").style.display = "flex";
  }
  
  // إغلاق النوافذ (المودال)
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  