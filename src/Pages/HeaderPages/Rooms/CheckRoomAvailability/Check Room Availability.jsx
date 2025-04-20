document.addEventListener('DOMContentLoaded', () => {
    // --- Search Form Section ---
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    searchBtn.addEventListener('click', () => {
      // تحقق من التواريخ
      const checkIn = document.getElementById('checkInDate').value;
      const checkOut = document.getElementById('checkOutDate').value;
      if (!checkIn || !checkOut || checkOut <= checkIn) {
        alert("⚠️ Please select valid check-in and check-out dates.");
        return;
      }
      // تحقق من اختيار نوع الغرفة (مثال)
      const roomType = document.getElementById('roomType').value;
      if (!roomType) {
        alert("⚠️ Please select a room type to continue.");
        return;
      }
      // منطق البحث (مثال: AJAX لجلب بيانات الغرف)
      alert("Searching for available rooms (demo).");
      // عرض النتائج - تحديث الجداول...
    });
    
    resetBtn.addEventListener('click', () => {
      document.getElementById('searchForm').reset();
      alert("Search form reset (demo).");
    });
    
    // --- Rooms Table (Selection) ---
    const roomsTbody = document.getElementById('roomsTbody');
    const noRoomsAlert = document.getElementById('noRoomsAlert');
    
    // في حال عدم توفر أي غرفة
    // noRoomsAlert.style.display = 'block';
    // أو بالعكس:
    // noRoomsAlert.style.display = 'none';
    
    roomsTbody.addEventListener('click', (e) => {
      if (e.target && e.target.nodeName === "TD") {
        const row = e.target.parentNode;
        // تمييز الصف المحدد
        Array.from(roomsTbody.children).forEach(r => r.classList.remove('selected-row'));
        row.classList.add('selected-row');
        
        const statusCell = row.cells[2].textContent.toLowerCase();
        if (statusCell.includes("reserved") || statusCell.includes("unavailable")) {
          alert("❌ Selected room is already reserved. Please choose another.");
        } else {
          // يمكن اختيار هذه الغرفة
          alert(`Room ${row.cells[0].textContent} is selected (demo).`);
        }
      }
    });
    
    // --- Room Availability Summary (Optional Interaction) ---
    // يمكن تحديث خلايا الجدول (#summaryTbody) ديناميكيًا
    
    // --- Proceed to Booking Buttons ---
    const proceedBookingBtn = document.getElementById('proceedBookingBtn');
    const searchAgainBtn = document.getElementById('searchAgainBtn');
    
    proceedBookingBtn.addEventListener('click', () => {
      // منطق الانتقال إلى صفحة الحجز
      alert("Proceeding to reservation page (demo).");
    });
    
    searchAgainBtn.addEventListener('click', () => {
      // إعادة البحث
      alert("Going back to search (demo).");
    });
  });
  