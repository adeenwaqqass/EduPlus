import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Award, 
  CheckCircle2, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  Save, 
  Calendar, 
  Clock, 
  AlertCircle, 
  FileCheck, 
  Check, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  UserCheck, 
  Paperclip,
  CheckSquare,
  ChevronRight
} from 'lucide-react';

export default function GradesPage({ initialTab = 'exam-score', searchTerm = '' }) {
  const [activeSubTab, setActiveSubTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab === 'exam-reports' || initialTab === 'reports') {
      setActiveSubTab('exam-reports');
    } else if (initialTab === 'score-card' || initialTab === 'card') {
      setActiveSubTab('score-card');
    } else if (initialTab === 'retest-slip' || initialTab === 'retest') {
      setActiveSubTab('retest-slip');
    } else if (initialTab === 'exam-form' || initialTab === 'form') {
      setActiveSubTab('exam-form');
    } else {
      setActiveSubTab('exam-score');
    }
  }, [initialTab]);

  // ==========================================
  // STATE 1: EXAM SCORE / EVALUATION LEDGER
  // ==========================================
  const [selectedSem, setSelectedSem] = useState('Semester VII');
  const [selectedSession, setSelectedSession] = useState('Winter 2026');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Exam Score State (Image 1 Layout)
  const [selectedScoreSession, setSelectedScoreSession] = useState('WINTER 2026');
  const [activeMarksTab, setActiveMarksTab] = useState('Semester Marks');
  const [expandedSemester, setExpandedSemester] = useState(null);

  const examStudentInfo = {
    name: 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
    registrationNumber: '23ACOE1121163',
    academicBatch: '2023-2027',
    major: '--',
    stream: 'Bachelor of Technology - COMPUTER ENGINEERING',
    classSection: 'A',
    rollNumber: 'AU7',
    minor: '--',
    academicSession: 'WINTER 2026',
    totalComponents: 10,
    cgpa: '6.23'
  };

  const semesterMarksList = [
    {
      id: 'sem6',
      title: 'Semester VI, Summer 2026',
      sgpa: '6.48',
      courses: [
        { code: 'CS601', name: 'Software Engineering', credits: 4, ut1: 22, ut2: 21, intScore: 18, endSem: 72, total: 90, grade: 'O' },
        { code: 'CS602', name: 'Web Development & Frameworks', credits: 4, ut1: 20, ut2: 23, intScore: 19, endSem: 78, total: 87, grade: 'A+' },
        { code: 'CS603', name: 'Artificial Intelligence', credits: 3, ut1: 18, ut2: 19, intScore: 16, endSem: 68, total: 74, grade: 'A' }
      ]
    },
    {
      id: 'sem5',
      title: 'Semester V, WINTER 2025',
      sgpa: '5.63',
      courses: [
        { code: 'CS501', name: 'Operating Systems', credits: 4, ut1: 17, ut2: 18, intScore: 14, endSem: 60, total: 74, grade: 'A' },
        { code: 'CS502', name: 'Computer Networks', credits: 4, ut1: 16, ut2: 17, intScore: 15, endSem: 58, total: 73, grade: 'A' },
        { code: 'CS503', name: 'Design & Analysis of Algorithms', credits: 3, ut1: 15, ut2: 16, intScore: 13, endSem: 52, total: 65, grade: 'B+' }
      ]
    },
    {
      id: 'sem4',
      title: 'Semester IV, Summer 2025',
      sgpa: '5.29',
      courses: [
        { code: 'CS401', name: 'Database Management Systems', credits: 4, ut1: 16, ut2: 17, intScore: 14, endSem: 55, total: 69, grade: 'B+' },
        { code: 'CS402', name: 'Theory of Computation', credits: 4, ut1: 15, ut2: 14, intScore: 13, endSem: 50, total: 63, grade: 'B' }
      ]
    },
    {
      id: 'sem3',
      title: 'Semester III, WINTER 2024',
      sgpa: '5.26',
      courses: [
        { code: 'CS301', name: 'Data Structures', credits: 4, ut1: 16, ut2: 15, intScore: 14, endSem: 54, total: 68, grade: 'B+' },
        { code: 'CS302', name: 'Object Oriented Programming', credits: 4, ut1: 17, ut2: 16, intScore: 15, endSem: 56, total: 71, grade: 'A' }
      ]
    },
    {
      id: 'sem2',
      title: 'Semester II, SUMMER 2024',
      sgpa: '5.15',
      courses: [
        { code: 'EC201', name: 'Basic Electronics Engineering', credits: 4, ut1: 15, ut2: 14, intScore: 13, endSem: 50, total: 63, grade: 'B' },
        { code: 'MA201', name: 'Engineering Mathematics II', credits: 4, ut1: 14, ut2: 15, intScore: 12, endSem: 48, total: 60, grade: 'B' }
      ]
    },
    {
      id: 'sem1',
      title: 'Semester I, WINTER 2023',
      sgpa: '6.45',
      courses: [
        { code: 'CS101', name: 'Programming in C', credits: 4, ut1: 22, ut2: 21, intScore: 18, endSem: 70, total: 88, grade: 'A+' },
        { code: 'MA101', name: 'Engineering Mathematics I', credits: 4, ut1: 20, ut2: 19, intScore: 17, endSem: 68, total: 85, grade: 'A+' }
      ]
    }
  ];

  const [examScores, setExamScores] = useState([
    { code: 'CS701', title: 'Deep Learning & Neural Networks', credits: 4, ut1: 23, ut2: 24, intScore: 19, endSem: 88, total: 91, grade: 'O', points: 10 },
    { code: 'CS702', title: 'Cloud Computing & DevOps', credits: 4, ut1: 21, ut2: 22, intScore: 18, endSem: 82, total: 85, grade: 'A+', points: 9 },
    { code: 'CS703', title: 'Cybersecurity & Cryptography', credits: 3, ut1: 19, ut2: 20, intScore: 16, endSem: 74, total: 78, grade: 'A', points: 8 },
    { code: 'CS704P', title: 'Major Project Phase - I', credits: 6, ut1: 25, ut2: 25, intScore: 20, endSem: 95, total: 96, grade: 'O', points: 10 },
    { code: 'CS705P', title: 'Advanced AI Lab', credits: 2, ut1: 24, ut2: 24, intScore: 19, endSem: 90, total: 92, grade: 'O', points: 10 }
  ]);

  const handleScoreChange = (index, field, value) => {
    const updated = [...examScores];
    updated[index][field] = parseInt(value) || 0;
    const item = updated[index];
    item.total = Math.min(100, (item.intScore || 0) + (item.endSem || 0));
    setExamScores(updated);
  };

  const handleSaveScores = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // ==========================================
  // STATE 4: RETEST EXAM SLIP
  // ==========================================
  const retestSubjects = [
    { code: 'CS703', title: 'Cybersecurity & Cryptography', examDate: 'Nov 05, 2026', timeSlot: '10:00 AM - 01:00 PM', venue: 'Block B - Hall 204', feeStatus: 'PAID ($50)' }
  ];

  // ==========================================
  // STATE 5: EXAM FORM
  // ==========================================
  const [formChecked, setFormChecked] = useState({
    CS701: true,
    CS702: true,
    CS703: true,
    CS704P: true,
    CS705P: true
  });
  const [formSubmitted, setFormSubmitted] = useState(true);

  return (
    <div style={styles.container}>
      {/* Top Header & Page Navigation Sub-Tabs Bar */}
      <div style={styles.topNavCard}>
        <div>
          <h2 style={styles.pageTitle}>Examination Management System</h2>
          <p style={styles.pageSubtitle}>
            Access official transcripts, internal exam scores, retest hall tickets, and examination registration forms.
          </p>
        </div>

        {/* Navigation Sub-Tabs */}
        <div style={styles.subTabGroup}>
          <button
            onClick={() => setActiveSubTab('exam-reports')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'exam-reports' ? styles.subTabBtnActive : {})
            }}
          >
            <TrendingUp size={16} />
            <span>Exam Reports</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exam-score')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'exam-score' ? styles.subTabBtnActive : {})
            }}
          >
            <FileText size={16} />
            <span>Exam Score</span>
          </button>

          <button
            onClick={() => setActiveSubTab('score-card')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'score-card' ? styles.subTabBtnActive : {})
            }}
          >
            <Award size={16} />
            <span>Score Card</span>
          </button>

          <button
            onClick={() => setActiveSubTab('retest-slip')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'retest-slip' ? styles.subTabBtnActive : {})
            }}
          >
            <Paperclip size={16} />
            <span>My Retest Exam Slip</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exam-form')}
            style={{
              ...styles.subTabBtn,
              ...(activeSubTab === 'exam-form' ? styles.subTabBtnActive : {})
            }}
          >
            <FileCheck size={16} />
            <span>My Exam Form</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-PAGE 1: EXAM REPORTS & DEPARTMENT ANALYTICS                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'exam-reports' && (
        <div style={styles.sectionContainer}>
          {/* Summary Stat Cards */}
          <div style={styles.statGrid}>
            <div style={{ ...styles.statCard, backgroundColor: '#f0fdf4', borderColor: '#a7f3d0' }}>
              <div style={styles.statLabel}>BATCH OVERALL PASS %</div>
              <div style={styles.statNum}>94.2%</div>
              <div style={styles.statSub}>+2.4% from last semester</div>
            </div>

            <div style={{ ...styles.statCard, backgroundColor: '#fef3c7', borderColor: '#fde68a' }}>
              <div style={styles.statLabel}>DEPARTMENT HIGHEST SGPA</div>
              <div style={styles.statNum}>9.92 / 10</div>
              <div style={styles.statSub}>Computer Science Cohort</div>
            </div>

            <div style={{ ...styles.statCard, backgroundColor: '#e0f2fe', borderColor: '#93c5fd' }}>
              <div style={styles.statLabel}>CLASS AVERAGE CGPA</div>
              <div style={styles.statNum}>8.45</div>
              <div style={styles.statSub}>Grade A Average Standing</div>
            </div>

            <div style={{ ...styles.statCard, backgroundColor: '#f3e8ff', borderColor: '#d8b4fe' }}>
              <div style={styles.statLabel}>DISTINCTION RANKERS</div>
              <div style={styles.statNum}>48 Students</div>
              <div style={styles.statSub}>SGPA &gt;= 8.5 Distinction</div>
            </div>
          </div>

          {/* Department Rankers Table */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Award size={20} color="#00a884" />
                <h3 style={styles.cardHeaderTitle}>Department Top Rankers & Merit List</h3>
              </div>
              <button 
                onClick={() => alert('Downloading Official Examination Performance Report (PDF)...')}
                style={styles.exportBtn}
              >
                <Download size={14} />
                <span>Export Reports</span>
              </button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Rank</th>
                  <th style={styles.th}>Student Name</th>
                  <th style={styles.th}>Registration No</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>SGPA</th>
                  <th style={styles.th}>Result Honor</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tr}>
                  <td style={styles.tdRank}>🥇 Rank 1</td>
                  <td style={styles.tdBold}>Adeen Waqqas Ahmed Shahzad Ahmed</td>
                  <td style={styles.tdMuted}>23ACOE1121163</td>
                  <td style={styles.td}>Computer Engineering</td>
                  <td style={{ ...styles.tdBold, color: '#047857' }}>9.92</td>
                  <td style={styles.td}><span style={styles.honorBadge}>GOLD MEDALIST</span></td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.tdRank}>🥈 Rank 2</td>
                  <td style={styles.tdBold}>Elena Rostova</td>
                  <td style={styles.tdMuted}>CS-2024-089</td>
                  <td style={styles.td}>Computer Science</td>
                  <td style={{ ...styles.tdBold, color: '#047857' }}>9.75</td>
                  <td style={styles.td}><span style={styles.honorBadge}>DISTINCTION</span></td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.tdRank}>🥉 Rank 3</td>
                  <td style={styles.tdBold}>Lydia Vance</td>
                  <td style={styles.tdMuted}>LIT-2025-441</td>
                  <td style={styles.td}>Data Science</td>
                  <td style={{ ...styles.tdBold, color: '#047857' }}>9.60</td>
                  <td style={styles.td}><span style={styles.honorBadge}>DISTINCTION</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PAGE 2: EXAM SCORE (MATCHING GHRCEM DESIGN IN BROWN BOX)               */}
      {/* ========================================================================= */}
      {activeSubTab === 'exam-score' && (
        <div style={styles.sectionContainer}>
          <div style={styles.examScoreCard}>
            <h2 style={styles.examScoreMainTitle}>Exam Score</h2>

            {/* Fieldset 1: Search */}
            <div style={styles.cyberFieldset}>
              <div style={styles.cyberFieldsetLegend}>
                <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span> Search <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#64748b' }}>Academic Session :</span>
                <select
                  value={selectedScoreSession}
                  onChange={(e) => setSelectedScoreSession(e.target.value)}
                  style={styles.sessionSelectInput}
                >
                  <option value="WINTER 2026">WINTER 2026</option>
                  <option value="SUMMER 2026">SUMMER 2026</option>
                  <option value="WINTER 2025">WINTER 2025</option>
                  <option value="SUMMER 2025">SUMMER 2025</option>
                </select>
              </div>
            </div>

            {/* Fieldset 2: Student Information */}
            <div style={styles.cyberFieldset}>
              <div style={styles.cyberFieldsetLegend}>
                <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span> Student Information <span style={{ color: '#00a884', fontWeight: 'bold' }}>—</span>
              </div>
              <div style={styles.infoGridThreeCol}>
                {/* Column 1 */}
                <div style={styles.infoColGroup}>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Name :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.name}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Registration Number :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.registrationNumber}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Academic Batch :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.academicBatch}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Major :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.major}</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div style={styles.infoColGroup}>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Stream :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.stream}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Class Section :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.classSection}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Roll Number :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.rollNumber}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Minor :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.minor}</span>
                  </div>
                </div>

                {/* Column 3 */}
                <div style={styles.infoColGroup}>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Academic Session :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.academicSession}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>Total Components :</span>
                    <span style={styles.infoValueText}>{examStudentInfo.totalComponents}</span>
                  </div>
                  <div style={styles.infoRowItem}>
                    <span style={styles.infoLabelText}>CGPA :</span>
                    <span style={{ ...styles.infoValueText, fontWeight: '800', color: '#047857' }}>{examStudentInfo.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Marks Sub-Navigation Tabs */}
            <div style={styles.marksTabRow}>
              {['Evaluation Level Component Marks', 'Course Component Marks', 'Semester Marks'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMarksTab(tab)}
                  style={{
                    ...styles.marksTabBtn,
                    ...(activeMarksTab === tab ? styles.marksTabBtnActive : {})
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Semester Marks (Default view in Brown Box) */}
            {activeMarksTab === 'Semester Marks' && (
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {semesterMarksList.map((sem) => {
                  const isExpanded = expandedSemester === sem.id;

                  return (
                    <div key={sem.id} style={styles.semAccordionCard}>
                      <div 
                        style={styles.semAccordionHeader}
                        onClick={() => setExpandedSemester(isExpanded ? null : sem.id)}
                      >
                        <span style={styles.semAccordionTitle}>{sem.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <span style={styles.semSgpaText}>SGPA : {sem.sgpa}</span>
                          <ChevronRight 
                            size={18} 
                            color="#64748b" 
                            style={{ 
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }} 
                          />
                        </div>
                      </div>

                      {isExpanded && (
                        <div style={styles.semAccordionBody}>
                          <table style={styles.cyberTable}>
                            <thead>
                              <tr>
                                <th style={styles.cyberTh}>Course Code</th>
                                <th style={styles.cyberTh}>Course Title</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Credits</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>UT-1 (20)</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>UT-2 (20)</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Total Internal (40)</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>External End-Sem (60)</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Grand Total (100)</th>
                                <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Grade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sem.courses.map((course, cIdx) => (
                                <tr key={course.code} style={{ ...styles.cyberTr, backgroundColor: cIdx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                                  <td style={{ ...styles.cyberTd, fontWeight: '700', color: '#00a884', fontFamily: 'monospace' }}>{course.code}</td>
                                  <td style={{ ...styles.cyberTd, fontWeight: '700', color: '#1e293b' }}>{course.name}</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center' }}>{course.credits}</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700' }}>{course.ut1} / 20</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700' }}>{course.ut2} / 20</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#00a884' }}>{course.ut1 + course.ut2} / 40</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#4338ca' }}>{course.endSem} / 60</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#0f172a' }}>{course.total} / 100</td>
                                  <td style={{ ...styles.cyberTd, textAlign: 'center' }}>
                                    <span style={{ ...styles.gradeBadge, backgroundColor: '#e6f7f3', color: '#00a884', borderColor: '#a7f3d0' }}>
                                      {course.grade}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab: Evaluation / Course Component Marks */}
            {activeMarksTab !== 'Semester Marks' && (
              <div style={{ marginTop: '0.75rem' }}>
                <table style={styles.cyberTable}>
                  <thead>
                    <tr>
                      <th style={styles.cyberTh}>Course Code & Title</th>
                      <th style={styles.cyberTh}>Component</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Credits</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>UT-1 (20)</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>UT-2 (20)</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Internal Total (40)</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>External End-Sem (60)</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Grand Total (100)</th>
                      <th style={{ ...styles.cyberTh, textAlign: 'center' }}>Grade Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examScores.map((item, idx) => (
                      <tr key={item.code} style={{ ...styles.cyberTr, backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ ...styles.cyberTd, fontWeight: '700', color: '#1e293b' }}>
                          <div>{item.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#00a884', fontFamily: 'monospace' }}>{item.code}</div>
                        </td>
                        <td style={styles.cyberTd}>{item.code.includes('P') ? 'Practical' : 'Theory'}</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center' }}>{item.credits}</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700' }}>{item.ut1} / 20</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '700' }}>{item.ut2} / 20</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#00a884' }}>{item.intScore} / 40</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#4338ca' }}>{item.endSem} / 60</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#0f172a' }}>{item.total} / 100</td>
                        <td style={{ ...styles.cyberTd, textAlign: 'center', fontWeight: '800', color: '#00a884' }}>{item.points} / 10</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PAGE 3: OFFICIAL SCORE CARD & TRANSCRIPT                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'score-card' && (
        <div style={styles.sectionContainer}>
          <div style={styles.scoreCardContainer}>
            {/* Header Branding */}
            <div style={styles.scoreCardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={styles.collegeBadge}>GH</div>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    GH RAISONI COLLEGE OF ENGINEERING & MANAGEMENT
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    An Autonomous Institute Affiliated to Savitribai Phule Pune University • Pune
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={styles.officialTag}>OFFICIAL SCORE CARD</span>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>ISSUE DATE: OCT 2026</div>
              </div>
            </div>

            {/* Student Details Grid */}
            <div style={styles.scoreCardInfoGrid}>
              <div>
                <span style={styles.metaLabel}>STUDENT NAME</span>
                <div style={styles.metaValueLarge}>ADEEN WAQQAS AHMED SHAHZAD AHMED</div>
              </div>
              <div>
                <span style={styles.metaLabel}>REGISTRATION NO.</span>
                <div style={styles.metaValue}>23ACOE1121163</div>
              </div>
              <div>
                <span style={styles.metaLabel}>BRANCH / DEGREE</span>
                <div style={styles.metaValue}>B.TECH COMPUTER ENGINEERING</div>
              </div>
              <div>
                <span style={styles.metaLabel}>SEMESTER & TERM</span>
                <div style={styles.metaValue}>SEMESTER VII (WINTER 2026)</div>
              </div>
              <div>
                <span style={styles.metaLabel}>CUMULATIVE CGPA</span>
                <div style={{ ...styles.metaValueLarge, color: '#047857' }}>8.92 / 10.00</div>
              </div>
              <div>
                <span style={styles.metaLabel}>FINAL RESULT STATUS</span>
                <div style={{ ...styles.metaValueLarge, color: '#00a884' }}>PASS WITH DISTINCTION</div>
              </div>
            </div>

            {/* Scorecard Table */}
            <table style={styles.scoreTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Course Code</th>
                  <th style={styles.th}>Course Title</th>
                  <th style={styles.th}>Credits</th>
                  <th style={styles.th}>Marks (100)</th>
                  <th style={styles.th}>Grade</th>
                  <th style={styles.th}>Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {examScores.map(c => (
                  <tr key={c.code} style={styles.tr}>
                    <td style={styles.tdId}>{c.code}</td>
                    <td style={styles.tdBold}>{c.title}</td>
                    <td style={styles.td}>{c.credits}</td>
                    <td style={styles.tdBold}>{c.total}</td>
                    <td style={styles.td}><span style={styles.gradeBadge}>{c.grade}</span></td>
                    <td style={styles.tdBold}>{c.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer Buttons */}
            <div style={styles.scoreCardFooter}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#047857', fontWeight: 700, fontSize: '0.85rem' }}>
                <CheckCircle2 size={18} />
                <span>Digitally Verified & Signed by Controller of Examinations</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => window.print()} style={styles.actionBtnSecondary}>
                  <Printer size={15} />
                  <span>Print Score Card</span>
                </button>
                <button onClick={() => alert('Downloading Official Transcript PDF...')} style={styles.actionBtnPrimary}>
                  <Download size={15} />
                  <span>Download Signed PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PAGE 4: MY RETEST EXAM SLIP                                          */}
      {/* ========================================================================= */}
      {activeSubTab === 'retest-slip' && (
        <div style={styles.sectionContainer}>
          <div style={styles.retestSlipWrapper}>
            <h2 style={styles.examScoreMainTitle}>My Retest Exam Slip</h2>

            {/* PDF Download Button Bar (Matching Screenshot) */}
            <div style={styles.pdfDownloadBar}>
              <button 
                onClick={() => alert('Downloading Official Retest Exam Slip (PDF)...')}
                style={styles.greenPdfDownloadBtn}
              >
                <Download size={16} />
                <span>PDF Download</span>
              </button>
            </div>

            {/* Retest Slip Document Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.cardHeaderTitle}>My Retest & Improvement Examination Hall Ticket Slip</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0' }}>
                    Winter 2026 Special Retest Session • Academic Registrar Office
                  </p>
                </div>

                <span style={styles.paidBadge}>RETEST FEE PAID ($50)</span>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={styles.retestInfoGrid}>
                  <div>
                    <span style={styles.metaLabel}>CANDIDATE NAME</span>
                    <div style={styles.metaValue}>ADEEN WAQQAS AHMED SHAHZAD AHMED</div>
                  </div>
                  <div>
                    <span style={styles.metaLabel}>ROLL NO / ID</span>
                    <div style={styles.metaValue}>23ACOE1121163 (Roll A07)</div>
                  </div>
                  <div>
                    <span style={styles.metaLabel}>EXAM CENTER VENUE</span>
                    <div style={styles.metaValue}>Block B - Hall 204 (Seat #28)</div>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '1.25rem 0 0.75rem' }}>
                  Registered Retest Examination Schedule
                </h4>

                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Course Code</th>
                      <th style={styles.th}>Course Title</th>
                      <th style={styles.th}>Scheduled Exam Date</th>
                      <th style={styles.th}>Time Slot</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retestSubjects.map(sub => (
                      <tr key={sub.code} style={styles.tr}>
                        <td style={styles.tdId}>{sub.code}</td>
                        <td style={styles.tdBold}>{sub.title}</td>
                        <td style={styles.tdBold}>{sub.examDate}</td>
                        <td style={styles.td}>{sub.timeSlot}</td>
                        <td style={styles.td}><span style={styles.statusPill}>CONFIRMED</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button onClick={() => window.print()} style={styles.actionBtnSecondary}>
                    <Printer size={15} />
                    <span>Print Retest Ticket</span>
                  </button>
                  <button onClick={() => alert('Downloading Retest Slip PDF...')} style={styles.actionBtnPrimary}>
                    <Download size={15} />
                    <span>Download Retest Slip (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PAGE 5: MY EXAM FORM                                                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'exam-form' && (
        <div style={styles.sectionContainer}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardHeaderTitle}>Semester VII Examination Registration Form</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0' }}>
                  Academic Session: Winter 2026 • Regular Examination Form
                </p>
              </div>

              <span style={styles.approvedFormBadge}>
                <CheckCircle2 size={15} />
                SUBMITTED & APPROVED
              </span>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={styles.retestInfoGrid}>
                <div>
                  <span style={styles.metaLabel}>APPLICANT NAME</span>
                  <div style={styles.metaValue}>ADEEN WAQQAS AHMED SHAHZAD AHMED</div>
                </div>
                <div>
                  <span style={styles.metaLabel}>REGISTRATION ID</span>
                  <div style={styles.metaValue}>23ACOE1121163</div>
                </div>
                <div>
                  <span style={styles.metaLabel}>EXAM FORM FEE</span>
                  <div style={{ ...styles.metaValue, color: '#047857' }}>$120.00 (PAID)</div>
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '1.25rem 0 0.75rem' }}>
                Enrolled Examination Subjects Checklist
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { code: 'CS701', name: 'Deep Learning & Neural Networks', type: 'Theory' },
                  { code: 'CS702', name: 'Cloud Computing & DevOps', type: 'Theory' },
                  { code: 'CS703', name: 'Cybersecurity & Cryptography', type: 'Theory' },
                  { code: 'CS704P', name: 'Major Project Phase - I', type: 'Practical' },
                  { code: 'CS705P', name: 'Advanced AI Lab', type: 'Practical' }
                ].map(item => (
                  <div key={item.code} style={styles.formCheckRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckSquare size={18} color="#00a884" />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                          {item.code} - {item.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.type} Course</div>
                      </div>
                    </div>
                    <span style={styles.verifiedTag}>VERIFIED</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={() => window.print()} style={styles.actionBtnSecondary}>
                  <Printer size={15} />
                  <span>Print Exam Form</span>
                </button>
                <button onClick={() => alert('Downloading Exam Form Receipt PDF...')} style={styles.actionBtnPrimary}>
                  <Download size={15} />
                  <span>Download Form Receipt</span>
                </button>
              </div>
            </div>
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
    gap: '0.4rem',
    backgroundColor: '#f1f5f9',
    padding: '0.35rem',
    borderRadius: '12px',
    flexWrap: 'wrap'
  },
  subTabBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.55rem 0.95rem',
    borderRadius: '8px',
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  subTabBtnActive: {
    backgroundColor: '#ffffff',
    color: '#00a884',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
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
  saveBtn: {
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
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem'
  },
  statCard: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid'
  },
  statLabel: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: '#475569',
    letterSpacing: '0.04em'
  },
  statNum: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0.2rem 0'
  },
  statSub: {
    fontSize: '0.74rem',
    color: '#64748b'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
  },
  cardHeader: {
    padding: '1.25rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardHeaderTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0
  },
  exportBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#0f172a',
    cursor: 'pointer'
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
  tdBold: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  tdId: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#00a884'
  },
  tdMuted: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.82rem',
    color: '#64748b'
  },
  tdRank: {
    padding: '0.95rem 1.25rem',
    fontSize: '0.88rem',
    fontWeight: '800',
    color: '#b45309'
  },
  honorBadge: {
    backgroundColor: '#ccfbf1',
    color: '#0f766e',
    fontSize: '0.7rem',
    fontWeight: '800',
    padding: '0.2rem 0.55rem',
    borderRadius: '6px'
  },
  gradeBadge: {
    backgroundColor: '#e6f7f3',
    color: '#00a884',
    fontSize: '0.8rem',
    fontWeight: '800',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    border: '1px solid #a7f3d0'
  },
  scoreInput: {
    width: '65px',
    padding: '0.35rem 0.5rem',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center'
  },
  scoreCardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
  },
  scoreCardHeader: {
    backgroundColor: '#1e293b',
    padding: '1.75rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  collegeBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    backgroundColor: '#6b21a8',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '1.2rem'
  },
  officialTag: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: '800',
    padding: '0.25rem 0.65rem',
    borderRadius: '6px',
    letterSpacing: '0.08em'
  },
  scoreCardInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.25rem',
    padding: '1.5rem 2rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid var(--border-color)'
  },
  metaLabel: {
    fontSize: '0.68rem',
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: '0.05em'
  },
  metaValue: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: '0.15rem'
  },
  metaValueLarge: {
    fontSize: '1.05rem',
    fontWeight: '800',
    color: '#0f172a',
    marginTop: '0.15rem'
  },
  scoreTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  scoreCardFooter: {
    padding: '1.25rem 2rem',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionBtnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.55rem 1.1rem',
    fontSize: '0.84rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  actionBtnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.55rem 1rem',
    fontSize: '0.84rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  retestInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.25rem',
    backgroundColor: '#f8fafc',
    padding: '1.25rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)'
  },
  paidBadge: {
    backgroundColor: '#d1fae5',
    color: '#047857',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.25rem 0.65rem',
    borderRadius: '6px',
    border: '1px solid #a7f3d0'
  },
  approvedFormBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#ccfbf1',
    color: '#0f766e',
    fontSize: '0.74rem',
    fontWeight: '800',
    padding: '0.3rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid #99f6e4'
  },
  statusPill: {
    backgroundColor: '#d1fae5',
    color: '#047857',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.2rem 0.55rem',
    borderRadius: '6px'
  },
  formCheckRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid var(--border-color)'
  },
  verifiedTag: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: '#00a884',
    backgroundColor: '#e6f7f3',
    padding: '0.15rem 0.5rem',
    borderRadius: '6px'
  },
  examScoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem 2rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
  },
  examScoreMainTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 1.25rem 0'
  },
  cyberFieldset: {
    position: 'relative',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    marginBottom: '1.25rem',
    backgroundColor: '#ffffff'
  },
  cyberFieldsetLegend: {
    position: 'absolute',
    top: '-0.7rem',
    left: '1rem',
    backgroundColor: '#ffffff',
    padding: '0 0.5rem',
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#64748b'
  },
  sessionSelectInput: {
    padding: '0.4rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    cursor: 'pointer'
  },
  infoGridThreeCol: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1.2fr 1fr',
    gap: '1rem 1.5rem',
    paddingTop: '0.25rem'
  },
  infoColGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem'
  },
  infoRowItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.4rem',
    fontSize: '0.82rem'
  },
  infoLabelText: {
    color: '#94a3b8',
    fontWeight: '600'
  },
  infoValueText: {
    color: '#1e293b',
    fontWeight: '700'
  },
  marksTabRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.75rem',
    borderBottom: '1px solid #e2e8f0',
    margin: '1.5rem 0 1rem 0'
  },
  marksTabBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0.65rem 0',
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#64748b',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease'
  },
  marksTabBtnActive: {
    color: '#e05638',
    borderBottom: '3px solid #e05638'
  },
  semAccordionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  semAccordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1.25rem',
    cursor: 'pointer',
    backgroundColor: '#f1f5f9'
  },
  semAccordionTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1e293b'
  },
  semSgpaText: {
    fontSize: '0.85rem',
    fontWeight: '800',
    color: '#0f172a'
  },
  semAccordionBody: {
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0'
  },
  cyberTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.84rem'
  },
  cyberTh: {
    padding: '0.65rem 0.85rem',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontWeight: '700',
    fontSize: '0.78rem',
    borderBottom: '1px solid #e2e8f0'
  },
  cyberTr: {
    borderBottom: '1px solid #f1f5f9'
  },
  cyberTd: {
    padding: '0.65rem 0.85rem'
  },
  retestSlipWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem 2rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
  },
  pdfDownloadBar: {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    marginBottom: '1.5rem',
    backgroundColor: '#ffffff'
  },
  greenPdfDownloadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1.4rem',
    fontSize: '0.88rem',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(22, 165, 74, 0.35)',
    transition: 'all 0.2s ease'
  }
};
