import React, { useState, useRef, useEffect } from 'react';
import logoTwo from '../assets/logo_two.png';
import { 
  Home,
  LayoutDashboard, 
  UserPlus, 
  BookOpenCheck, 
  CalendarCheck, 
  FileSignature, 
  CreditCard,
  ClipboardList,
  BedDouble,
  LogOut,
  ShieldCheck,
  User,
  Lock,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentUser }) {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const userNameDisplay = currentUser?.name || 'Academic User';
  const userAvatarDisplay = currentUser?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg';
  const [activeFlyout, setActiveFlyout] = useState(null);
  const [activeSubFlyout, setActiveSubFlyout] = useState('exam-reports');
  const footerRef = useRef(null);
  const flyoutTimeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
      profileTimeoutRef.current = null;
    }
    setShowProfileModal(true);
  };

  const handleProfileMouseLeave = () => {
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
    }
    profileTimeoutRef.current = setTimeout(() => {
      setShowProfileModal(false);
    }, 450); // 450ms delay gives plenty of time to move cursor to popover options
  };

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavMouseEnter = (itemId, hasSubmenu) => {
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }
    if (hasSubmenu) {
      setActiveFlyout(itemId);
      if (itemId === 'grades') {
        setActiveSubFlyout('exam-reports');
      } else {
        setActiveSubFlyout(null);
      }
    } else {
      setActiveFlyout(null);
      setActiveSubFlyout(null);
    }
  };

  const handleNavMouseLeave = () => {
    flyoutTimeoutRef.current = setTimeout(() => {
      setActiveFlyout(null);
      setActiveSubFlyout(null);
    }, 300);
  };

  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      isGreenHome: true,
      hasSubmenu: false 
    },
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      hasSubmenu: false 
    },
    ...((currentUser?.role === 'student' || currentUser?.role === 'faculty' || currentUser?.role === 'admin') ? [{
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      hasSubmenu: false
    }] : []),
    ...(currentUser?.role === 'admin' ? [{ 
      id: 'admission', 
      label: 'Admission', 
      icon: UserPlus,
      hasSubmenu: false
    }] : []),
    { 
      id: 'courses', 
      label: 'Course', 
      icon: BookOpenCheck,
      hasSubmenu: true,
      subItems: [
        { id: 'student-course-reg', label: (currentUser?.role === 'faculty' || currentUser?.role === 'admin') ? 'Class Registered Course' : 'Student Course Registration' },
        { id: 'major-minor-reg', label: (currentUser?.role === 'faculty' || currentUser?.role === 'admin') ? 'Major / Minor Registered Students' : 'Major / Minor Registration' }
      ]
    },
    { 
      id: 'attendance', 
      label: 'Attendance', 
      icon: CalendarCheck,
      hasSubmenu: true,
      subItems: (currentUser?.role === 'faculty' || currentUser?.role === 'admin') ? [
        { id: 'my-attendance', label: 'Class Attendance' },
        { id: 'my-calendar', label: 'My Calendar' },
        { id: 'create-class', label: 'Create Class' }
      ] : [
        { id: 'my-attendance', label: 'My Attendance' },
        { id: 'my-calendar', label: 'My Calendar' }
      ]
    },
    ...(!(currentUser?.role === 'faculty' || currentUser?.role === 'admin') ? [{ 
      id: 'grades', 
      label: 'Exam', 
      icon: FileSignature,
      hasSubmenu: true,
      subItems: [
        { 
          id: 'exam-reports', 
          label: 'Exam Reports',
          hasSubmenu: true,
          subItems: [
            { id: 'exam-reports', label: 'Student Grade Card' }
          ]
        },
        { id: 'exam-score', label: 'Exam Score' },
        { id: 'score-card', label: 'Score Card' },
        { id: 'retest-slip', label: 'My Retest Exam Slip' },
        { id: 'exam-form', label: 'My Exam Form' }
      ]
    }] : []),
    { 
      id: 'finance', 
      label: 'Finance', 
      icon: CreditCard,
      hasSubmenu: true,
      subItems: [
        { id: 'student-fees', label: 'Student Fees Details' }
      ]
    },
    { 
      id: 'feedback', 
      label: 'Feedback Form', 
      icon: ClipboardList,
      hasSubmenu: true,
      subItems: [
        { id: 'course-eval', label: 'Course Evaluation Form' },
        { id: 'faculty-review', label: 'Faculty Review Survey' }
      ]
    },
    ...(!(currentUser?.role === 'faculty') ? [{ 
      id: 'hostel', 
      label: 'Hostel Management', 
      icon: BedDouble,
      hasSubmenu: true,
      subItems: [
        { id: 'room-allocation', label: 'Room Allocation & Dorms' },
        { id: 'warden-contacts', label: 'Warden Contacts' },
        { id: 'curfew-logs', label: 'Curfew & Gate Entry Logs' }
      ]
    }] : []),
    ...((currentUser?.role === 'faculty' || currentUser?.role === 'admin') ? [{
      id: 'faculty-admin',
      label: (currentUser?.role === 'admin') ? 'Faculty & Admin Hub' : 'Faculty Hub',
      icon: ShieldCheck,
      hasSubmenu: true,
      subItems: [
        { id: 'faculty-portal', label: 'Faculty Educator Portal' },
        ...(currentUser?.role === 'admin' ? [{ id: 'admin-portal', label: 'Admin & HOD Portal' }] : []),
        { id: 'staff-directory', label: 'Staff Directory' }
      ]
    }] : [])
  ];

  const activeFlyoutItem = activeFlyout ? menuItems.find(m => m.id === activeFlyout) : null;
  const activeSubFlyoutItem = activeFlyoutItem && activeFlyoutItem.subItems && activeSubFlyout
    ? activeFlyoutItem.subItems.find(s => s.id === activeSubFlyout)
    : null;

  return (
    <div style={{ position: 'relative', display: 'flex' }} onMouseLeave={handleNavMouseLeave}>
      <aside style={styles.sidebar}>
        {/* Brand Header */}
        <div style={styles.brandContainer}>
          <img src={logoTwo} alt="EduPlus Logo" style={{ height: '38px', width: 'auto', borderRadius: '8px' }} />
          <div>
            <h1 style={styles.brandTitle}>GH RAISONI</h1>
            <span style={styles.brandSubtitle}>COLLEGE • PUNE</span>
          </div>
        </div>

        {/* Early Warning Risk Banner Indicator */}
        <div style={styles.riskBanner} onClick={() => setActiveTab('analytics')}>
          <ShieldCheck size={16} color="#00a884" />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0' }}>
            EduPlus Achilles 1.0 Active
          </span>
        </div>

        {/* Navigation List */}
        <nav style={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isGreenHome = item.isGreenHome;
            const isActive = activeTab === item.id || (item.subItems && item.subItems.some(s => s.id === activeTab));
            const isFlyoutOpen = activeFlyout === item.id;

            return (
              <button
                key={item.id}
                onMouseEnter={() => handleNavMouseEnter(item.id, item.hasSubmenu)}
                onClick={() => {
                  if (item.hasSubmenu && item.subItems && item.subItems.length > 0) {
                    const firstSub = item.subItems[0];
                    if (firstSub.hasSubmenu && firstSub.subItems && firstSub.subItems.length > 0) {
                      setActiveTab(firstSub.subItems[0].id);
                    } else {
                      setActiveTab(firstSub.id);
                    }
                  } else {
                    setActiveTab(item.id);
                  }
                  setActiveFlyout(item.id);
                }}
                style={{
                  ...styles.navItem,
                  ...(isGreenHome ? styles.greenHomeBtn : {}),
                  ...(isActive || isFlyoutOpen ? (isGreenHome ? styles.greenHomeBtnActive : styles.navItemActive) : {})
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Icon size={19} color={isGreenHome ? '#ffffff' : (isActive ? '#00a884' : '#94a3b8')} />
                  <span style={{ color: isGreenHome ? '#ffffff' : (isActive ? '#00a884' : '#ffffff'), fontWeight: isGreenHome ? '700' : '500' }}>
                    {item.label}
                  </span>
                </div>
                {isGreenHome ? (
                  <span style={styles.homeBadge}>MAIN</span>
                ) : item.hasSubmenu ? (
                  <ChevronRight size={16} color={isActive || isFlyoutOpen ? '#00a884' : '#64748b'} />
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer & Floating Popover Modal */}
        <div 
          style={{ position: 'relative' }} 
          ref={footerRef}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          {/* Floating User Profile Modal Popover */}
          {showProfileModal && (
            <div 
              style={styles.profilePopoverModal}
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              {/* Dark Top Header */}
              <div style={styles.popoverHeader}>
                <img
                  src={userAvatarDisplay}
                  alt={userNameDisplay}
                  style={styles.popoverAvatar}
                />
                <div>
                  <div style={styles.popoverName}>{userNameDisplay}</div>
                </div>
              </div>

              {/* White Body Items */}
              <div style={styles.popoverBody}>
                <div 
                  style={styles.popoverRow}
                  onClick={() => {
                    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
                    setShowProfileModal(false);
                    setActiveTab('students');
                  }}
                >
                  <div style={styles.popoverIconCircle}>
                    <User size={18} color="#64748b" />
                  </div>
                  <div>
                    <div style={styles.popoverRowTitle}>My Profile</div>
                    <div style={styles.popoverRowSubtitle}>Account settings & user info</div>
                  </div>
                </div>

                <div 
                  style={styles.popoverRow}
                  onClick={() => {
                    alert('Password reset instructions sent to your registered email address.');
                  }}
                >
                  <div style={styles.popoverIconCircle}>
                    <Lock size={18} color="#64748b" />
                  </div>
                  <div>
                    <div style={styles.popoverRowTitle}>Change Password</div>
                    <div style={styles.popoverRowSubtitle}>Update your password</div>
                  </div>
                </div>

                <button 
                  style={styles.popoverLogoutBtn}
                  onClick={() => {
                    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
                    localStorage.removeItem('eduplus_saved_user');
                    localStorage.removeItem('eduplus_saved_tab');
                    setShowProfileModal(false);
                    setActiveTab('login');
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

          {/* Hoverable User Profile Footer */}
          <div 
            style={{ ...styles.userFooter, cursor: 'pointer' }}
            onMouseEnter={handleProfileMouseEnter}
            title="Hover to view profile menu"
          >
            <img
              src={userAvatarDisplay}
              alt={userNameDisplay}
              style={styles.userAvatar}
            />
            <div style={styles.userInfo}>
              <div style={styles.userName}>{userNameDisplay}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* FLYOUT SUBMENU DRAWER PANEL (LEVEL 1) */}
      {activeFlyoutItem && activeFlyoutItem.hasSubmenu && (
        <div 
          style={styles.flyoutDrawer}
          onMouseEnter={() => {
            if (flyoutTimeoutRef.current) {
              clearTimeout(flyoutTimeoutRef.current);
              flyoutTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleNavMouseLeave}
        >
          <div style={styles.flyoutList}>
            {activeFlyoutItem.subItems.map((sub) => {
              const hasChildMenu = sub.hasSubmenu && sub.subItems && sub.subItems.length > 0;
              const isSubActive = (hasChildMenu && activeSubFlyout === sub.id) || activeTab === sub.id;

              return (
                <div
                  key={sub.id}
                  onMouseEnter={() => {
                    if (hasChildMenu) {
                      setActiveSubFlyout(sub.id);
                    }
                  }}
                  onClick={() => {
                    if (hasChildMenu) {
                      setActiveSubFlyout(sub.id);
                      if (sub.subItems && sub.subItems.length > 0) {
                        setActiveTab(sub.subItems[0].id);
                      }
                    } else {
                      setActiveTab(sub.id);
                      setActiveFlyout(null);
                      setActiveSubFlyout(null);
                    }
                  }}
                  style={{
                    ...styles.flyoutItem,
                    ...(isSubActive && hasChildMenu ? styles.flyoutItemThemeActive : {}),
                    ...(isSubActive && !hasChildMenu ? styles.flyoutItemActive : {})
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {!hasChildMenu && <span style={styles.flyoutBullet}>•</span>}
                    <span style={{
                      ...styles.flyoutText,
                      ...(isSubActive && hasChildMenu ? styles.flyoutTextTheme : {})
                    }}>
                      {sub.label}
                    </span>
                  </div>
                  {hasChildMenu && (
                    <ChevronRight 
                      size={15} 
                      color={isSubActive ? '#00a884' : '#64748b'} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FLYOUT NESTED SUBMENU DRAWER PANEL (LEVEL 2) */}
      {activeFlyoutItem && activeFlyoutItem.hasSubmenu && activeSubFlyoutItem && activeSubFlyoutItem.subItems && (
        <div 
          style={styles.flyoutDrawerLevel2}
          onMouseEnter={() => {
            if (flyoutTimeoutRef.current) {
              clearTimeout(flyoutTimeoutRef.current);
              flyoutTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleNavMouseLeave}
        >
          <div style={styles.flyoutList}>
            {activeSubFlyoutItem.subItems.map((subSub) => (
              <div
                key={subSub.id}
                style={styles.nestedFlyoutBox}
                onClick={() => {
                  setActiveTab(subSub.id);
                  setActiveFlyout(null);
                  setActiveSubFlyout(null);
                }}
              >
                <span style={styles.nestedFlyoutText}>{subSub.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: '#1f2227',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 1rem',
    flexShrink: 0,
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 20
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.5rem 0.75rem',
    marginBottom: '1.25rem'
  },
  logoBadge: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: '#00a884',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '1.2rem'
  },
  brandTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1.2'
  },
  brandSubtitle: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.08em'
  },
  riskBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(0, 168, 132, 0.3)',
    borderRadius: '10px',
    padding: '0.55rem 0.85rem',
    marginBottom: '1.5rem',
    cursor: 'pointer'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    flex: 1
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 0.9rem',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '0.92rem',
    fontWeight: '500',
    transition: 'all 0.15s ease',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer'
  },
  navItemActive: {
    backgroundColor: '#121417',
    fontWeight: '600'
  },
  greenHomeBtn: {
    background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 14px rgba(0, 168, 132, 0.4)',
    border: '1px solid #00c853',
    marginBottom: '0.4rem',
    fontWeight: '700',
    transition: 'all 0.2s ease-in-out'
  },
  greenHomeBtnActive: {
    background: 'linear-gradient(135deg, #008f70 0%, #00735a 100%)',
    boxShadow: '0 4px 18px rgba(0, 200, 83, 0.5), inset 0 0 0 2px rgba(255, 255, 255, 0.35)',
    transform: 'scale(1.02)'
  },
  homeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    color: '#ffffff',
    fontSize: '0.62rem',
    fontWeight: '800',
    padding: '0.15rem 0.45rem',
    borderRadius: '6px',
    letterSpacing: '0.05em'
  },
  flyoutDrawer: {
    position: 'fixed',
    left: '260px',
    top: 0,
    bottom: 0,
    height: '100vh',
    width: '260px',
    backgroundColor: '#1f2227',
    color: '#ffffff',
    boxShadow: '10px 0 25px rgba(0, 0, 0, 0.4)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
    zIndex: 500,
    padding: '2.5rem 1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  flyoutDrawerLevel2: {
    position: 'fixed',
    left: '520px',
    top: 0,
    bottom: 0,
    height: '100vh',
    width: '260px',
    backgroundColor: '#1a1c20',
    color: '#ffffff',
    boxShadow: '12px 0 30px rgba(0, 0, 0, 0.5)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
    zIndex: 510,
    padding: '2.5rem 1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  flyoutList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
    marginTop: '1rem'
  },
  flyoutItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 0.85rem',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#e2e8f0',
    transition: 'all 0.15s ease'
  },
  flyoutItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    fontWeight: '600'
  },
  flyoutItemThemeActive: {
    backgroundColor: '#15181b',
    borderLeft: '4px solid #00a884',
    borderRadius: '2px 6px 6px 2px',
    paddingLeft: '0.65rem'
  },
  flyoutBullet: {
    color: '#94a3b8',
    fontSize: '1.1rem',
    lineHeight: 1
  },
  flyoutText: {
    fontSize: '0.92rem',
    fontWeight: '500',
    color: '#e2e8f0'
  },
  flyoutTextTheme: {
    color: '#00a884',
    fontWeight: '700'
  },
  nestedFlyoutBox: {
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(0, 168, 132, 0.08)',
    borderTop: '1px solid #00a884',
    borderBottom: '1px solid #00a884',
    borderLeft: '3px solid #00a884',
    borderRight: '1px solid #00a884',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s ease'
  },
  nestedFlyoutText: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#00a884'
  },
  userFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.85rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    marginTop: 'auto'
  },
  userAvatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#ffffff'
  },
  userRole: {
    fontSize: '0.72rem',
    color: '#64748b'
  },
  profilePopoverModal: {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '0',
    width: '100%',
    maxWidth: '228px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35), 0 4px 10px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 1000,
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  popoverHeader: {
    backgroundColor: '#3b3b3b',
    padding: '0.85rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    color: '#ffffff'
  },
  popoverAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ffffff',
    flexShrink: 0
  },
  popoverName: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1.25',
    wordBreak: 'break-word'
  },
  popoverRole: {
    fontSize: '0.7rem',
    color: '#cbd5e1',
    marginTop: '0.15rem'
  },
  popoverBody: {
    padding: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
    backgroundColor: '#ffffff'
  },
  popoverRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.35rem 0.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease'
  },
  popoverIconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  popoverRowTitle: {
    fontSize: '0.84rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  popoverRowSubtitle: {
    fontSize: '0.7rem',
    color: '#64748b'
  },
  popoverLogoutBtn: {
    width: '100%',
    padding: '0.55rem',
    backgroundColor: '#00c853',
    color: '#ffffff',
    fontSize: '0.84rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 3px 10px rgba(0, 200, 83, 0.3)',
    transition: 'all 0.15s ease',
    marginTop: '0.15rem'
  }
};
