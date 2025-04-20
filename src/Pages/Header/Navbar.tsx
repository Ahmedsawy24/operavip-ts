import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ children }) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();

  const dummySearchData = [
    { reservation_id: '340023', guest_name: 'Abdullah Alhammami', room_number: '204', email: 'abdullah@example.com' },
    { reservation_id: '340024', guest_name: 'John Doe', room_number: '305', email: 'john.doe@example.com' }
  ];

  // 1. إغلاق القوائم عند تغيير الصفحة
  useEffect(() => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }, [location]);

  // 2. إغلاق عند النقر خارج القائمة (بتعديل شرط إغلاق القوائم الرئيسية بنفس منطق الأيقونات)
  useEffect(() => {
    const handleGlobalClick = (event) => {
      const isOutsideDropdown = !event.target.closest('.dropdown-icon') &&
                                  !event.target.closest('.dropdown-menu') &&
                                  !event.target.closest('.dropdown-content');
      const isOutsideSearch = !event.target.closest('.search-icon');
      const isOutsideSidebar = !event.target.closest('.sidebar');

      if (isOutsideDropdown) {
        document.querySelectorAll('.dropdown-content, .dropdown-menu').forEach(menu => {
          menu.classList.remove('show');
        });
      }

      if (isOutsideSearch) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.style.display = "none";
        }
      }

      if (isOutsideSidebar) {
        document.querySelectorAll('.submenu').forEach(menu => menu.classList.remove('show'));
        document.querySelectorAll('.sidebar ul > li').forEach(item => item.classList.remove('active'));
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // 3. فتح القوائم المنسدلة من النيفيقيشن
  useEffect(() => {
    document.querySelectorAll('.nav ul li > a').forEach(item => {
      item.addEventListener('click', function (event) {
        if (this.getAttribute('href') === '#') {
          event.preventDefault();
          const dropdown = this.nextElementSibling;
          if (!dropdown) return;
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdown) menu.classList.remove('show');
          });
          dropdown.classList.toggle('show');
        }
      });
    });
  }, []);

  // 4. دمج تعريف الدوال وإضافة مستمعين للنقر داخل useEffect واحد
  useEffect(() => {
    // دالة تبديل القوائم المنسدلة
    window.toggleDropdown = (event, id) => {
      event.stopPropagation();
      const dropdown = document.getElementById(id);
      if (!dropdown) return;
      document.querySelectorAll('.dropdown-content').forEach(menu => {
        if (menu !== dropdown) menu.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    };

    // مستمع للنقر على أيقونات القائمة المنسدلة
    document.querySelectorAll('.dropdown-icon').forEach(icon => {
      icon.addEventListener('click', function (event) {
        window.toggleDropdown(event, this.nextElementSibling?.id);
      });
    });

    // خاصية البحث
    window.performLiveSearch = () => {
      const input = document.getElementById('searchInput')?.value.toLowerCase();
      const tbody = document.querySelector('#searchResultsTable tbody');
      if (!input || !tbody) return;
      tbody.innerHTML = '';

      const filtered = dummySearchData.filter(item =>
        item.reservation_id.includes(input) ||
        item.guest_name.toLowerCase().includes(input) ||
        item.room_number.includes(input) ||
        item.email.toLowerCase().includes(input)
      );

      if (filtered.length > 0) {
        filtered.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.reservation_id}</td>
            <td>${item.guest_name}</td>
            <td>${item.room_number}</td>
            <td>${item.email}</td>
            <td><button onclick="alert('Viewing details for reservation ${item.reservation_id}')">View Details</button></td>
          `;
          tbody.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5">No results found</td>`;
        tbody.appendChild(row);
      }
    };

    // Notifications
    window.markNotificationsRead = () => {
      document.querySelectorAll('#notificationsDropdown .status').forEach(status => {
        status.textContent = 'Read';
      });
      alert('All notifications marked as read.');
    };

    // Sidebar toggle (غير مستخدمة بشكل مباشر لكن يمكن استخدامها لاحقاً)
    const handleSidebarToggle = () => {
      const sidebar = sidebarRef.current;
      const overlay = overlayRef.current;
      if (!sidebar || !overlay) return;
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
      if (!sidebar.classList.contains('open')) {
        closeAllSubmenus();
      }
    };

    const closeAllSubmenus = () => {
      document.querySelectorAll('.submenu').forEach(menu => menu.classList.remove('show'));
      document.querySelectorAll('.sidebar ul > li').forEach(item => item.classList.remove('active'));
    };

    // Submenu toggler
    window.toggleSubmenu = (event, id) => {
      event.stopPropagation();
      const submenu = document.getElementById(id);
      if (!submenu) return;
      const parentLi = event.currentTarget;

      document.querySelectorAll('.submenu').forEach(menu => {
        if (menu !== submenu) {
          menu.classList.remove('show');
          if (menu.parentElement) menu.parentElement.classList.remove('active');
        }
      });

      submenu.classList.toggle('show');
      parentLi.classList.toggle('active');
    };
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <ul>
          {/* Arrivals */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'arrivals')}>
            <i className="fas fa-walking"></i> Arrivals
          </li>
          <ul className="submenu" id="arrivals">
            <li><a href="#">Guest Status Updates</a></li>
            <li><a href="#">Check-In & Assign Rooms</a></li>
            <li><a href="#">VIP Handling</a></li>
          </ul>

          {/* In-House Customers */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'inHouse')}>
            <i className="fas fa-house-user"></i> In-House Customers
          </li>
          <ul className="submenu" id="inHouse">
            <li><a href="#">Extend Stay</a></li>
            <li><a href="#">Room Change Requests</a></li>
            <li><a href="#">Track Guest Requests & Special Services</a></li>
          </ul>

          {/* Accounts */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'accounts')}>
            <i className="fas fa-file-alt"></i> Accounts
          </li>
          <ul className="submenu" id="accounts">
            <li><a href="#">Guest Folios & Billing Management</a></li>
            <li><a href="#">Corporate Accounts</a></li>
            <li><a href="#">Advance Deposits</a></li>
          </ul>

          {/* Room Assignment */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'roomAssignment')}>
            <i className="fas fa-bed"></i> Room Assignment
          </li>
          <ul className="submenu" id="roomAssignment">
            <li><a href="#">Manual & Auto-Assign Rooms</a></li>
            <li><a href="#">Check Housekeeping Status</a></li>
            <li><a href="#">Reassign Rooms</a></li>
          </ul>

          {/* Guest Management */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'guestManagement')}>
            <i className="fas fa-users"></i> Guest Management
          </li>
          <ul className="submenu" id="guestManagement">
            <li><a href="#">View Guest History</a></li>
            <li><a href="#">Manage Loyalty Programs</a></li>
            <li><a href="#">Blacklist & Restrictions</a></li>
          </ul>

          {/* Billing & Payments */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'billingPayments')}>
            <i className="fas fa-credit-card"></i> Billing & Payments
          </li>
          <ul className="submenu" id="billingPayments">
            <li><a href="#">View Invoices & Modify Payments</a></li>
            <li><a href="#">Split Bills & Refunds</a></li>
          </ul>

          {/* Reports & Analytics */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'reports')}>
            <i className="fas fa-chart-line"></i> Reports & Analytics
          </li>
          <ul className="submenu" id="reports">
            <li><a href="#">Daily Revenue Summary</a></li>
            <li><a href="#">Occupancy Reports</a></li>
            <li><a href="#">Reservation Trends</a></li>
            <li><a href="#">End-of-Day Reports</a></li>
          </ul>

          {/* Guest Requests */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'guestRequests')}>
            <i className="fas fa-concierge-bell"></i> Guest Requests
          </li>
          <ul className="submenu" id="guestRequests">
            <li><a href="#">Housekeeping & Special Services</a></li>
            <li><a href="#">Food & Beverage Orders</a></li>
            <li><a href="#">Transport Requests</a></li>
          </ul>

          {/* Staff Management */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'staffManagement')}>
            <i className="fas fa-user-tie"></i> Staff Management
          </li>
          <ul className="submenu" id="staffManagement">
            <li><a href="#">Staff Scheduling & Payroll</a></li>
            <li><a href="#">Role Management & Performance Tracking</a></li>
          </ul>

          {/* Check-In & Out */}
          <li className="toggle-submenu" onClick={(event) => window.toggleSubmenu(event, 'checkOut')}>
            <i className="fas fa-door-open"></i> Check-In & Out
          </li>
          <ul className="submenu" id="checkOut">
            <li><a href="#">Finalize Payments & Check Pending Balances</a></li>
            <li><a href="#">Issue Receipts</a></li>
            <li><a href="#">Send Feedback Forms</a></li>
          </ul>
        </ul>
      </div>

      {/* Overlay for Sidebar */}
      <div className="overlay" id="overlay" ref={overlayRef} onClick={() => {
        if (sidebarRef.current && overlayRef.current) {
          sidebarRef.current.classList.toggle("open");
          overlayRef.current.classList.toggle("show");
        }
      }}></div>

      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <span className="menu-icon" onClick={() => {
            if (sidebarRef.current && overlayRef.current) {
              sidebarRef.current.classList.toggle("open");
              overlayRef.current.classList.toggle("show");
            }
          }}>
            <i className="fas fa-bars"></i>
          </span>
          <div className="logo">OperaVIP</div>
        </div>
        <div className="nav-icons">
          <nav className="nav">
            <ul>
              <li className="dropdown">
                <a href="#">Reservations</a>
                <ul className="dropdown-menu">
                  <li><Link to="/reservations/create">Create New Reservation</Link></li>
                  <li><Link to="/reservations/modify">Modify or Cancel Booking</Link></li>
                  <li><Link to="/reservations/upcoming">View Upcoming Reservations</Link></li>
                  <li><Link to="/reservations/check-availability">Check Availability</Link></li>
                  <li><Link to="/reservations/group-reservations">Group Reservations</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">Front Desk</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Check-In Guests</a></li>
                  <li><a href="#">Walk-In Reservations</a></li>
                  <li><a href="#">Upgrade/Downgrade Room</a></li>
                  <li><a href="#">Early Check-Out Processing</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">Cashiering</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Payments & Refunds</a></li>
                  <li><a href="#">Guest Folio Adjustments</a></li>
                  <li><a href="#">Cashier Closing & Balancing</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">Rooms</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Assign Rooms</a></li>
                  <li><a href="#">Check Room Availability</a></li>
                  <li><a href="#">Housekeeping Requests</a></li>
                  <li><a href="#">Maintenance Requests</a></li>
                  <li><a href="#">Room Blocking (Out of Order)</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">AR</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Pending Payments</a></li>
                  <li><a href="#">Company Accounts</a></li>
                  <li><a href="#">Ledger Reports</a></li>
                  <li><a href="#">Aging Reports</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">End of Day</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Night Audit Process</a></li>
                  <li><a href="#">Generate Financial Reports</a></li>
                  <li><a href="#">Review Daily Transactions</a></li>
                  <li><a href="#">Close Cashier Sessions</a></li>
                  <li><a href="#">Post Room & Tax Charges</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="icons">
            <div className="icon-container">
              <span className="icon search-icon" onClick={() => {
                const searchInput = document.getElementById("searchInput");
                if (searchInput) {
                  searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
                }
              }}>
                <i className="fas fa-search"></i>
              </span>
              <input type="text" id="searchInput" placeholder="Enter search term..." onKeyUp={() => window.performLiveSearch()} style={{ display: "none" }} />
              <div className="dropdown-content" id="searchDropdown">
                <h4>Search Reservations</h4>
                <table id="searchResultsTable">
                  <thead>
                    <tr>
                      <th>Res ID</th>
                      <th>Guest Name</th>
                      <th>Room</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="icon-container">
              <span className="icon dropdown-icon" onClick={(event) => window.toggleDropdown(event, 'calendarDropdown')}>
                <i className="fas fa-calendar-alt"></i>
              </span>
              <div className="dropdown-content" id="calendarDropdown">
                <h4>Calendar</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-06-10</td>
                      <td>VIP Guest Arrival</td>
                      <td>Confirmed</td>
                    </tr>
                    <tr>
                      <td>2024-06-15</td>
                      <td>Room Maintenance</td>
                      <td>Pending</td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={() => alert('Add New Event')}>Add New Event</button>
              </div>
            </div>
            <div className="icon-container">
              <span className="icon dropdown-icon" onClick={(event) => window.toggleDropdown(event, 'notificationsDropdown')}>
                <i className="fas fa-bell"></i>
              </span>
              <div className="dropdown-content" id="notificationsDropdown">
                <h4>Notifications</h4>
                <ul>
                  <li>New reservation #340023 confirmed. (2024-06-08) - <span className="status">Unread</span></li>
                  <li>Guest request for extra towels in Room 305. (2024-06-07) - <span className="status">Read</span></li>
                </ul>
                <button onClick={() => window.markNotificationsRead()}>Mark All as Read</button>
                <a href="#" onClick={() => alert('View More Notifications')}>View More</a>
              </div>
            </div>
            <div className="icon-container">
              <span className="icon dropdown-icon" onClick={(event) => window.toggleDropdown(event, 'messagesDropdown')}>
                <i className="fas fa-comment-alt"></i>
              </span>
              <div className="dropdown-content" id="messagesDropdown">
                <h4>Messages</h4>
                <ul>
                  <li>[Unread] Guest Check-in Issue - Reception (2024-06-08)</li>
                  <li>[Read] Room 305 Needs Cleaning - Housekeeping (2024-06-07)</li>
                </ul>
                <button onClick={() => alert('Create New Message')}>Create New Message</button>
              </div>
            </div>
            <div className="icon-container">
              <span className="icon dropdown-icon" onClick={(event) => window.toggleDropdown(event, 'settingsDropdown')}>
                <i className="fas fa-cog"></i>
              </span>
              <div className="dropdown-content" id="settingsDropdown">
                <h4>Settings</h4>
                <ul>
                  <li><a href="#" onClick={() => alert('Change Language')}>Change Language</a></li>
                  <li><a href="#" onClick={() => alert('Change Theme')}>Change Theme</a></li>
                  <li><a href="#" onClick={() => alert('Manage Permissions')}>Manage Roles & Permissions</a></li>
                </ul>
              </div>
            </div>
            <div className="icon-container">
              <span className="icon dropdown-icon" onClick={(event) => window.toggleDropdown(event, 'profileDropdown')}>
                <i className="fas fa-user"></i>
              </span>
              <div className="dropdown-content" id="profileDropdown">
                <h4>User Profile</h4>
                <ul>
                  <li><a href="#" onClick={() => alert('View Profile')}>View Profile</a></li>
                  <li><a href="#" onClick={() => alert('Change Password')}>Change Password</a></li>
                  <li><a href="#" onClick={() => alert('Logout')}>Logout</a></li>
                </ul>
                <div className="profile-info">
                  <p>Name: Abdullah Alhammami</p>
                  <p>Email: abdullah@example.com</p>
                  <p>Role: Hotel Manager</p>
                  <p>Last Login: 2024-06-08</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {children && (
        <main className="main-content">
          {children}
        </main>
      )}
    </>
  );
};

export default Navbar;
