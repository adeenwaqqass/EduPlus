import React, { useState, useEffect } from 'react';
import { 
  User, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Printer, 
  Download, 
  GraduationCap, 
  Award, 
  Calendar, 
  Building2,
  Search,
  Filter,
  CreditCard,
  Users,
  Paperclip,
  FileCheck,
  Eye,
  Upload,
  ShieldCheck
} from 'lucide-react';
import StudentsPage from './StudentsPage';

export default function StudentInformationPage({ initialTab = 'personal', searchTerm, currentUser, onSelectStudent }) {
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (initialTab === 'admission-info' || initialTab === 'admission') {
      setActiveTab('admission-info');
    } else if (initialTab === 'parent' || initialTab === 'parents') {
      setActiveTab('parent');
    } else if (initialTab === 'bank') {
      setActiveTab('bank');
    } else if (initialTab === 'documents' || initialTab === 'doc') {
      setActiveTab('documents');
    } else {
      setActiveTab('personal');
    }
  }, [initialTab]);

  const studentData = {
    title: 'MR',
    displayNameFormat: 'FIRST MIDDLE LAST',
    displayName: 'ADEEN WAQQAS AHMED SHAHZAD AHMED',
    fatherName: 'SHAHZAD AHMED',
    motherName: 'SHABANA PARVEEN AHMED',
    maritalStatus: 'Unmarried',
    gender: 'Male',
    dateOfBirth: '15/01/2003',
    email: 'adeenwaqqas@gmail.com',
    instituteEmail: 'adeen.waqqas@athena.edu',
    mobile: '[+91] 8080334943',
    altMobile: '--',
    registrationNumber: '23ACOE1121163',
    universityEnrollment: '310142311861',
    applicationNumber: '--',
    rollNumber: 'A07',
    nationality: 'Indian',
    religion: 'Islam',
    caste: 'Muslim',
    category: 'OBC',
    abcId: '447435150962',
    antiRaggingId: 'AR-2023-99812',
    birthPlace: 'Pune',
    birthState: 'Maharashtra',
    whatsappMobile: '[+91] 8080334943',
    physicallyChallenged: 'No',
    bloodGroup: 'AB+',
    domicileCountry: 'India',
    domicileState: 'Maharashtra',
    motherTongue: 'Urdu / Hindi',
    citizenshipCategory: 'Indian Resident',
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'COMPUTER ENGINEERING',
    semester: 'Semester VII',
    session: 'WINTER 2026',
    scheme: 'COMPUTER ENGINEERING 2023-24',
    batch: '2023-2027',
    admissionCategory: 'Institute Level Allotment (CAP)',
    admissionDate: '22/08/2023'
  };

  const registeredCourses = [
    { code: 'CS701', title: 'Deep Learning & Neural Networks', credits: 4, type: 'Core Theory', status: 'Approved' },
    { code: 'CS702', title: 'Cloud Computing & DevOps', credits: 4, type: 'Core Theory', status: 'Approved' },
    { code: 'CS703', title: 'Cybersecurity & Cryptography', credits: 3, type: 'Elective', status: 'Approved' },
    { code: 'CS704P', title: 'Major Project Phase - I', credits: 6, type: 'Practical / Lab', status: 'Approved' },
    { code: 'CS705P', title: 'Advanced AI Lab', credits: 2, type: 'Practical / Lab', status: 'Approved' }
  ];

  const studentDocuments = [
    { id: 1, name: '10th SSC Marksheet & Certificate', fileName: '10th_SSC_Marksheet_Verified.pdf', size: '1.4 MB', date: '22 Aug 2023', status: 'VERIFIED' },
    { id: 2, name: '12th HSC / Diploma Certificate', fileName: '12th_HSC_Marksheet_Verified.pdf', size: '1.8 MB', date: '22 Aug 2023', status: 'VERIFIED' },
    { id: 3, name: 'MHT-CET / JEE Entrance Scorecard', fileName: 'MHT_CET_Scorecard_2023.pdf', size: '850 KB', date: '22 Aug 2023', status: 'VERIFIED' },
    { id: 4, name: 'OBC Caste & Validity Certificate', fileName: 'OBC_Caste_Validity_Certificate.pdf', size: '2.1 MB', date: '24 Aug 2023', status: 'VERIFIED' },
    { id: 5, name: 'Aadhaar Card Copy', fileName: 'Aadhaar_Card_Verified.pdf', size: '920 KB', date: '22 Aug 2023', status: 'VERIFIED' },
    { id: 6, name: 'College Admission Allotment Letter', fileName: 'CAP_Allotment_Letter_2023.pdf', size: '1.1 MB', date: '22 Aug 2023', status: 'VERIFIED' }
  ];

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>Student Information</h2>
          <p style={styles.pageSubtitle}>Official institutional record and student profile portal</p>
        </div>
      </div>

      {/* Student / User Top Profile Banner */}
      <div style={styles.profileBanner}>
        <div>
          <h3 style={styles.bannerName}>{currentUser?.name || `MR. ${studentData.displayName}`}</h3>
          <div style={styles.bannerSubMeta}>
            <span>Reg No: <strong>{currentUser?.registrationNumber || studentData.registrationNumber}</strong></span>
            <span>•</span>
            <span>{currentUser?.department || studentData.branch}</span>
            <span>•</span>
            <span>{currentUser?.semester || `${studentData.semester} (${studentData.session})`}</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar (Matching Screenshot 1 Options: Personal Information, Admission Information, Parent Details, Bank Details, Documents) */}
      <div style={styles.tabsContainer}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'personal' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'admission-info' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('admission-info')}
        >
          Admission Information
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'parent' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('parent')}
        >
          Parent Details
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'bank' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('bank')}
        >
          Bank Details
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'documents' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'registered-courses' ? styles.tabButtonActive : {})
          }}
          onClick={() => setActiveTab('registered-courses')}
        >
          Registered Courses ({registeredCourses.length})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PERSONAL INFORMATION (Exact Layout matching Screenshot 1)          */}
      {/* ========================================================================= */}
      {activeTab === 'personal' && (
        <div style={styles.infoGridTwoCol}>
          {/* Left Block: Basic Information */}
          <div style={styles.cardBlock}>
            <fieldset style={styles.fieldsetCard}>
              <legend style={styles.legendTitle}>Basic Information</legend>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Title :</span><span style={styles.fieldVal}>{studentData.title}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Display Name Format :</span><span style={styles.fieldVal}>{studentData.displayNameFormat}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Display Name :</span><span style={{ ...styles.fieldVal, fontWeight: 700 }}>{studentData.displayName}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Marital Status :</span><span style={styles.fieldVal}>{studentData.maritalStatus}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Gender :</span><span style={styles.fieldVal}>{studentData.gender}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Date of Birth :</span><span style={styles.fieldVal}>{studentData.dateOfBirth}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Email ID :</span><span style={{ ...styles.fieldVal, color: '#00a884', fontWeight: 600 }}>{studentData.email}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Institute Email ID :</span><span style={styles.fieldVal}>{studentData.instituteEmail}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Mobile Number :</span><span style={styles.fieldVal}>{studentData.mobile}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Alternate Mobile Number :</span><span style={styles.fieldVal}>{studentData.altMobile}</span></div>
            </fieldset>

            <fieldset style={{ ...styles.fieldsetCard, marginTop: '1.25rem' }}>
              <legend style={styles.legendTitle}>Other Information</legend>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Nationality :</span><span style={styles.fieldVal}>{studentData.nationality}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Religion :</span><span style={styles.fieldVal}>{studentData.religion}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Caste :</span><span style={styles.fieldVal}>{studentData.caste}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Category :</span><span style={styles.fieldVal}>{studentData.category}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>ABC ID :</span><span style={styles.fieldVal}>{studentData.abcId}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Anti-Ragging ID :</span><span style={styles.fieldVal}>{studentData.antiRaggingId}</span></div>
            </fieldset>
          </div>

          {/* Right Block: Admin & Personal Information */}
          <div style={styles.cardBlock}>
            <fieldset style={styles.fieldsetCard}>
              <legend style={styles.legendTitle}>Admin Information</legend>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Registration Number :</span><span style={{ ...styles.fieldVal, fontWeight: 700, color: '#00a884' }}>{studentData.registrationNumber}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>University/Enrollment Number :</span><span style={styles.fieldVal}>{studentData.universityEnrollment}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Application Number :</span><span style={styles.fieldVal}>{studentData.applicationNumber}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Roll Number :</span><span style={{ ...styles.fieldVal, fontWeight: 700 }}>{studentData.rollNumber}</span></div>
            </fieldset>

            <fieldset style={{ ...styles.fieldsetCard, marginTop: '1.25rem' }}>
              <legend style={styles.legendTitle}>Personal Information</legend>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Birth Place :</span><span style={styles.fieldVal}>{studentData.birthPlace}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Birth State :</span><span style={styles.fieldVal}>{studentData.birthState}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Whatsapp Mobile Number :</span><span style={styles.fieldVal}>{studentData.whatsappMobile}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Physically Challenged :</span><span style={styles.fieldVal}>{studentData.physicallyChallenged}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Blood Group :</span><span style={{ ...styles.fieldVal, fontWeight: 700, color: '#00a884' }}>{studentData.bloodGroup}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Domicile Country :</span><span style={styles.fieldVal}>{studentData.domicileCountry}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Domicile State :</span><span style={styles.fieldVal}>{studentData.domicileState}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Mother Tongue :</span><span style={styles.fieldVal}>{studentData.motherTongue}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Citizenship Category :</span><span style={styles.fieldVal}>{studentData.citizenshipCategory}</span></div>
            </fieldset>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ADMISSION INFORMATION                                             */}
      {/* ========================================================================= */}
      {activeTab === 'admission-info' && (
        <div style={styles.singleCardWrapper}>
          <fieldset style={styles.fieldsetCard}>
            <legend style={styles.legendTitle}>Admission & Academic Allotment Information</legend>

            <div style={styles.detailsGrid}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Degree Program :</span>
                <span style={{ ...styles.detailValue, fontWeight: 700 }}>{studentData.degree}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Branch / Specialization :</span>
                <span style={{ ...styles.detailValue, fontWeight: 700, color: '#00a884' }}>{studentData.branch}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Current Semester :</span>
                <span style={styles.detailValue}>{studentData.semester} ({studentData.session})</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Academic Scheme :</span>
                <span style={styles.detailValue}>{studentData.scheme}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Academic Batch :</span>
                <span style={styles.detailValue}>{studentData.batch}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Admission Quota Category :</span>
                <span style={{ ...styles.detailValue, fontWeight: 700 }}>{studentData.admissionCategory}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Admission Date :</span>
                <span style={styles.detailValue}>{studentData.admissionDate}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Status :</span>
                <span style={{ ...styles.detailValue, color: '#047857', fontWeight: 800 }}>ACTIVE & REGULAR STUDENT</span>
              </div>
            </div>
          </fieldset>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PARENT DETAILS                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'parent' && (
        <div style={styles.infoGridTwoCol}>
          <div style={styles.cardBlock}>
            <fieldset style={styles.fieldsetCard}>
              <legend style={styles.legendTitle}>Father Information</legend>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Father Name :</span><span style={{ ...styles.fieldVal, fontWeight: 700 }}>{studentData.fatherName}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Occupation :</span><span style={styles.fieldVal}>Business / Private Service</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Contact Number :</span><span style={styles.fieldVal}>[+91] 9823011223</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Email Address :</span><span style={styles.fieldVal}>shahzad.ahmed@gmail.com</span></div>
            </fieldset>
          </div>

          <div style={styles.cardBlock}>
            <fieldset style={styles.fieldsetCard}>
              <legend style={styles.legendTitle}>Mother Information</legend>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Mother Name :</span><span style={{ ...styles.fieldVal, fontWeight: 700 }}>{studentData.motherName}</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Occupation :</span><span style={styles.fieldVal}>Homemaker</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Contact Number :</span><span style={styles.fieldVal}>[+91] 9823011224</span></div>
              <div style={styles.fieldRow}><span style={styles.fieldLabel}>Permanent City :</span><span style={styles.fieldVal}>Pune, Maharashtra</span></div>
            </fieldset>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BANK DETAILS                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'bank' && (
        <div style={styles.singleCardWrapper}>
          <fieldset style={styles.fieldsetCard}>
            <legend style={styles.legendTitle}>Student Bank & Scholarship DBT Details</legend>

            <div style={styles.detailsGrid}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Account Holder Name :</span>
                <span style={{ ...styles.detailValue, fontWeight: 700 }}>{studentData.displayName}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Bank Name :</span>
                <span style={{ ...styles.detailValue, fontWeight: 700, color: '#0284c7' }}>State Bank of India (SBI)</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Branch Name :</span>
                <span style={styles.detailValue}>Pune Main Branch</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Account Number :</span>
                <span style={{ ...styles.detailValue, fontWeight: 700 }}>••••••••4912</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>IFSC Code :</span>
                <span style={styles.detailValue}>SBIN0001245</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Aadhaar DBT Linking Status :</span>
                <span style={{ ...styles.detailValue, color: '#047857', fontWeight: 800 }}>VERIFIED & LINKED (ACTIVE)</span>
              </div>
            </div>
          </fieldset>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DOCUMENTS REPOSITORY                                              */}
      {/* ========================================================================= */}
      {activeTab === 'documents' && (
        <div style={styles.singleCardWrapper}>
          <fieldset style={styles.fieldsetCard}>
            <legend style={styles.legendTitle}>Uploaded & Verified Document Repository</legend>

            <div style={styles.docList}>
              {studentDocuments.map(doc => (
                <div key={doc.id} style={styles.docCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={styles.docIconCircle}>
                      <FileCheck size={20} color="#00a884" />
                    </div>
                    <div>
                      <div style={styles.docTitle}>{doc.name}</div>
                      <div style={styles.docMeta}>{doc.fileName} • {doc.size} • Verified {doc.date}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={styles.verifiedBadge}>VERIFIED</span>
                    <button 
                      onClick={() => alert(`Opening document: ${doc.fileName}`)}
                      style={styles.docViewBtn}
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </button>
                    <button 
                      onClick={() => alert(`Downloading: ${doc.fileName}`)}
                      style={styles.docDownloadBtn}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* TAB 6: Registered Courses */}
      {activeTab === 'registered-courses' && (
        <div style={styles.singleCardWrapper}>
          <div style={styles.fieldsetCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <legend style={{ ...styles.legendTitle, padding: 0, marginBottom: '0.35rem' }}>Winter 2026 Enrolled Courses</legend>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: '#475569', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                  <span>Degree : <strong style={{ color: '#0f172a' }}>B.Tech ({studentData.degree})</strong></span>
                  <span>•</span>
                  <span>Program : <strong style={{ color: '#00a884' }}>{studentData.branch}</strong></span>
                  <span>•</span>
                  <span>Semester : <strong style={{ color: '#0f172a' }}>{studentData.semester}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#f0fdf4', color: '#047857', border: '1px solid #bbf7d0', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                  5 COURSES (19 CREDITS)
                </span>
              </div>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Course Title</th>
                  <th style={styles.th}>Credits</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {registeredCourses.map(c => (
                  <tr key={c.code} style={styles.tr}>
                    <td style={styles.tdId}>{c.code}</td>
                    <td style={styles.tdBold}>{c.title}</td>
                    <td style={styles.td}>{c.credits}</td>
                    <td style={styles.td}>{c.type}</td>
                    <td style={styles.td}><span style={styles.statusBadgeGreen}>APPROVED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '1.25rem 1.75rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 0.2rem 0'
  },
  pageSubtitle: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: 0
  },
  profileBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    backgroundColor: '#ffffff',
    padding: '1.25rem 1.75rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
  },
  bannerAvatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #00a884'
  },
  bannerName: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 0.25rem 0'
  },
  bannerSubMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    fontSize: '0.82rem',
    color: '#64748b'
  },
  tabsContainer: {
    display: 'flex',
    gap: '0.4rem',
    backgroundColor: '#ffffff',
    padding: '0.5rem 0.85rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    flexWrap: 'wrap'
  },
  tabButton: {
    padding: '0.55rem 1rem',
    fontSize: '0.84rem',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  tabButtonActive: {
    color: '#00a884',
    borderBottom: '3px solid #00a884',
    fontWeight: '700'
  },
  infoGridTwoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
  },
  cardBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  singleCardWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid var(--border-color)',
    padding: '1.5rem'
  },
  fieldsetCard: {
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    backgroundColor: '#ffffff'
  },
  legendTitle: {
    fontSize: '0.9rem',
    fontWeight: '800',
    color: '#00a884',
    padding: '0 0.6rem'
  },
  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.55rem 0',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.84rem'
  },
  fieldLabel: {
    color: '#64748b',
    fontWeight: '500'
  },
  fieldVal: {
    color: '#0f172a',
    fontWeight: '600',
    textAlign: 'right'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.25rem'
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    backgroundColor: '#f8fafc',
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    border: '1px solid var(--border-color)'
  },
  detailLabel: {
    fontSize: '0.74rem',
    fontWeight: '700',
    color: '#94a3b8'
  },
  detailValue: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#0f172a'
  },
  docList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem'
  },
  docCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid var(--border-color)'
  },
  docIconCircle: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: '#e6f7f3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  docTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  docMeta: {
    fontSize: '0.74rem',
    color: '#64748b'
  },
  verifiedBadge: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: '#047857',
    backgroundColor: '#d1fae5',
    padding: '0.2rem 0.55rem',
    borderRadius: '6px'
  },
  docViewBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '0.35rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#0f172a',
    cursor: 'pointer'
  },
  docDownloadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.35rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: '700',
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
    borderBottom: '1px solid var(--border-color)'
  },
  tr: {
    borderBottom: '1px solid #f1f5f9'
  },
  td: {
    padding: '0.85rem 1.25rem',
    fontSize: '0.85rem'
  },
  tdBold: {
    padding: '0.85rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#0f172a'
  },
  tdId: {
    padding: '0.85rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#00a884'
  },
  statusBadgeGreen: {
    backgroundColor: '#d1fae5',
    color: '#047857',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.2rem 0.55rem',
    borderRadius: '6px'
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
  }
};
