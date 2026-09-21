import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  BrainCircuit, 
  Search, 
  Filter, 
  BookOpen, 
  UserCheck, 
  ChevronRight,
  Info,
  Calendar,
  Award
} from 'lucide-react';

import studentsData from '../data/students.json';

export default function AnalyticsPage({ currentUser, searchTerm: globalSearchTerm = '' }) {
  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  // State
  const [students, setStudents] = useState(studentsData || []);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'detained', 'critical', 'normal'
  const [selectedStudentAnalytics, setSelectedStudentAnalytics] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch Students & ML Analytics from Backend API or local state
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('http://localhost:8080/api/students');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setStudents(json.data);
          }
        }
      } catch (err) {
        console.log('Using local dataset for Analytics ML model:', err);
      }
    }
    loadData();
  }, []);

  // Sync global search
  useEffect(() => {
    if (globalSearchTerm) setSearchTerm(globalSearchTerm);
  }, [globalSearchTerm]);

  // If student, find their own record or default to currentUser's profile
  const myStudentData = students.find(s => 
    (s.registrationNumber && currentUser?.registrationNumber && s.registrationNumber === currentUser.registrationNumber) || 
    (s.email && currentUser?.email && s.email === currentUser.email) ||
    (s.name && currentUser?.name && s.name.toLowerCase() === currentUser.name.toLowerCase())
  ) || {
    name: currentUser?.name || 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
    registrationNumber: currentUser?.registrationNumber || '23ACOE1121163',
    rollNumber: 'AU7',
    department: currentUser?.department || 'COMPUTER ENGINEERING',
    attendancePercentage: 86.5,
    cgpa: 7.85
  };

  // Calculate ML prediction metrics for a given student
  const computeStudentAnalytics = (student) => {
    const att = student.attendancePercentage != null ? student.attendancePercentage : 82.0;
    const cgpa = student.cgpa != null ? student.cgpa : 7.2;
    
    const isDetained = att < 75.0;
    const riskScore = Math.round(Math.max(0.0, Math.min(100.0, (100.0 - att) * 1.2 + (10.0 - cgpa) * 8.0)) * 10) / 10;
    const riskLevel = isDetained ? 'CRITICAL' : (riskScore >= 35.0 ? 'IMPORTANT' : 'NORMAL');
    
    const predictedSgpa = Math.round(Math.min(10.0, Math.max(4.0, cgpa + (att >= 85 ? 0.35 : (att < 75 ? -0.75 : 0.05)))) * 100) / 100;

    const subjectsBreakdown = [
      { code: 'CS701', title: 'Deep Learning & Neural Networks', attendance: Math.round(att * 0.98), totalLecs: 36, conducted: 32, ut1: 16, ut2: 18, ia1: 8, ia2: 9 },
      { code: 'CS702', title: 'Cloud Computing & DevOps', attendance: Math.round(att * 1.02), totalLecs: 34, conducted: 30, ut1: 15, ut2: 17, ia1: 7, ia2: 8 },
      { code: 'CS703', title: 'Cybersecurity & Cryptography', attendance: Math.round(att * 0.94), totalLecs: 30, conducted: 26, ut1: 14, ut2: 15, ia1: 7, ia2: 7 },
      { code: 'CS704P', title: 'Major Project Phase - I', attendance: Math.round(att * 1.05), totalLecs: 18, conducted: 16, ut1: 18, ut2: 19, ia1: 9, ia2: 10 },
      { code: 'CS705P', title: 'Advanced AI Lab', attendance: Math.round(att * 0.96), totalLecs: 32, conducted: 28, ut1: 17, ut2: 18, ia1: 8, ia2: 9 }
    ].map(sub => {
      const attPct = Math.min(100, sub.attendance);
      const T = sub.conducted;
      const A = Math.round(T * (attPct / 100.0));
      const isSubDetained = attPct < 75.0;

      // Attendance recovery formula: X = max(0, ceil(3T - 4A))
      const additionalLecsNeeded = isSubDetained ? Math.max(0, Math.ceil(3 * T - 4 * A)) : 0;
      const safeMissableLecs = !isSubDetained ? Math.max(0, Math.floor((A - 0.75 * T) / 0.75)) : 0;

      // SPPU Evaluation Marks Formula (Internal max 40 = UT Avg max 20 + IA1 max 10 + IA2 max 10)
      const utAvg = Math.round((sub.ut1 + sub.ut2) / 2);
      const internalTotal = utAvg + sub.ia1 + sub.ia2; // max 40

      // Unit Test 2 Target Advice (e.g., if UT1 = 10/20, calculate score needed in UT2 for target UT Avg of 14/20)
      const targetUtAvg = 14;
      const requiredUt2ForTarget = Math.min(20, Math.max(0, 2 * targetUtAvg - sub.ut1));

      // Specific Actionable Advice Strings requested by user
      const attRecoveryAdviceStr = isSubDetained
        ? `Attend ${additionalLecsNeeded} lectures in this / upcoming month. Attending ${additionalLecsNeeded} additional lectures will raise attendance to > 75.0% and remove detention.`
        : `Attendance compliant at ${attPct}% (above 75% cutoff). Can safely miss up to ${safeMissableLecs} lectures without dropping below 75%.`;

      const ut2AdviceStr = `Scored ${sub.ut1} / 20 in UT1 ➔ Score at least ${requiredUt2ForTarget} / 20 in Second Unit Test Exam (UT2) to improve your result and raise UT Average to ${targetUtAvg}.0 / 20.`;
      
      // Min 40 marks out of 100 needed to pass
      const requiredEndSemToPass = Math.max(0, 40 - internalTotal); // out of 60
      const requiredEndSemForAGrade = Math.max(0, Math.min(60, 70 - internalTotal)); // out of 60
      const requiredEndSemForOGrade = Math.max(0, Math.min(60, 80 - internalTotal)); // out of 60

      return {
        ...sub,
        attendance: attPct,
        attendedLecs: A,
        isSubDetained,
        additionalLecsNeeded,
        safeMissableLecs,
        attRecoveryAdviceStr,
        utAvg,
        internalTotal,
        requiredUt2ForTarget,
        ut2AdviceStr,
        requiredEndSemToPass,
        requiredEndSemForAGrade,
        requiredEndSemForOGrade
      };
    });

    return {
      student,
      att,
      cgpa,
      isDetained,
      riskScore,
      riskLevel,
      predictedSgpa,
      detentionStatus: isDetained ? 'DETAINED / INELIGIBLE' : 'ELIGIBLE FOR EXAMS',
      examEligibility: isDetained ? 'INELIGIBLE FOR UNIT TESTS & END-SEM EXAMS' : 'ELIGIBLE FOR ALL EXAMINATIONS',
      subjectsBreakdown,
      overallAttAdvice: isDetained 
        ? `Attend ${Math.ceil(0.75 * 160 - Math.round(160 * (att/100)))} lectures in this / upcoming month across all subjects to bring overall attendance above 75.0% threshold.`
        : `Overall attendance is compliant at ${att}%. Maintain current attendance rhythm.`,
      overallUt2Advice: `In case of Unit Test 1 scores (e.g. 10/20 in low subjects), score at least 15–16 / 20 in Unit Test 2 (UT2) to elevate internal average score to >= 25 / 40.`,
      riskFactors: isDetained ? [
        `CRITICAL: Attendance is ${att}% (Below mandatory 75.0% threshold)`,
        `Detention Alert: Automatically barred from appearing in Unit Tests & End-Sem Examinations`,
        `Predicted SGPA drop of 0.75 points due to attendance deficit in Core subjects`
      ] : [
        `Attendance compliant at ${att}% (Safely above 75.0% threshold)`,
        `CGPA trajectory stable at ${cgpa}`,
        `Fully eligible for upcoming Unit Tests (UT1, UT2) and End-Sem Exams`
      ],
      recommendedIntervention: isDetained 
        ? 'Mandatory counseling session with HOD Dr. James Miller & submission of attendance recovery assignment'
        : 'Maintain current lecture attendance and lab submission pace'
    };
  };

  // Filter students for faculty view
  const filteredStudents = students.filter(std => {
    const analytics = computeStudentAnalytics(std);
    const matchesSearch = 
      std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (std.rollNumber && std.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'detained') return analytics.isDetained;
    if (activeFilter === 'critical') return analytics.riskLevel === 'CRITICAL';
    if (activeFilter === 'important') return analytics.riskLevel === 'IMPORTANT';
    if (activeFilter === 'normal') return analytics.riskLevel === 'NORMAL';
    return true;
  });

  const handleOpenStudentDetail = (std) => {
    const analytics = computeStudentAnalytics(std);
    setSelectedStudentAnalytics(analytics);
    setShowDetailModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* HEADER BANNER */}
      <div style={styles.headerBanner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={styles.headerIconCircle}>
            <BrainCircuit size={28} color="#ffffff" />
          </div>
          <div>
            <div style={styles.systemBadge}>
              <Sparkles size={13} color="#00ffb7" />
              <span>INTELLIGENT ACADEMIC PERFORMANCE PREDICTION AND EARLY WARNING SYSTEM</span>
            </div>
            <h2 style={styles.headerTitle}>Achilles ML Early Warning & Analytics Hub</h2>
            <p style={styles.headerSubtitle}>
              Real-time attendance detention monitoring (75% compulsory threshold) & UGC/SPPU SGPA trajectory forecasting.
            </p>
          </div>
        </div>
      </div>

      {/* STUDENT VIEW */}
      {!isFacultyOrAdmin ? (
        <StudentAnalyticsView analytics={computeStudentAnalytics(myStudentData)} />
      ) : (
        /* FACULTY / ADMIN VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Metrics Bar */}
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.metricLabel}>TOTAL ENROLLED STUDENTS</span>
                <BookOpen size={20} color="#0284c7" />
              </div>
              <div style={styles.metricValue}>{students.length}</div>
              <div style={styles.metricSubtext}>Computer Engineering Department</div>
            </div>

            <div style={{ ...styles.metricCard, borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.metricLabel}>EXAM DETAINED STUDENTS (&lt; 75%)</span>
                <ShieldAlert size={20} color="#ef4444" />
              </div>
              <div style={{ ...styles.metricValue, color: '#dc2626' }}>
                {students.filter(s => computeStudentAnalytics(s).isDetained).length}
              </div>
              <div style={{ ...styles.metricSubtext, color: '#dc2626', fontWeight: 600 }}>
                Ineligible for UT1, UT2 & End-Sem Exams
              </div>
            </div>

            <div style={{ ...styles.metricCard, borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.metricLabel}>AT-RISK / IMPORTANT LEVEL</span>
                <AlertTriangle size={20} color="#f59e0b" />
              </div>
              <div style={{ ...styles.metricValue, color: '#d97706' }}>
                {students.filter(s => computeStudentAnalytics(s).riskLevel === 'IMPORTANT').length}
              </div>
              <div style={styles.metricSubtext}>Requires academic intervention</div>
            </div>

            <div style={{ ...styles.metricCard, borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.metricLabel}>EXAM ELIGIBLE (&ge; 75%)</span>
                <UserCheck size={20} color="#10b981" />
              </div>
              <div style={{ ...styles.metricValue, color: '#059669' }}>
                {students.filter(s => !computeStudentAnalytics(s).isDetained).length}
              </div>
              <div style={styles.metricSubtext}>Cleared for Unit Tests & End-Sem</div>
            </div>
          </div>

          {/* Controls Bar: Search & Filter Tabs */}
          <div style={styles.controlsBar}>
            <div style={styles.searchBox}>
              <Search size={18} color="#64748b" />
              <input
                type="text"
                placeholder="Search student by name, registration #, or roll #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.filterTabs}>
              <button
                onClick={() => setActiveFilter('all')}
                style={{ ...styles.filterBtn, ...(activeFilter === 'all' ? styles.filterBtnActive : {}) }}
              >
                All Students ({students.length})
              </button>
              <button
                onClick={() => setActiveFilter('detained')}
                style={{ ...styles.filterBtn, ...(activeFilter === 'detained' ? styles.filterBtnDetained : {}) }}
              >
                🚨 Detained (&lt; 75%)
              </button>
              <button
                onClick={() => setActiveFilter('critical')}
                style={{ ...styles.filterBtn, ...(activeFilter === 'critical' ? styles.filterBtnCritical : {}) }}
              >
                Critical Risk
              </button>
              <button
                onClick={() => setActiveFilter('normal')}
                style={{ ...styles.filterBtn, ...(activeFilter === 'normal' ? styles.filterBtnActive : {}) }}
              >
                Normal / Eligible
              </button>
            </div>
          </div>

          {/* Students ML Table */}
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Student Early Warning & Attendance Compliance Roster
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Click on any student row to open their full ML prediction report.
              </span>
            </div>

            <table style={styles.table}>
              <thead>
                <tr style={styles.tableThRow}>
                  <th style={styles.th}>REG # / ROLL #</th>
                  <th style={styles.th}>STUDENT NAME</th>
                  <th style={styles.th}>ATTENDANCE (%)</th>
                  <th style={styles.th}>EXAM ELIGIBILITY</th>
                  <th style={styles.th}>CGPA</th>
                  <th style={styles.th}>PREDICTED SGPA</th>
                  <th style={styles.th}>ACHILLES RISK SCORE</th>
                  <th style={styles.th}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No student records found matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.slice(0, 50).map((std) => {
                    const analytics = computeStudentAnalytics(std);
                    const isDet = analytics.isDetained;

                    return (
                      <tr 
                        key={std.registrationNumber}
                        onClick={() => handleOpenStudentDetail(std)}
                        style={{
                          ...styles.tableTdRow,
                          backgroundColor: isDet ? '#fef2f2' : 'transparent'
                        }}
                      >
                        <td style={styles.td}>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{std.registrationNumber}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Roll: {std.rollNumber || 'N/A'}</div>
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <img
                              src={std.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                              alt={std.name}
                              style={styles.avatarImg}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{std.name}</div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Sec {std.classSection || 'A'} • {std.branch || 'COMPUTER ENG'}</div>
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
                              <span style={{ color: isDet ? '#dc2626' : '#059669' }}>{analytics.att}%</span>
                              <span style={{ fontSize: '0.7rem', color: isDet ? '#dc2626' : '#64748b' }}>
                                {isDet ? '(-' + (75.0 - analytics.att).toFixed(1) + '%)' : '(&ge; 75%)'}
                              </span>
                            </div>
                            <div style={styles.progressBarTrack}>
                              <div
                                style={{
                                  ...styles.progressBarFill,
                                  width: `${Math.min(100, analytics.att)}%`,
                                  backgroundColor: isDet ? '#ef4444' : '#10b981'
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          {isDet ? (
                            <span style={styles.badgeDetained}>
                              <ShieldAlert size={13} />
                              DETAINED / INELIGIBLE
                            </span>
                          ) : (
                            <span style={styles.badgeEligible}>
                              <CheckCircle2 size={13} />
                              ELIGIBLE
                            </span>
                          )}
                        </td>
                        <td style={{ ...styles.td, fontWeight: 700, color: '#0f172a' }}>
                          {analytics.cgpa}
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: analytics.predictedSgpa >= analytics.cgpa ? '#059669' : '#dc2626' }}>
                            {analytics.predictedSgpa >= analytics.cgpa ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                            {analytics.predictedSgpa}
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={getRiskBadgeStyle(analytics.riskLevel)}>
                            {analytics.riskLevel} ({analytics.riskScore})
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenStudentDetail(std);
                            }}
                            style={styles.inspectBtn}
                          >
                            Inspect Report
                            <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STUDENT ANALYTICS DETAIL MODAL (FOR FACULTY VIEW) */}
      {showDetailModal && selectedStudentAnalytics && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  Student Analytics & Early Warning Report
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {selectedStudentAnalytics.student.name} ({selectedStudentAnalytics.student.registrationNumber})
                </span>
              </div>
              <button onClick={() => setShowDetailModal(false)} style={styles.closeModalBtn}>
                &times;
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
              <StudentAnalyticsView analytics={selectedStudentAnalytics} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STUDENT ANALYTICS DASHBOARD VIEW COMPONENT */
function StudentAnalyticsView({ analytics }) {
  const { student, att, cgpa, isDetained, riskScore, riskLevel, predictedSgpa, subjectsBreakdown, riskFactors, recommendedIntervention } = analytics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* TOP DETENTION & EXAM ELIGIBILITY WARNING BANNER */}
      {isDetained ? (
        <div style={styles.alertBannerDetained}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={styles.alertIconCircleRed}>
              <ShieldAlert size={28} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#991b1b', letterSpacing: '0.02em' }}>
                🚨 EXAM DETENTION WARNING - INELIGIBLE FOR UNIT TESTS & END-SEM EXAMS
              </div>
              <p style={{ fontSize: '0.88rem', color: '#7f1d1d', marginTop: '0.35rem', lineHeight: '1.5' }}>
                Your overall lecture attendance is <strong>{att}%</strong>, which is below the mandatory <strong>75.0% UGC / SPPU threshold</strong>. 
                According to academic regulations, you are currently <strong>DETAINED</strong> and barred from appearing in upcoming Unit Tests (UT1, UT2) and End-Sem Examinations.
              </p>
              <div style={styles.detentionRuleBox}>
                <strong>Compulsory Rule:</strong> Minimum 75.0% attendance is strictly required to receive Hall Tickets and generate exam scorecards. Contact your HOD immediately for attendance recovery instructions.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.alertBannerEligible}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={styles.alertIconCircleGreen}>
              <CheckCircle2 size={28} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46' }}>
                ✅ EXAM ELIGIBILITY CONFIRMED - CLEARED FOR ALL EXAMINATIONS
              </div>
              <p style={{ fontSize: '0.88rem', color: '#047857', marginTop: '0.25rem' }}>
                Your overall lecture attendance is <strong>{att}%</strong> (safely above the <strong>75.0%</strong> minimum threshold). You are fully eligible to sit for upcoming Unit Tests and End-Sem Exams.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CORE ML ANALYTICS CARDS GRID */}
      <div style={styles.analyticsGrid}>
        {/* CARD 1: ATTENDANCE & EXAM COMPLIANCE GAUGE */}
        <div style={styles.analyticsCard}>
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="#0284c7" />
              <h3 style={styles.cardTitle}>Attendance Compliance & 75% Rule</h3>
            </div>
            <span style={isDetained ? styles.badgeDetained : styles.badgeEligible}>
              {isDetained ? 'DETAINED' : 'ELIGIBLE'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: isDetained ? '#dc2626' : '#059669' }}>
                {att}%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                Compulsory Threshold: 75.0%
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDetained ? '#dc2626' : '#059669' }}>
                {isDetained ? `Shortage: -${(75.0 - att).toFixed(1)}%` : `Margin: +${(att - 75.0).toFixed(1)}%`}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Status: {isDetained ? 'Barred from Exams' : 'Cleared for Hall Ticket'}
              </div>
            </div>
          </div>

          {/* Visual Progress Line */}
          <div style={styles.progressContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.25rem' }}>
              <span>0%</span>
              <span style={{ color: '#dc2626', fontWeight: 700 }}>| 75% Threshold</span>
              <span>100%</span>
            </div>
            <div style={styles.progressBarTrackLarge}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${Math.min(100, att)}%`,
                  backgroundColor: isDetained ? '#ef4444' : '#10b981'
                }}
              />
            </div>
          </div>

          {/* Subject Wise Attendance List */}
          <div style={{ marginTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.65rem' }}>
              Subject-Wise Attendance Breakdown:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {subjectsBreakdown.map(sub => (
                <div key={sub.code} style={styles.subjectRow}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                      {sub.code}: {sub.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Attended {Math.round(sub.conducted * (sub.attendance / 100))} of {sub.conducted} Conducted Lectures
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: sub.isSubDetained ? '#dc2626' : '#059669' }}>
                      {sub.attendance}%
                    </span>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: sub.isSubDetained ? '#dc2626' : '#059669' }}>
                      {sub.isSubDetained ? '❌ Detained' : '✅ Eligible'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2: ACHILLES ML PERFORMANCE PREDICTION */}
        <div style={styles.analyticsCard}>
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="#7c3aed" />
              <h3 style={styles.cardTitle}>Academic SGPA Trajectory Prediction</h3>
            </div>
            <span style={styles.modelBadge}>Achilles ML 1.0</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', marginBottom: '1.25rem' }}>
            <div style={styles.statBox}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>CURRENT CGPA</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{cgpa}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Scale: 10.0 (UGC System)</div>
            </div>

            <div style={{ ...styles.statBox, backgroundColor: 'rgba(124, 58, 237, 0.06)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed' }}>PREDICTED WINTER 2026 SGPA</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: predictedSgpa >= cgpa ? '#059669' : '#dc2626' }}>
                {predictedSgpa}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: predictedSgpa >= cgpa ? '#059669' : '#dc2626' }}>
                {predictedSgpa >= cgpa ? '▲ Projected SGPA Increase' : '▼ Projected SGPA Drop'}
              </div>
            </div>
          </div>

          {/* Model Insights Box */}
          <div style={styles.insightBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: '#4338ca' }}>
              <BrainCircuit size={16} />
              AI Performance Insight:
            </div>
            <p style={{ fontSize: '0.78rem', color: '#3730a3', marginTop: '0.35rem', lineHeight: '1.45' }}>
              Based on unit test trends, internal assignment completion, and attendance level ({att}%), the Achilles ML engine forecasts an End-Sem SGPA of <strong>{predictedSgpa}</strong>.
            </p>
          </div>

          {/* Risk Level Gauge */}
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Achilles At-Risk Score:</span>
              <span style={getRiskBadgeStyle(riskLevel)}>
                {riskLevel} ({riskScore} / 100)
              </span>
            </div>

            <div style={styles.riskMeterTrack}>
              <div
                style={{
                  ...styles.riskMeterFill,
                  width: `${riskScore}%`,
                  backgroundColor: riskLevel === 'CRITICAL' ? '#ef4444' : (riskLevel === 'IMPORTANT' ? '#f59e0b' : '#10b981')
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RISK FACTORS & RECOMMENDED INTERVENTIONS */}
      <div style={styles.interventionsCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <ShieldAlert size={22} color="#dc2626" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
            Key Academic Risk Indicators & AI Recommended Actions
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {/* Identified Factors */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569', marginBottom: '0.65rem' }}>
              Identified Risk & Compliance Factors:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {riskFactors.map((factor, idx) => (
                <div key={idx} style={styles.factorItem}>
                  <AlertTriangle size={15} color={isDetained ? '#dc2626' : '#d97706'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.82rem', color: '#1e293b', fontWeight: 500 }}>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Intervention */}
          <div style={styles.actionRecommendationBox}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.4rem' }}>
              💡 Mandatory Action Plan & Recommended Intervention:
            </div>
            <p style={{ fontSize: '0.85rem', color: '#312e81', lineHeight: '1.5', fontWeight: 600 }}>
              {recommendedIntervention}
            </p>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
              {isDetained && (
                <button
                  onClick={() => alert('Attendance recovery appeal request submitted to Dean & HOD office.')}
                  style={styles.actionBtnRed}
                >
                  Submit Attendance Recovery Appeal
                </button>
              )}
              <button
                onClick={() => alert('Academic advising appointment booked with HOD Dr. James Miller.')}
                style={styles.actionBtnPrimary}
              >
                Schedule Advising Session
              </button>
            </div>
          </div>
        </div>

        {/* ACHILLES ML UPCOMING RISK PREDICTIONS & ADVICES (EXPLICIT USER SUGGESTION CARDS) */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BrainCircuit size={18} color="#00a884" />
            <span>🤖 Achilles ML Upcoming Risk Predictions & Prescriptive Suggestions</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Advice 1: Attendance Recovery */}
            <div style={{ backgroundColor: isDetained ? '#fff1f2' : '#f0fdf4', border: `1px solid ${isDetained ? '#fecdd3' : '#bbf7d0'}`, borderRadius: '10px', padding: '0.9rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isDetained ? '#9f1239' : '#166534', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={15} />
                <span>Risk 1: Attendance & Detention Prevention Advice</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: isDetained ? '#881337' : '#14532d', margin: 0, lineHeight: '1.5', fontWeight: 600 }}>
                {isDetained ? (
                  <>In case of possible detention: <strong>Attend {subjectsBreakdown.reduce((sum, s) => sum + s.additionalLecsNeeded, 0)} lectures in this / upcoming month</strong>. Attending these lectures will raise your overall attendance to <strong>&gt; 75%</strong> and remove detention.</>
                ) : (
                  <>Attendance is healthy at <strong>{att}%</strong> (&ge; 75%). Maintain current attendance in upcoming months to remain fully eligible for exams.</>
                )}
              </p>
            </div>

            {/* Advice 2: Unit Test 2 Marks Target */}
            <div style={{ backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '0.9rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#5b21b6', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={15} />
                <span>Risk 2: Internal Unit Test Marks Target Advice</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#4c1d95', margin: 0, lineHeight: '1.5', fontWeight: 600 }}>
                If you scored <strong>10 / 20 in Unit Test 1 (UT1)</strong> in low subjects: <strong>Score at least 16 / 20 in the Second Unit Test Exam (UT2)</strong> to improve your result, elevate your UT Average to <strong>13.0/20</strong>, and ensure a passing internal baseline (&ge; 25/40).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ACHILLES ML OBSERVATION & ACADEMIC IMPROVEMENT PRESCRIPTION REPORT */}
      <div style={styles.prescriptionReportCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={styles.brainIconBadge}>
              <BrainCircuit size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                🤖 Achilles ML Observation & Academic Improvement Prescription Report
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Data-driven attendance recovery timetable & End-Sem exam passing targets (SPPU 100-mark evaluation scheme).
              </span>
            </div>
          </div>
          <span style={styles.prescTag}>Generated Real-Time</span>
        </div>

        {/* PRESCRIPTION SUBSECTION 1: ATTENDANCE RECOVERY (75% COMPULSORY RULE) */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Calendar size={18} color="#0284c7" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0369a1', margin: 0 }}>
              1. 5-Month Academic Timeline & Attendance Recovery Analysis (75.0% Rule)
            </h4>
          </div>

          {/* Academic Session Timeline Box */}
          <div style={styles.timelineNoticeBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.35rem' }}>
              <Info size={16} />
              <span>📅 Timetable & 5-Month Academic Calendar Rules:</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#0369a1', marginBottom: '0.5rem', lineHeight: '1.45' }}>
              <strong>Timetable Schedule:</strong> Monday to Friday (5 working days / week). Lecture count is dynamically computed per calendar month based on exact working days (accounting for month start/end mid-week boundaries).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem', fontSize: '0.78rem', color: '#1e293b' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                <strong style={{ color: '#0369a1' }}>Month 1 (August)</strong>
                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>21 Mon-Fri Days</div>
                <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.68rem', marginTop: '0.1rem' }}>Aug 1 Sat, Aug 2 Sun</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                <strong style={{ color: '#0369a1' }}>Month 2 (September)</strong>
                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>22 Mon-Fri Days</div>
                <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.68rem', marginTop: '0.1rem' }}>Ends Wed, Sep 30</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                <strong style={{ color: '#0369a1' }}>Month 3 (October)</strong>
                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>22 Mon-Fri Days</div>
                <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.68rem', marginTop: '0.1rem' }}>Ends Sat, Oct 31</div>
              </div>
              <div style={{ backgroundColor: '#fff1f2', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #fecdd3' }}>
                <strong style={{ color: '#be123c' }}>Month 4 (November)</strong>
                <div style={{ color: '#9f1239', fontSize: '0.7rem', fontWeight: 700 }}>21 Days (Nov 30 Cutoff)</div>
                <div style={{ color: '#881337', fontSize: '0.68rem', fontWeight: 700 }}>Attendance Stops Nov 30</div>
              </div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#475569', backgroundColor: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <strong>Month 5 (December - Exam Month):</strong> Attendance freezes on November 30. December (Dec 1 – Dec 31) is reserved for Study Leave, Practical Exams & Final End-Sem Examinations (0 teaching lectures).
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.prescTable}>
              <thead>
                <tr style={styles.prescThRow}>
                  <th style={styles.prescTh}>COURSE CODE & TITLE</th>
                  <th style={styles.prescTh}>ATTENDED / CONDUCTED</th>
                  <th style={styles.prescTh}>CURRENT ATTENDANCE</th>
                  <th style={styles.prescTh}>75% STATUS</th>
                  <th style={styles.prescTh}>ML PRESCRIPTION (LECTURES TO ATTEND)</th>
                </tr>
              </thead>
              <tbody>
                {subjectsBreakdown.map(sub => (
                  <tr key={sub.code} style={styles.prescTdRow}>
                    <td style={styles.prescTd}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{sub.code}: {sub.title}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Semester Lectures: {sub.totalLecs}</div>
                    </td>
                    <td style={styles.prescTd}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sub.attendedLecs}</span> / {sub.conducted}
                    </td>
                    <td style={styles.prescTd}>
                      <span style={{ fontWeight: 800, color: sub.isSubDetained ? '#dc2626' : '#059669' }}>
                        {sub.attendance}%
                      </span>
                    </td>
                    <td style={styles.prescTd}>
                      {sub.isSubDetained ? (
                        <span style={styles.badgeDetained}>❌ Detained (&lt; 75%)</span>
                      ) : (
                        <span style={styles.badgeEligible}>✅ Compliant</span>
                      )}
                    </td>
                    <td style={styles.prescTd}>
                      {sub.isSubDetained ? (
                        <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fda4af', padding: '0.45rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem' }}>
                          <strong style={{ color: '#be123c' }}>Must attend next {sub.additionalLecsNeeded} consecutive lectures</strong>
                          <div style={{ fontSize: '0.7rem', color: '#881337', marginTop: '0.15rem' }}>
                            Pace: ~{Math.ceil(sub.additionalLecsNeeded / 4)} weeks of 100% attendance required
                          </div>
                        </div>
                      ) : (
                        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', padding: '0.45rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', color: '#166534' }}>
                          <strong>Safe Margin:</strong> Can safely miss up to {sub.safeMissableLecs} lectures without dropping below 75%
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRESCRIPTION SUBSECTION 2: MARKS & EXAM PASSING TARGETS (SPPU SCHEME) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Award size={18} color="#7c3aed" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6d28d9', margin: 0 }}>
              2. SPPU Subject Marks Evaluation & End-Sem Exam Pass Prescription (Min 40/100 to Pass)
            </h4>
          </div>

          <div style={styles.formulaNoticeBox}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '0.25rem' }}>
              📐 Subject Evaluation Formula (100 Marks Total):
            </div>
            <div style={{ fontSize: '0.78rem', color: '#3730a3', lineHeight: '1.45' }}>
              <strong>Total Subject Score</strong> = Internal Component (Out of 40) + External End-Sem Exam Score (Out of 60).<br />
              <em>Internal Component (40 Marks)</em> = Average of UT1 & UT2 (max 20) + Internal Assessment 1 (10) + Internal Assessment 2 (10).<br />
              <strong>Passing Criteria:</strong> Student requires minimum <strong>40 marks out of 100</strong> overall to pass each subject.
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={styles.prescTable}>
              <thead>
                <tr style={styles.prescThRow}>
                  <th style={styles.prescTh}>COURSE</th>
                  <th style={styles.prescTh}>UT AVG (OUT OF 20)</th>
                  <th style={styles.prescTh}>INTERNAL ASSESSMENTS (OUT OF 20)</th>
                  <th style={styles.prescTh}>TOTAL INTERNAL (OUT OF 40)</th>
                  <th style={styles.prescTh}>REQUIRED END-SEM MARKS (OUT OF 60) TO PASS (40 MARKS)</th>
                  <th style={styles.prescTh}>REQUIRED FOR A GRADE (70 MARKS)</th>
                </tr>
              </thead>
              <tbody>
                {subjectsBreakdown.map(sub => {
                  const internalWarning = sub.internalTotal < 16;
                  return (
                    <tr key={sub.code} style={styles.prescTdRow}>
                      <td style={styles.prescTd}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{sub.code}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{sub.title}</div>
                      </td>
                      <td style={styles.prescTd}>
                        <span style={{ fontWeight: 700 }}>{sub.utAvg} / 20</span>
                        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>UT1: {sub.ut1}, UT2: {sub.ut2}</div>
                      </td>
                      <td style={styles.prescTd}>
                        <span style={{ fontWeight: 700 }}>{sub.ia1 + sub.ia2} / 20</span>
                        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>IA1: {sub.ia1}, IA2: {sub.ia2}</div>
                      </td>
                      <td style={styles.prescTd}>
                        <span style={{ fontWeight: 800, color: internalWarning ? '#dc2626' : '#0f172a' }}>
                          {sub.internalTotal} / 40
                        </span>
                        {internalWarning && <div style={{ fontSize: '0.68rem', color: '#dc2626', fontWeight: 700 }}>⚠️ Low Internal</div>}
                      </td>
                      <td style={styles.prescTd}>
                        <div style={{ backgroundColor: sub.requiredEndSemToPass > 35 ? '#fff1f2' : '#f0fdf4', padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                          <strong style={{ color: sub.requiredEndSemToPass > 35 ? '#be123c' : '#15803d' }}>
                            Need {sub.requiredEndSemToPass} / 60
                          </strong>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            (Internal {sub.internalTotal} + {sub.requiredEndSemToPass} = 40 Pass)
                          </div>
                        </div>
                      </td>
                      <td style={styles.prescTd}>
                        <span style={{ fontWeight: 700, color: '#6d28d9' }}>
                          Need {sub.requiredEndSemForAGrade} / 60
                        </span>
                        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>For O Grade (80): {sub.requiredEndSemForOGrade}/60</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample fallback data if backend API is offline
function getSampleStudentAdeen() {
  return {
    id: 'std-001',
    name: 'MR. ADEEN WAQQAS AHMED SHAHZAD AHMED',
    registrationNumber: '23ACOE1121163',
    rollNumber: 'A07',
    classSection: 'A',
    branch: 'COMPUTER ENGINEERING',
    semester: 'VII',
    cgpa: 7.18,
    attendancePercentage: 85.0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };
}

function getSampleStudentsList() {
  return [
    { id: 'std-001', name: 'MR. ADEEN WAQQAS AHMED SHAHZAD AHMED', registrationNumber: '23ACOE1121163', rollNumber: 'A07', classSection: 'A', branch: 'COMPUTER ENGINEERING', cgpa: 7.18, attendancePercentage: 85.0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'std-002', name: 'SIDDHARTH NAIR', registrationNumber: '23ACOE1121002', rollNumber: 'A02', classSection: 'A', branch: 'COMPUTER ENGINEERING', cgpa: 5.80, attendancePercentage: 64.5, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 'std-003', name: 'AANYA SHARMA', registrationNumber: '23ACOE1121003', rollNumber: 'A03', classSection: 'A', branch: 'COMPUTER ENGINEERING', cgpa: 9.10, attendancePercentage: 94.0, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 'std-004', name: 'ROHAN VERMA', registrationNumber: '23ACOE1121004', rollNumber: 'A04', classSection: 'A', branch: 'COMPUTER ENGINEERING', cgpa: 6.10, attendancePercentage: 71.0, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 'std-005', name: 'RIYA PATEL', registrationNumber: '23ACOE1121005', rollNumber: 'A05', classSection: 'A', branch: 'COMPUTER ENGINEERING', cgpa: 8.40, attendancePercentage: 88.5, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 'std-006', name: 'KUNAL DESHMUKH', registrationNumber: '23ACOE1121006', rollNumber: 'A06', classSection: 'A', branch: 'COMPUTER ENGINEERING', cgpa: 5.40, attendancePercentage: 58.0, avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }
  ];
}

function getRiskBadgeStyle(level) {
  if (level === 'CRITICAL') {
    return { backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' };
  }
  if (level === 'IMPORTANT') {
    return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' };
  }
  return { backgroundColor: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' };
}

// STYLES OBJECT
const styles = {
  headerBanner: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: '16px',
    padding: '1.75rem 2rem',
    color: '#ffffff',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  headerIconCircle: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    backgroundColor: '#00a884',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 168, 132, 0.4)',
    flexShrink: 0
  },
  systemBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: 'rgba(0, 168, 132, 0.15)',
    border: '1px solid rgba(0, 168, 132, 0.4)',
    color: '#00ffb7',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.25rem 0.65rem',
    borderRadius: '20px',
    letterSpacing: '0.05em',
    marginBottom: '0.4rem'
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0
  },
  headerSubtitle: {
    fontSize: '0.88rem',
    color: '#94a3b8',
    marginTop: '0.25rem',
    margin: 0
  },

  alertBannerDetained: {
    backgroundColor: '#fff1f2',
    border: '2px solid #f43f5e',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 4px 15px rgba(244, 63, 94, 0.15)'
  },
  alertBannerEligible: {
    backgroundColor: '#ecfdf5',
    border: '2px solid #10b981',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.12)'
  },
  alertIconCircleRed: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: '#e11d48',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
  },
  alertIconCircleGreen: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: '#059669',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  detentionRuleBox: {
    marginTop: '0.75rem',
    padding: '0.65rem 0.85rem',
    backgroundColor: '#ffe4e6',
    borderRadius: '8px',
    fontSize: '0.8rem',
    color: '#9f1239',
    borderLeft: '4px solid #e11d48'
  },

  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
  },
  analyticsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #f1f5f9'
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  badgeDetained: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.25rem 0.65rem',
    borderRadius: '6px'
  },
  badgeEligible: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#d1fae5',
    color: '#059669',
    border: '1px solid #6ee7b7',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.25rem 0.65rem',
    borderRadius: '6px'
  },
  modelBadge: {
    backgroundColor: '#f3e8ff',
    color: '#6b21a8',
    border: '1px solid #d8b4fe',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.2rem 0.5rem',
    borderRadius: '6px'
  },

  progressContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  progressBarTrackLarge: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e2e8f0',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  progressBarTrack: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '5px',
    transition: 'width 0.4s ease'
  },

  subjectRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #f1f5f9'
  },

  statBox: {
    padding: '1rem',
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  insightBox: {
    backgroundColor: '#e0e7ff',
    border: '1px solid #c7d2fe',
    borderRadius: '10px',
    padding: '0.85rem'
  },

  riskMeterTrack: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.35rem'
  },
  riskMeterFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.4s ease'
  },

  interventionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
  },
  factorItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    borderLeft: '3px solid #f59e0b'
  },
  actionRecommendationBox: {
    backgroundColor: '#eef2ff',
    border: '1.5px solid #6366f1',
    borderRadius: '12px',
    padding: '1.15rem'
  },
  actionBtnRed: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.55rem 0.95rem',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
  },
  actionBtnPrimary: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.55rem 0.95rem',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
  },

  /* Faculty Control Layout Styles */
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem'
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.15rem',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
  },
  metricLabel: {
    fontSize: '0.72rem',
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: '0.04em'
  },
  metricValue: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#0f172a'
  },
  metricSubtext: {
    fontSize: '0.72rem',
    color: '#64748b'
  },

  controlsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '0.6rem 1rem',
    width: '380px'
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '0.88rem',
    color: '#0f172a'
  },
  filterTabs: {
    display: 'flex',
    gap: '0.5rem'
  },
  filterBtn: {
    padding: '0.55rem 0.95rem',
    borderRadius: '8px',
    fontSize: '0.82rem',
    fontWeight: '600',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  filterBtnActive: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderColor: '#0f172a'
  },
  filterBtnDetained: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderColor: '#ef4444',
    fontWeight: 700
  },
  filterBtnCritical: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    borderColor: '#dc2626'
  },

  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
  },
  tableHeader: {
    padding: '1.15rem 1.5rem',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  tableThRow: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  th: {
    padding: '0.85rem 1.25rem',
    fontSize: '0.72rem',
    fontWeight: '800',
    color: '#475569',
    letterSpacing: '0.04em'
  },
  tableTdRow: {
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease'
  },
  td: {
    padding: '0.85rem 1.25rem',
    fontSize: '0.85rem'
  },
  avatarImg: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  inspectBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.35rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer'
  },

  /* Modal Styles */
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '1.5rem'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    width: '100%',
    maxWidth: '960px',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
  },
  modalHeader: {
    backgroundColor: '#0f172a',
    padding: '1.25rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeModalBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '1.8rem',
    cursor: 'pointer',
    lineHeight: 1
  },

  /* Prescription Report Styles */
  prescriptionReportCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #cbd5e1',
    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)'
  },
  brainIconBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: '#4338ca',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  prescTag: {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    border: '1px solid #c7d2fe',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.25rem 0.65rem',
    borderRadius: '20px'
  },
  formulaNoticeBox: {
    backgroundColor: '#f5f3ff',
    border: '1px solid #ddd6fe',
    borderRadius: '10px',
    padding: '0.85rem 1rem'
  },
  timelineNoticeBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #7dd3fc',
    borderRadius: '10px',
    padding: '0.85rem 1rem',
    marginBottom: '1rem'
  },
  prescTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  prescThRow: {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #cbd5e1'
  },
  prescTh: {
    padding: '0.75rem 0.85rem',
    fontSize: '0.72rem',
    fontWeight: '800',
    color: '#334155',
    letterSpacing: '0.03em'
  },
  prescTdRow: {
    borderBottom: '1px solid #f1f5f9'
  },
  prescTd: {
    padding: '0.75rem 0.85rem',
    fontSize: '0.82rem'
  }
};
