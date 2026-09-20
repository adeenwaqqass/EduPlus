import React, { useState } from 'react';
import { Save, Shield, Bell, Lock, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [thresholdLow, setThresholdLow] = useState(0.35);
  const [thresholdHigh, setThresholdHigh] = useState(0.65);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <form onSubmit={handleSave}>
        {/* ML Engine Configuration */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Shield size={20} color="#00a884" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              EduPlus Achilles 1.0 Early Warning Sensitivity
            </h3>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              <span>Medium Risk Sensitivity Threshold (t₁)</span>
              <span style={{ color: '#00a884', fontWeight: 700 }}>{thresholdLow}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={thresholdLow}
              onChange={e => setThresholdLow(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#00a884', cursor: 'pointer' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
              Probability score above which students enter the Medium Risk watchlist.
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              <span>High Risk Critical Threshold (t₂)</span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>{thresholdHigh}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="0.9"
              step="0.05"
              value={thresholdHigh}
              onChange={e => setThresholdHigh(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
              Probability score triggering immediate High Risk faculty alerts & WhatsApp parent dispatch.
            </p>
          </div>
        </div>

        {/* Notification Integration Preferences */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bell size={20} color="#00a884" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Automated Alerts & WhatsApp Integration
            </h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                Parent WhatsApp Notifications
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Automatically dispatch attendance drop & High Risk warning alerts to parent mobile numbers.
              </div>
            </div>
            <input
              type="checkbox"
              checked={whatsappEnabled}
              onChange={e => setWhatsappEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#00a884', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                Faculty Digest Emails
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Receive daily morning summary emails of unacknowledged student alerts.
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={e => setEmailEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#00a884', cursor: 'pointer' }}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
          <Save size={16} />
          {saved ? 'Settings Saved Successfully!' : 'Save System Settings'}
        </button>
      </form>
    </div>
  );
}
