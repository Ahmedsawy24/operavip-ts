document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Functionality ======
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      // منطق البحث (AJAX/Fetch) لتصفية الطلبات
      alert('Search functionality is not implemented in this demo.');
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert('Search form reset (demo).');
    });
  
    // ====== Requests Table ======
    const requestsTbody = document.getElementById('requestsTbody');
  
    // ====== Add New Request ======
    const newRequestSection = document.getElementById('newRequestSection');
    const newRequestForm = document.getElementById('newRequestForm');
    const newRequestSubmitBtn = document.getElementById('newRequestSubmitBtn');
    const newRequestCancelBtn = document.getElementById('newRequestCancelBtn');
    const addNewRequestBtn = document.getElementById('addNewRequestBtn');
  
    addNewRequestBtn.addEventListener('click', () => {
      // إظهار نموذج إضافة طلب
      newRequestSection.style.display = 'block';
      editRequestSection.style.display = 'none';
    });
  
    newRequestSubmitBtn.addEventListener('click', () => {
      const newRoomNumber = document.getElementById('newRoomNumber').value;
      const newRequestType = document.getElementById('newRequestType').value;
      if (!newRoomNumber) {
        alert("⚠️ Please enter a valid Room Number.");
        return;
      }
      if (!newRequestType) {
        alert("⚠️ Please select a Request Type.");
        return;
      }
      const newAssignedTo = document.getElementById('newAssignedTo').value;
      if (!newAssignedTo) {
        alert("⚠️ Please assign a maintenance staff.");
        return;
      }
      alert("✅ New maintenance request submitted (demo).");
      newRequestSection.style.display = 'none';
      newRequestForm.reset();
    });
  
    newRequestCancelBtn.addEventListener('click', () => {
      newRequestSection.style.display = 'none';
      newRequestForm.reset();
    });
  
    // ====== Edit/Update Request ======
    const editRequestSection = document.getElementById('editRequestSection');
    const editRequestForm = document.getElementById('editRequestForm');
    const editRequestUpdateBtn = document.getElementById('editRequestUpdateBtn');
    const editRequestCancelBtn = document.getElementById('editRequestCancelBtn');
  
    let selectedRequestId = null;
  
    requestsTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentNode.parentNode;
        selectedRequestId = row.getAttribute('data-reqid');
  
        // جلب البيانات من الصف
        document.getElementById('editRequestId').value = row.cells[0].textContent;
        document.getElementById('editRoomNumber').value = row.cells[1].textContent;
        document.getElementById('editRequestType').value = row.cells[2].textContent;
        document.getElementById('editStatus').value = parseStatus(row.cells[3].textContent);
        document.getElementById('editPriority').value = parsePriority(row.cells[4].textContent);
        document.getElementById('editAssignedTo').value = row.cells[5].textContent;
  
        // إظهار قسم التعديل
        editRequestSection.style.display = 'block';
        newRequestSection.style.display = 'none';
      }
    });
  
    function parseStatus(cellText) {
      const lowerText = cellText.toLowerCase();
      if (lowerText.includes("open")) return "Open";
      if (lowerText.includes("in progress")) return "In Progress";
      if (lowerText.includes("completed")) return "Completed";
      return "";
    }
  
    function parsePriority(cellText) {
      const lowerText = cellText.toLowerCase();
      if (lowerText.includes("urgent") || lowerText.includes("🔥")) return "Urgent";
      if (lowerText.includes("medium") || lowerText.includes("⚠️")) return "Medium";
      if (lowerText.includes("normal") || lowerText.includes("✅")) return "Normal";
      return "";
    }
  
    editRequestUpdateBtn.addEventListener('click', () => {
      const assignedTo = document.getElementById('editAssignedTo').value;
      const status = document.getElementById('editStatus').value;
      if (!assignedTo && status !== "Open") {
        alert("⚠️ Please assign a maintenance staff before updating the status.");
        return;
      }
      alert("🔄 Maintenance request updated (demo).");
      editRequestSection.style.display = 'none';
      editRequestForm.reset();
    });
  
    editRequestCancelBtn.addEventListener('click', () => {
      editRequestSection.style.display = 'none';
      editRequestForm.reset();
    });
  
    // ====== Maintenance Summary ======
    // يمكن تحديث خلايا #summaryTbody ديناميكيًا حسب الحالة
  });
  