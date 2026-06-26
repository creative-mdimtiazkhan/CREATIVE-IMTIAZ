/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './components/Projects';
import Message from './pages/Message';
import ProjectsEditor from './pages/admin/ProjectsEditor';
import CardsEditor from './pages/admin/CardsEditor';
import ProjectDetails from './pages/ProjectDetails';
import { AppProvider } from './context/AppContext';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import DemoViewer from './pages/DemoViewer';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import ProfileEditor from './pages/admin/ProfileEditor';
import AboutEditor from './pages/admin/AboutEditor';
import ContactEditor from './pages/admin/ContactEditor';
import SocialsEditor from './pages/admin/SocialsEditor';
import ClientReport from './pages/admin/ClientReport';
import SkillsEditor from './pages/admin/SkillsEditor';
import FeaturedProjectsEditor from './pages/admin/FeaturedProjectsEditor';
import OrdersManager from './pages/admin/OrdersManager';

// Wrapper for the public layout to keep TopNav and BottomNav only on public pages
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-theme-bg min-h-screen text-theme-text font-sans pb-16">
      <TopNav />
      {children}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/message" element={<Message />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/checkout/success/:id" element={<OrderSuccess />} />
                <Route path="/demo/:id" element={<DemoViewer />} />
              </Routes>
            </PublicLayout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="skills" element={<SkillsEditor />} />
            <Route path="projects" element={<ProjectsEditor />} />
            <Route path="featured-projects" element={<FeaturedProjectsEditor />} />
            <Route path="cards" element={<CardsEditor />} />
            <Route path="contact" element={<ContactEditor />} />
            <Route path="socials" element={<SocialsEditor />} />
            <Route path="reports" element={<ClientReport />} />
            <Route path="orders" element={<OrdersManager />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

