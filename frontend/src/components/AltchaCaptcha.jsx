import React, { useEffect, useRef, useState } from 'react';
import 'altcha';

export default function AltchaCaptcha({ onVerify }) {
  const widgetRef = useRef(null);
  const [challengeUrl, setChallengeUrl] = useState(null);

  useEffect(() => {
    let activeBlobUrl = null;

    const loadChallenge = async () => {
      try {
        // 1. Try fetching live challenge from Spring Boot API backend
        const res = await fetch('/api/public/altcha-challenge');
        if (res.ok) {
          const data = await res.json();
          const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
          activeBlobUrl = URL.createObjectURL(blob);
          setChallengeUrl(activeBlobUrl);
          return;
        }
      } catch (err) {
        console.warn('Backend ALTCHA endpoint unavailable, falling back to local client challenge:', err);
      }

      // 2. Client-side Web Crypto PoW Challenge fallback (salt + target secret number)
      try {
        const salt = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const targetNum = Math.floor(Math.random() * 300) + 1; // target between 1 and 300
        
        const encoder = new TextEncoder();
        const data = encoder.encode(salt + targetNum);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const dynamicChallenge = {
          algorithm: 'SHA-256',
          challenge: hashHex,
          maxnumber: 1000,
          salt: salt,
          signature: ''
        };

        const blob = new Blob([JSON.stringify(dynamicChallenge)], { type: 'application/json' });
        activeBlobUrl = URL.createObjectURL(blob);
        setChallengeUrl(activeBlobUrl);
      } catch (fallbackErr) {
        console.error('Error generating fallback challenge:', fallbackErr);
      }
    };

    loadChallenge();

    return () => {
      if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
      }
    };
  }, []);

  useEffect(() => {
    const handleStateChange = (e) => {
      const state = e.detail?.state;
      if (state === 'verified') {
        if (onVerify) onVerify(true, e.detail?.payload);
      } else if (state === 'unverified' || state === 'error' || state === 'expired') {
        if (onVerify) onVerify(false, null);
      }
    };

    const currentRef = widgetRef.current;
    if (currentRef) {
      currentRef.addEventListener('statechange', handleStateChange);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('statechange', handleStateChange);
      }
    };
  }, [onVerify]);

  if (!challengeUrl) {
    return <div style={styles.loading}>Loading verification...</div>;
  }

  return (
    <div className="altcha-container" style={styles.container}>
      <altcha-widget
        ref={widgetRef}
        challenge={challengeUrl}
        challengeurl={challengeUrl}
        hidecredit="true"
        style={{
          width: '100%',
          display: 'block',
          borderRadius: '10px'
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  loading: {
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
    padding: '1rem',
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.875rem'
  }
};

