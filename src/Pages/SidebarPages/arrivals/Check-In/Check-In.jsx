// بيانات وهمية لعرض التفاصيل في View Details
const dummyBookings = {
    230101: {
      bookingId: "230101",
      guestName: "Abdullah Alhammami",
      arrivalDate: "10-04-2025",
      departureDate: "15-04-2025",
      roomType: "Single",
      status: "Confirmed"
    },
    230102: {
      bookingId: "230102",
      guestName: "Ahed Sami",
      arrivalDate: "11-04-2025",
      departureDate: "12-04-2025",
      roomType: "Double",
      status: "Pending"
    }
  };
  
  // Function to apply filters
  function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const departureDate = document.getElementById('departureDate').value;
    console.log("Filters Applied:", { searchQuery, arrivalDate, departureDate });
    // Implement filtering logic here
  }
  
  // Function to view reservation details
  function viewDetails(bookingId) {
    console.log("Viewing details for booking:", bookingId);
  
    // لو لدينا بيانات وهمية، نستخدمها
    const data = dummyBookings[bookingId];
    if (data) {
      document.getElementById('detailsBookingId').innerText = data.bookingId;
      document.getElementById('detailsGuestName').innerText = data.guestName;
      document.getElementById('detailsArrivalDate').innerText = data.arrivalDate;
      document.getElementById('detailsDepartureDate').innerText = data.departureDate;
      document.getElementById('detailsRoomType').innerText = data.roomType;
      document.getElementById('detailsStatus').innerText = data.status;
    }
  
    document.getElementById('bookingDetailsModal').style.display = 'flex';
  }
  
  // Function to close modals
  function closeModal() {
    document.getElementById('bookingDetailsModal').style.display = 'none';
    document.getElementById('assignRoomModal').style.display = 'none';
    document.getElementById('checkInModal').style.display = 'none';
  }
  
  // Assign Room
  function assignRoom(bookingId) {
    console.log("Assigning room for booking:", bookingId);
    document.getElementById('assignRoomModal').style.display = 'flex';
  }
  
  // Confirm room assignment
  function confirmRoomAssignment() {
    alert("Room successfully assigned to guest!");
    closeModal();
  }
  
  // Check-In Guest
  function checkInGuest(bookingId) {
    console.log("Checking in guest for booking:", bookingId);
    document.getElementById('checkInModal').style.display = 'flex';
  }
  
  // Confirm Check-In
  function confirmCheckIn() {
    alert("Guest checked-in successfully!");
    closeModal();
  }
  