import React, { useEffect, useRef } from 'react';
import 'altcha';

export default function AltchaCaptcha({ onVerify }) {
  const widgetRef = useRef(null);

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

  return (
    <div style={styles.container}>
      <altcha-widget
        ref={widgetRef}
        test
        style={{ width: '100%', display: 'block' }}
      />
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%'
  }
};
