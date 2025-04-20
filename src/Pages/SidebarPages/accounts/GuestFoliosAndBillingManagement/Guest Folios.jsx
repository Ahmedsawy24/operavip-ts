// Sample Data
const guestFolioData = {
    10445: {
      folioId: 10445,
      guestName: 'Omar Ali',
      roomNumber: '305',
      balance: '$250.00',
      dateCreated: '2025-03-18',
      status: 'Unpaid',
      items: [
        { name: 'Room Charges', amount: '$200' },
        { name: 'Mini Bar', amount: '$50' }
      ]
    },
    10446: {
      folioId: 10446,
      guestName: 'Sara Ahmed',
      roomNumber: '702',
      balance: '$120.00',
      dateCreated: '2025-03-17',
      status: 'Paid',
      items: [
        { name: 'Room Charges', amount: '$100' },
        { name: 'Room Service', amount: '$20' }
      ]
    },
    10447: {
      folioId: 10447,
      guestName: 'John Doe',
      roomNumber: '412',
      balance: '$500.00',
      dateCreated: '2025-03-16',
      status: 'Pending',
      items: [
        { name: 'Room Charges', amount: '$300' },
        { name: 'Laundry Service', amount: '$50' },
        { name: 'Transport', amount: '$150' }
      ]
    }
  };
  
  // Search Function
  function searchFolio() {
    const searchValue = document.getElementById('searchFolio').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const folioDate = document.getElementById('folioDate').value;
    const folioStatus = document.getElementById('folioStatus').value;
  
    console.log("Search Folios:", { searchValue, roomNumber, folioDate, folioStatus });
  }
  
  // View Folio Details
  function viewFolioDetails(folioId) {
    const folio = guestFolioData[folioId];
    if (!folio) return alert("No data found for Folio #" + folioId);
  
    // Fill Modal with data
    document.getElementById('detailsFolioId').innerText = folio.folioId;
    document.getElementById('detailsGuestName').innerText = folio.guestName;
    document.getElementById('detailsRoomNumber').innerText = folio.roomNumber;
    document.getElementById('detailsFolioDate').innerText = folio.dateCreated;
    document.getElementById('detailsStatus').innerText = folio.status;
    document.getElementById('detailsTotalAmount').innerText = folio.balance;
    const itemsList = document.getElementById('detailsItemsList');
    itemsList.innerHTML = "";
    folio.items.forEach(item => {
      const li = document.createElement('li');
      li.innerText = `${item.name} - ${item.amount}`;
      itemsList.appendChild(li);
    });
  
    // Show Modal
    document.getElementById('folioDetailsModal').style.display = 'flex';
  }
  
  // Payment Functions
  function payFolio(folioId) {
    const folio = guestFolioData[folioId];
    if (!folio) return alert("No data found for Folio #" + folioId);
    document.getElementById('paymentFolioId').innerText = folio.folioId;
    document.getElementById('paymentAmountDue').innerText = folio.balance;
    document.getElementById('paymentModal').style.display = 'flex';
  }
  
  // Confirm Payment
  function confirmPayment() {
    alert("Payment successfully processed!");
    closeModal();
  }
  
  // Close Modal
  function closeModal() {
    document.getElementById('folioDetailsModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'none';
  }
  