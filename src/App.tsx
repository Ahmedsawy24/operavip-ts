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

      
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
