import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  FileSpreadsheet, 
  Award, 
  CreditCard, 
  UserPlus, 
  ClipboardList, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Save, 
  FileText, 
  X, 
  AlertCircle, 
  Sparkles, 
  DollarSign, 
  Check, 
  Download,
  BookOpenCheck
} from 'lucide-react';
import '../components/faculty-admin/FacultyAdmin.css';

export default function AdminPortalPage({ searchTerm = '' }) {
  // Navigation Tabs:
  // 'timetable' | 'external-exam' | 'marksheets' | 'course-registration' | 'extra-subject' | 'edit-fees' | 'admit-students' | 'feedback-forms'
  const [activeTab, setActiveTab] = useState('timetable');
  const [bannerMessage, setBannerMessage] = useState(null);

  const showBanner = (text, type = 'success') => {
    setBannerMessage({ text, type });
    setTimeout(() => setBannerMessage(null), 4000);
  };

  // ==========================================
  // MOCK STATE DATA FOR ADMIN FUNCTIONS
  // ==========================================

  // 1. Timetables List
  const [timetables, setTimetables] = useState([
    {
      id: 'TT-101',
      cohort: '4th Year / Final - Class A',
      department: 'Computer Science & Engineering',
      academicSession: 'WINTER 2026',
      uploadedBy: 'Dr. James Miller (HOD)',
      status: 'Published Active',
      updatedDate: 'Yesterday'
    }
  ]);

  // Timetable Form State
  const [ttForm, setTtForm] = useState({
    cohort: '4th Year / Final - Class A',
    department: 'Computer Science & Engineering',
    session: 'WINTER 2026',
    notes: 'Official Winter 2026 Department Schedule'
  });

  // 2. External Exam Results & Marksheets
  const [studentExamRecords, setStudentExamRecords] = useState([
    {
      id: 'STU-101',
      rollNo: '23ACOE1121163',
      name: 'ADEEN WAQQAS AHMED SHAHZAD',
      cohort: '4th Year / Final (Class A)',
      externalScore: 54, // out of 60
      practicalScore: 38, // out of 40
      totalScore: 92, // out of 100
      sgpa: 9.4,
      cgpa: 9.2,
      marksheetStatus: 'Published & Verified',
      agreedTuitionFee: 120000,
      discountScholarship: 20000,
      finalPayableFee: 100000,
      extraSubjects: []
    },
    {
      id: 'STU-102',
      rollNo: 'CS-2024-112',
      name: 'Siddharth Nair',
      cohort: '4th Year / Final (Class A)',
      externalScore: 42,
      practicalScore: 32,
      totalScore: 74,
      sgpa: 7.6,
      cgpa: 7.4,
      marksheetStatus: 'Draft Pending Lock',
      agreedTuitionFee: 120000,
      discountScholarship: 10000,
      finalPayableFee: 110000,
      extraSubjects: ['CS-201 Data Structures (Backlog)']
    }
  ]);

  // 3. Registered Courses (Subject Allotment)
  const [registeredCourses, setRegisteredCourses] = useState([
    {
      id: 'CRS-401',
      code: 'CS-401',
      title: 'Advanced Web & Cloud Engineering',
      cohort: '4th Year / Final (Class A)',
      credits: 4,
      facultyAssigned: 'Prof. Sarah Jenkins'
    },
    {
      id: 'CRS-402',
      code: 'CS-402',
      title: 'Machine Learning & Neural Networks',
      cohort: '4th Year / Final (Class A)',
      credits: 4,
      facultyAssigned: 'Dr. Arthur Pendelton'
    }
  ]);

  // Course Registration Form
  const [courseForm, setCourseForm] = useState({
    code: '',
    title: '',
    cohort: '4th Year / Final (Class A)',
    credits: 4,
    facultyAssigned: 'Prof. Sarah Jenkins'
  });

  // Extra Subject Assignment Form
  const [extraSubjectForm, setExtraSubjectForm] = useState({
    studentId: 'STU-102',
    subjectName: 'CS-201 Data Structures (Winter Backlog)'
  });

  // Edit Fee Form State
  const [feeEditStudentId, setFeeEditStudentId] = useState('STU-101');
  const [feeForm, setFeeForm] = useState({
    baseFee: 120000,
    discount: 20000,
    notes: 'Academic Merit Scholarship Granted'
  });

  // 4. Pending Student Admissions
  const [pendingApplicants, setPendingApplicants] = useState([
    {
      id: 'APP-901',
      name: 'Rahul Deshpande',
      email: 'rahul.d@gmail.com',
      stream: 'B.Tech Computer Engineering',
      appliedYear: '1st Year 2026',
      highSchoolPct: '94.2%',
      documentsStatus: 'Verified OK'
    },
    {
      id: 'APP-902',
      name: 'Neha Kulkarni',
      email: 'neha.k@gmail.com',
      stream: 'B.Tech Artificial Intelligence',
      appliedYear: '1st Year 2026',
      highSchoolPct: '91.8%',
      documentsStatus: 'Verified OK'
    }
  ]);

  // 5. Feedback Forms Manager
  const [feedbackForms, setFeedbackForms] = useState([
    {
      id: 'FB-101',
      title: 'Mid-Semester Course & Teaching Evaluation 2026',
      targetCohort: 'All CS Engineering Students',
      status: 'Active Live',
      responsesCount: 142
    }
  ]);

  // Feedback Form State
  const [newFbForm, setNewFbForm] = useState({
    title: '',
    targetCohort: '4th Year / Final (Class A)',
    type: 'Course & Faculty Review'
  });

  // ==========================================
  // HANDLERS
  // ==========================================

  // Upload Timetable
  const handleUploadTimetable = (e) => {
    e.preventDefault();
    const newTt = {
      id: `TT-${Math.floor(100 + Math.random() * 900)}`,
      cohort: ttForm.cohort,
      department: ttForm.department,
      academicSession: ttForm.session,
      uploadedBy: 'Dr. James Miller (HOD)',
      status: 'Published Active',
      updatedDate: 'Just Now'
    };
    setTimetables([newTt, ...timetables]);
    showBanner(`[ADMIN] Official Class Timetable published for ${ttForm.cohort}!`);
  };

  // Upload External Score
  const handleExternalScoreChange = (studentId, field, val) => {
    const num = parseInt(val) || 0;
    setStudentExamRecords(prev => prev.map(s => {
      if (s.id === studentId) {
        const ext = field === 'externalScore' ? num : s.externalScore;
        const prac = field === 'practicalScore' ? num : s.practicalScore;
        const tot = ext + prac;
        return {
          ...s,
          [field]: num,
          totalScore: tot,
          sgpa: parseFloat((tot / 10).toFixed(1))
        };
      }
      return s;
    }));
  };

  // Publish Marksheets
  const handlePublishMarksheets = () => {
    setStudentExamRecords(prev => prev.map(s => ({ ...s, marksheetStatus: 'Published & Verified' })));
    showBanner(`[ADMIN] All official semester Marksheets published to student accounts!`);
  };

  // Register Course for Class
  const handleRegisterCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseForm.code || !courseForm.title) return;

    const created = {
      id: `CRS-${Math.floor(100 + Math.random() * 900)}`,
      code: courseForm.code,
      title: courseForm.title,
      cohort: courseForm.cohort,
      credits: parseInt(courseForm.credits) || 4,
      facultyAssigned: courseForm.facultyAssigned
    };

    setRegisteredCourses([created, ...registeredCourses]);
    showBanner(`[ADMIN] Registered new course "${created.code} - ${created.title}" for ${created.cohort}!`);
    setCourseForm({ code: '', title: '', cohort: '4th Year / Final (Class A)', credits: 4, facultyAssigned: 'Prof. Sarah Jenkins' });
  };

  // Assign Extra Subject / Backlog
  const handleAssignExtraSubjectSubmit = (e) => {
    e.preventDefault();
    const st = studentExamRecords.find(s => s.id === extraSubjectForm.studentId);
    if (!st) return;

    setStudentExamRecords(prev => prev.map(s => {
      if (s.id === extraSubjectForm.studentId) {
        if (!s.extraSubjects.includes(extraSubjectForm.subjectName)) {
          return { ...s, extraSubjects: [...s.extraSubjects, extraSubjectForm.subjectName] };
        }
      }
      return s;
    }));

    showBanner(`[ADMIN] Added extra subject "${extraSubjectForm.subjectName}" to ${st.name}!`);
  };

  // Edit Student Fees
  const handleSaveStudentFee = (e) => {
    e.preventDefault();
    const st = studentExamRecords.find(s => s.id === feeEditStudentId);
    if (!st) return;

    const finalFee = Math.max(0, feeForm.baseFee - feeForm.discount);
    setStudentExamRecords(prev => prev.map(s => {
      if (s.id === feeEditStudentId) {
        return {
          ...s,
          agreedTuitionFee: feeForm.baseFee,
          discountScholarship: feeForm.discount,
          finalPayableFee: finalFee
        };
      }
      return s;
    }));

    showBanner(`[ADMIN] Updated customized fee structure for ${st.name}: Final Payable $${finalFee}`);
  };

  // Admit Pending Student
  const handleAdmitStudent = (applicant) => {
    setPendingApplicants(prev => prev.filter(a => a.id !== applicant.id));
    showBanner(`[ADMIN] Approved & Admitted applicant "${applicant.name}" into ${applicant.stream}! Roll Number generated.`);
  };

  // Upload Feedback Form
  const handleCreateFeedbackForm = (e) => {
    e.preventDefault();
    if (!newFbForm.title) return;

    const fb = {
      id: `FB-${Math.floor(100 + Math.random() * 900)}`,
      title: newFbForm.title,
      targetCohort: newFbForm.targetCohort,
      status: 'Active Live',
      responsesCount: 0
    };

    setFeedbackForms([fb, ...feedbackForms]);
    showBanner(`[ADMIN] Uploaded & Published Feedback Survey "${fb.title}"!`);
    setNewFbForm({ title: '', targetCohort: '4th Year / Final (Class A)', type: 'Course & Faculty Review' });
  };

  return (
    <div className="faculty-admin-container">
      {/* Banner */}
      {bannerMessage && (
        <div style={{ backgroundColor: '#e0e7ff', color: '#3730a3', border: '1px solid #c7d2fe', padding: '0.85rem 1.25rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CheckCircle2 size={18} />
          <span>{bannerMessage.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="fa-header-card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' }}>
        <div className="fa-title-group">
          <h2>
            <ShieldCheck size={26} color="#ffffff" />
            <span>Admin & Department Management Portal (HOD Office)</span>
          </h2>
          <p>
            Welcome, Dr. James Miller (Head of Department & Administrator). Manage timetables, publish university end-sem scores, issue official marksheets, register courses, customize student fees, approve admissions, and deploy feedback surveys.
          </p>
        </div>

        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
          Office of Controller of Examinations & Registrar
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="fa-tabs-bar">
        <button className={`fa-tab-btn admin-tab ${activeTab === 'timetable' ? 'active' : ''}`} onClick={() => setActiveTab('timetable')}>
          <Calendar size={18} />
          <span>Upload Timetable</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'external-exam' ? 'active' : ''}`} onClick={() => setActiveTab('external-exam')}>
          <Award size={18} />
          <span>External End-Sem Marks</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'marksheets' ? 'active' : ''}`} onClick={() => setActiveTab('marksheets')}>
          <FileSpreadsheet size={18} />
          <span>Publish Marksheets</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'course-registration' ? 'active' : ''}`} onClick={() => setActiveTab('course-registration')}>
          <BookOpenCheck size={18} />
          <span>Register Courses for Class</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'extra-subject' ? 'active' : ''}`} onClick={() => setActiveTab('extra-subject')}>
          <Layers size={18} />
          <span>Assign Extra / Backlog Subject</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'edit-fees' ? 'active' : ''}`} onClick={() => setActiveTab('edit-fees')}>
          <CreditCard size={18} />
          <span>Edit Student Fees</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'admit-students' ? 'active' : ''}`} onClick={() => setActiveTab('admit-students')}>
          <UserPlus size={18} />
          <span>Accept & Admit Students</span>
        </button>

        <button className={`fa-tab-btn admin-tab ${activeTab === 'feedback-forms' ? 'active' : ''}`} onClick={() => setActiveTab('feedback-forms')}>
          <ClipboardList size={18} />
          <span>Upload Feedback Forms</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: UPLOAD TIMETABLE */}
      {/* ========================================================================= */}
      {activeTab === 'timetable' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
              Upload Department Timetable Schedule
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Upload and publish master class timetable for department sections.
            </p>

            <form onSubmit={handleUploadTimetable} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Target Cohort & Section</label>
                <input
                  type="text"
                  required
                  className="text-input"
                  style={{ width: '100%' }}
                  value={ttForm.cohort}
                  onChange={(e) => setTtForm({ ...ttForm, cohort: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Academic Department</label>
                <input
                  type="text"
                  required
                  className="text-input"
                  style={{ width: '100%' }}
                  value={ttForm.department}
                  onChange={(e) => setTtForm({ ...ttForm, department: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Academic Session</label>
                <input
                  type="text"
                  required
                  className="text-input"
                  style={{ width: '100%' }}
                  value={ttForm.session}
                  onChange={(e) => setTtForm({ ...ttForm, session: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }}>
                <Calendar size={16} />
                Publish Official Timetable
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
              Active Published Timetables
            </h3>
            {timetables.map(tt => (
              <div key={tt.id} style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{tt.cohort}</span>
                  <span className="status-pill qualified">{tt.status}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem' }}>
                  Dept: {tt.department} • Session: {tt.academicSession}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                  Uploaded by: {tt.uploadedBy} • {tt.updatedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EXTERNAL END-SEM MARKS */}
      {/* ========================================================================= */}
      {activeTab === 'external-exam' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="#4338ca" />
                Upload External End-Semester University Exam Scores (Admin / HOD Only)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Admin authority to enter <strong>External End-Semester Written Exam marks (out of 60)</strong> and Board Practical scores (out of 40). Total End-Sem = 100 marks.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.csv';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      showBanner(`🎉 End-Sem Results / Marksheet "${file.name}" uploaded successfully by Admin!`);
                    }
                  };
                  input.click();
                }}
              >
                <Download size={16} style={{ transform: 'rotate(180deg)' }} />
                Upload Endsem Marksheets / Results File
              </button>
              <button className="btn btn-secondary" onClick={() => showBanner(`External Exam Scores locked and saved!`)}>
                <Save size={16} />
                Save External Scores
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#e0e7ff', border: '1px solid #c7d2fe', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.82rem', color: '#3730a3', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} />
            <span>Admin Authority Notice: External End-Semester Written Examination marks (out of 60) and official Result Marksheets (PDF/Excel) can only be entered or uploaded by Admin / HOD. Faculty members handle internal assessment (out of 20 per unit test).</span>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>External Written (Out of 60)</th>
                  <th>Board Practical (Out of 40)</th>
                  <th>Total End-Sem Score (100)</th>
                  <th>Calculated SGPA</th>
                </tr>
              </thead>
              <tbody>
                {studentExamRecords.map(st => (
                  <tr key={st.id}>
                    <td style={{ fontWeight: 700 }}>{st.rollNo}</td>
                    <td style={{ fontWeight: 600 }}>{st.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input
                          type="number"
                          min="0"
                          max="60"
                          className="marks-input"
                          style={{ borderColor: '#6366f1', fontWeight: '800' }}
                          value={st.externalScore}
                          onChange={(e) => handleExternalScoreChange(st.id, 'externalScore', e.target.value)}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>/ 60</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input
                          type="number"
                          min="0"
                          max="40"
                          className="marks-input"
                          style={{ borderColor: '#6366f1', fontWeight: '800' }}
                          value={st.practicalScore}
                          onChange={(e) => handleExternalScoreChange(st.id, 'practicalScore', e.target.value)}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>/ 40</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 800, color: '#0f172a' }}>{st.totalScore} / 100</td>
                    <td>
                      <span className="status-pill qualified" style={{ fontSize: '0.85rem' }}>
                        SGPA {st.sgpa}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PUBLISH MARKSHEETS */}
      {/* ========================================================================= */}
      {activeTab === 'marksheets' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileSpreadsheet size={20} color="#4338ca" />
                Upload & Issue Official Semester Marksheets (Admin / HOD)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Admin authority to upload end-sem results files (PDF/Excel), lock end-sem scores (out of 60), compute final grades, and publish marksheets.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.csv';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      showBanner(`🎉 End-Sem Results File "${file.name}" uploaded successfully!`);
                    }
                  };
                  input.click();
                }}
              >
                <Download size={15} style={{ transform: 'rotate(180deg)' }} />
                <span>Upload Result File</span>
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }} onClick={handlePublishMarksheets}>
                <Award size={16} />
                Publish All Marksheets Now
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Total Marks (100)</th>
                  <th>SGPA</th>
                  <th>CGPA</th>
                  <th>Marksheet Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentExamRecords.map(st => (
                  <tr key={st.id}>
                    <td style={{ fontWeight: 700 }}>{st.rollNo}</td>
                    <td style={{ fontWeight: 600 }}>{st.name}</td>
                    <td style={{ fontWeight: 800 }}>{st.totalScore} / 100</td>
                    <td style={{ fontWeight: 700, color: '#059669' }}>{st.sgpa}</td>
                    <td style={{ fontWeight: 700, color: '#4338ca' }}>{st.cgpa}</td>
                    <td>
                      <span className={`status-pill ${st.marksheetStatus.includes('Published') ? 'qualified' : 'at-risk'}`}>
                        {st.marksheetStatus}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.65rem', fontSize: '0.74rem' }} onClick={() => showBanner(`Downloaded official transcript PDF for ${st.rollNo}`)}>
                        <Download size={13} />
                        View Marksheet
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: REGISTER COURSES */}
      {/* ========================================================================= */}
      {activeTab === 'course-registration' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
              Register Course & Allot Subject to Class
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Admin registers subject curriculum for a class section and assigns the lead faculty.
            </p>

            <form onSubmit={handleRegisterCourseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Subject Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS-403"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={courseForm.code}
                  onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Subject Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Operating Systems"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Course Credits</label>
                <input
                  type="number"
                  required
                  className="text-input"
                  style={{ width: '100%' }}
                  value={courseForm.credits}
                  onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Assign Faculty Member</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={courseForm.facultyAssigned}
                  onChange={(e) => setCourseForm({ ...courseForm, facultyAssigned: e.target.value })}
                >
                  <option value="Prof. Sarah Jenkins">Prof. Sarah Jenkins (Computer Science)</option>
                  <option value="Dr. Arthur Pendelton">Dr. Arthur Pendelton (AI & ML)</option>
                  <option value="Dr. Rachel Green">Dr. Rachel Green (Data Systems)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }}>
                <BookOpenCheck size={16} />
                Register Course for Class
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
              Registered Class Curricula
            </h3>
            {registeredCourses.map(c => (
              <div key={c.id} style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>{c.code} - {c.title}</span>
                  <span className="status-pill qualified">{c.credits} Credits</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem' }}>
                  Cohort: {c.cohort}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#4338ca', fontWeight: 700, marginTop: '0.35rem' }}>
                  Lead Educator: {c.facultyAssigned}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ASSIGN EXTRA / BACKLOG SUBJECT */}
      {/* ========================================================================= */}
      {activeTab === 'extra-subject' && (
        <div className="card" style={{ padding: '1.75rem', maxWidth: '650px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
            Assign Extra Subject or Backlog Course to Specific Student
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Admin can assign an extra backlog course or elective subject to an individual student alongside registered courses.
          </p>

          <form onSubmit={handleAssignExtraSubjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="form-label">Select Student</label>
              <select
                className="select-input"
                style={{ width: '100%' }}
                value={extraSubjectForm.studentId}
                onChange={(e) => setExtraSubjectForm({ ...extraSubjectForm, studentId: e.target.value })}
              >
                {studentExamRecords.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rollNo}) - {s.cohort}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Extra Subject / Backlog Course Name</label>
              <input
                type="text"
                required
                placeholder="e.g. CS-201 Data Structures (Winter Backlog)"
                className="text-input"
                style={{ width: '100%' }}
                value={extraSubjectForm.subjectName}
                onChange={(e) => setExtraSubjectForm({ ...extraSubjectForm, subjectName: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }}>
              <Layers size={16} />
              Assign Extra Subject to Student
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: EDIT STUDENT FEES */}
      {/* ========================================================================= */}
      {activeTab === 'edit-fees' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
              Customize & Edit Individual Student Fee Dues
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Admin can edit fee structures per student, apply custom scholarship discounts, or grant waivers.
            </p>

            <form onSubmit={handleSaveStudentFee} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Select Student</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={feeEditStudentId}
                  onChange={(e) => {
                    setFeeEditStudentId(e.target.value);
                    const st = studentExamRecords.find(s => s.id === e.target.value);
                    if (st) setFeeForm({ baseFee: st.agreedTuitionFee, discount: st.discountScholarship, notes: 'Updated by HOD' });
                  }}
                >
                  {studentExamRecords.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Base Agreed Tuition Fee ($)</label>
                <input
                  type="number"
                  required
                  className="text-input"
                  style={{ width: '100%' }}
                  value={feeForm.baseFee}
                  onChange={(e) => setFeeForm({ ...feeForm, baseFee: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <label className="form-label">Scholarship Discount / Waiver ($)</label>
                <input
                  type="number"
                  required
                  className="text-input"
                  style={{ width: '100%' }}
                  value={feeForm.discount}
                  onChange={(e) => setFeeForm({ ...feeForm, discount: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div style={{ padding: '0.85rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 700 }}>FINAL CALCULATED PAYABLE FEE:</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  ${Math.max(0, feeForm.baseFee - feeForm.discount)}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }}>
                <CreditCard size={16} />
                Save Custom Fee Structure
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
              Student Fee Dues Summary
            </h3>
            {studentExamRecords.map(s => (
              <div key={s.id} style={{ backgroundColor: '#f8fafc', padding: '1.1rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                  <span>{s.name}</span>
                  <span style={{ color: '#059669' }}>${s.finalPayableFee}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Base Tuition: ${s.agreedTuitionFee} • Discount: -${s.discountScholarship}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ACCEPT & ADMIT STUDENTS */}
      {/* ========================================================================= */}
      {activeTab === 'admit-students' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
            Pending Admission Applications Desk
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Admin can review high school scores, verify uploaded credentials, and approve & admit students into departments.
          </p>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Email</th>
                  <th>Target Stream</th>
                  <th>High School %</th>
                  <th>Document Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApplicants.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 700 }}>{app.name}</td>
                    <td>{app.email}</td>
                    <td style={{ fontWeight: 600 }}>{app.stream}</td>
                    <td style={{ fontWeight: 800, color: '#059669' }}>{app.highSchoolPct}</td>
                    <td>
                      <span className="status-pill qualified">{app.documentsStatus}</span>
                    </td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem', backgroundColor: '#059669' }} onClick={() => handleAdmitStudent(app)}>
                        <UserPlus size={14} />
                        Approve & Admit Student
                      </button>
                    </td>
                  </tr>
                ))}
                {pendingApplicants.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      All pending admission applications have been processed and admitted!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: UPLOAD FEEDBACK FORMS */}
      {/* ========================================================================= */}
      {activeTab === 'feedback-forms' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
              Create & Upload Student Feedback Form
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Admin can deploy feedback surveys for course evaluations and faculty teaching reviews.
            </p>

            <form onSubmit={handleCreateFeedbackForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Feedback Form Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Course & Faculty Review 2026"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newFbForm.title}
                  onChange={(e) => setNewFbForm({ ...newFbForm, title: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Target Student Cohort</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4th Year / Final (Class A)"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={newFbForm.targetCohort}
                  onChange={(e) => setNewFbForm({ ...newFbForm, targetCohort: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4338ca', borderColor: '#3730a3' }}>
                <ClipboardList size={16} />
                Upload & Publish Feedback Survey
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
              Active Published Feedback Surveys
            </h3>
            {feedbackForms.map(fb => (
              <div key={fb.id} style={{ backgroundColor: '#f8fafc', padding: '1.1rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>{fb.title}</span>
                  <span className="status-pill qualified">{fb.status}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem' }}>
                  Target: {fb.targetCohort} • Responses Collected: <strong>{fb.responsesCount}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
