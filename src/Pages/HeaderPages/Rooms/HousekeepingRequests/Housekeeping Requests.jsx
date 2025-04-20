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
  
    // ====== Add New Request ======
    const addNewRequestBtn = document.getElementById('addNewRequestBtn');
    const newRequestSection = document.getElementById('newRequestSection');
    const newRequestForm = document.getElementById('newRequestForm');
    const newRequestSubmitBtn = document.getElementById('newRequestSubmitBtn');
    const newRequestCancelBtn = document.getElementById('newRequestCancelBtn');
  
    addNewRequestBtn.addEventListener('click', () => {
      // إظهار نموذج إضافة طلب
      newRequestSection.style.display = 'block';
      editRequestSection.style.display = 'none';
    });
  
    newRequestSubmitBtn.addEventListener('click', () => {
      // تحقق من الحقول الأساسية
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
      // تحقق من تعيين الموظف إذا لزم
      // ... إلخ
      alert("✅ New housekeeping request submitted (demo).");
      newRequestSection.style.display = 'none';
      newRequestForm.reset();
    });
  
    newRequestCancelBtn.addEventListener('click', () => {
      newRequestSection.style.display = 'none';
      newRequestForm.reset();
    });
  
    // ====== Edit/Update Request ======
    const requestsTbody = document.getElementById('requestsTbody');
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
        document.getElementById('editGuestName').value = row.cells[2].textContent;
        document.getElementById('editRequestType').value = row.cells[3].textContent;
        // تحديد الحالة والـ Priority
        // هذه مجرد أمثلة - يمكنك تحويل النصوص إلى قيم Dropdown
        document.getElementById('editStatus').value = extractStatus(row.cells[4].textContent);
        document.getElementById('editPriority').value = extractPriority(row.cells[5].textContent);
        document.getElementById('editAssignedTo').value = row.cells[6].textContent;
        
        // عرض نموذج التعديل
        editRequestSection.style.display = 'block';
        newRequestSection.style.display = 'none';
      }
    });
  
    function extractStatus(cellText) {
      // من النص "🔴 Open" نعيد "Open"
      if (cellText.toLowerCase().includes("open")) return "Open";
      if (cellText.toLowerCase().includes("in progress")) return "In Progress";
      if (cellText.toLowerCase().includes("completed")) return "Completed";
      return "";
    }
  
    function extractPriority(cellText) {
      // من النص "🔥 Urgent" نعيد "Urgent"
      if (cellText.toLowerCase().includes("urgent")) return "Urgent";
      if (cellText.toLowerCase().includes("medium")) return "Medium";
      if (cellText.toLowerCase().includes("normal") || cellText.toLowerCase().includes("✅")) return "Normal";
      return "";
    }
  
    editRequestUpdateBtn.addEventListener('click', () => {
      const editAssignedTo = document.getElementById('editAssignedTo').value;
      const editStatus = document.getElementById('editStatus').value;
      if (!editAssignedTo && editStatus !== "Open") {
        alert("⚠️ Please assign a housekeeping staff before updating the status.");
        return;
      }
      alert("🔄 Housekeeping request updated (demo).");
      editRequestSection.style.display = 'none';
      editRequestForm.reset();
    });
  
    editRequestCancelBtn.addEventListener('click', () => {
      editRequestSection.style.display = 'none';
      editRequestForm.reset();
    });
  
    // ====== Housekeeping Summary ======
    // يمكن تحديث خلايا #summaryTbody ديناميكيًا حسب الحالة
  
  });
  