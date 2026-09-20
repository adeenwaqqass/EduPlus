import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Plus, 
  Search, 
  FileText, 
  Printer, 
  Download, 
  Layers, 
  GraduationCap, 
  Clock, 
  Users, 
  X, 
  ShieldCheck, 
  AlertCircle,
  ChevronRight,
  UserCheck,
  Check,
  Filter,
  Upload,
  UploadCloud,
  FileSpreadsheet,
  File,
  Trash2,
  Eye,
  FileCode
} from 'lucide-react';
import CourseActivityPage from './CourseActivityPage';

export default function CoursesPage({ initialTab = 'student-course-reg', searchTerm = '', currentUser }) {
  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  const isOnlyFaculty = currentUser?.role === 'faculty';
  const isAdminOrHod = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student' || (!isFaculty && !isAdminOrHod);

  const [activeTab, setActiveTab] = useState('student-course-reg');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [selectedMinor, setSelectedMinor] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [appliedMinors, setAppliedMinors] = useState(['ai-ml']); // Default registered minor ID

  // Faculty Major/Minor Filter State
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('all');

  const handleToggleCourseApproval = (courseCode) => {
    setRegisteredCourses(prev => prev.map(c => {
      if (c.code === courseCode) {
        const newStatus = c.status === 'APPROVED' ? 'PENDING APPROVAL' : 'APPROVED';
        setUploadSuccessMsg(`HOD/Admin Action: Status of course ${c.code} (${c.title}) set to ${newStatus}.`);
        setTimeout(() => setUploadSuccessMsg(''), 5000);
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  // Upload Semester Course State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [uploadForm, setUploadForm] = useState({
    courseTitle: '',
    semester: 'Semester VII',
    department: 'Dept. of Computer Engineering',
    academicYear: '2026-2027',
    notes: ''
  });

  // Uploaded Semester Course Syllabi & Curriculum Files
  const [uploadedSemesterCourses, setUploadedSemesterCourses] = useState([
    {
      id: 1,
      title: 'CS Semester VII Complete Course Syllabus & Scheme 2026',
      semester: 'Semester VII',
      department: 'Dept. of Computer Engineering',
      academicYear: '2026-2027',
      fileName: 'Sem7_ComputerEngg_Syllabus_2026.pdf',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      uploadedBy: currentUser?.name || 'Dr. James Miller (HOD)',
      uploadDate: 'Sep 18, 2026'
    },
    {
      id: 2,
      title: 'Semester VII Course Evaluation & Credit Distribution Matrix',
      semester: 'Semester VII',
      department: 'Dept. of Computer Engineering',
      academicYear: '2026-2027',
      fileName: 'CS_Sem7_Course_Credit_Matrix.xlsx',
      fileType: 'excel',
      fileSize: '410 KB',
      uploadedBy: 'Dr. Arthur Pendelton',
      uploadDate: 'Sep 15, 2026'
    },
    {
      id: 3,
      title: 'Departmental Elective Course Guidelines & Objectives',
      semester: 'Semester VII',
      department: 'Dept. of Computer Engineering',
      academicYear: '2026-2027',
      fileName: 'Elective_Courses_Specification_Doc.docx',
      fileType: 'word',
      fileSize: '1.1 MB',
      uploadedBy: 'Prof. Sarah Jenkins',
      uploadDate: 'Sep 10, 2026'
    }
  ]);

  const getFileTypeInfo = (fileName) => {
    if (!fileName) return { type: 'file', label: 'FILE', color: '#64748b', bg: '#f1f5f9' };
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') {
      return { type: 'pdf', label: 'PDF DOCUMENT', color: '#be123c', bg: '#ffe4e6' };
    }
    if (ext === 'doc' || ext === 'docx') {
      return { type: 'word', label: 'WORD DOC', color: '#1d4ed8', bg: '#dbeafe' };
    }
    if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return { type: 'excel', label: 'EXCEL SPREADSHEET', color: '#047857', bg: '#d1fae5' };
    }
    return { type: ext, label: ext.toUpperCase(), color: '#475569', bg: '#f1f5f9' };
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setUploadError('');
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      setUploadError('Invalid file format! Only PDF (.pdf), Word (.doc, .docx), and Excel (.xls, .xlsx, .csv) files are allowed.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    if (!uploadForm.courseTitle) {
      const cleanTitle = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setUploadForm(prev => ({ ...prev, courseTitle: cleanTitle.replace(/_/g, ' ') }));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select a valid PDF, Word, or Excel file to upload.');
      return;
    }

    const ext = selectedFile.name.split('.').pop().toLowerCase();
    let detectedType = 'file';
    if (ext === 'pdf') detectedType = 'pdf';
    else if (ext === 'doc' || ext === 'docx') detectedType = 'word';
    else if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') detectedType = 'excel';

    const fileSizeKB = (selectedFile.size / 1024).toFixed(1);
    const formattedSize = fileSizeKB > 1024 ? `${(fileSizeKB / 1024).toFixed(1)} MB` : `${fileSizeKB} KB`;

    const newDoc = {
      id: Date.now(),
      title: uploadForm.courseTitle || selectedFile.name,
      semester: uploadForm.semester,
      department: uploadForm.department,
      academicYear: uploadForm.academicYear,
      fileName: selectedFile.name,
      fileType: detectedType,
      fileSize: formattedSize,
      uploadedBy: currentUser?.name || 'Dr. James Miller (HOD)',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: uploadForm.notes
    };

    setUploadedSemesterCourses([newDoc, ...uploadedSemesterCourses]);
    setShowUploadModal(false);
    setSelectedFile(null);
    setUploadForm({
      courseTitle: '',
      semester: 'Semester VII',
      department: 'Dept. of Computer Engineering',
      academicYear: '2026-2027',
      notes: ''
    });
    setUploadSuccessMsg(`Semester course file "${newDoc.fileName}" has been uploaded successfully!`);
    setTimeout(() => setUploadSuccessMsg(''), 6000);
  };

  const handleDeleteCourseFile = (id) => {
    if (window.confirm('Are you sure you want to delete this uploaded semester course file?')) {
      setUploadedSemesterCourses(prev => prev.filter(item => item.id !== id));
    }
  };

  useEffect(() => {
    if (initialTab === 'major-minor-reg' || initialTab === 'major-minor' || initialTab === 'major-minor-students') {
      setActiveTab('major-minor-reg');
    } else {
      setActiveTab('student-course-reg');
    }
  }, [initialTab]);

  // Data for Registered Courses
  const [registeredCourses, setRegisteredCourses] = useState([
    {
      code: 'CS701',
      title: 'Deep Learning & Neural Networks',
      category: 'Core Theory',
      credits: 4,
      instructor: 'Dr. Arthur Pendelton',
      slot: 'Mon/Wed 10:00 AM - 11:30 AM',
      room: 'LT-204 (Tech Building)',
      status: 'APPROVED',
      gradeScheme: 'Letter Grade (A-F)'
    },
    {
      code: 'CS702',
      title: 'Cloud Computing & DevOps Architecture',
      category: 'Core Theory',
      credits: 4,
      instructor: 'Prof. Sarah Jenkins',
      slot: 'Tue/Thu 02:00 PM - 03:30 PM',
      room: 'CS-Lab 3',
      status: 'APPROVED',
      gradeScheme: 'Letter Grade (A-F)'
    },
    {
      code: 'CS703',
      title: 'Cybersecurity & Cryptographic Systems',
      category: 'Program Elective',
      credits: 3,
      instructor: 'Dr. Rachel Green',
      slot: 'Fri 09:00 AM - 12:00 PM',
      room: 'LT-102',
      status: 'APPROVED',
      gradeScheme: 'Letter Grade (A-F)'
    },
    {
      code: 'CS704P',
      title: 'Major Project Phase - I (Capstone)',
      category: 'Practical / Lab',
      credits: 6,
      instructor: 'Prof. Alan Poe & Panel',
      slot: 'Mon/Wed/Fri 02:00 PM - 05:00 PM',
      room: 'Project Innovation Lab',
      status: 'APPROVED',
      gradeScheme: 'Pass/Fail + Rubric'
    },
    {
      code: 'CS705P',
      title: 'Advanced AI & Machine Learning Lab',
      category: 'Practical / Lab',
      credits: 2,
      instructor: 'Dr. Arthur Pendelton',
      slot: 'Thu 09:00 AM - 11:00 AM',
      room: 'GPU Server Cluster Lab',
      status: 'APPROVED',
      gradeScheme: 'Letter Grade (A-F)'
    }
  ]);

  // Available Major / Minor Degree Tracks (Catalog)
  const minorTracks = [
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence & Machine Learning',
      department: 'Dept. of AI & Data Science',
      type: 'Minor Degree Specialization',
      totalCredits: 18,
      minCgpa: 7.50,
      description: 'Master Deep Learning, Natural Language Processing, Computer Vision, and Generative AI frameworks.',
      coursesIncluded: ['AIML-401 Neural Nets', 'AIML-402 NLP & Transformers', 'AIML-403 Computer Vision', 'AIML-404 AI Capstone Project'],
      enrolledCount: 42,
      isEnrolled: true
    },
    {
      id: 'cyber-sec',
      title: 'Cyber Security & Forensic Investigation',
      department: 'Dept. of Computer Engineering',
      type: 'Minor Degree Specialization',
      totalCredits: 18,
      minCgpa: 7.00,
      description: 'Ethical Hacking, Network Defense, Penetration Testing, Risk Auditing, and Blockchain Security Systems.',
      coursesIncluded: ['CS-401 Network Security', 'CS-402 Ethical Hacking', 'CS-403 Digital Forensics', 'CS-404 Cyber Law & Audit'],
      enrolledCount: 28,
      isEnrolled: false
    },
    {
      id: 'cloud-devops',
      title: 'Cloud Infrastructure & DevOps Engineering',
      department: 'Dept. of Software Engineering',
      type: 'Minor Degree Specialization',
      totalCredits: 18,
      minCgpa: 7.00,
      description: 'Kubernetes orchestration, AWS/Azure Infrastructure as Code, CI/CD pipeline automation, and Microservices.',
      coursesIncluded: ['DO-401 Docker & K8s', 'DO-402 Terraform & AWS', 'DO-403 Microservices Architecture', 'DO-404 DevOps Lab'],
      enrolledCount: 35,
      isEnrolled: false
    },
    {
      id: 'robotics-iot',
      title: 'Robotics & Autonomous IoT Systems',
      department: 'Dept. of Mechatronics & ECE',
      type: 'Minor Degree Specialization',
      totalCredits: 18,
      minCgpa: 7.25,
      description: 'Embedded Linux, Sensor Interfacing, ROS2 Navigation Stack, and Industrial Automation.',
      coursesIncluded: ['RT-401 Embedded C++', 'RT-402 ROS2 Robotics', 'RT-403 Sensor Networks', 'RT-404 Drone Autopilot'],
      enrolledCount: 19,
      isEnrolled: false
    }
  ];

  // Faculty Roster Data: List of Students Registered for Major and Minor Courses
  const [registeredMinorStudents, setRegisteredMinorStudents] = useState([
    {
      id: '23ACOE1121163',
      name: 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
      rollNo: 'COMP-A-01',
      department: 'Computer Engineering',
      semester: 'Semester VII',
      cgpa: 8.42,
      track: 'Artificial Intelligence & Machine Learning',
      appliedDate: 'Oct 10, 2026',
      status: 'APPROVED',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'CS-2024-089',
      name: 'Elena Rostova',
      rollNo: 'COMP-A-02',
      department: 'Computer Science & Engineering',
      semester: 'Semester VII',
      cgpa: 9.15,
      track: 'Artificial Intelligence & Machine Learning',
      appliedDate: 'Oct 12, 2026',
      status: 'APPROVED',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'PHY-2023-012',
      name: 'Marcus Aurelius',
      rollNo: 'PHYS-A-04',
      department: 'Physics & Electrical Engineering',
      semester: 'Semester VII',
      cgpa: 7.85,
      track: 'Robotics & Autonomous IoT Systems',
      appliedDate: 'Oct 14, 2026',
      status: 'APPROVED',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'CS-2024-112',
      name: 'Siddharth Nair',
      rollNo: 'COMP-A-03',
      department: 'Computer Science & Engineering',
      semester: 'Semester VII',
      cgpa: 7.60,
      track: 'Cyber Security & Forensic Investigation',
      appliedDate: 'Oct 15, 2026',
      status: 'PENDING APPROVAL',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'LIT-2025-441',
      name: 'Lydia Vance',
      rollNo: 'DS-B-05',
      department: 'Data Science & AI',
      semester: 'Semester V',
      cgpa: 9.40,
      track: 'Artificial Intelligence & Machine Learning',
      appliedDate: 'Oct 08, 2026',
      status: 'APPROVED',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'BIO-2026-004',
      name: 'Gabriela Cortese',
      rollNo: 'BIO-A-06',
      department: 'Biotechnology',
      semester: 'Semester III',
      cgpa: 8.10,
      track: 'Cloud Infrastructure & DevOps Engineering',
      appliedDate: 'Oct 16, 2026',
      status: 'APPROVED',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'EE-2024-055',
      name: 'Rohan Sharma',
      rollNo: 'EE-C-07',
      department: 'Electrical Engineering',
      semester: 'Semester VII',
      cgpa: 7.45,
      track: 'Robotics & Autonomous IoT Systems',
      appliedDate: 'Oct 17, 2026',
      status: 'PENDING APPROVAL',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  const handleApproveMinorStudent = (studentId) => {
    setRegisteredMinorStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, status: 'APPROVED' };
      }
      return s;
    }));
    alert(`Approved Major/Minor course registration for student ${studentId}.`);
  };

  const filteredCourses = registeredCourses.filter(c => 
    c.title.toLowerCase().includes(localSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(localSearch.toLowerCase()) ||
    c.instructor.toLowerCase().includes(localSearch.toLowerCase())
  );

  const filteredFacultyStudents = registeredMinorStudents.filter(s => {
    const matchesTrack = selectedTrackFilter === 'all' || s.track === selectedTrackFilter;
    const matchesSearch = s.name.toLowerCase().includes(localSearch.toLowerCase()) ||
                          s.id.toLowerCase().includes(localSearch.toLowerCase()) ||
                          s.department.toLowerCase().includes(localSearch.toLowerCase()) ||
                          s.track.toLowerCase().includes(localSearch.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const totalCredits = registeredCourses.reduce((sum, c) => sum + c.credits, 0);

  const handleApplyMinor = (minorId) => {
    if (!appliedMinors.includes(minorId)) {
      setAppliedMinors([...appliedMinors, minorId]);
      alert(`Success! Your application for ${minorTracks.find(m => m.id === minorId)?.title} has been submitted for Advisor Approval.`);
    } else {
      alert('You are already registered for this specialization.');
    }
    setShowRegisterModal(false);
  };

  if (selectedCourse) {
    return (
      <CourseActivityPage 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)} 
        currentUser={currentUser} 
      />
    );
  }

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>
            {isFaculty ? 'Faculty Course Management & Student Roster' : 'Course Management & Registration Portal'}
          </h2>
          <p style={styles.pageSubtitle}>
            {isFaculty 
              ? 'View class registered courses, manage student activity submissions, and monitor Major/Minor course registered students.'
              : 'View course load, register for semester modules, and manage Major/Minor degree tracks.'
            }
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {isFaculty && (
            <button 
              style={styles.actionBtnUpload} 
              onClick={() => setShowUploadModal(true)}
              title="Upload Semester Course Syllabus, Curriculum, or Evaluation Matrix (PDF, Word, Excel)"
            >
              <Upload size={15} />
              <span>Upload Semester Course</span>
            </button>
          )}
          <button style={styles.actionBtnSecondary} onClick={() => window.print()}>
            <Printer size={15} />
            <span>Print Summary</span>
          </button>
          <button style={styles.actionBtnPrimary} onClick={() => alert('Downloading Course & Student Registration Report PDF...')}>
            <Download size={15} />
            <span>Download Slip (PDF)</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={styles.tabsContainer}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'student-course-reg' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('student-course-reg')}
        >
          <BookOpen size={16} />
          <span>{isFaculty ? 'Class Registered Course' : 'Student Course Registration'}</span>
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'major-minor-reg' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('major-minor-reg')}
        >
          <Award size={16} />
          <span>{isFaculty ? 'Major / Minor Registered Students' : 'Major / Minor Registration'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: CLASS REGISTERED COURSE (FACULTY) OR STUDENT COURSE REGISTRATION   */}
      {/* ========================================================================= */}
      {activeTab === 'student-course-reg' && (
        <div>
          {/* Notification Toast Banner */}
          {uploadSuccessMsg && (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              borderRadius: '10px',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#047857',
              fontSize: '0.88rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(4, 120, 87, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#047857" />
                <span>{uploadSuccessMsg}</span>
              </div>
              <X size={16} style={{ cursor: 'pointer' }} onClick={() => setUploadSuccessMsg('')} />
            </div>
          )}

          {/* Uploaded Semester Course Syllabi & Documents Section */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #cbd5e1',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={19} color="#00a884" />
                  Uploaded Semester Course Syllabi & Curriculum Files ({uploadedSemesterCourses.length})
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                  Official semester course documents uploaded by HOD, Course Coordinators & Faculty (PDF, Word, Excel).
                </p>
              </div>

              {isFaculty && (
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: '#e6f7f3',
                    color: '#00a884',
                    border: '1px solid #a3e6d5',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowUploadModal(true)}
                >
                  <Upload size={14} />
                  <span>Upload New Course File</span>
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {uploadedSemesterCourses.map(doc => {
                const info = getFileTypeInfo(doc.fileName);
                return (
                  <div key={doc.id} style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    transition: 'all 0.2s ease'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: info.color,
                          backgroundColor: info.bg,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          {info.type === 'excel' ? <FileSpreadsheet size={13} /> : <FileText size={13} />}
                          {info.label}
                        </span>

                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369a1', backgroundColor: '#e0f2fe', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          {doc.semester}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0', lineHeight: 1.35 }}>
                        {doc.title}
                      </h4>

                      <div style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '0.75rem' }}>
                        <div><strong>File:</strong> {doc.fileName} ({doc.fileSize})</div>
                        <div><strong>Uploaded by:</strong> {doc.uploadedBy} • {doc.uploadDate}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px dashed #cbd5e1' }}>
                      <button
                        onClick={() => alert(`Simulating download/viewing of file "${doc.fileName}"`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          backgroundColor: '#00a884',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <Download size={13} />
                        <span>Download File</span>
                      </button>

                      {isFaculty && (
                        <button
                          onClick={() => handleDeleteCourseFile(doc.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            backgroundColor: 'transparent',
                            color: '#ef4444',
                            border: 'none',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem'
                          }}
                          title="Remove file"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Stat Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.statLabel}>{isFaculty ? 'FACULTY WORKSPACE' : 'DEGREE & PROGRAM'}</span>
                <GraduationCap size={18} color="#9333ea" />
              </div>
              <div style={{ ...styles.statValue, fontSize: '1.15rem', color: '#0f172a' }}>
                {isFaculty ? 'DEPT OF COMPUTER ENGG' : 'B.Tech - COMPUTER ENGG'}
              </div>
              <span style={styles.statSub}>
                {isFaculty ? 'Instructor & Course Coordinator' : 'Bachelor of Technology (CAP Allotment)'}
              </span>
            </div>

            <div style={styles.statCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.statLabel}>{isFaculty ? 'CLASS TOTAL CREDITS' : 'REGISTERED CREDITS'}</span>
                <BookOpen size={18} color="#00a884" />
              </div>
              <div style={styles.statValue}>{totalCredits} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Credits</span></div>
              <span style={styles.statSub}>Semester VII (WINTER 2026)</span>
            </div>

            <div style={styles.statCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.statLabel}>TOTAL OFFERED COURSES</span>
                <Layers size={18} color="#0284c7" />
              </div>
              <div style={styles.statValue}>{registeredCourses.length}</div>
              <span style={styles.statSub}>3 Theory • 2 Practicals / Labs</span>
            </div>

            <div style={styles.statCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.statLabel}>STATUS & APPROVAL</span>
                <ShieldCheck size={18} color="#047857" />
              </div>
              <div style={{ ...styles.statValue, color: '#047857', fontSize: '1.25rem', marginTop: '0.2rem' }}>ACTIVE & APPROVED</div>
              <span style={styles.statSub}>Approved by Head of Department</span>
            </div>
          </div>

          {/* Search Bar & Action Header */}
          <div style={styles.sectionHeader}>
            <div style={styles.searchWrapper}>
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder={isFaculty ? "Search class course by code, title, or instructor..." : "Search registered course by code, title, or instructor..."}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {!isFaculty && (
              <button 
                style={styles.addCourseBtn}
                onClick={() => alert('Course Registration Window for Winter 2026 is currently LOCKED by Academic Registrar.')}
              >
                <Plus size={16} />
                <span>Add / Register Course</span>
              </button>
            )}
          </div>

          {/* Course List Cards */}
          <div style={styles.courseList}>
            {filteredCourses.map((course, idx) => {
              const isApproved = course.status === 'APPROVED';
              return (
                <div 
                  key={course.code} 
                  style={{ 
                    ...styles.courseCard, 
                    cursor: isOnlyFaculty ? 'pointer' : 'default' 
                  }}
                  onClick={() => {
                    if (isOnlyFaculty) {
                      setSelectedCourse(course);
                    }
                  }}
                  title={
                    isOnlyFaculty 
                      ? "Click to manage course activities, post instructions, and upload descriptive documents" 
                      : (isAdminOrHod ? "Course management card. Click the Approve button to toggle HOD approval." : "Registered course module details")
                  }
                >
                  <div style={styles.courseLeftBar} />
                  <div style={styles.courseMainContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={styles.courseCodeBadge}>{course.code}</span>
                          <span style={styles.courseCategoryBadge}>{course.category}</span>
                          <span style={styles.creditsBadge}>{course.credits} Credits</span>
                        </div>
                        <h4 style={styles.courseTitleText}>{course.title}</h4>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                        {isAdminOrHod ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCourseApproval(course.code);
                            }}
                            style={{
                              ...styles.approvedStatusBadge,
                              cursor: 'pointer',
                              backgroundColor: isApproved ? '#f0fdf4' : '#fef3c7',
                              borderColor: isApproved ? '#047857' : '#d97706',
                              color: isApproved ? '#047857' : '#b45309',
                              borderWidth: '1.5px',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
                              transition: 'all 0.2s ease'
                            }}
                            title="Click to toggle HOD & Admin Course Approval"
                          >
                            <CheckCircle2 size={13} color={isApproved ? "#047857" : "#d97706"} />
                            <span>{course.status} (Click to {isApproved ? 'Unapprove' : 'Approve'})</span>
                          </button>
                        ) : (
                          <span style={{
                            ...styles.approvedStatusBadge,
                            backgroundColor: isApproved ? '#f0fdf4' : '#fef3c7',
                            borderColor: isApproved ? '#a7f3d0' : '#fde68a',
                            color: isApproved ? '#047857' : '#b45309'
                          }}>
                            <CheckCircle2 size={13} color={isApproved ? "#047857" : "#d97706"} />
                            <span>{course.status}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={styles.courseMetaGrid}>
                      <div>
                        <span style={styles.metaLabel}>Instructor:</span>
                        <span style={styles.metaValue}>{course.instructor}</span>
                      </div>
                      <div>
                        <span style={styles.metaLabel}>Schedule Slot:</span>
                        <span style={styles.metaValue}>{course.slot}</span>
                      </div>
                      <div>
                        <span style={styles.metaLabel}>Venue / Room:</span>
                        <span style={styles.metaValue}>{course.room}</span>
                      </div>
                      <div>
                        <span style={styles.metaLabel}>Evaluation Scheme:</span>
                        <span style={styles.metaValue}>{course.gradeScheme}</span>
                      </div>
                    </div>

                    {/* Access Activities Action Pill */}
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {isOnlyFaculty 
                          ? '📝 Create & Publish Activities, Descriptive Documents' 
                          : (isAdminOrHod ? '🛡️ HOD Academic Course Approval & Monitoring' : '📚 Registered Course Guidelines & Syllabus')
                        }
                      </span>
                      {isOnlyFaculty ? (
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#00a884', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          Manage Course & Create Activity <ChevronRight size={15} />
                        </span>
                      ) : isAdminOrHod ? (
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          Approved by HOD & Academic Registrar
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b' }}>
                          Enrolled Course Module
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: MAJOR / MINOR REGISTERED STUDENTS (FACULTY) OR REGISTRATION (STUDENT) */}
      {/* ========================================================================= */}
      {activeTab === 'major-minor-reg' && (
        <div>
          {isFaculty ? (
            /* ===================================================================== */
            /* FACULTY VIEW: LIST OF STUDENTS WHO REGISTERED FOR MAJOR/MINOR COURSE  */
            /* ===================================================================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Summary Stats Grid */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={styles.statLabel}>TOTAL REGISTERED STUDENTS</span>
                    <Users size={18} color="#00a884" />
                  </div>
                  <div style={styles.statValue}>124</div>
                  <span style={styles.statSub}>Enrolled across 4 Specializations</span>
                </div>

                <div style={styles.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={styles.statLabel}>SPECIALIZATION TRACKS</span>
                    <Award size={18} color="#9333ea" />
                  </div>
                  <div style={styles.statValue}>4 Tracks</div>
                  <span style={styles.statSub}>18-Credit Honours & Minors</span>
                </div>

                <div style={styles.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={styles.statLabel}>PENDING ADVISOR APPROVALS</span>
                    <Clock size={18} color="#d97706" />
                  </div>
                  <div style={{ ...styles.statValue, color: '#d97706' }}>
                    {registeredMinorStudents.filter(s => s.status === 'PENDING APPROVAL').length}
                  </div>
                  <span style={styles.statSub}>Requires HOD Signature</span>
                </div>

                <div style={styles.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={styles.statLabel}>AVERAGE TRACK CGPA</span>
                    <GraduationCap size={18} color="#0284c7" />
                  </div>
                  <div style={styles.statValue}>8.18 <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/ 10.0</span></div>
                  <span style={styles.statSub}>High Performing Cohort</span>
                </div>
              </div>

              {/* Specialization Filter & Search Bar */}
              <div style={{ backgroundColor: '#ffffff', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflowX: 'auto' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                    <Filter size={15} color="#00a884" />
                    Track Filter:
                  </span>
                  {[
                    { id: 'all', label: 'All Specializations' },
                    { id: 'Artificial Intelligence & Machine Learning', label: 'AI & Machine Learning' },
                    { id: 'Cyber Security & Forensic Investigation', label: 'Cyber Security' },
                    { id: 'Cloud Infrastructure & DevOps Engineering', label: 'Cloud & DevOps' },
                    { id: 'Robotics & Autonomous IoT Systems', label: 'Robotics & IoT' }
                  ].map(trk => (
                    <button
                      key={trk.id}
                      onClick={() => setSelectedTrackFilter(trk.id)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedTrackFilter === trk.id ? '1.5px solid #00a884' : '1px solid #cbd5e1',
                        backgroundColor: selectedTrackFilter === trk.id ? '#e6f7f3' : '#f8fafc',
                        color: selectedTrackFilter === trk.id ? '#00a884' : '#475569',
                        fontSize: '0.8rem',
                        fontWeight: selectedTrackFilter === trk.id ? '800' : '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {trk.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.45rem 0.75rem', width: '260px' }}>
                  <Search size={15} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search student by name or ID..."
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '0.84rem', color: '#0f172a', width: '100%' }}
                  />
                </div>
              </div>

              {/* Roster Table of Students Registered for Major/Minor Course */}
              <div style={styles.tableCard}>
                <div style={{ padding: '1rem 1.25rem', backgroundColor: '#1e293b', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} color="#00a884" />
                    Major / Minor Course Registered Students List ({filteredFacultyStudents.length})
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Academic Term: Winter 2026
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.cyberTable}>
                    <thead>
                      <tr>
                        <th style={{ ...styles.cyberTh, textAlign: 'center', width: '50px' }}>S.No.</th>
                        <th style={styles.cyberTh}>Student Name & Profile</th>
                        <th style={styles.cyberTh}>Registration Number</th>
                        <th style={styles.cyberTh}>Branch & Semester</th>
                        <th style={{ ...styles.cyberTh, textAlign: 'center' }}>CGPA</th>
                        <th style={styles.cyberTh}>Registered Major / Minor Track</th>
                        <th style={styles.cyberTh}>Registration Date</th>
                        <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Status</th>
                        <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFacultyStudents.map((st, idx) => {
                        const isPending = st.status === 'PENDING APPROVAL';
                        return (
                          <tr key={st.id} style={{ ...styles.cyberTr, backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                            <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                            <td style={styles.cyberTd}>
                              <div>
                                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>{st.name}</div>
                                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{st.rollNo}</div>
                              </div>
                            </td>
                            <td style={{ ...styles.cyberTd, fontWeight: '700', color: '#334155' }}>{st.id}</td>
                            <td style={styles.cyberTd}>
                              <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.82rem' }}>{st.department}</div>
                              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{st.semester}</div>
                            </td>
                            <td style={{ ...styles.cyberTd, textAlign: 'center' }}>
                              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#047857', backgroundColor: '#f0fdf4', border: '1px solid #a7f3d0', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                                {st.cgpa}
                              </span>
                            </td>
                            <td style={styles.cyberTd}>
                              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0369a1', backgroundColor: '#e0f2fe', padding: '0.25rem 0.65rem', borderRadius: '6px', border: '1px solid #bae6fd', display: 'inline-block' }}>
                                {st.track}
                              </span>
                            </td>
                            <td style={{ ...styles.cyberTd, fontSize: '0.78rem', color: '#64748b' }}>{st.appliedDate}</td>
                            <td style={{ ...styles.cyberTd, textAlign: 'center' }}>
                              <span style={{
                                fontSize: '0.74rem',
                                fontWeight: '800',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '6px',
                                backgroundColor: isPending ? '#fef3c7' : '#dcfce7',
                                color: isPending ? '#b45309' : '#047857',
                                border: `1px solid ${isPending ? '#fde68a' : '#86efac'}`
                              }}>
                                {st.status}
                              </span>
                            </td>
                            <td style={{ ...styles.cyberTd, textAlign: 'center' }}>
                              {isPending ? (
                                <button
                                  onClick={() => handleApproveMinorStudent(st.id)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    backgroundColor: '#00a884',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <Check size={13} />
                                  <span>Approve</span>
                                </button>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '700' }}>✓ Approved</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* ===================================================================== */
            /* STUDENT VIEW: MAJOR / MINOR DEGREE SPECIALIZATION CATALOG & APPLY     */
            /* ===================================================================== */
            <div>
              {/* Eligibility Banner */}
              <div style={styles.eligibilityCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={styles.eligibilityIconBox}>
                    <GraduationCap size={28} color="#ffffff" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Honours & Minor Degree Specialization Eligibility
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0.2rem 0 0 0' }}>
                      Students with CGPA &ge; 7.00 are eligible to opt for a 18-Credit Minor Degree alongside B.Tech Computer Engineering.
                    </p>
                  </div>
                </div>

                <div style={styles.cgpaPill}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#047857' }}>YOUR CGPA</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>8.42 / 10.0</span>
                  <span style={styles.eligibleBadge}>ELIGIBLE FOR MINOR</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '1.5rem 0 1rem 0' }}>
                Available Minor Degree Specializations
              </h3>

              {/* Minor Tracks Grid */}
              <div style={styles.minorGrid}>
                {minorTracks.map((track) => {
                  const isApplied = appliedMinors.includes(track.id);
                  return (
                    <div key={track.id} style={{
                      ...styles.minorCard,
                      ...(isApplied ? styles.minorCardActive : {})
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span style={styles.minorDeptTag}>{track.department}</span>
                        {isApplied ? (
                          <span style={styles.enrolledBadge}>
                            <CheckCircle2 size={13} color="#047857" />
                            <span>REGISTERED</span>
                          </span>
                        ) : (
                          <span style={styles.creditsTag}>{track.totalCredits} Credits</span>
                        )}
                      </div>

                      <h4 style={styles.minorTitle}>{track.title}</h4>
                      <p style={styles.minorDesc}>{track.description}</p>

                      <div style={styles.includedCoursesBox}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>
                          CURRICULUM MODULES (18 CREDITS):
                        </span>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#334155' }}>
                          {track.coursesIncluded.map((c, i) => (
                            <li key={i} style={{ marginBottom: '0.2rem' }}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={styles.minorFooter}>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Min CGPA: <strong>{track.minCgpa}</strong> • Enrolled: <strong>{track.enrolledCount} Students</strong>
                        </span>

                        <button
                          onClick={() => handleApplyMinor(track.id)}
                          style={{
                            ...styles.applyBtn,
                            ...(isApplied ? styles.applyBtnDisabled : {})
                          }}
                          disabled={isApplied}
                        >
                          {isApplied ? 'Enrolled Track' : 'Apply Specialization'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* UPLOAD SEMESTER COURSE MODAL (PDF, WORD, EXCEL)                           */}
      {/* ========================================================================= */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '620px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid #cbd5e1'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#00a884',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UploadCloud size={20} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    Upload Semester Course Curriculum
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0.1rem 0 0 0' }}>
                    Supported file formats: PDF (.pdf), Word (.doc, .docx), Excel (.xls, .xlsx, .csv)
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadError('');
                  setSelectedFile(null);
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '6px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleUploadSubmit} style={{ padding: '1.5rem' }}>
              {uploadError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={16} color="#dc2626" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Form Input: Course Title */}
              <div style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Semester Course / Syllabus Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS Semester VII Detailed Syllabus & Evaluation Scheme"
                  value={uploadForm.courseTitle}
                  onChange={e => setUploadForm({ ...uploadForm, courseTitle: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.88rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Grid: Semester & Department */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Target Semester <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={uploadForm.semester}
                    onChange={e => setUploadForm({ ...uploadForm, semester: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.85rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      outline: 'none'
                    }}
                  >
                    <option value="Semester I">Semester I</option>
                    <option value="Semester II">Semester II</option>
                    <option value="Semester III">Semester III</option>
                    <option value="Semester IV">Semester IV</option>
                    <option value="Semester V">Semester V</option>
                    <option value="Semester VI">Semester VI</option>
                    <option value="Semester VII">Semester VII</option>
                    <option value="Semester VIII">Semester VIII</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Academic Department <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={uploadForm.department}
                    onChange={e => setUploadForm({ ...uploadForm, department: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.85rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      outline: 'none'
                    }}
                  >
                    <option value="Dept. of Computer Engineering">Dept. of Computer Engineering</option>
                    <option value="Dept. of AI & Data Science">Dept. of AI & Data Science</option>
                    <option value="Dept. of Software Engineering">Dept. of Software Engineering</option>
                    <option value="Dept. of Information Technology">Dept. of Information Technology</option>
                    <option value="Dept. of Electronics & Telecom">Dept. of Electronics & Telecom</option>
                  </select>
                </div>
              </div>

              {/* Academic Year */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Academic Session / Year
                </label>
                <input
                  type="text"
                  value={uploadForm.academicYear}
                  onChange={e => setUploadForm({ ...uploadForm, academicYear: e.target.value })}
                  placeholder="e.g. 2026-2027"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.88rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Drag & Drop File Upload Container */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Select Course Document (PDF, Word, Excel) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                
                <div style={{
                  border: selectedFile ? '2px dashed #00a884' : '2px dashed #cbd5e1',
                  backgroundColor: selectedFile ? '#f0fdf4' : '#f8fafc',
                  borderRadius: '12px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                    onChange={handleFileSelect}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />

                  {selectedFile ? (
                    <div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: getFileTypeInfo(selectedFile.name).bg,
                        color: getFileTypeInfo(selectedFile.name).color,
                        marginBottom: '0.5rem'
                      }}>
                        {getFileTypeInfo(selectedFile.name).type === 'excel' ? <FileSpreadsheet size={24} /> : <FileText size={24} />}
                      </div>

                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>
                        {selectedFile.name}
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                        <span>•</span>
                        <span style={{ fontWeight: 700, color: getFileTypeInfo(selectedFile.name).color }}>
                          {getFileTypeInfo(selectedFile.name).label}
                        </span>
                      </div>

                      <span style={{ fontSize: '0.75rem', color: '#00a884', fontWeight: 700, marginTop: '0.5rem', display: 'inline-block' }}>
                        ✓ File selected & verified. Click to change.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <UploadCloud size={32} color="#00a884" style={{ marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>
                        Click to browse or drag & drop course file here
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.3rem 0 0.5rem 0' }}>
                        Accepts PDF documents, Word files, and Excel spreadsheets
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#be123c', backgroundColor: '#ffe4e6', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          .PDF
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1d4ed8', backgroundColor: '#dbeafe', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          .DOC / .DOCX
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#047857', backgroundColor: '#d1fae5', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          .XLS / .XLSX / .CSV
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadError('');
                    setSelectedFile(null);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: '#00a884',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 168, 132, 0.3)'
                  }}
                >
                  <Upload size={16} />
                  <span>Upload Course Syllabus</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1.75rem',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#0f172a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: 0
  },
  pageSubtitle: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginTop: '0.25rem'
  },
  actionBtnUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#00a884',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 168, 132, 0.25)'
  },
  actionBtnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#334155',
    cursor: 'pointer'
  },
  actionBtnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#00a884',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#ffffff',
    cursor: 'pointer'
  },
  tabsContainer: {
    display: 'flex',
    gap: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
    marginBottom: '1.5rem',
    backgroundColor: '#ffffff',
    padding: '0.35rem 0.5rem 0 0.5rem',
    borderRadius: '10px 10px 0 0'
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  tabButtonActive: {
    color: '#00a884',
    borderBottom: '3px solid #00a884',
    fontWeight: 700
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  },
  statLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#64748b',
    letterSpacing: '0.04em'
  },
  statValue: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0.35rem 0'
  },
  statSub: {
    fontSize: '0.78rem',
    color: '#64748b'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.55rem 0.9rem',
    flex: '1',
    maxWidth: '450px'
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '0.88rem',
    color: '#0f172a'
  },
  addCourseBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1.1rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  courseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  courseCard: {
    display: 'flex',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
  },
  courseLeftBar: {
    width: '6px',
    backgroundColor: '#00a884'
  },
  courseMainContent: {
    padding: '1.25rem',
    flex: 1
  },
  courseCodeBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: '0.78rem',
    fontWeight: 800,
    padding: '0.2rem 0.6rem',
    borderRadius: '6px'
  },
  courseCategoryBadge: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: '0.78rem',
    fontWeight: 600,
    padding: '0.2rem 0.6rem',
    borderRadius: '6px'
  },
  creditsBadge: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    fontSize: '0.78rem',
    fontWeight: 700,
    padding: '0.2rem 0.6rem',
    borderRadius: '6px'
  },
  courseTitleText: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#0f172a',
    margin: '0.5rem 0 0.75rem 0'
  },
  approvedStatusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#f0fdf4',
    border: '1px solid #a7f3d0',
    color: '#047857',
    fontSize: '0.75rem',
    fontWeight: 700,
    padding: '0.3rem 0.7rem',
    borderRadius: '20px'
  },
  courseMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid #f1f5f9'
  },
  metaLabel: {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase'
  },
  metaValue: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#334155'
  },
  eligibilityCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    border: '1px solid #cbd5e1',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  eligibilityIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    backgroundColor: '#00a884',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cgpaPill: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    padding: '0.6rem 1.25rem',
    borderRadius: '10px'
  },
  eligibleBadge: {
    fontSize: '0.7rem',
    fontWeight: 800,
    color: '#047857',
    marginTop: '0.1rem'
  },
  minorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.25rem'
  },
  minorCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.35rem',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  },
  minorCardActive: {
    borderColor: '#00a884',
    boxShadow: '0 4px 12px rgba(0, 168, 132, 0.12)'
  },
  minorDeptTag: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#0284c7',
    backgroundColor: '#e0f2fe',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px'
  },
  creditsTag: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#b45309',
    backgroundColor: '#fef3c7',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px'
  },
  enrolledBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#047857',
    backgroundColor: '#f0fdf4',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    border: '1px solid #bbf7d0'
  },
  minorTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0.5rem 0'
  },
  minorDesc: {
    fontSize: '0.84rem',
    color: '#475569',
    lineHeight: 1.4,
    marginBottom: '1rem'
  },
  includedCoursesBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '0.85rem',
    border: '1px solid #f1f5f9',
    marginBottom: '1.25rem'
  },
  minorFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.85rem',
    borderTop: '1px solid #f1f5f9',
    marginTop: 'auto'
  },
  applyBtn: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.82rem',
    fontWeight: 700,
    cursor: 'pointer'
  },
  applyBtnDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed'
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #cbd5e1',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
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
  }
};
