// Dummy data for Extend Stay reservations
const extendReservations = {
    10445: {
      bookingId: '10445',
      guestName: 'Omar Ali',
      roomNumber: '305',
      checkIn: '2025-03-16',
      currentCheckOut: '2025-03-20',
      roomType: 'Deluxe Room',
      paymentStatus: 'Paid'
    },
    10446: {
      bookingId: '10446',
      guestName: 'Sarah Brown',
      roomNumber: '702',
      checkIn: '2025-03-18',
      currentCheckOut: '2025-03-22',
      roomType: 'Suite',
      paymentStatus: 'Pending Payment'
    }
  };
  
  // Function to search guest for extend stay
  function searchGuest() {
    const query = document.getElementById('searchGuest').value;
    const currentCheckout = document.getElementById('currentCheckout').value;
    const roomType = document.getElementById('roomType').value;
    const paymentStatus = document.getElementById('paymentStatus').value;
    console.log("Search Guest:", { query, currentCheckout, roomType, paymentStatus });
    // منطق البحث والتصفية يمكن إضافته هنا
  }
  
  // Function to open Extend Stay Modal
  function openExtendModal(bookingId) {
    console.log("Opening Extend Stay modal for booking:", bookingId);
    const booking = extendReservations[bookingId];
    if (!booking) {
      alert("No data found for booking #" + bookingId);
      return;
    }
    // تعبئة بيانات النافذة المنبثقة
    document.getElementById('extendModalBookingId').innerText = booking.bookingId;
    document.getElementById('extendModalGuestName').innerText = booking.guestName;
    document.getElementById('extendRoomType').innerText = booking.roomType;
    document.getElementById('currentCheckoutDate').innerText = booking.currentCheckOut;
    
    // تعيين تاريخ المغادرة الجديد الافتراضي (يوم بعد تاريخ المغادرة الحالي)
    const currentCheckoutDate = new Date(booking.currentCheckOut);
    currentCheckoutDate.setDate(currentCheckoutDate.getDate() + 1);
    document.getElementById('newCheckoutDate').value = currentCheckoutDate.toISOString().split('T')[0];
    
    // إعادة تعيين التكلفة الافتراضية والملاحظات
    document.getElementById('extensionCost').innerText = "0.00";
    document.getElementById('extendNotes').value = "";
    
    // عرض النافذة
    document.getElementById('extendStayModal').style.display = 'flex';
  }
  
  // Function to update estimated extension cost based on new checkout date
  function updateExtensionCost() {
    const newCheckout = document.getElementById('newCheckoutDate').value;
    if (!newCheckout) return;
    const currentCheckoutText = document.getElementById('currentCheckoutDate').innerText;
    const currentCheckoutDate = new Date(currentCheckoutText);
    const newCheckoutDate = new Date(newCheckout);
    const diffTime = newCheckoutDate - currentCheckoutDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // مثال ثابت: 50 دولار في اليوم
    const cost = diffDays * 50;
    document.getElementById('extensionCost').innerText = cost.toFixed(2);
  }
  
  // Function to confirm extension and open Confirm Extension Modal
  function confirmExtension() {
    const newCheckout = document.getElementById('newCheckoutDate').value;
    const cost = document.getElementById('extensionCost').innerText;
    document.getElementById('confirmBookingId').innerText = document.getElementById('extendModalBookingId').innerText;
    document.getElementById('confirmGuestName').innerText = document.getElementById('extendModalGuestName').innerText;
    document.getElementById('confirmNewCheckout').innerText = newCheckout;
    document.getElementById('confirmCost').innerText = cost;
    document.getElementById('confirmExtensionModal').style.display = 'flex';
    document.getElementById('extendStayModal').style.display = 'none';
  }
  
  // Function to finalize extension
  function finalizeExtension() {
    alert("Stay successfully extended for " + document.getElementById('confirmGuestName').innerText +
      " until " + document.getElementById('confirmNewCheckout').innerText);
    closeModal();
  }
  
  // Function to view guest details (opens Guest Details Modal)
  function viewDetails(bookingId) {
    console.log("Viewing guest details for booking:", bookingId);
    const booking = extendReservations[bookingId];
    if (!booking) {
      alert("No data found for booking #" + bookingId);
      return;
    }
    // تعبئة بيانات نافذة التفاصيل
    document.getElementById('detailsBookingIdText').innerText = booking.bookingId;
    document.getElementById('detailsGuestNameText').innerText = booking.guestName;
    document.getElementById('detailsCheckIn').innerText = booking.checkIn;
    document.getElementById('detailsCheckout').innerText = booking.currentCheckOut;
    document.getElementById('detailsRoomType').innerText = booking.roomType;
    document.getElementById('detailsPaymentStatus').innerText = booking.paymentStatus;
    document.getElementById('detailsTotalPayments').innerText = "250.00"; // قيمة وهمية
    document.getElementById('detailsSpecialRequests').innerText = "N/A";
    document.getElementById('detailsGuestName').innerText = booking.guestName;
    document.getElementById('detailsBookingId').innerText = booking.bookingId;
    // عرض نافذة التفاصيل
    document.getElementById('guestDetailsModal').style.display = 'flex';
  }
  
  // Function to close all modals
  function closeModal() {
    document.getElementById('extendStayModal').style.display = 'none';
    document.getElementById('guestDetailsModal').style.display = 'none';
    document.getElementById('confirmExtensionModal').style.display = 'none';
  }
  