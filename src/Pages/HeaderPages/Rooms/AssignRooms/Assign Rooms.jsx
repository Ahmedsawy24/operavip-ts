document.addEventListener('DOMContentLoaded', () => {
    // ========== Search Functionality ==========
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
  
    searchBtn.addEventListener('click', () => {
      // منطق البحث (مثال: AJAX) أو تحديث الحجز غير المعين
      alert('Search functionality is not implemented in this demo.');
    });
  
    resetBtn.addEventListener('click', () => {
      // إعادة تعيين الحقول
      document.getElementById('searchForm').reset();
      // يمكن أيضًا إعادة ضبط قائمة الحجوزات
      alert('Search form reset (demo).');
    });
  
    // ========== Unassigned Reservations (Selection) ==========
    const reservationsTbody = document.getElementById('reservationsTbody');
    const availableRoomsSection = document.getElementById('availableRoomsSection');
    const assignRoomSection = document.getElementById('assignRoomSection');
  
    let selectedReservation = null;
  
    reservationsTbody.addEventListener('click', (e) => {
      if (e.target && e.target.nodeName === "TD") {
        const row = e.target.parentNode;
        // تمييز الصف المحدد
        Array.from(reservationsTbody.children).forEach(r => r.classList.remove('selected-row'));
        row.classList.add('selected-row');
  
        // حفظ بيانات الحجز المحدد
        selectedReservation = {
          reservationId: row.cells[0].textContent,
          guestName: row.cells[1].textContent,
          checkInDate: row.cells[2].textContent,
          checkOutDate: row.cells[3].textContent,
          roomType: row.cells[4].textContent,
          specialRequests: row.cells[5].textContent
        };
  
        // عرض قائمة الغرف المتاحة
        availableRoomsSection.style.display = 'block';
        assignRoomSection.style.display = 'none';
      }
    });
  
    // ========== Available Rooms (Selection) ==========
    const roomsTbody = document.getElementById('roomsTbody');
  
    let selectedRoom = null;
  
    roomsTbody.addEventListener('click', (e) => {
      if (e.target && e.target.nodeName === "TD") {
        const row = e.target.parentNode;
        // تمييز الصف المحدد
        Array.from(roomsTbody.children).forEach(r => r.classList.remove('selected-row'));
        row.classList.add('selected-row');
  
        // حفظ بيانات الغرفة المحددة
        selectedRoom = {
          roomNumber: row.cells[0].textContent,
          roomType: row.cells[1].textContent,
          status: row.cells[2].textContent,
          housekeeping: row.cells[3].textContent,
          notes: row.cells[4].textContent
        };
  
        // ملء نموذج التعيين
        fillAssignRoomForm();
      }
    });
  
    function fillAssignRoomForm() {
      if (selectedReservation && selectedRoom) {
        // عرض قسم التعيين
        assignRoomSection.style.display = 'block';
  
        // ملء الحقول
        document.getElementById('assignGuestName').value = selectedReservation.guestName;
        document.getElementById('assignReservationId').value = selectedReservation.reservationId;
        document.getElementById('selectedRoomNumber').value = selectedRoom.roomNumber;
        document.getElementById('selectedRoomType').value = selectedRoom.roomType;
        document.getElementById('expectedCheckout').value = formatDateToInput(selectedReservation.checkOutDate);
        document.getElementById('housekeepingStatus').value = selectedRoom.housekeeping;
      }
    }
  
    // تحويل تاريخ DD-MM-YYYY إلى YYYY-MM-DD (بسيط)
    function formatDateToInput(ddmm) {
      // مثال: "12-04-2025" => "2025-04-12"
      const parts = ddmm.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return '';
    }
  
    // ========== Assign Room Form ==========
    const assignConfirmBtn = document.getElementById('assignConfirmBtn');
    const assignCancelBtn = document.getElementById('assignCancelBtn');
    const assignedTbody = document.getElementById('assignedTbody');
  
    assignConfirmBtn.addEventListener('click', () => {
      if (!selectedReservation || !selectedRoom) {
        alert('No reservation or room selected.');
        return;
      }
      // تحقق من حالة الغرفة (مثال)
      if (selectedRoom.housekeeping.toLowerCase() === 'dirty') {
        alert('⚠️ Room requires housekeeping before check-in.');
        return;
      }
  
      // مثال: إذا كانت الغرفة مشغولة
      if (selectedRoom.status.toLowerCase() !== 'vacant') {
        alert('⚠️ Room is already assigned to another guest.');
        return;
      }
  
      // إضافة الحجز إلى جدول Assigned Rooms Summary
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${selectedReservation.guestName}</td>
        <td>${selectedRoom.roomNumber}</td>
        <td>${selectedReservation.checkInDate}</td>
        <td>${selectedReservation.checkOutDate}</td>
        <td>Assigned</td>
      `;
      assignedTbody.appendChild(newRow);
  
      // رسالة نجاح
      alert(`✅ Room ${selectedRoom.roomNumber} successfully assigned to ${selectedReservation.guestName}.`);
  
      // إعادة ضبط الاختيارات
      selectedReservation = null;
      selectedRoom = null;
      Array.from(reservationsTbody.children).forEach(r => r.classList.remove('selected-row'));
      Array.from(roomsTbody.children).forEach(r => r.classList.remove('selected-row'));
      assignRoomSection.style.display = 'none';
      availableRoomsSection.style.display = 'none';
    });
  
    assignCancelBtn.addEventListener('click', () => {
      // إخفاء قسم التعيين وإلغاء الاختيار
      assignRoomSection.style.display = 'none';
      selectedRoom = null;
      Array.from(roomsTbody.children).forEach(r => r.classList.remove('selected-row'));
    });
  });
  