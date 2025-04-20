// Function to search guest
function searchGuest() {
    const searchQuery = document.getElementById('searchInput').value;
    console.log("Searching for guest:", searchQuery);
    // Implement search logic if needed
  }
  
  // Function to view guest details (opens modal)
  function viewDetails(reservationId) {
    console.log("Viewing details for reservation:", reservationId);
    document.getElementById('guestDetailsModal').style.display = 'flex';
  }
  
  // Function to close all modals
  function closeModal() {
    document.getElementById('guestDetailsModal').style.display = 'none';
  }
  
  // Function to update guest status
  function updateGuestStatus() {
    const status = document.getElementById('statusChange').value;
    const notes = document.getElementById('updateNotes').value;
    console.log("Status updated to:", status, "Notes:", notes);
    alert("Guest status updated successfully!");
    closeModal();
  }
  