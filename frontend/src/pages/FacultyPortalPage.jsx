import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  CalendarCheck, 
  Plus, 
  FileText, 
  CheckSquare, 
  Clock, 
  Award, 
  TrendingUp, 
  Save, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  BarChart3,
  Megaphone,
  ExternalLink,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import '../components/faculty-admin/FacultyAdmin.css';

export default function FacultyPortalPage({ onAddNotice, searchTerm = '', onSelectStudent }) {
  // Active Tab: 'my-classes' | 'attendance' | 'internal-marks' | 'analytics' | 'notifications'
  const [activeTab, setActiveTab] = useState('my-classes');
  const [bannerMessage, setBannerMessage] = useState(null);

  // Student Report Modal State
  const [selectedReportStudent, setSelectedReportStudent] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const showBanner = (text, type = 'success') => {
    setBannerMessage({ text, type });
    setTimeout(() => setBannerMessage(null), 4000);
  };

  const handleOpenReport = (student) => {
    setSelectedReportStudent(student);
    setShowReportModal(true);
  };

  // Mock Faculty Classes List
  const [facultyClasses, setFacultyClasses] = useState([
    {
      id: 'CLS-401',
      title: 'Advanced Web & Cloud Engineering',
      code: 'CS-401',
      type: 'Timetable Session',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 45,
      days: ['Mon', 'Wed', 'Fri'],
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      room: 'Lab 4B'
    },
    {
      id: 'CLS-401-ADHOC',
      title: 'Special Cloud Security Revision & Doubt Solving',
      code: 'CS-401-EXTRA',
      type: 'Ad-Hoc / Extra Lecture',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 45,
      days: ['Saturday'],
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Auditorium Hall 2'
    },
    {
      id: 'CLS-402',
      title: 'Machine Learning & Neural Networks',
      code: 'CS-402',
      type: 'Timetable Session',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 42,
      days: ['Tue', 'Thu'],
      startTime: '01:30 PM',
      endTime: '03:00 PM',
      room: 'AI Center Room 302'
    }
  ]);

  // Mock Students Roster
  const [studentsList, setStudentsList] = useState([
    {
      id: 'STU-101',
      rollNo: '23ACOE1121163',
      name: 'ADEEN WAQQAS AHMED SHAHZAD',
      cohort: '4th Year / Final (Class A)',
      attendancePct: 84.5,
      totalLectures: 40,
      attendedLectures: 34,
      unitTest1: 18,
      midtermInternal: 18,
      totalInternal: 36
    },
    {
      id: 'STU-102',
      rollNo: 'CS-2024-112',
      name: 'Siddharth Nair',
      cohort: '4th Year / Final (Class A)',
      attendancePct: 64.5,
      totalLectures: 40,
      attendedLectures: 26,
      unitTest1: 14,
      midtermInternal: 14,
      totalInternal: 28
    },
    {
      id: 'STU-103',
      rollNo: 'CS-2024-114',
      name: 'Rohan Deshmukh',
      cohort: '4th Year / Final (Class A)',
      attendancePct: 91.0,
      totalLectures: 40,
      attendedLectures: 36,
      unitTest1: 7,
      midtermInternal: 7,
      totalInternal: 14
    },
    {
      id: 'STU-104',
      rollNo: 'CS-2024-118',
      name: 'Ananya Sharma',
      cohort: '4th Year / Final (Class A)',
      attendancePct: 88.0,
      totalLectures: 40,
      attendedLectures: 35,
      unitTest1: 19,
      midtermInternal: 19,
      totalInternal: 38
    }
  ]);

  // Modal States
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showMarkAttendanceModal, setShowMarkAttendanceModal] = useState(false);
  const [activeClassForAttendance, setActiveClassForAttendance] = useState(null);
  const [attendanceRoster, setAttendanceRoster] = useState({});

  // Create Class Form State
  const [classForm, setClassForm] = useState({
    title: '',
    code: '',
    type: 'Ad-Hoc / Extra Lecture',
    yearCohort: '4th Year / Final',
    section: 'Class A',
    strength: 45,
    days: ['Saturday'],
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    room: 'Lab 4B'
  });

  // Notification Form State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'academic',
    priority: 'important',
    targetAudience: '4th Year / Final - Class A',
    content: ''
  });

  // Handlers
  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!classForm.title || !classForm.code) return;

    const newClass = {
      id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      title: classForm.title,
      code: classForm.code,
      type: classForm.type,
      yearCohort: classForm.yearCohort,
      section: classForm.section,
      strength: parseInt(classForm.strength) || 40,
      days: classForm.days,
      startTime: classForm.startTime,
      endTime: classForm.endTime,
      room: classForm.room
    };

    setFacultyClasses([newClass, ...facultyClasses]);
    setShowCreateClassModal(false);
    showBanner(`Successfully created ${newClass.type}: "${newClass.code} - ${newClass.title}"!`);
    setClassForm({
      title: '',
      code: '',
      type: 'Ad-Hoc / Extra Lecture',
      yearCohort: '4th Year / Final',
      section: 'Class A',
      strength: 45,
      days: ['Saturday'],
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Lab 4B'
    });
  };

  const handleOpenAttendance = (cls) => {
    setActiveClassForAttendance(cls);
    const initRoster = {};
    studentsList.forEach(s => { initRoster[s.id] = 'present'; });
    setAttendanceRoster(initRoster);
    setShowMarkAttendanceModal(true);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    if (!activeClassForAttendance) return;

    setStudentsList(prev => prev.map(student => {
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
    showBanner(`Session attendance recorded for ${activeClassForAttendance.code}!`);
  };

  const handleInternalMarkChange = (studentId, field, val) => {
    const numVal = parseInt(val) || 0;
    setStudentsList(prev => prev.map(s => {
      if (s.id === studentId) {
        const ut1 = field === 'unitTest1' ? numVal : s.unitTest1;
        const mid = field === 'midtermInternal' ? numVal : s.midtermInternal;
        return {
          ...s,
          [field]: numVal,
          totalInternal: ut1 + mid
        };
      }
      return s;
    }));
  };

  const handleCreateNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;

    const notice = {
      id: Date.now(),
      title: noticeForm.title,
      category: noticeForm.category,
      priority: noticeForm.priority,
      content: noticeForm.content,
      author: 'Prof. Sarah Jenkins (Faculty)',
      date: 'Just now',
      isPinned: noticeForm.priority === 'critical',
      attachment: null
    };

    if (onAddNotice) onAddNotice(notice);
    showBanner(`Faculty Notification broadcasted to ${noticeForm.targetAudience}!`);
    setNoticeForm({ title: '', category: 'academic', priority: 'important', targetAudience: '4th Year / Final - Class A', content: '' });
  };

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    s.rollNo.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="faculty-admin-container">
      {/* Banner */}
      {bannerMessage && (
        <div style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #86efac', padding: '0.85rem 1.25rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CheckCircle2 size={18} />
          <span>{bannerMessage.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="fa-header-card" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' }}>
        <div className="fa-title-group">
          <h2>
            <BookOpen size={26} color="#ffffff" />
            <span>Faculty Educator Portal (Professors & Instructors)</span>
          </h2>
          <p>
            Welcome, Prof. Sarah Jenkins. Create ad-hoc/timetable classes, mark student attendance, upload internal assessment scores, and track exam eligibility analytics.
          </p>
        </div>

        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
          Department of Computer Science & Engineering
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="fa-tabs-bar">
        <button className={`fa-tab-btn ${activeTab === 'my-classes' ? 'active' : ''}`} onClick={() => setActiveTab('my-classes')}>
          <BookOpen size={18} />
          <span>My Classes & Ad-Hoc Sessions</span>
        </button>

        <button className={`fa-tab-btn ${activeTab === 'internal-marks' ? 'active' : ''}`} onClick={() => setActiveTab('internal-marks')}>
          <FileText size={18} />
          <span>Upload Internal Assessment Marks</span>
        </button>

        <button className={`fa-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          <BarChart3 size={18} />
          <span>Class Attendance & Exam Eligibility</span>
        </button>

        <button className={`fa-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
          <Megaphone size={18} />
          <span>Post Class Notice</span>
        </button>
      </div>

      {/* TAB 1: MY CLASSES */}
      {activeTab === 'my-classes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Faculty Class Roster & Ad-Hoc Extra Sessions
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Faculty can create extra ad-hoc revision classes irrespective of the timetable or mark attendance for scheduled sessions.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowCreateClassModal(true)}>
              <Plus size={16} />
              Create Class / Ad-Hoc Session
            </button>
          </div>

          <div className="classes-grid">
            {facultyClasses.map(cls => (
              <div key={cls.id} className="class-card">
                <div>
                  <div className="class-header">
                    <span className="class-code">{cls.code}</span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: cls.type.includes('Ad-Hoc') ? '#9333ea' : '#059669', backgroundColor: cls.type.includes('Ad-Hoc') ? '#f3e8ff' : '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                      {cls.type}
                    </span>
                  </div>
                  <h4 className="class-title">{cls.title}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.3rem 0' }}>
                    Cohort: <strong>{cls.yearCohort} ({cls.section})</strong> • Strength: <strong>{cls.strength} Students</strong>
                  </div>
                  <div className="class-meta-row">
                    <div className="time-pill">
                      <Clock size={13} />
                      <span>{cls.startTime} - {cls.endTime}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      📍 {cls.room}
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleOpenAttendance(cls)}>
                  <CheckSquare size={16} />
                  Mark Session Attendance
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD INTERNAL ASSESSMENT MARKS */}
      {activeTab === 'internal-marks' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="#00a884" />
                Internal Assessment & Unit Test Scores Upload (Faculty)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Faculty members enter internal evaluation marks only: <strong>Unit Test 1 (out of 20)</strong> and <strong>Unit Test 2 / Midterm (out of 20)</strong>. Total Internal = 40. Passing cutoff: &ge; 16/40.
              </p>
            </div>
            <button className="btn btn-secondary" onClick={() => showBanner(`Internal marks updated and saved!`)}>
              <Save size={16} />
              Save Internal Marks
            </button>
          </div>

          <div style={{ backgroundColor: '#e6f7f3', border: '1px solid #a7f3d0', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.82rem', color: '#047857', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} />
            <span>Role Scope Notice: Faculty permissions allow entering Internal Assessment & Unit Test marks (UT-1: 20 marks, UT-2: 20 marks = Max 40). External End-Semester Written Exam (60 marks) & Marksheet uploads are managed by Admin / HOD Office.</span>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Cohort</th>
                  <th>Unit Test 1 (20)</th>
                  <th>Midterm Internal (20)</th>
                  <th>Total Internal (40)</th>
                  <th>Internal Qualification Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(st => {
                  const pass = st.totalInternal >= 16;

                  return (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{st.rollNo}</td>
                      <td>
                        <div 
                          onClick={() => handleOpenReport(st)}
                          style={{ fontWeight: 800, color: '#0f172a', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                          title="Click to view detailed student academic report"
                        >
                          <span style={{ textDecoration: 'underline', color: '#00a884' }}>{st.name}</span>
                          <ExternalLink size={13} color="#00a884" />
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{st.cohort}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          className="marks-input"
                          value={st.unitTest1}
                          onChange={(e) => handleInternalMarkChange(st.id, 'unitTest1', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          className="marks-input"
                          value={st.midtermInternal}
                          onChange={(e) => handleInternalMarkChange(st.id, 'midtermInternal', e.target.value)}
                        />
                      </td>
                      <td style={{ fontWeight: 800, color: '#0f172a' }}>{st.totalInternal} / 40</td>
                      <td>
                        <span className={`status-pill ${pass ? 'qualified' : 'unqualified'}`}>
                          {pass ? 'Passed Internal (>=16)' : 'Failed Internal (<16)'}
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

      {/* TAB 3: ANALYTICS & EXAM ELIGIBILITY */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="#00a884" />
              Class Attendance Qualification (&ge; 75%)
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
              Click student name to access academic report. Students below 75% are automatically flagged as <strong>Detained</strong>.
            </p>
            {studentsList.map(st => {
              const ok = st.attendancePct >= 75.0;
              return (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div 
                      onClick={() => handleOpenReport(st)}
                      style={{ fontSize: '0.88rem', fontWeight: 800, color: '#00a884', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'underline' }}
                      title="Click to view detailed student academic report"
                    >
                      <span>{st.name}</span>
                      <ExternalLink size={13} color="#00a884" />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Roll: {st.rollNo}</div>
                  </div>
                  <span className={`status-pill ${ok ? 'qualified' : 'detained'}`}>
                    {ok ? `${st.attendancePct}% Qualified` : `${st.attendancePct}% DETAINED`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="#047857" />
              Internal Assessment Qualification (&ge; 16/40)
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
              Click student name to access academic report. Students must score at least 16 out of 40 in internal assessments.
            </p>
            {studentsList.map(st => {
              const pass = st.totalInternal >= 16;
              return (
                <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div 
                      onClick={() => handleOpenReport(st)}
                      style={{ fontSize: '0.88rem', fontWeight: 800, color: '#00a884', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'underline' }}
                      title="Click to view detailed student academic report"
                    >
                      <span>{st.name}</span>
                      <ExternalLink size={13} color="#00a884" />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Score: {st.totalInternal} / 40</div>
                  </div>
                  <span className={`status-pill ${pass ? 'qualified' : 'unqualified'}`}>
                    {pass ? 'Passed' : 'Internal Fail'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="card" style={{ padding: '1.75rem', maxWidth: '650px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
            Post Class Announcement / Advisory Notice
          </h3>
          <form onSubmit={handleCreateNoticeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label className="form-label">Notice Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Mandatory Attendance Advisory for CS-401"
                className="text-input"
                style={{ width: '100%' }}
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Target Audience</label>
              <input
                type="text"
                required
                placeholder="4th Year / Final - Class A"
                className="text-input"
                style={{ width: '100%' }}
                value={noticeForm.targetAudience}
                onChange={(e) => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Content</label>
              <textarea
                required
                rows={4}
                placeholder="Write notice details..."
                className="text-input"
                style={{ width: '100%', fontFamily: 'inherit' }}
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Post Faculty Notice
            </button>
          </form>
        </div>
      )}

      {/* CREATE CLASS MODAL */}
      {showCreateClassModal && (
        <div className="fa-modal-overlay">
          <div className="fa-modal-content">
            <div className="fa-modal-header">
              <h3 className="fa-modal-title">Create Class (Timetable or Ad-Hoc Extra Lecture)</h3>
              <button onClick={() => setShowCreateClassModal(false)} className="fa-modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateClass} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Class Session Type</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={classForm.type}
                  onChange={(e) => setClassForm({ ...classForm, type: e.target.value })}
                >
                  <option value="Ad-Hoc / Extra Lecture">⚡ Ad-Hoc / Extra Revision Lecture (Irrespective of Timetable)</option>
                  <option value="Timetable Session">📅 Regular Timetable Class Session</option>
                </select>
              </div>

              <div>
                <label className="form-label">Subject / Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Cloud Security Revision Session"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={classForm.title}
                  onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Subject Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-401-EXTRA"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={classForm.code}
                    onChange={(e) => setClassForm({ ...classForm, code: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Class Strength</label>
                  <input
                    type="number"
                    required
                    className="text-input"
                    style={{ width: '100%' }}
                    value={classForm.strength}
                    onChange={(e) => setClassForm({ ...classForm, strength: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Start Time</label>
                  <input
                    type="text"
                    required
                    placeholder="02:00 PM"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={classForm.startTime}
                    onChange={(e) => setClassForm({ ...classForm, startTime: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">End Time</label>
                  <input
                    type="text"
                    required
                    placeholder="04:00 PM"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={classForm.endTime}
                    onChange={(e) => setClassForm({ ...classForm, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Room / Venue</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab 4B or Auditorium 2"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={classForm.room}
                  onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateClassModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save & Launch Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MARK ATTENDANCE MODAL */}
      {showMarkAttendanceModal && activeClassForAttendance && (
        <div className="fa-modal-overlay">
          <div className="fa-modal-content" style={{ maxWidth: '750px' }}>
            <div className="fa-modal-header">
              <div>
                <h3 className="fa-modal-title">Mark Attendance: {activeClassForAttendance.code}</h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {activeClassForAttendance.type} • {activeClassForAttendance.title}
                </div>
              </div>
              <button onClick={() => setShowMarkAttendanceModal(false)} className="fa-modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAttendance} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="table-container" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <table className="attendance-roster-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Attendance %</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsList.map(st => (
                      <tr key={st.id}>
                        <td style={{ fontWeight: 700 }}>{st.rollNo}</td>
                        <td>
                          <span 
                            onClick={() => handleOpenReport(st)} 
                            style={{ cursor: 'pointer', color: '#00a884', fontWeight: 700, textDecoration: 'underline' }}
                            title="Click to view detailed student academic report"
                          >
                            {st.name}
                          </span>
                        </td>
                        <td>{st.attendancePct}%</td>
                        <td>
                          <div className="attend-btn-group">
                            <button
                              type="button"
                              className={`attend-opt-btn present ${attendanceRoster[st.id] === 'present' ? 'active' : ''}`}
                              onClick={() => setAttendanceRoster({ ...attendanceRoster, [st.id]: 'present' })}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              className={`attend-opt-btn absent ${attendanceRoster[st.id] === 'absent' ? 'active' : ''}`}
                              onClick={() => setAttendanceRoster({ ...attendanceRoster, [st.id]: 'absent' })}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowMarkAttendanceModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  Save Session Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT ACADEMIC REPORT MODAL */}
      {showReportModal && selectedReportStudent && (
        <div className="fa-modal-overlay">
          <div className="fa-modal-content" style={{ maxWidth: '680px' }}>
            <div className="fa-modal-header" style={{ backgroundColor: '#064e3b', color: '#ffffff', borderRadius: '14px 14px 0 0', padding: '1.25rem 1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6ee7b7', letterSpacing: '0.05em' }}>
                  STUDENT ACADEMIC & ATTENDANCE REPORT
                </div>
                <h3 className="fa-modal-title" style={{ color: '#ffffff', margin: '0.2rem 0 0 0', fontSize: '1.3rem' }}>
                  {selectedReportStudent.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.15rem' }}>
                  Roll No: <strong>{selectedReportStudent.rollNo}</strong> • Cohort: {selectedReportStudent.cohort}
                </div>
              </div>
              <button onClick={() => setShowReportModal(false)} className="fa-modal-close-btn" style={{ color: '#ffffff' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Stat Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Card 1: Attendance Report */}
                <div style={{ padding: '1.1rem', borderRadius: '12px', backgroundColor: selectedReportStudent.attendancePct >= 75 ? '#f0fdf4' : '#fef2f2', border: `1px solid ${selectedReportStudent.attendancePct >= 75 ? '#bbf7d0' : '#fecaca'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: selectedReportStudent.attendancePct >= 75 ? '#047857' : '#dc2626' }}>
                      ATTENDANCE REPORT
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.55rem', borderRadius: '6px', backgroundColor: selectedReportStudent.attendancePct >= 75 ? '#dcfce7' : '#fee2e2', color: selectedReportStudent.attendancePct >= 75 ? '#047857' : '#dc2626' }}>
                      {selectedReportStudent.attendancePct >= 75 ? 'ELIGIBLE' : 'DETAINED'}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: selectedReportStudent.attendancePct >= 75 ? '#047857' : '#dc2626' }}>
                    {selectedReportStudent.attendancePct}%
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600, marginTop: '0.25rem' }}>
                    {selectedReportStudent.attendedLectures} / {selectedReportStudent.totalLectures} Lectures Attended
                  </div>
                </div>

                {/* Card 2: Internal Assessment Marks */}
                <div style={{ padding: '1.1rem', borderRadius: '12px', backgroundColor: selectedReportStudent.totalInternal >= 16 ? '#f0fdf4' : '#fff7ed', border: `1px solid ${selectedReportStudent.totalInternal >= 16 ? '#bbf7d0' : '#fed7aa'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: selectedReportStudent.totalInternal >= 16 ? '#047857' : '#c2410c' }}>
                      INTERNAL MARKS (40)
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.55rem', borderRadius: '6px', backgroundColor: selectedReportStudent.totalInternal >= 16 ? '#dcfce7' : '#ffedd5', color: selectedReportStudent.totalInternal >= 16 ? '#047857' : '#c2410c' }}>
                      {selectedReportStudent.totalInternal >= 16 ? 'PASSED' : 'FAIL (<16)'}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: selectedReportStudent.totalInternal >= 16 ? '#047857' : '#c2410c' }}>
                    {selectedReportStudent.totalInternal} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ 40</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600, marginTop: '0.25rem' }}>
                    UT1: {selectedReportStudent.unitTest1}/20 • Midterm: {selectedReportStudent.midtermInternal}/20
                  </div>
                </div>
              </div>

              {/* Achilles Advisory Log */}
              <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} color="#00a884" />
                  EduPlus Achilles 1.0 Advisory Analysis:
                </h5>
                <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>
                  {selectedReportStudent.attendancePct < 75 
                    ? `Warning: Student attendance (${selectedReportStudent.attendancePct}%) is below the mandatory 75% threshold. Remedial advising session required before end-term final exams.`
                    : selectedReportStudent.totalInternal < 16
                    ? `Action Required: Student total internal score (${selectedReportStudent.totalInternal}/40) is below passing threshold (16/40). Re-test assignment required.`
                    : `Student is in Good Standing with ${selectedReportStudent.attendancePct}% attendance and ${selectedReportStudent.totalInternal}/40 internal marks. Eligible for department peer tutoring.`
                  }
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowReportModal(false)}
                >
                  Close Report
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowReportModal(false);
                    if (onSelectStudent) {
                      onSelectStudent({ id: selectedReportStudent.rollNo, name: selectedReportStudent.name, rollNo: selectedReportStudent.rollNo, department: 'COMPUTER ENGINEERING' });
                    }
                  }}
                >
                  View Full Institutional Profile &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
