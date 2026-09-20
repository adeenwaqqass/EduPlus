import React from 'react';
import { ArrowLeft, Mail, Phone, Calendar, User, BookOpen, AlertCircle } from 'lucide-react';

export default function StudentProfilePage({ student, onBack }) {
  const defaultCourses = [
    { code: 'CS-301', title: 'Introduction to Artificial Intelligence', grade: 'A', score: '98%' },
    { code: 'CS-305', title: 'Software Engineering Principles', grade: 'A-', score: '95%' },
    { code: 'CS-310', title: 'Advanced Database Systems', grade: 'B+', score: '100%' }
  ];

  const defaultNotes = [
    'Student has expressed keen interest in pursuing an independent research study in neural network optimizations for the upcoming Spring term.',
    'Academic standing is monitored; pre-requisites met with zero past academic probation records.'
  ];

  const currentStudent = {
    id: student?.id || 'CS-2024-089',
    name: student?.name || 'Elena Rostova',
    avatar: student?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    department: student?.department || 'Computer Science',
    academicYear: student?.academicYear || 'Junior',
    status: student?.status || 'ACTIVE ENROLLMENT',
    email: student?.email || 'e.rostova@athena.edu',
    phone: student?.phone || '+1 (555) 019-2834',
    admissionTerm: student?.admissionTerm || 'September 2024',
    advisor: student?.advisor || 'Dr. Arthur Pendelton',
    attendance: student?.attendance ?? 97.6,
    attendanceNote: student?.attendanceNote || (student?.attendance > 85 ? 'Missed only 1 lecture this academic term.' : 'Low attendance alert raised.'),
    courses: student?.courses || defaultCourses,
    notes: student?.notes || defaultNotes
  };

  return (
    <div>
      {/* Back Button */}
      <button 
        onClick={onBack} 
        style={styles.backBtn}
      >
        <ArrowLeft size={16} />
        Back to Student Directory
      </button>

      {/* Header Profile Card */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                {currentStudent.name}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {currentStudent.id} • {currentStudent.department}
              </p>
            </div>
          </div>

          <span className="badge badge-active" style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem' }}>
            {currentStudent.status || 'ACTIVE ENROLLMENT'}
          </span>
        </div>
      </div>

      {/* 4-Grid Content Section */}
      <div style={styles.grid}>
        {/* Card 1: Personal Details */}
        <div className="card">
          <h3 style={styles.cardTitle}>Personal Details</h3>
          <div style={styles.detailGroup}>
            <div style={styles.fieldLabel}>EMAIL ADDRESS</div>
            <div style={styles.fieldValue}>{currentStudent.email}</div>
          </div>
          <div style={styles.detailGroup}>
            <div style={styles.fieldLabel}>PHONE NUMBER</div>
            <div style={styles.fieldValue}>{currentStudent.phone}</div>
          </div>
          <div style={styles.detailGroup}>
            <div style={styles.fieldLabel}>ADMISSION TERM</div>
            <div style={styles.fieldValue}>{currentStudent.admissionTerm}</div>
          </div>
          <div style={styles.detailGroup}>
            <div style={styles.fieldLabel}>ACADEMIC ADVISOR</div>
            <div style={styles.fieldValue}>{currentStudent.advisor}</div>
          </div>
        </div>

        {/* Card 2: Enrolled Courses & Term Grades */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={styles.cardTitle}>Enrolled Courses & Term Grades</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {currentStudent.courses.map((c, i) => (
              <div key={i} style={styles.courseRow}>
                <div>
                  <span style={styles.courseCode}>{c.code}</span>
                  <span style={styles.courseTitle}>{c.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#047857', fontSize: '0.9rem' }}>
                    Grade: {c.grade}
                  </span>
                  <span style={{ fontWeight: 500, color: '#64748b', fontSize: '0.85rem' }}>
                    {c.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Attendance Record */}
        <div className="card">
          <h3 style={styles.cardTitle}>Attendance Record</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '0.75rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {currentStudent.attendance}%
            </span>
            <span className="badge badge-active">High Attendance</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {currentStudent.attendanceNote}
          </p>
        </div>

        {/* Card 4: Registrar Advising Notes */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={styles.cardTitle}>Registrar Advising Notes</h3>
          <div style={styles.notesBox}>
            {currentStudent.notes.map((note, idx) => (
              <p key={idx} style={{ marginBottom: idx < currentStudent.notes.length - 1 ? '0.75rem' : 0 }}>
                - {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--primary)',
    marginBottom: '1rem',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginBottom: '1rem'
  },
  detailGroup: {
    marginBottom: '0.9rem'
  },
  fieldLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--text-light)',
    letterSpacing: '0.04em',
    marginBottom: '0.15rem'
  },
  fieldValue: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text-dark)'
  },
  courseRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0'
  },
  courseCode: {
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginRight: '0.75rem',
    fontSize: '0.88rem'
  },
  courseTitle: {
    color: '#475569',
    fontSize: '0.88rem'
  },
  notesBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    fontSize: '0.85rem',
    color: '#475569',
    lineHeight: '1.6',
    border: '1px solid #e2e8f0'
  }
};
