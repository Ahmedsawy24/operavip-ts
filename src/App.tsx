// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './Pages/Homepage/Dashboard';

// استيراد صفحة إنشاء حجز جديد
import CreateNewReservation from './Pages/HeaderPages/Reservation/CreateNewReservation/CreateNewReservation';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* مسار صفحة إنشاء حجز جديد */}
        <Route
          path="reservations/create"
          element={<CreateNewReservation />}
        />

        {/* إضافة باقي المسارات بنفس الطريقة */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
