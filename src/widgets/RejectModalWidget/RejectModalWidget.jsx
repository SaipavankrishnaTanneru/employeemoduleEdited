import React, { useState, useEffect, useRef } from 'react';
import styles from './RejectModalWidget.module.css';

const RejectModalWidget = ({
  open,
  onClose,
  title = 'Confirm',
  subtitle = '',
  label = 'Remarks',
  placeholder = '',
  cancelLabel = 'Cancel',
  submitLabel = 'Submit',
  onSubmit,
}) => {
  const [reason, setReason] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    setReason('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    if (onSubmit) onSubmit(reason);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <label className={styles.label}>{label}</label>
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>{cancelLabel}</button>
          <button className={styles.submit} onClick={handleSubmit}>{submitLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default RejectModalWidget;
