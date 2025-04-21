// src/components/Navbar.tsx
import React, { useEffect, useRef, ReactNode } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

interface DummySearchItem {
  reservation_id: string;
  guest_name: string;
  room_number: string;
  email: string;
}

declare global {
  interface Window {
    toggleDropdown: (event: any, id: string) => void;
    performLiveSearch: () => void;
    markNotificationsRead: () => void;
    toggleSubmenu: (event: any, id: string) => void;
  }
}

interface NavbarProps {
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const dummySearchData: DummySearchItem[] = [
    { reservation_id: '340023', guest_name: 'Abdullah Alhammami', room_number: '204', email: 'abdullah@example.com' },
    { reservation_id: '340024', guest_name: 'John Doe', room_number: '305', email: 'john.doe@example.com' }
  ];

  // 1. إغلاق القوائم عند تغيير الصفحة
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }, [location]);

  // ✅ الدالة الخاصة بالقوائم المنسدلة في الهيدر فقط
  const handleDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = (e.currentTarget.nextElementSibling as HTMLElement | null);
    if (!dropdown) return;
    document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach(menu => {
      if (menu !== dropdown) menu.classList.remove('show');
    });
    dropdown.classList.toggle('show');
  };

  // 2. إغلاق عند النقر خارج القائمة
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isOutsideDropdown = !target.closest('.dropdown-icon')
                              && !target.closest('.dropdown-menu')
                              && !target.closest('.dropdown-content');
      const isOutsideSearch   = !target.closest('.search-icon');
      const isOutsideSidebar  = !target.closest('.sidebar');

      if (isOutsideDropdown) {
        document.querySelectorAll<HTMLElement>('.dropdown-content, .dropdown-menu').forEach(menu => {
          menu.classList.remove('show');
        });
      }
      if (isOutsideSearch) {
        const input = document.getElementById('searchInput') as HTMLInputElement | null;
        if (input) input.style.display = 'none';
      }
      if (isOutsideSidebar) {
        document.querySelectorAll<HTMLElement>('.submenu').forEach(menu => menu.classList.remove('show'));
        document.querySelectorAll<HTMLElement>('.sidebar ul > li').forEach(item => item.classList.remove('active'));
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // 3. فتح القوائم المنسدلة من النيفيقيشن
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('.nav ul li > a').forEach(link => {
      link.addEventListener('click', e => {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
          const dropdown = link.nextElementSibling as HTMLElement | null;
          if (!dropdown) return;
          document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach(menu => {
            if (menu !== dropdown) menu.classList.remove('show');
          });
          dropdown.classList.toggle('show');
        }
      });
    });
  }, []);

  // 4. دمج تعريف الدوال وإضافة مستمعين
  useEffect(() => {
    // toggleDropdown
    window.toggleDropdown = (event: any, id: string) => {
      event.stopPropagation();
      const dropdown = document.getElementById(id);
      if (!dropdown) return;
      document.querySelectorAll<HTMLElement>('.dropdown-content').forEach(menu => {
        if (menu !== dropdown) menu.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    };

    // dropdown-icon click
    document.querySelectorAll<HTMLElement>('.dropdown-icon').forEach(icon => {
      icon.addEventListener('click', e => {
        window.toggleDropdown(e, (icon.nextElementSibling as HTMLElement)?.id || '');
      });
    });

    // performLiveSearch
    window.performLiveSearch = () => {
      const val = (document.getElementById('searchInput') as HTMLInputElement)?.value.toLowerCase() || '';
      const tbody = document.querySelector('#searchResultsTable tbody') as HTMLTableSectionElement | null;
      if (!tbody) return;
      tbody.innerHTML = '';

      const filtered = dummySearchData.filter(item =>
        item.reservation_id.includes(val) ||
        item.guest_name.toLowerCase().includes(val) ||
        item.room_number.includes(val) ||
        item.email.toLowerCase().includes(val)
      );

      if (filtered.length) {
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

    // markNotificationsRead
    window.markNotificationsRead = () => {
      document.querySelectorAll<HTMLElement>('#notificationsDropdown .status').forEach(status => {
        status.textContent = 'Read';
      });
      alert('All notifications marked as read.');
    };

    // toggleSubmenu
    window.toggleSubmenu = (event: any, id: string) => {
      event.stopPropagation();
      const submenu = document.getElementById(id);
      if (!submenu) return;
      const parentLi = event.currentTarget as HTMLElement;

      document.querySelectorAll<HTMLElement>('.submenu').forEach(menu => {
        if (menu !== submenu) {
          menu.classList.remove('show');
          menu.parentElement?.classList.remove('active');
        }
      });

      submenu.classList.toggle('show');
      parentLi.classList.toggle('active');
    };
  }, [dummySearchData]);

  return (
    <>
      {/* Sidebar */}
      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <ul>
          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'arrivals')}>
            <i className="fas fa-walking"></i> Arrivals
          </li>
          <ul className="submenu" id="arrivals">
            <li><a href="#">Guest Status Updates</a></li>
            <li><a href="#">Check-In & Assign Rooms</a></li>
            <li><a href="#">VIP Handling</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'inHouse')}>
            <i className="fas fa-house-user"></i> In-House Customers
          </li>
          <ul className="submenu" id="inHouse">
            <li><a href="#">Extend Stay</a></li>
            <li><a href="#">Room Change Requests</a></li>
            <li><a href="#">Track Guest Requests & Special Services</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'accounts')}>
            <i className="fas fa-file-alt"></i> Accounts
          </li>
          <ul className="submenu" id="accounts">
            <li><a href="#">Guest Folios & Billing Management</a></li>
            <li><a href="#">Corporate Accounts</a></li>
            <li><a href="#">Advance Deposits</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'roomAssignment')}>
            <i className="fas fa-bed"></i> Room Assignment
          </li>
          <ul className="submenu" id="roomAssignment">
            <li><a href="#">Manual & Auto-Assign Rooms</a></li>
            <li><a href="#">Check Housekeeping Status</a></li>
            <li><a href="#">Reassign Rooms</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'guestManagement')}>
            <i className="fas fa-users"></i> Guest Management
          </li>
          <ul className="submenu" id="guestManagement">
            <li><a href="#">View Guest History</a></li>
            <li><a href="#">Manage Loyalty Programs</a></li>
            <li><a href="#">Blacklist & Restrictions</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'billingPayments')}>
            <i className="fas fa-credit-card"></i> Billing & Payments
          </li>
          <ul className="submenu" id="billingPayments">
            <li><a href="#">View Invoices & Modify Payments</a></li>
            <li><a href="#">Split Bills & Refunds</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'reports')}>
            <i className="fas fa-chart-line"></i> Reports & Analytics
          </li>
          <ul className="submenu" id="reports">
            <li><a href="#">Daily Revenue Summary</a></li>
            <li><a href="#">Occupancy Reports</a></li>
            <li><a href="#">Reservation Trends</a></li>
            <li><a href="#">End-of-Day Reports</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'guestRequests')}>
            <i className="fas fa-concierge-bell"></i> Guest Requests
          </li>
          <ul className="submenu" id="guestRequests">
            <li><a href="#">Housekeeping & Special Services</a></li>
            <li><a href="#">Food & Beverage Orders</a></li>
            <li><a href="#">Transport Requests</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'staffManagement')}>
            <i className="fas fa-user-tie"></i> Staff Management
          </li>
          <ul className="submenu" id="staffManagement">
            <li><a href="#">Staff Scheduling & Payroll</a></li>
            <li><a href="#">Role Management & Performance Tracking</a></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'checkOut')}>
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
      <div
        className="overlay"
        id="overlay"
        ref={overlayRef}
        onClick={() => {
          sidebarRef.current?.classList.toggle('open');
          overlayRef.current?.classList.toggle('show');
        }}
      ></div>

      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <span
            className="menu-icon"
            onClick={() => {
              sidebarRef.current?.classList.toggle('open');
              overlayRef.current?.classList.toggle('show');
            }}
          >
            <i className="fas fa-bars"></i>
          </span>
          <Link to="/dashboard" className="logo">OperaVIP</Link>
        </div>
        <div className="nav-icons">
          <nav className="nav">
            <ul>
              <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Reservations</a>
                <ul className="dropdown-menu">
                  <li><Link to="/reservations/create">Create New Reservation</Link></li>
                  <li><Link to="/reservations/modify">Modify or Cancel Booking</Link></li>
                  <li><Link to="/reservations/upcoming">View Upcoming Reservations</Link></li>
                  <li><Link to="/reservations/check-availability">Check Availability</Link></li>
                  <li><Link to="/reservations/group-reservations">Group Reservations</Link></li>
                </ul>
              </li>
              <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Front Desk</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Check-In Guests</a></li>
                  <li><a href="#">Walk-In Reservations</a></li>
                  <li><a href="#">Upgrade/Downgrade Room</a></li>
                  <li><a href="#">Early Check-Out Processing</a></li>
                </ul>
              </li>
              <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Cashiering</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Payments & Refunds</a></li>
                  <li><a href="#">Guest Folio Adjustments</a></li>
                  <li><a href="#">Cashier Closing & Balancing</a></li>
                </ul>
              </li>
              <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Rooms</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Assign Rooms</a></li>
                  <li><a href="#">Check Room Availability</a></li>
                  <li><a href="#">Housekeeping Requests</a></li>
                  <li><a href="#">Maintenance Requests</a></li>
                  <li><a href="#">Room Blocking (Out of Order)</a></li>
                </ul>
              </li>
              <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>AR</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Pending Payments</a></li>
                  <li><a href="#">Company Accounts</a></li>
                  <li><a href="#">Ledger Reports</a></li>
                  <li><a href="#">Aging Reports</a></li>
                </ul>
              </li>
              <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>End of Day</a>
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
              <span
                className="icon search-icon"
                onClick={() => {
                  const input = document.getElementById('searchInput') as HTMLInputElement | null;
                  if (input) input.style.display = input.style.display === 'none' ? 'block' : 'none';
                }}
              >
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                id="searchInput"
                placeholder="Enter search term..."
                onKeyUp={() => window.performLiveSearch()}
                style={{ display: 'none' }}
              />
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
                  <tbody />
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
      {children && <main className="main-content">{children}</main>}
    </>
  );
};

export default Navbar;
