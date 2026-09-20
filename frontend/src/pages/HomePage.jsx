import React, { useState } from 'react';
import { 
  Bell, 
  Pin, 
  Search, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Download, 
  Tag, 
  ArrowRight, 
  BookOpen, 
  CalendarCheck, 
  FileSignature, 
  CreditCard, 
  MessageSquare, 
  X,
  Megaphone,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function HomePage({ 
  notices = [], 
  onAddNotice, 
  onNavigateTab,
  currentUser
}) {
  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Notices' },
    { id: 'academic', label: 'Academic & Courses' },
    { id: 'exam', label: 'Exams & Schedules' },
    { id: 'finance', label: 'Fees & Finance' },
    { id: 'events', label: 'Campus Events' },
    { id: 'critical', label: 'Urgent Alerts' }
  ];

  const filteredNotices = notices.filter(item => {
    const matchesCategory = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'critical' ? item.priority === 'critical' :
      item.category === selectedCategory;

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'critical':
        return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5', label: 'CRITICAL ALERT' };
      case 'important':
        return { bg: '#fef3c7', color: '#d97706', border: '#fcd34d', label: 'IMPORTANT' };
      default:
        return { bg: '#e0f2fe', color: '#0284c7', border: '#7dd3fc', label: 'ANNOUNCEMENT' };
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Welcome Hero Banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <div style={styles.badgeRow}>
            <span style={styles.heroBadge}>
              <Sparkles size={14} color="#00a884" />
              EduPlus CMS Central Bulletin
            </span>
            <span style={styles.dateBadge}>
              <Calendar size={14} color="#94a3b8" />
              Fall Academic Term 2026
            </span>
          </div>

          <h1 style={styles.heroTitle}>Campus Notice Board & Bulletin</h1>
          <p style={styles.heroSubtitle}>
            Stay updated with real-time academic announcements, exam schedules, fee reminders, and system alerts.
          </p>
        </div>

        {/* Hero Quick Stat Metrics */}
        <div style={styles.heroStats}>
          <div style={styles.statBox}>
            <div style={styles.statNum}>{notices.length}</div>
            <div style={styles.statLabel}>Active Notices</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNum, color: '#ef4444' }}>
              {notices.filter(n => n.priority === 'critical').length}
            </div>
            <div style={styles.statLabel}>Urgent Alerts</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNum, color: '#00a884' }}>98.4%</div>
            <div style={styles.statLabel}>EduPlus Achilles 1.0 Active</div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={styles.mainGrid}>
        {/* Notice Board Main Column */}
        <div style={styles.noticeSection}>
          {/* Header Controls */}
          <div style={styles.sectionHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Megaphone size={22} color="#00a884" />
              <h2 style={styles.sectionTitle}>Official Announcements</h2>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div style={styles.filterBar}>
            {/* Category Pills */}
            <div style={styles.categoryList}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    ...styles.categoryBtn,
                    ...(selectedCategory === cat.id ? styles.categoryBtnActive : {})
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={styles.searchWrapper}>
              <Search size={16} color="#94a3b8" style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search notice content or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Notice Cards List */}
          <div style={styles.noticeList}>
            {filteredNotices.length === 0 ? (
              <div style={styles.emptyNoticeState}>
                <FileText size={40} color="#94a3b8" />
                <h4 style={{ margin: '0.75rem 0 0.25rem', color: '#475569', fontWeight: 700 }}>No Notices Found</h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                  There are no active notices matching your current search or category filter.
                </p>
              </div>
            ) : (
              filteredNotices.map((notice) => {
                const priorityInfo = getPriorityStyle(notice.priority);

                return (
                  <div 
                    key={notice.id} 
                    style={{
                      ...styles.noticeCard,
                      borderLeft: `4px solid ${priorityInfo.color}`
                    }}
                  >
                    {/* Card Header Row */}
                    <div style={styles.cardHeaderRow}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          ...styles.priorityBadge,
                          backgroundColor: priorityInfo.bg,
                          color: priorityInfo.color,
                          borderColor: priorityInfo.border
                        }}>
                          {priorityInfo.label}
                        </span>

                        <span style={styles.categoryBadge}>
                          <Tag size={12} color="#00a884" />
                          {notice.category.toUpperCase()}
                        </span>

                        {notice.isPinned && (
                          <span style={styles.pinnedBadge}>
                            <Pin size={12} color="#00a884" />
                            PINNED
                          </span>
                        )}
                      </div>

                      <div style={styles.timeTag}>
                        <Clock size={13} color="#94a3b8" />
                        <span>{notice.date}</span>
                      </div>
                    </div>

                    {/* Notice Title */}
                    <h3 style={styles.noticeTitle}>{notice.title}</h3>

                    {/* Content */}
                    <p style={styles.noticeContent}>{notice.content}</p>

                    {/* Footer Row */}
                    <div style={styles.cardFooterRow}>
                      <div style={styles.authorGroup}>
                        <div style={styles.authorAvatar}>
                          <User size={14} color="#00a884" />
                        </div>
                        <span style={styles.authorText}>Posted by <strong>{notice.author}</strong></span>
                      </div>

                      {notice.attachment && (
                        <button 
                          style={styles.attachmentBtn}
                          onClick={() => alert(`Downloading attachment: ${notice.attachment}`)}
                        >
                          <Download size={14} />
                          <span>{notice.attachment}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Widgets Column */}
        <div style={styles.widgetsSection}>
          {/* Quick Hub Navigation Card */}
          <div style={styles.widgetCard}>
            <h3 style={styles.widgetTitle}>Quick Portal Links</h3>
            <div style={styles.quickLinksGrid}>
              <div 
                style={styles.quickTile} 
                onClick={() => onNavigateTab && onNavigateTab('dashboard')}
              >
                <div style={{ ...styles.quickIcon, backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={styles.quickTileTitle}>ML Analytics</div>
                  <div style={styles.quickTileSub}>Early Warning Dashboard</div>
                </div>
              </div>

              <div 
                style={styles.quickTile} 
                onClick={() => onNavigateTab && onNavigateTab('attendance')}
              >
                <div style={{ ...styles.quickIcon, backgroundColor: '#e6f7f3', color: '#00a884' }}>
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <div style={styles.quickTileTitle}>Attendance</div>
                  <div style={styles.quickTileSub}>Daily Tracker Logs</div>
                </div>
              </div>

              <div 
                style={styles.quickTile} 
                onClick={() => onNavigateTab && onNavigateTab('grades')}
              >
                <div style={{ ...styles.quickIcon, backgroundColor: '#fef3c7', color: '#d97706' }}>
                  <FileSignature size={18} />
                </div>
                <div>
                  <div style={styles.quickTileTitle}>Exam Scores</div>
                  <div style={styles.quickTileSub}>Midterm & Internal Marks</div>
                </div>
              </div>

              <div 
                style={styles.quickTile} 
                onClick={() => onNavigateTab && onNavigateTab('courses')}
              >
                <div style={{ ...styles.quickIcon, backgroundColor: '#f3e8ff', color: '#9333ea' }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <div style={styles.quickTileTitle}>Course Catalog</div>
                  <div style={styles.quickTileSub}>Syllabus & Allocations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Academic Calendar Dates */}
          <div style={styles.widgetCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={styles.widgetTitle}>Key Academic Dates</h3>
              <Calendar size={16} color="#64748b" />
            </div>

            <div style={styles.eventList}>
              <div style={styles.eventItem}>
                <div style={styles.eventDateBox}>
                  <span style={styles.eventMonth}>OCT</span>
                  <span style={styles.eventDay}>15</span>
                </div>
                <div>
                  <div style={styles.eventTitle}>Midterm Examination Window</div>
                  <div style={styles.eventSub}>Department of Computer Science</div>
                </div>
              </div>

              <div style={styles.eventItem}>
                <div style={styles.eventDateBox}>
                  <span style={styles.eventMonth}>NOV</span>
                  <span style={styles.eventDay}>02</span>
                </div>
                <div>
                  <div style={styles.eventTitle}>Tuition Fee Installment Due</div>
                  <div style={styles.eventSub}>Finance & Accounts Desk</div>
                </div>
              </div>

              <div style={styles.eventItem}>
                <div style={styles.eventDateBox}>
                  <span style={styles.eventMonth}>DEC</span>
                  <span style={styles.eventDay}>10</span>
                </div>
                <div>
                  <div style={styles.eventTitle}>Fall Term Final Assessment</div>
                  <div style={styles.eventSub}>All Department Cohorts</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>


    </div>
  );
}

const styles = {
  container: {
    padding: '1.75rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  heroBanner: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem 2rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
  },
  heroContent: {
    flex: 1
  },
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.65rem'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#e6f7f3',
    color: '#00a884',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '0.25rem 0.65rem',
    borderRadius: '9999px',
    border: '1px solid #a7f3d0'
  },
  dateBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.65rem',
    borderRadius: '9999px'
  },
  heroTitle: {
    fontSize: '1.65rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 0.35rem 0',
    letterSpacing: '-0.02em'
  },
  heroSubtitle: {
    fontSize: '0.88rem',
    color: '#64748b',
    margin: 0,
    maxWidth: '680px',
    lineHeight: '1.45'
  },
  heroStats: {
    display: 'flex',
    gap: '1rem'
  },
  statBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '0.85rem 1.25rem',
    textAlign: 'center',
    minWidth: '110px'
  },
  statNum: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0f172a'
  },
  statLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#64748b',
    marginTop: '0.15rem'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '1.75rem'
  },
  noticeSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  postNoticeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.6rem 1.1rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0, 168, 132, 0.35)',
    transition: 'all 0.2s ease'
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  categoryList: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    flexWrap: 'wrap'
  },
  categoryBtn: {
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '0.45rem 0.85rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  categoryBtnActive: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    borderColor: '#00a884',
    boxShadow: '0 2px 8px rgba(0, 168, 132, 0.25)'
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px'
  },
  searchInput: {
    padding: '0.48rem 0.85rem 0.48rem 2.2rem',
    fontSize: '0.82rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: '#ffffff',
    width: '230px',
    color: '#0f172a'
  },
  noticeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  emptyNoticeState: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '3rem 1.5rem',
    textAlign: 'center',
    border: '1px solid var(--border-color)'
  },
  noticeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
    transition: 'all 0.15s ease'
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.65rem'
  },
  priorityBadge: {
    fontSize: '0.68rem',
    fontWeight: '800',
    padding: '0.18rem 0.5rem',
    borderRadius: '6px',
    border: '1px solid',
    letterSpacing: '0.04em'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#0f766e',
    backgroundColor: '#ccfbf1',
    padding: '0.18rem 0.5rem',
    borderRadius: '6px'
  },
  pinnedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.68rem',
    fontWeight: '700',
    color: '#00a884',
    backgroundColor: '#e6f7f3',
    padding: '0.18rem 0.55rem',
    borderRadius: '6px'
  },
  timeTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.74rem',
    color: '#94a3b8'
  },
  noticeTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 0.45rem 0',
    lineHeight: '1.35'
  },
  noticeContent: {
    fontSize: '0.86rem',
    color: '#475569',
    margin: '0 0 1rem 0',
    lineHeight: '1.5'
  },
  cardFooterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid #f1f5f9'
  },
  authorGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  authorAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#e6f7f3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  authorText: {
    fontSize: '0.78rem',
    color: '#64748b'
  },
  attachmentBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '0.3rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#0f172a',
    cursor: 'pointer'
  },
  widgetsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.25rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
  },
  widgetTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 1rem 0'
  },
  quickLinksGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem'
  },
  quickTile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.65rem 0.85rem',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  quickIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  quickTileTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  quickTileSub: {
    fontSize: '0.72rem',
    color: '#64748b'
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem'
  },
  eventItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem'
  },
  eventDateBox: {
    width: '42px',
    height: '42px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid #e2e8f0'
  },
  eventMonth: {
    fontSize: '0.6rem',
    fontWeight: '800',
    color: '#00a884',
    letterSpacing: '0.05em'
  },
  eventDay: {
    fontSize: '1rem',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: '1'
  },
  eventTitle: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  eventSub: {
    fontSize: '0.7rem',
    color: '#64748b'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '1rem'
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '560px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '1.25rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  },
  modalForm: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
  },
  formLabel: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#334155'
  },
  formInput: {
    padding: '0.55rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    fontSize: '0.85rem',
    color: '#0f172a',
    backgroundColor: '#ffffff'
  },
  formSelect: {
    padding: '0.55rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    fontSize: '0.85rem',
    color: '#0f172a',
    backgroundColor: '#ffffff'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '0.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f1f5f9'
  },
  cancelBtn: {
    padding: '0.55rem 1.1rem',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer'
  },
  submitNoticeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.55rem 1.25rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '700',
    fontSize: '0.85rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 168, 132, 0.3)'
  }
};
