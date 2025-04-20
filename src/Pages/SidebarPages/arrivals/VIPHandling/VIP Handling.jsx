// Dummy data for VIP bookings
const vipBookings = {
    230045: {
      guestName: 'John Smith',
      bookingId: '230045',
      arrival: '2025-03-16',
      departure: '2025-03-20',
      vipLevel: 'Gold VIP',
      roomNumber: '505',
      specialRequests: 'Airport Pickup',
      butler: 'None',
      status: 'Confirmed'
    },
    230046: {
      guestName: 'Sarah Brown',
      bookingId: '230046',
      arrival: '2025-03-18',
      departure: '2025-03-22',
      vipLevel: 'Black VIP',
      roomNumber: '702',
      specialRequests: 'Private Chef',
      butler: 'None',
      status: 'Pending'
    }
  };
  
  // Function to apply VIP filters
  function applyVipFilters() {
    const searchQuery = document.getElementById('vipSearchInput').value;
    const arrivalDate = document.getElementById('vipArrivalDate').value;
    const departureDate = document.getElementById('vipDepartureDate').value;
    const roomType = document.getElementById('vipRoomType').value;
    const vipLevel = document.getElementById('vipLevel').value;
    console.log("VIP Filters Applied:", { searchQuery, arrivalDate, departureDate, roomType, vipLevel });
    // هنا يمكنك تنفيذ منطق التصفية وتحديث الجدول بناءً على القيم
  }
  
  // Function to view VIP guest details (opens modal)
  function viewVipDetails(bookingId) {
    console.log("Viewing VIP details for booking:", bookingId);
    const bookingData = vipBookings[bookingId];
    if (!bookingData) {
      alert("No data found for booking #" + bookingId);
      return;
    }
    // تعبئة بيانات النافذة المنبثقة بالتفاصيل
    document.getElementById('vipDetailsTitle').innerText = `VIP Guest Details - ${bookingData.guestName} (#${bookingData.bookingId})`;
    document.getElementById('vipDetailsName').innerText = bookingData.guestName;
    document.getElementById('vipDetailsBookingId').innerText = bookingData.bookingId;
    document.getElementById('vipDetailsArrival').innerText = bookingData.arrival;
    document.getElementById('vipDetailsDeparture').innerText = bookingData.departure;
    document.getElementById('vipDetailsVipLevel').innerText = bookingData.vipLevel;
    document.getElementById('vipDetailsRoomNumber').innerText = bookingData.roomNumber;
    document.getElementById('vipDetailsRequests').innerText = bookingData.specialRequests;
    document.getElementById('vipDetailsButler').innerText = bookingData.butler;
    // عرض النافذة
    document.getElementById('vipDetailsModal').style.display = 'flex';
  }
  
  // Function to open Edit VIP Status modal
  function editVipStatus(bookingId) {
    console.log("Editing VIP status for booking:", bookingId);
    document.getElementById('editVipModal').style.display = 'flex';
  }
  
  // Function to open Assign Butler modal
  function assignButler(bookingId) {
    console.log("Assigning butler for booking:", bookingId);
    document.getElementById('assignButlerModal').style.display = 'flex';
  }
  
  // Function to confirm butler assignment
  function confirmButlerAssignment() {
    alert("Butler successfully assigned to VIP Guest!");
    closeModal();
  }
  
  // Function to save VIP status changes
  function saveVipChanges() {
    alert("VIP status updated successfully!");
    closeModal();
  }
  
  // Function to close all modals
  function closeModal() {
    document.getElementById('assignButlerModal').style.display = 'none';
    document.getElementById('vipDetailsModal').style.display = 'none';
    document.getElementById('editVipModal').style.display = 'none';
  }
  