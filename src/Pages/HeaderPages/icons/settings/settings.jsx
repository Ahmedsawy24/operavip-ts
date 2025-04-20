document.addEventListener("DOMContentLoaded", () => {
    // --- Global Save Changes Button ---
    const saveAllBtn = document.getElementById("saveAllBtn");
    saveAllBtn.addEventListener("click", () => {
      alert("All changes saved successfully (dummy).");
    });
  
    // --- Account Settings Section ---
    const updateAccountBtn = document.getElementById("updateAccountBtn");
    updateAccountBtn.addEventListener("click", () => {
      alert("Personal information updated (dummy).");
    });
    const changePasswordBtn = document.getElementById("changePasswordBtn");
    changePasswordBtn.addEventListener("click", () => {
      alert("Password changed successfully (dummy).");
    });
  
    // --- Appearance & Language Section ---
    const saveAppearanceBtn = document.getElementById("saveAppearanceBtn");
    // إذا لم يكن موجودًا، استخدم حدث على زر "Save Changes" العام
    const appearanceSection = document.getElementById("appearanceLanguage");
    if (appearanceSection) {
      const saveAppearanceButton = appearanceSection.querySelector("button");
      if (saveAppearanceButton) {
        saveAppearanceButton.addEventListener("click", () => {
          alert("Appearance & language preferences saved (dummy).");
        });
      }
    }
  
    // --- User Roles & Permissions Section ---
    const updateRolesBtn = document.getElementById("updateRolesBtn");
    updateRolesBtn.addEventListener("click", () => {
      alert("User roles and permissions updated (dummy).");
    });
  
    // --- Backup & Security Section ---
    const saveBackupBtn = document.getElementById("saveBackupBtn");
    saveBackupBtn.addEventListener("click", () => {
      alert("Backup & security settings saved (dummy).");
    });
  
    // --- System Preferences Section ---
    const saveSystemBtn = document.getElementById("saveSystemBtn");
    saveSystemBtn.addEventListener("click", () => {
      alert("System preferences saved (dummy).");
    });
  
    // --- Event Management Panel ---
    const eventForm = document.getElementById("eventForm");
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // جمع البيانات من النموذج
      const newEvent = {
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        type: document.getElementById("eventType").value,
        title: document.getElementById("eventTitle").value,
        room: document.getElementById("eventRoom").value,
        status: document.getElementById("eventStatus").value,
        notes: document.getElementById("eventNotes").value,
      };
      // إضافة الحدث إلى قاعدة البيانات التجريبية (Dummy)
      eventsData.push(newEvent);
      alert("New event added successfully (dummy).");
      eventForm.reset();
      renderMonthView();
    });
  
    // --- Dummy Data for Events (for Calendar View) ---
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
  
    // --- Dummy Data for Room Status ---
    const roomStatusData = {
      occupied_rooms: 120,
      available_rooms: 30,
      tomorrow_reservations: 15,
      rooms_needing_cleaning: 8
    };
  
    // --- Initialization ---
    renderMonthView();
    const defaultDate = "2024-06-10";
    renderDailyDetails(defaultDate);
    updateRoomStatus();
  
    // --- Functions ---
  
    // Render Month View (assume 30 days for demo)
    function renderMonthView() {
      const monthView = document.getElementById("monthView");
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
  
    // Render Daily Details Sidebar (updates when a day is clicked)
    function renderDailyDetails(date) {
      const dailyDetailsSection = document.getElementById("dailyDetailsSection");
      const dayEvents = eventsData.filter(ev => ev.date === date);
      if (dayEvents.length === 0) {
        dailyDetailsSection.innerHTML = `<p>No events scheduled for ${date}.</p>`;
      } else {
        let html = `<h4>Date: ${date}</h4><ul>`;
        dayEvents.forEach(ev => {
          html += `
            <li>
              <strong>${ev.time}</strong> - ${ev.title} (${ev.type}) [${ev.status}]<br>
              <em>${ev.notes}</em>
              <br>
              <button class="btn btn-info" onclick="editEvent('${date}', '${ev.time}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteEvent('${date}', '${ev.time}')">Delete</button>
              ${ev.type === "Check-in" ? `<button class="btn btn-success" onclick="confirmArrival('${date}', '${ev.time}')">Confirm Arrival</button>` : ""}
              ${ev.type === "Check-out" ? `<button class="btn btn-success" onclick="confirmDeparture('${date}', '${ev.time}')">Confirm Departure</button>` : ""}
            </li>
          `;
        });
        html += "</ul>";
        dailyDetailsSection.innerHTML = html;
      }
    }
  
    // Update Room Status Section
    function updateRoomStatus() {
      document.getElementById("occupiedRooms").textContent = roomStatusData.occupied_rooms;
      document.getElementById("availableRooms").textContent = roomStatusData.available_rooms;
      document.getElementById("tomorrowReservations").textContent = roomStatusData.tomorrow_reservations;
      document.getElementById("roomsNeedingCleaning").textContent = roomStatusData.rooms_needing_cleaning;
    }
  
    // Switch View between Day, Week, Month (dummy implementation)
    function switchView(view) {
      dayViewBtn.classList.remove("active");
      weekViewBtn.classList.remove("active");
      monthViewBtn.classList.remove("active");
      // Only month view is fully implemented in this demo
      if (view === "day") {
        dayViewBtn.classList.add("active");
        alert("Day view is under development (dummy).");
      } else if (view === "week") {
        weekViewBtn.classList.add("active");
        alert("Week view is under development (dummy).");
      } else {
        monthViewBtn.classList.add("active");
        document.getElementById("monthView").style.display = "grid";
      }
    }
  
    // Dummy functions for event actions
    window.editEvent = function(date, time) {
      alert(`Edit event on ${date} at ${time} (dummy).`);
    };
  
    window.deleteEvent = function(date, time) {
      alert(`Delete event on ${date} at ${time} (dummy).`);
    };
  
    window.confirmArrival = function(date, time) {
      alert(`Confirm arrival for event on ${date} at ${time} (dummy).`);
    };
  
    window.confirmDeparture = function(date, time) {
      alert(`Confirm departure for event on ${date} at ${time} (dummy).`);
    };
  });
  