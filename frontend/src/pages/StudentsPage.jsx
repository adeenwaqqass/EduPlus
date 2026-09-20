import React, { useState } from 'react';
import { Plus, Download, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function StudentsPage({ searchTerm, onSelectStudent }) {
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState(['CS-2024-089', 'PHY-2023-012', 'LIT-2025-441']);

  const [students, setStudents] = useState([
    {
      id: 'CS-2024-089',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      department: 'Computer Science',
      academicYear: 'Junior',
      status: 'ACTIVE',
      email: 'e.rostova@athena.edu',
      phone: '+1 (555) 019-2834',
      attendance: 97.6,
      cgpa: 3.85,
      risk: 'Low Risk'
    },
    {
      id: 'PHY-2023-012',
      name: 'Marcus Aurelius',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      department: 'Physics & Engineering',
      academicYear: 'Senior',
      status: 'ACTIVE',
      email: 'm.aurelius@athena.edu',
      phone: '+1 (555) 019-8812',
      attendance: 92.4,
      cgpa: 3.65,
      risk: 'Low Risk'
    },
    {
      id: 'LIT-2025-441',
      name: 'Lydia Vance',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      department: 'English Literature',
      academicYear: 'Sophomore',
      status: 'PENDING',
      email: 'l.vance@athena.edu',
      phone: '+1 (555) 019-4410',
      attendance: 78.0,
      cgpa: 2.90,
      risk: 'Medium Risk'
    },
    {
      id: 'CS-2024-112',
      name: 'Siddharth Nair',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      department: 'Computer Science',
      academicYear: 'Junior',
      status: 'ACTIVE',
      email: 's.nair@athena.edu',
      phone: '+1 (555) 019-5521',
      attendance: 64.5,
      cgpa: 2.40,
      risk: 'High Risk'
    },
    {
      id: 'BIO-2026-004',
      name: 'Gabriela Cortese',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'Biology',
      academicYear: 'Freshman',
      status: 'INACTIVE',
      email: 'g.cortese@athena.edu',
      phone: '+1 (555) 019-9923',
      attendance: 55.0,
      cgpa: 2.10,
      risk: 'High Risk'
    }
  ]);

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                          s.id.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                          s.department.toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesDept = departmentFilter === 'All' || s.department.includes(departmentFilter);
    const matchesYear = yearFilter === 'All' || s.academicYear === yearFilter;
    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div>
      {/* Filters & Actions Bar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Filters:</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Department:</span>
              <select
                className="select-input"
                value={departmentFilter}
                onChange={e => setDepartmentFilter(e.target.value)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
              >
                <option value="All">All</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics & Engineering</option>
                <option value="English Literature">English Literature</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Academic Year:</span>
              <select
                className="select-input"
                value={yearFilter}
                onChange={e => setYearFilter(e.target.value)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
              >
                <option value="All">All</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary">
              <Download size={15} />
              Export CSV
            </button>
            <button className="btn btn-primary">
              <Plus size={15} />
              Add New Student
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Action Alert Strip */}
      {selectedIds.length > 0 && (
        <div style={styles.bulkStrip}>
          <span style={{ fontWeight: 600, color: '#047857', fontSize: '0.88rem' }}>
            {selectedIds.length} Students Selected
          </span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={styles.bulkLink}>Bulk Enroll</button>
            <button style={{ ...styles.bulkLink, color: '#b91c1c' }}>Delete Records</button>
          </div>
        </div>
      )}

      {/* Student Directory Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === students.length}
                    onChange={toggleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th>Student Name & ID</th>
                <th>Department</th>
                <th>Academic Year</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isSelected = selectedIds.includes(student.id);
                return (
                  <tr key={student.id} style={{ backgroundColor: isSelected ? '#f0fdf4' : undefined }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(student.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.92rem' }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>
                          {student.id}
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#334155', fontWeight: 500 }}>
                      {student.department}
                    </td>
                    <td style={{ color: '#475569' }}>
                      {student.academicYear}
                    </td>
                    <td>
                      <span className={`badge badge-${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => onSelectStudent && onSelectStudent(student)}
                        style={{
                          color: 'var(--primary)',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px'
                        }}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div style={styles.pagination}>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Showing 1-{filteredStudents.length} of 128 students
          </span>
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
              Previous
            </button>
            <button className="btn btn-primary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', minWidth: '32px' }}>
              1
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', minWidth: '32px' }}>
              2
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  bulkStrip: {
    backgroundColor: '#ccfbf1',
    border: '1px solid #99f6e4',
    borderRadius: '10px',
    padding: '0.65rem 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem'
  },
  bulkLink: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#0f766e',
    cursor: 'pointer'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.9rem 1.25rem',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: '#ffffff'
  }
};
