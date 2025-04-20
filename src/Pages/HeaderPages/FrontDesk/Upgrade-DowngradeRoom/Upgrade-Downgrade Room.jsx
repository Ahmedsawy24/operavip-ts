document.addEventListener('DOMContentLoaded', () => {
    // عناصر قسم البحث
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    // سيتم استبدال وظيفة البحث لاحقاً (demo)
    searchBtn.addEventListener('click', () => {
      alert('Search functionality is not implemented in this demo.');
    });
  
    // عرض معلومات العميل الحالي (يتم افتراض بيانات وهمية)
    const currentInfoTbody = document.getElementById('currentInfoTbody');
    // في هذا المثال يتم عرض صف واحد ثابت (يمكن استبداله بالبيانات الفعلية)
    // تم عرض البيانات في HTML بالفعل، لذا لا حاجة لتحديثها هنا
  
    // عناصر قسم تغيير الغرفة
    const newRoomType = document.getElementById('newRoomType');
    const availableRooms = document.getElementById('availableRooms');
    const newRoomRate = document.getElementById('newRoomRate');
    const changeReason = document.getElementById('changeReason');
  
    // عناصر قسم الدفع
    const originalTotal = document.getElementById('originalTotal');
    const newTotal = document.getElementById('newTotal');
    const difference = document.getElementById('difference');
    const adjustmentPaymentMethod = document.getElementById('adjustmentPaymentMethod');
  
    // زر تأكيد التغيير
    const confirmChangeBtn = document.getElementById('confirmChangeBtn');
  
    // عناصر المودال
    const confirmModalOverlay = document.getElementById('confirmModalOverlay');
    const modalGuestName = document.getElementById('modalGuestName');
    const modalOldRoom = document.getElementById('modalOldRoom');
    const modalNewRoom = document.getElementById('modalNewRoom');
    const modalRateDiff = document.getElementById('modalRateDiff');
    const modalNewTotal = document.getElementById('modalNewTotal');
    const modalPaymentMethod = document.getElementById('modalPaymentMethod');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  
    // بيانات وهمية للعميل الحالي (يمكن استبدالها بجلب البيانات من السيرفر)
    let currentReservation = {
      id: "230145",
      guestName: "Abdullah Alhammami",
      currentRoom: "101",
      roomType: "Single",
      checkIn: "12-04-2025",
      checkOut: "15-04-2025",
      currentRate: 100
    };
  
    // بيانات وهمية لقائمة الغرف المتاحة لكل نوع
    const roomsData = {
      Single: [
        { roomNumber: "102", rate: 100 },
        { roomNumber: "103", rate: 100 }
      ],
      Double: [
        { roomNumber: "201", rate: 150 },
        { roomNumber: "202", rate: 150 }
      ],
      Suite: [
        { roomNumber: "301", rate: 250 },
        { roomNumber: "302", rate: 250 }
      ],
      Family: [
        { roomNumber: "401", rate: 200 },
        { roomNumber: "402", rate: 200 }
      ]
    };
  
    // ====== تحديث Available Rooms عند تغيير نوع الغرفة ======
    newRoomType.addEventListener('change', () => {
      availableRooms.innerHTML = '<option value="">-- Select Room --</option>';
      const type = newRoomType.value;
      if (type && roomsData[type]) {
        roomsData[type].forEach(room => {
          const option = document.createElement('option');
          option.value = room.roomNumber;
          option.textContent = `Room ${room.roomNumber}`;
          option.setAttribute('data-rate', room.rate);
          availableRooms.appendChild(option);
        });
      }
      newRoomRate.value = "";
      calculateFinancials();
    });
  
    // عند اختيار غرفة، تحديث سعر الغرفة
    availableRooms.addEventListener('change', () => {
      const selected = availableRooms.selectedOptions[0];
      if (selected) {
        newRoomRate.value = selected.getAttribute('data-rate');
      } else {
        newRoomRate.value = "";
      }
      calculateFinancials();
    });
  
    // ====== حساب الفروقات المالية ======
    function calculateFinancials() {
      // افتراض: حساب بسيط للفارق بين السعر القديم والجديد
      const oldRate = currentReservation.currentRate;
      const newRate = parseFloat(newRoomRate.value) || 0;
      const rateDiff = newRate - oldRate;
      difference.value = rateDiff.toFixed(2);
      // افتراض: New Total = Original Total + rateDiff
      // لنفترض Original Total مُثبت مسبقًا (مثلاً $300.00)
      if (!originalTotal.value) {
        originalTotal.value = "300.00";
      }
      const orig = parseFloat(originalTotal.value);
      const newTotalValue = orig + rateDiff;
      newTotal.value = newTotalValue.toFixed(2);
    }
  
    // ====== فتح نافذة التأكيد ======
    confirmChangeBtn.addEventListener('click', () => {
      if (!newRoomType.value || !availableRooms.value) {
        alert("⚠️ Please select a new room.");
        return;
      }
      if (!adjustmentPaymentMethod.value) {
        alert("⚠️ Please select a payment method for adjustment.");
        return;
      }
      openConfirmModal();
    });
  
    function openConfirmModal() {
      modalGuestName.textContent = currentReservation.guestName;
      modalOldRoom.textContent = `${currentReservation.roomType}, Room ${currentReservation.currentRoom}`;
      modalNewRoom.textContent = `${newRoomType.value}, Room ${availableRooms.value}`;
      modalRateDiff.textContent = `$${difference.value}`;
      modalNewTotal.textContent = `$${newTotal.value}`;
      modalPaymentMethod.textContent = adjustmentPaymentMethod.value;
      confirmModalOverlay.style.display = 'flex';
    }
  
    function closeConfirmModal() {
      confirmModalOverlay.style.display = 'none';
    }
  
    modalCancelBtn.addEventListener('click', closeConfirmModal);
    modalConfirmBtn.addEventListener('click', () => {
      alert("✅ Room Successfully Changed!");
      closeConfirmModal();
      // إعادة تعيين الحقول (يمكنك تعديل ذلك)
      newRoomType.value = "";
      availableRooms.innerHTML = '<option value="">-- Select Room --</option>';
      newRoomRate.value = "";
      changeReason.value = "";
      adjustmentPaymentMethod.value = "";
      originalTotal.value = "";
      newTotal.value = "";
      difference.value = "";
    });
  
    // إغلاق المودال عند النقر خارج المحتوى
    confirmModalOverlay.addEventListener('click', (e) => {
      if (e.target === confirmModalOverlay) {
        closeConfirmModal();
      }
    });
  });
  