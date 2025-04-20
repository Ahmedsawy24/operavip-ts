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
  
    // ====== Blocked Rooms List ======
    const blockedTbody = document.getElementById('blockedTbody');
  
    // ====== Add New Block ======
    const addNewBlockBtn = document.getElementById('addNewBlockBtn');
    const newBlockSection = document.getElementById('newBlockSection');
    const newBlockForm = document.getElementById('newBlockForm');
    const newBlockSubmitBtn = document.getElementById('newBlockSubmitBtn');
    const newBlockCancelBtn = document.getElementById('newBlockCancelBtn');
  
    addNewBlockBtn.addEventListener('click', () => {
      // إظهار نموذج إضافة حجب جديد
      newBlockSection.style.display = 'block';
      editBlockSection.style.display = 'none';
    });
  
    newBlockSubmitBtn.addEventListener('click', () => {
      const newRoomNumber = document.getElementById('newRoomNumber').value;
      const newBlockType = document.getElementById('newBlockType').value;
      const newStartDate = document.getElementById('newStartDate').value;
      const newEndDate = document.getElementById('newEndDate').value;
      if (!newRoomNumber) {
        alert("⚠️ Please enter a valid Room Number.");
        return;
      }
      if (!newBlockType) {
        alert("⚠️ Please select a Block Type (OOO or OOS).");
        return;
      }
      if (!newStartDate || !newEndDate || newEndDate < newStartDate) {
        alert("⚠️ Please select valid start/end dates.");
        return;
      }
      // تحقق من تعيين الموظف إذا لزم
      const newAssignedTo = document.getElementById('newAssignedTo').value;
      if (!newAssignedTo) {
        alert("⚠️ Please assign a maintenance staff.");
        return;
      }
      alert("✅ New block created (demo).");
      newBlockSection.style.display = 'none';
      newBlockForm.reset();
    });
  
    newBlockCancelBtn.addEventListener('click', () => {
      newBlockSection.style.display = 'none';
      newBlockForm.reset();
    });
  
    // ====== Edit/Update Block ======
    const editBlockSection = document.getElementById('editBlockSection');
    const editBlockForm = document.getElementById('editBlockForm');
    const editBlockUpdateBtn = document.getElementById('editBlockUpdateBtn');
    const editBlockCancelBtn = document.getElementById('editBlockCancelBtn');
  
    let selectedBlockId = null;
  
    blockedTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentNode.parentNode;
        selectedBlockId = row.getAttribute('data-blockid');
  
        // جلب البيانات من الصف
        document.getElementById('editBlockId').value = row.cells[0].textContent;
        document.getElementById('editRoomNumber').value = row.cells[1].textContent;
        document.getElementById('editBlockType').value = row.cells[2].textContent;
        document.getElementById('editBlockStatus').value = parseBlockStatus(row.cells[3].textContent);
  
        document.getElementById('editStartDate').value = formatDateToInput(row.cells[4].textContent);
        document.getElementById('editEndDate').value = formatDateToInput(row.cells[5].textContent);
        document.getElementById('editReason').value = row.cells[6].textContent;
  
        // إظهار قسم التعديل
        editBlockSection.style.display = 'block';
        newBlockSection.style.display = 'none';
      }
    });
  
    function parseBlockStatus(cellText) {
      const lowerText = cellText.toLowerCase();
      if (lowerText.includes("active")) return "Active";
      if (lowerText.includes("resolved")) return "Resolved";
      return "";
    }
  
    function formatDateToInput(ddmm) {
      // "12-04-2025" => "2025-04-12"
      const parts = ddmm.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return '';
    }
  
    editBlockUpdateBtn.addEventListener('click', () => {
      const blockStatus = document.getElementById('editBlockStatus').value;
      const endDate = document.getElementById('editEndDate').value;
      if (!endDate) {
        alert("⚠️ Please select a valid end date.");
        return;
      }
      if (blockStatus === "Resolved") {
        // تأكد من وجود ملاحظة
        const completionNotes = document.getElementById('editCompletionNotes').value;
        if (!completionNotes) {
          alert("⚠️ Please provide a reason for unblocking.");
          return;
        }
      }
      alert("🔄 Block status updated (demo).");
      editBlockSection.style.display = 'none';
      editBlockForm.reset();
    });
  
    editBlockCancelBtn.addEventListener('click', () => {
      editBlockSection.style.display = 'none';
      editBlockForm.reset();
    });
  });
  