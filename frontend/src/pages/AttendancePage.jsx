import React, { useState, useEffect } from 'react';
import studentsData from '../data/students.json';
import { 
  Save, 
  Check, 
  Clock, 
  XCircle, 
  CalendarCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Printer, 
  User, 
  UserCheck,
  CheckSquare, 
  X, 
  FileCheck, 
  Paperclip,
  TrendingDown,
  ChevronRight,
  Send,
  Users,
  BookOpen,
  Calendar,
  ChevronLeft,
  PlusCircle,
  Building2,
  Sparkles
} from 'lucide-react';

export default function AttendancePage({ initialTab = 'my-attendance', searchTerm = '', currentUser }) {
  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  const [activeSubTab, setActiveSubTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab === 'leave-requests' || initialTab === 'leave') {
      setActiveSubTab('leave-requests');
    } else if (initialTab === 'my-calendar' || initialTab === 'calendar') {
      setActiveSubTab('my-calendar');
    } else if (initialTab === 'create-class') {
      setActiveSubTab('create-class');
    } else {
      setActiveSubTab('my-attendance');
    }
  }, [initialTab]);

  const [bannerMessage, setBannerMessage] = useState(null);
  const showBanner = (text, type = 'success') => {
    setBannerMessage({ text, type });
    setTimeout(() => setBannerMessage(null), 4500);
  };

  // ==========================================
  // STATE 0: STUDENT PORTAL (MY ATTENDANCE)
  // ==========================================
  const loggedInStudent = (studentsData || []).find(s => 
    s.id === currentUser?.studentId || 
    s.registrationNumber === currentUser?.registrationNumber ||
    s.name?.toLowerCase() === currentUser?.name?.toLowerCase()
  ) || studentsData[0];

  const studentInfo = {
    name: loggedInStudent?.name || currentUser?.name || 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
    registrationNumber: loggedInStudent?.registrationNumber || loggedInStudent?.id || '23ACOE1121163',
    academicBatch: loggedInStudent?.academicBatch || '2023-2027',
    stream: `Bachelor of Technology - ${loggedInStudent?.branch || 'COMPUTER ENGINEERING'}`,
    classSection: loggedInStudent?.classSection || 'A',
    rollNumber: loggedInStudent?.rollNumber || 'A01',
    academicSession: loggedInStudent?.academicSession || 'WINTER 2026',
    totalComponent: 10
  };

  const myAttendanceCourses = OFFICIAL_10_COURSES.map((course, idx) => {
    const totalLectures = course.totalLectures;
    const basePct = loggedInStudent?.attendancePercentage || 85;
    const presents = Math.min(totalLectures, Math.max(0, Math.round((basePct / 100) * totalLectures)));
    const pctVal = Math.round((presents / totalLectures) * 100);

    return {
      sNo: idx + 1,
      course: course.name,
      component: course.component,
      variant: `${course.id}-Bachelor of Technology-${course.id}-WINTER 2026-COMP_${loggedInStudent?.classSection || 'A'}`,
      presents,
      specialAttendance: 0,
      lectures: totalLectures,
      percentage: `${pctVal}%`
    };
  });

  // ==========================================
  // STATE FOR FACULTY CLASS ATTENDANCE VIEW
  // ==========================================
  const OFFICIAL_10_COURSES = [
    { id: '23UCOPEL4703B', code: 'CS701', name: 'BLOCKCHAIN TECHNOLOGY', component: 'Theory', totalLectures: 43 },
    { id: '23UCOPEP4703B', code: 'CS701P', name: 'BLOCKCHAIN TECHNOLOGY LAB', component: 'Practical', totalLectures: 14 },
    { id: '23UCOPCL4713', code: 'CS702', name: 'CLOUD AND EDGE COMPUTING', component: 'Theory', totalLectures: 40 },
    { id: '23UCOPCP4713', code: 'CS702P', name: 'CLOUD AND EDGE COMPUTING LAB', component: 'Practical', totalLectures: 13 },
    { id: '23UCOPCL4712', code: 'CS703', name: 'CYBER SECURITY & CRYPTOGRAPHY', component: 'Theory', totalLectures: 39 },
    { id: '23UCOPCP4712', code: 'CS703P', name: 'CYBER SECURITY LAB', component: 'Practical', totalLectures: 13 },
    { id: '23UCOPEL4705C', code: 'CS704', name: 'DATA MINING & INFO RETRIEVAL', component: 'Theory', totalLectures: 41 },
    { id: '23UCOELP4703', code: 'CS705P', name: 'MAJOR PROJECT PHASE - I', component: 'PROJECT', totalLectures: 12 },
    { id: '23UCOELL4804', code: 'CS706', name: 'RESEARCH METHODOLOGY', component: 'Theory', totalLectures: 40 },
    { id: '23UCOPEL4704D', code: 'CS707', name: 'SOCIAL NETWORK ANALYSIS', component: 'Theory', totalLectures: 41 }
  ];

  const CLASS_DIVISIONS = [
    { id: 'A', label: 'Div A (65 Students - B.Tech COMP)', code: 'Sec A (WINTER 2026)' },
    { id: 'B', label: 'Div B (65 Students - B.Tech COMP)', code: 'Sec B (WINTER 2026)' },
    { id: 'C', label: 'Div C (65 Students - B.Tech COMP)', code: 'Sec C (WINTER 2026)' },
    { id: 'D', label: 'Div D (65 Students - B.Tech COMP)', code: 'Sec D (WINTER 2026)' }
  ];

  const [selectedSubject, setSelectedSubject] = useState('23UCOPEL4703B');
  const [selectedDivision, setSelectedDivision] = useState('A');
  const [attendanceDate, setAttendanceDate] = useState('2026-09-22');
  const [facultySearchTerm, setFacultySearchTerm] = useState('');
  const [attendanceOverrideMap, setAttendanceOverrideMap] = useState({});

  const handleToggleStudentStatus = (regId, newStatus) => {
    const key = `${selectedSubject}_${selectedDivision}_${attendanceDate}_${regId}`;
    const currentCourse = OFFICIAL_10_COURSES.find(c => c.id === selectedSubject) || OFFICIAL_10_COURSES[0];
    const st = currentRosterStudents.find(s => s.regId === regId);
    if (!st) return;

    let newPresents = st.presents;
    if (st.todayStatus !== 'PRESENT' && newStatus === 'PRESENT') newPresents = Math.min(currentCourse.totalLectures, newPresents + 1);
    if (st.todayStatus === 'PRESENT' && newStatus !== 'PRESENT') newPresents = Math.max(0, newPresents - 1);

    setAttendanceOverrideMap(prev => ({
      ...prev,
      [key]: {
        presents: newPresents,
        todayStatus: newStatus
      }
    }));
  };

  // ==========================================
  // STATE FOR CREATE CLASS FORM (3RD OPTION IN BLUE BOX)
  // ==========================================
  const [createSubjectName, setCreateSubjectName] = useState('');
  const [createFacultyName, setCreateFacultyName] = useState(currentUser?.name || 'Prof. Sarah Jenkins');
  const [createDate, setCreateDate] = useState('');
  const [createStartTime, setCreateStartTime] = useState('09:00');
  const [createEndTime, setCreateEndTime] = useState('10:30');
  const [createRoom, setCreateRoom] = useState('LT-204 (Tech Building)');
  const [createSection, setCreateSection] = useState('Sec A (WINTER 2026)');

  const [scheduledClassesList, setScheduledClassesList] = useState([
    { id: 'CLS-105', subject: 'DAA', faculty: 'Prof. Sarah Jenkins', date: '2026-09-20', time: '13:51 - 10:30', room: 'LT-204 (Tech Building)S', section: 'Sec A (WINTER 2026)', status: 'SCHEDULED' },
    { id: 'CLS-101', subject: 'CS706 Advanced Generative AI & LLMs', faculty: 'Prof. Sarah Jenkins', date: '2026-10-22', time: '09:00 AM - 10:30 AM', room: 'LT-204 (Tech Building)', section: 'Sec A (WINTER 2026)', status: 'SCHEDULED' },
    { id: 'CLS-102', subject: 'CS707 Reinforcement Learning & Robotics', faculty: 'Dr. Arthur Pendelton', date: '2026-10-24', time: '11:00 AM - 12:30 PM', room: 'Robotics Lab 2', section: 'Sec B (WINTER 2026)', status: 'SCHEDULED' }
  ]);

  // ==========================================
  // STATE FOR CLASS ATTENDANCE CHECKBOX ROSTER
  // ==========================================
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState(null);
  const [classRosterSearchTerm, setClassRosterSearchTerm] = useState('');

  const defaultClassRoster = (studentsData || []).slice(0, 65).map((st, idx) => ({
    id: st.registrationNumber || st.id,
    name: st.name,
    rollNo: `COMP-A-${(idx + 1).toString().padStart(2, '0')}`,
    dept: st.branch || 'Computer Engineering',
    isPresent: (st.attendancePercentage || 85) >= 75
  }));

  const [classStudentsMap, setClassStudentsMap] = useState({});

  const getClassRoster = (classId) => {
    return classStudentsMap[classId] || defaultClassRoster;
  };

  const handleToggleStudentCheckbox = (classId, studentId) => {
    const currentRoster = getClassRoster(classId);
    const updatedRoster = currentRoster.map(st => st.id === studentId ? { ...st, isPresent: !st.isPresent } : st);
    setClassStudentsMap(prev => ({
      ...prev,
      [classId]: updatedRoster
    }));
  };

  const handleMarkAllClassPresent = (classId) => {
    const currentRoster = getClassRoster(classId);
    const updatedRoster = currentRoster.map(st => ({ ...st, isPresent: true }));
    setClassStudentsMap(prev => ({
      ...prev,
      [classId]: updatedRoster
    }));
  };

  const handleMarkAllClassAbsent = (classId) => {
    const currentRoster = getClassRoster(classId);
    const updatedRoster = currentRoster.map(st => ({ ...st, isPresent: false }));
    setClassStudentsMap(prev => ({
      ...prev,
      [classId]: updatedRoster
    }));
  };

  const handleSaveClassAttendanceSheet = (classId, className) => {
    const roster = getClassRoster(classId);
    const presentCount = roster.filter(st => st.isPresent).length;
    const absentCount = roster.length - presentCount;

    showBanner(`🎉 Attendance saved successfully for "${className}"! (${presentCount} Present, ${absentCount} Absent)`);
    setSelectedClassForAttendance(null);
  };

  const handleCreateClassSubmit = (e) => {
    e.preventDefault();

    if (!createSubjectName.trim()) {
      showBanner('Please enter a Subject Name.', 'error');
      return;
    }
    if (!createFacultyName.trim()) {
      showBanner('Please enter a Faculty Name.', 'error');
      return;
    }
    if (!createDate) {
      showBanner('Please select a Class Date.', 'error');
      return;
    }

    const newClassObj = {
      id: `CLS-${scheduledClassesList.length + 103}`,
      subject: createSubjectName.trim(),
      faculty: createFacultyName.trim(),
      date: createDate,
      time: `${createStartTime} - ${createEndTime}`,
      room: createRoom || 'LT-101',
      section: createSection || 'Sec A',
      status: 'SCHEDULED'
    };

    setScheduledClassesList([newClassObj, ...scheduledClassesList]);

    // Also automatically register subject to facultySubjects list so it shows in Attendance navbar!
    const newSubId = `cs${Date.now()}`;
    const newSubjectEntry = {
      id: newSubId,
      code: createSubjectName.substring(0, 5).toUpperCase(),
      name: createSubjectName.toUpperCase(),
      section: createSection,
      totalLectures: 30
    };

    setFacultySubjects(prev => [...prev, newSubjectEntry]);
    setClassAttendanceData(prev => ({
      ...prev,
      [newSubId]: [
        { id: '23ACOE1121163', name: 'ADEEN WAQQAS AHMED SHAHZAD AHMED', rollNo: 'COMP-A-01', section: 'A', presents: 28, total: 30, percentage: 93.3, todayStatus: 'PRESENT', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
        { id: 'CS-2024-089', name: 'Elena Rostova', rollNo: 'COMP-A-02', section: 'A', presents: 29, total: 30, percentage: 96.7, todayStatus: 'PRESENT', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
      ]
    }));

    showBanner(`🎉 Class "${createSubjectName}" scheduled successfully for ${createFacultyName} on ${createDate} (${createStartTime} - ${createEndTime})!`);

    // Reset Form
    setCreateSubjectName('');
    setCreateDate('');
  };

  // ==========================================
  // STATE FOR MY CALENDAR PAGE VIEW
  // ==========================================
  const [calendarWeekIndex, setCalendarWeekIndex] = useState(0);

  const weekRanges = [
    '20 September 2026 - 26 September 2026',
    '27 September 2026 - 03 October 2026',
    '13 September 2026 - 19 September 2026'
  ];

  const timeSlots = [
    '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM',
    '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM',
    '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
    '11:00 AM', '11:15 AM'
  ];

  // ==========================================
  // STATE 1: DAILY ATTENDANCE TRACKER
  // ==========================================
  const [selectedClass, setSelectedClass] = useState('CS-301 Sec A');
  const [selectedDate, setSelectedDate] = useState('Oct 08, 2026');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initialTrackerStudents = (studentsData || []).slice(0, 10).map((st, idx) => ({
    id: st.registrationNumber || st.id,
    name: st.name,
    department: st.branch || 'Computer Engineering',
    avatar: st.avatar || `https://randomuser.me/api/portraits/men/${idx + 1}.jpg`,
    status: (st.attendancePercentage || 85) >= 75 ? 'PRESENT' : ((st.attendancePercentage || 85) >= 65 ? 'LATE' : 'ABSENT')
  }));

  const [trackerStudents, setTrackerStudents] = useState(initialTrackerStudents);

  const updateTrackerStatus = (id, newStatus) => {
    setTrackerStudents(trackerStudents.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAllPresent = () => {
    setTrackerStudents(trackerStudents.map(s => ({ ...s, status: 'PRESENT' })));
  };

  const handleSaveTracker = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // ==========================================
  // STATE 2: ATTENDANCE SUMMARY LOGS
  // ==========================================
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const initialSummaryLogs = (studentsData || []).slice(0, 15).map((st) => {
    const total = 42;
    const pct = st.attendancePercentage || 85;
    const attended = Math.round((pct / 100) * total);
    const riskLevel = pct < 70 ? 'High Risk' : (pct < 80 ? 'Warning' : 'Good');

    return {
      id: st.registrationNumber || st.id,
      name: st.name,
      department: st.branch || 'Computer Engineering',
      year: 'Senior (B.Tech)',
      attended,
      total,
      percentage: pct,
      riskLevel
    };
  });

  const [summaryLogs, setSummaryLogs] = useState(initialSummaryLogs);

  // ==========================================
  // STATE 3: STUDENT LEAVE APPLICATIONS
  // ==========================================
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [leaveFilter, setLeaveFilter] = useState('all');

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 501,
      studentId: 'CS-2024-112',
      studentName: 'Siddharth Nair',
      department: 'Computer Science',
      leaveType: 'Medical Leave',
      fromDate: 'Oct 10, 2026',
      toDate: 'Oct 14, 2026',
      totalDays: 4,
      reason: 'Diagnosed with viral fever. Recommended 4 days bed rest by university health center physician.',
      attachment: 'Doctor_Prescription_Medical.pdf',
      status: 'PENDING',
      appliedOn: 'Oct 07, 2026'
    },
    {
      id: 502,
      studentId: 'PHY-2023-012',
      studentName: 'Marcus Aurelius',
      department: 'Physics & EE',
      leaveType: 'On-Duty (Sports)',
      fromDate: 'Oct 12, 2026',
      toDate: 'Oct 15, 2026',
      totalDays: 3,
      reason: 'Representing university in Inter-College Basketball Championship tournament finals.',
      attachment: 'Sports_Council_Approval.pdf',
      status: 'APPROVED',
      appliedOn: 'Oct 05, 2026'
    },
    {
      id: 503,
      studentId: 'LIT-2025-441',
      studentName: 'Lydia Vance',
      department: 'Data Science',
      leaveType: 'Family Emergency',
      fromDate: 'Oct 02, 2026',
      toDate: 'Oct 04, 2026',
      totalDays: 2,
      reason: 'Family urgent medical emergency out of city.',
      attachment: null,
      status: 'APPROVED',
      appliedOn: 'Oct 01, 2026'
    },
    {
      id: 504,
      studentId: 'EE-2024-055',
      studentName: 'Rohan Sharma',
      department: 'Electrical Eng',
      leaveType: 'Personal Leave',
      fromDate: 'Sep 28, 2026',
      toDate: 'Oct 01, 2026',
      totalDays: 3,
      reason: 'Personal leave for family wedding.',
      attachment: null,
      status: 'REJECTED',
      appliedOn: 'Sep 25, 2026'
    }
  ]);

  // New Leave Form State
  const [newLeaveName, setNewLeaveName] = useState('');
  const [newLeaveId, setNewLeaveId] = useState('');
  const [newLeaveType, setNewLeaveType] = useState('Medical Leave');
  const [newFromDate, setNewFromDate] = useState('Oct 15, 2026');
  const [newToDate, setNewToDate] = useState('Oct 17, 2026');
  const [newLeaveReason, setNewLeaveReason] = useState('');
  const [newLeaveDoc, setNewLeaveDoc] = useState('');

  const handleUpdateLeaveStatus = (id, newStatus) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleCreateLeaveRequest = (e) => {
    e.preventDefault();
    if (!newLeaveName.trim() || !newLeaveReason.trim()) return;

    const newObj = {
      id: Date.now(),
      studentId: newLeaveId.trim() || 'CS-2026-999',
      studentName: newLeaveName.trim(),
      department: 'Computer Science',
      leaveType: newLeaveType,
      fromDate: newFromDate,
      toDate: newToDate,
      totalDays: 3,
      reason: newLeaveReason.trim(),
      attachment: newLeaveDoc.trim() || null,
      status: 'PENDING',
      appliedOn: 'Just now'
    };

    setLeaveRequests([newObj, ...leaveRequests]);
    setNewLeaveName('');
    setNewLeaveReason('');
    setNewLeaveDoc('');
    setShowApplyLeaveModal(false);
  };

  const currentSubObj = OFFICIAL_10_COURSES.find(s => s.id === selectedSubject) || OFFICIAL_10_COURSES[0];

  // Filter exactly 65 students belonging to selected class division (Div A, Div B, Div C, Div D)
  const currentDivisionStudents = (studentsData || []).filter(
    s => (s.classSection || 'A').toUpperCase() === selectedDivision
  );

  const currentRosterStudents = currentDivisionStudents.map((st, idx) => {
    const regId = st.registrationNumber || st.id;
    const key = `${selectedSubject}_${selectedDivision}_${attendanceDate}_${regId}`;
    const override = attendanceOverrideMap[key];

    const totalLectures = currentSubObj.totalLectures || 40;
    const basePct = st.attendancePercentage || 85;
    const basePresents = Math.min(totalLectures, Math.max(0, Math.round((basePct / 100) * totalLectures)));

    // When marking attendance for a specific date (today), default checkboxes to unchecked ('ABSENT') unless overridden
    const todayStatus = override?.todayStatus !== undefined ? override.todayStatus : 'ABSENT';
    const presents = override?.presents !== undefined ? override.presents : (todayStatus === 'PRESENT' ? basePresents : Math.max(0, basePresents - 1));
    const percentage = parseFloat(((presents / totalLectures) * 100).toFixed(1));

    return {
      regId,
      name: st.name,
      rollNo: st.rollNumber ? `COMP-${selectedDivision}-${st.rollNumber}` : `COMP-${selectedDivision}-${(idx + 1).toString().padStart(2, '0')}`,
      section: selectedDivision,
      totalLectures,
      presents,
      percentage,
      todayStatus
    };
  });

  const handleSaveClassAttendanceToDatabase = () => {
    const presentStudents = currentRosterStudents.filter(s => s.todayStatus === 'PRESENT');
    const presentCount = presentStudents.length;
    const absentCount = currentRosterStudents.length - presentCount;

    showBanner(`🎉 Attendance for Div ${selectedDivision} (${currentSubObj?.name}) on ${attendanceDate} saved successfully to database! (${presentCount} Present, ${absentCount} Absent)`);
  };

  const filteredFacultyStudents = currentRosterStudents.filter(s =>
    s.name.toLowerCase().includes((facultySearchTerm || searchTerm).toLowerCase()) ||
    s.regId.toLowerCase().includes((facultySearchTerm || searchTerm).toLowerCase()) ||
    s.rollNo.toLowerCase().includes((facultySearchTerm || searchTerm).toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Alert Banner */}
      {bannerMessage && (
        <div style={{
          backgroundColor: bannerMessage.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: bannerMessage.type === 'error' ? '#991b1b' : '#166534',
          border: `1px solid ${bannerMessage.type === 'error' ? '#fca5a5' : '#86efac'}`,
          padding: '0.85rem 1.25rem',
          borderRadius: '12px',
          fontSize: '0.88rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <CheckCircle2 size={18} />
          <span>{bannerMessage.text}</span>
        </div>
      )}

      {/* Top Header & Page Navigation Sub-Tabs Bar */}
      <div style={styles.topNavCard}>
        <div>
          <h2 style={styles.pageTitle}>
            {activeSubTab === 'my-calendar' ? 'My Calendar & Weekly Schedule' : activeSubTab === 'create-class' ? 'Create Class & Lecture Scheduler' : 'Attendance & Leave Portal'}
          </h2>
          <p style={styles.pageSubtitle}>
            {activeSubTab === 'my-calendar'
              ? 'View weekly lecture schedules, time slots, and academic calendar dates.'
              : activeSubTab === 'create-class'
                ? 'Form to schedule new academic classes with Subject Name, Faculty Name, Date & Time.'
                : isFaculty 
                  ? 'Manage class attendance rosters, mark lecture logs, and review student leave applications.'
                  : 'View subject-wise attendance percentages, lecture counts, and manage leave applications.'
            }
          </p>
        </div>

        {/* Navigation Subtabs */}
        <div style={styles.subTabGroup}>
          <button
            onClick={() => setActiveSubTab('my-attendance')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'my-attendance' ? styles.subTabBtnActive : {})
            }}
          >
            <UserCheck size={16} />
            <span>{isFaculty ? 'Class Attendance' : 'My Attendance'}</span>
          </button>

          {/* MY CALENDAR SUBTAB BUTTON */}
          <button
            onClick={() => setActiveSubTab('my-calendar')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'my-calendar' ? styles.subTabBtnActive : {})
            }}
          >
            <Calendar size={16} />
            <span>My Calendar</span>
          </button>

          {/* CREATE CLASS SUBTAB BUTTON (3RD OPTION IN BLUE BOX) */}
          {isFaculty && (
            <button
              onClick={() => setActiveSubTab('create-class')}
              style={{
                ...styles.subTabBtn,
                ...(activeSubTab === 'create-class' ? styles.subTabBtnActive : {})
              }}
            >
              <PlusCircle size={16} />
              <span>Create Class</span>
            </button>
          )}

          {isFaculty && (
            <>
              <button
                onClick={() => setActiveSubTab('tracker')}
                style={{
                  ...styles.subTabBtn,
                  ...(activeSubTab === 'tracker' ? styles.subTabBtnActive : {})
                }}
              >
                <CalendarCheck size={16} />
                <span>Daily Tracker</span>
              </button>

              <button
                onClick={() => setActiveSubTab('summary')}
                style={{
                  ...styles.subTabBtn,
                  ...(activeSubTab === 'summary' ? styles.subTabBtnActive : {})
                }}
              >
                <FileCheck size={16} />
                <span>Summary Logs</span>
              </button>
            </>
          )}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB: CREATE CLASS FORM SECTION (3RD OPTION FOR FACULTY)                    */}
      {/* ========================================================================= */}
      {isFaculty && activeSubTab === 'create-class' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Create Class Form Card */}
          <div className="card" style={{ padding: '1.75rem', borderRadius: '16px', border: '2px solid #00a884', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 168, 132, 0.08)' }}>
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PlusCircle size={22} color="#00a884" />
                  Create & Schedule New Class
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  Fill out the class details below to schedule a new lecture slot for faculty & students.
                </p>
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.35rem 0.75rem', borderRadius: '8px' }}>
                EduPlus Timetable Engine
              </span>
            </div>

            <form onSubmit={handleCreateClassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Row 1: Subject Name & Faculty Name */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Subject Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS706 Advanced Generative AI & Deep Learning"
                    value={createSubjectName}
                    onChange={e => setCreateSubjectName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Faculty Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Sarah Jenkins"
                    value={createFacultyName}
                    onChange={e => setCreateFacultyName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Date, Start Time, End Time */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Class Date (Calendar) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={createDate}
                    onChange={e => setCreateDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={createStartTime}
                    onChange={e => setCreateStartTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    End Time
                  </label>
                  <input
                    type="time"
                    value={createEndTime}
                    onChange={e => setCreateEndTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Venue Room & Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Venue / Classroom / Lab
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LT-204 (Tech Building)"
                    value={createRoom}
                    onChange={e => setCreateRoom(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Class Section / Cohort
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sec A (WINTER 2026)"
                    value={createSection}
                    onChange={e => setCreateSection(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#00a884',
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    boxShadow: '0 4px 14px rgba(0, 168, 132, 0.4)',
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles size={18} />
                  <span>Create & Schedule Class</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Scheduled Classes */}
          <div style={{ marginTop: '0.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarCheck size={20} color="#00a884" />
              Scheduled Class Lectures List ({scheduledClassesList.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {scheduledClassesList.map(cls => (
                <div
                  key={cls.id}
                  className="card"
                  onClick={() => setSelectedClassForAttendance(cls)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '14px',
                    border: '1.5px solid #cbd5e1',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00a884'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 168, 132, 0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0369a1', backgroundColor: '#e0f2fe', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        {cls.id}
                      </span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#047857', backgroundColor: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        {cls.section}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {cls.subject}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>👨‍🏫 Faculty: <strong>{cls.faculty}</strong></span>
                      <span>•</span>
                      <span>📅 Date: <strong>{cls.date}</strong></span>
                      <span>•</span>
                      <span>🕒 Time: <strong>{cls.time}</strong></span>
                      <span>•</span>
                      <span>📍 Venue: <strong>{cls.room}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', backgroundColor: '#f0fdf4', border: '1px solid #a7f3d0', padding: '0.35rem 0.75rem', borderRadius: '8px' }}>
                      ✓ SCHEDULED
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClassForAttendance(cls);
                      }}
                      style={{
                        backgroundColor: '#00a884',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.45rem 0.95rem',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 3px 10px rgba(0, 168, 132, 0.25)'
                      }}
                    >
                      <UserCheck size={15} />
                      <span>Take Attendance</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL / VIEW: MARK ATTENDANCE FOR SELECTED CLASS (CHECKBOX TABLE)        */}
      {/* ========================================================================= */}
      {selectedClassForAttendance && (
        <div style={styles.modalOverlay}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '920px',
            maxHeight: '90vh',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              backgroundColor: '#00a884',
              color: '#ffffff',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e6f7f3' }}>
                  Class Attendance Marking Sheet • {selectedClassForAttendance.id}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0 0', color: '#ffffff' }}>
                  {selectedClassForAttendance.subject} ({selectedClassForAttendance.section})
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#e6f7f3', marginTop: '0.25rem' }}>
                  Faculty: <strong>{selectedClassForAttendance.faculty}</strong> &nbsp;•&nbsp; Date: <strong>{selectedClassForAttendance.date}</strong> &nbsp;•&nbsp; Time: <strong>{selectedClassForAttendance.time}</strong>
                </div>
              </div>

              <button
                onClick={() => setSelectedClassForAttendance(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ffffff'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Toolbar */}
            <div style={{
              padding: '1rem 1.75rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.45rem 0.85rem' }}>
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search student by name or ID..."
                  value={classRosterSearchTerm}
                  onChange={e => setClassRosterSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '0.85rem', color: '#0f172a', width: '220px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleMarkAllClassPresent(selectedClassForAttendance.id)}
                  style={{
                    backgroundColor: '#e6f7f3',
                    color: '#00a884',
                    border: '1px solid #a7f3d0',
                    borderRadius: '8px',
                    padding: '0.5rem 0.9rem',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <CheckSquare size={16} />
                  <span>Mark All Present</span>
                </button>

                <button
                  onClick={() => handleMarkAllClassAbsent(selectedClassForAttendance.id)}
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: '1px solid #fca5a5',
                    borderRadius: '8px',
                    padding: '0.5rem 0.9rem',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <XCircle size={16} />
                  <span>Mark All Absent</span>
                </button>

                <span style={{ fontSize: '0.82rem', fontWeight: 800, backgroundColor: '#ffffff', color: '#334155', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  Present: <strong style={{ color: '#00a884' }}>{getClassRoster(selectedClassForAttendance.id).filter(s => s.isPresent).length}</strong> / {getClassRoster(selectedClassForAttendance.id).length}
                </span>
              </div>
            </div>

            {/* Checkbox Roster Table */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '1rem 1.75rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 800, textAlign: 'center', width: '50px' }}>S.No.</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 800, textAlign: 'center', width: '140px' }}>Mark Attendance</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 800 }}>Student Name & Roll No</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 800 }}>Registration ID</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 800 }}>Department</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 800, textAlign: 'center' }}>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getClassRoster(selectedClassForAttendance.id)
                    .filter(st => 
                      st.name.toLowerCase().includes(classRosterSearchTerm.toLowerCase()) ||
                      st.id.toLowerCase().includes(classRosterSearchTerm.toLowerCase()) ||
                      st.rollNo.toLowerCase().includes(classRosterSearchTerm.toLowerCase())
                    )
                    .map((student, idx) => (
                      <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        
                        {/* Checkbox Cell */}
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                          <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={student.isPresent}
                              onChange={() => handleToggleStudentCheckbox(selectedClassForAttendance.id, student.id)}
                              style={{
                                width: '22px',
                                height: '22px',
                                accentColor: '#00a884',
                                cursor: 'pointer'
                              }}
                            />
                          </label>
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.9rem' }}>{student.name}</div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Roll No: {student.rollNo}</div>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>
                          {student.id}
                        </td>

                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: '#64748b' }}>
                          {student.dept}
                        </td>

                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                          {student.isPresent ? (
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', backgroundColor: '#dcfce7', border: '1px solid #86efac', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                              ✓ PRESENT
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#dc2626', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                              ✕ ABSENT
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1.25rem 1.75rem',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justify: 'flex-end',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setSelectedClassForAttendance(null)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => handleSaveClassAttendanceSheet(selectedClassForAttendance.id, selectedClassForAttendance.subject)}
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '9px',
                  border: 'none',
                  backgroundColor: '#00a884',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(0, 168, 132, 0.4)'
                }}
              >
                <Save size={18} />
                <span>Save & Submit Class Attendance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: MY CALENDAR (WEEKLY TIMETABLE SCHEDULE - MATCHING IMAGE 2)          */}
      {/* ========================================================================= */}
      {activeSubTab === 'my-calendar' && (
        <div style={styles.sectionContainer}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.5rem', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
            {/* Header Controls for Calendar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                My Calendar
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setCalendarWeekIndex((prev) => (prev > 0 ? prev - 1 : weekRanges.length - 1))}
                  style={{
                    backgroundColor: '#00a884',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 168, 132, 0.3)'
                  }}
                >
                  Previous
                </button>

                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', backgroundColor: '#f1f5f9', padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  {weekRanges[calendarWeekIndex]}
                </span>

                <button
                  onClick={() => setCalendarWeekIndex((prev) => (prev + 1) % weekRanges.length)}
                  style={{
                    backgroundColor: '#00a884',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 168, 132, 0.3)'
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Timetable Weekly Grid Container */}
            <div style={{ overflowX: 'auto', border: '1px solid #334155', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', tableLayout: 'fixed', minWidth: '1000px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '100px', backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.82rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #334155' }}>
                      Schedule
                    </th>
                    <th style={{ width: '140px', backgroundColor: '#00a884', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #00a884' }}>
                      Sunday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e6f7f3' }}>Sep 20</span>
                    </th>
                    <th style={{ backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #334155' }}>
                      Monday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Sep 21</span>
                    </th>
                    <th style={{ backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #334155' }}>
                      Tuesday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Sep 22</span>
                    </th>
                    <th style={{ backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #334155' }}>
                      Wednesday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Sep 23</span>
                    </th>
                    <th style={{ backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #334155' }}>
                      Thursday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Sep 24</span>
                    </th>
                    <th style={{ backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center', borderRight: '1px solid #334155' }}>
                      Friday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Sep 25</span>
                    </th>
                    <th style={{ backgroundColor: '#1b1e23', color: '#ffffff', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 800, textAlign: 'center' }}>
                      Saturday<br/><span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Sep 26</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, idx) => (
                    <tr key={time} style={{ borderBottom: '1px dashed #e2e8f0' }}>
                      <td style={{
                        padding: '0.5rem 0.4rem',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        color: time.endsWith(':00 AM') || time.endsWith(':00 PM') ? '#0f172a' : '#64748b',
                        backgroundColor: '#f8fafc',
                        textAlign: 'center',
                        borderRight: '1px solid #cbd5e1'
                      }}>
                        {time}
                      </td>

                      <td style={{ backgroundColor: '#e6f7f3', borderRight: '1px solid #a7f3d0', padding: '0.2rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: '800', color: '#00a884' }}>
                        {time}
                      </td>

                      <td style={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', padding: '2px', position: 'relative' }}>
                        {time === '9:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '110px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', zIndex: 10 }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>BLOCKCHAIN TECHNOLOGY-Theo...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E216</div>
                          </div>
                        )}
                        {time === '10:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '110px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', zIndex: 10 }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>SOCIAL NETWORK ANALYSIS-The...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E305</div>
                          </div>
                        )}
                      </td>

                      <td style={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', padding: '2px' }}>
                        {time === '7:00 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '170px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>SOCIAL NETWORK ANALYSIS-The...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E305</div>
                          </div>
                        )}
                        {time === '8:30 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '85px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>DATA MINING AND INFORMATIO...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E305</div>
                          </div>
                        )}
                        {time === '9:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '220px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>BLOCKCHAIN TECHNOLOGY LAB-...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E217</div>
                          </div>
                        )}
                      </td>

                      <td style={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', padding: '2px' }}>
                        {time === '9:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '110px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>CYBER SECURITY-Theory Class</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E216</div>
                          </div>
                        )}
                        {time === '10:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '110px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>CLOUD AND EDGE COMPUTING S...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E305 BK</div>
                          </div>
                        )}
                      </td>

                      <td style={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', padding: '2px' }}>
                        {time === '9:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '110px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>DATA MINING AND INFORMATIO...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E305</div>
                          </div>
                        )}
                        {time === '10:15 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #22c55e', borderRadius: '4px', padding: '0.45rem', fontSize: '0.74rem', color: '#0f172a', height: '110px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '800', lineHeight: 1.2 }}>SOCIAL NETWORK ANALYSIS-The...</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>E305</div>
                          </div>
                        )}
                      </td>

                      <td style={{ borderRight: '1px solid #e2e8f0', verticalAlign: 'top', padding: '2px' }}>
                        {time === '7:00 AM' && (
                          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #ef4444', borderRadius: '4px', padding: '0.5rem', fontSize: '0.74rem', color: '#991b1b', height: '350px' }}>
                            <div style={{ fontWeight: '800', textTransform: 'uppercase', color: '#dc2626' }}>Public Holiday</div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '0.35rem', color: '#334155' }}>ANANT CHATURDASHI</div>
                          </div>
                        )}
                      </td>

                      <td style={{ verticalAlign: 'top', padding: '2px' }}>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 0: CLASS ATTENDANCE (FACULTY) OR MY ATTENDANCE (STUDENT)              */}
      {/* ========================================================================= */}
      {activeSubTab === 'my-attendance' && (
        <div style={styles.sectionContainer}>
          <div style={styles.myAttendanceCard}>
            <h2 style={styles.myAttendanceHeading}>
              {isFaculty ? 'Class Attendance' : 'My Attendance'}
            </h2>

            {!isFaculty && (
              <div style={styles.studentInfoFieldset}>
                <div style={styles.fieldsetLegend}>
                  <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span> Student Information <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span>
                </div>
                <div style={styles.studentInfoGrid}>
                  <div style={styles.infoCol}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Name :</span>
                      <span style={styles.infoVal}>{studentInfo.name}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Registration Number :</span>
                      <span style={styles.infoVal}>{studentInfo.registrationNumber}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Academic Batch :</span>
                      <span style={styles.infoVal}>{studentInfo.academicBatch}</span>
                    </div>
                  </div>

                  <div style={styles.infoCol}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Stream :</span>
                      <span style={styles.infoVal}>{studentInfo.stream}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Class Section :</span>
                      <span style={styles.infoVal}>{studentInfo.classSection}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Roll Number :</span>
                      <span style={styles.infoVal}>{studentInfo.rollNumber}</span>
                    </div>
                  </div>

                  <div style={styles.infoCol}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Academic Session :</span>
                      <span style={styles.infoVal}>{studentInfo.academicSession}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Total Component :</span>
                      <span style={styles.infoVal}>{studentInfo.totalComponent}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isFaculty ? (
              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Blue Option / Subject Pills Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  backgroundColor: '#ffffff',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '14px',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  overflowX: 'auto'
                }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '0.5rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={16} color="#0284c7" />
                    SELECT SUBJECT:
                  </span>

                  {OFFICIAL_10_COURSES.map(sub => {
                    const isSelected = selectedSubject === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubject(sub.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.55rem',
                          padding: '0.55rem 1.1rem',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #00a884' : '1px solid #e2e8f0',
                          backgroundColor: isSelected ? '#e6f7f3' : '#f8fafc',
                          color: isSelected ? '#00a884' : '#475569',
                          fontSize: '0.84rem',
                          fontWeight: isSelected ? '800' : '600',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected ? '0 3px 10px rgba(0, 168, 132, 0.15)' : 'none'
                        }}
                      >
                        <span style={{
                          backgroundColor: isSelected ? '#00a884' : '#64748b',
                          color: '#ffffff',
                          fontSize: '0.7rem',
                          fontWeight: '800',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px'
                        }}>
                          {sub.code}
                        </span>
                        <span>{sub.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={20} color="#00a884" />
                        Class Attendance Roster — {currentSubObj?.name} ({currentSubObj?.code})
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                        Total Conducted Lectures: <strong>{currentSubObj?.totalLectures}</strong> • Division: <strong>Div {selectedDivision} (WINTER 2026)</strong> • Enrolled Students: <strong>{filteredFacultyStudents.length} / 65</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                      {/* Shorter Red Box Class Division Selection Dropdown as requested */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#ffffff',
                        border: '2px solid #ef4444',
                        borderRadius: '8px',
                        padding: '0.4rem 0.65rem',
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)'
                      }}>
                        <Users size={15} color="#dc2626" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#dc2626' }}>Class:</span>
                        <select
                          value={selectedDivision}
                          onChange={(e) => setSelectedDivision(e.target.value)}
                          style={{
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.84rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            maxWidth: '100px'
                          }}
                        >
                          {CLASS_DIVISIONS.map(div => (
                            <option key={div.id} value={div.id}>
                              Div {div.id}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date Selection Button / Input beside Class Dropdown as requested */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #00a884',
                        borderRadius: '8px',
                        padding: '0.4rem 0.65rem',
                        boxShadow: '0 2px 8px rgba(0, 168, 132, 0.12)'
                      }}>
                        <Calendar size={15} color="#00a884" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#00a884' }}>Date:</span>
                        <input
                          type="date"
                          value={attendanceDate}
                          onChange={(e) => setAttendanceDate(e.target.value)}
                          style={{
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            backgroundColor: 'transparent',
                            cursor: 'pointer'
                          }}
                        />
                      </div>

                      {/* Student Search Box */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.4rem 0.65rem' }}>
                        <Search size={14} color="#94a3b8" />
                        <input
                          type="text"
                          placeholder="Filter student..."
                          value={facultySearchTerm}
                          onChange={e => setFacultySearchTerm(e.target.value)}
                          style={{ border: 'none', outline: 'none', fontSize: '0.82rem', color: '#0f172a', width: '120px' }}
                        />
                      </div>

                      <button
                        onClick={() => {
                          const newOverrides = { ...attendanceOverrideMap };
                          currentRosterStudents.forEach(st => {
                            const key = `${selectedSubject}_${selectedDivision}_${attendanceDate}_${st.regId}`;
                            let newPresents = st.presents;
                            if (st.todayStatus !== 'PRESENT') newPresents = Math.min(st.totalLectures, newPresents + 1);
                            newOverrides[key] = {
                              presents: newPresents,
                              todayStatus: 'PRESENT'
                            };
                          });
                          setAttendanceOverrideMap(newOverrides);
                          showBanner(`🎉 All 65 students of Div ${selectedDivision} marked PRESENT for ${currentSubObj?.name} on ${attendanceDate}!`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          backgroundColor: '#00a884',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.45rem 0.85rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 3px 10px rgba(0, 168, 132, 0.25)'
                        }}
                      >
                        <CheckSquare size={15} />
                        <span>Mark All Present</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff', width: '50px', textAlign: 'center' }}>S.No.</th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'center', width: '150px' }}>
                            MARK PRESENT
                          </th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff' }}>STUDENT NAME</th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff' }}>REGISTRATION ID</th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'center' }}>CONDUCTED LECTURES</th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'center' }}>ATTENDED LECTURES</th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'center' }}>ATTENDANCE %</th>
                          <th style={{ ...styles.th, backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'center' }}>ACTION / ALERT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFacultyStudents.map((student, idx) => {
                          const isAtRisk = student.percentage < 75;
                          const isWarning = student.percentage >= 75 && student.percentage < 80;
                          const isChecked = student.todayStatus === 'PRESENT';

                          return (
                            <tr key={student.regId} style={{ ...styles.tr, backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                              <td style={{ ...styles.td, textAlign: 'center', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                              
                              {/* Present Attendance Checkbox Column */}
                              <td style={{ ...styles.td, textAlign: 'center' }}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleToggleStudentStatus(
                                      student.regId, 
                                      isChecked ? 'ABSENT' : 'PRESENT'
                                    )}
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      accentColor: '#00a884',
                                      cursor: 'pointer'
                                    }}
                                  />
                                  <span style={{
                                    fontSize: '0.76rem',
                                    fontWeight: '800',
                                    color: isChecked ? '#047857' : '#dc2626',
                                    backgroundColor: isChecked ? '#dcfce7' : '#fee2e2',
                                    padding: '0.2rem 0.55rem',
                                    borderRadius: '5px',
                                    border: `1px solid ${isChecked ? '#86efac' : '#fca5a5'}`
                                  }}>
                                    {isChecked ? '✓ Present' : '✕ Absent'}
                                  </span>
                                </label>
                              </td>

                              <td style={styles.td}>
                                <div>
                                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.9rem' }}>{student.name}</div>
                                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Section Div {student.section} • {student.rollNo}</div>
                                </div>
                              </td>
                              <td style={styles.tdId}>{student.regId}</td>
                              <td style={{ ...styles.td, textAlign: 'center', fontWeight: '700', color: '#0f172a' }}>{student.totalLectures}</td>
                              <td style={{ ...styles.td, textAlign: 'center', fontWeight: '800', color: '#00a884' }}>{student.presents}</td>
                              <td style={{ ...styles.td, textAlign: 'center' }}>
                                <span style={{
                                  fontSize: '0.85rem',
                                  fontWeight: '800',
                                  color: isAtRisk ? '#dc2626' : isWarning ? '#d97706' : '#047857',
                                  backgroundColor: isAtRisk ? '#fee2e2' : isWarning ? '#fef3c7' : '#dcfce7',
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: '6px',
                                  border: `1px solid ${isAtRisk ? '#fca5a5' : isWarning ? '#fde68a' : '#86efac'}`
                                }}>
                                  {student.percentage}%
                                </span>
                              </td>
                              <td style={{ ...styles.td, textAlign: 'center' }}>
                                {isAtRisk ? (
                                  <button
                                    onClick={() => showBanner(`⚠️ Warning alert notification sent to ${student.name} (${student.regId}) for low attendance (${student.percentage}%).`, 'error')}
                                    style={styles.sendWarningBtn}
                                  >
                                    <Send size={13} />
                                    <span>Alert Warning</span>
                                  </button>
                                ) : (
                                  <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: '700' }}>✓ Regular</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Save Attendance Button Footer as requested */}
                  <div style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: '#f8fafc',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                      📋 Marking Attendance: <strong>Div {selectedDivision}</strong> • Date: <strong>{attendanceDate}</strong> • Subject: <strong>{currentSubObj?.name} ({currentSubObj?.code})</strong>
                    </div>

                    <button
                      onClick={handleSaveClassAttendanceToDatabase}
                      style={{
                        backgroundColor: '#00a884',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.75rem 1.75rem',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 168, 132, 0.4)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Save size={18} />
                      <span>Save & Submit Class Attendance</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* STUDENT VIEW ONLY: COURSE COMPONENTS TABLE & CHARTS */
              <>
                <div style={{ marginTop: '1.75rem' }}>
                  <h3 style={styles.courseComponentsTitle}>Course Components</h3>
                  <div style={styles.tableCard}>
                    <table style={styles.cyberTable}>
                      <thead>
                        <tr>
                          <th style={{ ...styles.cyberTh, textAlign: 'center', width: '50px' }}>S.No.</th>
                          <th style={styles.cyberTh}>Course</th>
                          <th style={styles.cyberTh}>Course Component</th>
                          <th style={styles.cyberTh}>Course Variant</th>
                          <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Presents</th>
                          <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Special Attendance</th>
                          <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Lectures</th>
                          <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Attendance %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myAttendanceCourses
                          .filter(c => 
                            c.course.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.variant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.component.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((item, idx) => (
                            <tr key={item.sNo} style={{ ...styles.cyberTr, backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                              <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '600', color: '#475569' }}>{item.sNo}</td>
                              <td style={{ ...styles.cyberTd, fontWeight: '700', color: '#1e293b' }}>{item.course}</td>
                              <td style={{ ...styles.cyberTd, color: '#334155' }}>{item.component}</td>
                              <td style={{ ...styles.cyberTd, fontSize: '0.74rem', color: '#64748b', fontFamily: 'monospace' }}>{item.variant}</td>
                              <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700', color: '#0f172a' }}>{item.presents}</td>
                              <td style={{ ...styles.cyberTd, textAlign: 'center', color: '#64748b' }}>{item.specialAttendance}</td>
                              <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700', color: '#0f172a' }}>{item.lectures}</td>
                              <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: parseInt(item.percentage) < 50 ? '#dc2626' : parseInt(item.percentage) < 75 ? '#d97706' : '#047857' }}>
                                {item.percentage}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.5rem', marginTop: '1.75rem' }}>
                  <div style={styles.chartFieldset}>
                    <div style={styles.fieldsetLegend}>
                      <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span> Overall Attendance <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span>
                    </div>
                    
                    <div style={styles.pieBoxInner}>
                      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0284c7' }}>48.0%</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>139 / 290 Total Lectures Conducted</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
                        <svg width="200" height="180" viewBox="0 0 200 180">
                          <circle cx="100" cy="90" r="58" fill="none" stroke="#e2e8f0" strokeWidth="24" />
                          <circle
                            cx="100"
                            cy="90"
                            r="58"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="24"
                            strokeDasharray="189.75 364.42"
                            strokeDashoffset="0"
                            transform="rotate(-90 100 90)"
                          />
                          <circle
                            cx="100"
                            cy="90"
                            r="58"
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="24"
                            strokeDasharray="174.67 364.42"
                            strokeDashoffset="-189.75"
                            transform="rotate(-90 100 90)"
                          />
                          <g style={{ filter: 'drop-shadow(0px 1px 2px rgba(255, 255, 255, 0.4))' }}>
                            <text x="44" y="95" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">48.0%</text>
                            <text x="156" y="95" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">52.0%</text>
                          </g>
                        </svg>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#0f172a', fontWeight: '700' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                          <span>Present</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#0f172a', fontWeight: '700' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#06b6d4' }} />
                          <span>Absent</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.chartFieldset}>
                    <div style={styles.fieldsetLegend}>
                      <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span> Subject-wise Present vs Absent (Vertical Bar Graph) <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span>
                    </div>

                    <div style={styles.barGraphInner}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1e293b' }}>Subject Attendance Breakdown (Double Bar Graph)</span>
                        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>
                            <span style={{ width: '14px', height: '14px', backgroundColor: '#3b82f6', border: '1.5px solid #1e293b', borderRadius: '2px' }} />
                            <span>Present</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>
                            <span style={{
                              width: '14px',
                              height: '14px',
                              background: 'repeating-linear-gradient(45deg, #60a5fa, #60a5fa 3px, #ffffff 3px, #ffffff 6px)',
                              border: '1.5px solid #1e293b',
                              borderRadius: '2px'
                            }} />
                            <span>Absent</span>
                          </div>
                        </div>
                      </div>

                      {/* Vertical Double Bar Chart Container */}
                      <div style={{ position: 'relative', width: '100%', height: '260px', display: 'flex', borderBottom: '2px solid #1e293b', borderLeft: '2px solid #1e293b', paddingLeft: '35px', paddingBottom: '25px', paddingTop: '10px' }}>
                        {/* Y-Axis Ticks & Gridlines */}
                        <div style={{ position: 'absolute', left: 0, top: '10px', bottom: '25px', width: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem', fontWeight: '700', color: '#64748b', paddingRight: '6px' }}>
                          <span>50</span>
                          <span>40</span>
                          <span>30</span>
                          <span>20</span>
                          <span>10</span>
                          <span>0</span>
                        </div>

                        {/* Background Gridlines */}
                        <div style={{ position: 'absolute', left: '35px', right: 0, top: '10px', bottom: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 0 }}>
                          <div style={{ borderTop: '1px dashed #e2e8f0', width: '100%' }} />
                          <div style={{ borderTop: '1px dashed #e2e8f0', width: '100%' }} />
                          <div style={{ borderTop: '1px dashed #e2e8f0', width: '100%' }} />
                          <div style={{ borderTop: '1px dashed #e2e8f0', width: '100%' }} />
                          <div style={{ borderTop: '1px dashed #e2e8f0', width: '100%' }} />
                          <div style={{ borderTop: '1px solid #cbd5e1', width: '100%' }} />
                        </div>

                        {/* Vertical Bars Area */}
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                          {myAttendanceCourses.map((course) => {
                            const absents = course.lectures - course.presents;
                            const maxLectures = 50;
                            const presentHeightPct = Math.min(100, (course.presents / maxLectures) * 100);
                            const absentHeightPct = Math.min(100, (absents / maxLectures) * 100);

                            return (
                              <div key={course.sNo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                                {/* Double Vertical Bar Pair */}
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '100%' }}>
                                  {/* Present Bar (Solid Blue) */}
                                  <div
                                    title={`${course.sNo}. ${course.course}: ${course.presents} Presents`}
                                    style={{
                                      width: '15px',
                                      height: `${presentHeightPct}%`,
                                      backgroundColor: '#3b82f6',
                                      border: '1.5px solid #1e293b',
                                      borderBottom: 'none',
                                      borderRadius: '2px 2px 0 0',
                                      transition: 'height 0.3s ease',
                                      position: 'relative'
                                    }}
                                  >
                                    <span style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 800, color: '#1e293b' }}>
                                      {course.presents}
                                    </span>
                                  </div>

                                  {/* Absent Bar (Hatched Striped Pattern) */}
                                  <div
                                    title={`${course.sNo}. ${course.course}: ${absents} Absents`}
                                    style={{
                                      width: '15px',
                                      height: `${absentHeightPct}%`,
                                      background: 'repeating-linear-gradient(45deg, #60a5fa, #60a5fa 3px, #ffffff 3px, #ffffff 6px)',
                                      border: '1.5px solid #1e293b',
                                      borderBottom: 'none',
                                      borderRadius: '2px 2px 0 0',
                                      transition: 'height 0.3s ease',
                                      position: 'relative'
                                    }}
                                  >
                                    <span style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 800, color: '#dc2626' }}>
                                      {absents}
                                    </span>
                                  </div>
                                </div>

                                {/* X-Axis Category Label */}
                                <span style={{ position: 'absolute', bottom: '-22px', fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>
                                  S{course.sNo}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Course Legend Map below graph */}
                      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        {myAttendanceCourses.map((c) => (
                          <div key={c.sNo} style={{ fontSize: '0.74rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span style={{ fontWeight: 800, color: '#0369a1', backgroundColor: '#e0f2fe', padding: '0.1rem 0.35rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                              S{c.sNo}
                            </span>
                            <span style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {c.course} ({c.component})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: DAILY ATTENDANCE TRACKER VIEW                                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'tracker' && (
        <div style={styles.sectionContainer}>
          <div style={styles.controlCard}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={styles.controlLabel}>Course & Section:</span>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  style={styles.selectInput}
                >
                  <option value="CS-301 Sec A">CS-301 Data Structures (Sec A)</option>
                  <option value="CS-305 Sec B">CS-305 Database Systems (Sec B)</option>
                  <option value="PHY-102 Sec A">PHY-102 General Physics (Sec A)</option>
                  <option value="EE-201 Sec C">EE-201 Digital Circuits (Sec C)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={styles.controlLabel}>Lecture Date:</span>
                <select
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  style={styles.selectInput}
                >
                  <option value="Oct 08, 2026">Oct 08, 2026 (Today - Editable)</option>
                  <option value="Oct 07, 2026">Oct 07, 2026 (1 Day Ago - Editable)</option>
                  <option value="Oct 04, 2026">Oct 04, 2026 (🔒 Locked - Past 2 Days Window)</option>
                </select>
              </div>

              {selectedDate === 'Oct 04, 2026' ? (
                <div style={{
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fca5a5',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  🔒 Attendance Edit Locked (Past 2-Day Cutoff)
                </div>
              ) : (
                <button 
                  onClick={markAllPresent} 
                  style={styles.markAllBtn}
                  title="Mark all listed students as present"
                >
                  <CheckSquare size={15} />
                  <span>Mark All Present</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                🚫 Deletion Disabled for Attendance Logs (Audit Locked)
              </span>
              <button 
                onClick={selectedDate === 'Oct 04, 2026' ? () => showBanner('Attendance is locked (older than 2 days) and cannot be edited.', 'error') : handleSaveTracker} 
                style={{
                  ...styles.saveLedgerBtn,
                  ...(selectedDate === 'Oct 04, 2026' ? { backgroundColor: '#94a3b8', cursor: 'not-allowed' } : {})
                }}
              >
                <Save size={16} />
                <span>{selectedDate === 'Oct 04, 2026' ? '🔒 Locked (Read Only)' : savedSuccess ? 'Ledger Saved Successfully!' : 'Save Attendance Ledger'}</span>
              </button>
            </div>
          </div>

          <div style={styles.statGrid}>
            <div style={{ ...styles.statCard, backgroundColor: '#f0fdf4', borderColor: '#a7f3d0' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857' }}>PRESENT TODAY</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                {trackerStudents.filter(s => s.status === 'PRESENT').length} / {trackerStudents.length}
              </div>
            </div>

            <div style={{ ...styles.statCard, backgroundColor: '#fef3c7', borderColor: '#fde68a' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309' }}>LATE / TARDY</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                {trackerStudents.filter(s => s.status === 'LATE').length}
              </div>
            </div>

            <div style={{ ...styles.statCard, backgroundColor: '#fee2e2', borderColor: '#fca5a5' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b91c1c' }}>ABSENT TODAY</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                {trackerStudents.filter(s => s.status === 'ABSENT').length}
              </div>
            </div>

            <div style={{ ...styles.statCard, backgroundColor: '#e0f2fe', borderColor: '#93c5fd' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0369a1' }}>SESSION ATTENDANCE %</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((trackerStudents.filter(s => s.status === 'PRESENT').length / trackerStudents.length) * 100)}%
              </div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student Profile</th>
                  <th style={styles.th}>Registration ID</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Mark Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {trackerStudents
                  .filter(s => 
                    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    s.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(student => (
                    <tr key={student.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <span style={styles.studentName}>{student.name}</span>
                        </div>
                      </td>
                      <td style={styles.tdId}>{student.id}</td>
                      <td style={styles.tdDept}>{student.department}</td>
                      <td style={styles.td}>
                        <div style={styles.toggleGroup}>
                          <button
                            onClick={() => updateTrackerStatus(student.id, 'PRESENT')}
                            style={{
                              ...styles.toggleBtn,
                              ...(student.status === 'PRESENT' ? styles.togglePresentActive : {})
                            }}
                          >
                            <Check size={14} />
                            <span>PRESENT</span>
                          </button>

                          <button
                            onClick={() => updateTrackerStatus(student.id, 'LATE')}
                            style={{
                              ...styles.toggleBtn,
                              ...(student.status === 'LATE' ? styles.toggleLateActive : {})
                            }}
                          >
                            <Clock size={14} />
                            <span>LATE</span>
                          </button>

                          <button
                            onClick={() => updateTrackerStatus(student.id, 'ABSENT')}
                            style={{
                              ...styles.toggleBtn,
                              ...(student.status === 'ABSENT' ? styles.toggleAbsentActive : {})
                            }}
                          >
                            <XCircle size={14} />
                            <span>ABSENT</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ATTENDANCE SUMMARY LOGS VIEW                                       */}
      {/* ========================================================================= */}
      {activeSubTab === 'summary' && (
        <div style={styles.sectionContainer}>
          <div style={styles.alertBanner}>
            <AlertTriangle size={20} color="#dc2626" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#991b1b' }}>
                75% Mandatory Attendance Cutoff Rule Active
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7f1d1d' }}>
                Students below 75% total attendance are flagged for academic risk and advisory warning letters.
              </div>
            </div>
          </div>

          <div style={styles.controlCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Filter size={16} color="#64748b" />
              <span style={styles.controlLabel}>Department Filter:</span>
              <select
                value={selectedDeptFilter}
                onChange={e => setSelectedDeptFilter(e.target.value)}
                style={styles.selectInput}
              >
                <option value="all">All Academic Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics & EE">Physics & Electrical</option>
                <option value="Data Science">Data Science & AI</option>
              </select>
            </div>

            <button 
              onClick={() => alert('Exporting Attendance Logs Summary (CSV/Excel)...')} 
              style={styles.exportBtn}
            >
              <Download size={15} />
              <span>Export Attendance Summary</span>
            </button>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student Name</th>
                  <th style={styles.th}>ID & Dept</th>
                  <th style={styles.th}>Attended / Conducted</th>
                  <th style={styles.th}>Attendance Ratio</th>
                  <th style={styles.th}>Risk Level Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {summaryLogs
                  .filter(item => 
                    (selectedDeptFilter === 'all' || item.department === selectedDeptFilter) &&
                    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map(log => {
                    const isHighRisk = log.percentage < 75;
                    const isWarning = log.percentage >= 75 && log.percentage < 80;

                    return (
                      <tr key={log.id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{log.name}</div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{log.year} Year Cohort</div>
                        </td>
                        <td style={styles.td}>
                          <div style={{ fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>{log.id}</div>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{log.department}</div>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontWeight: 800, color: '#0f172a' }}>{log.attended}</span>
                          <span style={{ color: '#94a3b8' }}> / {log.total} lectures</span>
                        </td>
                        <td style={{ ...styles.td, width: '220px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isHighRisk ? '#dc2626' : '#047857' }}>
                              {log.percentage}%
                            </span>
                          </div>
                          <div style={styles.progressTrack}>
                            <div style={{
                              ...styles.progressBar,
                              width: `${log.percentage}%`,
                              backgroundColor: isHighRisk ? '#ef4444' : isWarning ? '#f59e0b' : '#00a884'
                            }} />
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.riskBadge,
                            backgroundColor: isHighRisk ? '#fee2e2' : isWarning ? '#fef3c7' : '#d1fae5',
                            color: isHighRisk ? '#dc2626' : isWarning ? '#d97706' : '#047857',
                            borderColor: isHighRisk ? '#fca5a5' : isWarning ? '#fde68a' : '#a7f3d0'
                          }}>
                            {isHighRisk ? 'HIGH RISK (<75%)' : isWarning ? 'WARNING ALERT' : 'GOOD ATTENDANCE'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {isHighRisk ? (
                            <button 
                              onClick={() => alert(`Warning notification sent to ${log.name} (${log.id})`)}
                              style={styles.sendWarningBtn}
                            >
                              <Send size={13} />
                              <span>Send Alert</span>
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>In Good Standing</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    padding: '1.75rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  topNavCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.5rem 1.75rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 0.25rem 0'
  },
  pageSubtitle: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: 0
  },
  subTabGroup: {
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: '#f1f5f9',
    padding: '0.35rem',
    borderRadius: '12px'
  },
  subTabBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    fontSize: '0.84rem',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  subTabBtnActive: {
    backgroundColor: '#ffffff',
    color: '#00a884',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  pendingBadge: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: '800',
    padding: '0.1rem 0.4rem',
    borderRadius: '9999px'
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  myAttendanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 18px rgba(0,0,0,0.03)'
  },
  myAttendanceHeading: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 1.25rem 0',
    display: 'inline-block',
    borderBottom: '3px solid #00a884',
    paddingBottom: '0.35rem'
  },
  studentInfoFieldset: {
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    position: 'relative',
    backgroundColor: '#ffffff'
  },
  fieldsetLegend: {
    position: 'absolute',
    top: '-12px',
    left: '20px',
    backgroundColor: '#ffffff',
    padding: '0 0.5rem',
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  studentInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem'
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem'
  },
  infoRow: {
    display: 'flex',
    gap: '0.5rem',
    fontSize: '0.85rem'
  },
  infoLabel: {
    color: '#64748b',
    fontWeight: '600'
  },
  infoVal: {
    color: '#0f172a',
    fontWeight: '700'
  },
  courseComponentsTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '0.85rem'
  },
  cyberTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  cyberTh: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: '0.85rem 1rem',
    fontSize: '0.78rem',
    fontWeight: '700',
    borderBottom: '1px solid #334155'
  },
  cyberTr: {
    borderBottom: '1px solid #e2e8f0'
  },
  cyberTd: {
    padding: '0.85rem 1rem',
    fontSize: '0.84rem'
  },
  chartFieldset: {
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '1.25rem',
    position: 'relative',
    backgroundColor: '#ffffff'
  },
  pieBoxInner: {
    paddingTop: '0.5rem'
  },
  barGraphInner: {
    paddingTop: '0.5rem'
  },
  barTrack: {
    height: '20px',
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
    display: 'flex',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  },
  controlCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '0.85rem 1.25rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  controlLabel: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#64748b'
  },
  selectInput: {
    padding: '0.45rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    fontSize: '0.84rem',
    fontWeight: '600',
    color: '#0f172a',
    backgroundColor: '#ffffff'
  },
  markAllBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.45rem 0.85rem',
    backgroundColor: '#e6f7f3',
    color: '#00a884',
    border: '1px solid #a7f3d0',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  saveLedgerBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9px',
    padding: '0.55rem 1.1rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 168, 132, 0.3)'
  },
  exportBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.45rem 0.85rem',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  statCard: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid'
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: '0.85rem 1.25rem',
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#64748b',
    borderBottom: '1px solid var(--border-color)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  tr: {
    borderBottom: '1px solid #f1f5f9'
  },
  td: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.88rem'
  },
  tdId: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569'
  },
  tdDept: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.82rem',
    color: '#64748b'
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  studentName: {
    fontWeight: '700',
    color: '#0f172a'
  },
  toggleGroup: {
    display: 'inline-flex',
    gap: '0.35rem',
    backgroundColor: '#f1f5f9',
    padding: '3px',
    borderRadius: '8px'
  },
  toggleBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.35rem 0.65rem',
    borderRadius: '6px',
    fontSize: '0.74rem',
    fontWeight: '700',
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  togglePresentActive: {
    backgroundColor: '#00a884',
    color: '#ffffff'
  },
  toggleLateActive: {
    backgroundColor: '#d97706',
    color: '#ffffff'
  },
  toggleAbsentActive: {
    backgroundColor: '#dc2626',
    color: '#ffffff'
  },
  alertBanner: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '12px',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem'
  },
  progressTrack: {
    height: '7px',
    backgroundColor: '#e2e8f0',
    borderRadius: '9999px',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.4s ease'
  },
  riskBadge: {
    display: 'inline-block',
    fontSize: '0.68rem',
    fontWeight: '800',
    padding: '0.2rem 0.55rem',
    borderRadius: '6px',
    border: '1px solid',
    letterSpacing: '0.04em'
  },
  sendWarningBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    padding: '0.3rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  leaveFilterBtn: {
    padding: '0.35rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    backgroundColor: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer'
  },
  leaveFilterBtnActive: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    borderColor: '#00a884'
  },
  submitLeaveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '99px',
    padding: '0.55rem 1.1rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 168, 132, 0.3)'
  },
  leaveCardsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  leaveCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
  },
  leaveCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  applicantName: {
    fontSize: '1.05rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  studentIdBadge: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: '0.72rem',
    fontWeight: '700',
    padding: '0.15rem 0.45rem',
    borderRadius: '6px'
  },
  statusBadge: {
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.2rem 0.65rem',
    borderRadius: '6px',
    border: '1px solid',
    letterSpacing: '0.04em'
  },
  leaveBodyRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    backgroundColor: '#f8fafc',
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    marginBottom: '0.85rem'
  },
  leaveMetaItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  metaLabel: {
    fontSize: '0.68rem',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '0.05em'
  },
  metaValue: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: '0.15rem'
  },
  reasonBox: {
    fontSize: '0.86rem',
    color: '#475569',
    marginBottom: '0.85rem',
    lineHeight: '1.45'
  },
  leaveFooterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid #f1f5f9'
  },
  attachmentLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#00a884',
    cursor: 'pointer'
  },
  approveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '7px',
    padding: '0.4rem 0.9rem',
    fontSize: '0.8rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  rejectBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    borderRadius: '7px',
    padding: '0.4rem 0.85rem',
    fontSize: '0.8rem',
    fontWeight: '700',
    cursor: 'pointer'
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
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  formInput: {
    padding: '0.6rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    color: '#0f172a',
    outline: 'none'
  },
  formSelect: {
    padding: '0.6rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    color: '#0f172a',
    outline: 'none',
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
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#475569',
    fontSize: '0.84rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  submitNoticeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.55rem 1.1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00a884',
    color: '#ffffff',
    fontSize: '0.84rem',
    fontWeight: '700',
    cursor: 'pointer'
  }
};
