import React, { useState } from 'react';
import { Plus, Mail, BookOpen, UserPlus, X } from 'lucide-react';

export default function FacultyPage({ searchTerm }) {
  const [showModal, setShowModal] = useState(false);
  const [facultyList, setFacultyList] = useState([
    {
      id: 'FAC-01',
      name: 'Dr. Arthur Pendelton',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      department: 'Computer Science',
      designation: 'Professor & Chair',
      email: 'a.pendelton@athena.edu',
      courses: ['CS-301', 'CS-401']
    },
    {
      id: 'FAC-02',
      name: 'Prof. Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      department: 'Physics',
      designation: 'Associate Professor',
      email: 's.jenkins@athena.edu',
      courses: ['PHY-102', 'PHY-201']
    },
    {
      id: 'FAC-03',
      name: 'Dr. Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      department: 'Biology',
      designation: 'Assistant Professor',
      email: 'r.green@athena.edu',
      courses: ['BIO-204']
    },
    {
      id: 'FAC-04',
      name: 'Prof. Alan Poe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'English Literature',
      designation: 'Lecturer',
      email: 'a.poe@athena.edu',
      courses: ['LIT-202']
    }
  ]);

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    email: '',
    courses: ''
  });

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.email) return;

    const created = {
      id: `FAC-0${facultyList.length + 1}`,
      name: newFaculty.name,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      department: newFaculty.department,
      designation: newFaculty.designation,
      email: newFaculty.email,
      courses: newFaculty.courses ? newFaculty.courses.split(',').map(c => c.trim()) : ['CS-101']
    };

    setFacultyList([...facultyList, created]);
    setShowModal(false);
    setNewFaculty({ name: '', department: 'Computer Science', designation: 'Assistant Professor', email: '', courses: '' });
  };

  const filtered = facultyList.filter(f => 
    f.name.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    f.department.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    f.email.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div>
      {/* Page Action Header */}
      <div className="page-heading">
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            Active Staff & Educators
          </h3>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Onboard New Faculty
        </button>
      </div>

      {/* Main Faculty Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Faculty Member</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email Contact</th>
                <th>Assigned Courses</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((faculty) => (
                <tr key={faculty.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                        {faculty.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: '#334155', fontWeight: 500 }}>
                    {faculty.department}
                  </td>
                  <td style={{ color: '#64748b' }}>
                    {faculty.designation}
                  </td>
                  <td style={{ color: '#475569' }}>
                    {faculty.email}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {faculty.courses.map((course, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: '#f1f5f9',
                            color: '#334155',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No faculty members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard New Faculty Modal */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.container}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Onboard New Faculty Member</h3>
              <button onClick={() => setShowModal(false)} style={{ color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddFaculty} style={modalStyles.form}>
              <div>
                <label style={modalStyles.label}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Robert Vance"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newFaculty.name}
                  onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })}
                />
              </div>

              <div>
                <label style={modalStyles.label}>Department</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={newFaculty.department}
                  onChange={e => setNewFaculty({ ...newFaculty, department: e.target.value })}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>

              <div>
                <label style={modalStyles.label}>Designation</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={newFaculty.designation}
                  onChange={e => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                >
                  <option value="Professor & Chair">Professor & Chair</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </div>

              <div>
                <label style={modalStyles.label}>Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="r.vance@athena.edu"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newFaculty.email}
                  onChange={e => setNewFaculty({ ...newFaculty, email: e.target.value })}
                />
              </div>

              <div>
                <label style={modalStyles.label}>Assigned Courses (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. CS-201, CS-302"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newFaculty.courses}
                  onChange={e => setNewFaculty({ ...newFaculty, courses: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Educator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    width: '460px',
    maxWidth: '90%',
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e2e8f0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '0.35rem'
  }
};
