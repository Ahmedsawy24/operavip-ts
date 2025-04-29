// src/components/Navbar.tsx
import React, { useEffect, useRef, ReactNode, useMemo } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from './OperaVIPlogo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

  // ✅ تم تحويلها إلى useMemo لحل التحذير
  const dummySearchData: DummySearchItem[] = useMemo(() => [
    { reservation_id: '340023', guest_name: 'Abdullah Alhammami', room_number: '204', email: 'abdullah@example.com' },
    { reservation_id: '340024', guest_name: 'John Doe', room_number: '305', email: 'john.doe@example.com' }
  ], []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }, [location]);

  const handleDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = e.currentTarget.nextElementSibling as HTMLElement | null;
    if (!dropdown) return;
    document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach(menu => {
      if (menu !== dropdown) menu.classList.remove('show');
    });
    dropdown.classList.toggle('show');
  };

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isOutsideDropdown = !target.closest('.dropdown-icon') && !target.closest('.dropdown-menu') && !target.closest('.dropdown-content');
      const isOutsideSearch = !target.closest('.search-icon');
      const isOutsideSidebar = !target.closest('.sidebar');

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

  useEffect(() => {
    window.toggleDropdown = (event: any, id: string) => {
      event.stopPropagation();
      const dropdown = document.getElementById(id);
      if (!dropdown) return;
      document.querySelectorAll<HTMLElement>('.dropdown-content').forEach(menu => {
        if (menu !== dropdown) menu.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    };

/*     document.querySelectorAll<HTMLElement>('.dropdown-icon').forEach(icon => {
      icon.addEventListener('click', e => {
        window.toggleDropdown(e, (icon.nextElementSibling as HTMLElement)?.id || '');
      });
    }); */

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

    window.markNotificationsRead = () => {
      document.querySelectorAll<HTMLElement>('#notificationsDropdown .status').forEach(status => {
        status.textContent = 'Read';
      });
      alert('All notifications marked as read.');
    };

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
            <li><Link to="/dashboard/arrivals/guest-status-updates">Guest Status Updates</Link></li>
            <li><Link to="/dashboard/arrivals/check-in-assign-rooms">Check-In & Assign Rooms</Link></li>
            <li><Link to="/dashboard/arrivals/vip-handling">VIP Handling</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'inHouse')}>
            <i className="fas fa-house-user"></i> In-House Customers
          </li>
          <ul className="submenu" id="inHouse">
            <li><Link to="/dashboard/in-house/extend-stay">Extend Stay</Link></li>
            <li><Link to="/dashboard/in-house/room-change-requests">Room Change Requests</Link></li>
            <li><Link to="/dashboard/in-house/guest-requests">Track Guest Requests & Services</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'accounts')}>
            <i className="fas fa-file-alt"></i> Accounts
          </li>
          <ul className="submenu" id="accounts">
            <li><Link to="/dashboard/accounts/guest-folios">Guest Folios & Billing</Link></li>
            <li><Link to="/dashboard/accounts/corporate-accounts">Corporate Accounts</Link></li>
            <li><Link to="/dashboard/accounts/advance-deposits">Advance Deposits</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'roomAssignment')}>
            <i className="fas fa-bed"></i> Room Assignment
          </li>
          <ul className="submenu" id="roomAssignment">
            <li><Link to="/dashboard/room-assignment/manual-auto">Manual & Auto-Assign</Link></li>
            <li><Link to="/dashboard/room-assignment/housekeeping-status">Housekeeping Status</Link></li>
            <li><Link to="/dashboard/room-assignment/reassign">Reassign Rooms</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'guestManagement')}>
            <i className="fas fa-users"></i> Guest Management
          </li>
          <ul className="submenu" id="guestManagement">
            <li><Link to="/dashboard/guest-management/history">View Guest History</Link></li>
            <li><Link to="/dashboard/guest-management/loyalty">Manage Loyalty Programs</Link></li>
            <li><Link to="/dashboard/guest-management/blacklist">Blacklist & Restrictions</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'billingPayments')}>
            <i className="fas fa-credit-card"></i> Billing & Payments
          </li>
          <ul className="submenu" id="billingPayments">
            <li><Link to="/dashboard/billing/invoices">View & Modify Invoices</Link></li>
            <li><Link to="/dashboard/billing/split-bills">Split Bills & Refunds</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'reports')}>
            <i className="fas fa-chart-line"></i> Reports & Analytics
          </li>
          <ul className="submenu" id="reports">
            <li><Link to="/dashboard/reports/daily-revenue">Daily Revenue Summary</Link></li>
            <li><Link to="/dashboard/reports/occupancy">Occupancy Reports</Link></li>
            <li><Link to="/dashboard/reports/trends">Reservation Trends</Link></li>
            <li><Link to="/dashboard/reports/end-of-day">End-of-Day Reports</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'guestRequests')}>
            <i className="fas fa-concierge-bell"></i> Guest Requests
          </li>
          <ul className="submenu" id="guestRequests">
            <li><Link to="/dashboard/requests/housekeeping">Housekeeping & Services</Link></li>
            <li><Link to="/dashboard/requests/fnb-orders">Food & Beverage Orders</Link></li>
            <li><Link to="/dashboard/requests/transport">Transport Requests</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'staffManagement')}>
            <i className="fas fa-user-tie"></i> Staff Management
          </li>
          <ul className="submenu" id="staffManagement">
            <li><Link to="/dashboard/staff/scheduling">Staff Scheduling & Payroll</Link></li>
            <li><Link to="/dashboard/staff/performance">Performance Tracking</Link></li>
          </ul>

          <li className="toggle-submenu" onClick={e => window.toggleSubmenu(e, 'checkOut')}>
            <i className="fas fa-door-open"></i> Check-In & Out
          </li>
          <ul className="submenu" id="checkOut">
            <li><Link to="/dashboard/checkout/finalize-payments">Finalize Payments</Link></li>
            <li><Link to="/dashboard/checkout/issue-receipts">Issue Receipts</Link></li>
            <li><Link to="/dashboard/checkout/feedback">Send Feedback</Link></li>
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
          <Link to="/dashboard" className="logo">
           <img src={logo} alt="OperaVIPlogo" className="logo-img" />
            </Link>
        </div>

        <nav className="nav">
          <ul>
            <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Reservations</a>
              <ul className="dropdown-menu">
                <li><Link to="/dashboard/reservations/create">Create New Reservation</Link></li>
                <li><Link to="/dashboard/reservations/modify">Modify or Cancel Booking</Link></li>
                <li><Link to="/dashboard/reservations/upcoming">View Upcoming Reservations</Link></li>
                <li><Link to="/dashboard/reservations/check-availability">Check Availability</Link></li>
                <li><Link to="/dashboard/reservations/group-reservations">Group Reservations</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Front Desk</a>
              <ul className="dropdown-menu">
                <li><Link to="/dashboard/front-desk/check-in">Check‑In Guests</Link></li>
                <li><Link to="/dashboard/front-desk/walk-in">Walk‑In Reservations</Link></li>
                <li><Link to="/dashboard/front-desk/upgrade-room">Upgrade/Downgrade Room</Link></li>
                <li><Link to="/dashboard/front-desk/early-check-out">Early Check‑Out Processing</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Cashiering</a>
              <ul className="dropdown-menu">
                <li><Link to="/dashboard/cashiering/payments">Payments & Refunds</Link></li>
                <li><Link to="/dashboard/cashiering/folio-adjustments">Guest Folio Adjustments</Link></li>
                <li><Link to="/dashboard/cashiering/closing-balancing">Cashier Closing & Balancing</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>Rooms</a>
              <ul className="dropdown-menu">
                <li><Link to="/dashboard/rooms/assign">Assign Rooms</Link></li>
                <li><Link to="/dashboard/rooms/check-availability">Check Room Availability</Link></li>
                <li><Link to="/dashboard/rooms/housekeeping-requests">Housekeeping Requests</Link></li>
                <li><Link to="/dashboard/rooms/maintenance-requests">Maintenance Requests</Link></li>
                <li><Link to="/dashboard/rooms/room-blocking">Room Blocking (Out of Order)</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>AR</a>
              <ul className="dropdown-menu">
                <li><Link to="/dashboard/ar/pending-payments">Pending Payments</Link></li>
                <li><Link to="/dashboard/ar/company-accounts">Company Accounts</Link></li>
                <li><Link to="/dashboard/ar/ledger-reports">Ledger Reports</Link></li>
                <li><Link to="/dashboard/ar/aging-reports">Aging Reports</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" onClick={handleDropdownClick}>End of Day</a>
              <ul className="dropdown-menu">
                <li><Link to="/dashboard/end-of-day/night-audit">Night Audit Process</Link></li>
                <li><Link to="/dashboard/end-of-day/financial-reports">Generate Financial Reports</Link></li>
                <li><Link to="/dashboard/end-of-day/daily-transactions">Review Daily Transactions</Link></li>
                <li><Link to="/dashboard/end-of-day/close-sessions">Close Cashier Sessions</Link></li>
                <li><Link to="/dashboard/end-of-day/post-charges">Post Room & Tax Charges</Link></li>
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
      </header>
      {children && <main className="main-content">{children}</main>}
    </>
  );
};

export default Navbar;
