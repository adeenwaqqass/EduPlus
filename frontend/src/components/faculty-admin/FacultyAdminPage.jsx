import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  FileText, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Megaphone, 
  Clock, 
  CheckSquare, 
  Award, 
  TrendingUp, 
  BookPlus, 
  UserCheck, 
  BellRing, 
  ChevronRight, 
  Save, 
  X, 
  FileSpreadsheet, 
  GraduationCap,
  Sparkles,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Layers,
  UserPlus
} from 'lucide-react';
import './FacultyAdmin.css';
import studentsDataJSON from '../../data/students.json';
import coursesDataJSON from '../../data/courses.json';
import facultiesDataJSON from '../../data/faculties.json';

export default function FacultyAdminPage({ currentUser, onAddNotice, searchTerm = '' }) {
  // Role Context: 'faculty' | 'admin'
  const [userRole, setUserRole] = useState(currentUser?.role === 'admin' ? 'admin' : 'faculty');

  // Navigation Tab Context
  // 'classes' | 'marks' | 'analytics' | 'students' | 'admin-allotment' | 'notifications'
  const [activeTab, setActiveTab] = useState('classes');

  // Success / Status Banner Message
  const [bannerMessage, setBannerMessage] = useState(null);

  const showBanner = (text, type = 'success') => {
    setBannerMessage({ text, type });
    setTimeout(() => setBannerMessage(null), 4000);
  };

  // ==========================================
  // INITIAL MOCK DATA & STATES
  // ==========================================

  // 1. Classes List (Faculty & Admin)
  const [classesList, setClassesList] = useState([
    {
      id: 'CLS-401',
      title: 'Advanced Web & Cloud Engineering',
      code: 'CS-401',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 45,
      facultyAssigned: 'Prof. Sarah Jenkins',
      days: ['Mon', 'Wed', 'Fri'],
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      room: 'Lab 4B',
      department: 'Computer Science & Engineering'
    },
    {
      id: 'CLS-402',
      title: 'Machine Learning & Neural Networks',
      code: 'CS-402',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 42,
      facultyAssigned: 'Dr. Arthur Pendelton',
      days: ['Tue', 'Thu'],
      startTime: '01:30 PM',
      endTime: '03:00 PM',
      room: 'AI Center - Room 302',
      department: 'Computer Science & Engineering'
    },
    {
      id: 'CLS-301',
      title: 'Database Management Systems',
      code: 'CS-301',
      yearCohort: '3rd Year',
      section: 'Class B',
      strength: 48,
      facultyAssigned: 'Dr. Rachel Green',
      days: ['Mon', 'Wed'],
      startTime: '11:45 AM',
      endTime: '01:15 PM',
      room: 'Hall 201',
      department: 'Computer Science & Engineering'
    }
  ]);

  // 2. Master Student Data Roster (With Attendance %, Internal Marks, External Marks, Backlogs)
  const initialStudentsData = (studentsDataJSON || []).map((st, idx) => {
    const totalLectures = 40;
    const attPct = st.attendancePercentage || 85.0;
    const attended = Math.round((attPct / 100.0) * totalLectures);
    const cgpa = st.cgpa || 7.5;
    const internalScore = Math.round((cgpa / 10.0) * 36);
    const externalScore = Math.round((cgpa / 10.0) * 54);

    return {
      id: st.registrationNumber || st.id,
      rollNo: st.registrationNumber || `COMP-A-${(idx + 1).toString().padStart(2, '0')}`,
      name: st.name,
      yearCohort: 'B.Tech / 4th Year',
      section: `Class ${st.classSection || 'A'}`,
      attendancePct: attPct,
      totalLectures,
      attendedLectures: attended,
      internalScore,
      externalScore,
      backlogs: attPct < 70 ? ['CS702 Cloud Computing'] : [],
      department: st.branch || 'Computer Engineering'
    };
  });

  const [studentsData, setStudentsData] = useState(initialStudentsData);

  // ==========================================
  // MODAL STATES
  // ==========================================
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showMarkAttendanceModal, setShowMarkAttendanceModal] = useState(false);
  const [activeClassForAttendance, setActiveClassForAttendance] = useState(null);
  const [attendanceRoster, setAttendanceRoster] = useState({});
  const [showStudentDossierModal, setShowStudentDossierModal] = useState(false);
  const [selectedDossierStudent, setSelectedDossierStudent] = useState(null);

  // New Class Form State
  const [newClassForm, setNewClassForm] = useState({
    title: '',
    code: '',
    yearCohort: '4th Year / Final',
    section: 'Class A',
    strength: 45,
    days: ['Mon', 'Wed'],
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    room: 'Lab 4A'
  });

  // New Notification Form State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'academic',
    priority: 'important',
    targetAudience: '4th Year / Final - Class A',
    content: '',
    attachment: ''
  });

  // Admin Allotment Form States
  const [subjectAllotmentForm, setSubjectAllotmentForm] = useState({
    subjectTitle: '',
    subjectCode: '',
    yearCohort: '4th Year / Final',
    section: 'Class A',
    facultyName: 'Prof. Sarah Jenkins'
  });

  const [studentBacklogForm, setStudentBacklogForm] = useState({
    studentId: 'STU-102',
    backlogSubject: 'CS-201 Data Structures & Algorithms'
  });

  // Analytics Filter State
  const [analyticsStudentId, setAnalyticsStudentId] = useState('ALL');

  // ==========================================
  // HELPER RULES ENGINE
  // ==========================================

  // Determine Attendance Qualification Status (Threshold: >= 75%)
  const isAttendanceQualified = (pct) => pct >= 75.0;

  // Determine Internal Score Qualification Status (Threshold: >= 16/40 = 40%)
  const isInternalQualified = (score) => score >= 16;

  // Determine External Exam Eligibility (Requires both Attendance >= 75% AND Internal >= 16)
  const getExternalExamEligibility = (student) => {
    const attendOk = isAttendanceQualified(student.attendancePct);
    const internalOk = isInternalQualified(student.internalScore);

    if (attendOk && internalOk) {
      return { eligible: true, statusText: 'Qualified for External Exam', code: 'qualified' };
    }
    if (!attendOk && !internalOk) {
      return { eligible: false, statusText: 'Detained & Internal Unqualified', code: 'detained-both', reason: `Attendance (${student.attendancePct}%) < 75% AND Internal Score (${student.internalScore}/40) < 16/40` };
    }
    if (!attendOk) {
      return { eligible: false, statusText: 'Detained from External Exam', code: 'detained-attendance', reason: `Attendance (${student.attendancePct}%) is below mandatory 75% requirement` };
    }
    return { eligible: false, statusText: 'Not Qualified (Internal Failure)', code: 'unqualified-internal', reason: `Internal Score (${student.internalScore}/40) is below passing cutoff (16/40)` };
  };

  // ==========================================
  // HANDLERS
  // ==========================================

  // Create Class Handler
  const handleCreateClassSubmit = (e) => {
    e.preventDefault();
    if (!newClassForm.title || !newClassForm.code) return;

    const createdClass = {
      id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      title: newClassForm.title,
      code: newClassForm.code,
      yearCohort: newClassForm.yearCohort,
      section: newClassForm.section,
      strength: parseInt(newClassForm.strength) || 40,
      facultyAssigned: userRole === 'faculty' ? 'Prof. Sarah Jenkins' : 'Assigned Faculty',
      days: newClassForm.days,
      startTime: newClassForm.startTime,
      endTime: newClassForm.endTime,
      room: newClassForm.room,
      department: 'Computer Science & Engineering'
    };

    setClassesList([createdClass, ...classesList]);
    setShowCreateClassModal(false);
    setNewClassForm({
      title: '',
      code: '',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 45,
      days: ['Mon', 'Wed'],
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      room: 'Lab 4A'
    });
    showBanner(`Successfully created class "${createdClass.code} - ${createdClass.title}" for ${createdClass.yearCohort} (${createdClass.section}).`);
  };

  // Launch Attendance Marking Roster
  const handleOpenAttendanceModal = (cls) => {
    setActiveClassForAttendance(cls);
    // Initialize roster state for students in this cohort
    const rosterInit = {};
    studentsData.forEach(s => {
      rosterInit[s.id] = 'present'; // default present
    });
    setAttendanceRoster(rosterInit);
    setShowMarkAttendanceModal(true);
  };

  // Toggle single student attendance in roster modal
  const handleToggleAttendance = (studentId, status) => {
    setAttendanceRoster(prev => ({ ...prev, [studentId]: status }));
  };

  // Bulk set attendance roster
  const handleBulkAttendance = (status) => {
    const updated = {};
    studentsData.forEach(s => {
      updated[s.id] = status;
    });
    setAttendanceRoster(updated);
  };

  // Save Attendance Session
  const handleSaveAttendanceSubmit = (e) => {
    e.preventDefault();
    if (!activeClassForAttendance) return;

    // Update students data attendance stats
    setStudentsData(prev => prev.map(student => {
      const status = attendanceRoster[student.id] || 'present';
      const isAttended = status === 'present' || status === 'late';
      const newAttended = isAttended ? student.attendedLectures + 1 : student.attendedLectures;
      const newTotal = student.totalLectures + 1;
      const newPct = parseFloat(((newAttended / newTotal) * 100).toFixed(1));

      return {
        ...student,
        attendedLectures: newAttended,
        totalLectures: newTotal,
        attendancePct: newPct
      };
    }));

    setShowMarkAttendanceModal(false);
    showBanner(`Attendance recorded for class ${activeClassForAttendance.code}! Student attendance scores recalculated.`);
  };

  // Handle Internal / External Marks Input Edit
  const handleMarkChange = (studentId, field, value) => {
    const numVal = parseInt(value) || 0;
    setStudentsData(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          [field]: numVal
        };
      }
      return s;
    }));
  };

  // Handle Create Notification Broadcast
  const handleCreateNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;

    const newNotice = {
      id: Date.now(),
      title: noticeForm.title,
      category: noticeForm.category,
      priority: noticeForm.priority,
      content: `${noticeForm.content} (Target: ${noticeForm.targetAudience})`,
      author: userRole === 'faculty' ? 'Prof. Sarah Jenkins (Faculty)' : 'Office of Academic Registrar (Admin)',
      date: 'Just now',
      isPinned: noticeForm.priority === 'critical',
      attachment: noticeForm.attachment || null
    };

    if (onAddNotice) {
      onAddNotice(newNotice);
    }
    showBanner(`Notification "${newNotice.title}" published and broadcasted to ${noticeForm.targetAudience}!`);
    setNoticeForm({
      title: '',
      category: 'academic',
      priority: 'important',
      targetAudience: '4th Year / Final - Class A',
      content: '',
      attachment: ''
    });
  };

  // Handle Admin Subject Allotment
  const handleSubjectAllotmentSubmit = (e) => {
    e.preventDefault();
    if (!subjectAllotmentForm.subjectTitle || !subjectAllotmentForm.subjectCode) return;

    const newClass = {
      id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      title: subjectAllotmentForm.subjectTitle,
      code: subjectAllotmentForm.subjectCode,
      yearCohort: subjectAllotmentForm.yearCohort,
      section: subjectAllotmentForm.section,
      strength: 44,
      facultyAssigned: subjectAllotmentForm.facultyName,
      days: ['Tue', 'Thu'],
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      room: 'Room 104',
      department: 'Computer Science'
    };

    setClassesList([newClass, ...classesList]);
    showBanner(`[ADMIN] Allotted subject ${subjectAllotmentForm.subjectCode} to ${subjectAllotmentForm.yearCohort} (${subjectAllotmentForm.section}) assigned to ${subjectAllotmentForm.facultyName}`);
    setSubjectAllotmentForm({
      subjectTitle: '',
      subjectCode: '',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      facultyName: 'Prof. Sarah Jenkins'
    });
  };

  // Handle Admin Student Backlog Assignment
  const handleAssignBacklogSubmit = (e) => {
    e.preventDefault();
    const targetStudent = studentsData.find(s => s.id === studentBacklogForm.studentId);
    if (!targetStudent) return;

    setStudentsData(prev => prev.map(s => {
      if (s.id === studentBacklogForm.studentId) {
        if (!s.backlogs.includes(studentBacklogForm.backlogSubject)) {
          return {
            ...s,
            backlogs: [...s.backlogs, studentBacklogForm.backlogSubject]
          };
        }
      }
      return s;
    }));

    showBanner(`[ADMIN] Added backlog subject "${studentBacklogForm.backlogSubject}" to student ${targetStudent.name} (${targetStudent.rollNo})`);
  };

  // Filtered Students Roster
  const filteredStudents = studentsData.filter(s => 
    s.name.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    s.rollNo.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    s.yearCohort.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    s.section.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="faculty-admin-container">
      {/* Top Banner Message Notification */}
      {bannerMessage && (
        <div 
          style={{
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
          }}
        >
          <CheckCircle2 size={18} />
          <span>{bannerMessage.text}</span>
        </div>
      )}

      {/* Header Card with Workspace Title & Role Switcher */}
      <div className="fa-header-card">
        <div className="fa-title-group">
          <h2>
            {userRole === 'faculty' ? (
              <>
                <BookOpen size={24} color="#00a884" />
                <span>Faculty Management & Teaching Workspace</span>
              </>
            ) : (
              <>
                <ShieldCheck size={24} color="#6366f1" />
                <span>Academic Registrar & Admin Control Portal</span>
              </>
            )}
          </h2>
          <p>
            {userRole === 'faculty' 
              ? 'Log attendance, manage classes, upload internal assessment scores, and monitor student eligibility analytics.'
              : 'Allot subjects, register class curricula, upload external university results, allocate backlogs, and broadcast campus notices.'
            }
          </p>
        </div>

        {/* Role Toggle Button Switcher */}
        <div className="role-switcher-box">
          <button
            type="button"
            className={`role-btn ${userRole === 'faculty' ? 'active-faculty' : ''}`}
            onClick={() => setUserRole('faculty')}
          >
            <UserCheck size={16} />
            <span>Faculty Mode (Prof. Sarah)</span>
          </button>
          <button
            type="button"
            className={`role-btn ${userRole === 'admin' ? 'active-admin' : ''}`}
            onClick={() => setUserRole('admin')}
          >
            <ShieldCheck size={16} />
            <span>Admin Mode (Registrar)</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Dashboard Bar */}
      <div className="fa-kpi-grid">
        <div className="fa-kpi-card">
          <div className="fa-kpi-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div className="fa-kpi-val">{classesList.length}</div>
            <div className="fa-kpi-lbl">Active Classes</div>
          </div>
        </div>

        <div className="fa-kpi-card">
          <div className="fa-kpi-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
            <Users size={22} />
          </div>
          <div>
            <div className="fa-kpi-val">{studentsData.length}</div>
            <div className="fa-kpi-lbl">Enrolled Students</div>
          </div>
        </div>

        <div className="fa-kpi-card">
          <div className="fa-kpi-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <div className="fa-kpi-val">
              {studentsData.filter(s => !isAttendanceQualified(s.attendancePct)).length}
            </div>
            <div className="fa-kpi-lbl">Detained Students (&lt;75%)</div>
          </div>
        </div>

        <div className="fa-kpi-card">
          <div className="fa-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#9333ea' }}>
            <FileSpreadsheet size={22} />
          </div>
          <div>
            <div className="fa-kpi-val">
              {studentsData.filter(s => s.backlogs.length > 0).length}
            </div>
            <div className="fa-kpi-lbl">Students with Backlogs</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="fa-tabs-bar">
        <button
          className={`fa-tab-btn ${activeTab === 'classes' ? (userRole === 'admin' ? 'admin-tab active' : 'active') : ''}`}
          onClick={() => setActiveTab('classes')}
        >
          <CalendarCheck size={18} />
          <span>Classes & Attendance Schedule</span>
        </button>

        <button
          className={`fa-tab-btn ${activeTab === 'marks' ? (userRole === 'admin' ? 'admin-tab active' : 'active') : ''}`}
          onClick={() => setActiveTab('marks')}
        >
          <FileText size={18} />
          <span>Marks & Assessments</span>
          {userRole === 'admin' && <span className="admin-badge-tag">EXTERNAL</span>}
        </button>

        <button
          className={`fa-tab-btn ${activeTab === 'analytics' ? (userRole === 'admin' ? 'admin-tab active' : 'active') : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={18} />
          <span>Analytics & Exam Eligibility</span>
        </button>

        <button
          className={`fa-tab-btn ${activeTab === 'students' ? (userRole === 'admin' ? 'admin-tab active' : 'active') : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <Users size={18} />
          <span>Student Master Records</span>
        </button>

        {userRole === 'admin' && (
          <button
            className={`fa-tab-btn admin-tab ${activeTab === 'admin-allotment' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin-allotment')}
          >
            <Layers size={18} />
            <span>Subject Allotment & Backlogs</span>
            <span className="admin-badge-tag">ADMIN ONLY</span>
          </button>
        )}

        <button
          className={`fa-tab-btn ${activeTab === 'notifications' ? (userRole === 'admin' ? 'admin-tab active' : 'active') : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Megaphone size={18} />
          <span>Create Notifications</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CLASSES & ATTENDANCE SCHEDULE */}
      {/* ========================================================================= */}
      {activeTab === 'classes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Action Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                Active Class Schedules & Roster
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Assigned classes for Year 4th / Final & other cohorts. Click "Mark Attendance" to launch live student roster.
              </p>
            </div>
            {userRole === 'faculty' && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateClassModal(true)}
              >
                <Plus size={16} />
                Create New Class
              </button>
            )}
          </div>

          {/* Classes Cards Grid */}
          <div className="classes-grid">
            {classesList.map((cls) => (
              <div key={cls.id} className="class-card">
                <div>
                  <div className="class-header">
                    <span className="class-code">{cls.code}</span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#059669', backgroundColor: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                      {cls.yearCohort}
                    </span>
                  </div>
                  <h4 className="class-title">{cls.title}</h4>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                    Section: <span style={{ color: '#0f172a' }}>{cls.section}</span> • Strength: <span style={{ color: '#0f172a' }}>{cls.strength} Students</span>
                  </div>
                  <div className="class-meta-row">
                    <div className="time-pill">
                      <Clock size={13} />
                      <span>{cls.startTime} - {cls.endTime}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b' }}>
                      📍 {cls.room}
                    </div>
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CalendarCheck size={14} color="#00a884" />
                    <span>Days: <strong>{cls.days.join(', ')}</strong></span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Faculty: <strong>{cls.facultyAssigned}</strong>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                  onClick={() => handleOpenAttendanceModal(cls)}
                >
                  <CheckSquare size={16} />
                  Mark Session Attendance
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MARKS & ASSESSMENTS */}
      {/* ========================================================================= */}
      {activeTab === 'marks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  {userRole === 'faculty' ? 'Faculty Internal Exam & Assessment Scores' : 'Admin External University Exam Results'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  {userRole === 'faculty' 
                    ? 'Faculty can enter and edit Internal Exam, Quiz, & Assignment marks (Max 40 marks). Editable within 1 week of submission. Deletion disabled.' 
                    : 'Admin/HOD can upload and edit External University Final Exam Scores (Max 60 marks) and Internal scores. Editable within 1 week. Deletion disabled.'
                  }
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
                  ⏱️ 1-Week Edit Window • 🚫 Marks Deletion Disabled (Audit Policy)
                </span>
                <button 
                  className="btn btn-secondary"
                  onClick={() => showBanner(`Marks database saved and synchronized!`)}
                >
                  <Save size={16} />
                  Save & Publish Marks
                </button>
              </div>
            </div>

            {/* Marks Table */}
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student ID / Roll No</th>
                    <th>Student Name</th>
                    <th>Cohort / Section</th>
                    <th>Attendance %</th>
                    <th>
                      Internal Marks (40)
                      {userRole === 'faculty' && <span style={{ color: '#00a884', marginLeft: '4px' }}>(Editable)</span>}
                    </th>
                    <th>
                      External Score (60)
                      {userRole === 'admin' && <span style={{ color: '#6366f1', marginLeft: '4px' }}>(Admin Editable)</span>}
                    </th>
                    <th>Internal Status</th>
                    <th>External Exam Qualification</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st) => {
                    const elig = getExternalExamEligibility(st);
                    const internalOk = isInternalQualified(st.internalScore);

                    return (
                      <tr key={st.id}>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{st.rollNo}</td>
                        <td style={{ fontWeight: 600, color: '#334155' }}>{st.name}</td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{st.yearCohort} ({st.section})</td>
                        <td>
                          <span className={`status-pill ${isAttendanceQualified(st.attendancePct) ? 'qualified' : 'detained'}`}>
                            {st.attendancePct}%
                          </span>
                        </td>

                        {/* Internal Score Cell */}
                        <td>
                          {userRole === 'faculty' ? (
                            <input
                              type="number"
                              min="0"
                              max="40"
                              className="marks-input"
                              value={st.internalScore}
                              onChange={(e) => handleMarkChange(st.id, 'internalScore', e.target.value)}
                            />
                          ) : (
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{st.internalScore} / 40</span>
                          )}
                        </td>

                        {/* External Score Cell */}
                        <td>
                          {userRole === 'admin' ? (
                            <input
                              type="number"
                              min="0"
                              max="60"
                              className="marks-input"
                              style={{ borderColor: '#6366f1' }}
                              value={st.externalScore}
                              onChange={(e) => handleMarkChange(st.id, 'externalScore', e.target.value)}
                            />
                          ) : (
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{st.externalScore} / 60</span>
                          )}
                        </td>

                        {/* Internal Qualification Status */}
                        <td>
                          <span className={`status-pill ${internalOk ? 'qualified' : 'unqualified'}`}>
                            {internalOk ? 'Passed (>=16)' : 'Failed (<16)'}
                          </span>
                        </td>

                        {/* External Qualification Status */}
                        <td>
                          <span className={`status-pill ${elig.eligible ? 'qualified' : 'detained'}`} title={elig.reason || ''}>
                            {elig.eligible ? 'Qualified' : elig.statusText}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ANALYTICS & EXAM ELIGIBILITY */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Analytics Selector Header */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Academic & Exam Eligibility Analytics Engine
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                  Analyze overall class pass/fail metrics, detainment aspects, or drill down into a specific student's eligibility dossier.
                </p>
              </div>

              {/* Student Filter Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>
                  Select View Target:
                </label>
                <select
                  className="select-input"
                  style={{ fontWeight: 700, width: '240px' }}
                  value={analyticsStudentId}
                  onChange={(e) => setAnalyticsStudentId(e.target.value)}
                >
                  <option value="ALL">📊 Whole Class Performance</option>
                  {studentsData.map(st => (
                    <option key={st.id} value={st.id}>
                      👤 {st.name} ({st.rollNo})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* VIEW A: WHOLE CLASS ANALYTICS */}
          {analyticsStudentId === 'ALL' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {/* Attendance Qualification Chart Box */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={18} color="#00a884" />
                  Attendance Qualification Breakdown
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span>Qualified for External Exam (&ge; 75%)</span>
                      <span style={{ color: '#059669' }}>
                        {studentsData.filter(s => isAttendanceQualified(s.attendancePct)).length} / {studentsData.length} Students
                      </span>
                    </div>
                    <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${(studentsData.filter(s => isAttendanceQualified(s.attendancePct)).length / studentsData.length) * 100}%`,
                          height: '100%',
                          backgroundColor: '#10b981'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span style={{ color: '#dc2626' }}>Detained from External Exam (&lt; 75%)</span>
                      <span style={{ color: '#dc2626' }}>
                        {studentsData.filter(s => !isAttendanceQualified(s.attendancePct)).length} / {studentsData.length} Students
                      </span>
                    </div>
                    <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${(studentsData.filter(s => !isAttendanceQualified(s.attendancePct)).length / studentsData.length) * 100}%`,
                          height: '100%',
                          backgroundColor: '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Assessment Pass / Fail Box */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} color="#6366f1" />
                  Internal Assessment Qualification
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span>Passed Internal Cutoff (&ge; 16/40)</span>
                      <span style={{ color: '#059669' }}>
                        {studentsData.filter(s => isInternalQualified(s.internalScore)).length} / {studentsData.length} Students
                      </span>
                    </div>
                    <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${(studentsData.filter(s => isInternalQualified(s.internalScore)).length / studentsData.length) * 100}%`,
                          height: '100%',
                          backgroundColor: '#6366f1'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span style={{ color: '#c2410c' }}>Unqualified Internal (&lt; 16/40)</span>
                      <span style={{ color: '#c2410c' }}>
                        {studentsData.filter(s => !isInternalQualified(s.internalScore)).length} / {studentsData.length} Students
                      </span>
                    </div>
                    <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${(studentsData.filter(s => !isInternalQualified(s.internalScore)).length / studentsData.length) * 100}%`,
                          height: '100%',
                          backgroundColor: '#f97316'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW B: SPECIFIC STUDENT ANALYTICS DRILLDOWN */
            (() => {
              const selectedSt = studentsData.find(s => s.id === analyticsStudentId);
              if (!selectedSt) return null;
              const elig = getExternalExamEligibility(selectedSt);

              return (
                <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {selectedSt.name}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                        Roll No: <strong>{selectedSt.rollNo}</strong> • Cohort: <strong>{selectedSt.yearCohort} ({selectedSt.section})</strong>
                      </div>
                    </div>
                    <span className={`status-pill ${elig.eligible ? 'qualified' : 'detained'}`} style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                      {elig.statusText}
                    </span>
                  </div>

                  {/* Detailed Aspects Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {/* Attendance Aspect */}
                    <div style={{ backgroundColor: isAttendanceQualified(selectedSt.attendancePct) ? '#f0fdf4' : '#fef2f2', padding: '1.25rem', borderRadius: '12px', border: `1px solid ${isAttendanceQualified(selectedSt.attendancePct) ? '#bbf7d0' : '#fecaca'}` }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isAttendanceQualified(selectedSt.attendancePct) ? '#166534' : '#991b1b' }}>
                        ATTENDANCE ASPECT
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0.3rem 0' }}>
                        {selectedSt.attendancePct}%
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                        Lectures Attended: {selectedSt.attendedLectures} / {selectedSt.totalLectures}
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '0.5rem', color: isAttendanceQualified(selectedSt.attendancePct) ? '#059669' : '#dc2626' }}>
                        {isAttendanceQualified(selectedSt.attendancePct) ? '✓ Meets mandatory 75% rule' : '✗ Detained from External Exam (<75%)'}
                      </div>
                    </div>

                    {/* Internal Score Aspect */}
                    <div style={{ backgroundColor: isInternalQualified(selectedSt.internalScore) ? '#f0fdf4' : '#fff7ed', padding: '1.25rem', borderRadius: '12px', border: `1px solid ${isInternalQualified(selectedSt.internalScore) ? '#bbf7d0' : '#fed7aa'}` }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isInternalQualified(selectedSt.internalScore) ? '#166534' : '#9a3412' }}>
                        INTERNAL MARKS ASPECT
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0.3rem 0' }}>
                        {selectedSt.internalScore} / 40
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                        Required Cutoff: 16 / 40 (40%)
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '0.5rem', color: isInternalQualified(selectedSt.internalScore) ? '#059669' : '#ea580c' }}>
                        {isInternalQualified(selectedSt.internalScore) ? '✓ Passed Internal Evaluation' : '✗ Failed Internal Criteria (<16)'}
                      </div>
                    </div>

                    {/* Backlogs Aspect */}
                    <div style={{ backgroundColor: selectedSt.backlogs.length === 0 ? '#f0fdf4' : '#faf5ff', padding: '1.25rem', borderRadius: '12px', border: `1px solid ${selectedSt.backlogs.length === 0 ? '#bbf7d0' : '#e9d5ff'}` }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: selectedSt.backlogs.length === 0 ? '#166534' : '#6b21a8' }}>
                        BACKLOGS & RE-EXAMS
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0.3rem 0' }}>
                        {selectedSt.backlogs.length} Backlogs
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                        {selectedSt.backlogs.length > 0 ? selectedSt.backlogs.join(', ') : 'No Active Backlogs'}
                      </div>
                    </div>
                  </div>

                  {/* Explicit Qualification Decision Reason Box */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                      📋 Final External Exam Qualification Decision & Reason Summary
                    </div>
                    {elig.eligible ? (
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#15803d', fontWeight: 600 }}>
                        Student has satisfied both mandatory attendance (&ge; 75%) and internal score (&ge; 40%) requirements for CS-401 and is fully qualified to sit for the University External Final Examination.
                      </p>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#b91c1c', fontWeight: 600 }}>
                        {elig.reason}
                      </p>
                    )}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: STUDENT MASTER DATA */}
      {/* ========================================================================= */}
      {activeTab === 'students' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
            Complete Student Master Roster (Attendance & Marks Dossier)
          </h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Cohort / Class</th>
                  <th>Attendance %</th>
                  <th>Internal Marks (40)</th>
                  <th>External Score (60)</th>
                  <th>Active Backlogs</th>
                  <th>Exam Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st) => {
                  const elig = getExternalExamEligibility(st);

                  return (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{st.rollNo}</td>
                      <td style={{ fontWeight: 600, color: '#334155' }}>{st.name}</td>
                      <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{st.yearCohort} ({st.section})</td>
                      <td>
                        <span className={`status-pill ${isAttendanceQualified(st.attendancePct) ? 'qualified' : 'detained'}`}>
                          {st.attendancePct}%
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{st.internalScore} / 40</td>
                      <td style={{ fontWeight: 700 }}>{st.externalScore} / 60</td>
                      <td>
                        {st.backlogs.length > 0 ? (
                          <span className="status-pill backlog">{st.backlogs.length} Backlogs</span>
                        ) : (
                          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Clean Record</span>
                        )}
                      </td>
                      <td>
                        <span className={`status-pill ${elig.eligible ? 'qualified' : 'detained'}`}>
                          {elig.eligible ? 'Qualified' : elig.statusText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ADMIN ALLOTMENT & BACKLOG ENGINE (ADMIN ONLY) */}
      {/* ========================================================================= */}
      {activeTab === 'admin-allotment' && userRole === 'admin' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {/* Form 1: Subject Allotment to Class */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#6366f1" />
              Allot Subject to Class & Assign Faculty
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Admin feature to register course subjects for a class section and assign lead educator.
            </p>

            <form onSubmit={handleSubjectAllotmentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Subject Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Operating Systems"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={subjectAllotmentForm.subjectTitle}
                  onChange={(e) => setSubjectAllotmentForm({ ...subjectAllotmentForm, subjectTitle: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Subject Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS-403"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={subjectAllotmentForm.subjectCode}
                  onChange={(e) => setSubjectAllotmentForm({ ...subjectAllotmentForm, subjectCode: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Target Cohort & Class</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={`${subjectAllotmentForm.yearCohort}|${subjectAllotmentForm.section}`}
                  onChange={(e) => {
                    const [y, s] = e.target.value.split('|');
                    setSubjectAllotmentForm({ ...subjectAllotmentForm, yearCohort: y, section: s });
                  }}
                >
                  <option value="4th Year / Final|Class A">4th Year / Final - Class A</option>
                  <option value="4th Year / Final|Class B">4th Year / Final - Class B</option>
                  <option value="3rd Year|Class A">3rd Year - Class A</option>
                  <option value="3rd Year|Class B">3rd Year - Class B</option>
                </select>
              </div>

              <div>
                <label className="form-label">Assign Faculty Member</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={subjectAllotmentForm.facultyName}
                  onChange={(e) => setSubjectAllotmentForm({ ...subjectAllotmentForm, facultyName: e.target.value })}
                >
                  <option value="Prof. Sarah Jenkins">Prof. Sarah Jenkins (Computer Science)</option>
                  <option value="Dr. Arthur Pendelton">Dr. Arthur Pendelton (AI & ML)</option>
                  <option value="Dr. Rachel Green">Dr. Rachel Green (Data Systems)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#6366f1', borderColor: '#4f46e5' }}>
                <Plus size={16} />
                Allot Subject to Class
              </button>
            </form>
          </div>

          {/* Form 2: Assign Student Backlog Subject */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} color="#9333ea" />
              Assign Backlog Subject to Specific Student
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Admin can add a specific backlog or repeat course to a student's official registered record.
            </p>

            <form onSubmit={handleAssignBacklogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Select Student</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={studentBacklogForm.studentId}
                  onChange={(e) => setStudentBacklogForm({ ...studentBacklogForm, studentId: e.target.value })}
                >
                  {studentsData.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.rollNo}) - {st.yearCohort} ({st.section})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Backlog Subject Name & Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS-201 Data Structures (Winter Backlog)"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={studentBacklogForm.backlogSubject}
                  onChange={(e) => setStudentBacklogForm({ ...studentBacklogForm, backlogSubject: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#9333ea', borderColor: '#7e22ce' }}>
                <Plus size={16} />
                Add Backlog to Student Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: CREATE NOTIFICATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'notifications' && (
        <div className="card" style={{ padding: '1.75rem', maxWidth: '680px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Megaphone size={20} color="#00a884" />
            Create & Broadcast Official Notification
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Broadcast announcements to specific classes, at-risk low attendance students, or the whole campus.
          </p>

          <form onSubmit={handleCreateNoticeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="form-label">Notification Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Critical Attendance Advisory for 4th Year Class A"
                className="text-input"
                style={{ width: '100%' }}
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Category</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={noticeForm.category}
                  onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                >
                  <option value="academic">Academic & Classes</option>
                  <option value="exam">Examination & Scores</option>
                  <option value="alert">Attendance Warning / Alert</option>
                  <option value="general">General Campus Notice</option>
                </select>
              </div>

              <div>
                <label className="form-label">Priority Level</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={noticeForm.priority}
                  onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                >
                  <option value="normal">Normal Priority</option>
                  <option value="important">Important Priority</option>
                  <option value="critical">🚨 Critical / High Priority</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Target Audience / Cohort</label>
              <input
                type="text"
                required
                placeholder="e.g. 4th Year / Final - Class A"
                className="text-input"
                style={{ width: '100%' }}
                value={noticeForm.targetAudience}
                onChange={(e) => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Notification Content</label>
              <textarea
                required
                rows={4}
                placeholder="Write full details of the notice..."
                className="text-input"
                style={{ width: '100%', fontFamily: 'inherit' }}
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <BellRing size={18} />
              Broadcast Notification Now
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE CLASS MODAL */}
      {/* ========================================================================= */}
      {showCreateClassModal && (
        <div className="fa-modal-overlay">
          <div className="fa-modal-content">
            <div className="fa-modal-header">
              <h3 className="fa-modal-title">Create New Class Schedule</h3>
              <button onClick={() => setShowCreateClassModal(false)} className="fa-modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateClassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Subject / Class Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Architecture & Microservices"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newClassForm.title}
                  onChange={(e) => setNewClassForm({ ...newClassForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Subject Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-404"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newClassForm.code}
                    onChange={(e) => setNewClassForm({ ...newClassForm, code: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Class Strength</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newClassForm.strength}
                    onChange={(e) => setNewClassForm({ ...newClassForm, strength: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Year Cohort</label>
                  <select
                    className="select-input"
                    style={{ width: '100%' }}
                    value={newClassForm.yearCohort}
                    onChange={(e) => setNewClassForm({ ...newClassForm, yearCohort: e.target.value })}
                  >
                    <option value="4th Year / Final">4th Year / Final</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="1st Year">1st Year</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Class / Section</label>
                  <select
                    className="select-input"
                    style={{ width: '100%' }}
                    value={newClassForm.section}
                    onChange={(e) => setNewClassForm({ ...newClassForm, section: e.target.value })}
                  >
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                    <option value="Class C">Class C</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Start Time</label>
                  <input
                    type="text"
                    required
                    placeholder="10:00 AM"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newClassForm.startTime}
                    onChange={(e) => setNewClassForm({ ...newClassForm, startTime: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">End Time</label>
                  <input
                    type="text"
                    required
                    placeholder="11:30 AM"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newClassForm.endTime}
                    onChange={(e) => setNewClassForm({ ...newClassForm, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Room / Lab Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab 4B"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newClassForm.room}
                  onChange={(e) => setNewClassForm({ ...newClassForm, room: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateClassModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Class Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: MARK ATTENDANCE LIVE ROSTER MODAL */}
      {/* ========================================================================= */}
      {showMarkAttendanceModal && activeClassForAttendance && (
        <div className="fa-modal-overlay">
          <div className="fa-modal-content" style={{ maxWidth: '800px' }}>
            <div className="fa-modal-header">
              <div>
                <h3 className="fa-modal-title">
                  Mark Attendance Session — {activeClassForAttendance.code} ({activeClassForAttendance.title})
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                  Target: <strong>{activeClassForAttendance.yearCohort} ({activeClassForAttendance.section})</strong> • Strength: <strong>{studentsData.length} Students</strong>
                </div>
              </div>
              <button onClick={() => setShowMarkAttendanceModal(false)} className="fa-modal-close-btn">
                <X size={20} />
              </button>
            </div>

            {/* Quick Bulk Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                onClick={() => handleBulkAttendance('present')}
              >
                Mark All Present
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem', color: '#dc2626' }}
                onClick={() => handleBulkAttendance('absent')}
              >
                Mark All Absent
              </button>
            </div>

            {/* Attendance Roster Table */}
            <form onSubmit={handleSaveAttendanceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="table-container" style={{ maxHeight: '380px', overflowY: 'auto' }}>
                <table className="attendance-roster-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Current %</th>
                      <th>Attendance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((st) => {
                      const curStatus = attendanceRoster[st.id] || 'present';

                      return (
                        <tr key={st.id}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{st.rollNo}</td>
                          <td style={{ fontWeight: 600, color: '#334155' }}>{st.name}</td>
                          <td>
                            <span className={`status-pill ${isAttendanceQualified(st.attendancePct) ? 'qualified' : 'detained'}`}>
                              {st.attendancePct}%
                            </span>
                          </td>
                          <td>
                            <div className="attend-btn-group">
                              <button
                                type="button"
                                className={`attend-opt-btn present ${curStatus === 'present' ? 'active' : ''}`}
                                onClick={() => handleToggleAttendance(st.id, 'present')}
                              >
                                Present
                              </button>
                              <button
                                type="button"
                                className={`attend-opt-btn absent ${curStatus === 'absent' ? 'active' : ''}`}
                                onClick={() => handleToggleAttendance(st.id, 'absent')}
                              >
                                Absent
                              </button>
                              <button
                                type="button"
                                className={`attend-opt-btn late ${curStatus === 'late' ? 'active' : ''}`}
                                onClick={() => handleToggleAttendance(st.id, 'late')}
                              >
                                Late
                              </button>
                              <button
                                type="button"
                                className={`attend-opt-btn leave ${curStatus === 'leave' ? 'active' : ''}`}
                                onClick={() => handleToggleAttendance(st.id, 'leave')}
                              >
                                On Leave
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowMarkAttendanceModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  Save & Update Attendance Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
