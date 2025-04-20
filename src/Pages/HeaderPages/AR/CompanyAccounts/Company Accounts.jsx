document.addEventListener('DOMContentLoaded', () => {
    // ====== Search Functionality ======
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      // منطق البحث (AJAX/Fetch) لتصفية حسابات الشركات
      alert('Search functionality is not implemented in this demo.');
    });
  
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert('Search form reset (demo).');
    });
  
    // ====== Company Accounts Table ======
    const accountsTbody = document.getElementById('accountsTbody');
  
    // ====== Add New Company Section ======
    const addNewCompanyBtn = document.getElementById('addNewCompanyBtn');
    const newCompanySection = document.getElementById('newCompanySection');
    const newCompanyForm = document.getElementById('newCompanyForm');
    const newCompanySubmitBtn = document.getElementById('newCompanySubmitBtn');
    const newCompanyCancelBtn = document.getElementById('newCompanyCancelBtn');
  
    addNewCompanyBtn.addEventListener('click', () => {
      // إظهار نموذج إضافة شركة جديدة
      newCompanySection.style.display = 'block';
      editCompanySection.style.display = 'none';
    });
  
    newCompanySubmitBtn.addEventListener('click', () => {
      // تحقق من الحقول الأساسية
      const companyName = document.getElementById('companyName').value.trim();
      const phoneNumber = document.getElementById('phoneNumber').value.trim();
      const email = document.getElementById('email').value.trim();
      const contractStartDate = document.getElementById('contractStartDate').value;
      const contractExpiryDate = document.getElementById('contractExpiryDate').value;
  
      if (!companyName) {
        alert("⚠️ Please enter a valid Company Name.");
        return;
      }
      // تحقق من البريد الإلكتروني (بسيط)
      if (!validateEmail(email)) {
        alert("⚠️ Please enter a valid Email Address.");
        return;
      }
      // تحقق من تواريخ العقد
      if (contractExpiryDate && contractStartDate && contractExpiryDate < contractStartDate) {
        alert("⚠️ Contract Expiry Date cannot be before the Start Date.");
        return;
      }
      alert("✅ New company account saved (demo).");
      newCompanySection.style.display = 'none';
      newCompanyForm.reset();
    });
  
    newCompanyCancelBtn.addEventListener('click', () => {
      newCompanySection.style.display = 'none';
      newCompanyForm.reset();
    });
  
    // ====== Edit Company Section ======
    const editCompanySection = document.getElementById('editCompanySection');
    const editCompanyForm = document.getElementById('editCompanyForm');
    const editCompanyUpdateBtn = document.getElementById('editCompanyUpdateBtn');
    const editCompanyCancelBtn = document.getElementById('editCompanyCancelBtn');
  
    let selectedCompanyId = null;
  
    accountsTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentNode.parentNode;
        selectedCompanyId = row.getAttribute('data-companyid');
  
        // تعبئة بيانات التعديل من الصف
        document.getElementById('editCompanyId').value = row.cells[0].textContent;
        document.getElementById('editCompanyName').value = row.cells[1].textContent;
        document.getElementById('editContactPerson').value = row.cells[2].textContent;
        // تحويل $1,500.00 إلى رقم
        const balanceStr = row.cells[3].textContent.replace('$','').replace(',','');
        document.getElementById('editOutstandingBalance').value = parseFloat(balanceStr) || 0;
        // تاريخ انتهاء العقد
        document.getElementById('editContractExpiryDate').value = convertDateToInput(row.cells[4].textContent);
        // حالة الحساب
        const statusCell = row.cells[5].textContent.toLowerCase();
        if (statusCell.includes("active")) {
          document.getElementById('editAccountStatus').value = "Active";
        } else if (statusCell.includes("overdue")) {
          document.getElementById('editAccountStatus').value = "Overdue";
        } else {
          document.getElementById('editAccountStatus').value = "Inactive";
        }
  
        // يمكن أن نضع أي تحقق إضافي
        // عرض قسم التعديل
        editCompanySection.style.display = 'block';
        newCompanySection.style.display = 'none';
      }
    });
  
    editCompanyUpdateBtn.addEventListener('click', () => {
      // تحقق من الحقول الأساسية
      const editContactPerson = document.getElementById('editContactPerson').value.trim();
      const editPhoneNumber = document.getElementById('editPhoneNumber').value.trim();
      const editEmail = document.getElementById('editEmail').value.trim();
      const expiryDate = document.getElementById('editContractExpiryDate').value;
  
      if (!editContactPerson) {
        alert("⚠️ Please enter a valid Contact Person.");
        return;
      }
      if (!validateEmail(editEmail)) {
        alert("⚠️ Please enter a valid Email Address.");
        return;
      }
      // تحقق من التاريخ
      if (!expiryDate) {
        alert("⚠️ Please select a valid Contract Expiry Date.");
        return;
      }
      alert("🔄 Company account updated (demo).");
      editCompanySection.style.display = 'none';
      editCompanyForm.reset();
    });
  
    editCompanyCancelBtn.addEventListener('click', () => {
      // إلغاء الحساب (Deactivate) أو أي إجراء آخر
      alert("🛑 Deactivate account (demo).");
      editCompanySection.style.display = 'none';
      editCompanyForm.reset();
    });
  
    // ====== Helper Functions ======
    function validateEmail(email) {
      // تحقق بسيط من صيغة البريد
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  
    function convertDateToInput(ddmmyyyy) {
      // "31-12-2025" => "2025-12-31"
      const parts = ddmmyyyy.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return '';
    }
  
    // ====== Summary Section ======
    // يمكن تحديث خلايا #summaryTbody ديناميكيًا عند الحاجة
  });
  