import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Brain,
  Award
} from 'lucide-react';
import './LoginPage.css';
import logoTwo from '../../assets/logo_two.png';
import AltchaCaptcha from '../AltchaCaptcha';

import usersData from '../../data/users.json';

export default function LoginPage({ onLoginSuccess, onNavigateToDashboard }) {
  const [role, setRole] = useState('faculty'); // 'faculty' | 'admin' | 'student'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('computer-science');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // { type: 'error'|'success', text: '' }

  const getUserObject = (targetRole, targetEmail) => {
    const trimmedInput = (targetEmail || '').trim().toLowerCase();
    
    // Exact match in database users collection
    const match = usersData.find(u => 
      u.email.toLowerCase() === trimmedInput || 
      u.registrationNumber.toLowerCase() === trimmedInput ||
      u.id.toLowerCase() === trimmedInput
    );

    if (match) {
      return {
        ...match,
        shortName: match.shortName || match.name.split(' ')[0].toUpperCase()
      };
    }

    // Role-based fallback lookup if email matches role pattern
    const roleMatches = usersData.filter(u => u.role === targetRole);
    if (roleMatches.length > 0) {
      const selected = roleMatches[0];
      return {
        ...selected,
        email: targetEmail || selected.email
      };
    }

    // Fallback user construction
    const inferredName = targetEmail ? targetEmail.split('@')[0].replace('.', ' ').toUpperCase() : 'USER';
    return {
      name: inferredName,
      shortName: inferredName.split(' ')[0],
      role: targetRole,
      registrationNumber: targetRole === 'student' ? '23ACOE1121001' : 'FAC-01',
      department: 'COMPUTER ENGINEERING',
      semester: 'WINTER 2026',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: targetEmail || 'user@eduplus.edu'
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage(null);

    if (!email) {
      setAlertMessage({ type: 'error', text: 'Please enter your institutional email address.' });
      return;
    }
    if (!password) {
      setAlertMessage({ type: 'error', text: 'Please enter your account password.' });
      return;
    }
    if (!captchaVerified) {
      setAlertMessage({ type: 'error', text: 'Please complete the ALTCHA CAPTCHA verification check before logging in.' });
      return;
    }

    setIsLoading(true);

    // Simulate authenticating with backend / ML system
    setTimeout(() => {
      setIsLoading(false);
      const uObj = getUserObject(role, email);
      setAlertMessage({
        type: 'success',
        text: `Authentication successful! Welcome ${uObj.name}...`
      });

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(uObj, rememberMe);
        } else if (onNavigateToDashboard) {
          onNavigateToDashboard();
        }
      }, 700);
    }, 900);
  };

  return (
    <div className="landing-login-container">
      {/* Left Visual Banner Panel */}
      <div className="login-visual-panel">
        {/* Header */}
        <div className="visual-header">
          <div className="brand-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src={logoTwo} alt="EduPlus Logo" style={{ height: '42px', width: 'auto', borderRadius: '8px' }} />
            <div>
              <h2 className="brand-title-text">EduPlus CMS</h2>
              <div className="brand-tagline">College Management System</div>
            </div>
          </div>

          <div className="edupulse-pill">
            <span className="pulse-dot"></span>
            <span>EduPlus Achilles 1.0 Active</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="visual-content">
          <h1 className="hero-headline">
            AI-Powered Student Success & Early Warning Intelligence
          </h1>
          <p className="hero-subtext">
            Empowering students, faculty, and Institutes with real-time risk predictions, attendance tracking, and automated interventions.
          </p>

          <div className="glass-features">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Brain size={20} />
              </div>
              <div>
                <div className="feature-title">Predictive Retention Analytics</div>
                <div className="feature-desc">
                  Machine learning model detects at-risk academic dropouts with 98.4% precision.
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="feature-title">Real-Time Attendance & Performance</div>
                <div className="feature-desc">
                  Seamlessly track attendance logs, quiz trends, and mid-term grade trajectories.
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Award size={20} />
              </div>
              <div>
                <div className="feature-title">Centralized Faculty & Student Portal</div>
                <div className="feature-desc">
                  Unified hub for course management, academic advising, and administrative reports.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="visual-footer">
          <div className="stat-item">
            <div className="stat-num">98.4%</div>
            <div className="stat-label">Model Accuracy</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">12,450+</div>
            <div className="stat-label">Enrolled Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">450+</div>
            <div className="stat-label">Faculty Members</div>
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="form-header">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">
              Sign in with your institutional credentials to access your portal.
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="role-tabs">
            <button
              type="button"
              className={`role-tab-btn ${role === 'faculty' ? 'active' : ''}`}
              onClick={() => {
                setRole('faculty');
                setAlertMessage(null);
              }}
            >
              <Building2 size={16} />
              <span>Faculty</span>
            </button>
            <button
              type="button"
              className={`role-tab-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setRole('admin');
                setAlertMessage(null);
              }}
            >
              <ShieldCheck size={16} />
              <span>Admin (HOD)</span>
            </button>
            <button
              type="button"
              className={`role-tab-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => {
                setRole('student');
                setAlertMessage(null);
              }}
            >
              <GraduationCap size={16} />
              <span>Student</span>
            </button>
          </div>

          {/* Alert Message Box */}
          {alertMessage && (
            <div className={`alert-box ${alertMessage.type === 'error' ? 'alert-error' : 'alert-success'}`}>
              {alertMessage.type === 'error' ? (
                <AlertCircle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              <span>{alertMessage.text}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                <span>Work / Institutional Email</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className="custom-input"
                  placeholder={role === 'faculty' ? 'professor@athena.edu' : 'student@student.athena.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <Mail size={18} className="input-icon" />
              </div>
            </div>

            {/* Department Dropdown for Faculty */}
            {role === 'faculty' && (
              <div className="form-group">
                <label className="form-label">
                  <span>Academic Department</span>
                </label>
                <div className="input-wrapper">
                  <select
                    className="custom-input"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="computer-science">Computer Science & Engineering</option>
                    <option value="electrical">Electrical Engineering</option>
                    <option value="business">Business Administration</option>
                    <option value="mathematics">Mathematics & Data Science</option>
                    <option value="registrar">Registrar & Dean Office</option>
                  </select>
                  <Building2 size={18} className="input-icon" />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label">
                <span>Password</span>
                <a 
                  href="#forgot" 
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setAlertMessage({
                      type: 'success',
                      text: 'Password reset link sent to your institutional IT helpdesk.'
                    });
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="custom-input"
                  placeholder="Enter your security password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={18} className="input-icon" />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Options */}
            <div className="options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
            </div>

            {/* ALTCHA CAPTCHA Widget */}
            <AltchaCaptcha onVerify={(verified) => setCaptchaVerified(verified)} />

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to EduPlus CMS</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security Guarantee Footer */}
          <div className="login-security-footer">
            <ShieldCheck size={16} color="#00a884" />
            <span>256-Bit Encrypted • ALTCHA Security Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
