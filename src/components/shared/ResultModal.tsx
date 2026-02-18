import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResultModal.css';
import { Button } from './Button';

interface ResultModalProps {
  show: boolean;
  title: string;
  description: string;
  icon: string;
  onClose: () => void;
  variant?: 'success' | 'info' | 'error';
}

export const ResultModal: React.FC<ResultModalProps> = ({
  show,
  title,
  description,
  icon,
  onClose,
  variant = 'success'
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="result-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`result-card ${variant}`}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="result-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 300 }}
            >
              {icon}
            </motion.div>
            <h2 className="result-title">{title}</h2>
            <p className="result-description">{description}</p>
            <Button onClick={onClose} variant="primary">
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
