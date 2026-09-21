import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  UserCheck, 
  FileText,
  TrendingUp
} from 'lucide-react';

export default function StudentDashboardPage({ studentData }) {
  // Default fallback student profile if none passed
  const student = studentData || {
    name: 'Alex Rivera',
    studentId: 'STU-2024-001',
    department: 'Computer Science & Engineering',
    year: 'Senior (3rd Year)',
    gpa: '3.65',
    attendance: 88.5,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    advisor: 'Dr. James Miller'
  };

  const studentCourses = [
    { code: 'CS-101', title: 'Advanced Data Structures', professor: 'Prof. Sarah Jenkins', attendance: 92, grade: 'A', status: 'On Track' },
    { code: 'CS-202', title: 'Database Systems & SQL', professor: 'Dr. Alan Turing', attendance: 88, grade: 'A-', status: 'On Track' },
    { code: 'MATH-301', title: 'Linear Algebra & Probability', professor: 'Dr. Emily Noether', attendance: 85, grade: 'B+', status: 'On Track' },
    { code: 'EE-201', title: 'Digital Logic Circuits', professor: 'Prof. Marcus Vance', attendance: 74, grade: 'C+', status: 'Watchlist (<75%)' }
  ];

  const upcomingDeadlines = [
    { title: 'Data Structures Assignment 3', course: 'CS-101', dueDate: 'Tomorrow, 11:59 PM', type: 'Assignment' },
    { title: 'Database Systems Midterm Exam', course: 'CS-202', dueDate: 'Sep 22, 2026', type: 'Exam' },
    { title: 'Digital Circuits Lab Report 4', course: 'EE-201', dueDate: 'Sep 25, 2026', type: 'Lab Report' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Student Welcome Hero Card */}
      <div className="card" style={styles.heroCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-active" style={{ padding: '0.25rem 0.65rem' }}>STUDENT PORTAL</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {student.studentId}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
              Welcome back, {student.name}!
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {student.department} • {student.year} • Advisor: {student.advisor}
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Quick Stat Cards */}
      <div style={styles.statGrid}>
        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #00a884' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>Overall Attendance</span>
            <CheckCircle2 size={18} color="#00a884" />
          </div>
          <div style={{ ...styles.statNumber, color: '#047857' }}>{student.attendance}%</div>
          <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600 }}>Above Mandatory 75% Cutoff</span>
        </div>

        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>Semester SGPA</span>
            <Award size={18} color="#0284c7" />
          </div>
          <div style={{ ...styles.statNumber, color: '#0369a1' }}>8.25</div>
          <span style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 600 }}>Scale: 10.0 (WINTER 2026)</span>
        </div>

        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>Cumulative CGPA</span>
            <GraduationCap size={18} color="#7c3aed" />
          </div>
          <div style={{ ...styles.statNumber, color: '#6d28d9' }}>{student.gpa || '7.85'}</div>
          <span style={{ fontSize: '0.78rem', color: '#6d28d9', fontWeight: 600 }}>UGC 10-Point Scale (First Class)</span>
        </div>

        <div className="card" style={{ ...styles.statCard, borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.statTitle}>Active Courses</span>
            <BookOpen size={18} color="#f59e0b" />
          </div>
          <div style={{ ...styles.statNumber, color: '#b45309' }}>5</div>
          <span style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 600 }}>19 Total Credits Enrolled</span>
        </div>
      </div>

      {/* Enrolled Courses & Attendance Grid */}
      <div style={styles.mainGrid}>
        {/* Left: My Courses & Subject Attendance */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={styles.cardHeaderRow}>
            <div>
              <h3 style={styles.cardHeaderTitle}>My Enrolled Courses & Attendance</h3>
              <p style={styles.cardHeaderSubtitle}>Real-time attendance logs & current academic standing</p>
            </div>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Course Code & Title</th>
                  <th>Faculty Instructor</th>
                  <th>Attendance %</th>
                  <th>Current Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentCourses.map((c) => {
                  const isWarning = c.attendance < 75;
                  return (
                    <tr key={c.code}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.88rem' }}>
                          {c.code}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {c.title}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.84rem', color: '#475569' }}>
                        {c.professor}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            color: isWarning ? '#dc2626' : '#047857'
                          }}>
                            {c.attendance}%
                          </span>
                          <div style={{ flex: 1, height: '6px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', minWidth: '60px' }}>
                            <div style={{
                              height: '100%',
                              width: `${c.attendance}%`,
                              backgroundColor: isWarning ? '#ef4444' : '#00a884'
                            }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={styles.gradeBadge}>{c.grade}</span>
                      </td>
                      <td>
                        <span className={`badge badge-${isWarning ? 'inactive' : 'active'}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Upcoming Deadlines & Timetable */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Upcoming Deadlines */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="#00a884" />
              <span>Upcoming Submissions</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcomingDeadlines.map((item, idx) => (
                <div key={idx} style={styles.deadlineCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00a884', backgroundColor: '#e6f7f3', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      {item.course}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{item.type}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#0f172a' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600, marginTop: '0.2rem' }}>
                    Due: {item.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achilles ML Prescriptive Risk Advisory Card */}
          <div className="card" style={{ border: '1.5px solid #6366f1', backgroundColor: '#f5f3ff' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#312e81', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <TrendingUp size={16} color="#4f46e5" />
              <span>🤖 Achilles ML Risk Prescriptions</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Attendance Advice */}
              <div style={{ backgroundColor: '#ffffff', padding: '0.65rem', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#00a884', marginBottom: '0.2rem' }}>
                  📅 Attendance & Detention Risk:
                </div>
                <div style={{ fontSize: '0.76rem', color: '#1e293b', lineHeight: '1.4' }}>
                  Attend <strong>16 lectures</strong> in this/upcoming month to raise attendance <strong>&gt; 75%</strong> and prevent detention.
                </div>
              </div>

              {/* UT2 Target Advice */}
              <div style={{ backgroundColor: '#ffffff', padding: '0.65rem', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#6d28d9', marginBottom: '0.2rem' }}>
                  🎯 Internal Unit Test 2 Target:
                </div>
                <div style={{ fontSize: '0.76rem', color: '#1e293b', lineHeight: '1.4' }}>
                  If scored <strong>10 / 20 in UT1</strong>, score <strong>16 / 20 in UT2</strong> to raise UT average to <strong>13.0/20</strong>.
                </div>
              </div>
            </div>
          </div>

          {/* Academic Advisor Card */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Academic Advisor</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
              Reach out for course registration, grade counseling, or attendance queries.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Dr. James Miller</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>j.miller@athena.edu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heroCard: {
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-color)',
    borderRadius: '14px',
    padding: '1.5rem 2rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #e6f7f3 100%)'
  },
  studentAvatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.25rem'
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
    fontSize: '1.8rem',
    fontWeight: 800,
    color: 'var(--text-dark)',
    margin: '0.35rem 0'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2.5fr 1fr',
    gap: '1.5rem'
  },
  cardHeaderRow: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: '#f8fafc'
  },
  cardHeaderTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
    margin: 0
  },
  cardHeaderSubtitle: {
    fontSize: '0.76rem',
    color: 'var(--text-muted)',
    margin: '0.15rem 0 0 0'
  },
  gradeBadge: {
    display: 'inline-block',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    fontWeight: 800,
    fontSize: '0.84rem',
    backgroundColor: '#f1f5f9',
    color: '#0f172a'
  },
  deadlineCard: {
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid var(--border-light)'
  }
};
