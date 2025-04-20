document.addEventListener('DOMContentLoaded', () => {
    // عناصر النموذج
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');
    const numNights = document.getElementById('numNights');
    const roomType = document.getElementById('roomType');
    const availableRooms = document.getElementById('availableRooms');
    const roomRate = document.getElementById('roomRate');
  
    const totalAmount = document.getElementById('totalAmount');
    const amountPaidNow = document.getElementById('amountPaidNow');
    const remainingBalance = document.getElementById('remainingBalance');
  
    const confirmBtn = document.getElementById('confirmBtn');
    const successMessage = document.getElementById('successMessage');
  
    // عناصر المودال
    const confirmModalOverlay = document.getElementById('confirmModalOverlay');
    const confirmModal = document.getElementById('confirmModal');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  
    // حقول العرض في المودال
    const confirmGuestName = document.getElementById('confirmGuestName');
    const confirmDates = document.getElementById('confirmDates');
    const confirmRoom = document.getElementById('confirmRoom');
    const confirmPayment = document.getElementById('confirmPayment');
    const confirmPaymentMethod = document.getElementById('confirmPaymentMethod');
  
    // أمثلة على الغرف المتاحة لكل نوع (يمكنك استبدالها بدوال fetch من السيرفر)
    const roomsData = {
      Single: [
        { roomNumber: 101, rate: 100 },
        { roomNumber: 102, rate: 100 }
      ],
      Double: [
        { roomNumber: 201, rate: 150 },
        { roomNumber: 202, rate: 150 }
      ],
      Suite: [
        { roomNumber: 301, rate: 250 },
        { roomNumber: 302, rate: 250 }
      ],
      Family: [
        { roomNumber: 401, rate: 200 },
        { roomNumber: 402, rate: 200 }
      ]
    };
  
    // ====== حساب عدد الليالي تلقائيًا ======
    function calculateNights() {
      if (checkInDate.value && checkOutDate.value) {
        const inDate = new Date(checkInDate.value);
        const outDate = new Date(checkOutDate.value);
        if (outDate > inDate) {
          const diffTime = Math.abs(outDate - inDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          numNights.value = diffDays;
        } else {
          numNights.value = 0;
        }
      } else {
        numNights.value = 0;
      }
      calculateTotal();
    }
  
    // ====== تعبئة قائمة الغرف المتاحة + تحديد سعر الغرفة ======
    function updateAvailableRooms() {
      availableRooms.innerHTML = '<option value="">-- Select Room --</option>';
      const selectedType = roomType.value;
      if (selectedType && roomsData[selectedType]) {
        roomsData[selectedType].forEach(room => {
          const opt = document.createElement('option');
          opt.value = room.roomNumber;
          opt.textContent = `Room ${room.roomNumber}`;
          opt.setAttribute('data-rate', room.rate);
          availableRooms.appendChild(opt);
        });
      }
      // إعادة تعيين الحقلين
      roomRate.value = '';
      calculateTotal();
    }
  
    // عند اختيار غرفة، حدّث سعر الغرفة
    function selectRoom() {
      const selectedOption = availableRooms.selectedOptions[0];
      if (selectedOption) {
        const rate = selectedOption.getAttribute('data-rate');
        roomRate.value = rate;
      } else {
        roomRate.value = '';
      }
      calculateTotal();
    }
  
    // ====== حساب المبلغ الإجمالي (Total Amount) ======
    function calculateTotal() {
      const nights = parseInt(numNights.value) || 0;
      const rate = parseFloat(roomRate.value) || 0;
      const total = nights * rate;
      totalAmount.value = total > 0 ? total.toFixed(2) : '';
      updateRemainingBalance();
    }
  
    // ====== تحديث الرصيد المتبقي (Remaining Balance) ======
    function updateRemainingBalance() {
      const total = parseFloat(totalAmount.value) || 0;
      const paidNow = parseFloat(amountPaidNow.value) || 0;
      const balance = total - paidNow;
      remainingBalance.value = balance.toFixed(2);
    }
  
    // ====== إظهار المودال ======
    function openConfirmModal() {
      // التحقق من الإدخالات (يمكن إضافة تنبيهات إضافية)
      if (!checkInDate.value || !checkOutDate.value || !roomType.value || !availableRooms.value || !totalAmount.value) {
        alert('Please fill in all required fields.');
        return;
      }
      // ملء بيانات المودال
      const fName = document.getElementById('firstName').value;
      const lName = document.getElementById('lastName').value;
      confirmGuestName.textContent = `${fName} ${lName}`;
  
      confirmDates.textContent = `${checkInDate.value} to ${checkOutDate.value}`;
  
      const rType = roomType.value;
      const rNum = availableRooms.value;
      confirmRoom.textContent = `${rType}, Room ${rNum}`;
  
      const total = totalAmount.value;
      const paid = amountPaidNow.value || 0;
      confirmPayment.textContent = `$${total} & Paid $${paid}`;
  
      const payMethod = document.getElementById('paymentMethod').value;
      confirmPaymentMethod.textContent = payMethod;
  
      // عرض المودال
      confirmModalOverlay.style.display = 'flex';
    }
  
    // ====== إغلاق المودال ======
    function closeModal() {
      confirmModalOverlay.style.display = 'none';
    }
  
    // ====== تأكيد الحجز ======
    function confirmReservation() {
      // هنا يمكن إرسال البيانات للسيرفر أو حفظها
      closeModal();
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
  
      // إعادة تعيين الحقول إذا أردت
      document.getElementById('walkInForm').reset();
      checkInDate.value = '';
      checkOutDate.value = '';
      numNights.value = '';
      roomType.value = '';
      availableRooms.innerHTML = '<option value="">-- Select Room --</option>';
      roomRate.value = '';
      totalAmount.value = '';
      amountPaidNow.value = '0';
      remainingBalance.value = '';
      document.getElementById('specialRequests').value = '';
    }
  
    // ====== الأحداث ======
    checkInDate.addEventListener('change', calculateNights);
    checkOutDate.addEventListener('change', calculateNights);
  
    roomType.addEventListener('change', updateAvailableRooms);
    availableRooms.addEventListener('change', selectRoom);
  
    amountPaidNow.addEventListener('input', updateRemainingBalance);
  
    confirmBtn.addEventListener('click', openConfirmModal);
  
    modalCancelBtn.addEventListener('click', closeModal);
    modalConfirmBtn.addEventListener('click', confirmReservation);
  
    // إغلاق المودال عند النقر خارج المحتوى
    confirmModalOverlay.addEventListener('click', (e) => {
      if (e.target === confirmModalOverlay) {
        closeModal();
      }
    });
  
    // افتراضيًا يمكن ضبط تاريخ اليوم في checkInDate
    const today = new Date().toISOString().split('T')[0];
    checkInDate.value = today;
  });
  