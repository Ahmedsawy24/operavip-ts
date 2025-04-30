import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Dashboard from './Pages/Homepage/Dashboard';
import CreateNewReservation from './Pages/HeaderPages/Reservation/CreateNewReservation/CreateNewReservation';
import ModifyorCancelBooking   from './Pages/HeaderPages/Reservation/ModifyorCancelBooking/ModifyorCancelBooking';
import ViewUpcomingReservations from './Pages/HeaderPages/Reservation/ViewUpcomingReservations/ViewUpcomingReservations';
import CheckAvailability  from './Pages/HeaderPages/Reservation/CheckAvailability/CheckAvailability';
import GroupReservations from './Pages/HeaderPages/Reservation/GroupReservations/GroupReservations';
import CheckinGuests from './Pages/HeaderPages/FrontDesk/CheckinGuests/CheckinGuests';
import WalkInReservations from './Pages/HeaderPages/FrontDesk/WalkInReservations/WalkInReservations';
import UpgradeDowngradeRoom from './Pages/HeaderPages/FrontDesk/Upgrade-DowngradeRoom/Upgrade-DowngradeRoom';
import EarlyCheckOutProcessing from './Pages/HeaderPages/FrontDesk/EarlyCheckOutProcessing/EarlyCheckOutProcessing';
import PaymentsRefunds from './Pages/HeaderPages/Cashiering/PaymentsRefunds/PaymentsRefunds';
import GuestFolioAdjustments from './Pages/HeaderPages/Cashiering/GuestFolioAdjustments/GuestFolioAdjustments';
import CashierClosingBalancing from './Pages/HeaderPages/Cashiering/CashierClosingBalancing/CashierClosingBalancing';
import AssignRooms from './Pages/HeaderPages/Rooms/AssignRooms/AssignRooms';
import CheckRoomAvailability from './Pages/HeaderPages/Rooms/CheckRoomAvailability/CheckRoomAvailability';
import HousekeepingRequests from './Pages/HeaderPages/Rooms/HousekeepingRequests/HousekeepingRequests';
import MaintenanceRequests from './Pages/HeaderPages/Rooms/MaintenanceRequests/MaintenanceRequests';
import RoomBlocking from './Pages/HeaderPages/Rooms/RoomBlocking/RoomBlocking';
import PendingPayments from './Pages/HeaderPages/AR/PendingPayments/PendingPayments';
import CompanyAccounts from './Pages/HeaderPages/AR/CompanyAccounts/CompanyAccounts';
import LedgerReports from './Pages/HeaderPages/AR/LedgerReports/LedgerReports';
import AgingReports from './Pages/HeaderPages/AR/AgingReports/AgingReports';
import NightAuditProcess from './Pages/HeaderPages/EndOfDay/NightAuditProcess/NightAuditProcess';
import GenerateFinancialReports from './Pages/HeaderPages/EndOfDay/GenerateFinancialReports/GenerateFinancialReports';
import RoomsList from './components/RoomsList';
import ReviewDailyTransactions from './Pages/HeaderPages/EndOfDay/ReviewDailyTransactions/ReviewDailyTransactions';
import CloseCashierSessions from './Pages/HeaderPages/EndOfDay/CloseCashierSessions/CloseCashierSessions';
import PostRoomAndTaxCharges from './Pages/HeaderPages/EndOfDay/PostRoomAndTaxCharges/PostRoomandTaxCharges';
import GuestStatusUpdates from './Pages/SidebarPages/arrivals/GuestStatusUpdates/GuestStatusUpdates';
import CheckInAssignRooms from './Pages/SidebarPages/arrivals/CheckInAssignRooms/CheckInAssignRooms';
import VIPHandling from './Pages/SidebarPages/arrivals/VIPHandling/VIPHandling';
import ExtendStay from './Pages/SidebarPages/In-HouseCustomers/ExtendStay/ExtendStay';
import RoomChangeRequests from './Pages/SidebarPages/In-HouseCustomers/RoomChangeRequests/RoomChangeRequests';
import TrackGuestRequests from './Pages/SidebarPages/In-HouseCustomers/GuestRequests/TrackGuestRequests';
import GuestFolios from './Pages/SidebarPages/accounts/GuestFoliosAndBillingManagement/GuestFolios';
import CorporateAccounts from './Pages/SidebarPages/accounts/CorporateAccounts/CorporateAccounts';
import AdvanceDeposits from './Pages/SidebarPages/accounts/AdvanceDeposits/AdvanceDeposits';
import ManualAutoAssign from './Pages/SidebarPages/RoomAssignment/ManualAutoAssign/ManualAutoAssign';
import CheckHousekeepingStatus from './Pages/SidebarPages/RoomAssignment/CheckHousekeepingStatus/CheckHousekeepingStatus';
import ReassignRooms from './Pages/SidebarPages/RoomAssignment/ReassignRooms/ReassignRooms';
import ViewGuestHistory from './Pages/SidebarPages/GuestManagement/ViewGuestHistory/ViewGuestHistory';
import ManageLoyaltyPrograms from './Pages/SidebarPages/GuestManagement/ManageLoyaltyPrograms/ManageLoyaltyPrograms';
import BlacklistRestrictions from './Pages/SidebarPages/GuestManagement/BlacklistRestrictions/BlacklistRestrictions';
import ViewInvoicesModifyPayments from './Pages/SidebarPages/BillingAndPayments/ViewInvoicesModifyPayments/ViewInvoicesModifyPayments';
import SplitBillsRefunds from './Pages/SidebarPages/BillingAndPayments/SplitBillsRefunds/SplitBillsRefunds';
import DailyRevenueSummary from './Pages/SidebarPages/ReportsAndAnalytics/DailyRevenueSummary/DailyRevenueSummary';
import OccupancyReports from './Pages/SidebarPages/ReportsAndAnalytics/OccupancyReports/OccupancyReports';
import ReservationTrends from './Pages/SidebarPages/ReportsAndAnalytics/ReservationTrends/ReservationTrends';
import EndOfDayReports from './Pages/SidebarPages/ReportsAndAnalytics/End-of-DayReports/EndOfDayReports';
import HousekeepingServices from './Pages/SidebarPages/Guest Requests/HousekeepingServices/HousekeepingServices';
import FoodBeverageOrders from './Pages/SidebarPages/Guest Requests/Food and Beverage Orders/FoodBeverageOrders';
import TransportRequests from './Pages/SidebarPages/Guest Requests/TransportRequests/TransportRequests';
import StaffSchedulingAndPayroll from './Pages/SidebarPages/StaffManagement/StaffSchedulingAndPayroll/StaffSchedulingandPayroll';
import RoleManagementPerformance from './Pages/SidebarPages/StaffManagement/RoleManagementAndPerformanceTracking/Role ManagementandPerformanceTracking';
import FinalizePaymentsAndBalances from './Pages/SidebarPages/Check-InAndOut/FinalizePaymentsAndCheckPendingBalances/FinalizePaymentsandCheckPendingBalances'
import IssueReceipts from './Pages/SidebarPages/Check-InAndOut/IssueReceipts/IssueReceipts';
import SendFeedbackForms from './Pages/SidebarPages/Check-InAndOut/SendFeedbackForms/SendFeedbackForms';












