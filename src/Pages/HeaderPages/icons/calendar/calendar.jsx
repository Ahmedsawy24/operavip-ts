document.addEventListener("DOMContentLoaded", () => {
    // References for calendar and sections
    const monthView = document.getElementById("monthView");
    const dailyDetailsSection = document.getElementById("dailyDetailsSection");
  
    const refreshBtn = document.getElementById("refreshBtn");
    const scrollToEventFormBtn = document.getElementById("scrollToEventFormBtn");
  
    const dayViewBtn = document.getElementById("dayViewBtn");
    const weekViewBtn = document.getElementById("weekViewBtn");
    const monthViewBtn = document.getElementById("monthViewBtn");
  
    const filterBtn = document.getElementById("filterBtn");
    const searchBtn = document.getElementById("searchBtn");
  
    const eventForm = document.getElementById("eventForm");
  
    // Dummy data for events
    let eventsData = [
      {
        date: "2024-06-10",
        time: "14:00",
        type: "Check-in",
        title: "VIP Guest Arrival",
        room: "101",
        status: "Confirmed",
        notes: "Ensure welcome package is ready."
      },
      {
        date: "2024-06-12",
        time: "11:00",
        type: "Meeting",
        title: "Management Meeting",
        room: "Conference Room",
        status: "Scheduled",
        notes: "Discuss new policies."
      },
      {
        date: "2024-06-15",
        time: "09:00",
        type: "Maintenance",
        title: "Room 402 AC Maintenance",
        room: "402",
        status: "Pending",
        notes: "Fix AC unit."
      }
    ];
  
    // Dummy data for Room & Booking Statistics
    const roomStatusData = {
      occupied_rooms: 120,
      available_rooms: 30,
      tomorrow_reservations: 15,
      rooms_needing_cleaning: 8
    };
  
    // Initialization: Render Month View and update details for a default date (e.g., "2024-06-10")
    renderMonthView();
    const defaultDate = "2024-06-10";
    renderDailyDetails(defaultDate);
    updateRoomStatus();
  
    // --- Event Handlers ---
  
    refreshBtn.addEventListener("click", () => {
      alert("Calendar refreshed (dummy).");
    });
    scrollToEventFormBtn.addEventListener("click", () => {
      document.getElementById("eventFormSection").scrollIntoView({ behavior: "smooth" });
    });
  
    dayViewBtn.addEventListener("click", () => switchView("day"));
    weekViewBtn.addEventListener("click", () => switchView("week"));
    monthViewBtn.addEventListener("click", () => switchView("month"));
  
    filterBtn.addEventListener("click", () => {
      const eventType = document.getElementById("eventTypeSelect").value;
      const dateFilter = document.getElementById("dateFilter").value;
      alert(`Filtering by type: ${eventType}, date: ${dateFilter} (dummy).`);
    });
    searchBtn.addEventListener("click", () => {
      const keyword = document.getElementById("searchKeyword").value;
      alert(`Searching for: ${keyword} (dummy).`);
    });
  
    // Handle Event Form submission
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newEvent = {
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        type: document.getElementById("eventType").value,
        title: document.getElementById("eventTitle").value,
        room: document.getElementById("eventRoom").value,
        status: document.getElementById("eventStatus").value,
        notes: document.getElementById("eventNotes").value
      };
      eventsData.push(newEvent);
      alert("Event saved successfully!");
      eventForm.reset();
      renderMonthView();
    });
  
    // --- Functions ---
  
    // Render Month View (dummy: assume 30 days in June)
    function renderMonthView() {
      monthView.innerHTML = "";
      for (let day = 1; day <= 30; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day-cell");
        const dateStr = `2024-06-${String(day).padStart(2, "0")}`;
        const dayEvents = eventsData.filter(ev => ev.date === dateStr);
        dayCell.innerHTML = `
          <div class="day-number">${day}</div>
          <div class="event-count">Events: ${dayEvents.length}</div>
        `;
        dayCell.addEventListener("click", () => {
          renderDailyDetails(dateStr);
        });
        monthView.appendChild(dayCell);
      }
    }
  
    // Render Daily Details Sidebar for a given date
    function renderDailyDetails(date) {
      const dayEvents = eventsData.filter(ev => ev.date === date);
      if (dayEvents.length === 0) {
        dailyDetailsSection.innerHTML = `<p>No events scheduled for ${date}.</p>`;
      } else {
        let html = `<h4>Date: ${date}</h4><ul>`;
        dayEvents.forEach(ev => {
          // If guest_name exists use it; otherwise, use title
          const eventName = ev.guest_name ? ev.guest_name : ev.title;
          html += `
            <li>
              <strong>${ev.time}</strong> - ${eventName} (${ev.type}) [${ev.status}]<br>
              <em>${ev.notes}</em>
            </li>
          `;
        });
        html += "</ul>";
        dailyDetailsSection.innerHTML = html;
      }
    }
  
    // Update Room & Booking Statistics
    function updateRoomStatus() {
      document.getElementById("occupiedRooms").textContent = roomStatusData.occupied_rooms;
      document.getElementById("availableRooms").textContent = roomStatusData.available_rooms;
      document.getElementById("tomorrowReservations").textContent = roomStatusData.tomorrow_reservations;
      document.getElementById("roomsNeedingCleaning").textContent = roomStatusData.rooms_needing_cleaning;
    }
  
    // Switch view between Day, Week, Month (dummy implementation)
    function switchView(view) {
      // Dummy implementation: Only Month View is fully implemented
      dayViewBtn.classList.remove("active");
      weekViewBtn.classList.remove("active");
      monthViewBtn.classList.remove("active");
  
      // In this dummy, we always show Month View
      if (view === "day") {
        dayViewBtn.classList.add("active");
        alert("Day view is under development (dummy).");
      } else if (view === "week") {
        weekViewBtn.classList.add("active");
        alert("Week view is under development (dummy).");
      } else {
        monthViewBtn.classList.add("active");
        monthView.style.display = "grid";
      }
    }
  });
  