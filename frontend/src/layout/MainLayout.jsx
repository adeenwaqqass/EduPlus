import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({ 
  activeTab, 
  setActiveTab, 
  currentUser,
  pageTitle, 
  searchTerm, 
  setSearchTerm, 
  onSelectStudent, 
  notifications,
  setNotifications,
  children 
}) {
  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />
      <div className="main-content">
        <Header 
          pageTitle={pageTitle} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onSelectStudent={onSelectStudent}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <main className="page-wrapper">
          {children}
        </main>
      </div>
    </div>
  );
}
