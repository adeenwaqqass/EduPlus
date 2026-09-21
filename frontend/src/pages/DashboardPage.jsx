import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Users, 
  TrendingDown, 
  CheckCircle, 
  MessageSquare,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  BookOpen,
  Info,
  Award,
  FileText,
  GraduationCap,
  Clock,
  Calendar,
  CheckCircle2,
  UserCheck,
  Send,
  PlusCircle
} from 'lucide-react';

export default function DashboardPage({ currentUser, onNavigateToStudent }) {
  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  const [activeSubjectHover, setActiveSubjectHover] = useState(null);
  const [activePieHover, setActivePieHover] = useState(null);

  // Faculty Active Risk Alerts
  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-101',
      studentId: 'CS-2024-112',
      studentName: 'Siddharth Nair',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      risk: 'High Risk',
      trigger: 'Low Attendance (64.2%) & UT1 Score Drop',
      status: 'OPEN',
      date: '2 hours ago',
      course: 'CS706 Gen AI'
    },
    {
      id: 'ALT-102',
      studentId: 'BIO-2026-004',
      studentName: 'Gabriela Cortese',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      risk: 'High Risk',
      trigger: 'Missing 3 Assignment Submissions',
      status: 'OPEN',
      date: '5 hours ago',
      course: 'CS702 Cloud Computing'
    },
    {
      id: 'ALT-103',
      studentId: 'EE-2024-055',
      studentName: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      risk: 'Medium Risk',
      trigger: 'Attendance 69.0% (Below 75% Cutoff)',
      status: 'ACKNOWLEDGED',
      date: '1 day ago',
      course: 'DAA Algorithms'
    }
  ]);

  // Faculty Taught Courses Overview Data
  const facultyTaughtCourses = [
    { code: 'CS706', name: 'Advanced Generative AI & LLMs', section: 'Sec A (WINTER 2026)', totalLectures: 42, students: 42, attendancePct: 90.5, status: 'Active' },
    { code: 'CS702', name: 'Cloud and Edge Computing', section: 'Sec B (WINTER 2026)', totalLectures: 40, students: 40, attendancePct: 80.0, status: 'Active' },
    { code: 'CS703', name: 'Cyber Security & Cryptography', section: 'Sec A (WINTER 2026)', totalLectures: 38, students: 38, attendancePct: 89.4, status: 'Active' },
    { code: 'DAA', name: 'Design & Analysis of Algorithms', section: 'Sec A (WINTER 2026)', totalLectures: 30, students: 30, attendancePct: 93.3, status: 'Active' }
  ];

  // Faculty Schedule Today
  const todaySchedule = [
    { time: '10:00 AM - 11:30 AM', course: 'CS706 Sec A', title: 'Advanced Generative AI & LLMs', room: 'Lab 3 (AI Dept)', status: 'Upcoming', students: 42 },
    { time: '01:30 PM - 03:00 PM', course: 'CS702 Sec B', title: 'Cloud and Edge Computing', room: 'Hall 102 (CS Wing)', status: 'Scheduled', students: 40 },
    { time: '03:30 PM - 05:00 PM', course: 'DAA Sec A', title: 'Design & Analysis of Algorithms', room: 'Lecture Hall 4', status: 'Scheduled', students: 30 }
  ];

  // Grading Tasks for Faculty
  const gradingTasks = [
    { course: 'CS706', title: 'Lab Assignment 3 (Prompt Tuning)', pending: 4, submitted: 38, total: 42, deadline: 'Today, 11:59 PM' },
    { course: 'CS702', title: 'Midterm Project Draft Reviews', pending: 12, submitted: 40, total: 40, deadline: 'Tomorrow' },
    { course: 'DAA', title: 'Quiz 2 Algorithm Analysis', pending: 0, submitted: 30, total: 30, deadline: 'Graded' }
  ];

  // Student Attendance Data (for Student view)
  const subjectAttendanceData = [
    { code: 'CS-101', name: 'Data Structures', attendance: 88, color: '#00a884' },
    { code: 'CS-202', name: 'Database Systems', attendance: 92, color: '#00a884' },
    { code: 'EE-201', name: 'Digital Circuits', attendance: 74, color: '#f59e0b' },
    { code: 'MATH-301', name: 'Linear Algebra', attendance: 81, color: '#00a884' },
    { code: 'PHY-102', name: 'General Physics', attendance: 68, color: '#ef4444' },
    { code: 'ENG-105', name: 'Technical Writing', attendance: 95, color: '#00a884' }
  ];

  // Attendance Pie chart stats
  const facultyAttendancePie = [
    { label: 'Present', percentage: 88.4, count: 163, color: '#00a884' },
    { label: 'Absent', percentage: 11.6, count: 21, color: '#ef4444' }
  ];

  const studentAttendancePie = [
    { label: 'Present', percentage: 86.5, count: 182, color: '#00a884' },
    { label: 'Absent', percentage: 13.5, count: 28, color: '#ef4444' }
  ];

  // Risk distribution
  const riskDistributionData = [
    { category: 'On Track (>85%)', count: 136, percentage: 73.9, color: '#10b981' },
    { category: 'Watchlist (75-85%)', count: 40, percentage: 21.7, color: '#f59e0b' },
    { category: 'At-Risk (<75%)', count: 8, percentage: 4.4, color: '#ef4444' }
  ];

  // Marks data for Student perspective only
  const marksPieData = [
    { label: 'Internal Assessment', percentage: 36.5, score: '36.5 / 40', color: '#00a884' },
    { label: 'External Semester Exam', percentage: 44.9, score: '44.9 / 60', color: '#0284c7' },
    { label: 'Unscored Margin', percentage: 18.6, score: '18.6 Lost', color: '#cbd5e1' }
  ];

  const subjectMarksData = [
    { code: 'CS-101', name: 'Data Structures', internal: 36, external: 54, total: 90, grade: 'A' },
    { code: 'CS-202', name: 'Database Systems', internal: 38, external: 52, total: 90, grade: 'A' },
    { code: 'EE-201', name: 'Digital Circuits', internal: 22, external: 32, total: 54, grade: 'C' },
    { code: 'MATH-301', name: 'Linear Algebra', internal: 31, external: 46, total: 77, grade: 'B+' },
    { code: 'PHY-102', name: 'General Physics', internal: 21, external: 30, total: 51, grade: 'C-' },
    { code: 'ENG-105', name: 'Technical Writing', internal: 39, external: 57, total: 96, grade: 'A+' }
  ];

  const updateAlertStatus = (id, newStatus) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleSendWhatsApp = (studentName) => {
    alert(`WhatsApp notification sent to parent of ${studentName}!`);
  };

  return (
    <div>
      {/* 4 Stat Cards */}
      <div style={styles.statGrid}>
        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #00a884' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>{isFaculty ? 'Assigned Faculty Courses' : 'Overall Attendance'}</span>
            {isFaculty ? <BookOpen size={18} color="#00a884" /> : <CheckCircle size={18} color="#00a884" />}
          </div>
          <div style={{ ...styles.statNumber, color: '#047857' }}>{isFaculty ? '4 Batches' : '86.5%'}</div>
          <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600 }}>
            {isFaculty ? '184 Total Enrolled Students' : 'Above 75% Cutoff Threshold'}
          </span>
        </div>

        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>{isFaculty ? 'Faculty Class Attendance Avg' : 'Semester SGPA'}</span>
            <Award size={18} color="#0284c7" />
          </div>
          <div style={{ ...styles.statNumber, color: '#0369a1' }}>{isFaculty ? '88.4%' : '8.25'}</div>
          <span style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 600 }}>
            {isFaculty ? '163 / 184 Students On Track' : 'Scale: 10.0 (WINTER 2026)'}
          </span>
        </div>

        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>{isFaculty ? 'Pass / Standing Rate' : 'Cumulative CGPA'}</span>
            <GraduationCap size={18} color="#7c3aed" />
          </div>
          <div style={{ ...styles.statNumber, color: '#6d28d9' }}>{isFaculty ? '92.5%' : '7.85'}</div>
          <span style={{ fontSize: '0.78rem', color: '#6d28d9', fontWeight: 600 }}>
            {isFaculty ? 'Top Educator Performance Index' : 'UGC 10-Point System (First Class)'}
          </span>
        </div>

        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>{isFaculty ? 'Student Risk Advisory Flags' : 'Internal Assessment Avg'}</span>
            {isFaculty ? <AlertTriangle size={18} color="#ef4444" /> : <UserCheck size={18} color="#f59e0b" />}
          </div>
          <div style={{ ...styles.statNumber, color: isFaculty ? '#dc2626' : '#b45309' }}>{isFaculty ? '3 Flags' : '36.5 / 40'}</div>
          <span style={{ fontSize: '0.78rem', color: isFaculty ? '#dc2626' : '#b45309', fontWeight: 600 }}>
            {isFaculty ? 'Requires Faculty Intervention' : '91.2% Internal Average Score'}
          </span>
        </div>
      </div>

      {/* SECTION 1: COURSE & ATTENDANCE ANALYTICS OVERVIEW */}
      <div style={styles.sectionHeaderRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PieIcon size={18} color="#00a884" />
          <h3 style={styles.sectionHeadingText}>
            {isFaculty ? '1. Faculty Taught Course Analytics & Attendance' : '1. Attendance Analytics'}
          </h3>
        </div>
        <span style={styles.sectionBadgeText}>
          {isFaculty ? 'Faculty Educator Dashboard Active' : 'Mandatory 75% Cutoff Rule Active'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isFaculty ? '1fr 1.2fr 1fr' : '1fr 1fr', gap: '1.5rem' }}>
        {/* Card 1: Donut Pie Chart (Overall Attendance) */}
        <div className="card" style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h3 style={styles.chartTitle}>{isFaculty ? 'Faculty Batch Attendance Ratio' : 'Overall Attendance Ratio'}</h3>
              <p style={styles.chartSubtitle}>% of Present vs % of Absent Students</p>
            </div>
            <PieIcon size={18} color="#00a884" />
          </div>

          <div style={styles.pieContainer}>
            <div style={styles.svgWrapper}>
              <svg width="170" height="170" viewBox="0 0 170 170" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="85" cy="85" r="65" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                <circle
                  cx="85"
                  cy="85"
                  r="65"
                  fill="none"
                  stroke="#00a884"
                  strokeWidth="22"
                  strokeDasharray={`${((isFaculty ? 88.4 : 86.5) / 100) * 408.4} 408.4`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="85"
                  cy="85"
                  r="65"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="22"
                  strokeDasharray={`${((isFaculty ? 11.6 : 13.5) / 100) * 408.4} 408.4`}
                  strokeDashoffset={`-${((isFaculty ? 88.4 : 86.5) / 100) * 408.4}`}
                />
              </svg>

              <div style={styles.pieCenterLabel}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{isFaculty ? '88.4%' : '86.5%'}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>AVG ATTENDANCE</div>
              </div>
            </div>

            <div style={styles.pieLegendList}>
              {(isFaculty ? facultyAttendancePie : studentAttendancePie).map((item) => (
                <div key={item.label} style={styles.pieLegendRow}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                      {item.label}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      {item.percentage}%
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>
                      {item.count} students
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Faculty Taught Courses Breakdown (Only rendered for Faculty view) */}
        {isFaculty && (
          <div className="card" style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div>
                <h3 style={styles.chartTitle}>Assigned Courses & Class Metrics</h3>
                <p style={styles.chartSubtitle}>Active taught courses & attendance rates</p>
              </div>
              <BarChart3 size={18} color="#00a884" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {facultyTaughtCourses.map((c) => (
                <div key={c.code} style={{ padding: '0.6rem 0.75rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, backgroundColor: '#00a884', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {c.code}
                      </span>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                        {c.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: c.attendancePct >= 85 ? '#047857' : '#d97706' }}>
                      {c.attendancePct}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b' }}>
                    <span>{c.section} • {c.students} Students</span>
                    <span>{c.totalLectures} Conducted Lectures</span>
                  </div>

                  <div style={{ ...styles.barTrack, marginTop: '0.35rem' }}>
                    <div style={{ ...styles.barFill, width: `${c.attendancePct}%`, backgroundColor: '#00a884' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card 3: Batch Risk Distribution */}
        <div className="card" style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h3 style={styles.chartTitle}>{isFaculty ? 'Faculty Student Risk Profile' : 'Student Risk Distribution Graph'}</h3>
              <p style={styles.chartSubtitle}>Categorized by EduPlus Achilles 1.0 engine</p>
            </div>
            <TrendingUp size={18} color="#00a884" />
          </div>

          <div style={styles.riskGraphContent}>
            <div style={styles.stackedRiskBar}>
              {riskDistributionData.map((r) => (
                <div
                  key={r.category}
                  style={{
                    width: `${r.percentage}%`,
                    backgroundColor: r.color,
                    height: '100%'
                  }}
                  title={`${r.category}: ${r.count} Students (${r.percentage}%)`}
                />
              ))}
            </div>

            <div style={styles.riskBreakdownList}>
              {riskDistributionData.map((r) => (
                <div key={r.category} style={styles.riskItemCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: r.color }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                      {r.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: r.color, margin: '0.2rem 0' }}>
                    {r.count} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>students</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                    {r.percentage}% of Taught Batch
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.mlInsightBox}>
              <Info size={16} color="#0284c7" />
              <span style={{ fontSize: '0.76rem', color: '#0369a1', lineHeight: '1.4' }}>
                {isFaculty 
                  ? '3 Students in your assigned classes are flagged for low attendance (<75%). Action required.'
                  : '8 High-Risk students flagged for low attendance (<70%). Automated interventions active.'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT PERSPECTIVE ONLY: MARKS ANALYTICS */}
      {!isFaculty && (
        <>
          <div style={{ ...styles.sectionHeaderRow, marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="#0284c7" />
              <h3 style={styles.sectionHeadingText}>2. Marks & Assessment Analytics (Internal & External)</h3>
            </div>
            <span style={{ ...styles.sectionBadgeText, backgroundColor: '#e0f2fe', color: '#0369a1', borderColor: '#93c5fd' }}>
              Student View • 60% Passing Cutoff Rule
            </span>
          </div>

          <div style={styles.chartsGrid}>
            <div className="card" style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <div>
                  <h3 style={styles.chartTitle}>Marks Weightage Ratio</h3>
                  <p style={styles.chartSubtitle}>Internal Assessment (40%) vs External Exam (60%)</p>
                </div>
                <PieIcon size={18} color="#0284c7" />
              </div>

              <div style={styles.pieContainer}>
                <div style={styles.svgWrapper}>
                  <svg width="170" height="170" viewBox="0 0 170 170" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="85" cy="85" r="65" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                    <circle cx="85" cy="85" r="65" fill="none" stroke="#00a884" strokeWidth="22" strokeDasharray={`${(36.5 / 100) * 408.4} 408.4`} strokeDashoffset="0" />
                    <circle cx="85" cy="85" r="65" fill="none" stroke="#0284c7" strokeWidth="22" strokeDasharray={`${(44.9 / 100) * 408.4} 408.4`} strokeDashoffset={`-${(36.5 / 100) * 408.4}`} />
                    <circle cx="85" cy="85" r="65" fill="none" stroke="#cbd5e1" strokeWidth="22" strokeDasharray={`${(18.6 / 100) * 408.4} 408.4`} strokeDashoffset={`-${((36.5 + 44.9) / 100) * 408.4}`} />
                  </svg>
                  <div style={styles.pieCenterLabel}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>81.4%</div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>AVG MARKS</div>
                  </div>
                </div>

                <div style={styles.pieLegendList}>
                  {marksPieData.map((item) => (
                    <div key={item.label} style={styles.pieLegendRow}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }} />
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{item.label}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{item.percentage}%</span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <div>
                  <h3 style={styles.chartTitle}>Subject-Wise Marks Breakdown</h3>
                  <p style={styles.chartSubtitle}>Internal Marks (40) + External Marks (60)</p>
                </div>
                <BarChart3 size={18} color="#0284c7" />
              </div>

              <div style={styles.subjectBarContainer}>
                <div style={styles.barList}>
                  {subjectMarksData.map((subj) => (
                    <div key={subj.code} style={styles.subjectBarItem}>
                      <div style={styles.subjectLabelRow}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={styles.subjectCode}>{subj.code}</span>
                          <span style={styles.subjectName}>{subj.name}</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: subj.total < 60 ? '#dc2626' : '#047857' }}>
                          {subj.total}% ({subj.grade})
                        </span>
                      </div>
                      <div style={styles.barTrack}>
                        <div style={{ display: 'flex', height: '100%', width: `${subj.total}%`, borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ width: `${(subj.internal / subj.total) * 100}%`, backgroundColor: subj.total < 60 ? '#ef4444' : '#00a884', height: '100%' }} />
                          <div style={{ width: `${(subj.external / subj.total) * 100}%`, backgroundColor: subj.total < 60 ? '#f87171' : '#0284c7', height: '100%' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <div>
                  <h3 style={styles.chartTitle}>Grade Performance Profile</h3>
                  <p style={styles.chartSubtitle}>Internal vs External assessment classification</p>
                </div>
                <Award size={18} color="#0284c7" />
              </div>

              <div style={styles.riskGraphContent}>
                <div style={styles.stackedRiskBar}>
                  <div style={{ width: '50%', backgroundColor: '#10b981', height: '100%' }} title="Distinction (50%)" />
                  <div style={{ width: '16.7%', backgroundColor: '#0284c7', height: '100%' }} title="Good Standing (16.7%)" />
                  <div style={{ width: '33.3%', backgroundColor: '#ef4444', height: '100%' }} title="Needs Review (33.3%)" />
                </div>

                <div style={styles.riskBreakdownList}>
                  <div style={styles.riskItemCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Distinction (Grade A/A+)</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', margin: '0.2rem 0' }}>3 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>subjects</span></div>
                  </div>
                  <div style={styles.riskItemCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Good Standing (Grade B/B+)</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7', margin: '0.2rem 0' }}>1 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>subjects</span></div>
                  </div>
                  <div style={styles.riskItemCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Needs Review (Grade C & Below)</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444', margin: '0.2rem 0' }}>2 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>subjects</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content Split */}
      <div style={{ ...styles.contentSplit, marginTop: '2rem' }}>
        {isFaculty ? (
          /* FACULTY MAIN SECTION */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 1. Student Advisory & Early Warning Flags Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert size={20} color="#dc2626" />
                    Faculty Student Advisory & Early Warning Flags
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                    Intervention tracking for students with attendance drop or missing coursework in your classes
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.35rem 0.75rem', borderRadius: '8px' }}>
                  {alerts.filter(a => a.status !== 'RESOLVED').length} PENDING ALERTS
                </span>
              </div>

              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                      <th style={{ color: '#ffffff' }}>Student Profile</th>
                      <th style={{ color: '#ffffff' }}>Course</th>
                      <th style={{ color: '#ffffff' }}>Risk Category</th>
                      <th style={{ color: '#ffffff' }}>Triggering Indicator</th>
                      <th style={{ color: '#ffffff' }}>Workflow Status</th>
                      <th style={{ color: '#ffffff', textAlign: 'right' }}>Faculty Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((alert, idx) => (
                      <tr key={alert.id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td>
                          <div 
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                            onClick={() => onNavigateToStudent && onNavigateToStudent({ id: alert.studentId, name: alert.studentName })}
                          >
                            <div>
                              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>
                                {alert.studentName}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                {alert.studentId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#e2e8f0', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                            {alert.course}
                          </span>
                        </td>
                        <td>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            border: '1px solid',
                            backgroundColor: alert.risk.includes('High') ? '#fee2e2' : '#fef3c7',
                            color: alert.risk.includes('High') ? '#dc2626' : '#d97706',
                            borderColor: alert.risk.includes('High') ? '#fca5a5' : '#fde68a'
                          }}>
                            {alert.risk}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                          {alert.trigger}
                        </td>
                        <td>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            backgroundColor: alert.status === 'OPEN' ? '#fee2e2' : alert.status === 'ACKNOWLEDGED' ? '#fef3c7' : '#dcfce7',
                            color: alert.status === 'OPEN' ? '#b91c1c' : alert.status === 'ACKNOWLEDGED' ? '#b45309' : '#047857'
                          }}>
                            {alert.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                            {alert.status === 'OPEN' && (
                              <button
                                onClick={() => updateAlertStatus(alert.id, 'ACKNOWLEDGED')}
                                className="btn btn-secondary"
                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.74rem', fontWeight: 700 }}
                              >
                                Acknowledge
                              </button>
                            )}
                            {alert.status !== 'RESOLVED' && (
                              <>
                                <button
                                  onClick={() => handleSendWhatsApp(alert.studentName)}
                                  className="btn btn-secondary"
                                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.74rem', fontWeight: 700, color: '#047857', borderColor: '#a7f3d0' }}
                                  title="Send WhatsApp Alert to Parent"
                                >
                                  <MessageSquare size={13} />
                                  WhatsApp
                                </button>
                                <button
                                  onClick={() => updateAlertStatus(alert.id, 'RESOLVED')}
                                  className="btn btn-primary"
                                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.74rem', fontWeight: 700, backgroundColor: '#00a884', borderColor: '#00a884' }}
                                >
                                  Resolve
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Today's Teaching Schedule Card */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} color="#00a884" />
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Today's Teaching Schedule (Prof. Sarah Jenkins)
                  </h3>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                  3 Lectures Today
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {todaySchedule.map((item, idx) => (
                  <div key={idx} style={{ padding: '0.85rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, backgroundColor: '#00a884', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {item.course}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#047857', backgroundColor: '#e6f7f3', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {item.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                      {item.title}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem', color: '#64748b', marginBottom: '0.2rem' }}>
                      <Clock size={13} color="#00a884" />
                      <span>{item.time}</span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#475569', fontWeight: 600 }}>
                      📍 {item.room} • {item.students} Enrolled
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Student Personal Academic Status */
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                  Personal Academic Recommendations & Advisory Log
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                  Private student progress monitoring & personalized course improvement actions
                </p>
              </div>
              <span className="badge badge-active" style={{ padding: '0.35rem 0.75rem' }}>
                PRIVATE STUDENT VIEW
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', backgroundColor: '#fee2e2', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>EE-201 Digital Circuits</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b' }}>ACTION REQUIRED</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Internal score (22/40) is below 60% target cutoff</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Faculty Quick Control Panel */}
          {isFaculty ? (
            <>
              <div className="card" style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="#00a884" />
                  Faculty Quick Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <button 
                    onClick={() => alert('Generating Faculty Term Advisory Report...')}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      borderRadius: '9999px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FileText size={16} color="#00a884" />
                    <span>Generate Term Warning Summary</span>
                  </button>

                  <button 
                    onClick={() => alert('Exporting Class Risk Analytics to Excel...')}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      borderRadius: '9999px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <TrendingUp size={16} color="#0284c7" />
                    <span>Export Class Risk Analytics (Excel)</span>
                  </button>

                  <button 
                    onClick={() => alert('Redirecting to Create Class form...')}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      borderRadius: '9999px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <PlusCircle size={16} color="#00a884" />
                    <span>Schedule Remedial Class</span>
                  </button>
                </div>
              </div>

              {/* Pending Course Tasks Widget */}
              <div className="card" style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#00a884" />
                  Course Submission Reviews
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {gradingTasks.map((t, i) => (
                    <div key={i} style={{ padding: '0.65rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ffffff', backgroundColor: '#00a884', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {t.course}
                        </span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: t.pending > 0 ? '#d97706' : '#047857' }}>
                          {t.deadline}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Submitted: {t.submitted}/{t.total} ({t.pending} Pending Review)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Student Dashboard Options
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                View private course attendance and midterm progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.25rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    padding: '1.25rem'
  },
  statTitle: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 800,
    color: 'var(--text-dark)',
    margin: '0.35rem 0'
  },
  sectionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  sectionHeadingText: {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: 0
  },
  sectionBadgeText: {
    fontSize: '0.74rem',
    fontWeight: 700,
    backgroundColor: '#e6f7f3',
    color: '#047857',
    padding: '0.25rem 0.65rem',
    borderRadius: '9999px',
    border: '1px solid #99f6e4'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr 1fr',
    gap: '1.25rem',
    marginBottom: '1.5rem'
  },
  chartCard: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  chartTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
    margin: 0
  },
  chartSubtitle: {
    fontSize: '0.72rem',
    color: '#64748b',
    margin: '0.15rem 0 0 0'
  },
  pieContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    flex: 1
  },
  svgWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pieCenterLabel: {
    position: 'absolute',
    textAlign: 'center',
    pointerEvents: 'none'
  },
  pieLegendList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  pieLegendRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.35rem 0.5rem',
    borderRadius: '8px',
    transition: 'background-color 0.15s ease'
  },
  subjectBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1
  },
  thresholdNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.72rem',
    color: '#64748b',
    backgroundColor: '#f8fafc',
    padding: '0.35rem 0.65rem',
    borderRadius: '6px'
  },
  barList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem'
  },
  subjectBarItem: {
    padding: '0.35rem 0.5rem',
    borderRadius: '8px',
    transition: 'background-color 0.15s ease'
  },
  subjectLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem'
  },
  subjectCode: {
    fontSize: '0.72rem',
    fontWeight: 800,
    backgroundColor: '#e2e8f0',
    color: '#334155',
    padding: '0.1rem 0.4rem',
    borderRadius: '4px'
  },
  subjectName: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#1e293b'
  },
  barTrack: {
    position: 'relative',
    height: '10px',
    backgroundColor: '#f1f5f9',
    borderRadius: '9999px',
    overflow: 'hidden'
  },
  thresholdLine: {
    position: 'absolute',
    left: '75%',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: '#ef4444',
    zIndex: 2,
    boxShadow: '0 0 4px rgba(239, 68, 68, 0.5)'
  },
  barFill: {
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.4s ease'
  },
  riskGraphContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flex: 1
  },
  stackedRiskBar: {
    height: '16px',
    width: '100%',
    borderRadius: '9999px',
    overflow: 'hidden',
    display: 'flex',
    backgroundColor: '#f1f5f9'
  },
  riskBreakdownList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem'
  },
  riskItemCard: {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid var(--border-light)'
  },
  mlInsightBox: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    backgroundColor: '#e0f2fe',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '0.6rem 0.75rem'
  },
  contentSplit: {
    display: 'grid',
    gridTemplateColumns: '2.5fr 1fr',
    gap: '1.5rem'
  }
};
