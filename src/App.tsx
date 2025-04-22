// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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



const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        
        <Route path="reservations/create" element={<CreateNewReservation />} />
        <Route path="reservations/modify"  element={<ModifyorCancelBooking />} />
        <Route path="reservations/upcoming" element={<ViewUpcomingReservations />} />
        <Route path="reservations/check-availability" element={<CheckAvailability />} />
        <Route path="reservations/group-reservations" element={<GroupReservations />} />
        <Route path="front-desk/check-in" element={<CheckinGuests />} />
        <Route path="front-desk/walk-in" element={<WalkInReservations />} />
        <Route path="front-desk/upgrade-room" element={<UpgradeDowngradeRoom />} />
        <Route path="front-desk/early-check-out" element={<EarlyCheckOutProcessing />} />

      
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