const App: React.FC = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />


    <Route path="/dashboard" element={<Layout />}>
      <Route index element={<Dashboard />} />

      <Route path="reservations/create" element={<CreateNewReservation />} />
      <Route path="reservations/modify" element={<ModifyorCancelBooking />} />
      <Route path="reservations/upcoming" element={<ViewUpcomingReservations />} />
      <Route path="reservations/check-availability" element={<CheckAvailability />} />
      <Route path="reservations/group-reservations" element={<GroupReservations />} />
      <Route path="front-desk/check-in" element={<CheckinGuests />} />
      <Route path="front-desk/walk-in" element={<WalkInReservations />} />
      <Route path="front-desk/upgrade-room" element={<UpgradeDowngradeRoom />} />
      <Route path="front-desk/early-check-out" element={<EarlyCheckOutProcessing />} />
      <Route path="cashiering/payments" element={<PaymentsRefunds />} />
      <Route path="cashiering/folio-adjustments" element={<GuestFolioAdjustments />} />
      <Route path="cashiering/closing-balancing" element={<CashierClosingBalancing />} />
      <Route path="rooms/assign" element={<AssignRooms />} />
      <Route path="rooms/check-availability" element={<CheckRoomAvailability />} />
      <Route path="rooms/housekeeping-requests" element={<HousekeepingRequests />} />
      <Route path="rooms/maintenance-requests" element={<MaintenanceRequests />} />
      <Route path="rooms/room-blocking" element={<RoomBlocking />} />
      <Route path="ar/pending-payments" element={<PendingPayments />} />
      <Route path="ar/company-accounts" element={<CompanyAccounts />} />
      <Route path="ar/ledger-reports" element={<LedgerReports />} />
      <Route path="ar/aging-reports" element={<AgingReports />} />
      <Route path="end-of-day/night-audit" element={<NightAuditProcess />} />
      <Route path="end-of-day/financial-reports" element={<GenerateFinancialReports />} />
      <Route path="testing" element={<RoomsList />} />
      <Route path="end-of-day/daily-transactions" element={<ReviewDailyTransactions />} />
      <Route path="end-of-day/close-sessions" element={<CloseCashierSessions />} />
      <Route path="end-of-day/post-charges" element={<PostRoomAndTaxCharges />} />
      <Route path="arrivals/guest-status-updates" element={<GuestStatusUpdates />} />
      <Route path="arrivals/check-in-assign-rooms"element={<CheckInAssignRooms />}/>
      <Route path="arrivals/vip-handling" element={<VIPHandling/>} />
      <Route path="in-house/extend-stay" element={<ExtendStay />}/>
      <Route path="in-house/room-change-requests" element={<RoomChangeRequests />} />
      <Route path="in-house/guest-requests" element={<TrackGuestRequests />} />
      <Route path="accounts/guest-folios" element={<GuestFolios />}/>
      <Route path="accounts/corporate-accounts" element={<CorporateAccounts />}/>
      <Route path="accounts/advance-deposits" element={<AdvanceDeposits />}/>
      <Route path="room-assignment/manual-auto" element={<ManualAutoAssign />} />
      <Route path="room-assignment/housekeeping-status"element={<CheckHousekeepingStatus />}/>
      <Route path="room-assignment/reassign"element={<ReassignRooms />}/>
      <Route path="guest-management/history"element={<ViewGuestHistory />}/>
      <Route path="guest-management/loyalty"element={<ManageLoyaltyPrograms />}/>
      <Route path="guest-management/blacklist"element={<BlacklistRestrictions />}/>
      <Route path="billing/invoices"element={<ViewInvoicesModifyPayments />}/>
      <Route path="billing/split-bills"element={<SplitBillsRefunds />}/>
      <Route path="reports/daily-revenue"element={<DailyRevenueSummary />}/>
      <Route path="reports/occupancy"element={<OccupancyReports />}/>
      <Route path="reports/trends"element={<ReservationTrends />}/>
      <Route path="reports/end-of-day"element={<EndOfDayReports />}/>
      <Route path="requests/housekeeping"element={<HousekeepingServices />}/>
      <Route path="requests/fnb-orders"element={<FoodBeverageOrders />}/>
      <Route path="requests/transport"element={<TransportRequests />}/>
      <Route path="staff/scheduling"element={<StaffSchedulingAndPayroll />}/>
      <Route path="staff/performance"element={<RoleManagementPerformance />}/>
      <Route path="checkout/finalize-payments"element={<FinalizePaymentsAndBalances />}/>
      <Route path="checkout/issue-receipts"element={<IssueReceipts />}/>
      <Route path="checkout/feedback"element={<SendFeedbackForms />}/>


    
    </Route>
  </Routes>
</BrowserRouter>
);

export default App;
