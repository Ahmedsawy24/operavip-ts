// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Layout: React.FC = () => {
  return (
    <>
      {/* يعرض الـ Navbar في كل الصفحات */}
      <Navbar>
        {/* هنا يتم حجز مكان عرض الصفحة الحالية */}
        <Outlet />
      </Navbar>
    </>
  );
};

export default Layout;
