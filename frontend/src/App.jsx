import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import StudentInformationPage from './pages/StudentInformationPage';
import StudentProfilePage from './pages/StudentProfilePage';
import FacultyPage from './pages/FacultyPage';
import FacultyAdminPage from './components/faculty-admin/FacultyAdminPage';
import FacultyPortalPage from './pages/FacultyPortalPage';
import AdminPortalPage from './pages/AdminPortalPage';
import AttendancePage from './pages/AttendancePage';
import CoursesPage from './pages/CoursesPage';
import GradesPage from './pages/GradesPage';
import FinancePage from './pages/FinancePage';
import FeedbackFormPage from './pages/FeedbackFormPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { LoginPage } from './components/landing';
import { AlertTriangle, UserX, CheckCircle2, Sparkles, Megaphone } from 'lucide-react';
import './App.css';

export default function App() {
  // Check for saved session in localStorage (Remember Me)
  const savedUserJson = typeof window !== 'undefined' ? localStorage.getItem('eduplus_saved_user') : null;

  let initialUser = {
    name: 'MR. ADEEN WAQQAS AHMED SHAHZAD AHMED',
    shortName: 'ADEEN',
    role: 'student',
    registrationNumber: '23ACOE1121163',
    department: 'COMPUTER ENGINEERING',
    semester: 'Semester VII (WINTER 2026)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  if (savedUserJson) {
    try {
      const parsedUser = JSON.parse(savedUserJson);
      if (parsedUser && parsedUser.role) {
        initialUser = parsedUser;
      }
    } catch (err) {
      console.error('Failed to parse saved login session', err);
    }
  }

  // Always start on the login page as the landing page on initial app load/launch
  const [activeTab, setActiveTab] = useState('login');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentUser, setCurrentUser] = useState(initialUser);

  // Notice Board State
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Midterm Examination Schedule & Hall Ticket Distribution',
      category: 'exam',
      priority: 'important',
      content: 'Fall 2026 Midterm examinations will commence on October 15th. Students can download hall tickets from the Exam Scorecard tab starting Monday.',
      author: 'Office of the Controller of Examinations',
      date: '2 hours ago',
      isPinned: true,
      attachment: 'Fall_2026_Midterm_Timetable.pdf'
    },
    {
      id: 2,
      title: 'CRITICAL: Attendance Advisory Notice for Low-Attendance Students',
      category: 'academic',
      priority: 'critical',
      content: 'EduPlus Achilles 1.0 analytics has flagged students with attendance under 75% in CS-101 and EE-201. Mandatory advising sessions start tomorrow.',
      author: 'Academic Registrar & Dean Office',
      date: '4 hours ago',
      isPinned: true,
      attachment: null
    },
    {
      id: 3,
      title: 'Tuition Fee Payment Deadline for Second Installment',
      category: 'finance',
      priority: 'important',
      content: 'The last date to clear second-installment tuition fees without late fine is November 2nd, 2026. Online payment portal is active.',
      author: 'Finance & Accounts Desk',
      date: 'Yesterday',
      isPinned: false,
      attachment: 'Fee_Payment_Guidelines.pdf'
    },
    {
      id: 4,
      title: 'Annual Hackathon & AI Project Symposium 2026',
      category: 'events',
      priority: 'normal',
      content: 'Department of Computer Science invites team registrations for the 48-Hour EduPlus AI Hackathon. Prize pool of $5,000.',
      author: 'Student Activity Council',
      date: '2 days ago',
      isPinned: false,
      attachment: 'Hackathon_Rules.pdf'
    }
  ]);

  // Notifications State (Synced with Notice Board)
  const [notifications, setNotifications] = useState([
    {
      id: 101,
      type: 'critical',
      title: 'At-Risk Warning Flag',
      message: 'Siddharth Nair (ID #CS-2024-112) attendance dropped to 64.5%. Immediate advising recommended.',
      time: '10 mins ago',
      unread: true,
      icon: AlertTriangle,
      targetTab: 'home',
      actionLabel: 'View Notice Board'
    },
    {
      id: 102,
      type: 'warning',
      title: 'Midterm Examination Schedule Posted',
      message: 'Midterm timetable published for Fall 2026. Hall tickets available for download.',
      time: '2 hours ago',
      unread: true,
      icon: Megaphone,
      targetTab: 'home',
      actionLabel: 'Open Notice Details'
    },
    {
      id: 103,
      type: 'warning',
      title: 'Attendance Advisory Notice',
      message: 'EduPlus Achilles 1.0 flagged low attendance in CS-101. Mandatory advising sessions open.',
      time: '4 hours ago',
      unread: true,
      icon: UserX,
      targetTab: 'home',
      actionLabel: 'Read Notice Board'
    },
    {
      id: 104,
      type: 'info',
      title: 'Midterm Grades Published',
      message: 'Prof. Sarah Jenkins submitted scores for Advanced Data Structures.',
      time: '5 hours ago',
      unread: false,
      icon: CheckCircle2,
      targetTab: 'grades',
      actionLabel: 'View Scorecards'
    }
  ]);

  // Callback when a user publishes a notice on the Notice Board
  const handleAddNotice = (newNotice) => {
    setNotices(prev => [newNotice, ...prev]);

    // Automatically sync notice to Bell Notifications!
    const newNotification = {
      id: Date.now(),
      type: newNotice.priority === 'critical' ? 'critical' : newNotice.priority === 'important' ? 'warning' : 'info',
      title: `Notice: ${newNotice.title}`,
      message: newNotice.content.substring(0, 90) + (newNotice.content.length > 90 ? '...' : ''),
      time: 'Just now',
      unread: true,
      icon: Megaphone,
      targetTab: 'home',
      actionLabel: 'Read Full Notice'
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleBackToStudents = () => {
    setSelectedStudent(null);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSelectedStudent(null);
    if (typeof window !== 'undefined' && localStorage.getItem('eduplus_saved_user')) {
      localStorage.setItem('eduplus_saved_tab', tab);
    }
  };

  if (activeTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={(userInfo, isRememberMe = true) => {
          if (userInfo) {
            setCurrentUser(userInfo);
          }
          let targetTab = 'home';
          if (userInfo && userInfo.role === 'faculty') {
            targetTab = 'faculty-portal';
          } else if (userInfo && userInfo.role === 'admin') {
            targetTab = 'admin-portal';
          }

          if (isRememberMe && userInfo) {
            localStorage.setItem('eduplus_saved_user', JSON.stringify(userInfo));
            localStorage.setItem('eduplus_saved_tab', targetTab);
          } else {
            localStorage.removeItem('eduplus_saved_user');
            localStorage.removeItem('eduplus_saved_tab');
          }

          setActiveTab(targetTab);
        }}
        onNavigateToDashboard={() => handleTabSwitch('dashboard')}
      />
    );
  }

  const getPageTitle = () => {
    if (activeTab === 'students' && selectedStudent) {
      return 'Student Profile Details';
    }

    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'dashboard':
        return 'Dashboard';
      case 'analytics':
        return 'Analytics & ML Early Warning';
      case 'admission':
      case 'students':
      case 'student-directory':
      case 'admission-entry':
        return 'Admission';
      case 'courses':
      case 'student-course-reg':
      case 'major-minor-reg':
        return 'Course';
      case 'attendance':
      case 'my-attendance':
      case 'attendance-tracker':
      case 'attendance-summary':
      case 'leave-requests':
        return 'Attendance';
      case 'grades':
      case 'exam-score':
        return 'Exam';
      case 'exam-reports':
        return 'Exam Reports';
      case 'score-card':
        return 'Score Card';
      case 'retest-slip':
        return 'My Retest Exam Slip';
      case 'exam-form':
        return 'My Exam Form';
      case 'finance':
      case 'student-fees':
      case 'fee-collection':
      case 'pending-dues':
      case 'scholarships':
        return 'Finance';
      case 'feedback':
      case 'course-eval':
      case 'faculty-review':
        return 'Feedback Form';
      case 'hostel':
      case 'room-allocation':
      case 'warden-contacts':
      case 'curfew-logs':
        return 'Hostel Management';
      case 'faculty-portal':
        return 'Faculty Educator Portal';
      case 'admin-portal':
        return 'Admin & HOD Control Portal';
      case 'faculty':
      case 'admin':
      case 'faculty-admin':
        return 'Faculty & Admin Workspace';
      case 'settings':
        return 'Settings';
      default:
        return 'Home';
    }
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            notices={notices} 
            onAddNotice={handleAddNotice} 
            currentUser={currentUser}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              setSelectedStudent(null);
            }} 
          />
        );
      case 'dashboard':
        return <DashboardPage currentUser={currentUser} onNavigateToStudent={handleSelectStudent} />;
      case 'analytics':
        return <AnalyticsPage currentUser={currentUser} searchTerm={searchTerm} />;
      case 'admission':
      case 'students':
      case 'personal-info':
      case 'admission-info':
      case 'parent-details':
      case 'bank-details':
      case 'documents':
      case 'student-directory':
      case 'admission-entry':
        if (currentUser?.role !== 'admin') {
          return <DashboardPage currentUser={currentUser} onNavigateToStudent={handleSelectStudent} />;
        }
        if (selectedStudent) {
          return (
            <StudentProfilePage
              student={selectedStudent}
              onBack={handleBackToStudents}
            />
          );
        }
        return (
          <StudentInformationPage
            initialTab={activeTab}
            searchTerm={searchTerm}
            currentUser={currentUser}
            onSelectStudent={handleSelectStudent}
          />
        );
      case 'courses':
      case 'student-course-reg':
      case 'class-registered-course':
      case 'major-minor-reg':
      case 'major-minor-students':
        return <CoursesPage initialTab={activeTab} searchTerm={searchTerm} currentUser={currentUser} />;
      case 'faculty-portal':
        if (currentUser?.role === 'student') {
          return <DashboardPage currentUser={currentUser} onNavigateToStudent={handleSelectStudent} />;
        }
        return <FacultyPortalPage currentUser={currentUser} onAddNotice={handleAddNotice} searchTerm={searchTerm} onSelectStudent={handleSelectStudent} />;
      case 'admin-portal':
        if (currentUser?.role !== 'admin') {
          return <DashboardPage currentUser={currentUser} onNavigateToStudent={handleSelectStudent} />;
        }
        return <AdminPortalPage currentUser={currentUser} searchTerm={searchTerm} />;
      case 'faculty':
      case 'admin':
      case 'faculty-admin':
        if (currentUser?.role === 'student') {
          return <DashboardPage currentUser={currentUser} onNavigateToStudent={handleSelectStudent} />;
        }
        return <FacultyAdminPage currentUser={currentUser} onAddNotice={handleAddNotice} searchTerm={searchTerm} />;
      case 'staff-directory':
        return <FacultyPage searchTerm={searchTerm} />;
      case 'attendance':
      case 'my-attendance':
      case 'attendance-tracker':
      case 'attendance-summary':
        return <AttendancePage initialTab="my-attendance" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'my-calendar':
        return <AttendancePage initialTab="my-calendar" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'create-class':
        if (currentUser?.role === 'student') {
          return <DashboardPage currentUser={currentUser} onNavigateToStudent={handleSelectStudent} />;
        }
        return <AttendancePage initialTab="create-class" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'leave-requests':
        return <AttendancePage initialTab="leave-requests" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'grades':
      case 'exam-score':
        return <GradesPage initialTab="exam-score" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'exam-reports':
        return <GradesPage initialTab="exam-reports" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'score-card':
        return <GradesPage initialTab="score-card" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'retest-slip':
        return <GradesPage initialTab="retest-slip" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'exam-form':
        return <GradesPage initialTab="exam-form" searchTerm={searchTerm} currentUser={currentUser} />;
      case 'finance':
      case 'student-fees':
      case 'fee-collection':
      case 'pending-dues':
      case 'scholarships':
        return <FinancePage searchTerm={searchTerm} currentUser={currentUser} />;
      case 'feedback':
      case 'course-eval':
        return <FeedbackFormPage initialTab="course-eval" currentUser={currentUser} />;
      case 'faculty-review':
        return <FeedbackFormPage initialTab="faculty-review" currentUser={currentUser} />;
      case 'hostel':
        return (
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Hostel & Campus Housing Management</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage dormitory room allocations, warden contact details, and student curfew logs.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <div style={{ background: '#e0f2fe', border: '1px solid #93c5fd', padding: '1rem 2rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0369a1' }}>OCCUPIED ROOMS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>842 / 900</div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <HomePage 
            notices={notices} 
            onAddNotice={handleAddNotice} 
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              setSelectedStudent(null);
            }} 
          />
        );
    }
  };

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={handleTabSwitch}
      currentUser={currentUser}
      onSelectStudent={(student) => {
        setActiveTab('students');
        setSelectedStudent(student);
      }}
      notifications={notifications}
      setNotifications={setNotifications}
      pageTitle={getPageTitle()}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      {renderActivePage()}
    </MainLayout>
  );
}
