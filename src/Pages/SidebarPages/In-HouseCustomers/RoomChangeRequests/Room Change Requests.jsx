/********************************
 * بيانات وهمية (Dummy Data)
 * لطلبات تغيير الغرف
 ********************************/
const roomChangeRequests = {
    3045: {
      requestId: 3045,
      guestName: 'Omar Ali',
      currentRoom: '305',
      requestedRoom: '410 (Suite)',
      status: 'Pending',
      requestDate: '2025-03-18',
      guestNotes: 'Need bigger space for family.',
    },
    3046: {
      requestId: 3046,
      guestName: 'Sara Brown',
      currentRoom: '702',
      requestedRoom: '603 (Deluxe)',
      status: 'Approved',
      requestDate: '2025-03-16',
      guestNotes: 'Prefer lower floor for easy access.',
    },
  };
  
  /********************************
   * البحث والتصفية (Search & Filter)
   ********************************/
  function searchRequests() {
    const searchGuest = document.getElementById('searchGuest').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const departureDate = document.getElementById('departureDate').value;
    const currentRoomType = document.getElementById('currentRoomType').value;
    const requestStatus = document.getElementById('requestStatus').value;
  
    console.log("Searching Requests:", {
      searchGuest,
      arrivalDate,
      departureDate,
      currentRoomType,
      requestStatus
    });
    // منطق البحث والتصفية يمكن تنفيذه هنا (تحديث الجدول)
  }
  
  /********************************
   * عرض تفاصيل الطلب (View Details)
   ********************************/
  function viewRequestDetails(requestId) {
    console.log("Viewing request details:", requestId);
    const requestData = roomChangeRequests[requestId];
    if (!requestData) {
      alert("No data found for request #" + requestId);
      return;
    }
  
    // تعبئة عناصر النافذة المنبثقة
    document.getElementById('modalRequestId').innerText = requestData.requestId;
    document.getElementById('modalGuestName').innerText = requestData.guestName;
    document.getElementById('detailGuestName').innerText = requestData.guestName;
    document.getElementById('detailCurrentRoom').innerText = requestData.currentRoom;
    document.getElementById('detailRequestedRoom').innerText = requestData.requestedRoom;
    document.getElementById('detailRequestDate').innerText = requestData.requestDate;
    document.getElementById('requestStatusSelect').value = requestData.status;
    document.getElementById('guestNotes').innerText = requestData.guestNotes || 'N/A';
  
    // إظهار النافذة
    document.getElementById('requestDetailsModal').style.display = 'flex';
  }
  
  /********************************
   * الموافقة أو الرفض من نافذة التفاصيل
   ********************************/
  function approveRequestFromDetails() {
    document.getElementById('requestStatusSelect').value = 'Approved';
    alert("Room change request approved (from details)!");
    closeModal();
  }
  
  function declineRequestFromDetails() {
    document.getElementById('requestStatusSelect').value = 'Declined';
    alert("Room change request declined (from details)!");
    closeModal();
  }
  
  /********************************
   * فتح نافذة التأكيد للموافقة أو الرفض
   ********************************/
  function openConfirmDecisionModal(requestId, decision) {
    console.log("Open confirm decision modal for:", requestId, decision);
    const requestData = roomChangeRequests[requestId];
    if (!requestData) {
      alert("No data found for request #" + requestId);
      return;
    }
  
    // تعبئة عناصر النافذة المنبثقة
    document.getElementById('confirmRequestId').innerText = requestData.requestId;
    document.getElementById('confirmGuestName').innerText = requestData.guestName;
    document.getElementById('confirmCurrentRoom').innerText = requestData.currentRoom;
    document.getElementById('confirmRequestedRoom').innerText = requestData.requestedRoom;
    document.getElementById('decisionText').innerText = decision;
  
    // إظهار النافذة
    document.getElementById('confirmDecisionModal').style.display = 'flex';
  }
  
  /********************************
   * إتمام الموافقة أو الرفض
   ********************************/
  function finalizeDecision() {
    const decision = document.getElementById('decisionText').innerText;
    const requestId = document.getElementById('confirmRequestId').innerText;
    alert(`Request #${requestId} has been ${decision}!`);
    closeModal();
  }
  
  /********************************
   * إغلاق جميع النوافذ المنبثقة
   ********************************/
  function closeModal() {
    document.getElementById('requestDetailsModal').style.display = 'none';
    document.getElementById('confirmDecisionModal').style.display = 'none';
  }
  