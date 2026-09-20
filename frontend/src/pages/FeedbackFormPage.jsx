import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Building2, 
  UserCheck,
  PlusCircle,
  Link,
  Edit3,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

export default function FeedbackFormPage({ initialTab = 'course-eval', currentUser }) {
  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  const [activeFormType, setActiveFormType] = useState(initialTab);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  useEffect(() => {
    if (initialTab === 'faculty-review' || initialTab === 'faculty') {
      setActiveFormType('faculty-review');
    } else {
      setActiveFormType('course-eval');
    }
  }, [initialTab]);

  // Initial Form Details State (Persisted in localStorage if edited)
  const defaultFormDetails = {
    'course-eval': {
      title: 'Course Evaluation Form',
      subtitle: 'Fall 2026 Academic Term Course Quality & Curriculum Feedback Survey',
      externalUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_course_eval_athena/viewform',
      category: 'Course Quality Evaluation',
      status: 'SUBMISSION WINDOW OPEN',
      deadline: 'November 15, 2026',
      lastUpdated: 'Updated 2 days ago',
      instructions: [
        'Your responses are 100% anonymous and cannot be traced back to individual student records.',
        'Evaluate course content depth, lab infrastructure, syllabus coverage, and learning outcomes.',
        'Completed surveys directly influence curriculum updates and academic department planning.'
      ]
    },
    'faculty-review': {
      title: 'Faculty Review Survey',
      subtitle: 'Anonymous Institutional Faculty Teaching & Advisory Assessment Survey',
      externalUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_faculty_review_athena/viewform',
      category: 'Faculty Teaching Assessment',
      status: 'SUBMISSION WINDOW OPEN',
      deadline: 'November 20, 2026',
      lastUpdated: 'Updated 1 day ago',
      instructions: [
        'Provide constructive feedback regarding faculty teaching methods, punctuality, and advising.',
        'All feedback is completely confidential and aggregated by the Academic Quality Assurance Cell.',
        'Feedback forms are used for institutional faculty excellence awards and academic development.'
      ]
    }
  };

  const [formDetails, setFormDetails] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eduplus_feedback_forms');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultFormDetails;
  });

  // State for Upload / Edit Form Modal
  const [uploadTargetType, setUploadTargetType] = useState('course-eval');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    externalUrl: '',
    category: '',
    deadline: '',
    instructionsText: ''
  });

  // Populate modal inputs when opening upload modal or switching upload target form type
  const handleOpenUploadModal = (typeToEdit = activeFormType) => {
    setUploadTargetType(typeToEdit);
    const target = formDetails[typeToEdit] || defaultFormDetails[typeToEdit];
    setFormData({
      title: target.title,
      subtitle: target.subtitle,
      externalUrl: target.externalUrl,
      category: target.category,
      deadline: target.deadline,
      instructionsText: target.instructions.join('\n')
    });
    setShowUploadModal(true);
  };

  const handleTargetTypeChange = (newType) => {
    setUploadTargetType(newType);
    const target = formDetails[newType] || defaultFormDetails[newType];
    setFormData({
      title: target.title,
      subtitle: target.subtitle,
      externalUrl: target.externalUrl,
      category: target.category,
      deadline: target.deadline,
      instructionsText: target.instructions.join('\n')
    });
  };

  const handleSaveUpload = (e) => {
    e.preventDefault();
    if (!formData.externalUrl.trim()) {
      alert('Please enter a valid External Form URL!');
      return;
    }

    const instructionsArray = formData.instructionsText
      .split('\n')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    const updated = {
      ...formDetails,
      [uploadTargetType]: {
        ...formDetails[uploadTargetType],
        title: formData.title || (uploadTargetType === 'course-eval' ? 'Course Evaluation Form' : 'Faculty Review Survey'),
        subtitle: formData.subtitle || 'Academic Evaluation Survey',
        externalUrl: formData.externalUrl.trim(),
        category: formData.category || (uploadTargetType === 'course-eval' ? 'Course Quality Evaluation' : 'Faculty Teaching Assessment'),
        deadline: formData.deadline || 'November 30, 2026',
        lastUpdated: 'Just updated by Admin/Faculty',
        instructions: instructionsArray.length > 0 ? instructionsArray : defaultFormDetails[uploadTargetType].instructions
      }
    };

    setFormDetails(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduplus_feedback_forms', JSON.stringify(updated));
    }

    setShowUploadModal(false);
    setActiveFormType(uploadTargetType);
    setSaveSuccessMsg(`Successfully uploaded & published external form link for ${uploadTargetType === 'course-eval' ? 'Course Evaluation' : 'Faculty Review'}!`);

    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 4000);
  };

  const currentForm = formDetails[activeFormType] || defaultFormDetails['course-eval'];

  const handleOpenForm = () => {
    if (currentForm.externalUrl) {
      window.open(currentForm.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Header & Page Navigation Bar */}
      <div style={styles.topNavCard}>
        <div>
          <h2 style={styles.pageTitle}>{currentForm.title}</h2>
          <p style={styles.pageSubtitle}>{currentForm.subtitle}</p>
        </div>

        {/* Action Controls & Navigation Sub-Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {isFacultyOrAdmin && (
            <button
              onClick={() => handleOpenUploadModal(activeFormType)}
              style={styles.uploadModalBtn}
              title="Upload or update external Google Form link"
            >
              <PlusCircle size={17} color="#ffffff" />
              <span>Upload External Form Link</span>
            </button>
          )}

          <div style={styles.subTabGroup}>
            <button
              onClick={() => setActiveFormType('course-eval')}
              style={{
                ...styles.subTabBtn,
                ...(activeFormType === 'course-eval' ? styles.subTabBtnActive : {})
              }}
            >
              <ClipboardList size={16} />
              <span>Course Evaluation</span>
            </button>

            <button
              onClick={() => setActiveFormType('faculty-review')}
              style={{
                ...styles.subTabBtn,
                ...(activeFormType === 'faculty-review' ? styles.subTabBtnActive : {})
              }}
            >
              <UserCheck size={16} />
              <span>Faculty Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Banner Notice */}
      {saveSuccessMsg && (
        <div style={styles.successBanner}>
          <CheckCircle2 size={20} color="#047857" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Single Form Display Card */}
      <div style={styles.mainFormCard}>
        {/* Banner Section */}
        <div style={styles.formCardHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={styles.iconCircle}>
              {activeFormType === 'course-eval' ? <ClipboardList size={24} color="#00a884" /> : <UserCheck size={24} color="#00a884" />}
            </div>
            <div>
              <div style={styles.categoryPill}>{currentForm.category.toUpperCase()}</div>
              <h3 style={styles.cardTitle}>{currentForm.title}</h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={styles.statusBadge}>
              <Sparkles size={14} />
              {currentForm.status}
            </span>
            {isFacultyOrAdmin && (
              <button 
                onClick={() => handleOpenUploadModal(activeFormType)}
                style={styles.editBtn}
                title="Edit Form Link"
              >
                <Edit3 size={15} color="#00a884" />
                <span>Edit Link</span>
              </button>
            )}
          </div>
        </div>

        {/* Form Details & Instructions */}
        <div style={styles.formCardBody}>
          <div style={styles.metaRow}>
            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>DEADLINE DATE</span>
              <span style={styles.metaValue}>{currentForm.deadline}</span>
            </div>

            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>CONFIDENTIALITY</span>
              <span style={{ ...styles.metaValue, color: '#047857' }}>100% Anonymous</span>
            </div>

            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>LINK STATUS</span>
              <span style={{ ...styles.metaValue, fontSize: '0.78rem', color: '#0284c7' }}>
                {currentForm.lastUpdated || 'Active Link'}
              </span>
            </div>
          </div>

          {/* Active URL Preview Box */}
          <div style={styles.urlPreviewBox}>
            <Link size={16} color="#00a884" style={{ flexShrink: 0 }} />
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: 700 }}>ACTIVE EXTERNAL FORM LINK:</span>
              <a href={currentForm.externalUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.84rem', color: '#00a884', fontWeight: 700, textDecoration: 'none' }}>
                {currentForm.externalUrl}
              </a>
            </div>
          </div>

          <h4 style={styles.instructionsHeading}>Survey Guidelines & Instructions:</h4>
          <ul style={styles.instructionsList}>
            {currentForm.instructions.map((inst, idx) => (
              <li key={idx} style={styles.instructionItem}>
                <CheckCircle2 size={16} color="#00a884" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{inst}</span>
              </li>
            ))}
          </ul>

          {/* PROMINENT "FORM" BUTTON LEADING TO EXTERNAL FORM LINK */}
          <div style={styles.formButtonContainer}>
            <button 
              onClick={handleOpenForm}
              style={styles.formButton}
              title={`Click to open external ${currentForm.title} link`}
            >
              <span>Open Feedback Form</span>
              <ExternalLink size={20} />
            </button>
          </div>
        </div>

        {/* Security Assurance Footer */}
        <div style={styles.formCardFooter}>
          <ShieldCheck size={16} color="#00a884" />
          <span>Secured by EduPlus Quality Assurance Cell • External Form Link Integration</span>
        </div>
      </div>

      {/* UPLOAD / EDIT EXTERNAL FORM LINK MODAL */}
      {showUploadModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Link size={22} color="#00a884" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Upload External Form Link
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.15rem 0 0 0' }}>
                    Configure Google Form, Microsoft Form, or Survey URL for Course / Faculty feedback
                  </p>
                </div>
              </div>
              <button onClick={() => setShowUploadModal(false)} style={styles.closeBtn}>
                <X size={20} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} style={styles.modalForm}>
              {/* Form Target Type Switcher */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={styles.fieldLabel}>Select Feedback Target Form:</label>
                <div style={styles.targetToggleGroup}>
                  <button
                    type="button"
                    onClick={() => handleTargetTypeChange('course-eval')}
                    style={{
                      ...styles.targetToggleBtn,
                      ...(uploadTargetType === 'course-eval' ? styles.targetToggleBtnActive : {})
                    }}
                  >
                    <ClipboardList size={16} />
                    <span>Course Evaluation Form</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTargetTypeChange('faculty-review')}
                    style={{
                      ...styles.targetToggleBtn,
                      ...(uploadTargetType === 'faculty-review' ? styles.targetToggleBtnActive : {})
                    }}
                  >
                    <UserCheck size={16} />
                    <span>Faculty Review Survey</span>
                  </button>
                </div>
              </div>

              {/* Form Title */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Form Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Course Evaluation Form"
                  style={styles.inputField}
                  required
                />
              </div>

              {/* Form Subtitle */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Form Description / Subtitle:</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g., Fall 2026 Academic Term Course Quality Survey"
                  style={styles.inputField}
                />
              </div>

              {/* External Form URL (Crucial Field!) */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>
                  External Form URL <span style={{ color: '#dc2626' }}>*</span> (Google Forms / MS Forms Link):
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Link size={16} color="#00a884" style={{ position: 'absolute', left: '12px' }} />
                  <input
                    type="url"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    style={{ ...styles.inputField, paddingLeft: '2.4rem' }}
                    required
                  />
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                  Paste the public link to your Google Form or Microsoft Form here.
                </span>
              </div>

              {/* Category & Deadline Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Category Label:</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Course Quality Evaluation"
                    style={styles.inputField}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Submission Deadline:</label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    placeholder="e.g., November 15, 2026"
                    style={styles.inputField}
                  />
                </div>
              </div>

              {/* Guidelines / Instructions */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Survey Guidelines (One instruction per line):</label>
                <textarea
                  value={formData.instructionsText}
                  onChange={(e) => setFormData({ ...formData, instructionsText: e.target.value })}
                  placeholder="Enter guidelines..."
                  rows={3}
                  style={{ ...styles.inputField, resize: 'vertical' }}
                />
              </div>

              {/* Action Buttons */}
              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.externalUrl) {
                      window.open(formData.externalUrl, '_blank');
                    } else {
                      alert('Please enter an External Form URL first!');
                    }
                  }}
                  style={styles.testLinkBtn}
                >
                  <ExternalLink size={15} />
                  <span>Test External Link</span>
                </button>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    style={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={styles.saveSubmitBtn}
                  >
                    <Check size={16} />
                    <span>Save & Publish Form Link</span>
                  </button>
                </div>
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
  uploadModalBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.6rem 1.1rem',
    fontSize: '0.85rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0, 168, 132, 0.3)',
    transition: 'all 0.15s ease'
  },
  subTabGroup: {
    display: 'flex',
    gap: '0.4rem',
    backgroundColor: '#f1f5f9',
    padding: '0.35rem',
    borderRadius: '12px'
  },
  subTabBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    fontSize: '0.84rem',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  subTabBtnActive: {
    backgroundColor: '#ffffff',
    color: '#00a884',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#dcfce7',
    border: '1px solid #86efac',
    borderRadius: '12px',
    padding: '0.85rem 1.25rem',
    color: '#047857',
    fontSize: '0.88rem',
    fontWeight: 700
  },
  mainFormCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
    maxWidth: '820px',
    margin: '0 auto',
    width: '100%'
  },
  formCardHeader: {
    padding: '1.5rem 1.75rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  iconCircle: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    backgroundColor: '#e6f7f3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  categoryPill: {
    fontSize: '0.68rem',
    fontWeight: '800',
    color: '#00a884',
    letterSpacing: '0.05em',
    marginBottom: '0.15rem'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#ccfbf1',
    color: '#0f766e',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '0.3rem 0.75rem',
    borderRadius: '9999px',
    border: '1px solid #99f6e4'
  },
  editBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#ffffff',
    border: '1px solid #00a884',
    color: '#00a884',
    fontSize: '0.75rem',
    fontWeight: 700,
    padding: '0.3rem 0.65rem',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  formCardBody: {
    padding: '2rem 1.75rem'
  },
  metaRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    backgroundColor: '#f8fafc',
    padding: '1.1rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    marginBottom: '1.25rem'
  },
  metaBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  metaLabel: {
    fontSize: '0.68rem',
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: '0.05em'
  },
  metaValue: {
    fontSize: '0.92rem',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: '0.15rem'
  },
  urlPreviewBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    marginBottom: '1.5rem'
  },
  instructionsHeading: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 0.85rem 0'
  },
  instructionsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
    marginBottom: '2rem',
    paddingLeft: 0
  },
  instructionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.65rem',
    fontSize: '0.88rem',
    color: '#475569',
    lineHeight: '1.45'
  },
  formButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #f1f5f9'
  },
  formButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '0.85rem 3rem',
    fontSize: '1.1rem',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0, 168, 132, 0.4)',
    transition: 'all 0.2s ease',
    letterSpacing: '0.03em'
  },
  formCardFooter: {
    padding: '1rem 1.75rem',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.45rem',
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#64748b'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1.5rem'
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    maxWidth: '650px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '1.25rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '6px'
  },
  modalForm: {
    padding: '1.5rem'
  },
  fieldGroup: {
    marginBottom: '1rem'
  },
  fieldLabel: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '0.35rem'
  },
  inputField: {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: '9px',
    border: '1px solid #cbd5e1',
    fontSize: '0.88rem',
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box'
  },
  targetToggleGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
    backgroundColor: '#f1f5f9',
    padding: '0.3rem',
    borderRadius: '10px'
  },
  targetToggleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.55rem',
    borderRadius: '7px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#64748b',
    cursor: 'pointer'
  },
  targetToggleBtnActive: {
    backgroundColor: '#ffffff',
    color: '#00a884',
    fontWeight: 800,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    flexWrap: 'wrap',
    gap: '0.75rem'
  },
  testLinkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '0.55rem 0.9rem',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer'
  },
  cancelBtn: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    color: '#475569',
    borderRadius: '8px',
    padding: '0.55rem 1rem',
    fontSize: '0.84rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  saveSubmitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.55rem 1.25rem',
    fontSize: '0.84rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 168, 132, 0.3)'
  }
};
