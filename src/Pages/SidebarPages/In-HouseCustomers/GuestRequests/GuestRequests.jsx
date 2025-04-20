/********************************
 * بيانات وهمية (Dummy Data)
 * لطلبات الضيوف والخدمات الخاصة
 ********************************/
const guestRequestsData = {
    10045: {
      requestId: 10045,
      guestName: 'Ahmed Saeed',
      roomNumber: '305',
      requestType: 'Housekeeping',
      status: 'Pending',
      requestDate: '2025-03-18',
      description: 'Need extra towels and cleaning.',
      staffNotes: ''
    },
    10046: {
      requestId: 10046,
      guestName: 'Sarah Jones',
      roomNumber: '702',
      requestType: 'Food & Beverage',
      status: 'In Progress',
      requestDate: '2025-03-17',
      description: 'Breakfast request at 8 AM daily.',
      staffNotes: ''
    },
    10047: {
      requestId: 10047,
      guestName: 'John Doe',
      roomNumber: '412',
      requestType: 'Transportation',
      status: 'Completed',
      requestDate: '2025-03-16',
      description: 'Airport drop-off on departure day.',
      staffNotes: ''
    }
  };
  
  /********************************
   * البحث والتصفية (Search & Filter)
   ********************************/
  function searchRequests() {
    const searchGuest = document.getElementById('searchGuest').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const requestDate = document.getElementById('requestDate').value;
    const requestStatus = document.getElementById('requestStatus').value;
    const requestType = document.getElementById('requestType').value;
  
    console.log("Search Requests:", {
      searchGuest,
      roomNumber,
      requestDate,
      requestStatus,
      requestType
    });
    // منطق البحث والتصفية يمكن تنفيذه هنا (تحديث الجدول)
  }
  
  /********************************
   * عرض تفاصيل الطلب (View Details)
   ********************************/
  function viewRequestDetails(requestId) {
    console.log("Viewing request details:", requestId);
    const requestData = guestRequestsData[requestId];
    if (!requestData) {
      alert("No data found for request #" + requestId);
      return;
    }
  
    // تعبئة عناصر النافذة المنبثقة
    document.getElementById('detailsRequestId').innerText = requestData.requestId;
    document.getElementById('detailsGuestName').innerText = requestData.guestName;
    document.getElementById('detailGuestNameText').innerText = requestData.guestName;
    document.getElementById('detailRoomNumberText').innerText = requestData.roomNumber;
    document.getElementById('detailRequestTypeText').innerText = requestData.requestType;
    document.getElementById('detailStatusText').innerText = requestData.status;
    document.getElementById('detailRequestDateText').innerText = requestData.requestDate;
    document.getElementById('detailDescription').innerText = requestData.description || 'N/A';
    document.getElementById('detailStaffNotes').value = requestData.staffNotes || '';
  
    // إظهار النافذة
    document.getElementById('requestDetailsModal').style.display = 'flex';
  }
  
  /********************************
   * فتح نافذة تحديث الحالة
   ********************************/
  function openUpdateStatusModal(requestId) {
    console.log("Open update status modal for:", requestId);
    const requestData = guestRequestsData[requestId];
    if (!requestData) {
      alert("No data found for request #" + requestId);
      return;
    }
  
    // تعبئة عناصر النافذة المنبثقة
    document.getElementById('updateRequestId').innerText = requestData.requestId;
    document.getElementById('updateGuestName').innerText = requestData.guestName;
    document.getElementById('currentStatus').innerText = requestData.status;
    document.getElementById('newStatusSelect').value = requestData.status;
    document.getElementById('updateNotes').value = '';
  
    // إظهار النافذة
    document.getElementById('updateStatusModal').style.display = 'flex';
  }
  
  /********************************
   * تأكيد تحديث الحالة
   ********************************/
  function confirmStatusUpdate() {
    const requestId = document.getElementById('updateRequestId').innerText;
    const newStatus = document.getElementById('newStatusSelect').value;
    const notes = document.getElementById('updateNotes').value;
    console.log("Confirm status update for:", requestId, "New Status:", newStatus, "Notes:", notes);
  
    // تحديث البيانات الوهمية
    if (guestRequestsData[requestId]) {
      guestRequestsData[requestId].status = newStatus;
    }
  
    alert(`Request #${requestId} status updated to ${newStatus}.`);
    closeModal();
  }
  
  /********************************
   * إغلاق جميع النوافذ المنبثقة
   ********************************/
  function closeModal() {
    document.getElementById('requestDetailsModal').style.display = 'none';
    document.getElementById('updateStatusModal').style.display = 'none';
  }
  