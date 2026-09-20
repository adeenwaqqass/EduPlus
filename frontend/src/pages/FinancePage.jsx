import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ChevronDown, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  X, 
  Printer, 
  ArrowRight,
  ArrowLeft,
  Receipt,
  QrCode,
  Search,
  User,
  Filter,
  Eye
} from 'lucide-react';

export default function FinancePage({ searchTerm = '', currentUser }) {
  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  const isStudent = !isFacultyOrAdmin;

  const [expandedYear, setExpandedYear] = useState('2026-2027 IV');
  const [activeFinanceTab, setActiveFinanceTab] = useState('Academic');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('upi');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Selected student for Faculty / Admin detail view
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState(null);
  const [rosterSearch, setRosterSearch] = useState(searchTerm);

  // Student Roster List for Faculty / Admin View
  const studentFeeRoster = [
    {
      id: '23ACOE1121163',
      name: 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
      registrationNumber: '23ACOE1121163',
      degree: 'Bachelor of Technology',
      branch: 'Computer Engineering',
      year: 'IV',
      semester: 'VII',
      academicBatch: '2023-2027',
      classSection: 'A',
      rollNumber: 'A07',
      academicYear: '2026-27',
      academicSession: 'WINTER 2026',
      admissionCategory: 'Institute Level',
      category: 'OBC',
      feeCategoryName: 'NON-CAP',
      enrollmentType: 'First Year',
      totalReceivables: 131339.00,
      totalCollected: 160627.00,
      outstanding: -29288.00,
      status: 'Excess Paid',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'CS-2024-089',
      name: 'Elena Rostova',
      registrationNumber: 'CS-2024-089',
      degree: 'Bachelor of Technology',
      branch: 'Computer Science',
      year: 'IV',
      semester: 'VII',
      academicBatch: '2023-2027',
      classSection: 'A',
      rollNumber: 'A02',
      academicYear: '2026-27',
      academicSession: 'WINTER 2026',
      admissionCategory: 'CAP Allotment',
      category: 'OPEN',
      feeCategoryName: 'CAP',
      enrollmentType: 'First Year',
      totalReceivables: 131339.00,
      totalCollected: 131339.00,
      outstanding: 0.00,
      status: 'No Dues',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'CS-2024-112',
      name: 'Siddharth Nair',
      registrationNumber: 'CS-2024-112',
      degree: 'Bachelor of Technology',
      branch: 'Computer Science',
      year: 'IV',
      semester: 'VII',
      academicBatch: '2023-2027',
      classSection: 'A',
      rollNumber: 'A03',
      academicYear: '2026-27',
      academicSession: 'WINTER 2026',
      admissionCategory: 'CAP Allotment',
      category: 'OBC',
      feeCategoryName: 'CAP-EBC',
      enrollmentType: 'First Year',
      totalReceivables: 131339.00,
      totalCollected: 50000.00,
      outstanding: 81339.00,
      status: 'Unpaid',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'PHY-2023-012',
      name: 'Marcus Aurelius',
      registrationNumber: 'PHY-2023-012',
      degree: 'Bachelor of Technology',
      branch: 'Electrical Engineering',
      year: 'IV',
      semester: 'VII',
      academicBatch: '2023-2027',
      classSection: 'A',
      rollNumber: 'A04',
      academicYear: '2026-27',
      academicSession: 'WINTER 2026',
      admissionCategory: 'CAP Allotment',
      category: 'SC',
      feeCategoryName: 'TFWS',
      enrollmentType: 'First Year',
      totalReceivables: 17426.00,
      totalCollected: 17426.00,
      outstanding: 0.00,
      status: 'No Dues',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'LIT-2025-441',
      name: 'Lydia Vance',
      registrationNumber: 'LIT-2025-441',
      degree: 'Bachelor of Technology',
      branch: 'Data Science',
      year: 'III',
      semester: 'V',
      academicBatch: '2024-2028',
      classSection: 'B',
      rollNumber: 'B05',
      academicYear: '2026-27',
      academicSession: 'WINTER 2026',
      admissionCategory: 'CAP Allotment',
      category: 'OPEN',
      feeCategoryName: 'CAP',
      enrollmentType: 'First Year',
      totalReceivables: 131339.00,
      totalCollected: 131339.00,
      outstanding: 0.00,
      status: 'No Dues',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    }
  ];

  // Active student info to render in fee details card
  const studentInfo = selectedStudentForDetails || {
    name: 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
    registrationNumber: '23ACOE1121163',
    degree: 'Bachelor of Technology',
    branch: 'Computer Engineering',
    year: 'IV',
    semester: 'VII',
    academicBatch: '2023-2027',
    classSection: 'A',
    rollNumber: 'A07',
    academicYear: '2026-27',
    academicSession: 'WINTER 2026',
    admissionCategory: 'Institute Level',
    category: 'OBC',
    feeCategoryName: 'NON-CAP',
    enrollmentType: 'First Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  // Academic Years List
  const academicYears = [
    { id: '2023-2024 I', title: '2023-2024 I', status: 'COMPLETED' },
    { id: '2024-2025 II', title: '2024-2025 II', status: 'COMPLETED' },
    { id: '2025-2026 III', title: '2025-2026 III', status: 'COMPLETED' },
    { id: '2026-2027 IV', title: '2026-2027 IV', status: 'ACTIVE' }
  ];

  // Fee Heads Data
  const feeHeads = [
    { sNo: 1, head: 'Tuition fee', receivable: 113913.00, collected: 0.00, outstanding: 113913.00, status: 'Unpaid' },
    { sNo: 2, head: 'Development fee', receivable: 17087.00, collected: 0.00, outstanding: 17087.00, status: 'Unpaid' },
    { sNo: 3, head: 'University Prorata', receivable: 339.00, collected: 0.00, outstanding: 339.00, status: 'Unpaid' },
    { sNo: 4, head: 'SC Scholarship (50% GSSR)', receivable: 0.00, collected: 0.00, outstanding: 0.00, status: 'No Dues' },
    { sNo: 5, head: 'Advance Fees', receivable: 0.00, collected: 160627.00, outstanding: -160627.00, status: 'Excess Paid' }
  ];

  // Transaction History Mock Data
  const [transactionHistory, setTransactionHistory] = useState([
    { id: 'TXN-904128', date: 'Jul 15, 2026', head: 'Academic Fee Advance', amount: '₹ 160,627.00', mode: 'Net Banking (HDFC)', refNo: 'HDFC904812391', status: 'SUCCESS' },
    { id: 'TXN-801244', date: 'Jan 10, 2026', head: 'Development & Exam Fee', amount: '₹ 17,087.00', mode: 'UPI (Google Pay)', refNo: 'UPI2026881923', status: 'SUCCESS' },
    { id: 'TXN-709112', date: 'Aug 02, 2025', head: 'Tuition Fee Sem V', amount: '₹ 113,913.00', mode: 'Debit Card (SBI)', refNo: 'SBICARD771239', status: 'SUCCESS' }
  ]);

  // Payment History Log
  const onlinePaymentLog = [
    { txnId: 'PAY-2026-9912', dateTime: '2026-07-15 14:22:10', mode: 'Net Banking', amount: '₹ 160,627.00', gatewayStatus: 'SUCCESS (RRN: 904812391)' },
    { txnId: 'PAY-2026-4410', dateTime: '2026-01-10 11:05:44', mode: 'UPI', amount: '₹ 17,087.00', gatewayStatus: 'SUCCESS (RRN: 2026881923)' },
    { txnId: 'PAY-2025-1102', dateTime: '2025-08-02 16:40:19', mode: 'Card', amount: '₹ 113,913.00', gatewayStatus: 'SUCCESS (RRN: 771239)' }
  ];

  const formatCurrency = (val) => {
    if (val < 0) {
      return `- ₹ ${Math.abs(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₹ ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCompletePayment = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      const newTxn = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        date: 'Just now',
        head: 'Tuition & Development Fee Settlement',
        amount: '₹ 29,288.00',
        mode: selectedPaymentMode.toUpperCase(),
        refNo: `REF${Date.now()}`,
        status: 'SUCCESS'
      };
      setTransactionHistory([newTxn, ...transactionHistory]);
      setPaymentSuccess(false);
      setShowPaymentModal(false);
    }, 2000);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Unpaid':
        return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' };
      case 'No Dues':
        return { bg: '#e0f2fe', color: '#0284c7', border: '#93c5fd' };
      case 'Excess Paid':
        return { bg: '#ccfbf1', color: '#0f766e', border: '#99f6e4' };
      default:
        return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
    }
  };

  const filteredRoster = studentFeeRoster.filter(st => 
    st.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
    st.registrationNumber.toLowerCase().includes(rosterSearch.toLowerCase()) ||
    st.branch.toLowerCase().includes(rosterSearch.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Title & Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={styles.pageMainTitle}>
            {isFacultyOrAdmin && !selectedStudentForDetails ? 'Department Student Fee Roster' : 'Student Fees Details'}
          </h2>
          {isFacultyOrAdmin && !selectedStudentForDetails && (
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              Select a student from the list below to view their detailed fee breakdown, receivables, and payment status.
            </p>
          )}
        </div>
        {isFacultyOrAdmin && selectedStudentForDetails && (
          <button 
            onClick={() => setSelectedStudentForDetails(null)}
            style={styles.backBtn}
          >
            <ArrowLeft size={16} />
            <span>← Back to Student Fee Roster</span>
          </button>
        )}
      </div>

      {/* FACULTY / ADMIN VIEW: STUDENT FEE ROSTER TABLE */}
      {isFacultyOrAdmin && !selectedStudentForDetails ? (
        <div style={styles.rosterCard}>
          <div style={styles.rosterHeader}>
            <div style={styles.searchBox}>
              <Search size={16} color="#64748b" />
              <input
                type="text"
                placeholder="Search student by name, reg. no., or branch..."
                value={rosterSearch}
                onChange={(e) => setRosterSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
              Showing {filteredRoster.length} Students
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '50px' }}>#</th>
                  <th style={styles.th}>Student Name</th>
                  <th style={styles.th}>Reg. No.</th>
                  <th style={styles.th}>Branch / Sem</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Total Receivables</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Total Collected</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Outstanding</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Status</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoster.map((st, idx) => {
                  const badge = getStatusBadgeStyle(st.status);
                  return (
                    <tr key={st.id} style={styles.tr}>
                      <td style={{ ...styles.td, textAlign: 'center', fontWeight: '600', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ ...styles.td, fontWeight: '700' }}>
                        <button
                          onClick={() => setSelectedStudentForDetails(st)}
                          style={styles.studentNameBtn}
                        >
                          <User size={15} color="#00a884" />
                          <span>{st.name}</span>
                        </button>
                      </td>
                      <td style={{ ...styles.td, fontFamily: 'monospace', color: '#64748b' }}>{st.registrationNumber}</td>
                      <td style={{ ...styles.td, color: '#475569' }}>{st.branch} ({st.semester})</td>
                      <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                        {formatCurrency(st.totalReceivables)}
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                        {formatCurrency(st.totalCollected)}
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: st.outstanding > 0 ? '#dc2626' : st.outstanding < 0 ? '#047857' : '#0f172a' }}>
                        {formatCurrency(st.outstanding)}
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <span style={{ ...styles.statusBadge, backgroundColor: badge.bg, color: badge.color, borderColor: badge.border }}>
                          {st.status}
                        </span>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedStudentForDetails(st)}
                          style={styles.viewFeeBtn}
                        >
                          <Eye size={14} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* DETAILED FEE STATEMENT VIEW (STUDENTS OR FACULTY/ADMIN WHEN STUDENT IS SELECTED) */
        <>
          {/* Student Details Card */}
          <div style={styles.profileCard}>
            <div style={styles.infoGrid}>
              {/* Column 1 */}
              <div style={styles.infoCol}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Name :</span>
                  <span style={styles.infoVal}>{studentInfo.name}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Branch :</span>
                  <span style={styles.infoVal}>{studentInfo.branch}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Academic Batch :</span>
                  <span style={styles.infoVal}>{studentInfo.academicBatch}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Academic Year :</span>
                  <span style={styles.infoVal}>{studentInfo.academicYear}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Category :</span>
                  <span style={styles.infoVal}>{studentInfo.category}</span>
                </div>
              </div>

              {/* Column 2 */}
              <div style={styles.infoCol}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Registration Number :</span>
                  <span style={styles.infoVal}>{studentInfo.registrationNumber}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Year :</span>
                  <span style={styles.infoVal}>{studentInfo.year}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Class Section :</span>
                  <span style={styles.infoVal}>{studentInfo.classSection}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Academic Session :</span>
                  <span style={styles.infoVal}>{studentInfo.academicSession}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Fee Category Name :</span>
                  <span style={styles.infoVal}>{studentInfo.feeCategoryName}</span>
                </div>
              </div>

              {/* Column 3 */}
              <div style={styles.infoCol}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Degree :</span>
                  <span style={styles.infoVal}>{studentInfo.degree}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Semester :</span>
                  <span style={styles.infoVal}>{studentInfo.semester}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Roll Number :</span>
                  <span style={styles.infoVal}>{studentInfo.rollNumber}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Admission Category :</span>
                  <span style={styles.infoVal}>{studentInfo.admissionCategory}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Enrollment Type :</span>
                  <span style={styles.infoVal}>{studentInfo.enrollmentType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Year Accordion Section */}
          <div style={styles.accordionContainer}>
            {academicYears.map((yr) => {
              const isExpanded = expandedYear === yr.id;

              return (
                <div key={yr.id} style={styles.accordionCard}>
                  <div 
                    style={styles.accordionHeader}
                    onClick={() => setExpandedYear(isExpanded ? null : yr.id)}
                  >
                    <span style={styles.accordionTitle}>{yr.title}</span>
                    <ChevronDown 
                      size={18} 
                      color="#64748b" 
                      style={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </div>

                  {isExpanded && (
                    <div style={styles.accordionBody}>
                      {/* Tabs Row & Pay Now Button */}
                      <div style={styles.tabActionRow}>
                        <div style={styles.financeSubTabs}>
                          {['Academic', 'Others', 'Transaction History', 'Online Payment History'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveFinanceTab(tab)}
                              style={{
                                ...styles.tabBtn,
                                ...(activeFinanceTab === tab ? styles.tabBtnActive : {})
                              }}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Pay Now Button - ONLY visible for Students, NOT Faculty or Admin */}
                        {isStudent && (
                          <button 
                            onClick={() => setShowPaymentModal(true)}
                            style={styles.payNowBtn}
                          >
                            <span>Pay Now</span>
                          </button>
                        )}
                      </div>

                  {/* TAB 1: ACADEMIC FEE HEADS TABLE */}
                  {activeFinanceTab === 'Academic' && (
                    <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={{ ...styles.th, width: '60px' }}>S. No.</th>
                            <th style={styles.th}>Fee Heads</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Total Receivables</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Total Collected Amount</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Outstanding</th>
                            <th style={{ ...styles.th, textAlign: 'center' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeHeads.map((row) => {
                            const badge = getStatusBadgeStyle(row.status);

                            return (
                              <tr key={row.sNo} style={styles.tr}>
                                <td style={{ ...styles.td, textAlign: 'center', fontWeight: '600' }}>{row.sNo}</td>
                                <td style={{ ...styles.td, fontWeight: '600', color: '#1e293b' }}>{row.head}</td>
                                <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                                  {formatCurrency(row.receivable)}
                                </td>
                                <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                                  {formatCurrency(row.collected)}
                                </td>
                                <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: row.outstanding > 0 ? '#dc2626' : row.outstanding < 0 ? '#047857' : '#0f172a' }}>
                                  {formatCurrency(row.outstanding)}
                                </td>
                                <td style={{ ...styles.td, textAlign: 'center' }}>
                                  <span style={{ ...styles.statusBadge, backgroundColor: badge.bg, color: badge.color, borderColor: badge.border }}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}

                          {/* Total Row (A) */}
                          <tr style={styles.totalTr}>
                            <td style={{ ...styles.td, fontWeight: '800' }}>(A)</td>
                            <td style={{ ...styles.td, fontWeight: '800' }}>Total</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '800' }}>₹ 131,339.00</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '800' }}>₹ 160,627.00</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '800', color: '#047857' }}>- ₹ 29,288.00</td>
                            <td></td>
                          </tr>

                          {/* Scholarship Row (B) */}
                          <tr style={styles.tr}>
                            <td style={{ ...styles.td, fontWeight: '800' }}>(B)</td>
                            <td style={{ ...styles.td, fontWeight: '700' }}>Scholarship Amount</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>

                          {/* Grand Total Row (A + B) */}
                          <tr style={{ ...styles.totalTr, backgroundColor: '#f1f5f9' }}>
                            <td style={{ ...styles.td, fontWeight: '800' }}>(A + B)</td>
                            <td style={{ ...styles.td, fontWeight: '800', color: '#00a884' }}>Grand Total</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '800', color: '#00a884' }}>₹ 131,339.00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB 2: OTHERS TAB */}
                  {activeFinanceTab === 'Others' && (
                    <div style={{ padding: '1rem 0' }}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Head Name</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Receivable Amount</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Paid Amount</th>
                            <th style={{ ...styles.th, textAlign: 'center' }}>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={styles.tr}>
                            <td style={{ ...styles.td, fontWeight: '600' }}>Gymkhana & Sports Fee</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace' }}>₹ 1,500.00</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace' }}>₹ 1,500.00</td>
                            <td style={{ ...styles.td, textAlign: 'center', color: '#047857', fontWeight: '700' }}>Cleared</td>
                          </tr>
                          <tr style={styles.tr}>
                            <td style={{ ...styles.td, fontWeight: '600' }}>Library Security Deposit</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace' }}>₹ 3,000.00</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace' }}>₹ 3,000.00</td>
                            <td style={{ ...styles.td, textAlign: 'center', color: '#047857', fontWeight: '700' }}>Refundable</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB 3: TRANSACTION HISTORY */}
                  {activeFinanceTab === 'Transaction History' && (
                    <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Receipt / Txn ID</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Fee Description</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Amount Paid</th>
                            <th style={styles.th}>Payment Mode</th>
                            <th style={{ ...styles.th, textAlign: 'center' }}>Receipt PDF</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactionHistory.map((txn) => (
                            <tr key={txn.id} style={styles.tr}>
                              <td style={{ ...styles.td, fontWeight: '700', color: '#00a884', fontFamily: 'monospace' }}>{txn.id}</td>
                              <td style={{ ...styles.td, color: '#475569' }}>{txn.date}</td>
                              <td style={{ ...styles.td, fontWeight: '600', color: '#1e293b' }}>{txn.head}</td>
                              <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '800', color: '#047857' }}>{txn.amount}</td>
                              <td style={{ ...styles.td, color: '#475569' }}>{txn.mode}</td>
                              <td style={{ ...styles.td, textAlign: 'center' }}>
                                <button 
                                  onClick={() => alert(`Downloading Fee Payment Receipt ${txn.id}...`)}
                                  style={styles.downloadReceiptBtn}
                                >
                                  <Download size={13} />
                                  <span>Download</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB 4: ONLINE PAYMENT HISTORY */}
                  {activeFinanceTab === 'Online Payment History' && (
                    <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Gateway Txn ID</th>
                            <th style={styles.th}>Date & Time</th>
                            <th style={styles.th}>Channel</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Amount</th>
                            <th style={styles.th}>Gateway Response</th>
                          </tr>
                        </thead>
                        <tbody>
                          {onlinePaymentLog.map((log) => (
                            <tr key={log.txnId} style={styles.tr}>
                              <td style={{ ...styles.td, fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>{log.txnId}</td>
                              <td style={{ ...styles.td, color: '#64748b' }}>{log.dateTime}</td>
                              <td style={{ ...styles.td, fontWeight: '600' }}>{log.mode}</td>
                              <td style={{ ...styles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>{log.amount}</td>
                              <td style={{ ...styles.td, color: '#047857', fontWeight: '700', fontSize: '0.8rem' }}>{log.gatewayStatus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  )}

      {/* Online Payment Gateway Modal */}
      {showPaymentModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Receipt size={22} color="#00a884" />
                <h3 style={styles.modalTitle}>GH Raisoni Online Payment Gateway</h3>
              </div>
              <button onClick={() => setShowPaymentModal(false)} style={styles.modalCloseBtn}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.paymentSummaryCard}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>OUTSTANDING BALANCE DUE</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#00a884', margin: '0.2rem 0' }}>₹ 29,288.00</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Student Reg: 23ACOE1121163 • Fall Term 2026</div>
              </div>

              <form onSubmit={handleCompletePayment} style={{ marginTop: '1.25rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={styles.inputLabel}>Select Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginTop: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMode('upi')}
                      style={{
                        ...styles.payOptionBtn,
                        ...(selectedPaymentMode === 'upi' ? styles.payOptionActive : {})
                      }}
                    >
                      <QrCode size={18} />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMode('card')}
                      style={{
                        ...styles.payOptionBtn,
                        ...(selectedPaymentMode === 'card' ? styles.payOptionActive : {})
                      }}
                    >
                      <CreditCard size={18} />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMode('netbanking')}
                      style={{
                        ...styles.payOptionBtn,
                        ...(selectedPaymentMode === 'netbanking' ? styles.payOptionActive : {})
                      }}
                    >
                      <FileText size={18} />
                      <span>NetBanking</span>
                    </button>
                  </div>
                </div>

                {selectedPaymentMode === 'upi' && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                      Scan QR Code using Google Pay, PhonePe, or Paytm
                    </div>
                    <div style={{ width: '120px', height: '120px', backgroundColor: '#1e293b', color: '#00a884', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '0.75rem', fontWeight: 800 }}>
                      [ OFFICIAL QR ]
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>UPI ID: ghraisoni@icici</div>
                  </div>
                )}

                {selectedPaymentMode === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={styles.inputLabel}>Card Number</label>
                      <input type="text" placeholder="4532 •••• •••• 8912" required style={styles.modalInput} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={styles.inputLabel}>Expiry (MM/YY)</label>
                        <input type="text" placeholder="08/28" required style={styles.modalInput} />
                      </div>
                      <div>
                        <label style={styles.inputLabel}>CVV Code</label>
                        <input type="password" maxLength={3} placeholder="•••" required style={styles.modalInput} />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMode === 'netbanking' && (
                  <div>
                    <label style={styles.inputLabel}>Select Bank</label>
                    <select style={styles.modalSelect}>
                      <option>HDFC Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowPaymentModal(false)} style={styles.cancelModalBtn}>
                    Cancel
                  </button>
                  <button type="submit" disabled={paymentSuccess} style={styles.confirmPayBtn}>
                    {paymentSuccess ? 'Processing Payment...' : 'Confirm & Pay ₹ 29,288.00'}
                  </button>
                </div>
              </form>
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
  pageMainTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ffffff',
    color: '#00a884',
    border: '1.5px solid #00a884',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  studentNameBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00a884',
    fontWeight: '700',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'underline'
  },
  viewFeeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#e6f7f3',
    color: '#00a884',
    border: '1px solid #a7f3d0',
    borderRadius: '6px',
    padding: '0.35rem 0.75rem',
    fontSize: '0.78rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  rosterCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.25rem 1.5rem',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  rosterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.45rem 0.85rem',
    width: '360px'
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: '0.85rem',
    width: '100%',
    color: '#0f172a'
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.5rem 1.75rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    gap: '1.75rem',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
  },
  avatarSection: {
    flexShrink: 0
  },
  studentAvatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #00a884'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1.1fr 1fr',
    gap: '1.5rem',
    flex: 1
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.4rem',
    fontSize: '0.82rem'
  },
  infoLabel: {
    color: '#94a3b8',
    fontWeight: '600'
  },
  infoVal: {
    color: '#1e293b',
    fontWeight: '700'
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem'
  },
  accordionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    borderBottom: '1px solid #f1f5f9'
  },
  accordionTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  accordionBody: {
    padding: '1.25rem 1.5rem',
    backgroundColor: '#ffffff'
  },
  tabActionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.25rem'
  },
  financeSubTabs: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.75rem'
  },
  tabBtn: {
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
  tabBtnActive: {
    color: '#e05638',
    borderBottom: '3px solid #e05638'
  },
  payNowBtn: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.55rem 1.4rem',
    fontSize: '0.88rem',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0, 168, 132, 0.35)',
    transition: 'all 0.2s ease'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.84rem'
  },
  th: {
    padding: '0.75rem 0.85rem',
    backgroundColor: '#262a30',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '0.78rem'
  },
  tr: {
    borderBottom: '1px solid #f1f5f9'
  },
  totalTr: {
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc'
  },
  td: {
    padding: '0.75rem 0.85rem'
  },
  statusBadge: {
    fontSize: '0.7rem',
    fontWeight: '800',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    border: '1px solid transparent'
  },
  downloadReceiptBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#e6f7f3',
    color: '#00a884',
    border: '1px solid #a7f3d0',
    borderRadius: '6px',
    padding: '0.3rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '520px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
  },
  modalHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '1.05rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  modalCloseBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  modalBody: {
    padding: '1.5rem'
  },
  paymentSummaryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '1.25rem',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  inputLabel: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#475569',
    marginBottom: '0.35rem',
    display: 'block'
  },
  payOptionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.65rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#64748b',
    cursor: 'pointer'
  },
  payOptionActive: {
    borderColor: '#00a884',
    backgroundColor: '#e6f7f3',
    color: '#00a884'
  },
  modalInput: {
    width: '100%',
    padding: '0.6rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    color: '#0f172a'
  },
  modalSelect: {
    width: '100%',
    padding: '0.6rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    color: '#0f172a',
    backgroundColor: '#ffffff'
  },
  cancelModalBtn: {
    flex: 1,
    padding: '0.65rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#64748b',
    fontWeight: '700',
    cursor: 'pointer'
  },
  confirmPayBtn: {
    flex: 2,
    padding: '0.65rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00a884',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '0.88rem',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0, 168, 132, 0.35)'
  }
};
