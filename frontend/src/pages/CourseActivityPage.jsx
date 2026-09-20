import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  File, 
  Trash2, 
  Eye, 
  Sparkles, 
  Award, 
  Calendar, 
  User, 
  Paperclip,
  Send,
  HelpCircle,
  FileCheck,
  PlusCircle,
  FileSpreadsheet,
  FileCode,
  Check
} from 'lucide-react';

export default function CourseActivityPage({ course, onBack, currentUser }) {
  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  const [activeTab, setActiveTab] = useState('activities');
  const [bannerMessage, setBannerMessage] = useState(null);

  // Faculty Create Activity Form State
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('23:59');
  const [totalMarks, setTotalMarks] = useState(100);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const showBanner = (text, type = 'success') => {
    setBannerMessage({ text, type });
    setTimeout(() => setBannerMessage(null), 4500);
  };

  // Helper for word count
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const wordCount = countWords(description);

  // Helper for file type formatting
  const getFileStyle = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['xls', 'xlsx', 'csv'].includes(ext)) {
      return { label: 'EXCEL', color: '#16a34a', bg: '#dcfce7', icon: FileSpreadsheet };
    }
    if (['doc', 'docx'].includes(ext)) {
      return { label: 'WORD', color: '#2563eb', bg: '#dbeafe', icon: FileText };
    }
    return { label: 'PDF', color: '#dc2626', bg: '#fee2e2', icon: File };
  };

  // Activities Data for the selected course
  const [activitiesList, setActivitiesList] = useState([
    {
      id: 'ACT-01',
      title: 'Activity #1: Convolutional Neural Network (CNN) Implementation on CIFAR-10 Dataset',
      dueDate: 'October 25, 2026 at 11:59 PM',
      totalMarks: 100,
      status: 'pending', // 'pending' | 'submitted'
      description: `In this activity, you are required to construct, train, and evaluate a deep Convolutional Neural Network (CNN) using PyTorch or TensorFlow to classify images from the CIFAR-10 benchmark dataset. Your model must achieve a minimum test accuracy of 82%. Complete the experiment report according to the attached guidelines and submit your code & findings in a single PDF document.`,
      attachedDocs: [
        {
          id: 'doc-1',
          name: 'CIFAR10_CNN_Assignment_Guidelines_Fall2026.pdf',
          size: '1.8 MB',
          type: 'pdf',
          dateAdded: 'Oct 15, 2026',
          previewContent: `FALL 2026 - DEEP LEARNING & NEURAL NETWORKS
ASSIGNMENT GUIDELINES: ACTIVITY #1
Instructor: Dr. Arthur Pendelton

OBJECTIVES:
1. Build a multi-layer CNN architecture with Data Augmentation (Random Crop, Flip).
2. Implement Batch Normalization & Dropout (p=0.3) for regularization.
3. Train model for 30 epochs using Adam optimizer (lr=0.001).
4. Plot Training vs Validation Loss and Accuracy curves.

SUBMISSION REQUIREMENTS:
- Upload a single compiled PDF containing your methodology, loss curves, confusion matrix, and full source code.
- Max File Size: 25 MB.`
        }
      ],
      attachedDoc: {
        title: 'CIFAR10_CNN_Assignment_Guidelines_Fall2026.pdf',
        size: '1.8 MB',
        dateAdded: 'Oct 15, 2026',
        downloadUrl: '#',
        previewContent: `FALL 2026 - DEEP LEARNING & NEURAL NETWORKS
ASSIGNMENT GUIDELINES: ACTIVITY #1
Instructor: Dr. Arthur Pendelton

OBJECTIVES:
1. Build a multi-layer CNN architecture with Data Augmentation (Random Crop, Flip).
2. Implement Batch Normalization & Dropout (p=0.3) for regularization.
3. Train model for 30 epochs using Adam optimizer (lr=0.001).
4. Plot Training vs Validation Loss and Accuracy curves.`
      },
      submittedFile: null
    },
    {
      id: 'ACT-02',
      title: 'Activity #2: Hyperparameter Tuning & Transfer Learning Report',
      dueDate: 'November 10, 2026 at 11:59 PM',
      totalMarks: 50,
      status: 'pending',
      description: `Compare baseline CNN performance against fine-tuned ResNet-18 transfer learning models. Evaluate feature extraction vs end-to-end fine-tuning on custom domain images. Submit your experimental analysis report PDF.`,
      attachedDocs: [
        {
          id: 'doc-2',
          name: 'Transfer_Learning_ResNet_Lab_Guide.pdf',
          size: '2.4 MB',
          type: 'pdf',
          dateAdded: 'Oct 18, 2026',
          previewContent: `TRANSFER LEARNING & RESNET EXPERIMENTATION GUIDE
Department of Computer Science - EduPlus CMS`
        }
      ],
      attachedDoc: {
        title: 'Transfer_Learning_ResNet_Lab_Guide.pdf',
        size: '2.4 MB',
        dateAdded: 'Oct 18, 2026',
        downloadUrl: '#',
        previewContent: `TRANSFER LEARNING & RESNET EXPERIMENTATION GUIDE`
      },
      submittedFile: null
    }
  ]);

  // Handle Faculty Descriptive Documents Upload (Up to 5 files: PDF, Word, Excel)
  const handleFacultyDocUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (uploadedDocs.length + files.length > 5) {
      showBanner('Faculty can upload a maximum of 5 descriptive documents per activity.', 'error');
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv'];
    const newDocs = [];

    for (let file of files) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        showBanner(`File "${file.name}" format not allowed. Please upload PDF, Word (.doc/.docx), or Excel (.xls/.xlsx) files.`, 'error');
        return;
      }
      newDocs.push({
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: ext,
        url: URL.createObjectURL(file),
        rawFile: file,
        dateAdded: 'Just now',
        previewContent: `Descriptive Document Content for ${file.name}`
      });
    }

    setUploadedDocs(prev => [...prev, ...newDocs]);
    showBanner(`Added ${newDocs.length} descriptive document(s). (${uploadedDocs.length + newDocs.length} / 5 uploaded)`);
    // reset input
    e.target.value = null;
  };

  const handleRemoveFacultyDoc = (docId) => {
    setUploadedDocs(prev => prev.filter(d => d.id !== docId));
    showBanner('Descriptive document removed.');
  };

  // Faculty Submit Form - Publish Activity
  const handlePublishActivity = (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      showBanner('Please enter an Activity Heading (Topic).', 'error');
      return;
    }

    if (wordCount > 500) {
      showBanner(`Description exceeds 500 words limit (${wordCount}/500 words). Please shorten your text.`, 'error');
      return;
    }

    if (!dueDate) {
      showBanner('Please select a deadline date from the calendar.', 'error');
      return;
    }

    let deadlineDisplay = dueDate;
    try {
      const dateObj = new Date(`${dueDate}T${dueTime || '23:59'}`);
      deadlineDisplay = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) + ` at ` + dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (err) {
      deadlineDisplay = `${dueDate} at ${dueTime}`;
    }

    const newActivity = {
      id: `ACT-0${activitiesList.length + 1}`,
      title: topic,
      dueDate: deadlineDisplay,
      totalMarks: Number(totalMarks) || 100,
      status: 'pending',
      description: description || 'No additional instructions provided.',
      attachedDocs: uploadedDocs,
      attachedDoc: uploadedDocs.length > 0 ? {
        title: uploadedDocs[0].name,
        size: uploadedDocs[0].size,
        dateAdded: 'Just now',
        downloadUrl: '#',
        previewContent: `Faculty Attached Resource Document: ${uploadedDocs[0].name}`
      } : null,
      submittedFile: null
    };

    setActivitiesList([newActivity, ...activitiesList]);
    showBanner(`🎉 Activity "${topic}" successfully created and published for students!`);

    // Reset Form
    setTopic('');
    setDescription('');
    setDueDate('');
    setDueTime('23:59');
    setTotalMarks(100);
    setUploadedDocs([]);
  };

  // Handle PDF Upload for Student Submission
  const handleFileUpload = (activityId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      showBanner('Please select a valid PDF document (.pdf file format).', 'error');
      return;
    }

    const fileObj = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      uploadTime: new Date().toLocaleString(),
      url: URL.createObjectURL(file),
      rawFile: file
    };

    setActivitiesList(prev => prev.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          status: 'submitted',
          submittedFile: fileObj
        };
      }
      return act;
    }));

    showBanner(`Successfully uploaded PDF document "${file.name}" for ${activityId}!`);
  };

  // Handle Removing Student Uploaded File
  const handleRemoveFile = (activityId) => {
    setActivitiesList(prev => prev.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          status: 'pending',
          submittedFile: null
        };
      }
      return act;
    }));
    showBanner(`Removed submission PDF. You can upload a new PDF document.`);
  };

  // Open Attached PDF Document in New Window / Modal Preview
  const handleOpenDocInNewWindow = (doc) => {
    const newWindow = window.open('', '_blank', 'width=850,height=750');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${doc.name || doc.title}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; line-height: 1.6; }
              .card { background: #1e293b; border-radius: 12px; padding: 2rem; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
              .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 1rem; margin-bottom: 1.5rem; }
              .badge { background: #00a884; color: #fff; padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: bold; font-size: 0.8rem; }
              pre { background: #0f172a; padding: 1.25rem; border-radius: 8px; border: 1px solid #334155; overflow-x: auto; font-family: monospace; color: #38bdf8; }
              .print-btn { background: #00a884; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: bold; cursor: pointer; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <div>
                  <h2 style="margin:0; color:#ffffff;">📄 ${doc.name || doc.title}</h2>
                  <div style="font-size:0.85rem; color:#94a3b8; margin-top:0.3rem;">Official Course Resource • Size: ${doc.size || '1.5 MB'}</div>
                </div>
                <button class="print-btn" onclick="window.print()">Print Document</button>
              </div>
              <p style="color:#e2e8f0;">Attached Document Instructions & Reference Manual:</p>
              <pre>${doc.previewContent || 'Official course descriptive document reference guide.'}</pre>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      showBanner('Pop-up window blocked by browser. Please allow pop-ups to open document.', 'error');
    }
  };

  // Download Attached Document
  const handleDownloadAttachedDoc = (doc) => {
    const blob = new Blob([doc.previewContent || 'Official course descriptive document.'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name || doc.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showBanner(`Downloading attached resource "${doc.name || doc.title}"...`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      {/* Alert Banner */}
      {bannerMessage && (
        <div style={{
          backgroundColor: bannerMessage.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: bannerMessage.type === 'error' ? '#991b1b' : '#166534',
          border: `1px solid ${bannerMessage.type === 'error' ? '#fca5a5' : '#86efac'}`,
          padding: '0.85rem 1.25rem',
          borderRadius: '12px',
          fontSize: '0.88rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <CheckCircle2 size={18} />
          <span>{bannerMessage.text}</span>
        </div>
      )}

      {/* Top Navigation Back Button & Course Title Banner */}
      <div className="card" style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <button 
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '0.45rem 0.9rem',
            fontSize: '0.84rem',
            fontWeight: 700,
            color: '#334155',
            cursor: 'pointer',
            marginBottom: '1rem',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Courses</span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <span style={{ backgroundColor: '#00a884', color: '#ffffff', fontSize: '0.74rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                {course.code}
              </span>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.74rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                {course.category}
              </span>
              <span style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', fontSize: '0.74rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                {course.credits} Credits
              </span>
              {isFaculty && (
                <span style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.74rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  FACULTY CONTROL VIEW
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {course.title}
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span>👨‍🏫 Instructor: <strong>{course.instructor}</strong></span>
              <span>•</span>
              <span>🕒 Schedule: <strong>{course.slot}</strong></span>
              <span>•</span>
              <span>📍 Room: <strong>{course.room}</strong></span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="status-pill qualified" style={{ fontSize: '0.84rem', padding: '0.35rem 0.85rem' }}>
              ✓ ENROLLED & APPROVED
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="fa-tabs-bar">
        <button className={`fa-tab-btn ${activeTab === 'activities' ? 'active' : ''}`} onClick={() => setActiveTab('activities')}>
          <FileText size={18} />
          <span>{isFaculty ? 'Create & Manage Activities' : 'Course Activities & Submissions'} ({activitiesList.length})</span>
        </button>

        <button className={`fa-tab-btn ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>
          <BookOpen size={18} />
          <span>Lecture Handouts & Resources</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FACULTY VIEW: CREATE ACTIVITY FORM SECTION                                */}
      {/* ========================================================================= */}
      {isFaculty && activeTab === 'activities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Create Activity Form Card */}
          <div className="card" style={{ padding: '1.75rem', borderRadius: '16px', border: '2px solid #00a884', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 168, 132, 0.08)' }}>
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PlusCircle size={22} color="#00a884" />
                  Create New Course Activity / Assignment
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  Fill out the form below to publish a new academic activity with descriptive documents for enrolled students.
                </p>
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.35rem 0.75rem', borderRadius: '8px' }}>
                Course: {course.code}
              </span>
            </div>

            <form onSubmit={handlePublishActivity} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Grid Row 1: Heading (Topic) & Total Marks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Activity Heading (Topic) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Activity #3: Neural Network Optimization & Backpropagation"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Total Marks / Points
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              {/* Grid Row 2: Deadline (Calendar Date & Time) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Deadline Date (Calendar) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.9rem',
                        fontSize: '0.9rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        outline: 'none',
                        backgroundColor: '#f8fafc',
                        color: '#0f172a',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Deadline Time
                  </label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      outline: 'none',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>

              {/* Textarea: Activity Description (500 Words Limit) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                    Activity Description & Guidelines <span style={{ color: '#64748b', fontWeight: 500 }}>(Up to 500 words)</span>
                  </label>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: wordCount > 500 ? '#dc2626' : wordCount > 450 ? '#d97706' : '#047857',
                    backgroundColor: wordCount > 500 ? '#fee2e2' : '#f0fdf4',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '6px'
                  }}>
                    {wordCount} / 500 words
                  </span>
                </div>
                <textarea
                  rows={5}
                  placeholder="Provide comprehensive instructions, evaluation criteria, coding prerequisites, and submission guidelines for students..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '0.88rem',
                    lineHeight: '1.5',
                    borderRadius: '8px',
                    border: wordCount > 500 ? '2px solid #ef4444' : '1px solid #cbd5e1',
                    outline: 'none',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
                {wordCount > 500 && (
                  <div style={{ fontSize: '0.78rem', color: '#dc2626', marginTop: '0.3rem', fontWeight: 600 }}>
                    ⚠️ Description exceeds 500 words. Please shorten your content before publishing.
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* DESCRIPTIVE DOCUMENT UPLOAD SECTION (PDF, WORD, EXCEL - UP TO 5 FILES)    */}
              {/* ========================================================================= */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', border: '1.5px solid #a7f3d0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Paperclip size={18} color="#047857" />
                      Descriptive Document Upload
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: '#065f46', marginTop: '0.15rem', display: 'block' }}>
                      Attach reference files for students (Supported: <strong>.pdf, .doc, .docx, .xls, .xlsx</strong> • Maximum <strong>5 documents</strong>)
                    </span>
                  </div>

                  <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: '#ffffff', color: '#047857', border: '1px solid #a7f3d0', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
                    {uploadedDocs.length} / 5 Uploaded
                  </span>
                </div>

                {/* Upload Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <label style={{ cursor: uploadedDocs.length >= 5 ? 'not-allowed' : 'pointer' }}>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      disabled={uploadedDocs.length >= 5}
                      style={{ display: 'none' }}
                      onChange={handleFacultyDocUpload}
                    />
                    <span className="btn" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: uploadedDocs.length >= 5 ? '#cbd5e1' : '#00a884',
                      color: '#ffffff',
                      padding: '0.6rem 1.1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      boxShadow: uploadedDocs.length >= 5 ? 'none' : '0 4px 12px rgba(0, 168, 132, 0.25)'
                    }}>
                      <Upload size={16} />
                      Upload Descriptive Document ({uploadedDocs.length}/5)
                    </span>
                  </label>

                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                    Click button to select PDF, Word or Excel files from your device.
                  </span>
                </div>

                {/* List of Attached Descriptive Documents */}
                {uploadedDocs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Attached Descriptive Documents List:
                    </div>
                    {uploadedDocs.map((doc, index) => {
                      const style = getFileStyle(doc.name);
                      const IconComp = style.icon;
                      return (
                        <div key={doc.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#ffffff',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid #bbf7d0',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              backgroundColor: style.bg,
                              color: style.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '0.72rem',
                              flexShrink: 0
                            }}>
                              <IconComp size={18} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', wordBreak: 'break-all' }}>
                                {doc.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>
                                Descriptive Document #{index + 1} • Format: <strong style={{ color: style.color }}>{style.label}</strong> • Size: {doc.size}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveFacultyDoc(doc.id)}
                            style={{
                              background: '#fee2e2',
                              border: '1px solid #fca5a5',
                              color: '#dc2626',
                              borderRadius: '6px',
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                            title="Remove document"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b', fontSize: '0.82rem' }}>
                    No descriptive documents attached yet. Click <strong>Upload Descriptive Document</strong> above to add up to 5 files.
                  </div>
                )}
                
                <div style={{ marginTop: '0.85rem', fontSize: '0.76rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Check size={14} color="#047857" />
                  <span>Descriptive Document Label will be prominently displayed for students to view and download reference materials.</span>
                </div>
              </div>

              {/* Form Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={wordCount > 500}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: wordCount > 500 ? '#94a3b8' : '#00a884',
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    boxShadow: wordCount > 500 ? 'none' : '0 4px 14px rgba(0, 168, 132, 0.4)',
                    cursor: wordCount > 500 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Sparkles size={18} />
                  <span>Publish Activity to Students</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Published Activities for Faculty View */}
          <div style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileCheck size={20} color="#00a884" />
              Published Activities for this Course ({activitiesList.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {activitiesList.map(activity => (
                <div key={activity.id} className="card" style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#4338ca', backgroundColor: '#e0e7ff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                          {activity.id}
                        </span>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#dc2626', backgroundColor: '#fee2e2', padding: '0.2rem 0.6rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} />
                          Due: {activity.dueDate}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {activity.title}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', backgroundColor: '#f1f5f9', padding: '0.3rem 0.7rem', borderRadius: '8px' }}>
                        Marks: {activity.totalMarks}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#047857', backgroundColor: '#f0fdf4', border: '1px solid #a7f3d0', padding: '0.3rem 0.7rem', borderRadius: '8px' }}>
                        PUBLISHED TO STUDENTS
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: '#475569', backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', margin: '0 0 1rem 0' }}>
                    {activity.description}
                  </p>

                  {/* Attached Descriptive Documents List */}
                  {activity.attachedDocs && activity.attachedDocs.length > 0 ? (
                    <div style={{ backgroundColor: '#ecfdf5', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Faculty Descriptive Documents ({activity.attachedDocs.length}):
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {activity.attachedDocs.map((doc, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                              📄 {doc.name}
                            </span>
                            <button
                              onClick={() => handleOpenDocInNewWindow(doc)}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.74rem', padding: '0.2rem 0.55rem' }}
                            >
                              <Eye size={12} />
                              Preview
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : activity.attachedDoc ? (
                    <div style={{ backgroundColor: '#ecfdf5', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #a7f3d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#047857' }}>
                        📄 Descriptive Document: {activity.attachedDoc.title}
                      </span>
                      <button
                        onClick={() => handleOpenDocInNewWindow(activity.attachedDoc)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.74rem', padding: '0.25rem 0.6rem' }}
                      >
                        <Eye size={12} />
                        Preview Document
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDENT VIEW: COURSE ACTIVITIES & PDF SUBMISSIONS                         */}
      {/* ========================================================================= */}
      {!isFaculty && activeTab === 'activities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activitiesList.map(activity => (
            <div key={activity.id} className="card" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              {/* Activity Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#4338ca', backgroundColor: '#e0e7ff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                      {activity.id}
                    </span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#dc2626', backgroundColor: '#fee2e2', padding: '0.2rem 0.6rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      Due: {activity.dueDate}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {activity.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#475569', backgroundColor: '#f1f5f9', padding: '0.3rem 0.75rem', borderRadius: '8px' }}>
                    Marks: {activity.totalMarks}
                  </span>
                  <span className={`status-pill ${activity.status === 'submitted' ? 'qualified' : 'at-risk'}`} style={{ fontSize: '0.84rem', padding: '0.35rem 0.85rem' }}>
                    {activity.status === 'submitted' ? '✓ SUBMITTED ON TIME' : 'PENDING SUBMISSION'}
                  </span>
                </div>
              </div>

              {/* Activity Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} color="#00a884" />
                  Activity Instructions & Guidelines
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0, backgroundColor: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  {activity.description}
                </p>
              </div>

              {/* Professor Attached Resource PDF Box */}
              {(activity.attachedDocs && activity.attachedDocs.length > 0) ? (
                <div style={{ marginBottom: '1.75rem', backgroundColor: '#ecfdf5', padding: '1.25rem', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#047857', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Paperclip size={16} />
                    INSTRUCTOR ATTACHED DESCRIPTIVE DOCUMENTS ({activity.attachedDocs.length})
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {activity.attachedDocs.map((doc, index) => {
                      const style = getFileStyle(doc.name);
                      return (
                        <div key={doc.id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: '#ffffff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: style.bg, color: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                              {style.label}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                                {doc.name}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '0.15rem' }}>
                                Descriptive Document #{index + 1} • Size: {doc.size || '1.8 MB'}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '0.65rem' }}>
                            <button
                              onClick={() => handleDownloadAttachedDoc(doc)}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', backgroundColor: '#ffffff', borderColor: '#a7f3d0', color: '#047857' }}
                            >
                              <Download size={14} />
                              <span>Download</span>
                            </button>

                            <button
                              onClick={() => handleOpenDocInNewWindow(doc)}
                              className="btn btn-primary"
                              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', backgroundColor: '#059669', borderColor: '#047857' }}
                            >
                              <ExternalLink size={14} />
                              <span>Open Document</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : activity.attachedDoc ? (
                <div style={{ marginBottom: '1.75rem', backgroundColor: '#ecfdf5', padding: '1.25rem', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Paperclip size={16} />
                    INSTRUCTOR ATTACHED REFERENCE DESCRIPTIVE DOCUMENT (PDF)
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                        PDF
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                          {activity.attachedDoc.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '0.15rem' }}>
                          Size: {activity.attachedDoc.size} • Uploaded by Instructor ({activity.attachedDoc.dateAdded})
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.65rem' }}>
                      <button
                        onClick={() => handleDownloadAttachedDoc(activity.attachedDoc)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', backgroundColor: '#ffffff', borderColor: '#a7f3d0', color: '#047857' }}
                      >
                        <Download size={14} />
                        <span>Download PDF</span>
                      </button>

                      <button
                        onClick={() => handleOpenDocInNewWindow(activity.attachedDoc)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', backgroundColor: '#059669', borderColor: '#047857' }}
                      >
                        <ExternalLink size={14} />
                        <span>Open in New Window</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Student Submission Upload Area */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload size={16} color="#4338ca" />
                  Your Document Submission Area (Upload PDF)
                </h4>

                {activity.submittedFile ? (
                  /* SUBMITTED FILE VIEW */
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #86efac', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <FileCheck size={28} color="#059669" />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                          {activity.submittedFile.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '0.15rem' }}>
                          Uploaded: {activity.submittedFile.uploadTime} • Size: {activity.submittedFile.size}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => window.open(activity.submittedFile.url, '_blank')}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                      >
                        <Eye size={14} />
                        <span>View Document</span>
                      </button>

                      <button
                        onClick={() => handleRemoveFile(activity.id)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', color: '#dc2626', borderColor: '#fca5a5' }}
                      >
                        <Trash2 size={14} />
                        <span>Remove & Re-upload</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* UPLOAD DROP ZONE */
                  <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '10px', border: '2px dashed #94a3b8' }}>
                    <Upload size={32} color="#6366f1" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      Upload your completed PDF document for this activity
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.3rem 0 1rem 0' }}>
                      Accepted format: <strong>.pdf</strong> • Maximum file size: <strong>25 MB</strong>
                    </p>

                    <label style={{ cursor: 'pointer' }}>
                      <input
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(activity.id, e)}
                      />
                      <span className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Upload size={16} />
                        Browse & Choose PDF Document
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LECTURE HANDOUTS & MATERIALS                                       */}
      {/* ========================================================================= */}
      {activeTab === 'materials' && (
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
            Course Study Materials & Lecture Handouts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={24} color="#00a884" />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Module 1: Introduction to Deep Learning Architecture</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>PDF • 3.4 MB • Uploaded by Dr. Arthur Pendelton</div>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => handleDownloadAttachedDoc({ name: 'Module1_DeepLearning_Intro.pdf', previewContent: 'Module 1 Notes' })}>
                <Download size={14} />
                Download PDF
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={24} color="#00a884" />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Module 2: Convolutional Neural Networks & Optimization</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>PDF • 4.1 MB • Uploaded by Dr. Arthur Pendelton</div>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => handleDownloadAttachedDoc({ name: 'Module2_CNN_Optimization.pdf', previewContent: 'Module 2 Notes' })}>
                <Download size={14} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
