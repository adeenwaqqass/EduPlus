import React, { useState, useRef } from 'react';
import logoTwo from '../assets/logo_two.png';
import { 
  Home,
  Search, 
  Bell, 
  AlertTriangle, 
  UserX, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  X,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function Header({ 
  pageTitle, 
  searchTerm, 
  setSearchTerm, 
  setActiveTab, 
  currentUser,
  onSelectStudent,
  notifications = [],
  setNotifications
}) {
  const [isBellHovered, setIsBellHovered] = useState(false);

  const userNameDisplay = currentUser?.shortName || (currentUser?.name ? currentUser.name.split(' ')[0].toUpperCase() : 'USER');
  const userAvatarDisplay = currentUser?.avatar || "https://randomuser.me/api/portraits/men/1.jpg";

  // ... rest of Header component ...
  const [activeHoverId, setActiveHoverId] = useState(null);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsBellHovered(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsBellHovered(false);
      setActiveHoverId(null);
    }, 350); // 350ms delay gives plenty of time to move cursor to the dropdown
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item) => {
    // Mark as read
    if (setNotifications && notifications) {
      setNotifications(notifications.map(n => n.id === item.id ? { ...n, unread: false } : n));
    }
    setIsBellHovered(false);

    // Lead directly to Home Page Notice Board!
    if (setActiveTab) {
      setActiveTab('home');
    }

    if (item.studentData && onSelectStudent) {
      onSelectStudent(item.studentData);
    }
    if (item.targetSearch && setSearchTerm) {
      setSearchTerm(item.targetSearch);
    }
  };

  const dismissNotification = (e, id) => {
    e.stopPropagation();
    if (currentUser?.role === 'student') {
      alert('Action Restricted: Students cannot delete or edit notifications.');
      return;
    }
    if (setNotifications && notifications) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  return (
    <header style={styles.header}>
      {/* Dynamic Page Title */}
      <h2 style={styles.title}>{pageTitle}</h2>

      {/* Center Nav Logo */}
      <div style={styles.centerLogoWrapper}>
        <img src={logoTwo} alt="EduPlus Logo" style={styles.centerLogo} />
      </div>

      {/* Right Controls */}
      <div style={styles.controls}>
        {/* Hoverable Notification Bell Container */}
        <div 
          style={styles.notificationWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            style={{
              ...styles.iconBtn,
              backgroundColor: isBellHovered ? '#e6f7f3' : '#f8fafc',
              borderColor: isBellHovered ? '#00a884' : 'var(--border-color)',
              transform: isBellHovered ? 'scale(1.05)' : 'scale(1)'
            }} 
            title="Notifications"
            onClick={() => setIsBellHovered(!isBellHovered)}
          >
            <Bell size={18} color={isBellHovered ? '#00a884' : '#64748b'} />
            {unreadCount > 0 && (
              <span style={styles.badgeDot}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Functional Hover Dropdown Menu */}
          {isBellHovered && (
            <div 
              style={styles.dropdownMenu}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dropdown Header */}
              <div style={styles.dropdownHeader}>
                <div style={styles.dropdownTitleGroup}>
                  <h4 style={styles.dropdownTitle}>Notifications</h4>
                  {unreadCount > 0 && (
                    <span style={styles.unreadPill}>{unreadCount} New</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    style={styles.markReadBtn}
                    title="Mark all as read"
                  >
                    <Check size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div style={styles.notificationList}>
                {notifications.length === 0 ? (
                  <div style={styles.emptyState}>
                    <CheckCircle2 size={32} color="#00a884" />
                    <p style={{ margin: '0.5rem 0 0', fontWeight: 600, color: '#475569' }}>All caught up!</p>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>No active notifications at the moment.</span>
                  </div>
                ) : (
                  notifications.map((item) => {
                    const IconComponent = item.icon;
                    const isItemHovered = activeHoverId === item.id;

                    return (
                      <div 
                        key={item.id}
                        onMouseEnter={() => setActiveHoverId(item.id)}
                        onClick={() => handleNotificationClick(item)}
                        style={{
                          ...styles.notificationCard,
                          backgroundColor: isItemHovered
                            ? '#e6f7f3'
                            : item.unread ? '#f0fdf4' : '#ffffff',
                          borderLeft: item.unread 
                            ? '4px solid #00a884' 
                            : isItemHovered ? '4px solid #008f70' : '4px solid transparent',
                          boxShadow: isItemHovered ? '0 4px 12px rgba(0, 168, 132, 0.12)' : 'none'
                        }}
                      >
                        <div style={{
                          ...styles.iconContainer,
                          backgroundColor: 
                            item.type === 'critical' ? '#fee2e2' :
                            item.type === 'warning' ? '#fef3c7' :
                            item.type === 'info' ? '#e0f2fe' : '#e6f7f3',
                          color:
                            item.type === 'critical' ? '#dc2626' :
                            item.type === 'warning' ? '#d97706' :
                            item.type === 'info' ? '#0284c7' : '#047857'
                        }}>
                          <IconComponent size={16} />
                        </div>

                        <div style={styles.cardContent}>
                          <div style={styles.cardHeaderRow}>
                            <span style={{
                              ...styles.cardTitle,
                              fontWeight: item.unread || isItemHovered ? '700' : '600',
                              color: isItemHovered ? '#047857' : 'var(--text-dark)'
                            }}>
                              {item.title}
                            </span>
                            <span style={styles.cardTime}>{item.time}</span>
                          </div>
                          <p style={styles.cardMessage}>{item.message}</p>

                          {/* Dynamic Action Trigger on Hover/Access */}
                          <div style={{
                            ...styles.actionRow,
                            opacity: isItemHovered ? 1 : 0.85,
                            transform: isItemHovered ? 'translateX(2px)' : 'none'
                          }}>
                            <span style={styles.actionBtnText}>
                              {item.actionLabel || 'Access Notification'}
                            </span>
                            <ArrowRight size={13} color="#00a884" />
                          </div>
                        </div>

                        <button 
                          style={styles.closeBtn}
                          onClick={(e) => dismissNotification(e, item.id)}
                          title="Dismiss notification"
                        >
                          <X size={14} color="#94a3b8" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Dropdown Footer */}
              <div style={styles.dropdownFooter}>
                <span>EduPlus Achilles 1.0 Early Warning System</span>
                <span 
                  style={styles.footerLink}
                  onClick={() => {
                    setIsBellHovered(false);
                    if (setActiveTab) setActiveTab('dashboard');
                  }}
                >
                  <span>Alert Dashboard</span>
                  <ExternalLink size={13} />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Term Badge */}
        <div style={styles.termPill}>
          Fall Term 2026
        </div>

        {/* User Welcome Badge matching screenshot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: '0.25rem' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: '500', color: '#64748b' }}>
            Welcome <strong style={{ color: '#dc2626', fontWeight: '800' }}>{userNameDisplay}</strong>
          </span>
          <img
            src={userAvatarDisplay}
            alt={userNameDisplay}
            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #cbd5e1' }}
          />
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: '85px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  centerLogoWrapper: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    maxHeight: '85px',
    pointerEvents: 'none'
  },
  centerLogo: {
    height: '54px',
    maxHeight: '60px',
    width: 'auto',
    objectFit: 'contain'
  },
  greenHeaderHomeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 168, 132, 0.35)',
    transition: 'all 0.2s ease',
    letterSpacing: '0.02em'
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--text-dark)'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem'
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    pointerEvents: 'none'
  },
  searchInput: {
    padding: '0.55rem 1rem 0.55rem 2.4rem',
    fontSize: '0.85rem',
    backgroundColor: '#f8fafc',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    width: '280px',
    color: 'var(--text-dark)',
    transition: 'all 0.15s ease'
  },
  notificationWrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  iconBtn: {
    position: 'relative',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#f8fafc',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  badgeDot: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    minWidth: '18px',
    height: '18px',
    padding: '0 4px',
    borderRadius: '9999px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 0 2px #ffffff'
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: 'calc(100% + 8px)',
    width: '390px',
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    boxShadow: '0 12px 30px -5px rgba(15, 23, 42, 0.18), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    zIndex: 1000
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: '#f8fafc'
  },
  dropdownTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem'
  },
  dropdownTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-dark)',
    margin: 0
  },
  unreadPill: {
    fontSize: '0.72rem',
    fontWeight: '700',
    backgroundColor: '#00a884',
    color: '#ffffff',
    padding: '0.15rem 0.5rem',
    borderRadius: '9999px'
  },
  markReadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.76rem',
    fontWeight: '600',
    color: '#00a884',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.2rem 0.5rem',
    borderRadius: '6px'
  },
  notificationList: {
    maxHeight: '380px',
    overflowY: 'auto'
  },
  emptyState: {
    padding: '2.5rem 1rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  notificationCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.85rem',
    padding: '0.95rem 1.1rem',
    borderBottom: '1px solid var(--border-light)',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.18s ease'
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  cardContent: {
    flex: 1,
    paddingRight: '1.2rem'
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem'
  },
  cardTitle: {
    fontSize: '0.85rem',
    transition: 'color 0.15s ease'
  },
  cardTime: {
    fontSize: '0.7rem',
    color: '#94a3b8'
  },
  cardMessage: {
    fontSize: '0.78rem',
    color: '#64748b',
    margin: '0 0 0.4rem 0',
    lineHeight: '1.4'
  },
  actionRow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    marginTop: '0.2rem',
    transition: 'all 0.15s ease'
  },
  actionBtnText: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#00a884'
  },
  closeBtn: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: '4px',
    opacity: 0.6
  },
  dropdownFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1.25rem',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid var(--border-color)',
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: '500'
  },
  footerLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: '#00a884',
    fontWeight: '700',
    cursor: 'pointer'
  },
  termPill: {
    backgroundColor: '#ccfbf1',
    color: '#0f766e',
    fontSize: '0.78rem',
    fontWeight: '700',
    padding: '0.45rem 0.9rem',
    borderRadius: '9999px',
    border: '1px solid #99f6e4'
  }
};
